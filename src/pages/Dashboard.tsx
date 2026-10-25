import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, Eye, MousePointerClick, TrendingUp, DollarSign } from 'lucide-react';

const data = [
  { name: 'Mon', views: 4000, clicks: 2400 },
  { name: 'Tue', views: 3000, clicks: 1398 },
  { name: 'Wed', views: 2000, clicks: 9800 },
  { name: 'Thu', views: 2780, clicks: 3908 },
  { name: 'Fri', views: 1890, clicks: 4800 },
  { name: 'Sat', views: 2390, clicks: 3800 },
  { name: 'Sun', views: 3490, clicks: 4300 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Earnings', value: '$12,450', change: '+18.2%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Views', value: '2.4M', change: '+12.5%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Engagement Rate', value: '4.8%', change: '+2.1%', icon: MousePointerClick, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Viral Score', value: '92/100', change: '+5.2%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Performance Overview</h2>
            <p className="text-sm text-slate-500">Views vs Clicks over the last 7 days</p>
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <h3 className="font-bold text-slate-900 mb-6">Recent Viral Hits</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {i}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">"10 AI Tools You Can't Ignore"</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>245K Views</span>
                    <span>•</span>
                    <span>12K Likes</span>
                  </div>
                </div>
                <div className="text-green-600 font-bold text-sm">+24%</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-lg"
        >
          <h3 className="font-bold text-lg mb-2">AI Insight</h3>
          <p className="text-indigo-100 text-sm mb-6">Based on your recent performance, posting about "Productivity Hacks" on Tuesday at 10 AM could yield 3x engagement.</p>
          
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-6">
            <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-2">Suggested Topic</div>
            <div className="font-medium">"How to automate your morning routine using Python"</div>
          </div>

          <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
            Generate This Post
          </button>
        </motion.div>
      </div>
    </div>
  );
}
