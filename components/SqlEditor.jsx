"use client";

import { useState, useEffect } from "react";
import { getDB } from "@/lib/initDB";
import { transformQuery } from "@/lib/sqlTransformer";

export default function SqlEditor({ tasks = [], questions = [], lessonId, exerciseName, defaultQuery }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const fallbackQuery = defaultQuery || "SELECT * FROM employees;";

  const normalizeQuery = (q) => {
    return q
      .replace(/\s+/g, " ")
      .replace(/\n/g, " ")
      .trim()
      .toLowerCase();
  };

    const showSolution = () => {
            if (tasks[taskIndex]) {
            setQuery(tasks[taskIndex]);
            runQuery(tasks[taskIndex]);
        }    
    };

  // 🔥 default query run
  useEffect(() => {
    setQuery(fallbackQuery);
    runQuery(fallbackQuery);
  }, [fallbackQuery]);

  const runQuery = async (customQuery) => {
    const db = await getDB();
    const q = customQuery || query;
    
    try {
      const transformed = transformQuery(q);
    
      const isMutation = /^(insert|update|delete)/i.test(q.trim());
    
      // 🔥 run main query
      db.exec(transformed);
    
      if (isMutation) {
        // show updated table
        const res = db.exec("SELECT * FROM employees");
      

        if (res.length > 0) {
          setResult(res[0]);
        }
      
        // ✅ task check (simple match)
        if (
          tasks[taskIndex] &&
          normalizeQuery(q) === normalizeQuery(tasks[taskIndex])
        ) {
          setTaskIndex(taskIndex + 1);
        }
      
        return;
      }
    
      // SELECT queries
      const res = db.exec(transformed);
    
      if (res.length > 0) {
        setResult(res[0]);
      
        if (
          tasks[taskIndex] &&
          normalizeQuery(q) === normalizeQuery(tasks[taskIndex])
        ) {
          setTaskIndex(taskIndex + 1);
        }
      }
    
    } catch (err) {
      setResult({
        columns: ["Error"],
        values: [[err.message]]
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      {/* LEFT SIDE */}
      <div className="md:col-span-2 space-y-4">

        {/* RESULT */}
        {result && (
          <div className="p-4 bg-gray-900 rounded-xl overflow-x-auto">
            <h2 className="text-lg font-bold mb-3">{exerciseName}</h2>
            <table className="w-full text-sm border">
              <thead className="bg-gray-300 text-gray-800">
                <tr>
                  {result.columns.map((col, i) => (
                    <th key={i} className="p-2 border">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.values.map((row, i) => (
                  <tr key={i} className="odd:bg-gray-800 whitespace-nowrap text-center">
                    {row.map((val, j) => (
                      <td key={j} className="p-2 border">
                        {val === null ? "NULL" : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EDITOR */}
        <div className="p-2.5 bg-gray-900 rounded-xl">
          <textarea
            value={query}
            onChange={(e) => {
                const val = e.target.value;
                setQuery(val);

                const trimmed = val.trim();

                if (trimmed === ""){
                    runQuery(fallbackQuery);
                    return;
                }

                if (trimmed.endsWith(";")) {
                    try {
                        runQuery(val);
                    } catch (err) {
                        //  ignore error while typing
                    }
                }
            }}
            className="w-full min-h-60 resize-y p-3 bg-black text-green-400 font-mono rounded"
          />

          <button
            onClick={() => runQuery()}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
          >
            Run Query ▶
          </button>
        </div>

      </div>

      {/* RIGHT SIDE TASK PANEL */}
      {/* <div className="p-4 bg-gray-900 rounded-xl"> */}
      <div className="p-4 flex flex-col justify-between bg-gray-900 rounded-xl h-full max-h-[calc(100vh-420px)] overflow-y-auto">
        <div>
          <h2 className="text-lg font-bold mb-3">Tasks</h2>

          {questions.map((q, i) => (
            <div
              key={i}
              className={`p-2 text-sm flex gap-2 items-center  ${
                i === taskIndex
                  ? "text-blue-400"
                  : i < taskIndex
                  ? "text-green-400"
                  : "text-gray-500"
              }`}
            >
              <span className="w-6">{i + 1}.</span>
              {i < taskIndex && "✅"}
              {i === taskIndex && "👉"}
              {i > taskIndex && "•"}

              {q}
            </div>
          ))}
        </div>
        <div className="mt-4 pb-6 text-sm text-center text-gray-400">
          Stuck? Read this task's{" "}
          <button
            onClick={showSolution}
            className="text-blue-400 underline"
          >
            Solution
          </button>
        </div>    
      </div>
    </div>
  );
}
