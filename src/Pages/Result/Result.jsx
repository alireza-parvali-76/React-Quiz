import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Celebration from "../../Components/Celebration/Celebration";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // دیتا رو از state پاس داده شده در navigate بخون
  // اگر state وجود نداشت، مقادیر پیش‌فرض بذار
  const { correct = 0, total = 0 } = location.state || {};

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // تابع برای شروع مجدد که به صفحه سوالات برمیگرده
  // !!! مسیر '/question-box' رو به مسیر صفحه سوالات خودت تغییر بده !!!
  const handleRestart = () => {
    navigate("/quiz"); // یا هر مسیری که QuestionBox در اون رندر میشه
  };

  // بقیه کد بدون تغییر باقی می‌مونه...
  const getColorClass = (value) => {
    if (value < 20) return "text-red-500";
    if (value < 60) return "text-green-500";
    if (value < 80) return "text-green-600";
    return "text-green-700";
  };

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const step = 10;
    const increment = accuracy / (duration / step);

    const anim = setInterval(() => {
      start += increment;
      if (start >= accuracy) {
        start = accuracy;
        clearInterval(anim);
        if (accuracy === 100) {
          setTimeout(() => setShowCelebration(true), 300);
        }
      }
      setProgress(Math.round(start));
    }, step);

    return () => clearInterval(anim);
  }, [accuracy]);

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center min-h-screen text-white p-6 gap-6"
    >
      {showCelebration && <Celebration />}

      <h2 className="text-3xl font-bold">نتیجه آزمون</h2>
      <p className="text-lg">
        پاسخ صحیح: <span className="font-bold">{correct}</span> از{" "}
        <span className="font-bold">{total}</span>
      </p>

      {/* دایره درصد */}
      <div className="relative size-40">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... circle elements ... */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-700"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${getColorClass(progress)}`}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }} // انیمیشن نرم‌تر
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getColorClass(progress)}`}>
            {progress}%
          </span>
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleRestart} // ← حالا از تابع درست استفاده می‌کنه
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          شروع مجدد
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default Result;
