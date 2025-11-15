import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import quizData from "../../Components/Datas/Datas";

// الگوریتم شافل (Fisher–Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// استایل انیمیشن لرزش
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

  const currentQuestion = shuffledQuestions[currentIndex];

  if (!currentQuestion || !currentQuestion.options) {
    return (
      <div className="text-white text-center text-lg mt-10">
        Loading question...
      </div>
    );
  }

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setAnimateWrong(true);
      setTimeout(() => setAnimateWrong(false), 400);
    }

    // بعد از ۲ ثانیه سؤال بعدی یا نتیجه
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        navigate("/result", {
          state: {
            total: shuffledQuestions.length,
            correct: score + (isCorrect ? 1 : 0),
            wrong: shuffledQuestions.length - (score + (isCorrect ? 1 : 0)),
          },
        });
      }
    }, 2000);
  };

  return (
    <div
      className={`bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-[400px] space-y-6 mx-auto transition-all duration-300 ${
        animateWrong ? "shake" : ""
      }`}
    >
      <style>{shakeAnimation}</style>

      {/* شماره سؤال */}
      <div className="text-sm text-gray-400">
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </div>

      {/* متن سؤال */}
      <div className="text-lg font-medium">{currentQuestion.question}</div>

      {/* گزینه‌ها */}
      <ul className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.answer;

          let colorClass = ""; // پیش‌فرض همون گرادیان آبی از کلاس uiverse-btn
          if (selectedAnswer) {
            if (isSelected && isCorrect) colorClass = "uiverse-btn-correct";
            else if (isSelected && !isCorrect) colorClass = "uiverse-btn-wrong";
            else colorClass = "uiverse-btn-disabled";
          }

          return (
            <li key={index}>
              <Button
                onClick={() => !selectedAnswer && handleAnswerClick(option)}
                className={`w-full ${colorClass}`}
              >
                {option}
              </Button>
            </li>
          );
        })}
      </ul>

      {/* پیام درست یا غلط */}
      {selectedAnswer && (
        <p
          className={`mt-4 text-sm font-medium ${
            selectedAnswer === currentQuestion.answer
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {selectedAnswer === currentQuestion.answer
            ? "✅ Correct!"
            : "❌ Wrong!"}
        </p>
      )}
    </div>
  );
}
