"use client";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function MyBar() {
  const [selectedSubject, setSelectedSubject] = useState(true);

  return (
    <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={"bar-container"}>
        
        {/* Background blobs */}
        <div className={"gradients-container"}>
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>

        {/* Foreground content */}
        <div className={"bar-content"}>
          <LayoutDashboard className="w-5 h-5 text-gray-500" />
          <div className="flex bg-gray-100 rounded-full p-1 gap-2">
            <button
              onClick={() => setSelectedSubject(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSubject
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Les matières
            </button>
            <button
              onClick={() => setSelectedSubject(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !selectedSubject
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
