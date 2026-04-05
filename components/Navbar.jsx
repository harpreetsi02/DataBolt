"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full backdrop-blur-md shadow-gray-800 shadow-md fixed top-0 left-0 z-50 bg-[#0f172a] text-white px-12 md:px-20 py-6 flex justify-between items-center border-b border-gray-800">

      {/* LEFT - LOGO */}
      <h1
        className="text-4xl font-bold text-red-500 cursor-pointer"
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
        <button className="px-4 text-xl py-2 rounded hover:text-red-500">
          Chapters ▼
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-125 bg-gray-800 text-black rounded shadow-lg p-4">
        
            <h2 className="text-gray-200 mb-2 font-semibold">
              All Lessons
            </h2>

            {/* 🔥 GRID */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">

              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => router.push(`/lessons/${l.id}`)}
                  className="text-red-500 hover:underline cursor-pointer text-sm"
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