import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-white text-center mt-20">
        No Data Found 😅
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const { total, correct, wrong } = state;

  return (
    <div className="text-white text-center p-10">
      <h2 className="text-2xl font-bold mb-6">🎯 Quiz Result</h2>

      <p className="text-green-400 text-lg mb-2">
        ✅ Correct Answers: {correct}
      </p>
      <p className="text-red-400 text-lg mb-6">❌ Wrong Answers: {wrong}</p>
      <p className="text-gray-300 text-md mb-8">Total Questions: {total}</p>

      <Button onClick={() => navigate("/")}>🏠 Back to Home</Button>
    </div>
  );
}
