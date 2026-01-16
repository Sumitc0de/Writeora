import React, { useState, useEffect } from "react";
import { Search, Loader, ChevronLeft, ChevronRight } from "lucide-react";
import ContentCard from "./ContentCard";
import { usePosts } from "../context/PostContext";
import { getPostByCategory } from "../service/postService";
import Button from "./Button";

const categories = ["All", "AI", "Tech", "Finance", "Design", "Marketing"];
const POSTS_PER_PAGE = 9;
const STORAGE_KEY = "discover_visible_count";

export default function DiscoverSection() {
  const { posts, loading } = usePosts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : POSTS_PER_PAGE;
  });



  /* ---------------- FILTER LOGIC ---------------- */
  const filteredPosts =
    selectedCategory === "All" ? posts : categoryPosts;

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, visibleCount);
  }, [visibleCount]);


  /* ---------------- CATEGORY HANDLER ---------------- */
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
setVisibleCount(POSTS_PER_PAGE);
localStorage.setItem(STORAGE_KEY, POSTS_PER_PAGE);


    if (category === "All") {
      setCategoryPosts([]);
      return;
    }

    const normalized = category.toLowerCase();
    const localFiltered = posts.filter(
      (p) => p.category?.toLowerCase() === normalized
    );

    if (localFiltered.length > 0) {
      setCategoryPosts(localFiltered);
      return;
    }

    try {
      const res = await getPostByCategory(normalized);
      setCategoryPosts(res.posts || []);
    } catch {
      setCategoryPosts([]);
    }
  };

  /* ---------------- SHOW MORE ---------------- */
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };
  return (
    <div className="w-full min-h-screen bg-[#0C0A07] text-white px-4 sm:px-6 lg:px-28 lg:mt-16 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-24 h-fit">
          <h2 className="text-lg font-semibold">🔍 Discover</h2>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full bg-[#1C1813] rounded-xl pl-10 py-2.5"
            />
          </div>

          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-3">
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2.5 rounded-lg transition ${selectedCategory === cat
                      ? "bg-yellow-500 text-black"
                      : "bg-[#1C1813] hover:bg-yellow-600 hover:text-black"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ---------------- CONTENT ---------------- */}
        <section className="flex flex-col gap-6">

          {/* MOBILE CATEGORY */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-[#1C1813]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* HEADER */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-500">
              ✍️ Discover Writes
            </h1>
            <p className="text-gray-400">
              Exploring{" "}
              <span className="text-yellow-400">{selectedCategory}</span>
            </p>
          </div>

          {/* CONTENT STATES */}
          {loading ? (
            <div className="h-[60vh] flex justify-center items-center">
              <Loader className="w-8 h-8 animate-spin text-yellow-500" />
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="h-[60vh] flex justify-center items-center text-gray-400">
              📭 No posts found
            </div>
          ) : (
            <>
              {/* POSTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visiblePosts.map((post) => (
                  <ContentCard key={post._id} {...post} />
                ))}
              </div>

              {/* SHOW MORE */}
              {visibleCount < filteredPosts.length && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleShowMore}
                    className="px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}