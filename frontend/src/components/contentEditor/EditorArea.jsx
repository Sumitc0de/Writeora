import React, { useEffect } from "react";

const EditorArea = ({ editorRef, content, setContent }) => {
  useEffect(() => {
    const editor = editorRef?.current;
    if (!editor) return;

    // Force LTR direction always
    editor.setAttribute("dir", "ltr");
    editor.style.unicodeBidi = "plaintext";
    editor.style.direction = "ltr";
  }, [editorRef]);

  useEffect(() => {
    // Only set HTML once when content changes from outside
    const editor = editorRef?.current;
    if (editor && editor.innerHTML !== content) {
      editor.innerHTML = content || "";
    }
  }, [content, editorRef]);

  const handleInput = (e) => {
    // Update state only on input, not render
    setContent(e.currentTarget.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text =
      e.clipboardData.getData("text/html") ||
      e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      spellCheck="false"
      dir="ltr"
      style={{
        unicodeBidi: "plaintext",
        direction: "ltr",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        minHeight: "300px",
      }}
      className="bg-[#241F1A] border border-[#2A2520] p-4 rounded-xl outline-none text-gray-200 leading-relaxed text-left"
      onInput={handleInput}
      onPaste={handlePaste}
    ></div>
  );
};

export default EditorArea;
