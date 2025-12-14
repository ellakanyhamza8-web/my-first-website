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
        // If it's a known path in fileSystem root or a subfolder of current
        // For simplicity in this demo, we flatten navigation or check existence
        let newPath = folderName;
        // Simple logic: if folderName exists in keys, go there. 
        if (!fileSystem[folderName]) {
             // It might be a subfolder not fully implemented in the root keys for this demo, 
             // but let's assume if clicked from current view, it works if defined
             // For the demo, we only navigate to top-level keys or clear subfolders
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
            case 'folder': return <Folder size={48} className="text-[#E95420] fill-[#E95420]/20" />;
            case 'image': return <ImageIcon size={48} className="text-purple-500" />;
            case 'audio': return <Music size={48} className="text-blue-500" />;
            default: return <FileText size={48} className="text-gray-500" />;
        }
    };

    return (
        <div className="flex h-full bg-[#f7f7f7] dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Sidebar */}
            <div className="w-48 md:w-56 bg-[#f0f0f0] dark:bg-[#252526] border-r dark:border-black flex flex-col py-4">
                {sidebarItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`flex items-center space-x-3 space-x-reverse px-4 py-2 mx-2 rounded-lg transition-colors ${currentPath === item.id ? 'bg-[#E95420] text-white' : 'hover:bg-gray-200 dark:hover:bg-[#333]'}`}
                    >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header/Toolbar */}
                <div className="h-12 border-b dark:border-black flex items-center px-4 space-x-4 space-x-reverse bg-white dark:bg-[#1e1e1e]">
                    <div className="flex items-center bg-gray-100 dark:bg-[#2d2d2d] rounded-lg p-1">
                        <button onClick={navigateBack} disabled={historyIndex === 0} className="p-1 rounded hover:bg-white dark:hover:bg-[#444] disabled:opacity-30">
                            <ChevronLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </button>
                        <button onClick={navigateForward} disabled={historyIndex === history.length - 1} className="p-1 rounded hover:bg-white dark:hover:bg-[#444] disabled:opacity-30">
                            <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </button>
                    </div>
                    
                    <div className="flex-1 bg-gray-100 dark:bg-[#2d2d2d] rounded-lg px-4 py-1.5 text-sm font-medium flex items-center text-gray-600 dark:text-gray-300">
                        {lang === 'ar' ? '/ ' : ''}{currentPath}{lang !== 'ar' ? ' /' : ''}
                    </div>

                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded">
                        <Search size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded">
                        <List size={18} />
                    </button>
                </div>

                {/* Grid View */}
                <div className="flex-1 overflow-y-auto p-4">
                    {currentItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Folder size={64} className="mb-4 opacity-20" />
                            <p>{t.emptyFolder}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {currentItems.map((item, idx) => (
                                <div 
                                    key={idx}
                                    onDoubleClick={() => item.type === 'folder' ? navigateTo(item.name) : null}
                                    className="flex flex-col items-center p-4 rounded-lg hover:bg-[#E95420]/10 dark:hover:bg-white/5 cursor-pointer group transition-colors"
                                >
                                    <div className="mb-2 transition-transform group-hover:scale-110">
                                        {getIcon(item.type)}
                                    </div>
                                    <span className="text-sm text-center font-medium truncate w-full px-2">{item.name}</span>
                                    {item.size && <span className="text-xs text-gray-400 mt-1">{item.size}</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};