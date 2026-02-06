import React, { useState, useEffect, useCallback } from 'react';
import { UserCheck, MapPin, Link as LinkIcon, Calendar, Loader, Sparkles, LayoutGrid, BookmarkCheck, Heart, Eye, FileText, ArrowRight } from 'lucide-react';
import Background from "../../src/components/Background";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getUserSavedPosts, getUserStats, getUserStatsById } from "../../src/service/postEngagement";
import { getAllPosts } from "../../src/service/postService";
import { getPublicProfile } from "../../src/service/userService";
import ContentCard from "../../src/components/ContentCard";

const Profile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('My Posts');
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [stats, setStats] = useState({ totalPosts: 0, totalLikes: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || userId === currentUser?._id;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const targetUserId = userId || currentUser?._id;

      const fetchProfile = isOwnProfile
        ? Promise.resolve({ user: currentUser })
        : getPublicProfile(userId);

      const fetchStats = isOwnProfile
        ? getUserStats()
        : getUserStatsById(userId);

      const [profileRes, allPostsRes, statsRes, savedRes] = await Promise.all([
        fetchProfile,
        getAllPosts(),
        fetchStats,
        isOwnProfile ? getUserSavedPosts() : Promise.resolve({ data: { posts: [] } })
      ]);

      setProfileUser(profileRes.user);

      // Filter posts by the target user ID
      const targetPosts = (allPostsRes.posts || allPostsRes).filter(p => p.author?._id === targetUserId);

      setPosts(targetPosts);
      setSavedPosts(savedRes.data?.posts || []);
      setStats(statsRes.data?.stats || { totalPosts: 0, totalLikes: 0, totalViews: 0 });
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser, isOwnProfile]);

  useEffect(() => {
    if (currentUser?._id || userId) fetchData();
  }, [userId, currentUser?._id, fetchData]);

  const displayedPosts = activeTab === 'My Posts' ? posts : savedPosts;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-[#F5C542] animate-spin" />
          <p className="text-gray-500 animate-pulse font-medium">Synchronizing Profile...</p>
        </div>
      </div>
    );
  }

  const tabs = isOwnProfile
    ? [{ id: 'My Posts', icon: LayoutGrid }, { id: 'Saved Posts', icon: BookmarkCheck }]
    : [{ id: 'My Posts', icon: LayoutGrid }];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 relative selection:bg-[#F5C542] selection:text-black">
      <Background />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ✨ Profile Header & Banner */}
        <div className="relative mb-12">
          <div className="h-64 rounded-[2rem] bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#1A1A1A] border border-white/5 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505]/80 to-transparent" />
          </div>

          <div className="absolute -bottom-8 left-10 flex flex-col md:flex-row items-end gap-6 w-[calc(100%-80px)]">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#050505] bg-[#1A1A1A] overflow-hidden shadow-2xl relative">
                <img
                  src={profileUser?.avatar?.url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F5C542] rounded-xl flex items-center justify-center border-4 border-[#050505] shadow-lg">
                <Sparkles size={14} fill="black" />
              </div>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
                    {profileUser?.name}
                    <UserCheck className="text-[#F5C542]" size={24} />
                  </h1>
                  <p className="text-[#F5C542] font-black uppercase tracking-[0.2em] text-xs opacity-80 mb-4">
                    {profileUser?.role || "Verified Creator"}
                  </p>
                </div>
                {isOwnProfile && (
                  <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/settings')} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:border-[#F5C542]/30 transition-all">
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              <p className="text-gray-400  leading-relaxed max-w-xl  text-sm italic">
                "{profileUser?.bio || "Crafting digital stories and exploring the boundaries of creativity."}"
              </p>
            </div>
          </div>
        </div>

        {/* 📊 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-20 md:mt-12">
          {[
            { label: isOwnProfile ? 'Published Stories' : 'Stories Published', value: stats.totalPosts || 0, icon: FileText, color: 'text-blue-400' },
            { label: 'Reader Appreciation', value: stats.totalLikes || 0, icon: Heart, color: 'text-red-400' },
            { label: 'Total Engagement', value: (stats.totalViews || 0) > 1000 ? `${((stats.totalViews || 0) / 1000).toFixed(1)}K` : (stats.totalViews || 0), icon: Eye, color: 'text-[#F5C542]' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A1A1A]/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md group hover:border-[#F5C542]/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 📚 Navigation & Filtering */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-8 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? "text-[#F5C542]" : "text-gray-500 hover:text-white"
                  }`}
              >
                <tab.icon size={14} />
                {tab.id}
                {activeTab === tab.id && (
                  <motion.div layoutId="profileTab" className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#F5C542]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 🖼️ Projects Display */}
        <AnimatePresence mode="wait">
          {displayedPosts.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedPosts.map((post, idx) => (
                <ContentCard key={post._id} {...post} idx={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6">
                <FileText size={32} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-black text-gray-300 mb-2">Workspace Empty</h3>
              <p className="text-gray-500 max-w-xs mb-8">
                {activeTab === 'My Posts'
                  ? (isOwnProfile ? "You haven't published any insights yet." : `${profileUser?.name} hasn't published any stories yet.`)
                  : "You haven't bookmarked any articles yet."}
              </p>
              {isOwnProfile && (
                activeTab === 'My Posts' ? (
                  <button
                    onClick={() => navigate('/create')}
                    className="px-8 py-3 bg-[#F5C542] text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#ffdb75] transition-all flex items-center gap-2 group"
                  >
                    Create Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/discover')}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#F5C542] transition-all"
                  >
                    Explore Content
                  </button>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;
