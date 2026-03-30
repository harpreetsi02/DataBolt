"use client";

import { useEffect, useState } from "react";
import initSqlJs from "sql.js";

export default function Home() {
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState("SELECT * FROM movies;");
  const [result, setResult] = useState([]);
  const [taskIndex, setTaskIndex] = useState(0);

  const tasks = [
    "SELECT title FROM movies;",
    "SELECT director FROM movies;",
    "SELECT title, director FROM movies;",
    "SELECT title, year FROM movies;",
    "SELECT * FROM movies;",
  ];

  // DB Initialize
  useEffect(() => {
    const loadDB = async () => {
      const SQL = await initSqlJs({
        locateFile: file => `/sql-wasm.wasm`
      });

      const database = new SQL.Database();

      // Create table
      database.run(`
        CREATE TABLE movies (
          id INTEGER,
          title TEXT,
          director TEXT,
          year INTEGER,
          length_minutes INTEGER
        );
      `);

      // Insert data
      database.run(`
        INSERT INTO movies VALUES
        (1, 'Toy Story', 'John Lasseter', 1995, 81),
        (2, 'A Bug''s Life', 'John Lasseter', 1998, 95),
        (3, 'Toy Story 2', 'John Lasseter', 1999, 93),
        (4, 'Monsters, Inc.', 'Pete Docter', 2001, 92);
      `);

      setDb(database);
    };

    loadDB();
  }, []);

  const runQuery = () => {
    if (!db) return;

    try {
      const res = db.exec(query);

      if (res.length > 0) {
        setResult(res[0]);

        // Check answer
        if (query.trim().toLowerCase() === tasks[taskIndex].toLowerCase()) {
          setTaskIndex(taskIndex + 1);
        }
      }
    } catch (err) {
      alert("SQL Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">

        <div className="grid grid-cols-3 gap-4">

          {/* LEFT */}
          <div className="col-span-2">

            {/* Query */}
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 p-3 border rounded font-mono"
            />

            <button
              onClick={runQuery}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Run Query
            </button>

            {/* Result Table */}
            {result.columns && (
              <table className="mt-4 w-full border text-sm">
                <thead>
                  <tr>
                    {result.columns.map((col, i) => (
                      <th key={i} className="border p-2">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.values.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td key={j} className="border p-2">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>

          {/* RIGHT */}
          <div className="bg-gray-100 p-3 rounded">
            <h2 className="font-bold mb-2">Tasks</h2>

            {tasks.map((task, index) => (
              <div
                key={index}
                className={`p-2 text-sm ${
                  index === taskIndex
                    ? "font-bold text-black"
                    : "text-gray-400"
                }`}
              >
                {index + 1}. {task}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}