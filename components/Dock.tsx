import React, { useState, useEffect } from 'react';
import { AppConfig, AppID, Language } from '../types';
import { Wifi, Battery, Volume2, ChevronUp, LayoutGrid, Sparkles } from 'lucide-react';

interface DockProps {
  apps: AppConfig[];
  openAppIds: AppID[];
  activeAppId: AppID | null;
  onAppClick: (id: AppID) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
  onSystemClick: () => void;
  onClockClick: () => void;
  lang: Language;
  onCopilotClick: () => void;
  isCopilotOpen: boolean;
}

export const Dock: React.FC<DockProps> = ({ 
    apps, 
    openAppIds, 
    activeAppId, 
    onAppClick, 
    onStartClick, 
    isStartOpen,
    onSystemClick,
    onClockClick,
    lang,
    onCopilotClick,
    isCopilotOpen
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 h-[72px] bg-[#f3f3f3]/85 dark:bg-[#202020]/85 backdrop-blur-3xl border border-white/40 dark:border-white/10 z-[90] flex items-center px-3 select-none rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-300 gap-3 max-w-[98vw] min-w-max" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* Start Button */}
        <div className="pl-1 pr-1">
             <button 
                onClick={onStartClick}
                className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/50 dark:hover:bg-white/10 active:scale-90 active:bg-white/30 ${isStartOpen ? 'bg-white/40 dark:bg-white/15 shadow-inner' : ''}`}
                title="Start"
            >
                <LayoutGrid size={32} className="text-[#0078D4] drop-shadow-md" strokeWidth={1.5} />
            </button>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-10 bg-gray-400/20 dark:bg-gray-600/20"></div>

        {/* Apps */}
        <div className="flex items-center gap-2 h-full px-1">
            {apps.map((app) => {
                const isOpen = openAppIds.includes(app.id);
                const isActive = activeAppId === app.id;

                return (
                    <div key={app.id} className="relative flex flex-col items-center h-full justify-center group">
                        <button
                            onClick={() => onAppClick(app.id)}
                            className={`
                                w-[52px] h-[52px] rounded-xl flex items-center justify-center transition-all duration-200
                                hover:bg-white/50 dark:hover:bg-white/10 active:scale-90
                                ${isActive ? 'bg-white/40 dark:bg-white/15 shadow-inner' : ''}
                                ${isOpen && !isActive ? 'bg-white/10 dark:bg-white/5' : ''}
                            `}
                            title={app.title}
                        >
                            <div className={`w-8 h-8 transform transition-transform duration-300 ${isActive ? 'scale-100' : 'group-hover:scale-110 active:scale-75'}`}>
                                {React.cloneElement(app.icon as React.ReactElement, { size: 32 })}
                            </div>
                        </button>
                        
                        {/* Windows 11 Pill Indicator */}
                        <div className={`absolute bottom-2 h-[4px] rounded-full transition-all duration-300 ${isActive ? 'w-4 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : isOpen ? 'w-1.5 bg-gray-400 dark:bg-gray-500' : 'w-0'}`} />
                    </div>
                );
            })}
        </div>

         {/* Separator */}
        <div className="w-[1px] h-10 bg-gray-400/20 dark:bg-gray-600/20 ml-auto"></div>

        {/* System Tray Area */}
        <div className="flex items-center gap-2 h-full pr-1 text-xs">
            
            {/* Copilot Button */}
            <button 
                onClick={onCopilotClick}
                className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center transition-all hover:bg-white/50 dark:hover:bg-white/10 active:scale-90 group ${isCopilotOpen ? 'bg-white/40 dark:bg-white/15' : ''}`}
                title="Copilot"
            >
                 <Sparkles size={28} className={`text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600 group-hover:rotate-12 transition-transform duration-500 ${isCopilotOpen ? 'scale-110' : ''}`} fill="url(#copilot-gradient)" strokeWidth={1.5} />
                 {/* SVG Gradient Definition for Icon */}
                 <svg width="0" height="0">
                    <linearGradient id="copilot-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#9333ea" offset="0%" />
                        <stop stopColor="#3b82f6" offset="100%" />
                    </linearGradient>
                </svg>
            </button>

             {/* System Controls */}
             <div 
                onClick={onSystemClick}
                className="flex items-center gap-3 hover:bg-white/50 dark:hover:bg-white/10 h-[52px] px-3 rounded-xl cursor-pointer transition-colors"
            >
                <ChevronUp size={16} className="text-gray-600 dark:text-gray-300 hidden sm:block" />
                <Wifi size={20} className="text-gray-800 dark:text-white" />
                <Volume2 size={20} className="text-gray-800 dark:text-white" />
                <Battery size={20} className="text-gray-800 dark:text-white" />
            </div>

            {/* Clock */}
            <div 
                onClick={onClockClick}
                className="flex flex-col items-end justify-center hover:bg-white/50 dark:hover:bg-white/10 h-[52px] px-3 rounded-xl cursor-pointer transition-colors text-right min-w-[80px]"
            >
                <span className="font-medium text-gray-800 dark:text-white leading-none text-sm mb-0.5">
                    {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}
                </span>
                <span className="text-[11px] text-gray-600 dark:text-gray-300 leading-none">
                    {time.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                </span>
            </div>
        </div>
    </div>
  );
};