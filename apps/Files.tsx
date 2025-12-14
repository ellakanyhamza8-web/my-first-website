import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { 
    Folder, FileText, Image as ImageIcon, Music, Trash2, Home, Download, 
    Monitor, ChevronRight, ChevronLeft, Search, Grid, List 
} from 'lucide-react';

interface FilesAppProps {
    lang: Language;
}

type FileType = 'folder' | 'text' | 'image' | 'audio';

interface FileSystemItem {
    name: string;
    type: FileType;
    size?: string;
    items?: FileSystemItem[]; // For folders
}

export const FilesApp: React.FC<FilesAppProps> = ({ lang }) => {
    const t = translations[lang];

    // Mock File System
    const fileSystem: Record<string, FileSystemItem[]> = {
        'Home': [
            { name: 'Desktop', type: 'folder' },
            { name: 'Documents', type: 'folder' },
            { name: 'Downloads', type: 'folder' },
            { name: 'Pictures', type: 'folder' },
            { name: 'Music', type: 'folder' },
        ],
        'Desktop': [
            { name: 'project_notes.txt', type: 'text', size: '2 KB' },
            { name: 'Screenshot_2024.png', type: 'image', size: '1.2 MB' },
        ],
        'Documents': [
            { name: 'CV_Hamza.pdf', type: 'text', size: '450 KB' },
            { name: 'School_Project.docx', type: 'text', size: '22 KB' },
        ],
        'Downloads': [
            { name: 'ubuntu-22.04-iso', type: 'folder' },
            { name: 'installer_script.sh', type: 'text', size: '4 KB' },
        ],
        'Pictures': [
            { name: 'Wallpapers', type: 'folder' },
            { name: 'me.jpg', type: 'image', size: '3.4 MB' },
        ],
        'Music': [
            { name: 'chill_beats.mp3', type: 'audio', size: '5 MB' },
        ],
        'Trash': [
            { name: 'old_file.txt', type: 'text', size: '1 KB' },
        ]
    };

    const [currentPath, setCurrentPath] = useState<string>('Home');
    const [history, setHistory] = useState<string[]>(['Home']);
    const [historyIndex, setHistoryIndex] = useState(0);

    const sidebarItems = [
        { id: 'Home', icon: <Home size={18} />, label: t.home },
        { id: 'Desktop', icon: <Monitor size={18} />, label: t.desktop },
        { id: 'Documents', icon: <FileText size={18} />, label: t.documents },
        { id: 'Downloads', icon: <Download size={18} />, label: t.downloads },
        { id: 'Pictures', icon: <ImageIcon size={18} />, label: t.pictures },
        { id: 'Music', icon: <Music size={18} />, label: t.music },
        { id: 'Trash', icon: <Trash2 size={18} />, label: t.trash },
    ];

    const navigateTo = (folderName: string) => {
        let newPath = folderName;
        if (!fileSystem[folderName]) {
             newPath = folderName;
        }

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPath);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(newPath);
    };

    const navigateBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
        }
    };

    const navigateForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
        }
    };

    const currentItems = fileSystem[currentPath] || [];

    const getIcon = (type: FileType) => {
        switch (type) {
            case 'folder': return <Folder size={48} className="text-[#FCD34D] fill-[#FCD34D]" />;
            case 'image': return <ImageIcon size={48} className="text-purple-500" />;
            case 'audio': return <Music size={48} className="text-pink-500" />;
            default: return <FileText size={48} className="text-blue-400" />;
        }
    };

    return (
        <div className="flex h-full bg-white/60 dark:bg-[#111]/80 backdrop-blur-xl text-gray-800 dark:text-gray-200" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Glass Sidebar */}
            <div className="w-56 bg-gray-50/50 dark:bg-[#1a1a1a]/50 border-r border-gray-200/50 dark:border-white/5 flex flex-col py-4 backdrop-blur-md">
                {sidebarItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`flex items-center space-x-3 space-x-reverse px-4 py-2 mx-2 rounded-lg transition-all ${currentPath === item.id ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold' : 'hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                    >
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header/Toolbar */}
                <div className="h-14 border-b border-gray-200/50 dark:border-white/5 flex items-center px-6 space-x-4 space-x-reverse">
                    <div className="flex items-center space-x-2">
                        <button onClick={navigateBack} disabled={historyIndex === 0} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 transition-colors">
                            <ChevronLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </button>
                        <button onClick={navigateForward} disabled={historyIndex === history.length - 1} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 transition-colors">
                            <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </button>
                    </div>
                    
                    <div className="flex-1 bg-gray-100 dark:bg-[#2d2d2d] rounded-md px-4 py-2 text-sm flex items-center text-gray-600 dark:text-gray-300 shadow-inner">
                        <Home size={14} className="mr-2 opacity-50" />
                        {lang === 'ar' ? '/ ' : ''}{currentPath}{lang !== 'ar' ? ' /' : ''}
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" />
                            <input type="text" placeholder="Search" className="pl-9 pr-3 py-1.5 bg-gray-100 dark:bg-[#2d2d2d] rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Grid View */}
                <div className="flex-1 overflow-y-auto p-6">
                    {currentItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Folder size={64} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium">{t.emptyFolder}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                            {currentItems.map((item, idx) => (
                                <div 
                                    key={idx}
                                    onDoubleClick={() => item.type === 'folder' ? navigateTo(item.name) : null}
                                    className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-500/10 dark:hover:bg-white/5 cursor-pointer group transition-all duration-200 border border-transparent hover:border-blue-500/20"
                                >
                                    <div className="mb-3 transition-transform group-hover:scale-105 drop-shadow-md">
                                        {getIcon(item.type)}
                                    </div>
                                    <span className="text-xs text-center font-medium truncate w-full px-2 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{item.name}</span>
                                    {item.size && <span className="text-[10px] text-gray-400 mt-1">{item.size}</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};