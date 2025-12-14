import React from 'react';
import { 
  LayoutDashboard, Users, ShoppingCart, BarChart3, Settings, 
  MessageSquare, Calendar, Bell, Search, PlusCircle
} from 'lucide-react';

export const OdooApp: React.FC = () => {
  const modules = [
    { name: 'Sales', icon: <BarChart3 className="text-purple-600" size={32} />, count: '12 Orders' },
    { name: 'CRM', icon: <Users className="text-blue-600" size={32} />, count: '45 Leads' },
    { name: 'Inventory', icon: <LayoutDashboard className="text-orange-600" size={32} />, count: 'Stock OK' },
    { name: 'Accounting', icon: <Settings className="text-teal-600" size={32} />, count: 'Pending' },
    { name: 'Website', icon: <GlobeIcon className="text-green-600" size={32} />, count: 'Live' },
    { name: 'PoS', icon: <ShoppingCart className="text-pink-600" size={32} />, count: 'Open' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F9F9F9] text-[#4c4c4c] font-sans">
       {/* Odoo Navbar */}
       <div className="h-12 bg-[#714B67] text-white flex items-center justify-between px-4 shadow-md">
          <div className="flex items-center gap-4">
             <LayoutDashboard size={20} className="opacity-80 cursor-pointer" />
             <span className="font-bold text-lg tracking-tight">Odoo</span>
             <div className="flex gap-4 text-sm font-medium opacity-90 ml-4">
                <span className="cursor-pointer hover:opacity-100">Discuss</span>
                <span className="cursor-pointer hover:opacity-100">Calendar</span>
                <span className="cursor-pointer hover:opacity-100">Contacts</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white/10 p-1 rounded-md flex items-center gap-2 px-2">
                 <Search size={14} />
                 <span className="text-xs opacity-70">Search...</span>
             </div>
             <MessageSquare size={18} className="cursor-pointer" />
             <Bell size={18} className="cursor-pointer" />
             <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                 HZ
             </div>
          </div>
       </div>

       {/* Dashboard Content */}
       <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
             <h1 className="text-2xl font-light mb-6 text-gray-700">Hamza's Enterprise</h1>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {modules.map((mod, i) => (
                   <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center gap-4 group">
                      <div className="transform group-hover:scale-110 transition-transform duration-200">
                          {mod.icon}
                      </div>
                      <div>
                          <h3 className="font-semibold text-gray-800">{mod.name}</h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">{mod.count}</span>
                      </div>
                   </div>
                ))}
                
                {/* Add New Module */}
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    <PlusCircle size={32} />
                    <span className="text-sm mt-2">Add App</span>
                </div>
             </div>

             {/* Recent Activity Widget */}
             <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 <h2 className="text-lg font-semibold mb-4 border-b pb-2">Activity Feed</h2>
                 <div className="space-y-4">
                    <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">HZ</div>
                       <div>
                          <p className="text-sm"><span className="font-bold">Hamza</span> created a new invoice <span className="text-blue-600">#INV-2024-001</span></p>
                          <span className="text-xs text-gray-400">2 minutes ago</span>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">sys</div>
                       <div>
                          <p className="text-sm"><span className="font-bold">System</span> updated inventory for <span className="font-medium">Product X</span></p>
                          <span className="text-xs text-gray-400">1 hour ago</span>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// Helper for icon
const GlobeIcon = ({ size, className }: { size: number, className: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);
