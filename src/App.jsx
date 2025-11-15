import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import QuestionBox from "./Pages/QuestionBox/QuestionBox";
import Result from "./Pages/Result/Result";
import NotFound from "./Pages/404/404";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Routes>
          {/* صفحه اصلی */}
          <Route path="/" element={<Home />} />

          {/* صفحه کوییز */}
          <Route path="/quiz" element={<QuestionBox />} />

          {/* صفحه 404 - برای مسیرهای اشتباه */}
          <Route path="*" element={<NotFound />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}
