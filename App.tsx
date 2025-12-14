import React, { useState, useEffect } from 'react';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { AboutApp } from './apps/About';
import { TerminalApp } from './apps/Terminal';
import { SettingsApp } from './apps/Settings';
import { ProjectsApp } from './apps/Projects';
import { FilesApp } from './apps/Files';
import { CalculatorApp } from './apps/Calculator';
import { TextEditorApp } from './apps/TextEditor';
import { ChessApp } from './apps/Chess';
import { LudoApp } from './apps/Ludo';
import { UnoApp } from './apps/Uno';
import { GameCenterApp } from './apps/GameCenter';
import { DevStudioApp } from './apps/DevStudio';
import { OfficeApp } from './apps/Office';
import { OdooApp } from './apps/Odoo';
import { AndroidView } from './components/AndroidView';
import { LockScreen } from './components/LockScreen';
import { Copilot } from './components/Copilot';
import { Setup } from './components/Setup';
import { AppID, AppConfig, WindowState, Language } from './types';
import { translations } from './utils/translations';
import { 
    Terminal, Youtube, Code, Settings, Volume2, Wifi, Bluetooth, Battery, 
    Sun, Moon, Lock, Bell, Search, Calculator, FileText, Smartphone,
    Gamepad2, Swords, Layers, WifiOff, BluetoothOff, Laptop2,
    LayoutGrid, MonitorPlay, FolderOpen, PowerOff, User, ArrowRight,
    Table, Presentation
} from 'lucide-react';

