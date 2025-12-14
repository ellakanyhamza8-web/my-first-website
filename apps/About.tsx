import React from 'react';
import { Cpu, Monitor, Youtube, Terminal, Phone, Mail, Github, Play, LayoutGrid } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutAppProps {
    lang: Language;
}

export const AboutApp: React.FC<AboutAppProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className={`h-full bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] dark:from-[#0f172a] dark:to-[#1e293b] text-gray-800 dark:text-gray-100 overflow-y-auto transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
         {/* Abstract Shapes */}
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
         
         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white">
             <LayoutGrid size={64} className="mb-4 drop-shadow-lg" />
             <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight drop-shadow-md">{t.aboutTitle}</h1>
             <p className="text-lg md:text-xl opacity-90 max-w-2xl">{t.aboutSubtitle}</p>
         </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-10 relative z-20">
        
        {/* Intro Card */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl p-6 mb-8 border border-white/20 backdrop-blur-sm">
             <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                     <Monitor size={32} />
                 </div>
                 <div>
                     <h2 className="text-2xl font-bold mb-2">{t.sysExpert}</h2>
                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                         {t.sysExpertDesc}
                     </p>
                 </div>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Developer Card */}
            <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
                    <Cpu size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold group-hover:text-purple-500 transition-colors">{t.electronics}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                   {t.electronicsDesc}
                </p>
            </div>
            
            {/* YouTube Card */}
            <a href="https://youtube.com/@hamzaellakany-hf5kw?si=yCLTQX9O6_eXccyM" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="flex items-center mb-4 text-red-600 relative z-10">
                    <Youtube size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">{t.youtubeTitle}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base relative z-10">
                    {t.youtubeDesc}
                </p>
                <div className="mt-4 inline-flex items-center text-red-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                    {t.playNow} <Play size={14} className="mx-1" />
                </div>
            </a>
        </div>

        {/* Vision Quote */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Terminal size={128} />
             </div>
             <h3 className="text-2xl font-bold mb-4 flex items-center relative z-10">
                <Terminal className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                {t.wordFromMe}
            </h3>
            <p className="text-lg leading-loose opacity-90 italic relative z-10 font-light">
                {t.quote}
            </p>
        </div>

        {/* Footer Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl flex items-center gap-4 shadow-sm">
                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                     <Phone size={20} />
                 </div>
                 <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{t.phone}</p>
                     <p className="font-mono font-bold" dir="ltr">01030722501</p>
                 </div>
             </div>
             <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl flex items-center gap-4 shadow-sm">
                 <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                     <Mail size={20} />
                 </div>
                 <div>
                     <p className="text-xs text-gray-500 dark:text-gray-400">{t.email}</p>
                     <p className="font-mono font-bold text-sm" dir="ltr">ellakanyhamza8@gmail.com</p>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};