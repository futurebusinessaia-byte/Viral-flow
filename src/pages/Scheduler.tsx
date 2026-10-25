import React, { useState, useRef } from 'react';
import { Calendar as CalendarIcon, Clock, MoreHorizontal, Plus, Bot, Video, X, Upload, Image as ImageIcon } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { Reorder } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

export default function Scheduler() {
  const { scheduledPosts, addPost, updatePost } = useApp();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'published'>('all');
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // New Post Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostType, setNewPostType] = useState<'text' | 'video'>('text');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPlatform, setNewPostPlatform] = useState('Twitter');
  const [newPostDate, setNewPostDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [newPostTime, setNewPostTime] = useState('12:00');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePost = () => {
    if (!newPostTitle) return;
    
    const scheduledTime = new Date(`${newPostDate}T${newPostTime}`);
    
    addPost({
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      platform: newPostPlatform,
      time: scheduledTime,
      status: 'scheduled',
      videoUrl: newPostType === 'video' ? 'https://example.com/video.mp4' : undefined, // Mock video URL
      thumbnail: thumbnail || undefined
    });

    setIsModalOpen(false);
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setThumbnail(null);
    setNewPostType('text');
  };

  const handleReorder = (newOrder: any[]) => {
    if (!draggedItemId) return;

    const draggedIndex = newOrder.findIndex(p => p.id === draggedItemId);
    if (draggedIndex === -1) return;

    const draggedPost = newOrder[draggedIndex];
    const prevPost = newOrder[draggedIndex - 1];
    const nextPost = newOrder[draggedIndex + 1];

    let newTime = new Date(draggedPost.time);
    let shouldUpdate = false;

    if (prevPost && newTime <= new Date(prevPost.time)) {
      if (nextPost) {
        newTime = new Date((new Date(prevPost.time).getTime() + new Date(nextPost.time).getTime()) / 2);
      } else {
        newTime = new Date(new Date(prevPost.time).getTime() + 60 * 60 * 1000); // +1 hour
      }
      shouldUpdate = true;
    } else if (nextPost && newTime >= new Date(nextPost.time)) {
      if (prevPost) {
        newTime = new Date((new Date(prevPost.time).getTime() + new Date(nextPost.time).getTime()) / 2);
      } else {
        newTime = new Date(new Date(nextPost.time).getTime() - 60 * 60 * 1000); // -1 hour
      }
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      updatePost({ ...draggedPost, time: newTime });
    }
  };

  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const filteredPosts = scheduledPosts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const sortedFilteredPosts = [...filteredPosts].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Calendar</h1>
          <p className="text-slate-500">Manage and schedule your upcoming posts.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {(['all', 'scheduled', 'published'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                  filter === option ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {option === 'all' ? 'All' : option}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200">
          {weekDays.map((day, i) => (
            <div key={i} className="p-4 text-center border-r border-slate-200 last:border-r-0">
              <div className="text-xs font-medium text-slate-500 uppercase mb-1">{format(day, 'EEE')}</div>
              <div className={`text-lg font-bold ${format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'text-indigo-600' : 'text-slate-900'}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 min-h-[500px]">
          {weekDays.map((day, i) => {
            const dayPosts = filteredPosts.filter(post => isSameDay(new Date(post.time), day));
            
            return (
              <div key={i} className="border-r border-slate-200 last:border-r-0 p-2 space-y-2">
                {dayPosts.map((post) => (
                  <div key={post.id} className={`border p-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow group relative ${
                    post.status === 'published' 
                      ? 'bg-green-50 border-green-100' 
                      : 'bg-indigo-50 border-indigo-100'
                  }`}>
                    <div className={`text-xs font-semibold mb-1 flex items-center justify-between ${
                      post.status === 'published' ? 'text-green-700' : 'text-indigo-700'
                    }`}>
                      <div className="flex items-center gap-1">
                        {post.platform}
                        {post.videoUrl && <Video className="w-3 h-3 ml-1" />}
                      </div>
                      {/* Show bot icon if it's an auto-generated post (simple heuristic: created recently) */}
                      {parseInt(post.id) > 1000 && <Bot className={`w-3 h-3 ${post.status === 'published' ? 'text-green-400' : 'text-indigo-400'}`} />}
                    </div>
                    <div className="text-xs text-slate-700 line-clamp-2">{post.title}</div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" /> {format(new Date(post.time), 'hh:mm a')}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-4">
          {filter === 'all' ? 'All Posts' : filter === 'scheduled' ? 'Scheduled Queue' : 'Published History'}
        </h3>
        <div className="space-y-4">
          {sortedFilteredPosts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No {filter === 'all' ? '' : filter} posts found.
            </div>
          ) : (
            <Reorder.Group axis="y" values={sortedFilteredPosts} onReorder={handleReorder} className="space-y-3">
              {sortedFilteredPosts.map((post) => (
                <Reorder.Item 
                  key={post.id} 
                  value={post}
                  dragListener={post.status === 'scheduled'}
                  onDragStart={() => setDraggedItemId(post.id)}
                  className="relative"
                >
                  <div className={cn(
                    "flex items-center justify-between p-4 rounded-xl transition-all group",
                    post.status === 'published' 
                      ? "bg-slate-50 opacity-75" 
                      : "bg-white border border-slate-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing"
                  )}>
                    <div className="flex items-center gap-4">
                      {post.thumbnail ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                          <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={cn(
                          "w-10 h-10 rounded-lg border flex items-center justify-center shrink-0",
                          post.status === 'published' 
                            ? 'bg-green-50 border-green-100 text-green-600' 
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        )}>
                          {post.videoUrl ? <Video className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                          {post.title}
                          {parseInt(post.id) > 1000 && (
                            <span className="bg-indigo-100 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <Bot className="w-3 h-3" /> Auto
                            </span>
                          )}
                          {post.status === 'published' && (
                            <span className="bg-green-100 text-green-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                              Published
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{post.platform}</span>
                          <span>•</span>
                          <span className={cn(
                            "font-medium",
                            post.status === 'published' ? "text-slate-500" : "text-indigo-600"
                          )}>
                            {format(new Date(post.time), 'MMM d, hh:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </div>
      {/* New Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Schedule New Post</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Type Selection */}
              <div className="flex gap-2 bg-slate-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setNewPostType('text')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                    newPostType === 'text' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  Text Post
                </button>
                <button
                  onClick={() => setNewPostType('video')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-1",
                    newPostType === 'video' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Video className="w-3 h-3" /> Video
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                <input
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Post title..."
                  className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Content</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your post content..."
                  className="w-full h-24 p-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {newPostType === 'video' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Video Thumbnail</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    {thumbnail ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                        <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-slate-700">Click to upload thumbnail</p>
                          <p className="text-[10px] text-slate-400">or select a frame from video</p>
                        </div>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                    />
                  </div>
                  
                  {/* Mock Frame Selection */}
                  {!thumbnail && (
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setThumbnail(`https://picsum.photos/seed/${i + 100}/300/200`);
                          }}
                          className="aspect-video rounded-md overflow-hidden border border-slate-200 hover:ring-2 hover:ring-indigo-500 transition-all"
                        >
                          <img src={`https://picsum.photos/seed/${i + 100}/300/200`} alt={`Frame ${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newPostDate}
                    onChange={(e) => setNewPostDate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newPostTime}
                    onChange={(e) => setNewPostTime(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSavePost}
                disabled={!newPostTitle}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
