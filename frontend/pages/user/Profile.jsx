import React, { useState, useEffect } from 'react';
import { Search, Bell, Heart, MessageCircle, Bookmark, MoreHorizontal, UserCheck, MapPin, Link as LinkIcon, Calendar, Loader } from 'lucide-react';
import Background from "../../src/components/Background";
import { motion } from "framer-motion";
import { usePosts } from "../../src/context/PostContext";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Stories');
  const { posts, loading } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter posts by current logged-in user
  const userPosts = posts.filter(post => post.author?._id === user?._id || post.author?.name === user?.name);

  // Calculate stats
  const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 relative overflow-hidden">
      <Background />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Banner */}
        <div className="h-48 md:h-64 rounded-t-3xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] relative overflow-hidden border-x border-t border-white/[0.05]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-[#0F0D0A]/80 backdrop-blur-xl border border-white/[0.08] rounded-b-3xl p-6 md:p-10 -mt-1 shadow-2xl mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* Avatar */}
            <div className="-mt-20 md:-mt-24">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#050505] bg-[#1A1A1A] overflow-hidden shadow-2xl relative group">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                    {user?.name || "User"}
                    <span className="w-5 h-5 bg-[#F5C542] rounded-full flex items-center justify-center text-black text-[10px]" title="Member">✔</span>
                  </h1>
                  <p className="text-[#F5C542] font-medium">{user?.role || "Content Creator"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/settings')}
                    className="px-5 py-2 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">
                {user?.bio || "Welcome to my profile! I'm passionate about sharing knowledge and insights."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2"><MapPin size={16} /> {user?.location || "Remote"}</span>
                {user?.website && <span className="flex items-center gap-2"><LinkIcon size={16} className="text-[#F5C542]" /> <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{user.website}</a></span>}
                <span className="flex items-center gap-2"><Calendar size={16} /> Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mt-8 border border-white/5">
            {[
              { label: 'Posts', value: userPosts.length },
              { label: 'Total Likes', value: totalLikes },
              { label: 'Total Views', value: totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews }
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1A1A1A]/50 p-4 text-center hover:bg-white/[0.05] transition-colors cursor-default">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex items-center gap-8 border-b border-white/10 mb-8 px-2">
          {['Stories', 'About', 'Saved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? "text-[#F5C542]" : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F5C542]" />
              )}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader className="w-8 h-8 animate-spin text-[#F5C542]" />
            <p className="text-gray-500 animate-pulse">Loading your stories...</p>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300">No stories yet</h3>
            <p className="text-gray-500 max-w-xs mt-2 mb-6">
              Start writing to share your thoughts with the world.
            </p>
            <button
              onClick={() => navigate('/create/write')}
              className="px-6 py-3 bg-[#F5C542] text-black rounded-lg font-bold hover:bg-[#ffdb75] transition-colors"
            >
              Start Writing
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userPosts.map((story) => (
              <motion.article
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-[#1A1A1A]/40 border border-white/5 rounded-2xl p-6 hover:border-[#F5C542]/30 transition-all flex flex-col md:flex-row gap-6 cursor-pointer"
                onClick={() => navigate(`/post/${story.slug}`)}
              >
                <div className="flex-1 order-2 md:order-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span className="px-2 py-1 rounded bg-white/5 text-[#F5C542] font-semibold">{story.category || "General"}</span>
                    <span className="text-gray-500">{story.readingTime || 5} min read</span>
                    <span className="text-gray-500">{new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#F5C542] transition-colors leading-tight">
                    {story.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6 line-clamp-2">
                    {story.subtitle || story.description || ""}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm group-hover:text-red-400 transition-colors">
                        <Heart size={16} /> {story.likes || 0}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm group-hover:text-blue-400 transition-colors">
                        <MessageCircle size={16} /> {story.comments?.length || 0}
                      </div>
                    </div>
                    <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark size={18} className="hover:text-[#F5C542]" />
                    </div>
                  </div>
                </div>

                {story.headerImage?.url && (
                  <div className="w-full md:w-64 h-48 md:h-auto order-1 md:order-2 rounded-xl overflow-hidden relative">
                    <img
                      src={story.headerImage.url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;