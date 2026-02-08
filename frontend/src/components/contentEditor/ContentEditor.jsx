import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TemplateSelector from "./TemplateSelector";
import Toolbar from "./Toolbar";
import EditorArea from "./EditorArea";
import HashtagSection from "./HashtagSection";
import AITools from "./AITools";

import {
  FilePlus,
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader,
  Image as ImageIcon,
  ArrowLeft,
  Search,
  Settings,
  Sparkles
} from "lucide-react";

import { uploadImage } from "../../service/uploadImage";
import { usePosts } from "../../context/PostContext";
import { calculateReadTime } from "../../service/calculateReadTime";
import Button from "../Button";

// Template definitions
const templates = {
  blog: {
    label: "Tech Blog",
    title: "The Rise of Agentic AI in 2025",
    subtitle: "How autonomous agents are transforming the software development lifecycle.",
    category: "Technology",
    content: `
      <h2>The Shift to Autonomy</h2>
      <p>In 2025, we are moving beyond simple chat interfaces to <strong>Agentic AI</strong>. These are systems capable of reasoning, planning, and executing complex tasks with minimal human intervention.</p>
      <blockquote>"The future of software isn't just code you write; it's agents that help you build it."</blockquote>
      <h3>Key Trends to Watch:</h3>
      <ul>
        <li><strong>Multi-Agent Orchestration</strong>: Different AI specialists working together.</li>
        <li><strong>Self-Healing Systems</strong>: Code that fixes itself in real-time.</li>
        <li><strong>Reasoning Engines</strong>: Moving beyond statistical prediction to logical deduction.</li>
      </ul>
      <p>For a deeper dive, check out our latest <a href="/discover">case studies</a> on AI integration.</p>
    `,
  },
  article: {
    label: "Think Piece",
    title: "Embracing Minimalist Engineering",
    subtitle: "Why the best code is the code you never had to write.",
    category: "Philosophy",
    content: `
      <p>In an era of increasing complexity, the most radical act an engineer can perform is to choose <em>simplicity</em>. We often mistake movement for progress, but true innovation often stems from removal rather than addition.</p>
      <blockquote>"Perfection is attained, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry</blockquote>
      <p>When we build, we should ask ourselves: is this feature necessary, or is it just an ego-driven abstraction? The most resilient systems are those with the fewest moving parts.</p>
      <h2>The Cost of Complexity</h2>
      <p>Every line of code is a liability. It requires testing, maintenance, and eventually, replacement. By embracing minimalism, we reduce the surface area for failure.</p>
    `,
  },
  learning: {
    label: "Step-by-Step Tutorial",
    title: "Building Scalable APIs with Node.js",
    subtitle: "A professional guide to architecture, security, and performance.",
    category: "Programming",
    content: `
      <h2>1. Project Architecture</h2>
      <p>Before writing a single line of code, you must define your structure. We recommend a <strong>Controller-Service-Repository</strong> pattern for maximum testability.</p>
      <pre>project/
├── controllers/  # Route handlers
├── services/     # Business logic
├── models/       # Data schemas
└── utils/        # Generic helpers</pre>
      <h3>Best Practices:</h3>
      <ul>
        <li><strong>Validation</strong>: Never trust user input. Use libraries like Zod or Joi.</li>
        <li><strong>Error Handling</strong>: Implement global middleware for consistent responses.</li>
        <li><strong>Logging</strong>: Use Winston or Pino for production-grade observability.</li>
      </ul>
      <h2>2. Implementation Steps</h2>
      <p>Follow these steps to initialize your environment properly...</p>
    `,
  },
  knowledge_base: {
    label: "Knowledge Base",
    title: "Writeora Engineering Playbook",
    subtitle: "Standard operating procedures for our development team.",
    category: "Operations",
    content: `
      <h2>Onboarding & Setup</h2>
      <p>Welcome to the team! This guide will help you get your local environment running in under 10 minutes.</p>
      <h3>Required Tooling:</h3>
      <ol>
        <li><strong>Node.js v20+</strong>: The core runtime.</li>
        <li><strong>Docker</strong>: For local database orchestration.</li>
        <li><strong>VS Code</strong>: Recommended editor with our custom extensions.</li>
      </ol>
      <blockquote>Important: Always run the <code>npm run setup</code> command after cloning the repository.</blockquote>
      <h2>Code Review Guidelines</h2>
      <p>We pride ourselves on high-quality code. When reviewing, focus on:</p>
      <ul>
        <li><strong>Readability</strong>: Is the intent clear without comments?</li>
        <li><strong>Performance</strong>: Are there any obvious O(n^2) operations?</li>
        <li><strong>Security</strong>: Are all inputs sanitized?</li>
      </ul>
    `,
  },
};

