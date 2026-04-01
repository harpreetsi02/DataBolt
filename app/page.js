"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import Link from "next/link";
import { lessons } from "@/data/lessons";

export default function Home() {
  const container = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline()

      tl.from("#sqlText", {
      x: -200,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.3)",
    });

    tl.from("#heroText", {
      x: 200,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.3)",
    });

    tl.from("#subtitle", {
      opacity: 0,
      duration: 0.6,
    });

    tl.from(".card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }
    );
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={container} className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

      {/* HERO */}
      <section className="mb-10">
        <h1
          id="sqlText"
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          SQL
        </h1>

        <h1
          id="heroText"
          className="text-5xl flex gap-2 md:text-7xl font-bold items-center text-red-500 tracking-tight"
        >
          <span className="text-gray-700/80">0</span>
          <i className="ri-arrow-right-long-fill text-4xl text-red-500"></i>
          <span className="text-red-500">HERO</span>
        </h1>

        <p
          id="subtitle"
          className="text-gray-400 mt-4 max-w-xl"
        >
          From "what is a database" to window functions and transactions.
        </p>
      </section>

      {/* CHAPTERS */}
      <section>
        <div className="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <Link href={`/lessons/${lesson.id}`}>
              <div className="bg-gray-900 border-l-4 border-red-500 hover:bg-gray-800 hover:scale-[1.02] transition p-3.5 rounded-xl shadow-lg shadow-black/30 cursor-pointer">
                <span className="text-red-500 font-bold mr-2">
                  {lesson.id.toString().padStart(2, "0")}
                </span>
                {lesson.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}