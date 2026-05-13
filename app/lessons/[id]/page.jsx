import { lessonContent } from "@/data/lessonContent";
import SqlEditor from "@/components/SqlEditor";
import NextLessonButton from "@/components/NextLessonButton";
import QueryTable from "@/components/QueryTable";
import "remixicon/fonts/remixicon.css";

export default async function LessonPage({ params }) {

  const { id } = await params;

  const lesson = lessonContent[id];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Lesson not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white py-32 px-4 md:px-10">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[70px_70px]" />

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-red-500/10 rounded-full blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-125 h-125 bg-red-700/10 rounded-full blur-[140px]" />

      {/* MAIN */}
      <div className="relative z-10 max-w-6xl mx-auto overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

        {/* HERO */}
        <div className="relative overflow-hidden border-b border-white/5 p-8 md:p-14">

          {/* HUGE BG NUMBER */}
          <h1 className="absolute top-0 right-5 text-[140px] md:text-[240px] font-black text-white/3 leading-none select-none">
            {id}
          </h1>

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 mb-8">

            <div className="w-2 h-2 rounded-full bg-red-500"></div>

            <span className="text-sm tracking-widest text-red-400">
              {id <= 2 ? `INTRO ${id}` : `CHAPTER ${id - 2}`}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="max-w-4xl text-4xl md:text-7xl font-black leading-tight tracking-tight">

            {lesson.title}{" "}

            <span className="text-red-500">
              {lesson.highlight}
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            {lesson.subtitle}
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-4 mt-10">

            <div className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4">
              <h3 className="text-2xl font-bold">
                {lesson.blocks.length}
              </h3>

              <p className="text-sm text-zinc-500">
                Learning Blocks
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4">
              <h3 className="text-2xl font-bold">
                SQL
              </h3>

              <p className="text-sm text-zinc-500">
                Interactive Queries
              </p>
            </div>
          </div>
        </div>

        {/* IN THIS CHAPTER */}
        <div className="border-b border-white/5 p-8 md:p-14">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500">
              <i className="ri-book-open-line text-2xl"></i>
            </div>

            <div>
              <h2 className="text-3xl font-black">
                In This Chapter
              </h2>

              <p className="text-zinc-500">
                Concepts you'll master
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {lesson.points.map((point, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-white/5 bg-white/2 p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/20 text-red-400 font-bold">
                  {i + 1}
                </div>

                <p className="text-zinc-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 md:p-14">
          {lesson.blocks.map((block, i) => {
            // QUERY BLOCK
            if (block.type === "query") {
              return (
                <div key={i} className="mb-20">

                  <h2 className="text-3xl font-black tracking-tight mb-5">
                    {block.heading}
                  </h2>

                  <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                    {block.subtitle}
                  </p>

                  {/* QUERY NAME */}
                  <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400 mb-6">

                    <i className="ri-terminal-box-line"></i>

                    {block.queryName}
                  </div>

                  {/* CODE BLOCK */}
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">

                    {/* TOP BAR */}
                    <div className="flex items-center gap-2 border-b border-white/5 bg-white/2 px-5 py-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-xs tracking-widest text-zinc-500">
                        SQL QUERY
                      </span>
                    </div>

                    <pre className="overflow-x-auto p-6 text-sm text-zinc-300">
                      {block.code}
                    </pre>
                  </div>

                  <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                    {block.explanation}
                  </p>
                </div>
              );
            }

            // QUERY TABLE
            if (block.type === "queryTable") {
              return (
                <div key={i} className="mb-20">
                  <h2 className="text-3xl font-black tracking-tight mb-5">
                    {block.title}
                  </h2>

                  <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                    {block.subtitle}
                  </p>

                  {/* CODE */}
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] mb-10">

                    <div className="flex items-center gap-2 border-b border-white/5 bg-white/2 px-5 py-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-xs tracking-widest text-zinc-500">
                        SQL QUERY
                      </span>
                    </div>

                    <pre className="overflow-x-auto p-6 text-sm text-zinc-300">
                      {block.code}
                    </pre>
                  </div>
                  <QueryTable query={block.code} />
                </div>
              );
            }

            // TABLE
            if (block.type === "table") {
              return (
                <div key={i} className="mb-20">
                  <h2 className="text-3xl font-black tracking-tight mb-8">
                    {block.title}
                  </h2>
                  <div className="overflow-hidden rounded-3xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead className="bg-white/5 text-zinc-300">
                        <tr>
                          {block.data.headers.map((h, j) => (
                            <th
                              key={j}
                              className="border-b border-white/5 p-5 text-left"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {block.data.rows.map((row, j) => (
                          <tr
                            key={j}
                            className="border-b border-white/5 odd:bg-white/2 hover:bg-red-500/2 transition"
                          >

                            {row.map((cell, k) => (
                              <td
                                key={k}
                                className="p-5 text-zinc-300"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }

            // EXERCISE
            if (block.type === "exercise") {
              return (
                <div
                  key={i}
                  className="mt-20 rounded-4xl border border-red-500/20 bg-red-500/3 p-8 md:p-10"
                >

                  <div className="flex items-center gap-4 mb-10">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500">
                      <i className="ri-code-box-line text-2xl"></i>
                    </div>

                    <div>
                      <h2 className="text-3xl font-black">
                        Exercise
                      </h2>

                      <p className="text-zinc-500">
                        Practice your SQL skills
                      </p>
                    </div>
                  </div>

                  <SqlEditor
                    exerciseName={block.exersiceName}
                    tasks={block.tasks}
                    questions={block.questions}
                    lessonId={id}
                    defaultQuery={block.defaultQuery}
                  />
                </div>
              );
            }

            // NOTES
            if (block.type === "note") {
              return (
                <div
                  key={i}
                  className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5"
                >
                  <p className="text-yellow-200">
                    💡 <span className="font-bold">{block.heading}</span>{" "}
                    {block.explanation}
                  </p>
                </div>
              );
            }

            if (block.type === "noteGreen") {
              return (
                <div
                  key={i}
                  className="mb-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-5"
                >
                  <p className="text-green-200">
                    ✅ <span className="font-bold">{block.heading}</span>{" "}
                    {block.explanation}
                  </p>
                </div>
              );
            }

            if (block.type === "noteBlue") {
              return (
                <div
                  key={i}
                  className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5"
                >
                  <p className="text-blue-200">
                    🌟 <span className="font-bold">{block.heading}</span>{" "}
                    {block.explanation}
                  </p>
                </div>
              );
            }

            if (block.type === "noteRed") {
              return (
                <div
                  key={i}
                  className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
                >
                  <p className="text-red-200">
                    ❌ <span className="font-bold">{block.heading}</span>{" "}
                    {block.explanation}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* NEXT BUTTON */}
      <div className="relative z-10">
        <NextLessonButton currentId={id} lesson={lesson} />
      </div>
    </div>
  );
}