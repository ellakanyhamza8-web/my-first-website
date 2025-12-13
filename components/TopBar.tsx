import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Power } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface TopBarProps {
  lang: Language;
}

export const TopBar: React.FC<TopBarProps> = ({ lang }) => {
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-7 bg-[#1e1e1e] text-[#dfdbd2] flex justify-between items-center px-2 text-sm select-none z-50 shadow-md w-full fixed top-0 left-0" dir="ltr">
      <div className="flex items-center space-x-4 pl-2">
        <span className="font-bold cursor-pointer hover:text-white">{t.activities}</span>
        <span className="cursor-pointer hover:text-white hidden sm:block">Hamza OS</span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium whitespace-nowrap">
        {formatDate(date)}
      </div>

      <div className="flex items-center space-x-3 pr-2">
        <div className="flex items-center space-x-2">
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
        </div>
        <Power size={16} className="cursor-pointer hover:text-[#E95420]" />
      </div>
    </div>
  );
};