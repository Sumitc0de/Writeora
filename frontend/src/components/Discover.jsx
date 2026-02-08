import React, { useState, useEffect } from "react";
import { Search, Loader, Filter, Sparkles } from "lucide-react";
import ContentCard from "./ContentCard";
import { usePosts } from "../context/PostContext";
import { getPostByCategory } from "../service/postService";
import Button from "./Button";
import FeaturedHero from "./FeaturedHero";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "AI", "Tech", "Finance", "Design", "Marketing"];
const POSTS_PER_PAGE = 9;
const STORAGE_KEY = "discover_visible_count_by_category";

export default function DiscoverSection() {
  const { posts, loading } = usePosts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false); // Mobile toggle

  const [visibleCount, setVisibleCount] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved["All"] || POSTS_PER_PAGE;
  });

  const basePosts = selectedCategory === "All" ? posts : categoryPosts;

  const filteredPosts = basePosts.filter((post) =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    saved[selectedCategory] = visibleCount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [visibleCount, selectedCategory]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    setVisibleCount(saved[category] || POSTS_PER_PAGE);

    if (category === "All") {
      setCategoryPosts([]);
      return;
    }

    const normalized = category.toLowerCase();

    // 🔍 Try to find posts locally first (fuzzy match)
    const localFiltered = posts.filter(
      (p) => p.category?.toLowerCase().includes(normalized)
    );

    if (localFiltered.length > 0) {
      setCategoryPosts(localFiltered);
      // We still fetch from server to ensure we have the latest or if there are more not loaded
      // but showing local results immediately makes it feel instant.
    }

    try {
      const res = await getPostByCategory(normalized);
      if (res?.posts?.length > 0) {
        setCategoryPosts(res.posts);
      } else if (localFiltered.length === 0) {
        setCategoryPosts([]);
      }
    } catch (err) {
      console.error("Filter error:", err);
      if (localFiltered.length === 0) setCategoryPosts([]);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 lg:px-20 pt-24 pb-20">

      {/* 🎬 Cinematic Featured Hero */}
      <FeaturedHero />

      {/* 🛠️ Floating Command Bar (Search & Filter) */}
      <div className="sticky top-20 z-[9999] mb-12">
        <div className="mx-auto max-w-4xl bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 md:items-center">

          {/* Search Input */}
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F5C542] transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or topics..."
              className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0 pl-12 py-3 h-12"
            />
          </div>

          <div className="w-px h-8 bg-white/10 hidden md:block" />

          {/* Category Pills (Desktop) */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === cat
                  ? "bg-[#F5C542] text-black shadow-lg scale-105"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="md:hidden flex items-center justify-center gap-2 bg-white/5 p-3 rounded-xl text-sm font-medium text-gray-300"
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Mobile Category Drawer */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#1A1A1A] border border-white/10 rounded-xl mt-2 p-4"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { handleCategoryClick(cat); setFilterOpen(false); }}
                    className={`px-3 py-2 rounded-lg text-sm ${selectedCategory === cat ? "bg-[#F5C542] text-black" : "bg-white/5 text-gray-400"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 📦 Masonry Grid Layout */}
      <div className="max-w-7xl mx-auto min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader className="w-8 h-8 animate-spin text-[#F5C542]" />
            <p className="text-gray-500 animate-pulse">Fetching intelligence...</p>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300">No results found</h3>
            <p className="text-gray-500 max-w-xs mt-2">
              Try adjusting your search terms or category filters.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post, idx) => (
                  <ContentCard key={post._id} {...post} idx={idx} />
                ))}
              </AnimatePresence>
            </motion.div>

            {(visibleCount < filteredPosts.length || visibleCount > POSTS_PER_PAGE) && (
              <div className="flex justify-center mt-16 gap-4">
                {visibleCount < filteredPosts.length && (
                  <Button
                    onClick={handleShowMore}
                    className="!bg-white/[0.05] !text-white !border !border-white/10 hover:!bg-white/10 !px-8 !py-3"
                  >
                    Load More Articles
                  </Button>
                )}
                {visibleCount > POSTS_PER_PAGE && (
                  <Button
                    onClick={() => setVisibleCount(POSTS_PER_PAGE)}
                    className="!bg-white/[0.03] !text-gray-400 !border !border-white/5 hover:!bg-white/10 hover:!text-white !px-8 !py-3"
                  >
                    Show Less
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
