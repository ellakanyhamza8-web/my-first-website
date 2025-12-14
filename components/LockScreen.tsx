import React, { useState, useEffect } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { Language } from '../types';

interface LockScreenProps {
  onUnlock: () => void;
  lang: Language;
  wallpaper: string;
  username?: string;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, lang, wallpaper, username }) => {
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // For portfolio purposes, any password (or none) unlocks it
    onUnlock();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between text-white overflow-hidden animate-fadeIn" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background with Blur */}
      <div className={`absolute inset-0 ${wallpaper} bg-cover bg-center blur-md transform scale-105`} />
      <div className="absolute inset-0 bg-black/40" />

      {/* Top: Clock */}
      <div className="relative z-10 mt-20 flex flex-col items-center animate-slideDown">
        <div className="text-8xl font-thin tracking-tighter drop-shadow-lg">
          {formatTime(time)}
        </div>
        <div className="text-2xl font-medium mt-2 drop-shadow-md opacity-90">
          {formatDate(time)}
        </div>
      </div>

      {/* Center: User Login */}
      <div className="relative z-10 mb-32 w-full max-w-sm px-8 flex flex-col items-center animate-slideUp">
        <div className="w-24 h-24 rounded-full bg-gray-200/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-2xl border-2 border-white/10">
           <User size={48} className="text-white drop-shadow-md" />
        </div>
        <h2 className="text-2xl font-bold mb-6 drop-shadow-md capitalize">{username || 'Hamza'}</h2>
        
        <form onSubmit={handleLogin} className="relative w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={lang === 'ar' ? 'أدخل كلمة المرور' : 'Enter Password'}
              className="w-full bg-black/20 backdrop-blur-md border border-white/20 rounded-full py-3 px-6 text-center text-white placeholder-gray-300 focus:outline-none focus:bg-black/30 focus:border-white/40 transition-all shadow-inner"
              autoFocus
            />
            <button 
                type="submit"
                className={`absolute top-1/2 transform -translate-y-1/2 ${lang === 'ar' ? 'left-2 rotate-180' : 'right-2'} w-8 h-8 rounded-full flex items-center justify-center transition-all ${password ? 'bg-[#E95420] text-white hover:bg-[#d14415]' : 'bg-white/10 text-gray-400'}`}
            >
                <ArrowRight size={16} />
            </button>
        </form>
        <p className="mt-4 text-xs text-gray-300 opacity-60">
            {lang === 'ar' ? 'اضغط Enter لفتح القفل' : 'Press Enter to unlock'}
        </p>
      </div>

      {/* Bottom: Footer Info */}
      <div className="relative z-10 mb-4 text-xs text-gray-400">
         HamzaOS Portfolio v1.0
      </div>
    </div>
  );
};