import React from "react";

const EditorArea = ({ editorRef, content, setContent }) => (
  <div
    ref={editorRef}
    contentEditable
    suppressContentEditableWarning
    className="min-h-[300px] bg-[#241F1A] border-[#2A2520] p-4 rounded-xl outline-none text-gray-200"
    onInput={(e) => setContent(e.currentTarget.innerHTML)}
    dangerouslySetInnerHTML={{ __html: content }}
  ></div>
);

export default EditorArea;
