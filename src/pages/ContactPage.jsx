import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    const formData = {
      name: `${e.target.firstName.value} ${e.target.lastName.value}`,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          e.target.reset();
        }, 5000);
      } else if (response.status === 429) {
        const errorData = await response.json();
        setErrorMsg(errorData.error || 'Quota Exceeded.');
      } else {
        setErrorMsg('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Let's start a conversation.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
            Have questions about our platform? Need a custom plan? We'd love to hear from you. Fill out the form and our team will be in touch shortly.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Fast Response</h4>
                <p className="text-slate-500 dark:text-slate-400">Usually under 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dedicated Support</h4>
                <p className="text-slate-500 dark:text-slate-400">Talk to real humans, not bots</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-slide-up">
          {/* Decorative blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-500 rounded-3xl blur opacity-20 dark:opacity-40"></div>
          
          <Card className="relative p-8 sm:p-10 shadow-xl border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animation-fade-in">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Thanks for reaching out. We've received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {errorMsg && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 rounded-xl text-sm flex items-center font-medium">
                    {errorMsg}
                  </div>
                )}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="input-field"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                    <select 
                      id="subject" 
                      className="input-field appearance-none"
                    >
                      <option>Number of requests per user (daily/weekly/monthly)</option>
                      <option>Resource usage (CPU, storage, bandwidth)</option>
                      <option>API request limits (rate limiting)</option>
                      <option>Number of approvals handled per admin</option>
                      <option>Time-based access limits (requests per hour/day)</option>
                      <option>Priority-based request limits (high/medium/low quotas)</option>
                      <option>Concurrent requests allowed per user</option>
                      <option>Department/user-wise allocation limits</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full mt-2" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Send Message</>
                  )}
                </Button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
