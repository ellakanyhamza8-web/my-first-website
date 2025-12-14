import React from 'react';
import { AppID } from '../types';
import { 
  FileText, Table, Presentation, Save, Share2, Menu, Bold, Italic, 
  Underline, AlignLeft, AlignCenter, AlignRight, Layout, Type
} from 'lucide-react';

interface OfficeAppProps {
  type: 'word' | 'excel' | 'powerpoint';
}

export const OfficeApp: React.FC<OfficeAppProps> = ({ type }) => {
  const config = {
    word: {
      color: 'bg-[#2B579A]',
      icon: <FileText size={20} className="text-white" />,
      title: 'Word',
      docName: 'Document1.docx'
    },
    excel: {
      color: 'bg-[#217346]',
      icon: <Table size={20} className="text-white" />,
      title: 'Excel',
      docName: 'Book1.xlsx'
    },
    powerpoint: {
      color: 'bg-[#B7472A]',
      icon: <Presentation size={20} className="text-white" />,
      title: 'PowerPoint',
      docName: 'Presentation1.pptx'
    }
  }[type];

  const renderContent = () => {
    switch(type) {
      case 'word':
        return (
          <div className="bg-white h-full w-[210mm] mx-auto shadow-lg my-8 p-[25mm] min-h-[297mm] text-gray-800">
             <h1 className="text-3xl font-bold mb-4">HamzaOS Report</h1>
             <p className="mb-4">This is a simulated Word document running on the web-based Windows 12 Concept.</p>
             <p className="mb-4">Features include:</p>
             <ul className="list-disc pl-5 mb-4">
                <li>React-based Architecture</li>
                <li>Tailwind CSS Styling</li>
                <li>Full Desktop Environment Simulation</li>
             </ul>
             <p>Type here...</p>
          </div>
        );
      case 'excel':
        return (
          <div className="bg-white h-full overflow-auto">
             <div className="grid grid-cols-[50px_repeat(10,100px)] border-t border-l border-gray-300">
                {/* Header Row */}
                <div className="bg-gray-100 border-r border-b border-gray-300"></div>
                {['A','B','C','D','E','F','G','H','I','J'].map(c => (
                  <div key={c} className="bg-gray-100 border-r border-b border-gray-300 text-center font-bold text-sm py-1">{c}</div>
                ))}
                
                {/* Rows */}
                {[...Array(20)].map((_, r) => (
                  <React.Fragment key={r}>
                    <div className="bg-gray-100 border-r border-b border-gray-300 text-center text-sm py-1 text-gray-500">{r+1}</div>
                    {[...Array(10)].map((_, c) => (
                      <div key={`${r}-${c}`} className="border-r border-b border-gray-200 p-1 text-sm content-center hover:bg-blue-50">
                        {r === 0 && c === 0 ? 'Sales' : r === 0 && c === 1 ? 'Q1 2024' : ''}
                        {r === 1 && c === 0 ? 'Total' : r === 1 && c === 1 ? '$50,000' : ''}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
             </div>
          </div>
        );
      case 'powerpoint':
        return (
          <div className="flex h-full">
             {/* Slides Sidebar */}
             <div className="w-48 bg-gray-100 border-r border-gray-300 flex flex-col p-4 gap-4 overflow-y-auto">
                {[1,2,3].map(i => (
                  <div key={i} className={`aspect-video bg-white border-2 ${i===1 ? 'border-[#B7472A]' : 'border-transparent'} shadow-sm flex items-center justify-center text-[8px]`}>
                     Slide {i}
                  </div>
                ))}
             </div>
             {/* Main Slide */}
             <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
                <div className="aspect-video bg-white shadow-2xl w-full max-w-4xl flex flex-col items-center justify-center p-12 text-center">
                   <h1 className="text-5xl font-bold mb-6 text-[#B7472A]">HamzaOS Presentation</h1>
                   <h2 className="text-2xl text-gray-600">The Future of Web Desktops</h2>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1a1a1a]">
       {/* Top Bar */}
       <div className={`${config.color} text-white flex flex-col`}>
          <div className="flex items-center justify-between px-4 py-2">
             <div className="flex items-center gap-4">
                <div className="grid grid-cols-3 gap-[2px]">
                   {[...Array(9)].map((_,i) => <div key={i} className="w-1 h-1 bg-white rounded-full"></div>)}
                </div>
                <span className="font-semibold text-sm">{config.title}</span>
                <span className="opacity-70 text-sm bg-black/10 px-3 py-1 rounded-md">{config.docName}</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">HZ</div>
             </div>
          </div>
          {/* Ribbon */}
          <div className="bg-[#f3f3f3] text-black px-4 py-2 border-b border-gray-300 flex items-center gap-6 text-sm">
             <span className={`font-bold border-b-2 border-${config.color.replace('bg-', '')} pb-1`}>Home</span>
             <span>Insert</span>
             <span>Layout</span>
             <span>View</span>
             <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
             <div className="flex items-center gap-2 text-gray-600">
                <Save size={16} className="cursor-pointer hover:text-black" />
                <Share2 size={16} className="cursor-pointer hover:text-black" />
             </div>
             <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
             {/* Simple Toolbar */}
             <div className="flex items-center gap-3 text-gray-600">
                <Bold size={16} />
                <Italic size={16} />
                <Underline size={16} />
                <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
                <AlignLeft size={16} />
                <AlignCenter size={16} />
                <AlignRight size={16} />
             </div>
          </div>
       </div>

       {/* Canvas */}
       <div className="flex-1 overflow-auto bg-gray-100 relative">
          {renderContent()}
       </div>

       {/* Status Bar */}
       <div className={`${config.color} text-white px-4 py-1 text-xs flex justify-between items-center`}>
          <span>Page 1 of 1</span>
          <div className="flex gap-4">
             <span>English (US)</span>
             <span>100%</span>
          </div>
       </div>
    </div>
  );
};
