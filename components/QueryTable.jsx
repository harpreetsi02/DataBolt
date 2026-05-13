"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/initDB";
import { transformQuery } from "@/lib/sqlTransformer";
import "remixicon/fonts/remixicon.css";

export default function QueryTable({ query }) {

  const [result, setResult] = useState(null);

  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function formatValue(val, colName) {
    if (val === null) return "NULL";

    const col = colName.toLowerCase();

    if (col.includes("monthname")) {
      return monthNames[parseInt(val)];
    }

    if (col.includes("dayname")) {
      return dayNames[parseInt(val)];
    }
    return val;
  }

  useEffect(() => {
    const run = async () => {
      const db = await getDB();
      try {
        const transformed = transformQuery(query);
        const res = db.exec(transformed);
        if (res.length > 0) {
          setResult(res[0]);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    run();
  }, [query]);

  if (!result) return null;

  return (
    <div className="mt-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">

          {/* ICON */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20">
            <i className="ri-file-chart-line text-2xl text-white"></i>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Query Result
            </h2>

            <p className="text-zinc-500 text-sm md:text-base">
              Live SQL execution output
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="hidden md:flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-sm text-green-400">
            Query Executed
          </span>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/2 px-6 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-xs tracking-[0.25em] uppercase text-zinc-500">
              SQL OUTPUT
            </span>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-2 text-zinc-500 text-sm">
            <i className="ri-database-2-line"></i>
            {result.values.length} Rows
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
                    className="border-b text-gray-400 border-white/5 px-6 py-5 text-center text-sm uppercase tracking-wider font-semibold"
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
                  className="group border-b border-white/5 odd:bg-white/2 hover:bg-red-500/4 transition-all duration-300"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-6 py-4 text-zinc-300 whitespace-nowrap"
                    >

                      <div className="flex items-center justify-center gap-2">
                        {/* NULL BADGE */}
                        {cell === null ? (
                          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
                            NULL
                          </span>
                        ) : (
                          <span className="group-hover:text-white transition">
                            {formatValue(cell, result.columns[j])}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 bg-white/2 px-6 py-4">
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <i className="ri-information-line"></i>
            Interactive SQL execution environment
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              SQLBolt Clone
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Live Results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}