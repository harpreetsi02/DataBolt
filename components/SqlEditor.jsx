"use client";

import { useState, useEffect } from "react";
import { getDB } from "@/lib/initDB";
import { transformQuery } from "@/lib/sqlTransformer";
import "remixicon/fonts/remixicon.css";

function normalizeResult(result) {
  if (!result.length) return [];
  const { columns, values } = result[0];

  return values.map((row) => {
    const obj = {};

    columns.forEach((col, i) => {
      obj[col] = row[i];
    });

    return Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});
  });
}

function compareResults(a, b) {
  if (!a.length && !b.length) return true;
  if (!a.length || !b.length) return false;

  const normA = normalizeResult(a);
  const normB = normalizeResult(b);

  const sortedA = normA.sort((x, y) =>
    JSON.stringify(x).localeCompare(JSON.stringify(y))
  );

  const sortedB = normB.sort((x, y) =>
    JSON.stringify(x).localeCompare(JSON.stringify(y))
  );

  return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}

export default function SqlEditor({tasks = [], questions = [], lessonId, exerciseName, defaultQuery}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const fallbackQuery = defaultQuery || "SELECT * FROM employees;";

  // SOLUTION
  const showSolution = () => {
    if (tasks[taskIndex]) {
      setQuery(tasks[taskIndex]);
      runQuery(tasks[taskIndex]);
    }
  };

  // DEFAULT QUERY
  useEffect(() => {
    setQuery(fallbackQuery);
    runQuery(fallbackQuery);
  }, [fallbackQuery]);

  // RUN QUERY
  const runQuery = async (customQuery) => {
    const db = await getDB();
    const q = customQuery || query;
    const blocked = /(drop|alter|truncate)/i;

    // BLOCK DANGEROUS
    if (blocked.test(q)) {
      setResult({
        columns: ["Error"],
        values: [["Dangerous query not allowed"]],
      });
      return;
    }

    // ONLY SELECT
    if (!/^select/i.test(q.trim())) {
      setResult({
        columns: ["Error"],
        values: [["Only SELECT queries allowed"]],
      });
      return;
    }

    try {
      const transformed = transformQuery(q);
      const userResult = db.exec(transformed);

      // SHOW RESULT
      if (userResult.length > 0) {
        setResult(userResult[0]);
      }

      // TASK VALIDATION
      if (tasks[taskIndex]) {
        const expectedQuery = tasks[taskIndex];
        const expectedResult = db.exec(expectedQuery);
        if (compareResults(userResult, expectedResult)) {
          setTaskIndex((prev) => prev + 1);
        }
      }

    } catch (err) {
      setResult({
        columns: ["Error"],
        values: [[err.message]],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
      {/* LEFT */}
      <div className="xl:col-span-2 space-y-8">

        {/* RESULT */}
        {result && (
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
                  <i className="ri-database-2-line text-xl"></i>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight">
                    {exerciseName}
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Live SQL query output
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                <span className="text-sm text-green-400">
                  Executed
                </span>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* HEAD */}
                <thead className="bg-white/3 text-zinc-300">
                  <tr>
                    {result.columns.map((col, i) => (
                      <th
                        key={i}
                        className="border-b border-white/5 px-6 py-5 text-center text-xs uppercase tracking-wider font-semibold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {result.values.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 odd:bg-white/2 hover:bg-red-500/3 transition"
                    >
                      {row.map((val, j) => (
                        <td
                          key={j}
                          className="px-6 py-5 text-center whitespace-nowrap text-zinc-300"
                        >
                          {val === null ? (
                            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                              NULL
                            </span>
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EDITOR */}
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-6 py-4">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                SQL EDITOR
              </span>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center gap-2 text-zinc-500 text-sm">

              <i className="ri-code-s-slash-line"></i>

              Interactive Query Environment
            </div>
          </div>

          {/* TEXTAREA */}
          <textarea
            value={query}
            onChange={(e) => {

              const val = e.target.value;

              setQuery(val);

              const trimmed = val.trim();

              if (trimmed === "") {
                runQuery(fallbackQuery);
                return;
              }

              if (trimmed.endsWith(";")) {
                try {
                  runQuery(val);
                } catch (err) {}
              }
            }}
            className="min-h-87.5 w-full resize-y bg-transparent p-8 font-mono text-green-400 outline-none placeholder:text-zinc-600"
            spellCheck={false}
          />

          {/* FOOTER */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 bg-white/2 px-6 py-5">
            {/* INFO */}
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <i className="ri-information-line"></i>
              Press semicolon (;) to auto-run query
            </div>

            {/* BUTTON */}
            <button
              onClick={() => runQuery()}
              className="group relative overflow-hidden rounded-2xl bg-red-500 px-6 py-3 font-semibold transition hover:scale-[1.03] hover:bg-red-600"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
              <span className="relative z-10 flex items-center gap-3">
                <i className="ri-play-fill"></i>
                Run Query
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* TASK PANEL */}
      <div className="overflow-hidden md:h-full md:max-h-[calc(100vh-80px)] rounded-4xl border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] h-fit">

        {/* TOP */}
        <div className="border-b border-white/5 bg-white/2 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500">
              <i className="ri-task-line text-xl"></i>
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Tasks
              </h2>

              <p className="text-sm text-zinc-500">
                Complete all SQL challenges
              </p>
            </div>
          </div>
        </div>

        {/* TASKS */}
        <div className="space-y-3 p-6">
          {questions.map((q, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                i === taskIndex
                  ? "border-blue-500/30 bg-blue-500/10" : i < taskIndex
                  ? "border-green-500/20 bg-green-500/10" : "border-white/5 bg-white/2"
              }`}
            >

              <div className="flex items-start gap-4">
                {/* NUMBER */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold ${
                    i === taskIndex
                      ? "bg-blue-500 text-white" : i < taskIndex
                      ? "bg-green-500 text-white" : "bg-white/5 text-zinc-400"
                  }`}
                >
                  {i < taskIndex ? "✓" : i + 1}
                </div>

                {/* TEXT */}
                <div>
                  <p
                    className={`leading-relaxed ${
                      i === taskIndex
                        ? "text-blue-300" : i < taskIndex
                        ? "text-green-300" : "text-zinc-400"
                    }`}
                  >
                    {q}
                  </p>

                  {/* ACTIVE */}
                  {i === taskIndex && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      Current Task
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/5 bg-white/2 p-6">
          <div className="rounded-2xl border border-white/5 bg-black/20 p-5 text-center">
            <p className="text-sm text-zinc-500 mb-4">
              Need help solving this task?
            </p>

            <button
              onClick={showSolution}
              className="inline-flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-blue-300 transition hover:bg-blue-500/20"
            >
              <i className="ri-lightbulb-line"></i>
              Show Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}