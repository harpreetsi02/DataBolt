import NextLessonButton from "@/components/NextLessonButton";
import { lessons } from "@/data/lessons";

export default async function LessonPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

      {/* CHAPTER TITLE */}
      <div className="max-w-5xl bg-gray-900/60 border-t-4 rounded-xl border-red-500 p-4 mx-auto">

        <p className="text-sm font-bold text-red-500 mb-2">CHAPTER {id}</p>

        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          What is <span className="text-red-600">SQL?</span>
        </h1>

        <p className="text-gray-500 mb-6">
          And why is it one of the most valuable skills you can learn in tech?
        </p>

        {/* IN THIS CHAPTER */}
        <div className="mb-8">
          <h3 className="font-semibold text-red-500 mb-2 border-b pb-2">
            IN THIS CHAPTER
          </h3>

          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>What a database is and why every app needs one</li>
            <li>The difference between a database, table, row, and column</li>
            <li>Why SQL has remained the #1 data language</li>
            <li>Key terminology you will use throughout your career</li>
          </ul>
        </div>

        {/* SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            Every App You Love Runs on a Database
          </h2>

          <p className="text-gray-300 mb-4">
            When you scroll Instagram, the app sends a SQL query that looks something like:
          </p>

          {/* CODE BLOCK */}
          <div className="bg-gray-900 text-gray-400 p-4 rounded-lg overflow-x-auto text-sm">
            <pre>
{`SELECT post_id, image_url, caption, like_count
FROM posts
WHERE user_id IN (
    SELECT following_id FROM follows WHERE follower_id = ?
)
ORDER BY created_at DESC
LIMIT 20;`}
            </pre>
          </div>

          <p className="text-gray-300 mt-4">
            This query runs millions of times per second at scale. SQL is the universal language of data.
          </p>
        </div>

        {/* TABLE */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            Key Terminology
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-2 border">Term</th>
                  <th className="p-2 border">What It Means</th>
                  <th className="p-2 border">Real-World Analogy</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-2 border">Database</td>
                  <td className="p-2 border">A container holding all related tables</td>
                  <td className="p-2 border">All of Swiggy's data - users, restaurants, orders</td>
                </tr>

                <tr>
                  <td className="p-2 border">Table</td>
                  <td className="p-2 border">One entity stored as rows + columns</td>
                  <td className="p-2 border">The "orders" spreadsheet inside Swiggy's database</td>
                </tr>

                <tr>
                  <td className="p-2 border">Row / Record</td>
                  <td className="p-2 border">One entry in a table</td>
                  <td className="p-2 border">A single order placed by Ananya</td>
                </tr>

                <tr>
                  <td className="p-2 border">Column / Field</td>
                  <td className="p-2 border">One attribute of each row</td>
                  <td className="p-2 border">The "total_amount" column in the orders table</td>
                </tr>

                <tr>
                  <td className="p-2 border">Primary Key</td>
                  <td className="p-2 border">Unique ID - no two rows share it</td>
                  <td className="p-2 border">Your Aadhaar number</td>
                </tr>

                <tr>
                  <td className="p-2 border">Foreign Key</td>
                  <td className="p-2 border">A column that links to another table's primary key</td>
                  <td className="p-2 border">order.customer_id <i className="ri-arrow-right-line"></i> customer.customer_id</td>
                </tr>

                <tr>
                  <td className="p-2 border">Query</td>
                  <td className="p-2 border">A SQL statement asking a question or giving a command</td>
                  <td className="p-2 border">SELECT name FROM employees WHERE salary <i className="ri-arrow-right-s-line"></i> 7000</td>
                </tr>

                <tr>
                  <td className="p-2 border">Schema</td>
                  <td className="p-2 border">The structure definition of a database</td>
                  <td className="p-2 border">The blueprint listing all tables and their columns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FINAL NOTE */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-yellow-800">
            💡 <span className="font-bold text-yellow-900">Engineering Insight:</span> At Google, databases can have tables with trillions of rows annd schemas with hundreds of tables. Yet the SQL you write today is the same SQL engineers write at Google - the language scales from 8 rows to 8 trillion.
          </p>
        </div>

      </div>
      <NextLessonButton currentId={id} lesson={lessons[id]} />
    </div>
  );
}


// import NextLessonButton from "@/components/NextLessonButton";
// import { lessonContent } from "@/data/lessonContent";

// export default async function LessonPage({ params }) {
//   const { id } = await params;

//   const lesson = lessonContent[id];

