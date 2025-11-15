import React, { useState, useEffect } from "react";
import { Search, Loader } from "lucide-react";
import ContentCard from "./ContentCard";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { getPostByCategory } from "../service/postService";

const categories = [
  "All",
  "AI",
  "Tech",
  "Finance",
  "Design",
  "Marketing",
];

const POSTS_PER_PAGE = 9;

export default function DiscoverSection() {
  const navigate = useNavigate();
  const { posts, loading } = usePosts();
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryPosts, setCategoryPosts] = useState([]);


  // Filter posts by category
const filteredPosts = selectedCategory === "All"
  ? posts
  : categoryPosts;


  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

  // Load saved preferences
  useEffect(() => {
    const saved = sessionStorage.getItem("visiblePosts");
    if (saved) {
      setVisibleCount(Number(saved));
    }
  }, []);

  // Handle Show More
  const handleShowMore = () => {
    const newCount = visibleCount + POSTS_PER_PAGE;
    setVisibleCount(newCount);
    sessionStorage.setItem("visiblePosts", newCount);

    // Smooth scroll to new cards
    setTimeout(() => {
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 100);
  };

  // Handle Show Less
  const handleShowLess = () => {
    setVisibleCount(POSTS_PER_PAGE);
    sessionStorage.setItem("visiblePosts", POSTS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle category filter
  const handleCategoryClick = async (category) => {
  setSelectedCategory(category);
  setVisibleCount(POSTS_PER_PAGE);
  sessionStorage.setItem("selectedCategory", category);

  // If user selects "All", reset results
  if (category === "All") {
    setCategoryPosts([]);
    return;
  }

  // Get category posts
  try {
    const res = await getPostByCategory(category);
    setCategoryPosts(res.posts || []);
  } catch (err) {
    console.log("Category fetch error:", err);
    setCategoryPosts([]); // fallback
  }
};

  return (
    <div className="w-full min-h-screen mt-15 bg-[#130F0B] text-white flex px-4 md:px-28  gap-6 md:gap-10 py-8">

      {/* Left Sidebar */}
      <aside className="hidden md:flex md:w-1/5 flex-col gap-6 sticky top-20 h-fit">
        <h2 className="text-lg font-semibold tracking-wide">🔍 Discover</h2>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full bg-[#1C1813] text-gray-200 placeholder-gray-500 rounded-xl pl-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3 font-semibold">
            Categories
          </h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${selectedCategory === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-[#1C1813] text-gray-200 hover:bg-yellow-600 hover:text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3 font-semibold">
            Sort By
          </h3>
          <div className="flex flex-col gap-2">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-[#1C1813] text-gray-200 hover:bg-yellow-600 hover:text-black transition-all duration-200">
              ⭐ Top Reads
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-[#1C1813] text-gray-200 hover:bg-yellow-600 hover:text-black transition-all duration-200">
              🕐 Latest
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-[#1C1813] text-gray-200 hover:bg-yellow-600 hover:text-black transition-all duration-200">
              🔥 Trending
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 p-4 bg-[#1C1813] rounded-lg border border-[#2A2520]">
          <p className="text-sm text-gray-400">
            Showing <span className="text-yellow-500 font-semibold">{visiblePosts.length}</span> of{" "}
            <span className="text-yellow-500 font-semibold">{filteredPosts.length}</span> posts
          </p>
        </div>
      </aside>

      {/* Right Content Area */}
      <section className="w-full md:w-4/5 flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between w-full h-fit">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
              ✍️ Discover Stories
            </h1>
            <p className="text-gray-400">
              Explore articles in <span className="text-yellow-400">{selectedCategory}</span>
            </p>
          </div>
          {/* <p className="text-gray-400 text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Explore hand-picked articles across AI, business, design, tech, marketing, and more —
            crafted to help you think sharper, learn faster, and stay ahead.
          </p> */}
        </div>


        {/* Loading State */}
        {loading ? (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader className="w-8 h-8 text-yellow-500 animate-spin" />
              <p className="text-gray-400">Loading amazing stories...</p>
            </div>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="w-full h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl text-gray-400 mb-2">📭 No posts found</p>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {visiblePosts.map((post) => (
                <ContentCard
                  key={post._id}
                  {...post}
                />
              ))}
            </div>

            {/* Show More / Show Less Buttons */}
            <div className="w-full flex justify-center gap-4 mt-8 pb-8">
              {hasMorePosts ? (
                <button
                  onClick={handleShowMore}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
                >
                  📖 Show More ({filteredPosts.length - visibleCount} remaining)
                </button>
              ) : visibleCount > POSTS_PER_PAGE ? (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  ⬆️ Show Less
                </button>
              ) : null}
            </div>

            {/* Posts Summary */}
            {!hasMorePosts && visibleCount > POSTS_PER_PAGE && (
              <p className="text-center text-gray-400 text-sm pb-4">
                You've reached the end! Showing all {filteredPosts.length} posts.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}