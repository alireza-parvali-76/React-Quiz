import React from "react";
import Button from "../Button/Button";

export default function QuestionBox() {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-[400px]">
      <div className="mb-6">
        <span className="text-sm text-gray-400">Question 1 of 20</span>
      </div>

      <div className="space-y-6">
        <div className="text-lg font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>

        <ul className="space-y-4">
          <li><Button>Option 1</Button></li>
          <li><Button>Option 2</Button></li>
          <li><Button>Option 3</Button></li>
          <li><Button>Option 4</Button></li>
        </ul>
      </div>
    </div>
  );
}
