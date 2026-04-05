"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full backdrop-blur-md shadow-gray-800 shadow-md fixed top-0 left-0 z-50 bg-[#0f172a] text-white px-6 py-4 flex justify-between items-center border-b border-gray-800">

      {/* LEFT - LOGO */}
      <h1
        className="text-3xl font-bold text-red-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        DataBolt
      </h1>

      {/* RIGHT - CHAPTERS */}
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
          Chapters ▼
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-125 bg-white text-black rounded shadow-lg border border-gray-300 p-4">
        
            <h2 className="text-gray-600 mb-2 font-semibold">
              All Lessons
            </h2>

            {/* 🔥 GRID */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">

              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => router.push(`/lessons/${l.id}`)}
                  className="text-blue-600 hover:underline cursor-pointer text-sm"
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