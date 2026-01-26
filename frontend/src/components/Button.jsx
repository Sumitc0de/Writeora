import React from "react";

function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative overflow-hidden
        px-5 py-2.5 text-sm sm:text-base font-medium
        rounded-xl
        text-black bg-[#F5C542]
        shadow-[0_2px_10px_rgba(245,197,66,0.3)]
        hover:shadow-[0_4px_20px_rgba(245,197,66,0.5)]
        hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
