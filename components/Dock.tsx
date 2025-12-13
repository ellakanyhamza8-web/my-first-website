import React from 'react';
import { AppConfig, AppID } from '../types';

interface DockProps {
  apps: AppConfig[];
  openAppIds: AppID[];
  activeAppId: AppID | null;
  onAppClick: (id: AppID) => void;
}

export const Dock: React.FC<DockProps> = ({ apps, openAppIds, activeAppId, onAppClick }) => {
  return (
    <div className="
      fixed 
      z-40 
      bg-[#000000]/80 backdrop-blur-md 
      border-white/5
      
      /* Mobile Styles: Bottom Dock */
      bottom-0 left-0 right-0 h-[60px] w-full 
      flex flex-row items-center justify-center space-x-4 border-t
      
      /* Desktop Styles: Left Dock */
      md:top-7 md:bottom-0 md:left-0 md:w-[70px] md:h-auto 
      md:flex-col md:justify-start md:space-x-0 md:space-y-2 md:py-2 md:border-r md:border-t-0
    ">
      {apps.map((app) => {
        const isOpen = openAppIds.includes(app.id);
        const isActive = activeAppId === app.id;

        return (
          <div key={app.id} className="relative group flex justify-center items-center">
            {/* Active Indicator (Dot) */}
            {isOpen && (
              <>
                {/* Desktop Indicator (Left) */}
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-[#E95420] rounded-r-full" />
                {/* Mobile Indicator (Bottom) */}
                <div className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-[#E95420] rounded-t-full" />
              </>
            )}
            
            {/* Hover Tooltip (Desktop Only) */}
            <div className="hidden md:block absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#111] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-gray-700 shadow-xl">
              {app.title}
            </div>

            <button
              onClick={() => onAppClick(app.id)}
              className={`
                w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-200
                ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}
              `}
            >
              {app.icon}
            </button>
          </div>
        );
      })}
      
      {/* App Grid Icon (Visual only) */}
      <div className="
        md:mt-auto md:mb-2 
        w-10 h-10 md:w-12 md:h-12 
        flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-lg
        ml-2 md:ml-0
      ">
         <div className="grid grid-cols-3 gap-1">
             {[...Array(9)].map((_, i) => (
                 <div key={i} className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full opacity-80"></div>
             ))}
         </div>
      </div>
    </div>
  );
};