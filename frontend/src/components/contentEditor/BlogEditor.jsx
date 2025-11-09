import React, { useState, useRef, useEffect } from "react";
import TemplateSelector from "./TemplateSelector";
import Toolbar from "./Toolbar";
import EditorArea from "./EditorArea";
import AITools from "./AITools";
import LivePreview from "./LivePreview";
import { FilePlus, Upload } from "lucide-react";
import { createPost } from "../../service/postService"; // ✅ backend connection
import { useAuth } from "../../context/AuthContext"; // ✅ get user token

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [content, setContent] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [template, setTemplate] = useState("");
  const editorRef = useRef(null);

  const { user } = useAuth(); // ✅ access logged-in user token

  // Prevent cursor jump on Enter
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        document.execCommand("insertHTML", false, "<br><br>");
        e.preventDefault();
      }
    };
    editor.addEventListener("keydown", handleEnter);
    return () => editor.removeEventListener("keydown", handleEnter);
  }, []);

  // ✅ Auto-load local draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("draft");
    if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      setTitle(parsed.title || "");
      setSubtitle(parsed.subtitle || "");
      setCategory(parsed.category || "");
      setContent(parsed.content || "");
      setHeaderImage(parsed.headerImage || "");
    }
  }, []);

  // ✅ Save as Draft (localStorage)
  const handleDraft = () => {
    const draft = { title, subtitle, category, content, headerImage };
    localStorage.setItem("draft", JSON.stringify(draft));
    alert("💾 Draft saved locally!");
  };

  // ✅ Publish Post (to backend)
  const handlePublish = async () => {
    if (!title || !content) {
      alert("⚠️ Please add a title and content before publishing!");
      return;
    }

    const postData = {
      title,
      subtitle,
      category,
      content,
      hashtags: [],
      contentImage: headerImage,
    };

    try {
      const token = user?.token;
      const createdPost = await createPost(postData, token);

      alert("🚀 Article published successfully!");
      console.log("Created Post:", createdPost);

      // Reset form
      setTitle("");
      setSubtitle("");
      setCategory("");
      setHeaderImage("");
      setContent("");
      localStorage.removeItem("draft");
    } catch (error) {
      console.error("Publish Error:", error);
      alert("❌ Failed to publish post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-[#130F0B] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <TemplateSelector
          template={template}
          setTemplate={setTemplate}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          setCategory={setCategory}
          setContent={setContent}
        />

        {/* ===== Header Image ===== */}
        <div className="relative">
          {headerImage ? (
            <img
              src={headerImage}
              alt="Header"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-[#241F1A] rounded-2xl border border-[#2A2520] text-gray-500">
              🖼 Header Image Preview
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setHeaderImage(reader.result);
                reader.readAsDataURL(file);
              }
            }}
            id="headerImageInput"
            className="hidden"
          />

          {/* Upload Button */}
          <label
            htmlFor="headerImageInput"
            className="absolute bottom-3 left-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-4 py-1 rounded-md text-sm cursor-pointer transition-all duration-300 shadow-md hover:shadow-yellow-600/40"
          >
            Upload Header Image
          </label>
        </div>

        {/* ===== Title / Subtitle / Category ===== */}
        <div>
          <input
            type="text"
            className="w-full bg-transparent text-4xl font-bold mb-2 outline-none border-b border-gray-700 placeholder-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title..."
          />
          <input
            type="text"
            className="w-full bg-transparent text-lg mb-2 outline-none border-b border-gray-700 placeholder-gray-600"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle (short and catchy)..."
          />
          <input
            type="text"
            className="bg-[#241F1A] px-3 py-2 rounded-md text-sm outline-none w-60 placeholder-gray-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (e.g., AI / Productivity)"
          />
        </div>

        <Toolbar editorRef={editorRef} />

        <EditorArea
          editorRef={editorRef}
          content={content}
          setContent={setContent}
        />

        <AITools
          aiLoading={aiLoading}
          setAiLoading={setAiLoading}
          content={content}
          setContent={setContent}
        />

        {/* ===== Action Buttons ===== */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleDraft}
            className="flex items-center gap-2 px-5 py-2 bg-yellow-600 border border-[#2A2520] rounded-lg hover:bg-yellow-800"
          >
            <FilePlus size={18} /> Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Upload size={18} /> Publish
          </button>
        </div>

        <LivePreview
          headerImage={headerImage}
          title={title}
          subtitle={subtitle}
          category={category}
          content={content}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
