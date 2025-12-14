import React from 'react';
import { Language, AppID } from '../types';
import { translations } from '../utils/translations';
import { Gamepad2, Swords, Layers, Play, Ghost } from 'lucide-react';

interface GameCenterProps {
    lang: Language;
    onLaunch: (id: AppID) => void;
    onLaunchUrl: (url: string, title: string) => void;
}

export const GameCenterApp: React.FC<GameCenterProps> = ({ lang, onLaunch, onLaunchUrl }) => {
    const t = translations[lang];

    const localGames = [
        { id: AppID.UNO, title: t.unoApp, icon: <Layers size={40} className="text-yellow-500" />, bg: 'bg-red-100 dark:bg-red-900/20' },
        { id: AppID.LUDO, title: t.ludoApp, icon: <Gamepad2 size={40} className="text-purple-500" />, bg: 'bg-purple-100 dark:bg-purple-900/20' },
        { id: AppID.CHESS, title: t.chessApp, icon: <Swords size={40} className="text-green-600" />, bg: 'bg-green-100 dark:bg-green-900/20' },
    ];

    const browserGames = [
        { 
            title: 'Level Devil (Demo)', 
            icon: <Ghost size={40} className="text-black dark:text-white" />, 
            url: 'https://archive.org/embed/level-devil_202403', // Embed or simulate
            bg: 'bg-yellow-200 dark:bg-yellow-900/30'
        },
        // Placeholder for more
    ];

    return (
        <div className="h-full bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white p-6 overflow-y-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            
            {/* Header */}
            <div className="flex items-center space-x-4 space-x-reverse mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Gamepad2 size={32} className="text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{t.gameCenterApp}</h1>
                    <p className="opacity-60 text-sm">HamzaOS Arcade</p>
                </div>
            </div>

            {/* Local Games Section */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gamepad2 size={20} /> {t.localGames}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {localGames.map(game => (
                    <div 
                        key={game.id} 
                        onClick={() => onLaunch(game.id)}
                        className={`${game.bg} p-6 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden`}
                    >
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">{game.title}</h3>
                                <span className="text-xs opacity-70">Multiplayer / AI</span>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-black/20 rounded-full">
                                {game.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={16} fill="currentColor" /> {t.playNow}
                        </div>
                    </div>
                ))}
            </div>

            {/* Browser Games Section */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Ghost size={20} /> {t.browserGames}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {browserGames.map((game, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onLaunchUrl(game.url, game.title)}
                        className={`${game.bg} p-6 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group`}
                    >
                         <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">{game.title}</h3>
                                <span className="text-xs opacity-70">Web Browser</span>
                            </div>
                            <div className="p-3 bg-white/50 dark:bg-black/20 rounded-full">
                                {game.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={16} fill="currentColor" /> {t.playNow}
                        </div>
                    </div>
                ))}
                
                {/* Coming Soon */}
                <div className="p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center opacity-60">
                    <span className="font-bold">More Games Coming Soon...</span>
                </div>
            </div>

        </div>
    );
};