import React from "react";
import { Bold, Italic, Underline, Link, Image as ImageIcon, Video } from "lucide-react";

const Toolbar = ({ editorRef }) => {
  const applyStyle = (cmd, val = null) => document.execCommand(cmd, false, val);

  const handleImageUpload = () => {
    const url = prompt("Enter Image URL:");
    if (url) document.execCommand("insertImage", false, url);
  };

  const handleVideoInsert = () => {
    const url = prompt("Enter YouTube/video embed URL:");
    if (url)
      document.execCommand(
        "insertHTML",
        false,
        `<iframe src="${url}" width="400" height="250"></iframe>`
      );
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-[#241F1A] p-3 rounded-lg border border-[#2A2520]">
      <button onClick={() => applyStyle("bold")}><Bold size={18} /></button>
      <button onClick={() => applyStyle("italic")}><Italic size={18} /></button>
      <button onClick={() => applyStyle("underline")}><Underline size={18} /></button>
      <button
        onClick={() => {
          const color = prompt("Enter text color:");
          if (color) applyStyle("foreColor", color);
        }}
      >
        🎨
      </button>
      <button
        onClick={() => {
          const link = prompt("Enter URL:");
          if (link) applyStyle("createLink", link);
        }}
      >
        <Link size={18} />
      </button>
      <button onClick={handleImageUpload}><ImageIcon size={18} /></button>
      <button onClick={handleVideoInsert}><Video size={18} /></button>
    </div>
  );
};

export default Toolbar;
