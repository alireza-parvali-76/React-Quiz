import React, { useState, useEffect } from "react"; // useEffect رو اضافه کن
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import quizData from "../../Components/Datas/Datas";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// ... (کد‌های shuffleArray و shakeAnimation بدون تغییر)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const shakeAnimation = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.shake {
  animation: shake 0.3s ease-in-out;
}
`;


export default function QuestionBox() {
  const navigate = useNavigate();
  const [shuffledQuestions] = useState(() => shuffleArray(quizData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [animateWrong, setAnimateWrong] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false); // ← state جدید برای کنترل پایان آزمون

  const currentQuestion = shuffledQuestions[currentIndex];

  // ✅ هوک useEffect برای مدیریت پایان آزمون
  useEffect(() => {
    // اگر آزمون تمام شده، ۲ ثانیه صبر کن و بعد به صفحه نتیجه برو
    if (isQuizFinished) {
      const timer = setTimeout(() => {
        navigate("/result", {
          state: {
            total: shuffledQuestions.length,
            correct: score, // حالا score مقدار نهایی و درست رو داره
          },
        });
      }, 2000); // تا کاربر نتیجه آخرین سوال رو ببینه

      return () => clearTimeout(timer); // cleanup
    }
  }, [isQuizFinished, score, navigate, shuffledQuestions.length]);


  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // جلوگیری از کلیک مجدد

    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setAnimateWrong(true);
      setTimeout(() => setAnimateWrong(false), 400);
    }

    // بررسی کن که سوال آخره یا نه
    if (currentIndex < shuffledQuestions.length - 1) {
      // اگر سوال آخر نیست، ۲ ثانیه بعد برو سوال بعدی
      setTimeout(() => {
        setSelectedAnswer(null);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    } else {
      // اگر سوال آخره، فقط state پایان آزمون رو true کن
      setIsQuizFinished(true);
    }
  };

  if (!currentQuestion || !currentQuestion.options) {
    return <div className="text-white text-center text-lg mt-10">در حال بارگذاری سؤال...</div>;
  }
  
  // answeredCount رو بر اساس currentIndex حساب می‌کنیم تا state اضافه نداشته باشیم
  const answeredCount = currentIndex; 

  return (
    <div
      dir="rtl"
      className={`bg-gray-900 text-white p-8 rounded-2xl shadow-xl/30 w-[400px] space-y-6 mx-auto transition-all duration-300 ${
        animateWrong ? "shake" : ""
      }`}
    >
      <style>{shakeAnimation}</style>
      
      {/* ... بقیه JSX بدون تغییر ... */}
       <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-300">پیشرفت آزمون</span>
          <span className="font-medium text-gray-400">
            {Math.round((answeredCount / shuffledQuestions.length) * 100)}%
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(answeredCount / shuffledQuestions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="text-lg font-medium leading-relaxed text-justify">
        {currentQuestion.question}
      </div>

      <ul className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.answer;

          let colorClass = "";
          if (selectedAnswer) {
            if (isSelected && isCorrect) colorClass = "uiverse-btn-correct";
            else if (isSelected && !isCorrect) colorClass = "uiverse-btn-wrong";
            else colorClass = "uiverse-btn-disabled";
          }

          return (
            <li key={index} className="relative">
              <Button
                onClick={() => handleAnswerClick(option)}
                className={`w-full justify-center ${colorClass}`}
                disabled={!!selectedAnswer} // دکمه رو غیرفعال کن
              >
                {option}
              </Button>
              {selectedAnswer && isSelected && (
                <span
                  className={`absolute top-1/2 left-[-12px] -translate-y-1/2 ${
                    isCorrect ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircleIcon className="h-8 w-8 bg-gray-900 rounded-full p-[2px] shadow-lg" />
                  ) : (
                    <XCircleIcon className="h-8 w-8 bg-gray-900 rounded-full p-[2px] shadow-lg" />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
