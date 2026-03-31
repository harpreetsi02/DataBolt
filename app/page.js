"use client";

import { useEffect, useState } from "react";
import initSqlJs from "sql.js";

export default function Home() {
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState("SELECT * FROM movies;");
  const [result, setResult] = useState([]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [theme, setTheme] = useState("light");

  const tasks = [
    "SELECT title FROM movies;",
    "SELECT director FROM movies;",
    "SELECT title, director FROM movies;",
    "SELECT title, year FROM movies;",
    "SELECT * FROM movies;",
  ];

  const questions = [
    "Find the title of each film",
    "Find the director of each film",
    "Find the title and director of each film",
    "Find the title and year of each film",
    "Find all information about each film;"
  ];  

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
  };

  useEffect(() => {
    const loadDB = async () => {
      const SQL = await initSqlJs({
        locateFile: () => "/sql-wasm.wasm"
      });

      const database = new SQL.Database();

      database.run(`
        CREATE TABLE movies (
          id INTEGER,
          title TEXT,
          director TEXT,
          year INTEGER,
          length_minutes INTEGER
        );
      `);

      database.run(`
        INSERT INTO movies VALUES
        (1, 'Toy Story', 'John Lasseter', 1995, 81),
        (2, 'A Bug''s Life', 'John Lasseter', 1998, 95),
        (3, 'Toy Story 2', 'John Lasseter', 1999, 93),
        (4, 'Monsters, Inc.', 'Pete Docter', 2001, 92),
        (5, 'Finding Nemo', 'Andrew Stanton', 2003, 100),
        (6, 'The Incredibles', 'Brad Bird', 2004, 115),
        (7, 'Cars', 'John Lasseter', 2006, 117),
        (8, 'Ratatouille', 'Brad Bird', 2007, 111),
        (9, 'WALL-E', 'Andrew Stanton', 2008, 98),
        (10, 'Up', 'Pete Docter', 2009, 96),
        (11, 'Toy Story 3', 'Lee Unkrich', 2010, 103),
        (12, 'Cars 2', 'John Lasseter', 2011, 120),
        (13, 'Brave', 'Brenda Chapman', 2012, 102),
        (14, 'Monsters University', 'Dan Scanlon', 2013, 110);
      `);

      setDb(database);

      // 🔥 auto run default query
      const res = database.exec("SELECT * FROM movies;");
      if (res.length > 0) {
        setResult(res[0]);
      }
    };

    loadDB();
  }, []);

  const runQuery = () => {
    if (!db) return;

    try {
      const res = db.exec(query);

      if (res.length > 0) {
        setResult(res[0]);

        if (query.trim().toLowerCase() === tasks[taskIndex].toLowerCase()) {
          const next = taskIndex + 1;
          setTaskIndex(next);
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const themeWrapper =
    theme === "light"
      ? "bg-white text-red-900"
      : "bg-[#0f172a] text-gray-200";

  const cardTheme =
    theme === "light"
      ? "card-light"
      : "card-dark";

  return (
    <div className={`min-h-screen p-4 md:p-6 ${themeWrapper}`}>
      <div className="max-w-6xl mx-auto">

        {/* Theme Switch */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => changeTheme("light")} className="px-3 py-1 text-white font-bold bg-red-400 rounded">Light</button>
          <button onClick={() => changeTheme("dark")} className="px-3 py-1 text-white font-bold bg-gray-500 rounded">Dark</button>
        </div>

        <div>
            <h1 className="text-2xl font-bold">What is SQL</h1>
            <h2 className="mb-2 text-lg">SQL (Structured Query Language) is a standard language used to interact with databases. It allows you to store, retrieve, update, and manage data efficiently.
            </h2>

            <h1 className="text-2xl font-bold">What is Query</h1>
            <h2 className="mb-2 text-lg">The SELECT query is used to fetch data from a database. For example, "SELECT * FROM movies;" retrieves all records from the movies table, helping you view and analyze the stored data.</h2>
          </div>

        {/* ✅ Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            {/* Result */}
            {result.columns && (
              <div className={`p-4 rounded-xl ${cardTheme}`}>
                
                {/* ✅ Mobile scroll fix */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {result.columns.map((col, i) => (
                          <th key={i} className="p-2 text-left">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.values.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td key={j} className="p-2">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Editor */}
            <div className={`p-4 rounded-xl ${cardTheme}`}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-36 p-3 rounded border border-red-100 text-red-400 font-mono"
              />

              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={runQuery}
                  className="mt-3 px-4 py-2 text-white font-bold bg-red-500 rounded w-full md:w-auto"
                >
                  Run Query ▶
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`p-4 rounded-xl ${cardTheme}`}>
            <h2 className="mb-2 text-xl font-bold">Exercise 1 - Tasks</h2>

            {questions.map((question, i) => (
              <div
                key={i}
                className={`p-2 text-sm ${
                  i === taskIndex
                    ? "text-blue-400"
                    : i < taskIndex
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                {i + 1}. {question}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}