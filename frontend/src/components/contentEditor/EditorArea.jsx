import React, { useEffect, useState } from "react";

const EditorArea = ({ editorRef, content, setContent }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

  // Force LTR always
  useEffect(() => {
    const editor = editorRef?.current;
    if (!editor) return;

    editor.setAttribute("dir", "ltr");
    editor.style.unicodeBidi = "plaintext";
    editor.style.direction = "ltr";

    // Click handler for image select
    const handleClick = (e) => {
      if (e.target.tagName === "IMG") {
        const rect = e.target.getBoundingClientRect();
        setToolbarPos({ top: rect.top - 40, left: rect.left + rect.width / 2 });
        setSelectedImage(e.target);
      } else {
        setSelectedImage(null);
      }
    };

    editor.addEventListener("click", handleClick);

    return () => editor.removeEventListener("click", handleClick);
  }, [editorRef]);

  // Insert content externally
  useEffect(() => {
    const editor = editorRef?.current;
    if (editor && editor.innerHTML !== content) {
      editor.innerHTML = content || "";
    }
  }, [content, editorRef]);

  const handleInput = (e) => {
    setContent(e.currentTarget.innerHTML);
  };

  return (
    <div className="relative w-full">
      {/* Image Floating Toolbar */}
      {selectedImage && (
        <div
          className="absolute bg-[#2A2520] text-white px-3 py-2 rounded-lg shadow-lg flex gap-3 items-center z-50"
          style={{ top: toolbarPos.top, left: toolbarPos.left, transform: "translateX(-50%)" }}
        >
          <button onClick={() => { selectedImage.style.float = "left"; setContent(editorRef.current.innerHTML); }}>
            Left
          </button>
          <button onClick={() => { selectedImage.style.display = "block"; selectedImage.style.margin = "10px auto"; selectedImage.style.float = "none"; setContent(editorRef.current.innerHTML); }}>
            Center
          </button>
          <button onClick={() => { selectedImage.style.float = "right"; setContent(editorRef.current.innerHTML); }}>
            Right
          </button>

          <button onClick={() => { selectedImage.remove(); setSelectedImage(null); setContent(editorRef.current.innerHTML); }}>
            Delete
          </button>

          <button
            onClick={() => {
              selectedImage.style.resize = "both";
              selectedImage.style.overflow = "auto";
              selectedImage.style.outline = "2px dashed yellow";
              setContent(editorRef.current.innerHTML);
            }}
          >
            Resize
          </button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck="false"
        dir="ltr"
        onInput={handleInput}
        className="bg-[#241F1A] border border-[#2A2520] p-4 rounded-xl outline-none text-gray-200 leading-relaxed text-left min-h-[300px]"
        style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
      ></div>
    </div>
  );
};

export default EditorArea;
