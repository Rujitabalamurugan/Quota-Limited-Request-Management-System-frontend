import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI/Card';
import { Mail, ShieldAlert, Users, TrendingUp, MoreVertical, CheckCircle2, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function DashboardPage() {
  const [recentMessages, setRecentMessages] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total Messages', value: '...', change: '+0%', isPositive: true, icon: Mail, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-900/20' },
    { label: 'Spam Blocked', value: '...', change: '-0%', isPositive: true, icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { label: 'New Contacts', value: '...', change: '+0%', isPositive: true, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Conversion Rate', value: '...', change: '+0%', isPositive: true, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/messages');
        if (response.ok) {
          const data = await response.json();
          const allMsgs = data.reverse(); // Newest first
          
          setRecentMessages(allMsgs.slice(0, 5).map(msg => ({
            id: msg._id,
            name: msg.name,
            email: msg.email,
            subject: msg.subject,
            date: new Date(msg.date).toLocaleDateString(),
            readStatus: msg.is_read ? 'read' : 'unread',
            approvalStatus: msg.status
          })));

          const todayMsgs = allMsgs.filter(m => new Date(m.date).toDateString() === new Date().toDateString());
          const todayCount = todayMsgs.length;
          const quotaLimit = 100; // Daily system quota
          const quotaPercent = Math.min(Math.round((todayCount / quotaLimit) * 100), 100);

          const pendingCount = allMsgs.filter(m => m.status === 'Pending').length;
          const approvedCount = allMsgs.filter(m => m.status === 'Approved').length;
          const rejectedCount = allMsgs.filter(m => m.status === 'Rejected').length;
          
          setStats([
            { label: 'Today\'s Quota', value: `${todayCount}/${quotaLimit}`, change: `${quotaPercent}%`, isPositive: quotaPercent < 80, icon: TrendingUp, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-900/20', progress: quotaPercent },
            { label: 'Pending Approvals', value: pendingCount.toString(), change: 'Requires Action', isPositive: pendingCount === 0, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { label: 'Approved Requests', value: approvedCount.toString(), change: 'Processed', isPositive: true, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
            { label: 'Rejected Requests', value: rejectedCount.toString(), change: 'Blocked', isPositive: false, icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          ]);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Approved Requests',
        data: [12, 19, 15, 25, 22, 10, 8],
        borderColor: 'rgb(14, 165, 233)', // brand-500
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Rejected/Spam',
        data: [4, 2, 7, 3, 5, 1, 2],
        borderColor: 'rgb(244, 63, 94)', // rose-500
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
          usePointStyle: true,
          boxWidth: 8
        }
      },
    },
    scales: {
      y: {
        grid: { color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' }
      },
      x: {
        grid: { display: false },
        ticks: { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' }
      }
    }
  };

  // Removed hardcoded recentMessages array since we fetch it via useEffect

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your contacts today.</p>
        </div>
        <div className="flex gap-2">
          <select className="input-field py-2 text-sm max-w-[150px]">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 relative overflow-hidden group">
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} mix-blend-multiply filter blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-sm font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                {stat.progress !== undefined && (
                  <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${stat.progress >= 100 ? 'bg-rose-500' : 'bg-brand-500'}`} 
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Activity Overview</h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full h-[300px]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </Card>

        {/* Recent Messages list */}
        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Messages</h3>
            <button className="text-brand-600 text-sm hover:underline">View All</button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {recentMessages.map(msg => (
              <div key={msg.id} className="group relative flex gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-brand-100 dark:from-indigo-900/40 dark:to-brand-900/40 flex items-center justify-center text-brand-700 dark:text-brand-400 font-bold shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className={`text-sm truncate pr-2 ${msg.readStatus === 'unread' ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                      {msg.name}
                    </p>
                    <span className="text-xs text-slate-400 shrink-0 mt-0.5 flex items-center gap-1">
                      {msg.readStatus === 'unread' ? <div className="w-2 h-2 rounded-full bg-brand-500"></div> : <CheckCircle2 className="w-3 h-3" />}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate mb-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${msg.approvalStatus === 'Approved' ? 'bg-emerald-500' : msg.approvalStatus === 'Rejected' || msg.approvalStatus === 'Spam' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {msg.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
