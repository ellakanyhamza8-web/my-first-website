import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Search, Command, LayoutGrid } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface TopBarProps {
  lang: Language;
  onSystemMenuClick: () => void;
  onCalendarClick: () => void;
  onActivitiesClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ lang, onSystemMenuClick, onCalendarClick, onActivitiesClick }) => {
  const [date, setDate] = useState(new Date());
  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const locale = lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US';
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed top-2 left-2 right-2 h-10 bg-white/60 dark:bg-black/40 backdrop-blur-2xl text-black dark:text-white flex justify-between items-center px-4 text-xs select-none z-50 rounded-full border border-white/20 shadow-lg transition-colors duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Left Side: Windows Logo & App Menu */}
      <div className="flex items-center h-full space-x-4 space-x-reverse font-medium">
        <div 
            className="font-bold text-lg cursor-pointer hover:bg-blue-500/10 p-1 rounded-md transition-colors text-blue-600 dark:text-blue-400"
            onClick={onActivitiesClick}
        >
            <LayoutGrid size={20} />
        </div>
        <div className="font-bold cursor-pointer hidden sm:block opacity-80">Windows 12 Pro</div>
      </div>

      {/* Center: Search / Status */}
      <div 
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-black/5 dark:bg-white/10 px-4 py-1.5 rounded-full cursor-pointer hover:bg-black/10 dark:hover:bg-white/20 transition-all z-20 w-48 justify-center"
          onClick={onCalendarClick}
      >
          <Search size={14} className="mr-2 opacity-50" />
          <span className="font-medium opacity-80">{formatDate(date)}</span>
      </div>

      {/* Right Side: Status Icons */}
      <div className="flex items-center space-x-3 space-x-reverse h-full font-medium">
        <div className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1.5 rounded-full transition-colors hidden sm:block">
            <Battery size={16} className="rotate-0" />
        </div>
        <div className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1.5 rounded-full transition-colors hidden sm:block">
            <Wifi size={16} />
        </div>
        <div 
            className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1.5 rounded-full transition-colors"
            onClick={onSystemMenuClick}
        >
             <Volume2 size={16} />
        </div>
      </div>
    </div>
  );
};