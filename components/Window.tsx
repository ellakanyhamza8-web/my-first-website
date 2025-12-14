import React, { useState, useEffect } from 'react';
import { AppID, WindowState } from '../types';
import { Minus, Square, X, Copy } from 'lucide-react';

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      top: '0',
      left: 0,
      right: 0,
      bottom: '100px', // Above Taskbar
      width: '100%',
      height: 'auto',
      borderRadius: 0,
    };
  } else if (windowState.isMaximized) {
    style = {
      top: '0',
      left: 0,
      right: 0,
      bottom: '110px', // Above Large Floating Taskbar (Raised position)
      width: '100%',
      height: 'auto',
      borderRadius: 0,
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

  const isTerminal = windowState.id === AppID.TERMINAL;

  return (
    <div
      className={`absolute flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-opacity duration-200 animate-scaleIn border border-gray-200 dark:border-gray-700
      ${isTerminal ? 'bg-[#1e1e1e]/95 backdrop-blur-md' : 'bg-[#f9f9f9] dark:bg-[#202020]'}
      `}
      style={{ ...style, zIndex: windowState.zIndex }}
      onMouseDown={() => onFocus(windowState.id)}
      dir="ltr" 
    >
      {/* Windows 11 Title Bar (Mica Effect) */}
      <div
        className={`h-10 flex items-center justify-between select-none
        ${isTerminal ? 'bg-transparent text-gray-300' : 'bg-white/50 dark:bg-[#2c2c2c] text-black dark:text-white backdrop-blur-sm'}`}
        onMouseDown={handleMouseDown}
      >
        {/* Title & Icon */}
        <div className="flex-1 px-4 text-xs flex items-center gap-2 overflow-hidden">
            <span className="font-semibold opacity-80 truncate">{windowState.title}</span>
        </div>

        {/* Windows Controls (Right Aligned) */}
        <div className="flex h-full items-start">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="w-12 h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
             <Minus size={14} strokeWidth={1.5} />
          </button>
          <button
            className="w-12 h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
             {windowState.isMaximized ? <Copy size={12} strokeWidth={1.5} /> : <Square size={12} strokeWidth={1.5} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="w-12 h-full flex items-center justify-center hover:bg-[#c42b1c] hover:text-white transition-colors group rounded-tr-lg"
          >
             <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto relative ${isTerminal ? 'bg-transparent' : 'bg-white dark:bg-[#1a1a1a]'}`}>
        {children}
      </div>
    </div>
  );
};