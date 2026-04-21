"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const timerRef = useRef(null);

  const isDesktop = () => {
    return typeof window !== "undefined" && window.innerWidth >= 768;
  };

  // 🔥 Hover (desktop only)
  const handleMouseEnter = () => {
    if (!isDesktop()) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;

    // ⏳ delay close (smooth UX)
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 2500);
  };

  // 🔥 Click (mobile)
  const handleClick = () => {
    if (isDesktop()) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    // ⏳ slight delay for better feel
    timerRef.current = setTimeout(() => {
      setOpen((prev) => !prev);
    }, 200);
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full backdrop-blur-md shadow-gray-800 shadow-md fixed top-0 left-0 z-50 bg-[#0f172a] text-white px-8 md:px-20 py-4 md:py-6 flex justify-between items-center border-b border-gray-800">

      {/* LOGO */}
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Data<span className="text-red-500">Bolt</span>
      </h1>

      {/* CHAPTERS */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleClick}
          className="px-4 py-2 rounded hover:text-red-500"
        >
          Chapters ▼
        </button>

        {/* 🔥 DROPDOWN (always rendered) */}
        <div
          className={`absolute right-0 mt-2 w-80 md:w-125 z-50 bg-gray-800 text-black rounded shadow-lg p-4 transition-all duration-300 ease-in-out
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <h2 className="text-gray-300 mb-2 font-semibold">
            All Lessons
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {lessons.map((l) => (
              <div
                key={l.id}
                onClick={() => {
                  setOpen(false); // 🔥 close after click
                  router.push(`/lessons/${l.id}`);
                }}
                className="text-red-500 hover:underline cursor-pointer text-sm"
              >
                {l.id <= 2
                  ? `Intro Part ${l.id}: ${l.title}`
                  : `Chapter ${l.id - 2}: ${l.title}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}