import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Save, FileText, Menu } from 'lucide-react';

interface TextEditorAppProps {
    lang: Language;
}

export const TextEditorApp: React.FC<TextEditorAppProps> = ({ lang }) => {
    const t = translations[lang];
    const [text, setText] = useState('Welcome to HamzaOS Text Editor.\n\nYou can type here...');
    const [showSaveToast, setShowSaveToast] = useState(false);

    const handleSave = () => {
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
             {/* Toolbar */}
             <div className="flex items-center space-x-2 space-x-reverse px-2 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#252526]">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                    <Menu size={18} />
                </button>
                <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600 mx-2"></div>
                <button 
                    onClick={handleSave}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-800 dark:text-gray-200 text-sm font-medium transition-colors"
                >
                    <Save size={16} />
                    <span>{t.save}</span>
                </button>
                <div className="flex-1 text-center font-mono text-xs text-gray-400">Untitled Document 1</div>
             </div>

             {/* Text Area */}
             <textarea 
                className="flex-1 w-full p-4 resize-none outline-none bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 font-mono"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.editorPlaceholder}
                spellCheck={false}
             />

             {/* Footer */}
             <div className="h-6 bg-gray-50 dark:bg-[#252526] border-t border-gray-200 dark:border-gray-700 flex items-center px-4 text-xs text-gray-500">
                <FileText size={12} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                <span>Line {text.split('\n').length}, Col {text.length}</span>
                <span className="mx-auto">UTF-8</span>
                <span>Text</span>
             </div>

             {/* Save Toast */}
             {showSaveToast && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm animate-fadeIn">
                    {t.fileSaved}
                </div>
             )}
        </div>
    );
};