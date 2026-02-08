import React from "react";
import {
  Bold, Italic, Underline, List, ListOrdered, Quote, Code, Heading1, Heading2, Link as LinkIcon, Type, Eraser
} from "lucide-react";

export default function Toolbar({ editorRef }) {
  const applyFormat = (command, value = null) => {
    if (command === "formatBlock") {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        let parent = selection.getRangeAt(0).commonAncestorContainer;
        while (parent && parent !== editorRef.current) {
          if (parent.nodeName === value.toUpperCase()) {
            // Already in this block, toggle it off to paragraph
            document.execCommand("formatBlock", false, "P");
            if (editorRef.current) editorRef.current.focus();
            return;
          }
          parent = parent.parentNode;
        }
      }
    }
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const addLink = () => {
    const selection = window.getSelection();
    const hasSelection = selection.rangeCount > 0 && selection.toString().trim().length > 0;

    if (hasSelection) {
      const url = prompt("Enter the URL:");
      if (url) {
        const selectedText = selection.toString();
        const html = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#F5C542] underline hover:opacity-80 transition-opacity">${selectedText}</a>`;
        document.execCommand("insertHTML", false, html);
      }
    } else {
      const text = prompt("Enter Link Label (Text):");
      const url = prompt("Enter the URL:");
      if (text && url) {
        const html = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#F5C542] underline hover:opacity-80 transition-opacity">${text}</a>`;
        document.execCommand("insertHTML", false, html);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="flex flex-wrap items-center justify-center gap-1 p-1.5 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full shadow-2xl max-w-full">

        <div className="flex items-center gap-1">
          <ToolButton onClick={() => applyFormat("formatBlock", "H1")} icon={<Heading1 size={18} />} tooltip="Heading 1" />
          <ToolButton onClick={() => applyFormat("formatBlock", "H2")} icon={<Heading2 size={18} />} tooltip="Heading 2" />
        </div>

        <div className="w-px h-5 bg-white/10 mx-1 hidden xs:block" />

        <div className="flex items-center gap-1">
          <ToolButton onClick={() => applyFormat("bold")} icon={<Bold size={18} />} tooltip="Bold" />
          <ToolButton onClick={() => applyFormat("italic")} icon={<Italic size={18} />} tooltip="Italic" />
          <ToolButton onClick={() => applyFormat("underline")} icon={<Underline size={18} />} tooltip="Underline" />
          <ToolButton onClick={addLink} icon={<LinkIcon size={18} />} tooltip="Link" />
        </div>

        <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

        <div className="flex items-center gap-1">
          <ToolButton onClick={() => applyFormat("insertUnorderedList")} icon={<List size={18} />} tooltip="Bullet List" />
          <ToolButton onClick={() => applyFormat("insertOrderedList")} icon={<ListOrdered size={18} />} tooltip="Numbered List" />
          <ToolButton onClick={() => applyFormat("formatBlock", "blockquote")} icon={<Quote size={18} />} tooltip="Quote" />
          <ToolButton onClick={() => applyFormat("formatBlock", "pre")} icon={<Code size={18} />} tooltip="Code Block" />
        </div>

        <div className="w-px h-5 bg-white/10 mx-1 hidden md:block" />

        <div className="flex items-center gap-1">
          <ToolButton onClick={() => applyFormat("formatBlock", "P")} icon={<Type size={18} />} tooltip="Normal Text" />
          <ToolButton onClick={() => applyFormat("removeFormat")} icon={<Eraser size={18} />} tooltip="Clear Formatting" />
        </div>

      </div>
    </div>
  );
}

const ToolButton = ({ onClick, icon, tooltip }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
    type="button"
  >
    {icon}
  </button>
);
