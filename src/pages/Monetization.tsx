import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, CheckCircle2, AlertCircle, Zap, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 120 },
  { name: 'Tue', revenue: 180 },
  { name: 'Wed', revenue: 150 },
  { name: 'Thu', revenue: 290 },
  { name: 'Fri', revenue: 350 },
  { name: 'Sat', revenue: 480 },
  { name: 'Sun', revenue: 520 },
];

export default function Monetization() {
  const [balance, setBalance] = useState(12450.85);
  const [isAutoPilot, setIsAutoPilot] = useState(true);

  // Simulate live earning updates
  useEffect(() => {
    if (!isAutoPilot) return;
    
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() * 0.5));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPilot]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Monetization Hub</h1>
          <p className="text-slate-500">Manage your automated income streams.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-sm font-medium text-slate-600">Auto-Pilot Mode</span>
          <button 
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isAutoPilot ? 'bg-green-500' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAutoPilot ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">Total Balance</span>
            </div>
            <div className="text-4xl font-bold mb-4 font-mono">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                Withdraw Funds
              </button>
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                Transaction History
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Daily Run Rate</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">$452.00</div>
          <div className="text-sm text-green-600 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            +12.5% vs yesterday
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Revenue Performance</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                formatter={(value: number) => [`$${value}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: 'Ad Revenue', status: 'Active', amount: '$2,450.00', color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Affiliate Links', status: 'Active', amount: '$8,120.50', color: 'text-purple-600', bg: 'bg-purple-50' },
          { title: 'Sponsorships', status: 'Pending', amount: '$1,880.00', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stream, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stream.bg} ${stream.color}`}>
                <DollarSign className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stream.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                {stream.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{stream.title}</h3>
            <div className="text-2xl font-bold text-slate-900">{stream.amount}</div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="text-slate-500">Auto-inject enabled</span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${stream.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${stream.status === 'Active' ? 'translate-x-4' : ''}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referral System */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-medium mb-4">
              <Users className="w-3 h-3" />
              <span>Viral Growth Program</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Invite Friends, Earn 20% Forever</h3>
            <p className="text-indigo-100 mb-6 max-w-md">
              Share your unique link. When creators sign up, you earn 20% of their subscription revenue for life. The highest earning users make $5k+/mo from referrals alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex items-center justify-between">
                <code className="font-mono text-sm">viralflow.ai/ref/johndoe</code>
                <button className="text-xs font-bold hover:text-indigo-200 transition-colors">COPY</button>
              </div>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                Share Now
              </button>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Referral Stats
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-indigo-200 mb-1">Total Clicks</div>
                <div className="text-2xl font-bold">1,240</div>
              </div>
              <div>
                <div className="text-xs text-indigo-200 mb-1">Signups</div>
                <div className="text-2xl font-bold">85</div>
              </div>
              <div>
                <div className="text-xs text-indigo-200 mb-1">Conversion</div>
                <div className="text-2xl font-bold text-green-300">6.8%</div>
              </div>
              <div>
                <div className="text-xs text-indigo-200 mb-1">Earned</div>
                <div className="text-2xl font-bold text-green-300">$420.50</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automation Settings */}
      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg mb-1">Smart Monetization Engine</h3>
            <p className="text-indigo-700 text-sm mb-4 max-w-2xl">
              Our AI automatically inserts high-converting affiliate links and ad placements into your content based on topic relevance and audience demographics.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-indigo-800">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Contextual Ad Matching</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-indigo-800">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Auto-Affiliate Insertion</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-indigo-800">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Dynamic Pricing Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
