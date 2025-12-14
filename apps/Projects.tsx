import React, { useState } from 'react';
import { FolderOpen, Code, FileCode, FileJson, FileType, Menu, Github } from 'lucide-react';
import { Language } from '../types';
import { Terminal, Settings } from 'lucide-react';

interface ProjectsAppProps {
    lang: Language;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ lang }) => {
    const [activeFile, setActiveFile] = useState('portfolio');

    const files = [
        { 
            id: 'portfolio', 
            name: 'portfolio.tsx', 
            icon: <FileCode size={16} className="text-blue-400" />,
            content: (
                <div className="text-sm">
                    <span className="text-purple-400">const</span> <span className="text-blue-300">Portfolio</span> = () <span className="text-purple-400">=&gt;</span> {'{'}
                    <div className="pl-4">
                        <span className="text-purple-400">return</span> (
                        <div className="pl-4">
                            &lt;<span className="text-red-400">div</span> className=<span className="text-green-300">"hamza-os"</span>&gt;
                            <div className="pl-4 text-gray-400">
                                // Hamza OS is a React application<br/>
                                // Styled with Tailwind CSS<br/>
                                // Mimics Ubuntu 22.04 functionality
                            </div>
                            &lt;/<span className="text-red-400">div</span>&gt;
                        </div>
                        );
                    </div>
                    {'}'}
                </div>
            )
        },
        { 
            id: 'arduino', 
            name: 'arduino_bot.cpp', 
            icon: <Code size={16} className="text-blue-500" />,
            content: (
                <div className="text-sm">
                    <span className="text-purple-400">#include</span> &lt;<span className="text-green-300">Servo.h</span>&gt;<br/><br/>
                    <span className="text-blue-300">Servo</span> myservo;<br/>
                    <span className="text-blue-300">int</span> pos = 0;<br/><br/>
                    <span className="text-blue-300">void</span> <span className="text-yellow-300">setup</span>() {'{'}<br/>
                    &nbsp;&nbsp;myservo.<span className="text-yellow-300">attach</span>(9);<br/>
                    {'}'}<br/><br/>
                    <span className="text-blue-300">void</span> <span className="text-yellow-300">loop</span>() {'{'}<br/>
                    &nbsp;&nbsp;<span className="text-gray-400">// Automation Logic for Smart Home</span><br/>
                    &nbsp;&nbsp;myservo.<span className="text-yellow-300">write</span>(90);<br/>
                    {'}'}
                </div>
            )
        },
        { 
            id: 'linux', 
            name: 'server_config.sh', 
            icon: <Terminal size={16} className="text-gray-300" />, 
            content: (
                <div className="text-sm">
                    <span className="text-gray-500">#!/bin/bash</span><br/><br/>
                    <span className="text-yellow-300">echo</span> <span className="text-green-300">"Starting Server Setup..."</span><br/>
                    <span className="text-yellow-300">sudo</span> apt update<br/>
                    <span className="text-yellow-300">sudo</span> apt upgrade -y<br/>
                    <span className="text-yellow-300">echo</span> <span className="text-green-300">"Installing Nginx..."</span><br/>
                    <span className="text-yellow-300">sudo</span> apt install nginx -y
                </div>
            )
        }
    ];

    const currentFile = files.find(f => f.id === activeFile);

    return (
        <div className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono flex flex-col" dir="ltr">
            {/* VS Code Title Bar */}
            <div className="h-8 bg-[#2d2d2d] flex items-center px-4 text-xs select-none border-b border-black">
                <Menu size={14} className="mr-3" />
                <span className="mr-4">File</span>
                <span className="mr-4">Edit</span>
                <span className="mr-4">Selection</span>
                <span className="mr-4">View</span>
                <span className="mr-4">Go</span>
                <span className="flex-1 text-center text-gray-400">{currentFile?.name} - Visual Studio Code</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-4 border-r border-black">
                    <FolderOpen size={24} className="text-white cursor-pointer" />
                    <Code size={24} className="text-gray-500 hover:text-white cursor-pointer" />
                    <a 
                      href="https://github.com/ellakanyhamza8-web" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white cursor-pointer"
                      title="GitHub"
                    >
                        <Github size={24} />
                    </a>
                    <Settings size={24} className="text-gray-500 hover:text-white cursor-pointer mt-auto" />
                </div>

                {/* File Explorer */}
                <div className="w-48 bg-[#252526] flex flex-col border-r border-black hidden md:flex">
                    <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Explorer</div>
                    <div className="px-2">
                        <div className="flex items-center text-xs font-bold text-blue-400 mb-2">
                            <span className="mr-1">▼</span> HAMZA-PROJECTS
                        </div>
                        {files.map(file => (
                            <div 
                                key={file.id}
                                onClick={() => setActiveFile(file.id)}
                                className={`flex items-center px-2 py-1 cursor-pointer text-sm rounded ${activeFile === file.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                            >
                                <span className="mr-2">{file.icon}</span>
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-[#1e1e1e] flex flex-col">
                    {/* Tabs */}
                    <div className="flex bg-[#252526]">
                        {files.map(file => (
                            <div 
                                key={file.id}
                                onClick={() => setActiveFile(file.id)}
                                className={`px-4 py-2 text-sm flex items-center border-r border-[#1e1e1e] cursor-pointer ${activeFile === file.id ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400'}`}
                            >
                                <span className="mr-2">{file.icon}</span>
                                {file.name}
                                <span className="ml-2 hover:text-white">×</span>
                            </div>
                        ))}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 p-4 overflow-auto font-mono">
                        <div className="flex">
                            <div className="text-gray-600 select-none text-right pr-4 mr-4 border-r border-gray-700">
                                {[...Array(20)].map((_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            <div className="flex-1">
                                {currentFile?.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-xs justify-between select-none">
                <div className="flex items-center space-x-3">
                    <span>main*</span>
                    <span>0 errors</span>
                </div>
                <div className="flex items-center space-x-3">
                    <span>Ln 10, Col 42</span>
                    <span>UTF-8</span>
                    <span>{activeFile === 'arduino' ? 'C++' : activeFile === 'linux' ? 'Shell' : 'TypeScript React'}</span>
                </div>
            </div>
        </div>
    );
};