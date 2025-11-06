import React from "react";

const LivePreview = ({ headerImage, title, subtitle, category, content }) => (
  <div className="mt-10 border-t border-gray-800 pt-6">
    <h2 className="text-2xl font-semibold mb-4">👁️ Live Preview</h2>
    <div className="bg-[#241F1A] p-6 rounded-xl">
      {headerImage && (
        <img
          src={headerImage}
          alt="preview"
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}
      {category && <p className="text-sm text-gray-400">{category}</p>}
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      {subtitle && <p className="text-lg text-gray-400 mb-6">{subtitle}</p>}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  </div>
);

export default LivePreview;
