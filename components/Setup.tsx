import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, User, Check, Laptop } from 'lucide-react';
import { Language } from '../types';

interface SetupProps {
  onComplete: (name: string) => void;
  lang: Language;
}

export const Setup: React.FC<SetupProps> = ({ onComplete, lang }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [animateOut, setAnimateOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Getting things ready...');

  const handleNext = () => {
    if (step === 1) {
       setStep(2);
    } else if (step === 2 && name.trim()) {
       setStep(3);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const texts = [
        "Hi there",
        "We're getting things ready for you",
        "This might take a few seconds",
        "Almost there..."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
         setLoadingText(texts[i]);
         i++;
         if (i >= texts.length) {
            clearInterval(interval);
            setTimeout(() => {
                setAnimateOut(true);
                setTimeout(() => onComplete(name), 500);
            }, 1000);
         }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [step, name, onComplete]);

  if (animateOut) {
     return <div className="fixed inset-0 bg-black z-[200] transition-opacity duration-500 opacity-0"></div>;
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#f0f3f9] dark:bg-[#1a1a1a] flex items-center justify-center font-sans transition-colors duration-500" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-5xl h-full md:h-[80vh] md:rounded-2xl bg-white dark:bg-[#202020] shadow-2xl flex overflow-hidden">
            
            {/* Left Image Section */}
            <div className="hidden md:flex w-1/2 bg-[#0078D4] relative items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                 <div className="relative z-10 text-white p-12">
                     <div className="mb-6">
                        <Laptop size={64} className="mb-4" />
                        <h1 className="text-4xl font-bold mb-2">Windows 12</h1>
                        <p className="text-xl opacity-80">Web Experience Concept</p>
                     </div>
                 </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between relative">
                
                {/* Step 1: Welcome */}
                {step === 1 && (
                    <div className="animate-in slide-in-from-right fade-in duration-300 flex-1 flex flex-col justify-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <Globe size={24} />
                        </div>
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
                            {lang === 'ar' ? 'مرحباً بك في تجربة ويندوز 12' : 'Welcome to Windows 12 Concept'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {lang === 'ar' 
                                ? 'هذا الموقع هو محاكاة لنظام التشغيل، تم تطويره بواسطة حمزة (١١ سنة) باستخدام تقنيات الويب الحديثة. استمتع بتجربة سطح المكتب، الألعاب، وأدوات المطورين.' 
                                : 'This website is an OS simulation developed by Hamza (11yo) using modern web technologies. Experience the desktop, games, and developer tools right in your browser.'}
                        </p>
                    </div>
                )}

                {/* Step 2: Name Input */}
                {step === 2 && (
                    <div className="animate-in slide-in-from-right fade-in duration-300 flex-1 flex flex-col justify-center">
                         <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 mb-6">
                            <User size={24} />
                        </div>
                        <h2 className="text-3xl font-semibold mb-2 text-gray-800 dark:text-white">
                            {lang === 'ar' ? 'من سيستخدم هذا الجهاز؟' : 'Who\'s going to use this device?'}
                        </h2>
                         <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {lang === 'ar' ? 'أدخل اسمك ليتم تخصيص التجربة لك.' : 'Enter your name to personalize the experience.'}
                        </p>
                        
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && name.trim() && handleNext()}
                                placeholder={lang === 'ar' ? 'اسم المستخدم' : 'User Name'}
                                className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 py-3 text-xl focus:outline-none focus:border-blue-600 dark:text-white transition-colors"
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Loading */}
                {step === 3 && (
                    <div className="animate-in fade-in duration-700 flex-1 flex flex-col justify-center items-center text-center">
                        <div className="mb-8 relative">
                             <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-light text-gray-800 dark:text-white animate-pulse">
                            {loadingText}
                        </h2>
                    </div>
                )}

                {/* Footer Controls */}
                {step < 3 && (
                    <div className="flex justify-between items-center mt-8">
                        <div className="text-sm text-gray-400">
                             HamzaOS v1.0
                        </div>
                        <button 
                            onClick={handleNext}
                            disabled={step === 2 && !name.trim()}
                            className={`
                                flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all
                                ${step === 2 && !name.trim() 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-[#0078D4] text-white hover:bg-[#006cbd] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}
                            `}
                        >
                            {step === 1 
                                ? (lang === 'ar' ? 'البدء' : 'Get Started') 
                                : (lang === 'ar' ? 'التالي' : 'Next')}
                            {lang !== 'ar' && <ArrowRight size={18} />}
                            {lang === 'ar' && <ArrowRight size={18} className="rotate-180" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};