const ContentEditor = () => {
  const { postData, setPostData, publishPost, editPost, updateExistingPost } = usePosts();

  const editorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const editSlug = searchParams.get("edit");

  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingHeader, setIsUploadingHeader] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState("");

  // Load post for editing
  useEffect(() => {
    if (editSlug) {
      editPost(editSlug);
    }
  }, [editSlug]);

  // Apply template if passed via navigation state
  useEffect(() => {
    const templateType = location.state?.templateType;
    if (templateType && templates[templateType]) {
      const template = templates[templateType];
      setPostData((prev) => ({
        ...prev,
        title: template.title,
        subtitle: template.subtitle,
        category: template.category,
        content: template.content,
        template: templateType,
      }));
      // Clear the navigation state to prevent re-applying on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setPostData]);

  // Load draft - Only if NO template OR edit mode is being applied
  useEffect(() => {
    const templateType = location.state?.templateType;
    if (templateType || editSlug) return;

    const draft = localStorage.getItem("draft");
    if (!draft) return;

    try {
      const parsedDraft = JSON.parse(draft);
      setPostData((prev) => ({ ...prev, ...parsedDraft }));
    } catch (err) {
      console.error("Draft load error:", err);
    }
  }, [setPostData, location.state, editSlug]);

  // Auto-save (disabled for edit mode to prevent draft overwrite)
  useEffect(() => {
    if (editSlug) return;

    const interval = setInterval(() => {
      if (postData.title || postData.content) {
        localStorage.setItem("draft", JSON.stringify(postData));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [postData, editSlug]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  }, [setPostData]);

  const handleHeaderUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHeader(true);
    setPublishError("");

    try {
      const data = await uploadImage(file);
      setPostData((prev) => ({
        ...prev,
        headerImage: {
          public_id: data.public_id,
          url: data.url,
        },
      }));
    } catch (err) {
      console.error("Header upload fail:", err);
      setPublishError("Failed to upload header image");
    } finally {
      setIsUploadingHeader(false);
    }
  }, [setPostData]);

  const handleSaveDraft = useCallback(() => {
    try {
      localStorage.setItem("draft", JSON.stringify(postData));
      setPublishSuccess("Draft saved to cloud storage");
      setPublishError("");
      setTimeout(() => setPublishSuccess(""), 2500);
    } catch {
      setPublishError("Failed to save draft");
    }
  }, [postData]);

  const handlePublish = useCallback(async () => {
    setPublishError("");
    setPublishSuccess("");

    if (!postData.title?.trim()) {
      setPublishError("Please give your masterpiece a title");
      return;
    }

    if (!postData.content?.trim()) {
      setPublishError("The canvas is empty!");
      return;
    }

    setIsPublishing(true);

    try {
      const readTime = calculateReadTime(postData.content);
      const updatedPostData = { ...postData, readingTime: readTime };

      if (editSlug && postData._id) {
        await updateExistingPost(postData._id, updatedPostData);
        setPublishSuccess("Updated successfully!");
      } else {
        await publishPost(updatedPostData);
        setPublishSuccess("Published successfully!");
      }

      localStorage.removeItem("draft");

      setTimeout(() => navigate("/discover"), 2000);
    } catch (err) {
      setPublishError(err?.response?.data?.message || "Operation failed");
    } finally {
      setIsPublishing(false);
    }
  }, [postData, publishPost, updateExistingPost, editSlug, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32">

      {/* Top Bar - Navigation Only */}
      <div className="fixed top-0 left-0 w-full h-[72px] bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05] z-[100] flex items-center justify-between px-4 sm:px-6 lg:px-20">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => navigate('/create')} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-1 sm:mx-2"></div>
          <span className="text-sm font-medium text-gray-500 truncate max-w-[150px] sm:max-w-none">
            {editSlug ? "Editing Post" : "Draft / Untitled"}
          </span>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050505]/90 backdrop-blur-xl border-t border-white/[0.05] z-[100] p-4 flex items-center justify-between px-4 sm:px-6 lg:px-20">
        <div className="text-[10px] sm:text-xs text-gray-500 font-mono hidden xs:block">
          {postData.content?.length || 0} characters
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {!editSlug && (
            <button
              onClick={handleSaveDraft}
              className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              Save Draft
            </button>
          )}
          <button
            onClick={handlePublish}
            disabled={isPublishing || isUploadingHeader}
            className={`bg-[#F5C542] text-black px-4 sm:px-6 py-2 rounded-lg font-bold text-sm hover:shadow-[0_0_20px_rgba(245,197,66,0.3)] transition-all flex items-center gap-2 ${(isPublishing || isUploadingHeader) ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isPublishing ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
            <span className="hidden xs:inline">
              {isPublishing ? (editSlug ? "Updating..." : "Publishing...") : (editSlug ? "Update" : "Publish")}
            </span>
            <span className="xs:hidden">
              {editSlug ? "Update" : "Publish"}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-10">

        {/* Alerts */}
        {(publishSuccess || publishError) && (
          <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 ${publishSuccess
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
            {publishSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{publishSuccess || publishError}</span>
          </div>
        )}

        {/* Cover Image Area */}
        <div className="relative group mb-8 sm:mb-12">
          {postData.headerImage?.url ? (
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group border border-white/[0.05]">
              <img src={postData.headerImage.url} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label htmlFor="headerImageInput" className="cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-xl text-white text-sm sm:text-base font-medium hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
                  <ImageIcon size={18} /> Change Cover
                </label>
              </div>
            </div>
          ) : (
            <label htmlFor="headerImageInput" className="cursor-pointer group flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#F5C542]/50 transition-all">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={20} className="text-gray-400 group-hover:text-[#F5C542]" />
              </div>
              <span className="text-gray-500 font-medium group-hover:text-gray-300">Add Cover Image</span>
            </label>
          )}
          <input type="file" accept="image/*" onChange={handleHeaderUpload} id="headerImageInput" className="hidden" />
        </div>

        {/* Title area */}
        <div className="space-y-4 mb-8 sm:mb-10">
          <input
            type="text"
            name="title"
            value={postData.title || ""}
            onChange={handleChange}
            placeholder="Article Title..."
            className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-bold placeholder-gray-700 text-white outline-none border-none p-0 focus:ring-0 leading-tight"
          />
          <input
            type="text"
            name="subtitle"
            value={postData.subtitle || ""}
            onChange={handleChange}
            placeholder="Add a subtitle..."
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl text-gray-400 placeholder-gray-800 outline-none border-none p-0 focus:ring-0 font-medium"
          />
        </div>

        {/* Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/[0.05]">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#F5C542] transition-colors" size={16} />
              <input
                type="text"
                name="category"
                value={postData.category || ""}
                onChange={handleChange}
                placeholder="Category..."
                className="bg-white/[0.03] text-sm text-gray-300 pl-9 pr-4 py-2 rounded-lg border border-white/10 hover:border-white/20 focus:border-[#F5C542]/50 focus:outline-none focus:bg-white/[0.05] w-full sm:max-w-[200px] transition-all"
              />
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <label className="text-xs text-gray-500 font-medium sm:hidden uppercase tracking-wider">Templates</label>
            <TemplateSelector
              template={postData.template}
              setTemplate={(t) => setPostData((p) => ({ ...p, template: t }))}
              setTitle={(t) => setPostData((p) => ({ ...p, title: t }))}
              setSubtitle={(s) => setPostData((p) => ({ ...p, subtitle: s }))}
              setCategory={(c) => setPostData((p) => ({ ...p, category: c }))}
              setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
              className="text-gray-400 hover:text-white"
            />
          </div>
        </div>

        {/* Main Editor */}
        <div className="relative min-h-[500px]">
          {/* Sticky Toolbar moved inside EditorArea handling usually, but we place it here for layout */}
          <div className="sticky top-24 z-30 mb-6 mx-auto max-w-2xl">
            <Toolbar editorRef={editorRef} />
          </div>

          <EditorArea
            editorRef={editorRef}
            content={postData.content}
            setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
          />
        </div>

        {/* Footer Tools */}
        <div className="mt-20 space-y-10 border-t border-white/[0.05] pt-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#F5C542]" /> AI Assistant
            </h3>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
              <AITools
                content={postData.content}
                setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <HashtagSection
              hashtags={postData.hashtags || []}
              setHashtags={(tags) => setPostData((p) => ({ ...p, hashtags: tags }))}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContentEditor;
