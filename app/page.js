// // "use client";

// // import { useEffect, useState } from "react";
// // import initSqlJs from "sql.js";

// // export default function Home() {
// //   const [db, setDb] = useState(null);
// //   const [query, setQuery] = useState("SELECT * FROM movies;");
// //   const [result, setResult] = useState([]);
// //   const [taskIndex, setTaskIndex] = useState(0);

// //   const tasks = [
// //     "SELECT title FROM movies;",
// //     "SELECT director FROM movies;",
// //     "SELECT title, director FROM movies;",
// //     "SELECT title, year FROM movies;",
// //     "SELECT * FROM movies;",
// //   ];

// //   // DB Initialize
// //   useEffect(() => {
// //     const loadDB = async () => {
// //       const SQL = await initSqlJs({
// //         locateFile: file => `/sql-wasm.wasm`
// //       });

// //       const database = new SQL.Database();

// //       // Create table
// //       database.run(`
// //         CREATE TABLE movies (
// //           id INTEGER,
// //           title TEXT,
// //           director TEXT,
// //           year INTEGER,
// //           length_minutes INTEGER
// //         );
// //       `);

// //       // Insert data
// //       database.run(`
// //         INSERT INTO movies VALUES
// //         (1, 'Toy Story', 'John Lasseter', 1995, 81),
// //         (2, 'A Bug''s Life', 'John Lasseter', 1998, 95),
// //         (3, 'Toy Story 2', 'John Lasseter', 1999, 93),
// //         (4, 'Monsters, Inc.', 'Pete Docter', 2001, 92);
// //       `);

// //       setDb(database);
// //     };

// //     loadDB();
// //   }, []);

// //   const runQuery = () => {
// //     if (!db) return;

// //     try {
// //       const res = db.exec(query);

// //       if (res.length > 0) {
// //         setResult(res[0]);

// //         // Check answer
// //         if (query.trim().toLowerCase() === tasks[taskIndex].toLowerCase()) {
// //           setTaskIndex(taskIndex + 1);
// //         }
// //       }
// //     } catch (err) {
// //       alert("SQL Error: " + err.message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen text-black bg-gray-200 p-6">
// //       <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">

// //         <div className="grid grid-cols-3 gap-4">

// //           {/* LEFT */}
// //           <div className="col-span-2">

// //             {/* Query */}
// //             <textarea
// //               value={query}
// //               onChange={(e) => setQuery(e.target.value)}
// //               className="w-full h-32 p-3 border rounded font-mono"
// //             />

// //             <button
// //               onClick={runQuery}
// //               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
// //             >
// //               Run Query
// //             </button>

// //             {/* Result Table */}
// //             {result.columns && (
// //               <table className="mt-4 w-full border text-sm">
// //                 <thead>
// //                   <tr>
// //                     {result.columns.map((col, i) => (
// //                       <th key={i} className="border p-2">{col}</th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {result.values.map((row, i) => (
// //                     <tr key={i}>
// //                       {row.map((val, j) => (
// //                         <td key={j} className="border p-2">{val}</td>
// //                       ))}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             )}

// //           </div>

// //           {/* RIGHT */}
// //           <div className="bg-gray-100 p-3 rounded">
// //             <h2 className="font-bold mb-2">Tasks</h2>

// //             {tasks.map((task, index) => (
// //               <div
// //                 key={index}
// //                 className={`p-2 text-sm ${
// //                   index === taskIndex
// //                     ? "font-bold text-black"
// //                     : "text-gray-400"
// //                 }`}
// //               >
// //                 {index + 1}. {task}
// //               </div>
// //             ))}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import initSqlJs from "sql.js";

// export default function Home() {
//   const [db, setDb] = useState(null);
//   const [query, setQuery] = useState("SELECT * FROM movies;");
//   const [result, setResult] = useState([]);
//   const [taskIndex, setTaskIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved) setTheme(saved);
//   }, []);

//   const changeTheme = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const tasks = [
//     "SELECT title FROM movies;",
//     "SELECT director FROM movies;",
//     "SELECT title, director FROM movies;",
//     "SELECT title, year FROM movies;",
//     "SELECT * FROM movies;",
//     "SELECT title FROM movies WHERE year > 1998;",
//     "SELECT director, COUNT(*) FROM movies GROUP BY director;",
//     "SELECT * FROM movies ORDER BY year DESC;",
//     "SELECT * FROM movies LIMIT 2;",
//     "SELECT title FROM movies WHERE director = 'John Lasseter';"
//   ];

//   useEffect(() => {
//     const loadDB = async () => {
//       const SQL = await initSqlJs({
//         locateFile: () => "/sql-wasm.wasm"
//       });

//       const database = new SQL.Database();

