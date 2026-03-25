import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../UI/Navbar';
import { cn } from '../UI/Button';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>
      
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Quota-Limited Request Management System<span className="text-brand-600">.</span></span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Modern contact management system to handle your inquiries efficiently and filter out spam.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 dark:text-slate-200">Product</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 dark:text-slate-200">Legal</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-slate-400 text-sm flex justify-between items-center">
          <p>© 2026 Quota-Limited Request Management System Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
