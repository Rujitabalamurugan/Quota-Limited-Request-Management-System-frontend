import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart, Users } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export function LandingPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance. Responses are delivered instantly."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Advanced Spam Detection",
      description: "AI-powered filtering automatically detects and isolates spam submissions."
    },
    {
      icon: <BarChart className="w-6 h-6 text-brand-500" />,
      title: "Insightful Analytics",
      description: "Visualize your communication trends with beautiful, interactive charts."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: "Team Collaboration",
      description: "Assign messages, leave notes, and work together seamlessly."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 overflow-hidden mx-auto max-w-7xl w-full">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full blur-3xl mix-blend-multiply filter animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-12 animate-slide-up">
          <span className="px-4 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300 text-sm font-semibold tracking-wide mb-8 inline-block shadow-sm">
            ✨ Introducing Quota-Limited Request Management System 2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
            Manage your contacts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">crystal clarity</span>.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The modern, professional way to handle form submissions, block spam, and analyze your communication flow. Built for teams that demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg">
                View Dashboard
              </Button>
            </Link>
          </div>
          
          {/* Mockup Image Preview */}
          <div className="mt-20 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 p-2 sm:p-4 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark via-transparent to-transparent z-10 h-full w-full pointer-events-none rounded-2xl"></div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg aspect-[16/9] flex items-center justify-center relative">
              {/* Very simplified dashboard mockup representation */}
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex w-full h-full pt-10">
                <div className="w-1/4 max-w-[200px] border-r border-slate-200 dark:border-slate-700 p-4 hidden md:block">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4"></div>
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6 mb-4"></div>
                </div>
                <div className="flex-1 p-6">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-8"></div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="h-24 bg-brand-50 dark:bg-brand-900/20 rounded-xl"></div>
                    <div className="h-24 bg-slate-50 dark:bg-slate-800 rounded-xl md:block hidden"></div>
                    <div className="h-24 bg-slate-50 dark:bg-slate-800 rounded-xl md:block hidden"></div>
                  </div>
                  <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-xl w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Everything you need</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features to help you manage communication effortlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