//   if (!lesson) {
//     return <div className="text-white p-10">Lesson not found</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-black text-white px-4 md:px-10 py-10">

//       <div className="max-w-5xl bg-gray-900/60 border-t-4 rounded-xl border-red-500 p-4 mx-auto">

//         {/* TITLE */}
//         <p className="text-sm font-bold text-red-500 mb-2">CHAPTER {id}</p>

//         <h1 className="text-3xl md:text-5xl font-bold mb-2">
//           {lesson.title}
//         </h1>

//         <p className="text-gray-500 mb-6">
//           {lesson.subtitle}
//         </p>

//         {/* POINTS */}
//         <div className="mb-8">
//           <h3 className="font-semibold text-red-500 mb-2 border-b pb-2">
//             IN THIS CHAPTER
//           </h3>

//           <ul className="list-disc pl-5 space-y-1 text-gray-300">
//             {lesson.points.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </div>

//         {/* CONDITION BASED UI */}

//         {/* CHAPTER 1 (Theory UI) */}
//         {lesson.type === "theory" && (
//           <>
//             <div className="bg-gray-900 p-4 rounded-xl mb-6">
//               <p className="text-gray-300">
//                 SQL is used to communicate with databases and manage data.
//               </p>
//             </div>
//           </>
//         )}

//         {/* CHAPTER 2 (Tables UI) */}
//         {lesson.type === "tables" && (
//           <div className="space-y-8">

//             {Object.entries(lesson.tables).map(([name, table]) => (
//               <div key={name}>
//                 <h2 className="font-bold mb-2">Table: {name}</h2>

//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead className="bg-gray-900">
//                       <tr>
//                         {table.headers.map((h, i) => (
//                           <th key={i} className="p-2 border">{h}</th>
//                         ))}
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {table.rows.map((row, i) => (
//                         <tr key={i} className="odd:bg-gray-800">
//                           {row.map((cell, j) => (
//                             <td key={j} className="p-2 border">{cell}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}

//           </div>
//         )}


//       </div>
//         <NextLessonButton currentId={id} lesson={lesson} />
//     </div>
//   );
// }


// import NextLessonButton from "@/components/NextLessonButton";
// import { lessonContent } from "@/data/lessonContent";

// export default async function LessonPage({ params }) {
//   const { id } = await params;

//   const lesson = lessonContent[id];

//   if (!lesson) {
//     return <div className="text-white p-10">Lesson not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

//       <div className="max-w-5xl bg-gray-900/60 border-t-4 rounded-xl border-red-500 p-4 mx-auto">

//         {/* TITLE */}
//         <h1 className="text-3xl md:text-5xl font-bold mb-2">
//           {lesson.title}
//         </h1>

//         <p className="text-gray-500 mb-6">
//           {lesson.subtitle}
//         </p>

//         {/* 🔥 BLOCK RENDERING */}
//         <div className="space-y-6">

//           {lesson.blocks.map((block, i) => {

//             // TEXT
//             if (block.type === "text") {
//               return (
//                 <p key={i} className="text-gray-300">
//                   {block.value}
//                 </p>
//               );
//             }

//             // CARD
//             if (block.type === "card") {
//               return (
//                 <div key={i} className="bg-gray-900 p-4 rounded-xl border-l-4 border-red-500">
//                   <h2 className="font-bold text-red-500 mb-2">
//                     {block.title}
//                   </h2>
//                   <p className="text-gray-300">
//                     {block.value}
//                   </p>
//                 </div>
//               );
//             }

//             // GRID
//             if (block.type === "grid") {
//               return (
//                 <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {block.items.map((item, j) => (
//                     <div key={j} className="bg-gray-900 p-4 rounded-xl text-center">
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               );
//             }

//             // TABLE
//             if (block.type === "table") {
//               return (
//                 <div key={i}>
//                   <h2 className="font-bold mb-2">
//                     Table: {block.title}
//                   </h2>

//                   <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                       <thead className="bg-gray-900">
//                         <tr>
//                           {block.headers.map((h, j) => (
//                             <th key={j} className="p-2 border">{h}</th>
//                           ))}
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {block.rows.map((row, j) => (
//                           <tr key={j} className="odd:bg-gray-800">
//                             {row.map((cell, k) => (
//                               <td key={k} className="p-2 border">{cell}</td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               );
//             }

//           })}

//         </div>

//       </div>
//       <NextLessonButton currentId={id} lesson={lesson} />
//     </div>
//   );
// }