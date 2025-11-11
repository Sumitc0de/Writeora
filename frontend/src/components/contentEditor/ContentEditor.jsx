import React, { useRef, useEffect, useState } from "react";
import TemplateSelector from "./TemplateSelector";
import Toolbar from "./Toolbar";
import EditorArea from "./EditorArea";
import HashtagSection from "./HashtagSection";
import AITools from "./AITools";
import LivePreview from "./LivePreview";
import { FilePlus, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { getAllPosts } from "../../service/postService";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";

const ContentEditor = () => {
  const { postData, setPostData, publishPost } = usePosts();
  const editorRef = useRef(null);
  const { user } = useAuth();

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState("");

  // ✅ Log all posts once (for debugging)
  useEffect(() => {
    const fetchAndLog = async () => {
      try {
        const posts = await getAllPosts();
        console.log("📦 All Posts from Backend:", posts);
      } catch (err) {
        console.error("❌ Failed to fetch posts:", err);
      }
    };
    fetchAndLog();
  }, []);

  // ✅ Load saved draft (if any)
  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setPostData((prev) => ({ ...prev, ...parsed }));
        console.log("💾 Draft loaded successfully");
      } catch (error) {
        console.error("Draft load error:", error);
      }
    }
  }, [setPostData]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Upload Header Image
  const handleHeaderUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPostData((prev) => ({ ...prev, headerImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Insert Image into Content
  const handleContentImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageTag = `\n<img src="${reader.result}" alt="content-image" style="max-width:100%; border-radius:10px; margin:10px 0;" />\n`;
      setPostData((prev) => ({
        ...prev,
        content: prev.content + imageTag,
        contentImage: [...(prev.contentImage || []), reader.result],
      }));
    };

    reader.readAsDataURL(file);
  };

  // ✅ Save draft locally
  const handleSaveDraft = () => {
    try {
      localStorage.setItem("draft", JSON.stringify(postData));
      setPublishSuccess("💾 Draft saved locally!");
      setTimeout(() => setPublishSuccess(""), 3000);
    } catch (err) {
      console.error("Draft save error:", err);
      setPublishError("Failed to save draft");
    }
  };

  // ✅ Publish Post
  const handlePublish = async () => {
    setPublishError("");
    setPublishSuccess("");
    setIsPublishing(true);

    try {
      await publishPost(postData); // pass current data
      setPublishSuccess("🚀 Post published successfully!");
      localStorage.removeItem("draft"); // clear draft after publishing
    } catch (err) {
      console.error("❌ Publish error:", err);
      setPublishError(
        err.response?.data?.message || "Failed to publish post. Try again."
      );
    } finally {
      setIsPublishing(false);
      setTimeout(() => {
        setPublishSuccess("");
        setPublishError("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-[#130F0B] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ✅ Alerts */}
        {publishSuccess && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg flex items-center gap-2">
            <CheckCircle2 size={18} />
            {publishSuccess}
          </div>
        )}
        {publishError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={18} />
            {publishError}
          </div>
        )}

        {/* ===== Template Selector ===== */}
        <TemplateSelector
          template={postData.template}
          setTemplate={(t) => setPostData((p) => ({ ...p, template: t }))}
          setTitle={(t) => setPostData((p) => ({ ...p, title: t }))}
          setSubtitle={(s) => setPostData((p) => ({ ...p, subtitle: s }))}
          setCategory={(c) => setPostData((p) => ({ ...p, category: c }))}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />

        {/* ===== Header Image Section ===== */}
        <div className="relative">
          {postData.headerImage ? (
            <img
              src={postData.headerImage}
              alt="Header"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-[#241F1A] rounded-2xl border border-[#2A2520] text-gray-500">
              🖼 Header Image Preview
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleHeaderUpload}
            id="headerImageInput"
            className="hidden"
          />

          <label
            htmlFor="headerImageInput"
            className="absolute bottom-3 left-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-4 py-1 rounded-md text-sm cursor-pointer transition-all duration-300 shadow-md hover:shadow-yellow-600/40"
          >
            Upload Header Image
          </label>
        </div>

        {/* ===== Post Inputs ===== */}
        <div>
          <input
            type="text"
            name="title"
            value={postData.title || ""}
            onChange={handleChange}
            placeholder="Your title..."
            className="w-full bg-transparent text-4xl font-bold mb-2 outline-none border-b border-gray-700 placeholder-gray-600"
          />
          <input
            type="text"
            name="subtitle"
            value={postData.subtitle || ""}
            onChange={handleChange}
            placeholder="Subtitle (short and catchy)..."
            className="w-full bg-transparent text-lg mb-2 outline-none border-b border-gray-700 placeholder-gray-600"
          />
          <input
            type="text"
            name="category"
            value={postData.category || ""}
            onChange={handleChange}
            placeholder="Category (e.g., AI / Productivity)"
            className="bg-[#241F1A] px-3 py-2 rounded-md text-sm outline-none w-60 placeholder-gray-500"
          />
        </div>

        {/* ===== Toolbar + Editor ===== */}
        <Toolbar
          editorRef={editorRef}
          onImageUpload={handleContentImageUpload}
        />
        <EditorArea
          editorRef={editorRef}
          content={postData.content || ""}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />

        {/* ===== AI Tools ===== */}
        <AITools
          aiLoading={false}
          setAiLoading={() => {}}
          content={postData.content || ""}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />

        {/* ===== Hashtags & Preview ===== */}
        <HashtagSection
          hashtags={postData.hashtags || []}
          setHashtags={(tags) => setPostData((p) => ({ ...p, hashtags: tags }))}
        />
        <LivePreview
          headerImage={postData.headerImage}
          title={postData.title}
          subtitle={postData.subtitle}
          category={postData.category}
          content={postData.content}
        />

        {/* ===== Action Buttons ===== */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-5 py-2 bg-yellow-600 border border-[#2A2520] rounded-lg hover:bg-yellow-800 transition"
          >
            <FilePlus size={18} /> Save Draft
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg transition ${
              isPublishing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            <Upload size={18} />{" "}
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
