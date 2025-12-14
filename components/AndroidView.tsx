import React, { useState, useEffect } from 'react';
import { AppConfig, AppID, Language } from '../types';
import { translations } from '../utils/translations';
import { Wifi, Battery, Signal, ChevronLeft, Circle, Square, Triangle, Search, Monitor } from 'lucide-react';

interface AndroidViewProps {
  apps: AppConfig[];
  onAppClick: (id: AppID) => void;
  activeAppId: AppID | null;
  closeApp: () => void;
  lang: Language;
  onSwitchToDesktop: () => void;
}

export const AndroidView: React.FC<AndroidViewProps> = ({ 
  apps, 
  onAppClick, 
  activeAppId, 
  closeApp, 
  lang,
  onSwitchToDesktop
}) => {
  const [time, setTime] = useState(new Date());
  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const activeAppConfig = apps.find(a => a.id === activeAppId);

  return (
    <div className="w-full h-full bg-black text-white relative overflow-hidden font-sans select-none">
       {/* Android Status Bar */}
       <div className="h-8 flex justify-between items-center px-4 bg-black/20 backdrop-blur-sm absolute top-0 w-full z-50 text-xs font-medium">
          <div className="flex items-center space-x-2">
             <span>{formatTime(time)}</span>
             {/* Dynamic Island Simulation or Camera Hole */}
             <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full top-1"></div>
          </div>
          <div className="flex items-center space-x-2">
             <Signal size={14} />
             <Wifi size={14} />
             <Battery size={14} />
          </div>
       </div>

       {/* Main Content Area */}
       <div className="w-full h-full pt-8 pb-14 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: activeAppId ? 'none' : 'url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop)' }}>
          
          {activeAppId && activeAppConfig ? (
            // App Open View
            <div className="w-full h-full bg-white dark:bg-[#1a1a1a] flex flex-col animate-in slide-in-from-bottom duration-300">
               <div className="flex-1 overflow-hidden relative">
                   {/* Inject Close functionality into props if needed or just render */}
                   {/* We wrap component to ensure it fits mobile */}
                   <div className="absolute inset-0 overflow-y-auto">
                        {activeAppConfig.component}
                   </div>
               </div>
            </div>
          ) : (
            // Home Screen View
            <div className="w-full h-full flex flex-col p-6 animate-fadeIn">
               {/* Search Widget */}
               <div className="mt-8 mb-8 bg-white/20 backdrop-blur-md rounded-full p-3 flex items-center shadow-lg border border-white/10">
                  <span className="text-xl font-bold text-blue-400 mr-3 ml-2">G</span>
                  <Search size={18} className="text-gray-300 mr-2" />
                  <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full text-sm" />
               </div>

               {/* Date Widget */}
               <div className="mb-8 text-shadow-lg">
                  <div className="text-5xl font-light">{formatTime(time)}</div>
                  <div className="text-lg opacity-80">{time.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</div>
               </div>

               {/* Apps Grid */}
               <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                  {/* Switch to Desktop App */}
                  <div className="flex flex-col items-center space-y-2 group" onClick={onSwitchToDesktop}>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg active:scale-90 transition-transform border border-white/20">
                          <Monitor size={28} className="text-white" />
                      </div>
                      <span className="text-xs text-center drop-shadow-md">Desktop</span>
                  </div>

                  {apps.map(app => (
                      <div key={app.id} className="flex flex-col items-center space-y-2 group" onClick={() => onAppClick(app.id)}>
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform overflow-hidden">
                              {/* Reusing the Icon from AppConfig but ensuring styling works for mobile */}
                              <div className="w-full h-full [&>div]:rounded-2xl [&>div]:shadow-none">
                                {app.icon}
                              </div>
                          </div>
                          <span className="text-xs text-center drop-shadow-md truncate w-16">{app.title}</span>
                      </div>
                  ))}
               </div>
            </div>
          )}
       </div>

       {/* Android Navigation Bar */}
       <div className="absolute bottom-0 w-full h-12 bg-black flex justify-around items-center text-gray-400 z-50">
           <button onClick={closeApp} className="p-4 active:text-white transition-colors">
               <Triangle size={20} className="rotate-[-90deg] fill-current" />
           </button>
           <button onClick={closeApp} className="p-4 active:text-white transition-colors">
               <Circle size={18} className="fill-current" />
           </button>
           <button className="p-4 active:text-white transition-colors">
               <Square size={18} className="fill-current" />
           </button>
       </div>
    </div>
  );
};