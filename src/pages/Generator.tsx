import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Calendar, RefreshCw, Check, Wand2, Bot, Zap, Video, FileText, Play, Film, Settings, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

const platforms = [
  { id: 'twitter', name: 'Twitter / X', maxLength: 280 },
  { id: 'linkedin', name: 'LinkedIn', maxLength: 3000 },
  { id: 'instagram', name: 'Instagram', maxLength: 2200 },
  { id: 'blog', name: 'Blog Post', maxLength: 10000 },
];

const tones = ['Professional', 'Witty', 'Controversial', 'Educational', 'Inspirational', 'Casual'];

const trendingTopics = [
  "The future of AI in 2025",
  "Why TypeScript is winning",
  "Remote work tips for productivity",
  "Sustainable living hacks",
  "Crypto market analysis",
  "Healthy meal prep ideas",
  "Indie hacking 101",
  "Mental health for developers",
  "Web3 and the creator economy",
  "Minimalist design trends"
];

export default function Generator() {
  const { addPost } = useApp();
  const [activeTab, setActiveTab] = useState<'text' | 'video'>('text');
  
  // Text State
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);
  const [tone, setTone] = useState(tones[0]);
  
  // Video State
  const [videoSource, setVideoSource] = useState('');
  const [videoType, setVideoType] = useState<'summary' | 'teaser' | 'promo' | 'story' | 'event' | 'tutorial'>('summary');
  const [videoResult, setVideoResult] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ topic: string, platform: string, content: string, date: Date }>>([]);
  
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [agentStatus, setAgentStatus] = useState('');
  const [showAutoPilotSettings, setShowAutoPilotSettings] = useState(false);
  
  // Auto-Pilot Settings
  const [scheduleStart, setScheduleStart] = useState('09:00');
  const [scheduleEnd, setScheduleEnd] = useState('17:00');
  const [scheduleDays, setScheduleDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Auto-Pilot Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPilot) {
      const runAgent = async () => {
        setAgentStatus('Scanning trends...');
        await new Promise(r => setTimeout(r, 1500));
        
        const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];
        const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
        const randomTone = tones[Math.floor(Math.random() * tones.length)];
        
        setTopic(randomTopic);
        setPlatform(randomPlatform);
        setTone(randomTone);
        setActiveTab('text');
        
        setAgentStatus(`Generating viral ${randomPlatform.name} post...`);
        setIsGenerating(true);
        
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          const prompt = `Write a viral ${randomPlatform.name} post about "${randomTopic}". 
          Tone: ${randomTone}. 
          Make it engaging, use appropriate hashtags, and format it for readability. 
          ${randomPlatform.id === 'twitter' ? 'Keep it under 280 characters.' : ''}
          ${randomPlatform.id === 'linkedin' ? 'Focus on professional insights and career growth.' : ''}
          ${randomPlatform.id === 'instagram' ? 'Focus on visual storytelling and include a caption for an image.' : ''}
          `;

          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
          });

          const generatedText = response.text || "Failed to generate content.";
          setResult(generatedText);
          
          if (response.text) {
            // Calculate scheduled time based on preferences
            const now = new Date();
            let scheduledTime = new Date();
            
            // Find next available day
            let daysToAdd = 1;
            while (true) {
              const checkDate = new Date(now);
              checkDate.setDate(now.getDate() + daysToAdd);
              const dayName = daysOfWeek[checkDate.getDay()];
              if (scheduleDays.includes(dayName)) {
                scheduledTime = checkDate;
                break;
              }
              daysToAdd++;
              if (daysToAdd > 14) break; // Safety break
            }

            // Set random time within range
            const [startHour, startMin] = scheduleStart.split(':').map(Number);
            const [endHour, endMin] = scheduleEnd.split(':').map(Number);
            
            const startMinutes = startHour * 60 + startMin;
            const endMinutes = endHour * 60 + endMin;
            const randomMinutes = Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes;
            
            scheduledTime.setHours(Math.floor(randomMinutes / 60), randomMinutes % 60, 0, 0);

            const newPost = {
              id: Date.now().toString(),
              title: randomTopic,
              content: generatedText,
              platform: randomPlatform.name,
              time: scheduledTime,
              status: 'scheduled' as const
            };
            
            addPost(newPost);
            setHistory(prev => [{
              topic: randomTopic,
              platform: randomPlatform.name,
              content: generatedText,
              date: new Date()
            }, ...prev]);
            
            setAgentStatus(`Scheduled for ${scheduledTime.toLocaleDateString()} at ${scheduledTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
          }
        } catch (error) {
          console.error("Auto-pilot error:", error);
          setAgentStatus('Error encountered. Retrying...');
        } finally {
          setIsGenerating(false);
        }
      };

      // Run immediately then every 10 seconds
      runAgent();
      interval = setInterval(runAgent, 10000);
    }

    return () => clearInterval(interval);
  }, [isAutoPilot, addPost, scheduleDays, scheduleStart, scheduleEnd]);

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsGenerating(true);
    setResult('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Write a viral ${platform.name} post about "${topic}". 
      Tone: ${tone}. 
      Make it engaging, use appropriate hashtags, and format it for readability. 
      ${platform.id === 'twitter' ? 'Keep it under 280 characters.' : ''}
      ${platform.id === 'linkedin' ? 'Focus on professional insights and career growth.' : ''}
      ${platform.id === 'instagram' ? 'Focus on visual storytelling and include a caption for an image.' : ''}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const generatedText = response.text || "Failed to generate content. Please try again.";
      setResult(generatedText);
      
      if (response.text) {
        setHistory(prev => [{
          topic,
          platform: platform.name,
          content: generatedText,
          date: new Date()
        }, ...prev]);
      }
    } catch (error) {
      console.error("Generation error:", error);
      setResult("Error generating content. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoSource) return;
    setIsGenerating(true);
    setVideoResult(null);

    // Simulate video generation process
    try {
      await new Promise(r => setTimeout(r, 1000)); // Analyzing
      setResult("Analyzing blog content...");
      await new Promise(r => setTimeout(r, 1500)); // Scripting
      setResult("Generating video script...");
      await new Promise(r => setTimeout(r, 2000)); // Rendering
      setResult("Rendering video frames...");
      
      // Mock result
      setVideoResult("https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-connection-11910-large.mp4");
      setResult("Video generated successfully!");
    } catch (error) {
      console.error("Video generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVideoTypeName = (type: string) => {
    switch(type) {
      case 'summary': return 'Blog Summary';
      case 'teaser': return 'Social Teaser';
      case 'promo': return 'Product Promo';
      case 'story': return 'Story Mode';
      case 'event': return 'Event Highlight';
      case 'tutorial': return 'Tutorial';
      default: return 'Video';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Content Generator</h1>
          <p className="text-slate-500">Create viral-worthy content in seconds using our advanced AI models.</p>
        </div>
        
        {/* Auto-Pilot Toggle */}
        <div className="flex flex-col items-end gap-2">
          <div className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all shadow-sm",
            isAutoPilot ? "bg-indigo-50 border-indigo-200" : "bg-white border-slate-200"
          )}>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bot className={cn("w-4 h-4", isAutoPilot ? "text-indigo-600" : "text-slate-400")} />
                Auto-Pilot
              </span>
              {isAutoPilot && (
                <span className="text-[10px] font-medium text-indigo-600 animate-pulse">
                  {agentStatus}
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsAutoPilot(!isAutoPilot)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                isAutoPilot ? 'bg-indigo-600' : 'bg-slate-200'
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                isAutoPilot ? 'translate-x-6' : 'translate-x-1'
              )} />
            </button>
            <button 
              onClick={() => setShowAutoPilotSettings(!showAutoPilotSettings)}
              className={cn(
                "ml-2 p-1.5 rounded-lg transition-colors",
                showAutoPilotSettings ? "bg-indigo-100 text-indigo-600" : "hover:bg-slate-100 text-slate-400"
              )}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showAutoPilotSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg w-72 z-10 overflow-hidden"
              >
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Scheduling Preferences</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Active Days</label>
                    <div className="flex flex-wrap gap-1">
                      {daysOfWeek.map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            if (scheduleDays.includes(day)) {
                              setScheduleDays(scheduleDays.filter(d => d !== day));
                            } else {
                              setScheduleDays([...scheduleDays, day]);
                            }
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full text-[10px] font-bold transition-colors flex items-center justify-center",
                            scheduleDays.includes(day) 
                              ? "bg-indigo-600 text-white" 
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          )}
                        >
                          {day.charAt(0)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Time Range</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="time" 
                        value={scheduleStart}
                        onChange={(e) => setScheduleStart(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-indigo-500"
                      />
                      <span className="text-slate-400 text-xs">to</span>
                      <input 
                        type="time" 
                        value={scheduleEnd}
                        onChange={(e) => setScheduleEnd(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('text')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
            activeTab === 'text' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          <FileText className="w-4 h-4" />
          Text Post
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
            activeTab === 'video' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          <Video className="w-4 h-4" />
          Video Summary
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {activeTab === 'text' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Topic or Idea</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., The future of remote work..."
                    className="w-full h-32 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
                    <select 
                      value={platform.id}
                      onChange={(e) => setPlatform(platforms.find(p => p.id === e.target.value) || platforms[0])}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                      {platforms.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                      {tones.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!topic || isGenerating}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all",
                    !topic || isGenerating 
                      ? "bg-slate-300 cursor-not-allowed" 
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Blog URL or Content</label>
                  <textarea
                    value={videoSource}
                    onChange={(e) => setVideoSource(e.target.value)}
                    placeholder="Paste your blog post URL or text content here..."
                    className="w-full h-32 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Select Video Template</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'summary', name: 'Blog Post Summary', icon: FileText, isPro: false, desc: 'Summarize long articles into short clips.' },
                      { id: 'teaser', name: 'Social Media Teaser', icon: Film, isPro: true, desc: 'High-energy cuts for Instagram & TikTok.' },
                      { id: 'promo', name: 'Product Promo', icon: Zap, isPro: true, desc: 'Showcase features with dynamic transitions.' },
                      { id: 'story', name: 'Story Mode', icon: Play, isPro: false, desc: 'Vertical format for Stories.' },
                      { id: 'event', name: 'Event Highlight', icon: Calendar, isPro: true, desc: 'Recap your latest webinar or meetup.' },
                      { id: 'tutorial', name: 'Tutorial / How-To', icon: Video, isPro: false, desc: 'Step-by-step instructional video.' },
                    ].map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setVideoType(template.id as any)}
                        className={cn(
                          "relative p-4 rounded-xl border text-left transition-all group hover:shadow-md",
                          videoType === template.id 
                            ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600" 
                            : "border-slate-200 hover:border-indigo-300 bg-white"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className={cn(
                            "p-2 rounded-lg",
                            videoType === template.id ? "bg-indigo-200 text-indigo-700" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                          )}>
                            <template.icon className="w-5 h-5" />
                          </div>
                          {template.isPro ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-1 rounded-full">
                              <Lock className="w-3 h-3" /> Pro
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Free
                            </span>
                          )}
                        </div>
                        <h4 className={cn(
                          "font-semibold text-sm mb-1",
                          videoType === template.id ? "text-indigo-900" : "text-slate-900"
                        )}>
                          {template.name}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {template.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateVideo}
                  disabled={!videoSource || isGenerating}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all",
                    !videoSource || isGenerating 
                      ? "bg-slate-300 cursor-not-allowed" 
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Video...
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      Generate Video
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Pro Tip */}
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-indigo-900 text-sm mb-1">Pro Tip</h4>
              <p className="text-indigo-700 text-xs leading-relaxed">
                {activeTab === 'text' 
                  ? "Try being specific about your target audience in the topic field for better engagement rates."
                  : "Paste a URL to a long-form article to automatically create a 30-second teaser video for social media."}
              </p>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'text' ? (
                result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden h-full flex flex-col"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-center relative">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-medium text-slate-600">AI Generated • {platform.name}</span>
                      </div>
                      <div className="absolute right-4 flex items-center gap-2">
                        <button 
                          onClick={copyToClipboard}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-indigo-600"
                          title="Copy to clipboard"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => {
                            const newPost = {
                              id: Date.now().toString(),
                              title: topic || 'New Post',
                              content: result,
                              platform: platform.name,
                              time: new Date(Date.now() + 86400000), // Schedule for tomorrow
                              status: 'scheduled' as const
                            };
                            addPost(newPost);
                            // Visual feedback
                            const btn = document.activeElement as HTMLButtonElement;
                            if (btn) {
                              const originalColor = btn.style.color;
                              btn.style.color = '#16a34a'; // green-600
                              setTimeout(() => {
                                btn.style.color = originalColor;
                              }, 1000);
                            }
                          }}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-indigo-600" 
                          title="Schedule post"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 flex-1 overflow-auto whitespace-pre-wrap font-medium text-slate-700 leading-relaxed">
                      {result}
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 flex justify-between">
                      <span>{result.length} characters</span>
                      <span>Estimated read time: {Math.ceil(result.split(' ').length / 200)} min</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-8 text-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="font-semibold text-slate-600 mb-2">Ready to create?</h3>
                    <p className="text-sm max-w-xs">Enter your topic on the left and watch our AI craft the perfect post for you.</p>
                  </motion.div>
                )
              ) : (
                videoResult ? (
                  <motion.div
                    key="video-result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden h-full flex flex-col"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-center relative">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-medium text-slate-600">Video Generated • {getVideoTypeName(videoType)}</span>
                      </div>
                      <div className="absolute right-4 flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const newPost = {
                              id: Date.now().toString(),
                              title: `Video: ${getVideoTypeName(videoType)}`,
                              content: videoSource.substring(0, 100) + '...',
                              platform: 'Instagram', // Default to Instagram for video
                              time: new Date(Date.now() + 86400000), // Schedule for tomorrow
                              status: 'scheduled' as const,
                              videoUrl: videoResult
                            };
                            addPost(newPost);
                            setResult("Video scheduled for tomorrow!");
                            setTimeout(() => setResult(""), 3000);
                          }}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-indigo-600" 
                          title="Schedule video"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 bg-black flex items-center justify-center relative group cursor-pointer">
                      <video 
                        src={videoResult} 
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 flex justify-between">
                      <span>Duration: 0:15</span>
                      <span>Resolution: 1080p</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="video-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-8 text-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                      <Video className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="font-semibold text-slate-600 mb-2">AI Video Studio</h3>
                    <p className="text-sm max-w-xs">Paste a blog URL to generate a video summary or trailer automatically.</p>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          {/* History List */}
          {history.length > 0 && activeTab === 'text' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Generations</h3>
              <div className="space-y-3">
                {history.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100" onClick={() => setResult(item.content)}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-indigo-600">{item.platform}</span>
                      <span className="text-[10px] text-slate-400">{item.date.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
