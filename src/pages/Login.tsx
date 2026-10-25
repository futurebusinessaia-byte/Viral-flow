import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
            <Zap className="w-8 h-8 fill-current" />
            <span>ViralFlow</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome back</h2>
        <p className="text-center text-slate-500 mb-8">Enter your credentials to access your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
            <input 
              type="email" 
              defaultValue="demo@viralflow.ai"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              defaultValue="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <Link to="/" className="text-indigo-600 font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
