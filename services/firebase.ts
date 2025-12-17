import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const apiKey = process.env.FIREBASE_API_KEY;
const isConfigured = apiKey && !apiKey.includes("Dummy") && !apiKey.includes("dummy");

export const isDemoMode = !isConfigured;

let app;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (!isDemoMode) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization failed, falling back to demo mode:", error);
    // Fallback if config is technically present but invalid
  }
}

export { auth, db };
export const appId = 'default-app-id';