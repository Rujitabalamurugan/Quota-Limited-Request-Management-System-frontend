import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { cn } from './Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-600 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
            <MessageSquare size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Quota-Limited Request Management System<span className="text-brand-600">.</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                location.pathname === link.path ? "text-brand-600 dark:text-brand-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/contact">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 text-slate-500">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium py-2 text-slate-800 dark:text-slate-200"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full justify-center">Log in</Button>
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full justify-center">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
