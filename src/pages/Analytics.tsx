import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ArrowUp, ArrowDown, Users, Globe, Smartphone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const engagementData = [
  { name: 'Mon', likes: 400, shares: 240, comments: 100 },
  { name: 'Tue', likes: 300, shares: 139, comments: 80 },
  { name: 'Wed', likes: 200, shares: 980, comments: 200 },
  { name: 'Thu', likes: 278, shares: 390, comments: 150 },
  { name: 'Fri', likes: 189, shares: 480, comments: 120 },
  { name: 'Sat', likes: 239, shares: 380, comments: 90 },
  { name: 'Sun', likes: 349, shares: 430, comments: 110 },
];

const platformData = [
  { name: 'Twitter', value: 400, color: '#60A5FA' },
  { name: 'LinkedIn', value: 300, color: '#3B82F6' },
  { name: 'Instagram', value: 300, color: '#EC4899' },
  { name: 'Blog', value: 200, color: '#10B981' },
];

const locations = [
  { country: 'United States', visitors: 12450, flag: '🇺🇸', trend: '+12%' },
  { country: 'United Kingdom', visitors: 8230, flag: '🇬🇧', trend: '+8%' },
  { country: 'Germany', visitors: 6120, flag: '🇩🇪', trend: '+15%' },
  { country: 'India', visitors: 5400, flag: '🇮🇳', trend: '+22%' },
  { country: 'Canada', visitors: 4100, flag: '🇨🇦', trend: '+5%' },
];

export default function Analytics() {
  const [liveVisitors, setLiveVisitors] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="text-slate-500">Deep dive into your content performance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Export Report</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {liveVisitors} Live Visitors
          </button>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Engagement Breakdown</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="likes" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="shares" fill="#8b5cf6" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="comments" fill="#ec4899" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Audience by Platform</h3>
          <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            {platformData.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs font-medium text-slate-600">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reach */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Global Reach</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
              <Globe className="w-3 h-3" />
              <span>Real-time</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            {locations.map((loc, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{loc.flag}</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{loc.country}</div>
                    <div className="text-xs text-slate-500">{loc.visitors.toLocaleString()} visitors</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {loc.trend}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Total Countries Reached</span>
              <span className="font-bold text-slate-900">142</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5 }}
                className="bg-indigo-600 h-full rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
