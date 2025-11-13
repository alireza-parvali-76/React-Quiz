import React from "react";
import "./Button.css";

export default function Button({ children, onClick }) {
  return (
    <span className="uiverse-btn" onClick={onClick}>
      {children}
    </span>
  );
}
