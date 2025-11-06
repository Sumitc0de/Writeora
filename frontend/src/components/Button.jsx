import React from 'react'

function Button({ children, type = 'button', onClick, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-yellow-600 font-semibold  hover:bg-yellow-700 transition-all ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