const INITIAL_WINDOWS: Record<string, WindowState> = {
  [AppID.ABOUT]: {
    id: AppID.ABOUT,
    title: 'Welcome',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 50 },
    size: { width: 900, height: 650 },
  },
  [AppID.WORD]: {
      id: AppID.WORD,
      title: 'Word',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 80, y: 50 },
      size: { width: 900, height: 700 },
  },
  [AppID.EXCEL]: {
      id: AppID.EXCEL,
      title: 'Excel',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 100, y: 80 },
      size: { width: 900, height: 700 },
  },
  [AppID.POWERPOINT]: {
      id: AppID.POWERPOINT,
      title: 'PowerPoint',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 120, y: 110 },
      size: { width: 900, height: 700 },
  },
  [AppID.ODOO]: {
      id: AppID.ODOO,
      title: 'Odoo',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 140, y: 60 },
      size: { width: 1000, height: 700 },
  },
  [AppID.GAMECENTER]: {
    id: AppID.GAMECENTER,
    title: 'Xbox Games',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 120, y: 50 },
    size: { width: 900, height: 650 },
  },
  [AppID.DEVSTUDIO]: {
    id: AppID.DEVSTUDIO,
    title: 'Dev Studio',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 80 },
    size: { width: 900, height: 700 },
  },
  [AppID.TERMINAL]: {
    id: AppID.TERMINAL,
    title: 'PowerShell',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 150 },
    size: { width: 700, height: 500 },
  },
  [AppID.PROJECTS]: {
    id: AppID.PROJECTS,
    title: 'VS Code',
    isOpen: false,
    isMinimized: false,
    isMaximized: true,
    zIndex: 1,
    position: { x: 80, y: 80 },
    size: { width: 900, height: 600 },
  },
  [AppID.FILES]: {
      id: AppID.FILES,
      title: 'File Explorer',
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
      title: 'Notepad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 200, y: 200 },
      size: { width: 600, height: 400 },
  },
  [AppID.YOUTUBE]: {
      id: AppID.YOUTUBE,
      title: 'Edge - Hamza TV',
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
  },
  [AppID.CHESS]: {
    id: AppID.CHESS,
    title: 'Chess Titans',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 100 },
    size: { width: 550, height: 650 },
  },
  [AppID.LUDO]: {
    id: AppID.LUDO,
    title: 'Ludo Star',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 120 },
    size: { width: 800, height: 600 },
  },
  [AppID.UNO]: {
    id: AppID.UNO,
    title: 'UNO Online',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 100 },
    size: { width: 900, height: 700 },
  }
};

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [windows, setWindows] = useState<Record<string, WindowState>>(INITIAL_WINDOWS);
  const [activeAppId, setActiveAppId] = useState<AppID | null>(AppID.ABOUT);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [wallpaper, setWallpaper] = useState("bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')]");
  
  const [lang, setLang] = useState<Language>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAndroidMode, setIsAndroidMode] = useState(false);
  
  // OOBE State
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  // Lock Screen State (Starts true, but waits for setup check)
  const [isLocked, setIsLocked] = useState(true);
  
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<AppID | null>(null);

  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAppGridOpen, setIsAppGridOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false); 

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(70);

  const [browserGameUrl, setBrowserGameUrl] = useState<{url: string, title: string} | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('win12_username');
    if (storedUser) {
        setUsername(storedUser);
        setIsSetupComplete(true);
        // If returning user, isLocked is true by default
    } else {
        // New user
        setIsSetupComplete(false);
        setIsLocked(false); // Don't lock, show setup instead
    }

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [lang, isDarkMode]);

  const handleSetupComplete = (name: string) => {
      localStorage.setItem('win12_username', name);
      setUsername(name);
      setIsSetupComplete(true);
      // Go straight to desktop after setup
      setIsLocked(false);
  };

  const t = translations[lang];

  // Windows 11 Style Icons
  const APPS: AppConfig[] = [
    {
      id: AppID.ABOUT,
      title: t.aboutApp,
      icon: <LayoutGrid className="text-blue-500" />, 
      component: <AboutApp lang={lang} />,
    },
    // Office Apps
    {
      id: AppID.WORD,
      title: t.wordApp,
      icon: <div className="w-full h-full bg-[#2B579A] rounded-lg flex items-center justify-center shadow-md relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-8 h-8 bg-black/10 rounded-tl-full"></div>
              <FileText className="text-white relative z-10" />
              <span className="absolute bottom-1 right-1 text-[8px] text-white font-bold opacity-50">W</span>
            </div>,
      component: <OfficeApp type="word" />,
    },
    {
      id: AppID.EXCEL,
      title: t.excelApp,
      icon: <div className="w-full h-full bg-[#217346] rounded-lg flex items-center justify-center shadow-md relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-8 h-8 bg-black/10 rounded-tl-full"></div>
              <Table className="text-white relative z-10" />
              <span className="absolute bottom-1 right-1 text-[8px] text-white font-bold opacity-50">X</span>
            </div>,
      component: <OfficeApp type="excel" />,
    },
    {
      id: AppID.POWERPOINT,
      title: t.powerpointApp,
      icon: <div className="w-full h-full bg-[#B7472A] rounded-lg flex items-center justify-center shadow-md relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-8 h-8 bg-black/10 rounded-tl-full"></div>
              <Presentation className="text-white relative z-10" />
              <span className="absolute bottom-1 right-1 text-[8px] text-white font-bold opacity-50">P</span>
            </div>,
      component: <OfficeApp type="powerpoint" />,
    },
    {
      id: AppID.ODOO,
      title: t.odooApp,
      icon: <div className="w-full h-full bg-[#714B67] rounded-lg flex items-center justify-center shadow-md border-b-2 border-[#5a3b52] font-bold text-white tracking-tighter">odoo</div>,
      component: <OdooApp />,
    },
    {
        id: AppID.GAMECENTER,
        title: t.gameCenterApp,
        icon: <div className="w-full h-full bg-[#107C10] rounded-lg flex items-center justify-center shadow-md"><Gamepad2 className="text-white" /></div>,
        component: <GameCenterApp 
                      lang={lang} 
                      onLaunch={(id) => handleAppClick(id)} 
                      onLaunchUrl={(url, title) => setBrowserGameUrl({url, title})}
                   />,
    },
    {
        id: AppID.DEVSTUDIO,
        title: t.devStudioApp,
        icon: <div className="w-full h-full bg-black rounded-lg flex items-center justify-center shadow-md"><Laptop2 className="text-white" /></div>,
        component: <DevStudioApp lang={lang} />,
    },
    {
        id: AppID.FILES,
        title: t.filesApp,
        icon: <div className="w-full h-full bg-[#FE9C28] rounded-lg flex items-center justify-center shadow-md border-b-2 border-[#d98218]"><FolderOpen className="text-white" /></div>,
        component: <FilesApp lang={lang} />,
    },
    {
        id: AppID.YOUTUBE,
        title: t.youtubeApp,
        icon: <div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center shadow-md"><MonitorPlay className="text-white" /></div>,
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
        id: AppID.PROJECTS,
        title: t.projectsApp,
        icon: <div className="w-full h-full bg-[#007ACC] rounded-lg flex items-center justify-center shadow-md"><Code className="text-white" /></div>,
        component: <ProjectsApp lang={lang} />,
    },
    {
        id: AppID.CHESS,
        title: t.chessApp,
        icon: <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-md"><Swords className="text-white" /></div>,
        component: <ChessApp lang={lang} />,
    },
    {
        id: AppID.LUDO,
        title: t.ludoApp,
        icon: <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-md"><Gamepad2 className="text-white" /></div>,
        component: <LudoApp lang={lang} />,
    },
    {
        id: AppID.UNO,
        title: t.unoApp,
        icon: <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md"><Layers className="rotate-90 text-white" /></div>,
        component: <UnoApp lang={lang} />,
    },
    {
      id: AppID.TERMINAL,
      title: t.terminalApp,
      icon: <div className="w-full h-full bg-[#4d4d4d] rounded-lg flex items-center justify-center shadow-md"><Terminal className="text-white" /></div>,
      component: <TerminalApp onClose={() => closeApp(AppID.TERMINAL)} lang={lang} />,
    },
    {
        id: AppID.CALCULATOR,
        title: t.calculatorApp,
        icon: <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-md"><Calculator className="text-black dark:text-white" /></div>,
        component: <CalculatorApp lang={lang} />,
    },
    {
        id: AppID.EDITOR,
        title: t.editorApp,
        icon: <div className="w-full h-full bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center shadow-md"><FileText className="text-blue-600 dark:text-blue-300" /></div>,
        component: <TextEditorApp lang={lang} />,
    },
    {
        id: AppID.ANDROID,
        title: t.androidApp,
        icon: <div className="w-full h-full bg-green-500 rounded-lg flex items-center justify-center shadow-md"><Smartphone className="text-white" /></div>,
        component: null, // Handled separately
    },
    {
      id: AppID.SETTINGS,
      title: t.settingsApp,
      icon: <div className="w-full h-full bg-gray-400 dark:bg-gray-600 rounded-lg flex items-center justify-center shadow-md"><Settings className="text-white animate-spin-slow" /></div>,
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
    if (id === AppID.ABOUT) {
        setIsAppGridOpen(!isAppGridOpen);
        setIsSystemMenuOpen(false);
        setIsCalendarOpen(false);
        return;
    }

    setIsAppGridOpen(false);
    
    if (id === AppID.ANDROID) {
        setIsAndroidMode(true);
        return;
    }

    if (isAndroidMode) {
      setActiveAppId(id);
      return;
    }

    setWindows((prev) => {
      const window = prev[id];
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      
      if (window && window.isOpen && !window.isMinimized && activeAppId === id) {
          return { ...prev, [id]: { ...window, isMinimized: true } };
      }
      
      if (window && window.isMinimized) {
          return { ...prev, [id]: { ...window, isMinimized: false, zIndex: newZ } };
      }

      // Create window if it doesn't exist (though INITIAL_WINDOWS handles most)
      const config = APPS.find(a => a.id === id);
      if (!window && config) {
           return {
               ...prev,
               [id]: {
                   id,
                   title: config.title,
                   isOpen: true,
                   isMinimized: false,
                   isMaximized: false,
                   zIndex: newZ,
                   position: { x: 100, y: 100 },
                   size: config.defaultSize || { width: 800, height: 600 }
               }
           }
      }

      return {
        ...prev,
        [id]: {
          ...window,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
          title: APPS.find(a => a.id === id)?.title || window?.title || ''
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

  const handleOutsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Clear selection if clicking on desktop area but not on an icon
    if (target.id === 'desktop-area') {
        setSelectedDesktopIcon(null);
        if (isSystemMenuOpen) setIsSystemMenuOpen(false);
        if (isCalendarOpen) setIsCalendarOpen(false);
        if (isAppGridOpen) setIsAppGridOpen(false);
    }
  };

  // OOBE Check
  if (!isSetupComplete) {
      return <Setup onComplete={handleSetupComplete} lang={lang} />;
  }

  // Lock Screen Check
  if (isLocked) {
      return <LockScreen onUnlock={() => setIsLocked(false)} lang={lang} wallpaper={wallpaper} username={username || 'User'} />;
  }

  if (browserGameUrl) {
      return (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col">
              <div className="h-10 bg-[#333] flex items-center justify-between px-4 text-white border-b border-gray-700">
                  <span className="font-bold">{browserGameUrl.title}</span>
                  <button onClick={() => setBrowserGameUrl(null)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-xs">Exit Game</button>
              </div>
              <iframe 
                src={browserGameUrl.url} 
                className="flex-1 w-full border-none"
                title="Browser Game"
                allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
              />
          </div>
      )
  }

  if (isAndroidMode) {
     return (
        <AndroidView 
          apps={APPS} 
          activeAppId={activeAppId} 
          onAppClick={handleAppClick} 
          closeApp={() => setActiveAppId(null)}
          lang={lang}
          onSwitchToDesktop={() => setIsAndroidMode(false)}
          isDarkMode={isDarkMode}
        />
     );
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black font-sans" onClick={handleOutsideClick}>
      <div 
         className="absolute inset-0 pointer-events-none z-[100] bg-black transition-opacity duration-100" 
         style={{ opacity: (100 - brightness) / 100 }} 
      />

      <div 
         id="desktop-area"
         className={`absolute inset-0 ${wallpaper} transition-all duration-700 z-0 bg-cover bg-center`} 
      />

      {/* Desktop Shortcut Icons */}
      <div 
        className="absolute top-0 left-0 bottom-24 p-2 flex flex-col flex-wrap content-start gap-2 z-10 w-full pointer-events-none"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
         {APPS.filter(a => a.id !== AppID.ABOUT && a.id !== AppID.ANDROID).map(app => (
            <div 
                key={app.id}
                onDoubleClick={() => handleAppClick(app.id)}
                onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon(app.id); }}
                className={`
                    w-24 h-28 flex flex-col items-center justify-center p-2 rounded-md border border-transparent hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto
                    ${selectedDesktopIcon === app.id ? 'bg-white/20 border-white/20' : ''}
                `}
            >
                <div className="w-12 h-12 mb-1 drop-shadow-lg">
                    {/* Render icon without the background box used in Start Menu/Dock if it has one */}
                    {app.icon}
                </div>
                <span className="text-white text-xs text-center drop-shadow-md line-clamp-2 leading-tight" style={{textShadow: '0 1px 3px rgba(0,0,0,0.8)'}}>
                    {app.title}
                </span>
            </div>
         ))}
      </div>
      
      <div className="absolute top-0 left-0 right-0 bottom-12 overflow-hidden pointer-events-none">
        <div className="w-full h-full relative pointer-events-auto">
            {APPS.map((app) => {
              if (app.id === AppID.ANDROID) return null;
              if (app.id === AppID.ABOUT) return null; 
              if (!windows[app.id]) return null;

              return (
                <Window
                    key={app.id}
                    windowState={windows[app.id]}
                    onClose={closeApp}
                    onMinimize={minimizeApp}
                    onFocus={focusWindow}
                >
                    {app.component}
                </Window>
              );
            })}
        </div>
      </div>

      <Copilot 
         isOpen={isCopilotOpen} 
         onClose={() => setIsCopilotOpen(false)} 
         lang={lang} 
      />

      <Dock 
        apps={APPS.filter(a => a.id !== AppID.ABOUT)} 
        openAppIds={(Object.values(windows) as WindowState[]).filter((w) => w.isOpen).map((w) => w.id)} 
        activeAppId={activeAppId}
        onAppClick={handleAppClick}
        onStartClick={() => handleAppClick(AppID.ABOUT)}
        isStartOpen={isAppGridOpen}
        onSystemClick={() => { setIsSystemMenuOpen(!isSystemMenuOpen); setIsCalendarOpen(false); setIsAppGridOpen(false); }}
        onClockClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsSystemMenuOpen(false); setIsAppGridOpen(false); }}
        lang={lang}
        onCopilotClick={() => setIsCopilotOpen(!isCopilotOpen)}
        isCopilotOpen={isCopilotOpen}
      />

      {isSystemMenuOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-[92px] ${lang === 'ar' ? 'left-4' : 'right-4'} w-80 bg-[#f3f3f3]/95 dark:bg-[#202020]/95 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-4 text-black dark:text-white z-50 border border-white/20 animate-in slide-in-from-bottom-10 fade-in duration-200`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div 
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`p-3 rounded-xl flex items-center space-x-3 space-x-reverse cursor-pointer transition ${wifiEnabled ? 'bg-blue-600 text-white' : 'bg-white/50 dark:bg-gray-700'}`}
             >
                {wifiEnabled ? <Wifi size={20} /> : <WifiOff size={20} />}
                <span className="text-sm font-medium">{t.wifi}</span>
             </div>
             <div 
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                className={`p-3 rounded-xl flex items-center space-x-3 space-x-reverse cursor-pointer transition ${bluetoothEnabled ? 'bg-blue-600 text-white' : 'bg-white/50 dark:bg-gray-700'}`}
             >
                {bluetoothEnabled ? <Bluetooth size={20} /> : <BluetoothOff size={20} />}
                <span className="text-sm font-medium">{t.bluetooth}</span>
             </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl mb-4 space-y-4">
               <div className="flex items-center space-x-3 space-x-reverse">
                    <Sun size={18} />
                    <input 
                        type="range" 
                        min="20" 
                        max="100" 
                        value={brightness}
                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                        className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
               </div>
               <div className="flex items-center space-x-3 space-x-reverse">
                    <Volume2 size={18} />
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
               </div>
          </div>
          
          <div className="flex justify-between items-center px-2">
             <div className="flex gap-2">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition text-gray-800 dark:text-white">
                    {isDarkMode ? <Moon size={20}/> : <Sun size={20} />}
                </button>
             </div>
             <button onClick={() => setIsLocked(true)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition text-gray-800 dark:text-white">
                 <Lock size={20} />
             </button>
          </div>
        </div>
      )}

      {isCalendarOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-[92px] ${lang === 'ar' ? 'left-4' : 'right-4'} w-80 bg-[#f3f3f3]/95 dark:bg-[#202020]/95 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] z-50 border border-white/20 overflow-hidden text-black dark:text-white flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="p-4 flex-1">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">{new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</h3>
             </div>
             <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4 font-medium">
                 {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-gray-500">{d}</span>)}
                 {[...Array(30)].map((_, i) => (
                    <span key={i} className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white cursor-pointer ${i === new Date().getDate() ? 'bg-blue-600 text-white' : ''}`}>{i+1}</span>
                 ))}
             </div>
             <div className="border-t border-gray-400/20 pt-4">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-xs font-bold">{t.notifications}</span>
                    <button className="text-xs text-blue-500 hover:underline">{t.clear}</button>
                 </div>
                 <div className="text-center py-6 text-gray-500 text-sm">
                     <Bell size={24} className="mx-auto mb-2 opacity-50" />
                     {t.noNotifications}
                 </div>
             </div>
          </div>
        </div>
      )}

      {isAppGridOpen && (
        <div 
          className={`absolute bottom-[92px] left-1/2 transform -translate-x-1/2 w-[640px] h-[650px] max-w-[95vw] max-h-[75vh] bg-[#f3f3f3]/95 dark:bg-[#202020]/95 backdrop-blur-3xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[60] border border-white/20 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200`}
          onClick={(e) => e.stopPropagation()}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
           <div className="p-6 pb-2">
               <div className="relative">
                   <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={18} />
                   <input 
                      type="text" 
                      placeholder={t.copilotPlaceholder}
                      className={`w-full border-none rounded-full py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm ${isDarkMode ? 'bg-[#2d2d2d] text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
                      autoFocus
                   />
               </div>
           </div>

           <div className="flex-1 px-8 py-4 overflow-y-auto">
               <div className="flex justify-between items-center mb-4">
                   <span className="text-sm font-bold opacity-80 dark:text-white">Pinned</span>
                   <button className="text-xs bg-white/10 px-2 py-1 rounded text-black dark:text-white">All apps &gt;</button>
               </div>
               
               <div className="grid grid-cols-6 gap-6">
                   {APPS.filter(a => a.id !== AppID.ABOUT).map(app => (
                       <button 
                          key={app.id}
                          onClick={() => handleAppClick(app.id)}
                          className="flex flex-col items-center group gap-2 hover:bg-white/40 dark:hover:bg-white/10 p-2 rounded-xl transition-all active:scale-95"
                       >
                           <div className="w-10 h-10 flex items-center justify-center">
                               {app.icon}
                           </div>
                           <span className={`text-[11px] font-medium text-center truncate w-full ${isDarkMode ? 'text-white' : 'text-black'}`}>{app.title}</span>
                       </button>
                   ))}
               </div>

                <div className="flex justify-between items-center mb-4 mt-8">
                   <span className="text-sm font-bold opacity-80 dark:text-white">Recommended</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
                        <div className="text-blue-500 p-2 bg-white/50 rounded-lg"><FileText size={20} /></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold dark:text-white">Resume_Hamza.pdf</span>
                            <span className="text-[10px] opacity-60 dark:text-gray-300">Recently opened</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
                        <div className="text-green-500 p-2 bg-white/50 rounded-lg"><Gamepad2 size={20} /></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold dark:text-white">Ludo Star</span>
                            <span className="text-[10px] opacity-60 dark:text-gray-300">Recently installed</span>
                        </div>
                    </div>
               </div>
           </div>

           <div className="h-16 border-t border-gray-300/30 dark:border-white/10 flex items-center justify-between px-10 bg-black/5 dark:bg-black/20 rounded-b-3xl">
               <div className="flex items-center gap-3 hover:bg-white/40 dark:hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-colors">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                       <User size={16} />
                   </div>
                   <span className="text-sm font-bold dark:text-white">{username || 'Hamza'}</span>
               </div>
               <button 
                  onClick={() => window.location.reload()}
                  className="p-3 hover:bg-white/40 dark:hover:bg-white/10 rounded-lg text-black dark:text-white transition-colors"
               >
                   <PowerOff size={18} />
               </button>
           </div>
        </div>
      )}
    </div>
  );
}