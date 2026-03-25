import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Github, Twitter } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (response.ok) {
        // Logged in successfully
        navigate('/admin');
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Is the backend server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 dark:text-slate-100 bg-background dark:bg-background-dark">
      {/* Visual side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-900 border-r border-brand-800">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 to-indigo-900/80 mix-blend-multiply flex items-center justify-center pointer-events-none z-10">
          <div className="w-[800px] h-[800px] bg-brand-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow"></div>
        </div>
        
        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white max-w-xl">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
              <MessageSquare size={24} className="text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Quota-Limited Request Management System<span className="text-brand-400">.</span></span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Control your communication streams.</h2>
            <p className="text-lg text-brand-100/80 leading-relaxed mb-8">
              Log in to access your dashboard, analyze interactions, and manage submissions with our state-of-the-art tools.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-800 bg-brand-700 flex items-center justify-center text-xs font-bold ring-2 ring-brand-900">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-brand-200">Trusted by 10,000+ teams</p>
            </div>
          </div>
          
          <p className="text-sm text-brand-300">© 2026 Quota-Limited Request Management System Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Login form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="bg-brand-600 text-white p-2 rounded-lg">
            <MessageSquare size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Quota-Limited Request Management System<span className="text-brand-600">.</span></span>
        </Link>
        
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-3">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="input-field"
                placeholder="admin@system.com"
                defaultValue="admin@system.com"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium" htmlFor="password">Password</label>
                <a href="#" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                id="password" 
                className="input-field"
                placeholder="••••••••"
                defaultValue="password"
                required
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400">Remember me for 30 days</label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-brand-200 border-t-white rounded-full animate-spin"></div>
              ) : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-slate-200 dark:before:border-slate-800 after:mt-0.5 after:flex-1 after:border-t after:border-slate-200 dark:after:border-slate-800">
            <p className="mx-4 mb-0 text-center text-sm font-medium text-slate-500">Or continue with</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Button variant="secondary" className="w-full gap-2">
              <Github className="w-5 h-5" /> GitHub
            </Button>
            <Button variant="secondary" className="w-full gap-2">
              <Twitter className="w-5 h-5" /> Twitter
            </Button>
          </div>
          
          <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account? <Link to="/signup" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
