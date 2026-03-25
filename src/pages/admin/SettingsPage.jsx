import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { User, Bell, Shield, Key, Save, Camera } from 'lucide-react';
import { cn } from '../../components/UI/Button';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  const [name, setName] = useState('John Smith');
  const [email, setEmail] = useState('admin@system.com');
  const [avatar, setAvatar] = useState(null);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/profile');
        if (res.ok) {
          const data = await res.json();
          setName(data.name || 'John Smith');
          setEmail(data.email || 'admin@system.com');
          if (data.avatar) setAvatar(data.avatar);
        }
      } catch (e) {
        console.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (activeTab === 'profile') {
        await fetch('http://127.0.0.1:5000/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, avatar })
        });
        // Dispatch event so AdminLayout catches the change instantly
        window.dispatchEvent(new Event('profileUpdated'));
      }
    } catch (err) {
      console.error("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your profile, preferences, and security settings.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 flex-shrink-0 space-y-1">
          {[
            { id: 'profile', label: 'Profile Settings', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'api', label: 'API Keys', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left",
                  activeTab === tab.id 
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 text-3xl font-bold overflow-hidden border-2 border-slate-100 dark:border-slate-800">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Profile Photo</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-3">JPG, GIF or PNG. Max size 2MB.</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoChange} 
                    className="hidden" 
                    ref={fileInputRef} 
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                    <Camera className="w-4 h-4" /> Change Photo
                  </Button>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                    <input type="email" className="input-field" value={email} disabled />
                    <p className="text-xs text-slate-500 mt-1.5">Contact support to change your email address.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Email Notifications</h2>
              <form className="space-y-6" onSubmit={handleSave}>
                <div className="space-y-4">
                  {[
                    { title: "New Messages", desc: "Get notified when you receive a valid lead via the contact form.", checked: true },
                    { title: "Weekly Report", desc: "Receive a weekly summary of message analytics and spam blocks.", checked: true },
                    { title: "Security Alerts", desc: "Important notices concerning account security and logins.", checked: true, disabled: true },
                    { title: "Marketing Updates", desc: "Product announcements and promotional offers.", checked: false },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked={item.checked} disabled={item.disabled} className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Preferences</>}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Placeholder for Security/API to keep example concise */}
          {(activeTab === 'security' || activeTab === 'api') && (
            <Card className="p-6 md:p-8 animate-fade-in flex flex-col items-center justify-center min-h-[400px] text-slate-500 text-center">
              <Shield className="w-12 h-12 mb-4 opacity-20" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Page Under Construction</h2>
              <p className="max-w-md">The backend functionality for changing passwords and managing API keys is currently being developed.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
