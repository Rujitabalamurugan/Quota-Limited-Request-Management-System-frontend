import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Trash2, Eye, Filter, Download, ArrowUpDown, Search, MoreHorizontal, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../components/UI/Button';

export function SpamPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingMessage, setViewingMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages');
        if (response.ok) {
          const data = await response.json();
          const formattedMessages = data
            .map((msg, index) => ({
              id: `MSG-${index + 1}`,
              _rawId: msg._id,
              name: msg.name,
              email: msg.email,
              subject: msg.subject,
              message: msg.message,
              date: new Date(msg.date).toLocaleString(),
              status: msg.is_read ? 'read' : 'unread',
              type: msg.status === 'Spam' ? 'spam' : 'valid'
            }))
            .filter(msg => msg.type === 'spam'); // Only keep spam!
            
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
  }, []);

  const handleViewMessage = async (msg) => {
    setViewingMessage(msg);
    if (msg.status === 'unread') {
      try {
        await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages/${msg._rawId}/read`, { method: 'POST' });
        setMessages(messages.map(m => m._rawId === msg._rawId ? { ...m, status: 'read' } : m));
      } catch (err) {
        console.error("Failed to mark as read");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-500" /> Spam Detected
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review AI-flagged spam messages isolated from your main inbox.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" className="gap-2">
            <Trash2 className="w-4 h-4" /> Empty Spam
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-rose-100 dark:border-rose-900/30">
        <div className="p-4 sm:px-6 border-b border-rose-100 dark:border-rose-900/30 flex justify-end bg-rose-50/30 dark:bg-rose-900/10">
          <div className="relative max-w-sm w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search spam..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-rose-50/50 dark:bg-rose-900/20 dark:text-slate-400 border-b border-rose-100 dark:border-rose-900/30">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Sender</th>
                <th scope="col" className="px-6 py-4 font-medium">Subject</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer">Date</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-12 h-12 mx-auto text-emerald-400 mb-3 opacity-50" />
                    No spam detected. Your inbox is clean!
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer"
                    onClick={() => handleViewMessage(msg)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400">
                          {msg.name.charAt(0)}
                        </div>
                        <div>
                          <div className={cn("font-medium", msg.status === 'unread' ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300")}>
                            {msg.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{msg.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate">
                        <span className={cn(msg.status === 'unread' && "font-semibold text-slate-900 dark:text-white")}>
                          {msg.subject}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                        <ShieldAlert className="w-3 h-3" /> Spam
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {msg.date}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Not Spam">
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setViewingMessage(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-900/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Spam Analysis
              </h2>
              <button onClick={() => setViewingMessage(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{viewingMessage.subject}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">From: <span className="font-medium text-slate-700 dark:text-slate-300">{viewingMessage.name}</span> &lt;{viewingMessage.email}&gt;</p>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{viewingMessage.date}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                {viewingMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
