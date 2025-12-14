import React from 'react';
import { Cpu, Monitor, Youtube, Terminal, Phone, Mail, Github } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutAppProps {
    lang: Language;
}

export const AboutApp: React.FC<AboutAppProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className={`h-full bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 p-6 md:p-8 overflow-y-auto transition-colors duration-300`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse mb-8">
            <div className={`w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#77216F] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg ${lang !== 'ar' ? 'md:mr-6' : 'md:ml-6'}`}>
                {lang === 'zh' ? 'H' : 'ح'}
            </div>
            <div className="text-center md:text-start">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C001E] dark:text-orange-500 mb-2">{t.aboutTitle}</h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{t.aboutSubtitle}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4 text-[#E95420]">
                    <Monitor size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold">{t.sysExpert}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.sysExpertDesc}
                </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4 text-[#77216F] dark:text-purple-400">
                    <Cpu size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold">{t.electronics}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                   {t.electronicsDesc}
                </p>
            </div>
            
            <a href="https://youtube.com/@hamzaellakany-hf5kw?si=yCLTQX9O6_eXccyM" target="_blank" rel="noopener noreferrer" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center mb-4 text-red-600">
                    <Youtube size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold">{t.youtubeTitle}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.youtubeDesc}
                </p>
            </a>

            <a href="https://github.com/ellakanyhamza8-web" target="_blank" rel="noopener noreferrer" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center mb-4 text-gray-900 dark:text-white">
                    <Github size={24} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                    <h3 className="text-xl font-bold">{t.githubTitle}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.githubDesc}
                </p>
            </a>
        </div>

        {/* Contact Info Section */}
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#2C001E] dark:text-white flex items-center">
                 {t.contactInfo}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4 space-x-reverse">
                    <div className={`bg-green-100 dark:bg-green-900 p-3 rounded-full text-green-600 dark:text-green-400 ${lang === 'ar' ? 'ml-4' : 'mr-4'}`}>
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm">{t.phone}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-mono text-lg" dir="ltr">01030722501</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-4 space-x-reverse">
                    <div className={`bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-400 ${lang === 'ar' ? 'ml-4' : 'mr-4'}`}>
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm">{t.email}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-mono text-sm break-all" dir="ltr">ellakanyhamza8@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#2C001E] dark:bg-black text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Terminal className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                {t.wordFromMe}
            </h3>
            <p className="text-lg leading-loose opacity-90 italic">
                {t.quote}
            </p>
        </div>
      </div>
    </div>
  );
};