import React from "react";

function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-3 py-2 text-sm
        text-black
        sm:px-4 sm:py-2.5 sm:text-base
        rounded-md bg-yellow-500 font-semibold
        hover:bg-yellow-700 transition-all
        whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
