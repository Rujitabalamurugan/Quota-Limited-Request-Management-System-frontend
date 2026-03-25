import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Trash2, Eye, Filter, Download, ArrowUpDown, Search, MoreHorizontal, ShieldCheck, Mail } from 'lucide-react';
import { cn } from '../../components/UI/Button';

export function MessagesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages');
        if (response.ok) {
          const data = await response.json();
          // The backend returns a list of dictionaries with status 'Spam' or 'Valid'
          // We map this closer to our UI format
          const formattedMessages = data.map((msg, index) => ({
            id: `MSG-${index + 1}`,
            _rawId: msg._id,
            name: msg.name,
            email: msg.email,
            subject: msg.subject,
            message: msg.message,
            date: new Date(msg.date).toLocaleString(),
            status: msg.is_read ? 'read' : 'unread',
            approvalStatus: msg.status
          }));
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

  const [viewingMessage, setViewingMessage] = useState(null);

  const filteredMessages = messages.filter(msg => {
    if (msg.approvalStatus === 'Spam') return false; // Hide spam on this page entirely
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return msg.status === 'unread';
    return true;
  });

  const handleViewMessage = async (msg) => {
    setViewingMessage(msg);
    // If it's unread, mark it as read in backend
    if (msg.status === 'unread') {
      try {
        await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages/${msg._rawId}/read`, { method: 'POST' });
        setMessages(messages.map(m => m._rawId === msg._rawId ? { ...m, status: 'read' } : m));
      } catch (err) {
        console.error("Failed to mark as read");
      }
    }
  };

  const handleDelete = async (e, msgId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages/${msgId}`, { method: 'DELETE' });
        setMessages(messages.filter(m => m._rawId !== msgId));
      } catch(err) {
        console.error("Failed to delete", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Message Management</h1>
          <p className="text-slate-500 text-sm mt-1">View, filter, and respond to all incoming inquiries.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        {/* Table Header / Toolbar */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex space-x-1 sm:space-x-8">
            {['all', 'unread'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors border-b-2 capitalize",
                  activeTab === tab 
                    ? "border-brand-500 text-brand-600 dark:text-brand-400" 
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative max-w-sm w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th scope="col" className="p-4 w-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
                  Sender <ArrowUpDown className="w-3 h-3" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">Subject</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
                  Date <ArrowUpDown className="w-3 h-3" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => (
                <tr 
                  key={msg.id} 
                  className={cn(
                    "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer",
                    msg.status === 'unread' ? "bg-brand-50/30 dark:bg-brand-900/10" : ""
                  )}
                  onClick={() => handleViewMessage(msg)}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-700" />
                    </div>
                  </td>
                  <td className="px-6 py-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        msg.approvalStatus === 'Spam' 
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
                          : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
                      )}>
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
                    <div className="flex gap-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                        msg.approvalStatus === 'Approved' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" :
                        msg.approvalStatus === 'Rejected' ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" :
                        (msg.approvalStatus === 'Pending' || msg.approvalStatus === 'Valid') ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" :
                        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      )}>
                        {msg.approvalStatus}
                      </span>
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
                        msg.status === 'unread' 
                          ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      )}>
                        <Mail className="w-3 h-3" /> {msg.status === 'unread' ? 'Unread' : 'Read'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {msg.date}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, msg._rawId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/20">
          <div>Showing 1 to {filteredMessages.length} of {filteredMessages.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-brand-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900">Next</button>
          </div>
        </div>
      </Card>

      {/* Message View Modal */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setViewingMessage(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Message Details</h2>
              <button onClick={() => setViewingMessage(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
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
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex gap-2">
                {(viewingMessage.approvalStatus === 'Pending' || viewingMessage.approvalStatus === 'Valid') && (
                  <>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={async () => {
                      await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages/${viewingMessage._rawId}/approve`, { method: 'POST' });
                      setMessages(messages.map(m => m._rawId === viewingMessage._rawId ? { ...m, approvalStatus: 'Approved' } : m));
                      setViewingMessage({ ...viewingMessage, approvalStatus: 'Approved' });
                    }}>Approve</Button>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white" onClick={async () => {
                      await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'}'}/messages/${viewingMessage._rawId}/reject`, { method: 'POST' });
                      setMessages(messages.map(m => m._rawId === viewingMessage._rawId ? { ...m, approvalStatus: 'Rejected' } : m));
                      setViewingMessage({ ...viewingMessage, approvalStatus: 'Rejected' });
                    }}>Reject</Button>
                  </>
                )}
                <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900/20" onClick={(e) => {
                  handleDelete(e, viewingMessage._rawId);
                  setViewingMessage(null);
                }}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setViewingMessage(null)}>Close</Button>
                <Button onClick={() => window.location.href = `mailto:${viewingMessage.email}`}>Reply via Email</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
