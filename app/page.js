"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import { lessons } from "@/data/lessons";

export default function Home() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".heroText", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      });

      tl.from(".floatingCard", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      tl.from(".lessonCard", {
        y: 40,
        opacity: 1,
        stagger: 0.05,
        duration: 0.7,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={container}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />

      {/* RED GLOW */}
      <div className="absolute -top-50 -left-50 w-125 h-125 bg-red-500/20 rounded-full blur-[180px]" />

      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-red-700/20 rounded-full blur-[180px]" />

      {/* HUGE BACKGROUND TEXT */}
      <h1 className="absolute top-10 left-10 text-[180px] md:text-[280px] font-black text-white/2 tracking-tight select-none">
        SQL
      </h1>

      <div className="relative z-10 px-6 md:px-20 py-10">
        {/* NAV */}
        <nav className="flex justify-between items-center mb-24">
          <h2 className="text-xl font-bold tracking-widest">
            SQL<span className="text-red-500">.</span>
          </h2>

          <button className="border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full hover:bg-white/10 transition">
            Start Learning
          </button>
        </nav>

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

          {/* LEFT */}
          <div>
            <div className="overflow-hidden">
              <h1 className="heroText text-6xl md:text-8xl font-black leading-none tracking-tight">
                MASTER
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="heroText text-6xl md:text-8xl font-black leading-none tracking-tight">
                SQL
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="heroText text-6xl md:text-8xl font-black leading-none tracking-tight text-red-500">
                LIKE A PRO
              </h1>
            </div>

            <p className="heroText mt-8 text-zinc-400 max-w-xl text-lg leading-relaxed">
              Learn databases, joins, subqueries, indexing, optimization,
              transactions, and advanced querying with a modern learning path.
            </p>

            <div className="heroText flex gap-4 mt-10">
              <button className="bg-red-500 hover:bg-red-600 transition px-7 py-4 rounded-2xl font-semibold">
                Start Journey
              </button>

              <button className="border border-white/10 bg-white/5 backdrop-blur-md px-7 py-4 rounded-2xl hover:bg-white/10 transition">
                Explore Chapters
              </button>
            </div>
          </div>

          {/* RIGHT SIDE FLOATING UI */}
          <div className="relative h-125 hidden lg:block">

            {/* CARD 1 */}
            <div className="floatingCard absolute top-0 left-10 w-65 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-400">Progress</span>
                <i className="ri-database-2-line text-red-500 text-xl"></i>
              </div>

              <h2 className="text-5xl font-black">72%</h2>

              <div className="mt-6 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[72%] h-full bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="floatingCard absolute top-44 right-0 w-75 bg-linear-to-br from-red-500/20 to-white/5 border border-red-500/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
              <span className="text-sm text-red-400 tracking-widest">
                CURRENT TOPIC
              </span>

              <h2 className="text-3xl font-bold mt-4">
                Window Functions
              </h2>

              <p className="text-zinc-400 mt-3">
                Master ranking, partitions, and advanced analytics queries.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="floatingCard absolute bottom-0 left-20 w-60 bg-black/40 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center">
                  <i className="ri-code-box-line text-2xl"></i>
                </div>

                <div>
                  <h3 className="font-semibold">20+ Chapters</h3>
                  <p className="text-sm text-zinc-500">
                    Beginner → Advanced
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LESSONS */}
        <section className="mt-24">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-5xl font-black">
              Learning Path
            </h2>

            <p className="text-zinc-500 hidden md:block">
              Structured roadmap for mastering SQL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
              >
                <div className="lessonCard group relative overflow-hidden bg-white/3 border border-white/10 rounded-[30px] p-7 hover:border-red-500/40 transition-all duration-500 hover:-translate-y-2">

                  {/* glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* top */}
                  <div className="flex justify-between items-start">
                    <span className="text-6xl font-black text-white/10">
                      {/* {lesson.id} */}
                      {lesson.id <= 2
                              ? `Intro Part ${lesson.id}: ${lesson.title}`
                              : `Chapter ${lesson.id - 2}: ${lesson.title}`}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-500 transition">
                      <i className="ri-arrow-right-up-line text-xl"></i>
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="mt-10 text-2xl font-bold group-hover:text-red-400 transition">
                    {lesson.title}
                  </h3>

                  {/* desc */}
                  <p className="mt-4 text-zinc-500 leading-relaxed">
                    {lesson.id <= 2
                      ? "Build strong database fundamentals."
                      : "Deep dive into practical SQL concepts."}
                  </p>

                  {/* bottom */}
                  <div className="mt-8 flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Interactive lesson
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}