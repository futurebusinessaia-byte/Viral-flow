import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, BarChart3, Calendar, Settings, Zap, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
    { icon: Sparkles, label: 'AI Generator', path: '/app/generator' },
    { icon: Calendar, label: 'Scheduler', path: '/app/scheduler' },
    { icon: BarChart3, label: 'Analytics', path: '/app/analytics' },
    { icon: DollarSign, label: 'Monetization', path: '/app/monetization' },
  ];

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Failed to start checkout: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('An error occurred while connecting to payment server.');
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Zap className="w-6 h-6 fill-current" />
            <span>ViralFlow</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <h3 className="font-semibold text-sm mb-1">Pro Plan</h3>
            <p className="text-xs text-indigo-100 mb-3">5,000 credits remaining</p>
            <button 
              onClick={handleUpgrade}
              className="w-full bg-white/20 hover:bg-white/30 text-xs font-medium py-1.5 rounded transition-colors"
            >
              Upgrade
            </button>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 mt-4 text-sm font-medium text-slate-600 hover:text-slate-900 w-full">
            <Settings className="w-5 h-5 text-slate-400" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-semibold text-lg text-slate-800">
            {navItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
              JD
            </button>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
