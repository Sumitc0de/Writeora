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
      // Only update if significantly different to avoid cursor jumps during typing
      // or if the editor is currently empty.
      const editorText = editor.innerText || "";
      const contentText = content ? content.replace(/<[^>]*>/g, "") : "";

      if (!editor.innerHTML || Math.abs(editorText.length - contentText.length) > 20) {
        editor.innerHTML = content || "";
      }
    }
  }, [content, editorRef]);

  const handleInput = (e) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let node = range.commonAncestorContainer;
        if (node.nodeType === 3) node = node.parentNode;

        // Check if inside blockquote or pre
        const block = node.closest("blockquote, pre");
        if (block) {
          const content = block.textContent.trim();
          // If the block is "empty" (or just has a newline being added), break out
          if (content === "") {
            e.preventDefault();
            // Convert current block to paragraph
            document.execCommand("formatBlock", false, "P");
            // Add a new paragraph below if needed, or just let the command handle it
            // Most browsers will convert <blockquote></blockquote> to <p></p>
          }
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // 1. Strip styles and classes
      const all = doc.body.querySelectorAll("*");
      all.forEach(el => {
        el.removeAttribute("style");
        el.removeAttribute("class");
      });

      // 2. Convert common block elements to P tags for consistent spacing
      const blocks = doc.body.querySelectorAll("div, section, article, header, footer");
      blocks.forEach(el => {
        const p = doc.createElement("p");
        p.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(p, el);
      });

      // 3. Remove nested P tags or empty tags
      const ps = doc.body.querySelectorAll("p");
      ps.forEach(p => {
        if (!p.textContent.trim() && !p.querySelector("img, iframe")) {
          p.remove();
        }
      });

      // 4. Flatten double nested P tags if any
      const nestedPs = doc.body.querySelectorAll("p p");
      nestedPs.forEach(p => {
        const parent = p.parentNode;
        while (p.firstChild) parent.insertBefore(p.firstChild, p);
        p.remove();
      });

      document.execCommand("insertHTML", false, doc.body.innerHTML);
    } else {
      // Normalize plain text to remove excessive newlines
      const cleanText = text.replace(/\n\s*\n/g, '\n').trim();
      document.execCommand("insertText", false, cleanText);
    }
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
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder="Start writing your story..."
        className="bg-transparent border-none outline-none text-gray-200 text-lg leading-relaxed text-left min-h-[500px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-600 cursor-text prose prose-invert max-w-none"
        style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
      ></div>
    </div>
  );
};

export default EditorArea;
