import React, { useRef } from "react";
import { Bold, Italic, Underline, Link2, Image, Type } from "lucide-react";

const Toolbar = ({ editorRef, setContent }) => {
  const fileInputRef = useRef(null);

  // ---------- INSERT IMAGE (shared logic with EditorArea) ----------
  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imgHTML = `
        <img 
          src="${reader.result}" 
          style="max-width:100%; border-radius:12px; margin:12px 0;" 
        />
      `;

      document.execCommand("insertHTML", false, imgHTML);

      // update parent state
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
        editorRef.current.focus();
      }
    };
    reader.readAsDataURL(file);
  };

  // ---------- Toolbar Commands ----------
  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setContent(editorRef.current.innerHTML);
    editorRef.current.focus();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) insertImage(file);
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleHeading = () => {
    const level = prompt("Heading (1–6):", "2");
    if (level >= 1 && level <= 6) {
      document.execCommand("formatBlock", false, `h${level}`);
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-[#241F1A] border border-[#2A2520] p-2 rounded-lg mb-3">

      {/* Bold */}
      <button
        onClick={() => handleCommand("bold")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Bold size={16} />
      </button>

      {/* Italic */}
      <button
        onClick={() => handleCommand("italic")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Italic size={16} />
      </button>

      {/* Underline */}
      <button
        onClick={() => handleCommand("underline")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Underline size={16} />
      </button>

      {/* Heading */}
      <button
        onClick={handleHeading}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Type size={16} />
      </button>

      {/* Link */}
      <button
        onClick={handleLink}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Link2 size={16} />
      </button>

      {/* Image Insert */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
      >
        <Image size={16} />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default Toolbar;
