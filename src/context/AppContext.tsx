import React, { createContext, useContext, useState, useEffect } from 'react';

export type Post = {
  id: string;
  title: string;
  content: string;
  platform: string;
  time: Date;
  status: 'scheduled' | 'published';
  videoUrl?: string;
  thumbnail?: string;
};

type AppContextType = {
  scheduledPosts: Post[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  isAutoPilot: boolean;
  setIsAutoPilot: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([
    { id: '1', title: 'Top 10 Coding Tips', content: '...', platform: 'Twitter', time: new Date(new Date().setHours(9, 0)), status: 'scheduled' },
    { id: '2', title: 'Remote Work Future', content: '...', platform: 'LinkedIn', time: new Date(new Date().setHours(14, 30)), status: 'scheduled' },
    { id: '3', title: 'Product Launch Teaser', content: '...', platform: 'Instagram', time: new Date(new Date().setHours(18, 0)), status: 'scheduled' },
  ]);
  const [isAutoPilot, setIsAutoPilot] = useState(false);

  const addPost = (post: Post) => {
    setScheduledPosts(prev => [post, ...prev]);
  };

  const updatePost = (updatedPost: Post) => {
    setScheduledPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  return (
    <AppContext.Provider value={{ scheduledPosts, addPost, updatePost, isAutoPilot, setIsAutoPilot }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
