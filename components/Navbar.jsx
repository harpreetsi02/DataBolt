"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { lessons } from "@/data/lessons";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const timerRef = useRef(null);
  const dropdownRef = useRef(null);

  const isDesktop = () => {
    return typeof window !== "undefined" && window.innerWidth >= 768;
  };

  // OPEN
  const handleMouseEnter = () => {
    if (!isDesktop()) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };

  // CLOSE
  const handleMouseLeave = () => {
    if (!isDesktop()) return;

    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  // MOBILE CLICK
  const handleClick = () => {
    if (isDesktop()) return;

    setOpen((prev) => !prev);
  };

  // GSAP DROPDOWN
  useEffect(() => {
    if (!dropdownRef.current) return;

    if (open) {
      gsap.fromTo(
        dropdownRef.current,
        {
          opacity: 0,
          y: -20,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 pt-4">
      {/* NAV CONTAINER */}
      <div className="relative max-w-7xl mx-auto">

        {/* GLOW */}
        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full"></div>

        {/* NAV */}
        <div className="relative backdrop-blur-2xl bg-white/3 border border-white/10 rounded-2xl px-6 md:px-8 py-4 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.5)]">

          {/* LEFT */}
          <div
            onClick={() => router.push("/")}
            className="group cursor-pointer flex items-center gap-3"
          >
            {/* LOGO ICON */}
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition">
              <i className="ri-database-2-line text-xl"></i>
            </div>

            {/* TEXT */}
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Data<span className="text-red-500">Bolt</span>
              </h1>

              <p className="text-xs text-zinc-500 tracking-widest">
                SQL LEARNING PLATFORM
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* BUTTON */}
            <button
              onClick={handleClick}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/4 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300"
            >
              <span className="font-medium">Chapters</span>

              <i
                className={`ri-arrow-down-s-line text-xl transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              ></i>
            </button>

            {/* DROPDOWN */}
            {open && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-20 w-[90vw] md:w-200 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
              >
                {/* TOP */}
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        SQL Roadmap
                      </h2>

                      <p className="text-zinc-500 mt-1">
                        Structured learning path from beginner to advanced
                      </p>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-red-400">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      {lessons.length} Lessons
                    </div>
                  </div>
                </div>

                {/* LESSON GRID */}
                <div className="grid md:grid-cols-2 gap-3 p-6 max-h-125 overflow-y-auto">

                  {lessons.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => {
                        setOpen(false);
                        router.push(`/lessons/${l.id}`);
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 hover:border-red-500/30 hover:bg-red-500/4 p-5 transition-all duration-300 cursor-pointer"
                    >

                      {/* GLOW */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-red-500/10 to-transparent transition"></div>

                      {/* CONTENT */}
                      <div className="relative z-10">
                        {/* TOP */}
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-white/10">
                            {l.id <= 2
                              ? `Intro Part ${l.id}: ${l.title}`
                              : `Chapter ${l.id - 2}: ${l.title}`}
                          </span>

                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-500 transition">
                            <i className="ri-arrow-right-up-line"></i>
                          </div>
                        </div>

                        {/* TITLE */}
                        <h3 className="mt-5 font-semibold text-lg group-hover:text-red-400 transition">
                          {l.title}
                        </h3>

                        {/* DESC */}
                        <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                          {l.id <= 2
                            ? "Database foundations and SQL basics."
                            : "Advanced querying and practical SQL concepts."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">

                  <p className="text-sm text-zinc-500">
                    Continue your SQL mastery journey
                  </p>

                  <button className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition font-medium">
                    Start Learning
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}