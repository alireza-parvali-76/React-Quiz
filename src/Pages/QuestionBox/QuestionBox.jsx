import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import quizData from "../../Components/Datas/Datas";

// الگوریتم شافل Fisher–Yates
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function QuestionBox() {
  const [shuffledQuestions] = useState(() => shuffleArray(quizData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // محافظت در برابر undefined
  const currentQuestion = shuffledQuestions[currentIndex];
  if (!currentQuestion || !currentQuestion.options) {
    return (
      <div className="text-white text-center text-lg mt-10">
        Loading question...
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("🎉 Quiz finished!");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-[400px] space-y-6 mx-auto">
      <div className="text-sm text-gray-400">
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </div>

      <div className="text-lg font-medium">{currentQuestion.question}</div>

      <ul className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <Button onClick={() => handleAnswerClick(option)}>
              {option}
            </Button>
          </li>
        ))}
      </ul>

      {selectedAnswer && (
        <p
          className={`mt-4 text-sm font-medium ${
            isCorrect ? "text-green-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
        </p>
      )}

      {selectedAnswer && (
        <Button onClick={handleNext}>Next Question</Button>
      )}
    </div>
  );
}
