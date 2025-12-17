import { 
  signInAnonymously, 
  updateProfile, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { auth, db, appId, isDemoMode } from './firebase';
import { UserProfile, DailyData } from '../types';

// Mock types for Demo Mode
interface DemoUser {
  uid: string;
  displayName: string | null;
}

const DEMO_USER_KEY = 'twh_demo_user';
const DEMO_DATA_PREFIX = 'twh_demo_data_';

// --- Auth ---

export const subscribeToAuth = (callback: (user: User | DemoUser | null) => void): (() => void) => {
  if (isDemoMode || !auth) {
    // Check local storage for existing session
    const stored = localStorage.getItem(DEMO_USER_KEY);
    if (stored) {
      callback(JSON.parse(stored));
    } else {
      callback(null);
    }
    // Listen for storage changes (rudimentary cross-tab support or login updates)
    const listener = () => {
       const s = localStorage.getItem(DEMO_USER_KEY);
       callback(s ? JSON.parse(s) : null);
    };
    window.addEventListener('storage-auth-update', listener);
    return () => window.removeEventListener('storage-auth-update', listener);
  }

  return onAuthStateChanged(auth, callback);
};

export const loginUser = async (name: string, partnerName: string): Promise<void> => {
  if (isDemoMode || !auth || !db) {
    const fakeUser = { uid: 'demo-user-123', displayName: name };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(fakeUser));
    
    // Save profile locally
    const profile: UserProfile = {
      displayName: name,
      partnerName: partnerName || "My Husband",
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem(`${DEMO_DATA_PREFIX}profile_${fakeUser.uid}`, JSON.stringify(profile));
    
    // Dispatch event to update subscribers
    window.dispatchEvent(new Event('storage-auth-update'));
    return;
  }

  await signInAnonymously(auth);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
    const userRef = doc(db, 'artifacts', appId, 'users', auth.currentUser.uid, 'profile', 'main');
    await setDoc(userRef, {
      displayName: name,
      partnerName: partnerName || "My Husband",
      joinedAt: new Date().toISOString()
    }, { merge: true });
  }
};

export const logoutUser = async (): Promise<void> => {
  if (isDemoMode || !auth) {
    localStorage.removeItem(DEMO_USER_KEY);
    window.dispatchEvent(new Event('storage-auth-update'));
    return;
  }
  await signOut(auth);
};

// --- Data ---

export const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (isDemoMode || !db) {
    const stored = localStorage.getItem(`${DEMO_DATA_PREFIX}profile_${uid}`);
    return stored ? JSON.parse(stored) : null;
  }

  const userRef = doc(db, 'artifacts', appId, 'users', uid, 'profile', 'main');
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() as UserProfile : null;
};

export const subscribeToDailyData = (
  uid: string, 
  dateStr: string, 
  callback: (data: DailyData | null) => void
): (() => void) => {
  if (isDemoMode || !db) {
    const key = `${DEMO_DATA_PREFIX}log_${uid}_${dateStr}`;
    const load = () => {
      const stored = localStorage.getItem(key);
      callback(stored ? JSON.parse(stored) : null);
    };
    load();
    
    // Simple polling or event listener for updates could go here
    // For now, we rely on the app updating state optimistically or re-fetching if needed
    // But to support the 'Planner' updating 'Home' view via data, we should listen
    const listener = (e: Event) => {
      if ((e as CustomEvent).detail?.key === key) {
        load();
      }
    };
    window.addEventListener('storage-data-update', listener as EventListener);
    return () => window.removeEventListener('storage-data-update', listener as EventListener);
  }

  const dayDocRef = doc(db, 'artifacts', appId, 'users', uid, 'dailyLogs', dateStr);
  return onSnapshot(dayDocRef, (snap) => {
    callback(snap.exists() ? snap.data() as DailyData : null);
  });
};

export const updateDailyData = async (
  uid: string, 
  dateStr: string, 
  data: Partial<DailyData>
): Promise<void> => {
  if (isDemoMode || !db) {
    const key = `${DEMO_DATA_PREFIX}log_${uid}_${dateStr}`;
    const existing = localStorage.getItem(key);
    const current = existing ? JSON.parse(existing) : { completedDevotional: false, tinyWins: [], emotion: null, gratitude: "" };
    const updated = { ...current, ...data };
    localStorage.setItem(key, JSON.stringify(updated));
    
    // Notify listeners
    window.dispatchEvent(new CustomEvent('storage-data-update', { detail: { key } }));
    return;
  }

  const dayDocRef = doc(db, 'artifacts', appId, 'users', uid, 'dailyLogs', dateStr);
  await setDoc(dayDocRef, data, { merge: true });
};
