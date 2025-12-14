import React, { useState, useEffect } from 'react';
import { AppConfig, AppID, Language } from '../types';
import { translations } from '../utils/translations';
import { Wifi, Battery, Signal, Search, Monitor, Phone, MessageSquare, Chrome } from 'lucide-react';

interface AndroidViewProps {
  apps: AppConfig[];
  onAppClick: (id: AppID) => void;
  activeAppId: AppID | null;
  closeApp: () => void;
  lang: Language;
  onSwitchToDesktop: () => void;
  isDarkMode: boolean;
}

export const AndroidView: React.FC<AndroidViewProps> = ({ 
  apps, 
  onAppClick, 
  activeAppId, 
  closeApp, 
  lang,
  onSwitchToDesktop,
  isDarkMode
}) => {
  const [time, setTime] = useState(new Date());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 2000);
  };

  const activeAppConfig = apps.find(a => a.id === activeAppId);

  // Filter out apps that shouldn't be in the main grid if we put them in dock?
  // For now show all, but we highlight the "Desktop Switch" in the dock.
  const gridApps = apps.filter(app => app.id !== AppID.ANDROID);

  return (
    <div className={`w-full h-full relative overflow-hidden font-sans select-none transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
       
       {/* High Quality Mobile Wallpaper */}
       <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500 scale-105"
          style={{ backgroundImage: activeAppId ? 'none' : 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop)' }}
       />
       
       {/* Blur Overlay for Readability */}
       <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isDarkMode ? 'bg-black/30' : 'bg-black/10'}`} />

       {/* Android Status Bar */}
       <div className={`h-10 flex justify-between items-end pb-2 px-6 absolute top-0 w-full z-50 text-xs font-bold text-white`}>
          <div className="flex items-center space-x-2">
             <span>{formatTime(time)}</span>
          </div>
          {/* Dynamic Island / Notch */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl top-0 flex items-center justify-center">
              <div className="w-16 h-4 bg-black rounded-full flex items-center justify-end px-2 space-x-1">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
          </div>
          <div className="flex items-center space-x-2">
             <Signal size={16} />
             <Wifi size={16} />
             <Battery size={16} />
          </div>
       </div>

       {/* Main Content Area */}
       <div className="w-full h-full pt-12 pb-20 relative z-10 flex flex-col">
          
          {activeAppId && activeAppConfig ? (
            // App Open View
            <div className="flex-1 mx-2 mb-2 bg-white dark:bg-[#1a1a1a] flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl rounded-[32px] overflow-hidden relative">
               <div className="flex-1 overflow-hidden relative">
                   <div className="absolute inset-0 overflow-y-auto">
                        {activeAppConfig.component}
                   </div>
               </div>
               {/* Home Indicator Bar inside App */}
               <div className="h-5 w-full flex justify-center items-center bg-transparent absolute bottom-0">
                  <div className="w-32 h-1 bg-gray-300/50 rounded-full"></div>
               </div>
            </div>
          ) : (
            // Home Screen View
            <div className="w-full h-full flex flex-col p-4 animate-fadeIn">
               
               {/* Clock Widget */}
               <div className="mt-8 mb-8 text-center text-white drop-shadow-md">
                  <div className="text-7xl font-thin tracking-tighter">{formatTime(time)}</div>
                  <div className="text-lg font-medium opacity-90">{time.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</div>
               </div>

               {/* Search Widget */}
               <div className="mx-4 mb-8 bg-white/20 backdrop-blur-xl rounded-3xl p-3 flex items-center shadow-lg border border-white/20">
                  <span className="text-xl font-bold text-white mr-3 ml-2">G</span>
                  <input 
                    type="text" 
                    placeholder={t.searchApps} 
                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-white placeholder-white/70" 
                  />
                  <Search size={18} className="text-white/80 mr-2" />
               </div>

               {/* Apps Grid */}
               <div className="flex-1">
                   <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                      {gridApps.map(app => (
                          <div key={app.id} className="flex flex-col items-center space-y-1 group active:scale-90 transition-transform duration-100" onClick={() => onAppClick(app.id)}>
                              <div className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10">
                                  {/* Reusing the Icon but ensuring it fits nicely */}
                                  <div className="w-full h-full [&>div]:rounded-none [&>div]:shadow-none">
                                    {app.icon}
                                  </div>
                              </div>
                              <span className="text-[11px] font-medium text-center text-white drop-shadow-md truncate w-16">{app.title}</span>
                          </div>
                      ))}
                   </div>
               </div>

               {/* Mobile Dock */}
               <div className="mt-auto mx-2 bg-white/20 dark:bg-black/30 backdrop-blur-2xl rounded-[30px] p-3 border border-white/10 flex justify-between items-center shadow-2xl">
                    <div className="flex-1 flex justify-around items-center">
                         {/* Fake Phone App */}
                         <div onClick={() => showToast("Calling...")} className="w-12 h-12 rounded-[14px] bg-green-500 flex items-center justify-center shadow-lg text-white active:scale-90 transition-transform">
                            <Phone size={24} fill="currentColor" />
                         </div>
                         {/* Fake Message App */}
                         <div onClick={() => showToast("Opening Messages...")} className="w-12 h-12 rounded-[14px] bg-blue-500 flex items-center justify-center shadow-lg text-white active:scale-90 transition-transform">
                            <MessageSquare size={24} fill="currentColor" />
                         </div>
                         {/* Switch to Desktop (Highlighted) */}
                         <div className="w-12 h-12 rounded-[14px] bg-black/80 flex items-center justify-center shadow-lg text-white border border-white/20 active:scale-90 transition-transform" onClick={onSwitchToDesktop}>
                            <Monitor size={24} />
                         </div>
                         {/* Fake Browser */}
                         <div onClick={() => showToast("Opening Chrome...")} className="w-12 h-12 rounded-[14px] bg-yellow-500 flex items-center justify-center shadow-lg text-white active:scale-90 transition-transform">
                            <Chrome size={24} />
                         </div>
                    </div>
               </div>
            </div>
          )}
       </div>

       {/* Toast Notification */}
       {toastMessage && (
           <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full backdrop-blur-md z-50 animate-fadeIn text-sm">
               {toastMessage}
           </div>
       )}

       {/* Android Navigation Bar (Modern Gesture Pill or Buttons) */}
       <div className="absolute bottom-1 w-full h-8 flex justify-center items-center z-50 pointer-events-none">
           {/* Gesture Pill */}
           <div className="w-36 h-1.5 bg-white/80 rounded-full shadow-sm"></div>
       </div>
       
       {/* Back/Home Button Overlay when app is open */}
        {activeAppId && (
            <button 
                onClick={closeApp}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-[60] transition-colors border border-white/10"
            >
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </button>
        )}

    </div>
  );
};