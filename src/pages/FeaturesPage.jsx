import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Zap, BarChart3, Database, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/UI/Button';

export function FeaturesPage() {
  const advantages = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "AI Spam Detection",
      description: "Stop wasting time on bots and unsolicited sales pitches. Our sophisticated Machine Learning engine automatically intercepts up to 99% of spam messages before they ever hit your primary inbox. Models are trained on millions of data points to ensure peak efficiency."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Real-time Analytics",
      description: "Turn your communication data into actionable insights. View volume trends, message categorizations, and peak activity hours natively on the dashboard to optimize your team's support workflow."
    },
    {
      icon: <Database className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Secure Cloud Storage",
      description: "Every inquiry is stored in our robust, scalable NoSQL databases completely separate from your front-end logic. Data is encrypted, easily accessible, and exportable formatting options empower you to manage leads effectively."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      title: "Instant Interface Sync",
      description: "No more hitting refresh. Our modern UI architecture instantly organizes your messages, reflects read/unread statuses immediately across your dashboard, and processes bulk actions with millisecond latency."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-brand-800 opacity-90 mix-blend-multiply"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-brand-100 text-sm font-medium mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Platform Architecture
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Built for modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-300">communication.</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-100/90 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            A comprehensive look at the powerful tools and advantages working behind the scenes of the Smart Contact System.
          </p>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link to="/contact">
              <Button size="lg" className="gap-2 shadow-2xl shadow-brand-500/30">
                Experience it now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Advantage Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {advantages.map((adv, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-14 h-14 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mb-6">
                {adv.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{adv.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
        <div className="bg-brand-600 dark:bg-brand-900 rounded-3xl p-10 lg:p-16 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 blur-xl mix-blend-screen pointer-events-none">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-white rounded-full"></div>
            <div className="absolute top-40 -right-40 w-96 h-96 bg-indigo-300 rounded-full"></div>
          </div>
          
          <MessageSquare className="w-16 h-16 text-brand-200 mb-6 relative z-10" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Stop managing clutter. Start building relationships.</h2>
          <p className="text-xl text-brand-100 max-w-2xl mb-10 relative z-10">
            Our platform is designed specifically to elevate professional interactions by guaranteeing user focus remains exclusively on high-value, legitimate inquiries.
          </p>
          <div className="flex gap-4 relative z-10">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-brand-50 shadow-xl border-none">
                Create Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="lg" className="text-brand-50 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-800">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
