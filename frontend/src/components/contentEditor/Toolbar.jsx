import React, { useRef } from "react";
import { Bold, Italic, Underline, Link2, Image, Type } from "lucide-react";

const Toolbar = ({ editorRef }) => {
  const fileInputRef = useRef(null);

  // Execute formatting commands
  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imgTag = `<img src="${reader.result}" alt="inserted" style="max-width:100%;border-radius:10px;margin:10px 0;" />`;
      document.execCommand("insertHTML", false, imgTag);
      editorRef.current.focus();
    };
    reader.readAsDataURL(file);
  };

  // Handle link insertion
  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  // Handle headings
  const handleHeading = () => {
    const level = prompt("Enter heading level (1-6):", "2");
    if (level >= 1 && level <= 6) {
      document.execCommand("formatBlock", false, `h${level}`);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-[#241F1A] border border-[#2A2520] p-2 rounded-lg mb-3">
      {/* Bold */}
      <button
        onClick={() => handleCommand("bold")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Bold"
      >
        <Bold size={16} />
      </button>

      {/* Italic */}
      <button
        onClick={() => handleCommand("italic")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Italic"
      >
        <Italic size={16} />
      </button>

      {/* Underline */}
      <button
        onClick={() => handleCommand("underline")}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Underline"
      >
        <Underline size={16} />
      </button>

      {/* Heading */}
      <button
        onClick={handleHeading}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Heading"
      >
        <Type size={16} />
      </button>

      {/* Link */}
      <button
        onClick={handleLink}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Insert Link"
      >
        <Link2 size={16} />
      </button>

      {/* Image */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2 hover:bg-yellow-600/30 rounded-md"
        title="Insert Image"
      >
        <Image size={16} />
      </button>

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
