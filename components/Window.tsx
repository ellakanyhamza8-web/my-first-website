import React, { useRef, useState, useEffect } from 'react';
import { AppID, WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  onClose: (id: AppID) => void;
  onMinimize: (id: AppID) => void;
  onFocus: (id: AppID) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(windowState.position);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle Resize for Mobile Detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Update local position when prop changes
  useEffect(() => {
    setPosition(windowState.position);
  }, [windowState.position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized || isMobile) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus(windowState.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  // Style Logic
  let style: React.CSSProperties = {};
  
  if (isMobile) {
    style = {
      top: '32px',
      left: 0,
      right: 0,
      bottom: '80px', // More space for floating dock
      width: '100%',
      height: 'auto',
      borderRadius: 0,
    };
  } else if (windowState.isMaximized) {
    style = {
      top: '32px',
      left: 0,
      right: 0,
      bottom: '80px', // Space for Dock
      width: 'auto',
      height: 'auto',
      borderRadius: '12px',
      margin: '0 8px',
    };
  } else {
    style = {
      top: position.y,
      left: position.x,
      width: windowState.size.width,
      height: windowState.size.height,
      borderRadius: '12px',
    };
  }

  return (
    <div
      className="absolute bg-white dark:bg-[#1e1e1e] flex flex-col overflow-hidden shadow-2xl transition-colors duration-300"
      style={{ ...style, zIndex: windowState.zIndex, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
      onMouseDown={() => onFocus(windowState.id)}
      dir="ltr" // Force LTR for layout consistency of window controls
    >
      {/* macOS Title Bar */}
      <div
        className="h-10 bg-[#f0f0f0] dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-black flex items-center justify-between px-4 cursor-default select-none rounded-t-xl"
        onMouseDown={handleMouseDown}
      >
        {/* Traffic Lights (Left Side) */}
        <div className="flex space-x-2 items-center group">
           <button
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center hover:brightness-90 transition-all"
          >
             <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/50">×</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center hover:brightness-90 transition-all"
          >
             <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/50">−</span>
          </button>
          <button
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center hover:brightness-90 transition-all"
          >
             <span className="opacity-0 group-hover:opacity-100 text-[6px] font-bold text-black/50">sw</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-gray-700 dark:text-gray-300 text-sm font-semibold flex-1 text-center">
            {windowState.title}
        </div>

        {/* Spacer to balance title */}
        <div className="w-14"></div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-[#1a1a1a] dark:text-gray-200 overflow-auto relative text-gray-900 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};