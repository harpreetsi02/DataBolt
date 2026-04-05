"use client";

import { lessons } from "@/data/lessons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'

export default function NextLessonButton({ currentId, lesson }) {

  const router = useRouter();
  const [canProceed, setCanProceed] = useState(true);

  const current = parseInt(currentId, 10);
  const isLastLesson = current >= lessons.length;

  // ✅ sabse pehle check
  if (isLastLesson) {
    return null;
  }

  useEffect(() => {

    if (!lesson.hasExercise) {
      setCanProceed(true);
      return;
    }

    const solved = Number(
      localStorage.getItem(`lesson-${currentId}-progress`)
    );

    if (solved >= lesson.totalQuestions) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }

  }, []);

  const nextLesson = () => {
    router.push(`/lessons/${Number(currentId) + 1}`);
  };

  return (
    <div className="mt-10 flex justify-center">

      <button
        onClick={nextLesson}
        disabled={!canProceed}
        className={`px-15 py-4 text-xl rounded-lg font-bold transition 
        ${
          canProceed
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next Chapter <i className="ri-arrow-right-line"></i>
      </button>

    </div>
  );
}