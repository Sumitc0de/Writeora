import React from "react";
import { Search, Sparkles } from "lucide-react";
import DiscoverSection from "../src/components/Discover";
import Button from "../src/components/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen w-full bg-[#130F0B] text-white flex lg:px-20 flex-col">

      {/* ================= HERO SECTION ================= */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6 mt-10 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-4">
          Turn Your Knowledge into Impact.
          <br />
          <span className="text-[#F5C542] text-3xl">
            Create, Learn & Grow with AI.
          </span>
        </h1>

        <Link to="/create">
          <Button className="relative px-8 py-3 rounded-xl font-semibold text-black bg-linear-to-r from-yellow-500 to-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:scale-105 transition-all duration-300">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.25),transparent_40%)] animate-pulse"></span>
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles />   Create Something Epic
            </span>
          </Button>
        </Link>




        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          Welcome back to{" "}
          <span className="text-[#F5C542] font-medium">Writeora</span> — your
          creative space where ideas become reality. Start writing, exploring,
          or learning with AI by your side.
        </p>

        {/* Quick Access Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-[#1C1813] hover:bg-[#241F1A] transition-all duration-300 p-6 rounded-2xl border border-[#2A2520]">
            <h3 className="text-xl font-semibold text-[#F5C542] mb-2">Create</h3>
            <p className="text-gray-400">
              Start writing articles, blogs, or reports powered by AI assistance.
            </p>
          </div>

          <div className="bg-[#1C1813] hover:bg-[#241F1A] transition-all duration-300 p-6 rounded-2xl border border-[#2A2520]">
            <h3 className="text-xl font-semibold text-[#F5C542] mb-2">Learn</h3>
            <p className="text-gray-400">
              Explore new techniques, trends, and case studies curated for you.
            </p>
          </div>

          <div className="bg-[#1C1813] hover:bg-[#241F1A] transition-all duration-300 p-6 rounded-2xl border border-[#2A2520]">
            <h3 className="text-xl font-semibold text-[#F5C542] mb-2">Grow</h3>
            <p className="text-gray-400">
              Build your content portfolio and showcase your AI-powered creativity.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DISCOVER SECTION ================= */}
      <DiscoverSection />
    </div>
  );
}

export default Home;
