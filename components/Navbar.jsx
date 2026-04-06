"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
  // agar close hone wala tha → cancel
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 2500); // 2.5 sec hold
  };

  return (
    <div className="w-full backdrop-blur-md shadow-gray-800 shadow-md fixed top-0 left-0 z-50 bg-[#0f172a] text-white px-8 md:px-20 py-4 md:py-6 flex justify-between items-center border-b border-gray-800">

      {/* LEFT - LOGO */}
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Data<span className="text-red-500">Bolt</span>
      </h1>

      {/* RIGHT - CHAPTERS */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="px-4 text-xl py-2 rounded hover:text-red-500">
          Chapters ▼
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-80 md:w-125 bg-gray-800 text-black rounded shadow-lg p-4">
        
            <h2 className="text-gray-200 mb-2 font-semibold">
              All Lessons
            </h2>

            {/* 🔥 GRID */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">

              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    setOpen(false); 
                    router.push(`/lessons/${l.id}`)}
                  }
                  className="text-red-500 hover:underline cursor-pointer text-sm md:text-lg"
                >
                  {l.id === 1
                    ? "Introduction to SQL"
                    : `SQL Lesson ${l.id - 1}: ${l.title}`}
                </div>
              ))}

            </div>
          
          </div>
        )}
      </div>

    </div>
  );
}