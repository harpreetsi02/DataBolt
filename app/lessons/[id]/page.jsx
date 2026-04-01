import { lessons } from "@/data/lessons";
import { lessonContent } from "@/data/lessonContent";
import NextLessonButton from "@/components/NextLessonButton";

export default async function LessonPage({ params }) {
  const { id } = await params;

  const lesson = lessonContent[id];

  if (!lesson) {
    return <div className="text-white p-10">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

        {/* CHAPTER TITLE */}
        <div className="max-w-4xl md:max-w-5xl bg-gray-900/60 border-t-4 rounded-xl border-red-500 p-4 mx-auto">

            <p className="text-sm font-bold text-red-500 mb-2">CHAPTER {id}</p>

            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {lesson.title} <span className="text-red-500">{lesson.highlight}</span>
            </h1>

            <p className="text-gray-500 mb-6">
              {lesson.subtitle}
            </p>

            {/* IN THIS CHAPTER */}
            <div className="mb-8">
              <h3 className="font-semibold text-red-500 mb-2 border-b pb-2">
                IN THIS CHAPTER
              </h3>

              <ul className="list-disc border-b border-red-500 pb-5 pl-5 space-y-1 text-gray-300">
                {lesson.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            {/* SECTION */}
            {lesson.blocks.map((block, i) => {
                if (block.type === "query") {
                    return (
                        <div key={i} className="mb-8">
                            <h2 className="text-xl font-semibold text-red-500 mb-3">
                              {block.heading}
                            </h2>

                            <p className="text-gray-300 mb-4">
                              {block.subtitle}
                            </p>

                            {/* CODE BLOCK */}
                            <div className="bg-gray-900 text-gray-400 p-4 rounded-lg overflow-x-auto text-sm">
                                <pre>
                                    {block.code}
                                </pre>
                            </div>

                            <p className="text-gray-300 mt-4">
                              {block.explanation}
                            </p>
                        </div>
                    );
                }

                // TABLE
                if (block.type === "table") {
                    return (
                        <div key={i} className="mb-8">
                          <h2 className="text-xl font-semibold text-red-500 mb-3">
                            <i className="ri-git-repository-line p-2"></i>Table: {block.title}
                          </h2>
                        
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm whitespace-nowrap">
                              <thead className="bg-gray-300 text-gray-800">
                                <tr className="py-10">
                                  {block.headers.map((h, j) => (
                                    <th key={j} className="p-2.5 border">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              
                              <tbody>
                                {block.rows.map((row, j) => (
                                  <tr key={j} className="odd:bg-gray-800">
                                    {row.map((cell, k) => (
                                      <td key={k} className="px-2.5 py-2 border">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                    );
                }

                if (block.type === "summaryTable") {
                    return (
                        <div key={i} className="mb-8">
                          <h2 className="text-xl font-semibold text-red-500 mb-3">
                            {block.title}
                          </h2>
                        
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm whitespace-nowrap">
                              <thead className="bg-gray-300 text-gray-800">
                                <tr className="py-10">
                                  {block.headers.map((h, j) => (
                                    <th key={j} className="p-2.5 border">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              
                              <tbody>
                                {block.rows.map((row, j) => (
                                  <tr key={j} className="odd:bg-gray-800">
                                    {row.map((cell, k) => (
                                      <td key={k} className="px-2.5 py-2 border">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                    );
                }

                if (block.type === "note") {
                  return (
                    <div key={i} className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                        <p className="text-sm text-yellow-800">
                        💡 <span className="font-bold text-yellow-900">{block.heading}</span> {block.explanation}
                        </p>
                    </div>
                  );
                }
            })}    
        </div>
        <NextLessonButton currentId={id} lesson={lesson} />
    </div>
  );
}


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
//                       {/* {value} */}
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
//     </div>
//   );
// }