import { useNavigate } from "react-router-dom";
import { PenLine, FileText, BookOpen } from "lucide-react";

export default function CreateContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-20 bg-[#0C0A07] text-white px-4 sm:px-6 lg:px-28 py-20">
      
      {/* HERO */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500">
          Start Writing on Writeora ✍️
        </h1>

        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          Turn your ideas into meaningful content.  
          Write blogs, articles, or learning notes — beautifully structured and distraction-free.
        </p>

        <button
          onClick={() => navigate("/create/write")}
          className="mt-8 px-8 py-4 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
        >
          Start Writing →
        </button>
      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <Card
          icon={<PenLine />}
          title="Blog Writing"
          desc="Share thoughts, stories, and experiences with the world."
        />
        <Card
          icon={<FileText />}
          title="Article Writing"
          desc="Write in-depth articles with proper structure and clarity."
        />
        <Card
          icon={<BookOpen />}
          title="Learning Notes"
          desc="Create tutorials, guides, and educational content."
        />
      </div>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-[#1C1813] rounded-2xl p-6 hover:scale-[1.02] transition">
      <div className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
