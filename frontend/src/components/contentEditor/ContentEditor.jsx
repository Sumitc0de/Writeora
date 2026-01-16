import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TemplateSelector from "./TemplateSelector";
import Toolbar from "./Toolbar";
import EditorArea from "./EditorArea";
import HashtagSection from "./HashtagSection";
import AITools from "./AITools";
import LivePreview from "./LivePreview";

import { FilePlus, Upload, AlertCircle, CheckCircle2, Loader } from "lucide-react";
import { uploadImage } from "../../service/uploadImage";
import { usePosts } from "../../context/PostContext";
import { calculateReadTime } from "../../service/calculateReadTime";

const ContentEditor = () => {

  const { postData, setPostData, publishPost } = usePosts();
  const editorRef = useRef(null);
  const navigate = useNavigate();


  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingHeader, setIsUploadingHeader] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState("");

  // ------------------------------------------------------------------
  // ✅ Load draft from localStorage
  // ------------------------------------------------------------------
  useEffect(() => {
    const draft = localStorage.getItem("draft");
    if (draft) {
      try {
        setPostData((prev) => ({ ...prev, ...JSON.parse(draft) }));
        console.log("💾 Draft loaded");
      } catch (err) {
        console.error("Draft load error:", err);
      }
    }
  }, [setPostData]);

  // ------------------------------------------------------------------
  // ✅ Auto-save draft every 30 seconds
  // ------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (postData.title || postData.content) {
        localStorage.setItem("draft", JSON.stringify(postData));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [postData]);

  // ------------------------------------------------------------------
  // ✅ Handle Input change
  // ------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------------------------------------------------------
  // ✅ Header Image Upload (Cloudinary)
  // ------------------------------------------------------------------
  const handleHeaderUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHeader(true);

    try {
      const data = await uploadImage(file);
      setPostData(prev => ({
        ...prev,
        headerImage: {
          public_id: data.public_id,
          url: data.url
        }
      }));



    } catch (err) {
      console.error("Header upload fail:", err);
      setPublishError("Failed to upload header image");
    }

    setIsUploadingHeader(false);
  };



  // ------------------------------------------------------------------
  // ✅ Save Draft Manually
  // ------------------------------------------------------------------
  const handleSaveDraft = () => {
    try {
      localStorage.setItem("draft", JSON.stringify(postData));
      setPublishSuccess("💾 Draft saved!");
      setTimeout(() => setPublishSuccess(""), 2500);
    } catch (err) {
      setPublishError("Draft save failed");
    }
  };

  // ------------------------------------------------------------------
  // ✅ Publish Post
  // ------------------------------------------------------------------
  const handlePublish = async () => {

    setPublishError("");
    setPublishSuccess("");

    if (!postData.title?.trim()) return setPublishError("Title required");
    if (!postData.content?.trim()) return setPublishError("Content required");

    setIsPublishing(true);

    try {
      const readTime = calculateReadTime(postData.content)
       const updatedPost = {
    ...postData,
    readingTime: readTime,
  };
      await publishPost(updatedPost);

      localStorage.removeItem("draft");
      setPublishSuccess("🚀 Post published!");

      setTimeout(() => navigate("/discover"), 2000);

    } catch (err) {
      console.error("Publish error:", err);
      setPublishError(err.response?.data?.message || "Publish failed");
    }

    setIsPublishing(false);
  };

  // console.log("FINAL POST DATA →", postData);

  return (
    <div className="min-h-screen pt-24 bg-[#0C0A07] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Alerts */}
        {publishSuccess && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg flex gap-2">
            <CheckCircle2 size={18} /> {publishSuccess}
          </div>
        )}

        {publishError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex gap-2">
            <AlertCircle size={18} /> {publishError}
          </div>
        )}

        <div>
        {/* Template Selector */}
        <TemplateSelector
          template={postData.template}
          setTemplate={(t) => setPostData((p) => ({ ...p, template: t }))}
          setTitle={(t) => setPostData((p) => ({ ...p, title: t }))}
          setSubtitle={(s) => setPostData((p) => ({ ...p, subtitle: s }))}
          setCategory={(c) => setPostData((p) => ({ ...p, category: c }))}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSaveDraft}
            className="bg-yellow-600 px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FilePlus size={18} /> Save Draft
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing || isUploadingHeader}
            className={`bg-blue-600 px-5 py-2 rounded-lg flex items-center gap-2 ${(isPublishing || isUploadingHeader) && "opacity-50"
              }`}
          >
            <Upload size={18} />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
    </div>
        

        {/* Header Image */}
        <div className="relative group">

          {postData.headerImage?.url ? (
            <img
              src={postData.headerImage.url}
              alt="Header"
              className="w-full h-[25vw] object-cover rounded-2xl shadow-lg"
            />
          ) : (
            <div className="h-[25vw] w-full flex items-center justify-center bg-[#241F1A] rounded-2xl border-2 border-dashed border-[#2A2520]">
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
            className={`absolute bottom-3 left-3 px-4 py-2 rounded-md bg-yellow-600 font-semibold cursor-pointer ${isUploadingHeader && "opacity-50 cursor-not-allowed"
              }`}
          >
            {isUploadingHeader ? (
              <>
                <Loader size={16} className="animate-spin" /> Uploading...
              </>
            ) : (
              "📷 Upload"
            )}
          </label>
        </div>


        {/* Title / Subtitle / Category */}
        <input
          type="text"
          name="title"
          value={postData.title || ""}
          onChange={handleChange}
          placeholder="Your title..."
          className="w-full bg-transparent text-4xl font-bold mb-2 border-b border-gray-700 focus:border-yellow-500"
        />

        <input
          type="text"
          name="subtitle"
          value={postData.subtitle || ""}
          onChange={handleChange}
          placeholder="Subtitle..."
          className="w-full bg-transparent text-lg mb-2 border-b border-gray-700 focus:border-yellow-500"
        />

        <input
          type="text"
          name="category"
          value={postData.category || ""}
          onChange={handleChange}
          placeholder="Category (AI / Dev / Productivity)"
          className="bg-[#241F1A] px-3 py-2 rounded-md w-60 focus:ring-2 focus:ring-yellow-500"
        />

         <AITools
          content={postData.content}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />

        {/* Editor */}
        <Toolbar editorRef={editorRef} />

        <EditorArea
          editorRef={editorRef}
          content={postData.content}
          setContent={(c) => setPostData((p) => ({ ...p, content: c }))}
        />
       
        <HashtagSection
          hashtags={postData.hashtags || []}
          setHashtags={(tags) => setPostData((p) => ({ ...p, hashtags: tags }))}
        />

        {/* <LivePreview {...postData} /> */}

        
      </div>
    </div>
  );
};

export default ContentEditor;
