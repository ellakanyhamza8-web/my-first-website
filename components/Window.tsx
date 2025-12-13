import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
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
  
  // Update local position when prop changes (e.g. initial open)
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
    // Phone Mode: Full screen minus topbar and bottom dock
    style = {
      top: '28px',
      left: 0,
      right: 0,
      bottom: '60px',
      width: '100%',
      height: 'auto',
      borderRadius: 0,
    };
  } else if (windowState.isMaximized) {
    // Desktop Maximized
    style = {
      top: '28px',
      left: '70px',
      right: 0,
      bottom: 0,
      width: 'auto',
      height: 'auto',
      borderRadius: 0,
    };
  } else {
    // Desktop Windowed
    style = {
      top: position.y,
      left: position.x,
      width: windowState.size.width,
      height: windowState.size.height,
    };
  }

  return (
    <div
      className="absolute bg-[#3E3E3E] dark:bg-gray-900 rounded-t-lg shadow-2xl flex flex-col overflow-hidden border border-[#1e1e1e] dark:border-gray-800 transition-colors duration-300"
      style={{ ...style, zIndex: windowState.zIndex }}
      onMouseDown={() => onFocus(windowState.id)}
      dir="ltr"
    >
      {/* Title Bar */}
      <div
        className="h-9 bg-[#2C001E] dark:bg-black flex justify-between items-center px-3 cursor-default select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="text-gray-300 text-sm font-medium">{windowState.title}</div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <Minus size={14} />
          </button>
          {!isMobile && (
            <button
              className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
            >
               {windowState.isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="p-1 rounded-full bg-[#E95420] text-white hover:bg-[#c74418]"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#F7F7F7] dark:bg-[#1a1a1a] dark:text-gray-200 overflow-auto relative text-gray-900 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};