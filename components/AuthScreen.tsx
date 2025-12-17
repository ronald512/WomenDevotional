import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { loginUser } from '../services/repository';

interface AuthScreenProps {
  onLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(name, partnerName);
      onLogin();
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 px-6 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-red-100 dark:bg-slate-900 dark:ring-slate-800">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Heart className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mt-6 font-serif text-3xl font-medium text-slate-800 dark:text-slate-100">
            The Wife's Heart
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A 365-day journey to keep him top of mind.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Your First Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                placeholder="e.g. Sarah"
              />
            </div>
            <div>
              <label htmlFor="partner" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Husband's Name (Optional)
              </label>
              <input
                id="partner"
                name="partner"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                placeholder="e.g. John"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 dark:hover:bg-red-400"
          >
            {loading ? "Starting..." : "Start My Journey"}
          </button>
        </form>
      </div>
    </div>
  );
};