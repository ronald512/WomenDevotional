import React, { useState, useEffect, useMemo } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeView } from './components/HomeView';
import { DevotionalReader } from './components/DevotionalReader';
import { PlannerView } from './components/PlannerView';
import { ProfileView } from './components/ProfileView';
import { TabBar } from './components/TabBar';
import { UserProfile, DailyData } from './types';
import * as repo from './services/repository';

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [todayData, setTodayData] = useState<DailyData | null>(null);
  const [debugDays, setDebugDays] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // Calculate day based on debug offset
  const currentDay = useMemo(() => {
    if (!userProfile?.joinedAt) return 1 + debugDays;
    const start = new Date(userProfile.joinedAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff + 1 + debugDays;
  }, [userProfile, debugDays]);

  // Calculate the *simulated* date string for database fetch
  const simulatedDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + debugDays);
    return d.toISOString().split('T')[0];
  }, [debugDays]);

  // Effect 1: Auth Init
  useEffect(() => {
    const unsubscribe = repo.subscribeToAuth((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Effect 2: User Profile Fetch
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const profile = await repo.fetchUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
        }
      } catch (e) {
        console.error("Error fetching profile", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // Effect 3: Daily Data Fetch (Responsive to Time Travel)
  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = repo.subscribeToDailyData(user.uid, simulatedDateStr, (data) => {
      if (data) {
        setTodayData(data);
      } else {
        setTodayData({ completedDevotional: false, tinyWins: [], emotion: null, gratitude: "" });
      }
    });

    return unsubscribe;
  }, [user, simulatedDateStr]);

  const handleUpdateData = async (newData: Partial<DailyData>) => {
    if (!user) return;
    await repo.updateDailyData(user.uid, simulatedDateStr, newData);
  };

  const handleCompleteDevotional = async () => {
    await handleUpdateData({ completedDevotional: true });
    setActiveTab('planner'); 
  };

  const handleTimeTravel = (daysToAdd: number) => {
    setDebugDays(prev => prev + daysToAdd);
    setActiveTab('home'); 
  };

  if (loading) return <LoadingScreen />;
  if (!user) return <AuthScreen onLogin={() => {}} />;

  return (
    <div className={`${darkMode ? 'dark' : ''} h-full`}>
      <div className="mx-auto h-screen max-w-md bg-white pt-safe-top shadow-2xl dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 flex flex-col relative">
        <main className="flex-1 overflow-hidden relative">
           <div className="h-full w-full">
            {activeTab === 'home' && (
              <div className="h-full overflow-y-auto no-scrollbar">
                <HomeView 
                  userProfile={userProfile} 
                  todayData={todayData} 
                  currentDay={currentDay}
                  onStartReading={() => setActiveTab('read')}
                />
              </div>
            )}
            {activeTab === 'read' && (
              <DevotionalReader 
                day={currentDay}
                isCompleted={todayData?.completedDevotional}
                onComplete={handleCompleteDevotional}
              />
            )}
            {activeTab === 'planner' && (
              <div className="h-full overflow-y-auto no-scrollbar">
                <PlannerView 
                  todayData={todayData} 
                  onUpdateData={handleUpdateData}
                />
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="h-full overflow-y-auto no-scrollbar">
                <ProfileView 
                  userProfile={userProfile} 
                  stats={{
                    totalDays: currentDay, 
                    totalWins: todayData?.tinyWins?.length || 0 
                  }}
                  debugDays={debugDays}
                  onTimeTravel={handleTimeTravel}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              </div>
            )}
           </div>
        </main>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}