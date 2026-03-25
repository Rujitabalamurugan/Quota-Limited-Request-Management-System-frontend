import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ShieldAlert, BarChart3, Settings, LogOut } from 'lucide-react';
import { cn } from './Button';

export function Sidebar() {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: ShieldAlert, label: 'Spam Detection', path: '/admin/spam' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.path === '/admin'}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group cursor-pointer",
        isActive 
          ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
      )}
    >
      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
      <span>{item.label}</span>
      {/* Example badge */}
      {item.label === 'Messages' && (
        <span className="ml-auto bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400 py-0.5 px-2 rounded-full text-xs font-bold">12</span>
      )}
    </NavLink>
  );

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen sticky top-0 flex flex-col transition-colors duration-200 z-10 hidden lg:flex">
      <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 group">
          <div className="bg-brand-600 text-white p-2 rounded-xl">
            <MessageSquare size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Quota-Limited Request Management System<span className="text-brand-600">.</span></span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-4 mt-4">Menu</div>
        {menuItems.map(item => (
          <NavItem key={item.path} item={item} />
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
        {bottomItems.map(item => (
          <NavItem key={item.path} item={item} />
        ))}
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 w-full text-left group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
