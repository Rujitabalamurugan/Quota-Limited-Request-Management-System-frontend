import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../UI/Sidebar';
import { Bell, Search, Menu } from 'lucide-react';

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState({ name: 'Admin', avatar: null });

  // Add an event listener to re-fetch when settings are updated
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile({ name: data.name || 'Admin', avatar: data.avatar });
        }
      } catch (err) {
        console.error("Layout failed to fetch profile");
      }
    };

    fetchProfile();
    
    // We can listen for a custom event from the Settings page to trigger an immediate update
    window.addEventListener('profileUpdated', fetchProfile);
    return () => window.removeEventListener('profileUpdated', fetchProfile);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <Sidebar />
      
      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          {/* Inside a true mobile sidebar, we would render a compact version of Sidebar here */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-2xl p-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="text-brand-600">Quota-Limited Request Management System.</span> Admin
            </h3>
            <p className="text-slate-500 mb-4 text-sm">Navigation is on desktop for now.</p>
            <button className="text-brand-600 text-sm hover:underline" onClick={() => setMobileMenuOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all w-64 lg:w-96">
              <Search className="w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="bg-transparent border-none outline-none text-sm w-full dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-slate-800 cursor-pointer hover:shadow-lg transition-all overflow-hidden">
              {profile.avatar ? (
                 <img src={profile.avatar} alt="User" className="w-full h-full object-cover" />
              ) : (
                 profile.name.charAt(0).toUpperCase()
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full animation-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
