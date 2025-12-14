import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, X, Bot, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface CopilotProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Copilot: React.FC<CopilotProps> = ({ isOpen, onClose, lang }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: lang === 'ar' ? 'مرحباً، أنا Copilot. كيف يمكنني مساعدتك في Windows 12 اليوم؟' : 'Hello, I am Copilot. How can I help you with Windows 12 today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         setMessages(prev => [...prev, { role: 'model', text: "Error: API_KEY is missing in environment variables." }]);
         setIsLoading(false);
         return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMsg,
        config: {
          systemInstruction: `You are Windows Copilot, an AI assistant integrated into a web-based Windows 12 concept created by Hamza (11 years old). 
          You are helpful, concise, and friendly. You know about the apps in this OS (Terminal, VS Code, Games). 
          Answer in ${lang === 'ar' ? 'Arabic' : 'English'}. Keep responses short and conversational.`
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || '...' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed top-0 right-0 h-full w-[350px] md:w-[400px] bg-[#f3f3f3]/95 dark:bg-[#202020]/95 backdrop-blur-3xl shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-[100] border-l border-white/20 flex flex-col transition-transform duration-300 animate-in slide-in-from-right"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <Sparkles className="text-blue-500 animate-pulse" size={24} />
          <span className="font-bold text-lg dark:text-white">Copilot</span>
          <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold">PREVIEW</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors">
          <X size={20} className="dark:text-white" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-[#2d2d2d] text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-700 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-white animate-spin" />
             </div>
             <div className="bg-white dark:bg-[#2d2d2d] p-3 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#f9f9f9] dark:bg-[#1a1a1a]">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.copilotPlaceholder}
            className="w-full bg-white dark:bg-[#2d2d2d] border border-gray-300 dark:border-gray-600 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            dir="ltr"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-[10px] text-center mt-2 text-gray-500">
           AI-generated content may be incorrect.
        </div>
      </div>
    </div>
  );
};