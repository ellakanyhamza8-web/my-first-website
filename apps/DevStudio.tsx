import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Upload, Globe, Trash2, Code, FileCode, CheckCircle, ExternalLink } from 'lucide-react';

interface DevStudioProps {
    lang: Language;
}

interface Project {
    id: string;
    name: string;
    url: string;
    timestamp: Date;
    content: string; // Store content to re-blob if needed, or just keep url
}

export const DevStudioApp: React.FC<DevStudioProps> = ({ lang }) => {
    const t = translations[lang];
    const [projects, setProjects] = useState<Project[]>([]);
    const [isDeploying, setIsDeploying] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [viewingUrl, setViewingUrl] = useState<string | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Simulate Deployment
        setIsDeploying(true);

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            
            // Create a Blob URL for preview
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            setTimeout(() => {
                const newProject: Project = {
                    id: Date.now().toString(),
                    name: file.name,
                    url: url,
                    timestamp: new Date(),
                    content: content
                };
                setProjects(prev => [newProject, ...prev]);
                setIsDeploying(false);
            }, 1500); // Fake loading delay
        };
        reader.readAsText(file);
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (viewingUrl) setViewingUrl(null);
    };

    if (viewingUrl) {
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="h-10 bg-gray-100 border-b flex items-center px-4 justify-between">
                    <span className="text-sm font-mono text-gray-500">localhost:3000 (Preview)</span>
                    <button onClick={() => setViewingUrl(null)} className="text-red-500 font-bold hover:bg-red-100 px-3 py-1 rounded">
                        Close Preview
                    </button>
                </div>
                <iframe src={viewingUrl} className="flex-1 w-full border-none bg-white" title="Project Preview" />
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="bg-[#0070f3] text-white p-8">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="p-3 bg-black rounded-lg">
                        <Code size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{t.devStudioApp}</h1>
                        <p className="opacity-80">Deploy your HTML projects in seconds.</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Upload Area */}
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#0070f3] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group mb-8"
                    >
                        <input 
                            type="file" 
                            accept=".html" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleFileSelect}
                        />
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            {isDeploying ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0070f3]"></div>
                            ) : (
                                <Upload size={32} className="text-gray-500 dark:text-gray-400 group-hover:text-[#0070f3]" />
                            )}
                        </div>
                        <h3 className="font-bold text-lg mb-2">{isDeploying ? t.deploying : t.uploadProject}</h3>
                        <p className="text-gray-500 text-sm">{t.uploadHint}</p>
                    </div>

                    {/* Project List */}
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Globe size={20} /> {t.projectList}
                    </h2>

                    {projects.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            {t.noProjects}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map(project => (
                                <div key={project.id} className="bg-white dark:bg-[#222] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center text-orange-600">
                                            <FileCode size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{project.name}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1 text-green-500"><CheckCircle size={10} /> Live</span>
                                                <span>•</span>
                                                <span>{project.timestamp.toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setViewingUrl(project.url)}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <ExternalLink size={14} /> {t.visitSite}
                                        </button>
                                        <button 
                                            onClick={() => deleteProject(project.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};