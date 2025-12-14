import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { AboutApp } from './apps/About';
import { TerminalApp } from './apps/Terminal';
import { SettingsApp } from './apps/Settings';
import { ProjectsApp } from './apps/Projects';
import { FilesApp } from './apps/Files';
import { CalculatorApp } from './apps/Calculator';
import { TextEditorApp } from './apps/TextEditor';
import { AndroidView } from './components/AndroidView';
import { AppID, AppConfig, WindowState, Language } from './types';
import { translations } from './utils/translations';
import { 
    Terminal, User, Youtube, Code, Settings, Volume2, Wifi, Bluetooth, Battery, Power, 
    Sun, Moon, Lock, Bell, Search, Folder, Calculator, FileText, Smartphone 
} from 'lucide-react';

const INITIAL_WINDOWS: Record<string, WindowState> = {
  [AppID.ABOUT]: {
    id: AppID.ABOUT,
    title: 'About Hamza',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
  },
  [AppID.TERMINAL]: {
    id: AppID.TERMINAL,
    title: 'hamza@macbook: ~',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 150 },
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
  [AppID.FILES]: {
      id: AppID.FILES,
      title: 'Finder',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 120, y: 80 },
      size: { width: 850, height: 550 },
  },
  [AppID.CALCULATOR]: {
      id: AppID.CALCULATOR,
      title: 'Calculator',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 250, y: 200 },
      size: { width: 300, height: 450 },
  },
  [AppID.EDITOR]: {
      id: AppID.EDITOR,
      title: 'Notes',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 200, y: 200 },
      size: { width: 600, height: 400 },
  },
  [AppID.YOUTUBE]: {
      id: AppID.YOUTUBE,
      title: 'Safari - Hamza Full HD',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 120, y: 120 },
      size: { width: 850, height: 550 }
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'System Preferences',
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
  const [wallpaper, setWallpaper] = useState('bg-gradient-to-br from-[#c62368] via-[#d74c6d] to-[#0072bc]');
  
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAndroidMode, setIsAndroidMode] = useState(false);

  // New Interactive States
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAppGridOpen, setIsAppGridOpen] = useState(false);

  // Apply Language Direction and Theme Class
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [lang, isDarkMode]);

  const t = translations[lang];

  // Enhanced Icon Styles: Larger, Better Gradients, Inner Shadows for 3D effect
  const iconBaseClass = "w-full h-full rounded-[18px] flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] bg-gradient-to-br border border-white/10";

  const APPS: AppConfig[] = [
    {
        id: AppID.FILES,
        title: t.filesApp,
        icon: <div className={`${iconBaseClass} from-[#007AFF] to-[#0055B3]`}><Folder size={32} className="fill-white/20 text-white" /></div>,
        component: <FilesApp lang={lang} />,
    },
    {
        id: AppID.YOUTUBE,
        title: t.youtubeApp,
        icon: <div className={`${iconBaseClass} from-[#FF0000] to-[#CC0000]`}><Youtube size={32} className="fill-white" /></div>,
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
                      className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                   >
                      {t.channelVisit}
                   </a>
              </div>
          </div>
        ),
      },
    {
      id: AppID.ABOUT,
      title: t.aboutApp,
      icon: <div className={`${iconBaseClass} from-[#8E8E93] to-[#48484A]`}><User size={32} /></div>,
      component: <AboutApp lang={lang} />,
    },
    {
      id: AppID.TERMINAL,
      title: t.terminalApp,
      icon: <div className={`${iconBaseClass} from-[#2c2c2e] to-[#000000]`}><Terminal size={32} className="text-[#00ff00]" /></div>,
      component: <TerminalApp onClose={() => closeApp(AppID.TERMINAL)} lang={lang} />,
    },
    {
        id: AppID.PROJECTS,
        title: t.projectsApp,
        icon: <div className={`${iconBaseClass} from-[#007ACC] to-[#005A9C]`}><Code size={32} /></div>,
        component: <ProjectsApp lang={lang} />,
    },
    {
        id: AppID.CALCULATOR,
        title: t.calculatorApp,
        icon: <div className={`${iconBaseClass} from-[#FF9500] to-[#E08400]`}><Calculator size={32} /></div>,
        component: <CalculatorApp lang={lang} />,
    },
    {
        id: AppID.EDITOR,
        title: t.editorApp,
        icon: <div className={`${iconBaseClass} from-[#FFD60A] to-[#D4AF37]`}><FileText size={32} /></div>,
        component: <TextEditorApp lang={lang} />,
    },
    {
      id: AppID.SETTINGS,
      title: t.settingsApp,
      icon: <div className={`${iconBaseClass} from-[#AEAEB2] to-[#636366]`}><Settings size={32} className="text-gray-100 animate-spin-slow" /></div>,
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
    // Close App Grid if open
    if (isAppGridOpen) setIsAppGridOpen(false);

    // If in Android Mode, just set active app id
    if (isAndroidMode) {
      setActiveAppId(id);
      return;
    }

    setWindows((prev) => {
      const window = prev[id];
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      
      if (window.isOpen && !window.isMinimized && activeAppId === id) {
          return { ...prev, [id]: { ...window, isMinimized: true } };
      }

      return {
        ...prev,
        [id]: {
          ...window,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
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
    if (isAndroidMode) {
      setActiveAppId(null);
      return;
    }
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: false } }));
    if (activeAppId === id) setActiveAppId(null);
  };

  const minimizeApp = (id: AppID) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
    setActiveAppId(null);
  };

  // Close menus when clicking outside
  const handleOutsideClick = () => {
    if (isSystemMenuOpen) setIsSystemMenuOpen(false);
    if (isCalendarOpen) setIsCalendarOpen(false);
  };

  // Android Mode Render
  if (isAndroidMode) {
     return (
        <AndroidView 
          apps={APPS} 
          activeAppId={activeAppId} 
          onAppClick={handleAppClick} 
          closeApp={() => setActiveAppId(null)}
          lang={lang}
          onSwitchToDesktop={() => setIsAndroidMode(false)}
        />
     );
  }

  // Desktop Mode Render
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black font-sans" onClick={handleOutsideClick}>
      {/* Wallpaper */}
      <div className={`absolute inset-0 ${wallpaper} transition-all duration-700 z-0 bg-cover bg-center`} />
      
      {/* Top Bar */}
      <TopBar 
        lang={lang} 
        onSystemMenuClick={() => { setTimeout(() => setIsSystemMenuOpen(!isSystemMenuOpen), 0); setIsCalendarOpen(false); }}
        onCalendarClick={() => { setTimeout(() => setIsCalendarOpen(!isCalendarOpen), 0); setIsSystemMenuOpen(false); }}
        onActivitiesClick={() => setIsAppGridOpen(true)}
      />
      
      {/* Dock */}
      <Dock 
        apps={APPS} 
        openAppIds={(Object.values(windows) as WindowState[]).filter((w) => w.isOpen).map((w) => w.id)} 
        activeAppId={activeAppId}
        onAppClick={handleAppClick}
        onGridClick={() => setIsAppGridOpen(true)}
      />

      {/* Windows Area */}
      <div className="absolute top-8 left-0 right-0 bottom-24 overflow-hidden pointer-events-none">
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

      {/* System Menu Overlay (Control Center Style) */}
      {isSystemMenuOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-2 w-80 bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 text-black dark:text-white z-50 border border-white/20"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Toggles */}
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="bg-white/50 dark:bg-gray-800/80 p-3 rounded-xl flex items-center space-x-3 space-x-reverse cursor-pointer hover:bg-white/70 transition">
                <div className="bg-blue-500 p-2 rounded-full text-white"><Wifi size={18} /></div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Wi-Fi</span>
                    <span className="text-xs opacity-70">Hamza-5G</span>
                </div>
             </div>
             <div className="bg-white/50 dark:bg-gray-800/80 p-3 rounded-xl flex items-center space-x-3 space-x-reverse cursor-pointer hover:bg-white/70 transition">
                <div className="bg-gray-400 p-2 rounded-full text-white"><Bluetooth size={18} /></div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Bluetooth</span>
                    <span className="text-xs opacity-70">Off</span>
                </div>
             </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/80 p-4 rounded-xl mb-4 space-y-4">
               <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-xs font-medium w-6 text-center"><Sun size={16} /></span>
                    <input type="range" className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white" />
               </div>
               <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-xs font-medium w-6 text-center"><Volume2 size={16} /></span>
                    <input type="range" className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white" />
               </div>
          </div>
          
          {/* Switch to Android Button */}
          <button 
             onClick={() => { setIsAndroidMode(true); setIsSystemMenuOpen(false); }}
             className="w-full bg-green-500/90 hover:bg-green-600 p-3 rounded-xl flex items-center justify-center space-x-2 space-x-reverse text-white mb-4 transition-colors shadow-lg"
          >
             <Smartphone size={20} />
             <span className="font-bold">Android Mode</span>
          </button>

          <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/80 p-2 rounded-xl">
             <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-black/10 rounded-full transition">
                 {isDarkMode ? <Moon size={20}/> : <Sun size={20} />}
             </button>
             <button onClick={() => window.location.reload()} className="p-2 hover:bg-red-500/20 text-red-500 rounded-full transition">
                 <Power size={20} />
             </button>
          </div>
        </div>
      )}

      {/* Calendar Overlay */}
      {isCalendarOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-10 right-4 w-80 bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-2xl shadow-2xl z-50 border border-white/20 overflow-hidden text-black dark:text-white flex flex-col"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="p-4 flex-1">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">{new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</h3>
             </div>
             {/* Simple Calendar Grid Mockup */}
             <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4 font-medium">
                 {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-gray-500">{d}</span>)}
                 {[...Array(30)].map((_, i) => (
                    <span key={i} className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500/30 cursor-pointer ${i === new Date().getDate() ? 'bg-red-500 text-white' : ''}`}>{i+1}</span>
                 ))}
             </div>
             <div className="border-t border-gray-400/20 pt-4">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-xs font-bold">{t.notifications}</span>
                 </div>
                 <div className="text-center py-6 text-gray-500 text-sm">
                     <Bell size={24} className="mx-auto mb-2 opacity-50" />
                     {t.noNotifications}
                 </div>
             </div>
          </div>
        </div>
      )}

      {/* App Grid Overlay (Launchpad) */}
      {isAppGridOpen && (
        <div 
          className="absolute inset-0 z-[60] bg-white/30 dark:bg-black/40 backdrop-blur-2xl flex flex-col animate-fadeIn"
          onClick={() => setIsAppGridOpen(false)}
        >
           {/* Search Bar */}
           <div className="mt-20 w-full max-w-xl mx-auto px-4" onClick={(e) => e.stopPropagation()}>
               <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                   <input 
                      type="text" 
                      placeholder="Search" 
                      className="w-full bg-white/20 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/30 shadow-xl"
                   />
               </div>
           </div>

           {/* Grid */}
           <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
               <div className="grid grid-cols-4 md:grid-cols-6 gap-x-8 gap-y-12">
                   {APPS.map(app => (
                       <button 
                          key={app.id}
                          onClick={() => handleAppClick(app.id)}
                          className="flex flex-col items-center group"
                       >
                           <div className="w-20 h-20 rounded-[22px] flex items-center justify-center text-white shadow-2xl mb-3 transition-transform group-hover:scale-110">
                               {/* Clone icon but force full size as container does styling */}
                               <div className="w-full h-full transform scale-100 [&>div]:shadow-none [&>div]:border-none">
                                   {app.icon}
                               </div>
                           </div>
                           <span className="text-white font-medium text-sm shadow-black drop-shadow-md">{app.title}</span>
                       </button>
                   ))}
               </div>
           </div>
        </div>
      )}
    </div>
  );
}