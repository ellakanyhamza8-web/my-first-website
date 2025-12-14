import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';
import { translations } from '../utils/translations';

interface TerminalProps {
  onClose: () => void;
  lang: Language;
}

interface LogEntry {
  type: 'command' | 'output' | 'error';
  content: string;
}

export const TerminalApp: React.FC<TerminalProps> = ({ onClose, lang }) => {
  const t = translations[lang];
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', content: t.termWelcome },
    { type: 'output', content: ' * Documentation:  https://help.ubuntu.com' },
    { type: 'output', content: ' * Management:     https://landscape.canonical.com' },
    { type: 'output', content: ' ' },
    { type: 'output', content: t.termHelp },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset history on lang change (optional, but good for consistency)
  useEffect(() => {
     setHistory([
        { type: 'output', content: t.termWelcome },
        { type: 'output', content: ' * Documentation:  https://help.ubuntu.com' },
        { type: 'output', content: ' ' },
        { type: 'output', content: t.termHelp },
     ]);
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    setHistory(prev => [...prev, { type: 'command', content: cleanCmd }]);
    setInput('');
    setIsProcessing(true);

    const args = cleanCmd.toLowerCase().split(' ');
    const command = args[0];

    try {
      switch (command) {
        case 'help':
          setHistory(prev => [...prev, {
            type: 'output',
            content: `
Available Commands:
  neofetch    Display system info and skills
  clear       Clear terminal screen
  whoami      Display current user
  youtube     Show channel info
  github      Show GitHub profile
  contact     Show contact details (Phone/Email)
  ask [query] Ask Hamza's AI Assistant (Powered by Gemini)
  exit        Close terminal
            `
          }]);
          break;

        case 'clear':
          setHistory([]);
          break;
        
        case 'exit':
          onClose();
          break;

        case 'whoami':
           setHistory(prev => [...prev, { type: 'output', content: 'hamza_expert_11' }]);
           break;

        case 'youtube':
           setHistory(prev => [...prev, { type: 'output', content: 'Channel: Hamza Full HD (@hamzaellakany-hf5kw)\nURL: https://youtube.com/@hamzaellakany-hf5kw?si=yCLTQX9O6_eXccyM' }]);
           break;
        
        case 'github':
            setHistory(prev => [...prev, { type: 'output', content: 'GitHub: https://github.com/ellakanyhamza8-web' }]);
            break;

        case 'contact':
            setHistory(prev => [...prev, { type: 'output', content: 'Phone/WhatsApp: 01030722501\nEmail: ellakanyhamza8@gmail.com' }]);
            break;

        case 'neofetch':
          setHistory(prev => [...prev, {
            type: 'output',
            content: `
            .-/+oossssoo+/-.               hamza@hamza-desktop
        ':+ssssssssssssssssss+:'           -------------------
      -+ssssssssssssssssssyyssss+-         OS: Ubuntu Hamza Edition 22.04
    .ossssssssssssssssssdMMMNysssso.       Host: Custom Rig
   /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-generic
  +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 11 years
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 999 (dpkg)
.ssssssssdMMMNhssssssssssNMMMdssssssss.    Shell: zsh 5.8
+sssshhhyNMMNyssssssssssswMMMdssssssss+    Resolution: 1920x1080 (Full HD)
ossyNMMMNyMMhsssssssssssshmmmhssssssso     DE: GNOME
ossyNMMMNyMMhsssssssssssshmmmhssssssso     WM: Mutter
+sssshhhyNMMNyssssssssssswMMMdssssssss+    Theme: Yaru-dark [GTK2/3]
.ssssssssdMMMNhssssssssssNMMMdssssssss.    Icons: Yaru [GTK2/3]
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Terminal: gnome-terminal
  +ssssssssshmydMMMMMMMNddddyssssssss+     CPU: Intel Core i9 (Electronics Expert)
   /ssssssssssshdmmNNmmyNMMMMhssssss/      GPU: NVIDIA RTX 3080 (Windows/Linux Expert)
    .ossssssssssssssssssdMMMNysssso.       Memory: 32GiB / 64GiB
      -+ssssssssssssssssssyyssss+-
        ':+ssssssssssssssssss+:'
            .-/+oossssoo+/-.
            `
          }]);
          break;

        case 'ask':
          if (args.length < 2) {
             setHistory(prev => [...prev, { type: 'error', content: 'Usage: ask [your question]' }]);
          } else {
             const query = cleanCmd.substring(4); // Remove "ask "
             // Call Gemini
             if (!process.env.API_KEY) {
                setHistory(prev => [...prev, { type: 'error', content: 'Error: API Key not configured in environment.' }]);
             } else {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const response = await ai.models.generateContent({
                  model: "gemini-2.5-flash",
                  contents: query,
                  config: {
                    systemInstruction: `You are an AI assistant living inside the terminal of Hamza, an 11-year-old electronics, Linux, and Windows expert. He has a Full HD YouTube channel. Keep answers technical but fun, short, and friendly. Answer in ${lang === 'ar' ? 'Arabic' : lang === 'zh' ? 'Chinese' : 'English'}.`
                  }
                });
                
                setHistory(prev => [...prev, { type: 'output', content: response.text || '' }]);
             }
          }
          break;

        default:
          setHistory(prev => [...prev, { type: 'error', content: `Command '${command}' not found. Type 'help' for list.` }]);
      }
    } catch (error) {
       setHistory(prev => [...prev, { type: 'error', content: `Execution error: ${error instanceof Error ? error.message : 'Unknown error'}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full bg-[#300a24] text-white font-mono p-4 flex flex-col text-sm" dir="ltr" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-auto whitespace-pre-wrap font-mono">
        {history.map((entry, i) => (
          <div key={i} className={`mb-1 ${entry.type === 'error' ? 'text-red-400' : entry.type === 'command' ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
            {entry.type === 'command' && <span className="text-[#87A922] mr-2">hamza@ubuntu:~$</span>}
            {entry.content}
          </div>
        ))}
        {isProcessing && <div className="text-gray-400 animate-pulse">{t.termProcessing}</div>}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center mt-2 border-t border-gray-700 pt-2">
        <span className="text-[#87A922] mr-2">hamza@ubuntu:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
          autoFocus
          autoComplete="off"
        />
      </div>
    </div>
  );
};