//       database.run(`
//         CREATE TABLE movies (
//           id INTEGER,
//           title TEXT,
//           director TEXT,
//           year INTEGER,
//           length_minutes INTEGER
//         );
//       `);

//       database.run(`
//         INSERT INTO movies VALUES
//         (1, 'Toy Story', 'John Lasseter', 1995, 81),
//         (2, 'A Bug''s Life', 'John Lasseter', 1998, 95),
//         (3, 'Toy Story 2', 'John Lasseter', 1999, 93),
//         (4, 'Monsters, Inc.', 'Pete Docter', 2001, 92);
//       `);

//       setDb(database);
//     };

//     loadDB();
//   }, []);

//   const runQuery = () => {
//     if (!db) return;

//     try {
//       const res = db.exec(query);

//       if (res.length > 0) {
//         setResult(res[0]);

//         // check answer
//         if (query.trim().toLowerCase() === tasks[taskIndex].toLowerCase()) {
//           const nextIndex = taskIndex + 1;
//           setTaskIndex(nextIndex);

//           // 🔥 unlock subscription after 5 tasks
//           if (nextIndex === 5) {
//             setShowModal(true);
//           }
//         }
//       }
//     } catch (err) {
//       alert("SQL Error: " + err.message);
//     }
//   };

//   // return (
//   //   <div className="min-h-screen text-black bg-gray-200 p-6">
//   //     <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">

//   //       <div className="grid grid-cols-3 gap-4">

//   //         {/* LEFT */}
//   //         <div className="col-span-2">
//   //           <textarea
//   //             value={query}
//   //             onChange={(e) => setQuery(e.target.value)}
//   //             className="w-full h-32 p-3 border rounded font-mono"
//   //           />

//   //           <button
//   //             onClick={runQuery}
//   //             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//   //           >
//   //             Run Query
//   //           </button>

//   //           {/* Result */}
//   //           {result.columns && (
//   //             <table className="mt-4 w-full border text-sm">
//   //               <thead>
//   //                 <tr>
//   //                   {result.columns.map((col, i) => (
//   //                     <th key={i} className="border p-2">{col}</th>
//   //                   ))}
//   //                 </tr>
//   //               </thead>
//   //               <tbody>
//   //                 {result.values.map((row, i) => (
//   //                   <tr key={i}>
//   //                     {row.map((val, j) => (
//   //                       <td key={j} className="border p-2">{val}</td>
//   //                     ))}
//   //                   </tr>
//   //                 ))}
//   //               </tbody>
//   //             </table>
//   //           )}
//   //         </div>

//   //         {/* RIGHT */}
//   //         <div className="bg-gray-100 p-3 rounded">
//   //           <h2 className="font-bold mb-2">Tasks</h2>

//   //           {tasks.map((task, index) => (
//   //             <div
//   //               key={index}
//   //               className={`p-2 text-sm ${
//   //                 index === taskIndex
//   //                   ? "font-bold text-black"
//   //                   : index < taskIndex
//   //                   ? "text-green-600"
//   //                   : "text-gray-400"
//   //               }`}
//   //             >
//   //               {index + 1}. {task}
//   //             </div>
//   //           ))}
//   //         </div>

//   //       </div>
//   //     </div>

//   //     {/* 🔥 Subscription Modal */}
//   //     {showModal && (
//   //       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//   //         <div className="bg-white p-6 rounded shadow-lg text-center">
//   //           <h2 className="text-xl font-bold mb-2">Unlock Premium 🚀</h2>
//   //           <p className="mb-4">
//   //             You've completed 5 tasks! Subscribe to continue learning advanced SQL & Data Analytics.
//   //           </p>
//   //           <button
//   //             onClick={() => setShowModal(false)}
//   //             className="px-4 py-2 bg-blue-500 text-white rounded"
//   //           >
//   //             Continue
//   //           </button>
//   //         </div>
//   //       </div>
//   //     )}
//   //   </div>
//   // );

//   return (
//   <div className={`min-h-screen p-6 ${
//   theme === "dark"
//     ? "bg-[#0f172a] text-gray-200"
//     : theme === "night"
//     ? "bg-black text-gray-400"
//     : "bg-white text-red-900"
// }`}>

//   <div className="flex gap-2 mb-4">
//   <button onClick={() => changeTheme("dark")} className="px-3 py-1 bg-blue-500 rounded">Dark</button>
//   {/* <button onClick={() => changeTheme("night")} className="px-3 py-1 bg-gray-800 rounded">Night</button> */}
//   <button onClick={() => changeTheme("light")} className="px-3 py-1 bg-red-500 rounded">Light</button>
// </div>
//     <div className="max-w-6xl mx-auto">

//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-4 text-blue-400">
//         DataBolt ⚡
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         {/* LEFT PANEL */}
//         <div className="col-span-2 space-y-4">

