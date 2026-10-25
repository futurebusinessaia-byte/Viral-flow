import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Check, ArrowRight, Star, Calendar, BarChart3, Share2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-indigo-400">
            <Zap className="w-8 h-8 fill-current" />
            <span>ViralFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link 
              to="/app" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
              <Star className="w-3 h-3 fill-current" />
              <span>New: AI Video Generation</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Viral Success</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Stop guessing what works. Our AI analyzes millions of viral posts to generate, schedule, and optimize your content for maximum engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/app" 
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-all text-white">
                View Demo
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ creators</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-mono text-slate-500">viral-engine-v3.0.1</div>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-indigo-400">$</span>
                  <span className="text-slate-300">analyzing trends...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">found 3 breakout topics</span>
                </div>
                <div className="p-4 bg-slate-900/50 rounded border border-white/5 text-slate-300">
                  <div className="text-xs text-slate-500 mb-2">GENERATED HOOK</div>
                  "Stop trying to hack the algorithm. Do this instead..."
                </div>
                <div className="flex gap-4">
                  <span className="text-indigo-400">$</span>
                  <span className="text-slate-300">scheduling for peak engagement (09:42 AM)...</span>
                </div>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to go viral</h2>
            <p className="text-slate-400 text-lg">
              Our platform combines advanced AI with proven marketing psychology to create content that stops the scroll.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Content Generation",
                desc: "Generate weeks of content in minutes. From tweets to long-form articles.",
                icon: Zap
              },
              {
                title: "Smart Scheduling",
                desc: "Post automatically when your audience is most active.",
                icon: Calendar
              },
              {
                title: "Viral Analytics",
                desc: "Track what works and double down on your winners.",
                icon: BarChart3
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg">
              Start for free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                desc: "Perfect for trying out ViralFlow",
                features: ["5 AI generations/day", "Basic analytics", "1 social account", "Manual scheduling"],
                cta: "Start Free",
                popular: false
              },
              {
                name: "Pro",
                price: "$29",
                desc: "For serious creators & influencers",
                features: ["Unlimited generations", "Advanced analytics", "5 social accounts", "Auto-pilot mode", "Viral trends access"],
                cta: "Get Pro",
                popular: true
              },
              {
                name: "Agency",
                price: "$99",
                desc: "Manage multiple brands",
                features: ["Everything in Pro", "Unlimited accounts", "White-label reports", "API access", "Priority support"],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl border ${plan.popular ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/10' : 'bg-white/5 border-white/10'} flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <p className="text-slate-400 text-sm">{plan.desc}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/app"
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by creators</h2>
            <p className="text-slate-400 text-lg">Don't just take our word for it.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "ViralFlow changed my life. I went from 500 to 50k followers in 3 months using the auto-pilot feature.",
                author: "Sarah Jenkins",
                role: "Tech Influencer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
              },
              {
                quote: "The AI understands my tone perfectly. It's like having a full-time copywriter for $29/mo.",
                author: "Marcus Chen",
                role: "Startup Founder",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
              },
              {
                quote: "Finally, a tool that actually helps me make money. The monetization dashboard is a game changer.",
                author: "Jessica Lee",
                role: "Digital Nomad",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
              }
            ].map((t, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 relative group transition-all hover:border-indigo-500/30">
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${t.quote}" - ${t.author} via ViralFlow`)}`, '_blank')}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-indigo-500 hover:text-white text-slate-400 transition-all opacity-0 group-hover:opacity-100"
                  title="Share on Twitter"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold text-sm">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-600 to-indigo-700" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Ready to go viral?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Join 10,000+ creators who are automating their growth and income with ViralFlow.
          </p>
          
          <form className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-transparent border-none text-white placeholder:text-indigo-200 px-6 py-3 outline-none"
            />
            <Link 
              to="/app"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </form>
          <p className="mt-4 text-sm text-indigo-200">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/10 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Zap className="w-6 h-6 fill-current text-indigo-500" />
            <span>ViralFlow</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div>
            © 2026 ViralFlow Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
