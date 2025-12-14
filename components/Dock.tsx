import React from 'react';
import { AppConfig, AppID } from '../types';
import { Grip } from 'lucide-react';

interface DockProps {
  apps: AppConfig[];
  openAppIds: AppID[];
  activeAppId: AppID | null;
  onAppClick: (id: AppID) => void;
  onGridClick: () => void;
}

export const Dock: React.FC<DockProps> = ({ apps, openAppIds, activeAppId, onAppClick, onGridClick }) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40">
        <div className="
            flex items-end space-x-3 space-x-reverse px-3 pb-3 pt-3
            bg-white/30 dark:bg-black/40 backdrop-blur-2xl
            border border-white/20 dark:border-white/10
            rounded-3xl shadow-2xl
            transition-all duration-300
        ">
        {apps.map((app) => {
            const isOpen = openAppIds.includes(app.id);

            return (
            <div key={app.id} className="relative group flex flex-col items-center">
                {/* Hover Tooltip */}
                <div className="absolute -top-14 bg-gray-200 dark:bg-[#222] text-black dark:text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border dark:border-gray-700 font-medium">
                {app.title}
                </div>

                <button
                onClick={() => onAppClick(app.id)}
                className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-[18px] flex items-center justify-center transition-all duration-300 
                    hover:-translate-y-4 hover:scale-110 active:scale-95
                    bg-transparent shadow-none
                `}
                >
                {/* Icons are rendered here. We rely on App.tsx to provide the styled container */}
                <div className="w-full h-full transform transition-transform duration-300 hover:brightness-110">
                     {app.icon}
                </div>
                </button>
                
                {/* Active Indicator (Dot) */}
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-black/60 dark:bg-white/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            );
        })}
        
        <div className="w-[1px] h-12 bg-gray-400/30 mx-2 self-center rounded-full"></div>

        {/* App Grid Icon */}
        <div className="relative group flex flex-col items-center">
            <button 
                onClick={onGridClick}
                className="
                w-14 h-14 md:w-16 md:h-16
                flex items-center justify-center cursor-pointer 
                rounded-[18px] bg-white/20 hover:bg-white/40 
                hover:-translate-y-4 hover:scale-110 transition-all duration-300
                text-gray-800 dark:text-white border border-white/20
                mb-2 backdrop-blur-md shadow-lg
                "
            >
                <Grip size={32} />
            </button>
        </div>
        </div>
    </div>
  );
};