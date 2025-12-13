import React from 'react';
import { Image, Monitor, Moon, Sun, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SettingsAppProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({ 
    currentWallpaper, 
    onWallpaperChange, 
    lang, 
    setLang, 
    isDarkMode, 
    toggleDarkMode 
}) => {
  const t = translations[lang];

  const wallpapers = [
    { id: 'ubuntu', name: 'Ubuntu Jellyfish', value: 'bg-gradient-to-br from-[#5E2750] via-[#2C001E] to-[#E95420]' },
    { id: 'dark', name: 'Dark Mode', value: 'bg-[#1a1a1a]' },
    { id: 'tech', name: 'Electronics Blue', value: 'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]' },
    { id: 'hacker', name: 'Terminal Green', value: 'bg-gradient-to-br from-[#000000] to-[#113311]' },
  ];

  return (
    <div className="h-full bg-[#F7F7F7] dark:bg-[#111] text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-6 border-b dark:border-gray-800 bg-white dark:bg-[#1a1a1a]">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Monitor className="text-[#E95420]" />
          {t.appearance}
        </h2>
      </div>
      
      <div className="p-6 md:p-8 overflow-y-auto">
          {/* Language and Theme Section */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#2d2d2d] p-4 rounded-lg shadow-sm border dark:border-gray-700">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={18} /> {t.language}</h3>
                  <div className="flex gap-2">
                      <button onClick={() => setLang('ar')} className={`px-4 py-2 rounded ${lang === 'ar' ? 'bg-[#E95420] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>العربية</button>
                      <button onClick={() => setLang('en')} className={`px-4 py-2 rounded ${lang === 'en' ? 'bg-[#E95420] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>English</button>
                      <button onClick={() => setLang('zh')} className={`px-4 py-2 rounded ${lang === 'zh' ? 'bg-[#E95420] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>中文</button>
                  </div>
              </div>

              <div className="bg-white dark:bg-[#2d2d2d] p-4 rounded-lg shadow-sm border dark:border-gray-700">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                      {isDarkMode ? <Moon size={18} /> : <Sun size={18} />} 
                      {isDarkMode ? t.darkMode : t.lightMode}
                  </h3>
                  <button 
                    onClick={toggleDarkMode}
                    className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
              </div>
          </div>

          <h3 className="font-bold mb-4 text-xl border-b dark:border-gray-700 pb-2">{t.wallpapers}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {wallpapers.map((wp) => (
            <div 
                key={wp.id}
                onClick={() => onWallpaperChange(wp.value)}
                className={`
                cursor-pointer rounded-lg overflow-hidden border-4 transition-all
                ${currentWallpaper === wp.value ? 'border-[#E95420] shadow-lg scale-105' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}
                `}
            >
                <div className={`h-24 md:h-32 w-full ${wp.value} shadow-inner`}></div>
                <div className="p-3 text-center font-medium bg-white dark:bg-[#2d2d2d] text-sm md:text-base">{wp.name}</div>
            </div>
            ))}
         </div>
      </div>
    </div>
  );
};