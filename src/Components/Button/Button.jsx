// src/Components/Button/Button.jsx
import React from "react";
import "./Button.css"; // جایی که استایل Uiverse رو گذاشتی

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`uiverse-btn font-medium transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
