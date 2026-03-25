import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Github, Twitter, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/UI/Button';

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || "Failed to create account");
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
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-brand-600/40 mix-blend-multiply flex items-center justify-center pointer-events-none z-10">
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
            <h2 className="text-4xl font-bold mb-6 leading-tight">Join the future of communication.</h2>
            <p className="text-lg text-brand-100/80 leading-relaxed mb-8">
              Create an account to deploy our AI-powered spam detection and start organizing your business queries efficiently.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-100">
                <CheckCircle2 className="w-5 h-5 text-brand-400" /> Secure user database
              </div>
              <div className="flex items-center gap-3 text-brand-100">
                <CheckCircle2 className="w-5 h-5 text-brand-400" /> AI spam detection
              </div>
              <div className="flex items-center gap-3 text-brand-100">
                <CheckCircle2 className="w-5 h-5 text-brand-400" /> Advanced data analytics
              </div>
            </div>
          </div>
          
          <p className="text-sm text-brand-300">© 2026 Quota-Limited Request Management System Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Signup form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="bg-brand-600 text-white p-2 rounded-lg">
             <MessageSquare size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Quota-Limited Request Management System<span className="text-brand-600">.</span></span>
        </Link>
        
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-3">Create an account</h2>
            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign up.</p>
          </div>

          {success ? (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" /> Account created! Redirecting to login...
            </div>
          ) : (
            <>
              {error && (
                <div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="input-field"
                    placeholder="Admin User"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="input-field"
                    placeholder="admin@system.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="input-field"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-brand-200 border-t-white rounded-full animate-spin"></div>
                  ) : "Create Account"}
                </Button>
              </form>

              <div className="mt-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-slate-200 dark:before:border-slate-800 after:mt-0.5 after:flex-1 after:border-t after:border-slate-200 dark:after:border-slate-800">
                <p className="mx-4 mb-0 text-center text-sm font-medium text-slate-500">Or sign up with</p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <Button variant="secondary" className="w-full gap-2 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
                <Button variant="secondary" className="w-full gap-2 text-sm">
                  <Twitter className="w-4 h-4" /> Twitter
                </Button>
              </div>
            </>
          )}
          
          <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account? <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
