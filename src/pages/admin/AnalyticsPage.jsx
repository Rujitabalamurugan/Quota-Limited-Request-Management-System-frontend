import React from 'react';
import { Card } from '../../components/UI/Card';
import { Download, Calendar } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function AnalyticsPage() {
  const getChartColors = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      text: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    };
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: getChartColors().text,
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  // 1. Messages per Day (Line Chart)
  const messagesPerDayData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: 'Total Submissions',
        data: Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 10),
        borderColor: 'rgb(14, 165, 233)', // brand-500
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.3,
        pointRadius: 2,
      }
    ],
  };

  // 2. Spam vs Valid (Doughnut Chart)
  const spamVsValidData = {
    labels: ['Valid Messages', 'Spam Blocked', 'Unsure (Flagged)'],
    datasets: [
      {
        data: [82, 15, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // emerald-500
          'rgba(244, 63, 94, 0.8)',  // rose-500
          'rgba(245, 158, 11, 0.8)', // amber-500
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(244, 63, 94)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  };

  // 3. Activity by Time of Day (Bar Chart)
  const timeOfDayData = {
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        label: 'Interaction Volume',
        data: [12, 5, 25, 85, 120, 105, 65, 30],
        backgroundColor: 'rgba(99, 102, 241, 0.8)', // indigo-500
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics & Insights</h1>
          <p className="text-slate-500 text-sm mt-1">Deep dive into your communication data.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
            <Calendar className="w-4 h-4" /> Date Range
          </Button>
          <Button variant="primary" className="gap-2">
            <Download className="w-4 h-4" /> Reports
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Messages Per Day (Last 30 Days)</h3>
        <div className="w-full h-[300px]">
          <Line 
            options={{
              ...commonOptions,
              scales: {
                y: { grid: { color: getChartColors().grid }, ticks: { color: getChartColors().text } },
                x: { grid: { display: false }, ticks: { maxTicksLimit: 10, color: getChartColors().text } }
              }
            }} 
            data={messagesPerDayData} 
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Spam vs Valid Breakdown</h3>
          <div className="w-full h-[300px] flex items-center justify-center">
            <div className="w-[80%] h-full">
              <Doughnut 
                options={{
                  ...commonOptions,
                  cutout: '70%',
                  plugins: {
                    ...commonOptions.plugins,
                    legend: { position: 'right', labels: { color: getChartColors().text, usePointStyle: true } }
                  }
                }} 
                data={spamVsValidData} 
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Activity by Time of Day</h3>
          <div className="w-full h-[300px]">
            <Bar 
              options={{
                ...commonOptions,
                scales: {
                  y: { grid: { color: getChartColors().grid }, ticks: { color: getChartColors().text } },
                  x: { grid: { display: false }, ticks: { color: getChartColors().text } }
                }
              }} 
              data={timeOfDayData} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
