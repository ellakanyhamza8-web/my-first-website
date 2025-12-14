import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { 
    Folder, FileText, Image as ImageIcon, Music, Trash2, Home, Download, 
    Monitor, ChevronRight, ChevronLeft, Search, Grid, List, ArrowUp,
    Plus, Scissors, Copy, Clipboard, Share2, MoreHorizontal, HardDrive,
    Cloud, Star, Video, File, X
} from 'lucide-react';

interface FilesAppProps {
    lang: Language;
}

type FileType = 'folder' | 'text' | 'image' | 'audio' | 'video' | 'pdf' | 'app';
type ViewMode = 'grid' | 'list';

interface FileSystemItem {
    name: string;
    type: FileType;
    size?: string;
    date?: string;
}

export const FilesApp: React.FC<FilesAppProps> = ({ lang }) => {
    const t = translations[lang];

    // Mock File System
    const fileSystem: Record<string, FileSystemItem[]> = {
        'Quick Access': [
            { name: 'Desktop', type: 'folder', date: 'Yesterday' },
            { name: 'Downloads', type: 'folder', date: 'Today' },
            { name: 'Documents', type: 'folder', date: 'Just now' },
            { name: 'Pictures', type: 'folder', date: 'Last week' },
        ],
        'Desktop': [
            { name: 'project_notes.txt', type: 'text', size: '2 KB', date: '10/10/2023 2:30 PM' },
            { name: 'Screenshot_2024.png', type: 'image', size: '1.2 MB', date: '10/11/2023 5:45 PM' },
            { name: 'Ludo Star', type: 'app', size: '45 MB', date: 'Today' },
        ],
        'Documents': [
            { name: 'CV_Hamza.pdf', type: 'pdf', size: '450 KB', date: '01/01/2024 10:00 AM' },
            { name: 'School_Project.docx', type: 'text', size: '22 KB', date: '05/15/2024 11:20 AM' },
            { name: 'Business Plan', type: 'folder', date: 'Yesterday' },
        ],
        'Downloads': [
            { name: 'ubuntu-22.04-iso', type: 'folder', date: 'Last month' },
            { name: 'installer_script.sh', type: 'text', size: '4 KB', date: 'Yesterday' },
        ],
        'Pictures': [
            { name: 'Wallpapers', type: 'folder', date: '2023' },
            { name: 'me.jpg', type: 'image', size: '3.4 MB', date: '2022' },
        ],
        'Music': [
            { name: 'chill_beats.mp3', type: 'audio', size: '5 MB', date: '2023' },
        ],
        'Videos': [
             { name: 'Tutorial.mp4', type: 'video', size: '150 MB', date: '2024' }
        ],
        'Trash': [
            { name: 'old_file.txt', type: 'text', size: '1 KB', date: '2020' },
        ],
        'This PC': [
            { name: 'Desktop', type: 'folder', date: '' },
            { name: 'Documents', type: 'folder', date: '' },
            { name: 'Downloads', type: 'folder', date: '' },
            { name: 'Music', type: 'folder', date: '' },
            { name: 'Pictures', type: 'folder', date: '' },
            { name: 'Videos', type: 'folder', date: '' },
            { name: 'Local Disk (C:)', type: 'folder', size: '120 GB free', date: '' },
        ]
    };

    const [currentPath, setCurrentPath] = useState<string>('Quick Access');
    const [history, setHistory] = useState<string[]>(['Quick Access']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const navigateTo = (folderName: string) => {
        // Special case for drives or shortcuts
        if (folderName === 'Local Disk (C:)') {
             // Simulate root of drive
             // For demo, just go to Documents
             folderName = 'Documents'; 
        }

        let newPath = folderName;
        // Check if folder exists in mock DB, if not, stay or handle error
        if (!fileSystem[newPath]) {
             // If navigating to a folder inside current path (mocking deeper nav)
             // We just reset for this demo unless it's a known key
             if (currentPath === 'This PC' && ['Desktop','Documents','Downloads','Music','Pictures','Videos'].includes(folderName)) {
                 newPath = folderName;
             } else {
                 return; // Can't nav
             }
        }

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPath);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(newPath);
        setSelectedItem(null);
    };

    const navigateBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelectedItem(null);
        }
    };

    const navigateForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
            setSelectedItem(null);
        }
    };

    const navigateUp = () => {
        if (['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'].includes(currentPath)) {
            navigateTo('This PC');
        } else if (currentPath === 'This PC') {
            navigateTo('Quick Access');
        }
    };

    const currentItems = fileSystem[currentPath] || [];

    const getIcon = (type: FileType, name: string) => {
        if (name.includes('Local Disk')) return <HardDrive size={32} className="text-gray-500" />;
        switch (type) {
            case 'folder': return <div className="w-full h-full flex items-center justify-center"><Folder size={viewMode === 'grid' ? 48 : 20} className="text-[#FCD34D] fill-[#FCD34D]" /></div>;
            case 'image': return <ImageIcon size={viewMode === 'grid' ? 48 : 20} className="text-purple-500" />;
            case 'audio': return <Music size={viewMode === 'grid' ? 48 : 20} className="text-pink-500" />;
            case 'video': return <Video size={viewMode === 'grid' ? 48 : 20} className="text-red-500" />;
            case 'pdf': return <FileText size={viewMode === 'grid' ? 48 : 20} className="text-red-600" />;
            case 'app': return <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">APP</div>;
            default: return <FileText size={viewMode === 'grid' ? 48 : 20} className="text-blue-400" />;
        }
    };

    const SidebarItem = ({ icon, label, path, active }: any) => (
        <button
            onClick={() => navigateTo(path)}
            className={`w-full flex items-center space-x-3 space-x-reverse px-2 py-1.5 rounded-md transition-all text-sm mb-1 ${active ? 'bg-blue-100 dark:bg-white/10 text-blue-700 dark:text-blue-400 font-medium' : 'hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'}`}
        >
            {icon}
            <span className="truncate">{label}</span>
        </button>
    );

    return (
        <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#191919] text-gray-900 dark:text-gray-100 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            
            {/* Command Bar */}
            <div className="h-14 flex items-center px-2 bg-[#f9f9f9] dark:bg-[#202020] border-b border-gray-200 dark:border-gray-800 space-x-1 space-x-reverse">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors bg-blue-600 text-white hover:bg-blue-700">
                    <Plus size={16} /> <span className="text-sm font-medium">New</span>
                </button>
                <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Cut"><Scissors size={18} /></button>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Copy"><Copy size={18} /></button>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Paste"><Clipboard size={18} /></button>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Rename"><FileText size={18} /></button>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Share"><Share2 size={18} /></button>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300" title="Delete"><Trash2 size={18} /></button>
                <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
                <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                     {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />} 
                     <span className="text-sm">View</span>
                </button>
                <div className="flex-1"></div>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"><MoreHorizontal size={18} /></button>
            </div>

            {/* Address Bar Row */}
            <div className="h-12 flex items-center px-3 space-x-2 space-x-reverse bg-[#f9f9f9] dark:bg-[#202020] border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                    <button onClick={navigateBack} disabled={historyIndex === 0} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30">
                        <ChevronLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                    </button>
                    <button onClick={navigateForward} disabled={historyIndex === history.length - 1} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30">
                        <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                    </button>
                    <button onClick={navigateUp} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10">
                        <ArrowUp size={16} />
                    </button>
                </div>

                <div className="flex-1 flex items-center bg-white dark:bg-[#2b2b2b] border border-gray-300 dark:border-gray-600 rounded-md px-2 h-8 mx-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <Monitor size={14} className="text-gray-500 mr-2" />
                    <div className="flex-1 flex items-center text-sm">
                         <span className="hover:bg-gray-100 dark:hover:bg-white/10 px-1 rounded cursor-pointer transition-colors" onClick={() => navigateTo('This PC')}>This PC</span>
                         <ChevronRight size={12} className={`mx-1 text-gray-400 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                         <span className="font-medium">{currentPath}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><ChevronRight size={14} className="rotate-90" /></button>
                </div>

                <div className="w-64 flex items-center bg-white dark:bg-[#2b2b2b] border border-gray-300 dark:border-gray-600 rounded-md px-3 h-8">
                    <Search size={14} className="text-gray-500" />
                    <input 
                        type="text" 
                        placeholder={`Search ${currentPath}`}
                        className="flex-1 bg-transparent border-none outline-none text-sm ml-2 placeholder-gray-500 dark:text-white"
                    />
                </div>
            </div>

            {/* Main Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar (Navigation Pane) */}
                <div className="w-60 flex flex-col pt-4 px-2 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-[#f9f9f9] dark:bg-[#202020]">
                    
                    <div className="mb-4">
                        <div className="px-3 py-1 text-xs font-bold text-gray-500 mb-1">Pinned</div>
                        <SidebarItem icon={<Home size={16} className="text-blue-500" />} label="Quick Access" path="Quick Access" active={currentPath === 'Quick Access'} />
                        <SidebarItem icon={<Cloud size={16} className="text-blue-400" />} label="OneDrive - Personal" path="Quick Access" />
                    </div>

                    <div className="mb-4">
                         <div className="px-3 py-1 text-xs font-bold text-gray-500 mb-1">This PC</div>
                        <SidebarItem icon={<Monitor size={16} className="text-purple-500" />} label="Desktop" path="Desktop" active={currentPath === 'Desktop'} />
                        <SidebarItem icon={<FileText size={16} className="text-yellow-500" />} label="Documents" path="Documents" active={currentPath === 'Documents'} />
                        <SidebarItem icon={<Download size={16} className="text-blue-500" />} label="Downloads" path="Downloads" active={currentPath === 'Downloads'} />
                        <SidebarItem icon={<Music size={16} className="text-pink-500" />} label="Music" path="Music" active={currentPath === 'Music'} />
                        <SidebarItem icon={<ImageIcon size={16} className="text-green-500" />} label="Pictures" path="Pictures" active={currentPath === 'Pictures'} />
                        <SidebarItem icon={<Video size={16} className="text-orange-500" />} label="Videos" path="Videos" active={currentPath === 'Videos'} />
                        <SidebarItem icon={<HardDrive size={16} className="text-gray-500" />} label="Local Disk (C:)" path="This PC" active={currentPath === 'This PC'} />
                    </div>

                    <div className="mb-4">
                        <SidebarItem icon={<Trash2 size={16} />} label="Recycle Bin" path="Trash" active={currentPath === 'Trash'} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-[#191919]">
                    {/* View Header (Only for List View usually, but good for details) */}
                    {viewMode === 'list' && (
                        <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-500 select-none">
                            <div className="flex-1 hover:bg-gray-100 dark:hover:bg-white/5 px-2 py-1 rounded cursor-pointer border-r border-transparent hover:border-gray-300">Name</div>
                            <div className="w-40 hover:bg-gray-100 dark:hover:bg-white/5 px-2 py-1 rounded cursor-pointer border-r border-transparent hover:border-gray-300">Date modified</div>
                            <div className="w-32 hover:bg-gray-100 dark:hover:bg-white/5 px-2 py-1 rounded cursor-pointer border-r border-transparent hover:border-gray-300">Type</div>
                            <div className="w-24 hover:bg-gray-100 dark:hover:bg-white/5 px-2 py-1 rounded cursor-pointer">Size</div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto p-4" onClick={() => setSelectedItem(null)}>
                        {currentItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Folder size={64} strokeWidth={1} className="mb-4 opacity-20" />
                                <p className="text-sm">This folder is empty.</p>
                            </div>
                        ) : (
                            <>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                                        {currentItems.map((item, idx) => (
                                            <div 
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item.name); }}
                                                onDoubleClick={() => item.type === 'folder' || item.name.includes('Disk') ? navigateTo(item.name) : null}
                                                className={`
                                                    flex flex-col items-center p-2 rounded-sm border border-transparent cursor-default group
                                                    ${selectedItem === item.name ? 'bg-blue-100 dark:bg-white/10 border-blue-200 dark:border-white/20' : 'hover:bg-gray-100 dark:hover:bg-white/5'}
                                                `}
                                            >
                                                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                                                    {getIcon(item.type, item.name)}
                                                </div>
                                                <span className="text-xs text-center break-words w-full line-clamp-2 px-1">
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {currentItems.map((item, idx) => (
                                            <div 
                                                key={idx}
                                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item.name); }}
                                                onDoubleClick={() => item.type === 'folder' || item.name.includes('Disk') ? navigateTo(item.name) : null}
                                                className={`
                                                    flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default
                                                    ${selectedItem === item.name ? 'bg-blue-100 dark:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-white/5 odd:bg-transparent'}
                                                `}
                                            >
                                                <div className="flex-1 flex items-center gap-3">
                                                    {getIcon(item.type, item.name)}
                                                    <span className="truncate">{item.name}</span>
                                                </div>
                                                <div className="w-40 text-gray-500 text-xs">{item.date}</div>
                                                <div className="w-32 text-gray-500 text-xs capitalize">{item.type}</div>
                                                <div className="w-24 text-gray-500 text-xs text-right">{item.size || '-'}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer / Status Bar */}
            <div className="h-8 bg-[#f9f9f9] dark:bg-[#202020] border-t border-gray-200 dark:border-gray-800 flex items-center px-4 text-xs text-gray-600 dark:text-gray-400 space-x-4 space-x-reverse">
                <span>{currentItems.length} items</span>
                {selectedItem && (
                    <>
                         <div className="h-3 w-[1px] bg-gray-400"></div>
                         <span>1 item selected</span>
                         <div className="h-3 w-[1px] bg-gray-400"></div>
                         <span>{currentItems.find(i => i.name === selectedItem)?.size || ''}</span>
                    </>
                )}
                <div className="flex-1"></div>
                <div className="flex items-center gap-2">
                     <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-200'}`}><List size={12} /></button>
                     <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-200'}`}><Grid size={12} /></button>
                </div>
            </div>
        </div>
    );
};