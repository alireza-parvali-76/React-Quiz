import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Celebration.css";

export default function Celebration() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId;

    function createConfettiPiece() {
      const piece = document.createElement("div");
      piece.classList.add("confetti-piece");

      // ✅ موقعیت و رنگ تصادفی
      piece.style.position = "absolute";
      piece.style.top = `${-10 - Math.random() * 40}px`;
      piece.style.left = `${Math.random() * window.innerWidth}px`;
      piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
      piece.style.opacity = Math.random() * 0.8 + 0.2;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.width = `${6 + Math.random() * 6}px`;
      piece.style.height = `${10 + Math.random() * 10}px`;
      piece.style.borderRadius = `${Math.random() > 0.5 ? "2px" : "50%"}`;
      piece.style.animationDuration = `${2 + Math.random() * 3}s`;

      container.appendChild(piece);

      // حذف بعد از پایان انیمیشن
      setTimeout(() => piece.remove(), 5000);
    }

    // تولید پارتیکل‌ها هر 70ms
    intervalId = setInterval(createConfettiPiece, 70);

    return () => {
      clearInterval(intervalId);
      container.innerHTML = "";
    };
  }, []);

  return createPortal(
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen z-[9999] pointer-events-none overflow-hidden confetti-container"
    >
      <svg className="checkmark" viewBox="0 0 52 52">
        <circle
          className="checkmark-circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
      </svg>
    </div>,
    document.body
  );
}