//           {/* Query Editor */}
//           <div className="bg-[#111827] p-4 rounded-xl border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.2),inset_0_0_10px_rgba(59,130,246,0.05)]">
//             <p className="text-sm text-gray-400 mb-2">SQL Editor</p>

//             <textarea
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full h-36 p-3 rounded bg-[#020617] text-green-400 font-mono border border-gray-700 focus:outline-none"
//             />

//             <button
//               onClick={runQuery}
//               className="mt-3 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
//             >
//               Run Query ▶
//             </button>
//           </div>

//           {/* Result Table */}
//           {result.columns && (
//             <div className="bg-[#111827] p-4 rounded-xl border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.2),inset_0_0_10px_rgba(59,130,246,0.05)]">
//               <p className="text-sm text-gray-400 mb-2">Result</p>

//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-gray-700 text-gray-300">
//                     {result.columns.map((col, i) => (
//                       <th key={i} className="p-2 text-left">{col}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {result.values.map((row, i) => (
//                     <tr key={i} className="border-b border-gray-800">
//                       {row.map((val, j) => (
//                         <td key={j} className="p-2 text-gray-400">{val}</td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="bg-[#111827] p-4 rounded-xl border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.2),inset_0_0_10px_rgba(59,130,246,0.05)]">
//           <h2 className="font-semibold mb-3 text-blue-400">Tasks</h2>

//           {tasks.map((task, index) => (
//             <div
//               key={index}
//               className={`p-2 text-sm rounded mb-1 ${
//                 index === taskIndex
//                   ? "bg-blue-500/20 text-blue-400"
//                   : index < taskIndex
//                   ? "text-green-400"
//                   : "text-gray-500"
//               }`}
//             >
//               {index + 1}. {task}
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>

//     {/* Modal */}
//     {showModal && (
//       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//         <div className="bg-[#111827] p-6 rounded-xl text-center border border-gray-700">
//           <h2 className="text-xl font-bold text-blue-400 mb-2">
//             Premium Unlocked 🚀
//           </h2>
//           <p className="text-gray-400 mb-4">
//             You've completed 5 tasks. Upgrade to continue your journey.
//           </p>
//           <button
//             onClick={() => setShowModal(false)}
//             className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );
// }

"use client";

import { useEffect, useState } from "react";
import initSqlJs from "sql.js";

export default function Home() {
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState("SELECT * FROM movies;");
  const [result, setResult] = useState([]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");

  const tasks = [
    "SELECT title FROM movies;",
    "SELECT director FROM movies;",
    "SELECT title, director FROM movies;",
    "SELECT title, year FROM movies;",
    "SELECT * FROM movies;",
    "SELECT title FROM movies WHERE year > 1998;",
    "SELECT director, COUNT(*) FROM movies GROUP BY director;",
    "SELECT * FROM movies ORDER BY year DESC;",
    "SELECT * FROM movies LIMIT 2;",
    "SELECT title FROM movies WHERE director = 'John Lasseter';"
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

        if (query.trim().toLowerCase() === tasks[taskIndex].toLowerCase()) {
          const next = taskIndex + 1;
          setTaskIndex(next);

          if (next === 5) setShowModal(true);
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const themeWrapper =
    theme === "light"
      ? "bg-white text-red-900"
      // : theme === "night"
      // ? "bg-black text-gray-400"
      : "bg-[#0f172a] text-gray-200";

  const cardTheme =
    theme === "light"
      ? "card-light"
      // : theme === "night"
      // ? "card-night"
      : "card-dark";

  return (
    <div className={`min-h-screen p-6 ${themeWrapper}`}>
      <div className="max-w-6xl mx-auto">

        {/* Theme Switch */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => changeTheme("light")} className="px-3 py-1 text-white font-bold bg-red-400 rounded">Light</button>
          <button onClick={() => changeTheme("dark")} className="px-3 py-1 text-white font-bold bg-gray-500 rounded">Dark</button>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="col-span-2 space-y-4">

            {/* Editor */}
            <div className={`p-4 rounded-xl ${cardTheme}`}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full h-36 p-3 rounded border border-red-100 text-red-400 font-mono`}
              />
              <button
                onClick={runQuery}
                className="mt-3 px-4 py-2 text-white font-bold bg-red-500 rounded"
              >
                Run Query ▶
              </button>
            </div>

            {/* Result */}
            {result.columns && (
              <div className={`p-4 rounded-xl ${cardTheme}`}>
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
            )}
          </div>

          {/* RIGHT */}
          <div className={`p-4 rounded-xl ${cardTheme}`}>
            <h2 className="mb-2 font-bold">Tasks</h2>

            {tasks.map((task, i) => (
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
                {i + 1}. {task}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="p-6 bg-[#111827] rounded-xl text-center">
            <h2 className="text-xl mb-2">Premium Unlock 🚀</h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-500 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}