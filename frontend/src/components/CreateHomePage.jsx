import React from "react";
import { Search, FileText, BookOpen, ClipboardList, GraduationCap } from "lucide-react";

const templates = [
  {
    title: "Article",
    icon: <FileText className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Blog",
    icon: <BookOpen className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Case Studies",
    icon: <ClipboardList className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Report",
    icon: <FileText className="w-8 h-8 text-yellow-600" />,
  },
  {
    title: "Learning Template",
    icon: <GraduationCap className="w-8 h-8 text-yellow-600" />,
  },
];

const CreateHomePage = () => {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center pt-20 pb-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Start creating your next big piece.
      </h1>

      {/* Search Section */}
      <div className="flex items-center w-full max-w-md mb-16">
        <input
          type="text"
          placeholder="Search or name your idea..."
          className=" bg-transparent border border-yellow-600 rounded-l-xl py-2 px-4 focus:outline-none text-white placeholder:text-gray-400"
        />
        <button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-4 py-2 rounded-r-xl transition-all duration-300">
          <Search className="w-4 h-4 inline mr-1" />
          Search
        </button>
      </div>

      {/* Template Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full justify-items-center">
        {templates.map((template, index) => (
          <div
            key={index}
            className="w-64 h-48 bg-yellow-900/20 border border-yellow-600 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-yellow-900/30 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {template.icon}
            <h2 className="text-xl font-semibold text-yellow-600">{template.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreateHomePage;
