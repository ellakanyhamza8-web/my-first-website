import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Search, Command, Smartphone } from 'lucide-react';
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
    <div className="h-8 bg-white/40 dark:bg-black/40 backdrop-blur-xl text-black dark:text-white flex justify-between items-center px-4 text-xs select-none z-50 w-full fixed top-0 left-0 border-b border-black/5 dark:border-white/10 shadow-sm transition-colors duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Left Side: Apple Logo & App Menu */}
      <div className="flex items-center h-full space-x-4 space-x-reverse font-medium">
        <div 
            className="font-bold text-lg cursor-pointer hover:opacity-70 transition-opacity px-1"
            onClick={onActivitiesClick}
        >
            
        </div>
        <div className="font-bold cursor-pointer hidden sm:block">HamzaOS</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">File</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Edit</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">View</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Go</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Window</div>
        <div className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Help</div>
      </div>

      {/* Center: Clock/Date */}
      <div 
          className="absolute left-1/2 transform -translate-x-1/2 font-bold cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 px-3 py-1 rounded transition-colors z-20"
          onClick={onCalendarClick}
      >
          {formatDate(date)}
      </div>

      {/* Right Side: Status Icons */}
      <div className="flex items-center space-x-4 space-x-reverse h-full font-medium">
        <div className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1 rounded transition-colors hidden sm:block">
            <Battery size={16} className="rotate-0" />
        </div>
        <div className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1 rounded transition-colors hidden sm:block">
            <Wifi size={16} />
        </div>
        <div 
            className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/20 p-1 rounded transition-colors"
            onClick={onSystemMenuClick}
        >
             <Command size={16} />
        </div>
      </div>
    </div>
  );
};