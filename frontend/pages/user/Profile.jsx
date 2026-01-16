import React, { useState } from 'react';
import { Search, Bell, Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';

/**
 * --- Theme Constants ---
 * Preserving the specific color palette from the provided HTML
 */
const COLORS = {
  bg: '#0C0A07',
  headerBorder: '#393628',
  inputBg: '#393628',
  accentYellow: '#F0B100',
  accentYellowDim: '#D4AF37',
  textSecondary: '#bab59c',
  textMuted: '#E5E1C8',
  cardBg: '#2a281e',
  tabBorder: '#54503b'
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Stories');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Post Data
  const stories = [
    {
      id: 1,
      date: 'Oct 15',
      readTime: '5 min read',
      title: 'The 5 Best Programming Languages to Learn in 2023',
      excerpt: 'A comprehensive guide to the top programming languages for aspiring developers.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      date: 'Sep 22',
      readTime: '7 min read',
      title: 'How to Build a Successful Software Engineering Career',
      excerpt: 'Tips and strategies for building a thriving career in software engineering.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      date: 'Aug 10',
      readTime: '4 min read',
      title: 'The Future of AI in Software Development',
      excerpt: 'Exploring the impact of artificial intelligence on the software development industry.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 4,
      date: 'Jul 5',
      readTime: '6 min read',
      title: 'Mastering Data Structures and Algorithms',
      excerpt: 'A guide to mastering essential data structures and algorithms for software engineers.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col text-white antialiased"
      style={{ backgroundColor: COLORS.bg, fontFamily: '"Be Vietnam Pro", sans-serif' }}
    >
 
        
        
    
      {/* --- Profile Layout --- */}
      <main className="flex-1 max-w-[960px] mx-auto w-full mt-16 px-4 md:px-10 py-10">
        
        {/* User Bio Section */}
        <section className="flex flex-col items-center mb-8">
          <div 
            className="size-32 rounded-full border-4 border-[#FFD700] bg-cover bg-center shadow-2xl mb-6"
            style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan")' }}
          />
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight mb-1">Ethan Bennett</h1>
            <p className="text-[#FFD700] font-bold text-lg ">Software Engineer</p>
          </div>
          <p className="mt-4 text-center text-[#E5E1C8] leading-relaxed max-w-lg">
            Software engineer at Google. I write about software development, career, and life. 
            Passionate about clean code and mentorship.
          </p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: 'Stories', value: '100' },
            { label: 'Followers', value: '1.2K' },
            { label: 'Following', value: '500' }
          ].map((stat) => (
            <div key={stat.label} className="bg-[#2a281e] border border-[#D4AF37] rounded-xl p-4 flex flex-col items-center justify-center transition-transform hover:scale-[1.02]">
              <span className="text-2xl font-black text-[#FFD700]">{stat.value}</span>
              <span className="text-xs font-medium text-[#E5E1C8] uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Tabs */}
        <nav className="flex border-b border-[#54503b] mb-8">
          {['Stories', 'About'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold tracking-wide transition-all border-b-2 ${
                activeTab === tab 
                  ? 'border-[#FFD700] text-[#FFD700]' 
                  : 'border-transparent text-[#bab59c] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1.5 bg-[#FFD700] rounded-full" />
            <h3 className="text-xl font-black tracking-tight uppercase text-sm tracking-[0.2em]">Latest Stories</h3>
          </div>

          <div className="space-y-10">
            {stories.map((story) => (
              <article key={story.id} className="group flex flex-col md:flex-row gap-6 cursor-pointer">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      {story.date} · {story.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#FFD700] transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-[#bab59c] text-sm leading-relaxed mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-[#bab59c]">
                      <button className="hover:text-white transition-colors"><Heart size={18} /></button>
                      <button className="hover:text-white transition-colors"><MessageCircle size={18} /></button>
                    </div>
                    <div className="flex items-center gap-4 text-[#bab59c]">
                      <button className="hover:text-white transition-colors"><Bookmark size={18} /></button>
                      <button className="hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                  </div>
                </div>
                <div 
                  className="w-full md:w-48 aspect-video md:aspect-square bg-cover bg-center rounded-xl shadow-lg group-hover:shadow-[#FFD700]/5 transition-all"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-[#393628] py-10 mt-20 text-center">
        <p className="text-[#bab59c] text-sm">© 2023 Stitch Design x Medium. All rights reserved.</p>
      </footer>
    </div>
  );
};



export default Profile;