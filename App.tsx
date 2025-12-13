import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { AboutApp } from './apps/About';
import { TerminalApp } from './apps/Terminal';
import { SettingsApp } from './apps/Settings';
import { AppID, AppConfig, WindowState, Language } from './types';
import { translations } from './utils/translations';
import { Terminal, User, Youtube, Code, FolderOpen, Settings } from 'lucide-react';

const INITIAL_WINDOWS: Record<string, WindowState> = {
  [AppID.ABOUT]: {
    id: AppID.ABOUT,
    title: 'About Hamza',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 50, y: 50 },
    size: { width: 800, height: 600 },
  },
  [AppID.TERMINAL]: {
    id: AppID.TERMINAL,
    title: 'hamza@ubuntu: ~',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 100, y: 100 },
    size: { width: 700, height: 500 },
  },
  [AppID.PROJECTS]: {
    id: AppID.PROJECTS,
    title: 'VS Code - Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: true,
    zIndex: 1,
    position: { x: 80, y: 80 },
    size: { width: 900, height: 600 },
  },
  [AppID.YOUTUBE]: {
      id: AppID.YOUTUBE,
      title: 'Mozilla Firefox - Hamza Full HD',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 120, y: 120 },
      size: { width: 850, height: 550 }
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 150 },
    size: { width: 700, height: 500 },
  }
};

export default function App() {
  const [windows, setWindows] = useState<Record<string, WindowState>>(INITIAL_WINDOWS);
  const [activeAppId, setActiveAppId] = useState<AppID | null>(AppID.ABOUT);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [wallpaper, setWallpaper] = useState('bg-gradient-to-br from-[#5E2750] via-[#2C001E] to-[#E95420]');
  
  // New State for Lang and Theme
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply Language Direction and Theme Class
  useEffect(() => {
    // Direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Theme
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [lang, isDarkMode]);

  const t = translations[lang];

  // App Definitions (Re-created when lang changes to update titles)
  const APPS: AppConfig[] = [
    {
      id: AppID.ABOUT,
      title: t.aboutApp,
      icon: <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg"><User size={24} /></div>,
      component: <AboutApp lang={lang} />,
    },
    {
      id: AppID.TERMINAL,
      title: t.terminalApp,
      icon: <div className="w-10 h-10 bg-[#300a24] border border-gray-600 rounded-lg flex items-center justify-center text-white shadow-lg"><Terminal size={24} /></div>,
      component: <TerminalApp onClose={() => closeApp(AppID.TERMINAL)} lang={lang} />,
    },
    {
      id: AppID.YOUTUBE,
      title: t.youtubeApp,
      icon: <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg"><Youtube size={24} /></div>,
      component: (
        <div className="w-full h-full flex flex-col bg-white dark:bg-[#111] dark:text-gray-100" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="bg-gray-100 dark:bg-[#333] p-2 border-b dark:border-gray-700 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="ltr">https://youtube.com/@hamzaellakany-hf5kw</span>
            </div>
            <div className="flex-1 flex items-center justify-center flex-col bg-gray-50 dark:bg-[#222] p-10 text-center">
                 <Youtube size={64} className="text-red-600 mb-4" />
                 <h2 className="text-2xl font-bold mb-2">{t.youtubeTitle}</h2>
                 <p className="mb-6">{t.channelInfo}</p>
                 <a 
                    href="https://youtube.com/@hamzaellakany-hf5kw?si=yCLTQX9O6_eXccyM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-2 bg-[#E95420] text-white rounded hover:bg-[#c74418] transition-colors"
                 >
                    {t.channelVisit}
                 </a>
            </div>
        </div>
      ),
    },
    {
      id: AppID.PROJECTS,
      title: t.projectsApp,
      icon: <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg"><Code size={24} /></div>,
      component: (
        <div className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono p-4" dir="ltr">
            <div className="flex h-full">
                <div className="w-48 border-r border-gray-700 pr-4 hidden md:block">
                    <div className="text-xs uppercase tracking-wider mb-2 text-gray-500">Explorer</div>
                    <div className="flex items-center space-x-2 hover:bg-[#2d2d2d] cursor-pointer p-1 rounded text-blue-400"><FolderOpen size={14} /> <span>portfolio-v1</span></div>
                    <div className="flex items-center space-x-2 hover:bg-[#2d2d2d] cursor-pointer p-1 rounded ml-4 text-yellow-400"><span>index.html</span></div>
                    <div className="flex items-center space-x-2 hover:bg-[#2d2d2d] cursor-pointer p-1 rounded ml-4 text-blue-300"><span>style.css</span></div>
                    <div className="flex items-center space-x-2 hover:bg-[#2d2d2d] cursor-pointer p-1 rounded text-blue-400 mt-2"><FolderOpen size={14} /> <span>arduino-bot</span></div>
                </div>
                <div className="flex-1 md:pl-4 overflow-y-auto">
                    <h1 className="text-2xl text-white mb-4">My Projects</h1>
                    <ul className="list-disc ml-5 space-y-2">
                        <li><span className="text-[#E95420]">HamzaOS Website:</span> React + Tailwind imitation of Ubuntu.</li>
                        <li><span className="text-[#E95420]">Arduino Smart Home:</span> Controlling lights with C++.</li>
                        <li><span className="text-[#E95420]">Linux Server Config:</span> Automated bash scripts for setup.</li>
                    </ul>
                </div>
            </div>
        </div>
      ),
    },
    {
      id: AppID.SETTINGS,
      title: t.settingsApp,
      icon: <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-white shadow-lg"><Settings size={24} /></div>,
      component: <SettingsApp 
                    currentWallpaper={wallpaper} 
                    onWallpaperChange={setWallpaper} 
                    lang={lang}
                    setLang={setLang}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                 />,
    },
  ];

  const handleAppClick = (id: AppID) => {
    setWindows((prev) => {
      const window = prev[id];
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      
      if (window.isOpen && !window.isMinimized && activeAppId === id) {
          // If already open, focused, click minimizes it
          return {
              ...prev,
              [id]: { ...window, isMinimized: true }
          };
      }

      return {
        ...prev,
        [id]: {
          ...window,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
          // Update title dynamically when opening/focusing
          title: APPS.find(a => a.id === id)?.title || window.title 
        },
      };
    });
    setActiveAppId(id);
  };

  const focusWindow = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1 },
    }));
    setMaxZIndex(prev => prev + 1);
    setActiveAppId(id);
  };

  const closeApp = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeAppId === id) setActiveAppId(null);
  };

  const minimizeApp = (id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    setActiveAppId(null);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-ubuntu bg-black">
      {/* Wallpaper */}
      <div className={`absolute inset-0 ${wallpaper} transition-all duration-700 z-0`} />
      
      {/* Background Logo (Optional subtle overlay) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <div className="w-96 h-96 rounded-full border-[40px] border-white" />
      </div>

      <TopBar lang={lang} />
      
      <Dock 
        apps={APPS} 
        openAppIds={(Object.values(windows) as WindowState[]).filter((w) => w.isOpen).map((w) => w.id)} 
        activeAppId={activeAppId}
        onAppClick={handleAppClick}
      />

      <div className="absolute top-7 md:left-[70px] left-0 right-0 bottom-[60px] md:bottom-0 overflow-hidden pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
            {APPS.map((app) => (
            <Window
                key={app.id}
                windowState={windows[app.id]}
                onClose={closeApp}
                onMinimize={minimizeApp}
                onFocus={focusWindow}
            >
                {app.component}
            </Window>
            ))}
        </div>
      </div>
    </div>
  );
}