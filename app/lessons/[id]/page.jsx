import { lessons } from "@/data/lessons";
import { lessonContent } from "@/data/lessonContent";
import SqlEditor from "@/components/SqlEditor";
import NextLessonButton from "@/components/NextLessonButton";
import QueryTable from "@/components/QueryTable";

export default async function LessonPage({ params }) {
  const { id } = await params;

  const lesson = lessonContent[id];

  if (!lesson) {
    return <div className="text-white p-10">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">

        {/* CHAPTER TITLE */}
        <div className="max-w-4xl md:max-w-5xl relative bg-gray-900/60 border-t-4 rounded-xl border-red-500 p-4 mx-auto">

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

                if (block.type === "queryTable") {
                  return (
                    <div key={i} className="mb-8">
                      <h2 className="text-xl font-semibold text-red-500 mb-3">
                        {block.title}
                      </h2>
                
                      <p className="text-gray-300 mb-4">
                        {block.subtitle}
                      </p>
                
                      <p className="text-red-500 flex items-center gap-2">
                        <i className="ri-send-plane-2-fill"></i>
                        {block.queryName}
                      </p>
                
                      {/* CODE */}
                      <div className="bg-gray-900 md:w-4/5 ml-5 mb-10 text-gray-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <pre>{block.code}</pre>
                      </div>
                
                      {/* ✅ RESULT TABLE */}
                      <QueryTable query={block.code} />
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
                                  {block.data.headers.map((h, j) => (
                                    <th key={j} className="p-2.5 border">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              
                              <tbody>
                                {block.data.rows.map((row, j) => (
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
                                  <tr key={j} className="odd:bg-gray-800 text-center">
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

                if (block.type === "exercise") {
                    return (
                        <div key={i} className="mt-6">
                            <h2 className="text-xl absolute right-5 font-bold top-5 text-red-500">Exercise 👇</h2>

                            <h3 className="font-bold mb-2 text-xl text-red-500">
                                Exercise:
                            </h3>

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

                if (block.type === "multipleTable") {           
                  const tables = Array.isArray(block.data)
                    ? block.data
                    : [{ title: block.title, data: block.data }];

                  return (
                    <div key={i} className="my-10 overflow-hidden bg-gray-900 rounded-xl">
                        <h2 className="text-center bg-red-500 text-white text-2xl font-bold py-3">Included Tables in Exercise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
                      {tables.map((table, idx) => (
                        <div className="" key={idx}>
                        
                          <h2 className="text-xl font-semibold text-green-500 mb-3">
                            <i className="ri-git-repository-line p-2"></i>
                            Table: {table.title}
                          </h2>
                    
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm whitespace-nowrap">
                    
                              <thead className="bg-green-300 text-gray-800">
                                <tr>
                                  {table.data.headers.map((h, j) => (
                                    <th key={j} className="p-2.5 border">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              
                              <tbody>
                                {table.data.rows.map((row, j) => (
                                  <tr key={j} className="odd:bg-green-400/10">
                                    {row.map((cell, k) => (
                                      <td key={k} className="px-2.5 py-2 border">
                                        {cell === null ? "NULL" : cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            
                            </table>
                          </div>
                            
                        </div>
                      ))}
                    </div>
                    </div>
                  );
                }

                if (block.type === "noteGreen") {
                  return (
                    <div key={i} className="bg-green-100 border-l-4 mb-5 border-green-600 p-4 rounded">
                        <p className="text-sm text-green-800">
                        ✅ <span className="font-bold text-green-900">{block.heading}</span> {block.explanation}
                        </p>
                    </div>
                  );
                }

                if (block.type === "noteBlue") {
                  return (
                    <div key={i} className="bg-blue-100 border-l-4 mb-5 border-blue-600 p-4 rounded">
                        <p className="text-sm text-blue-800">
                        🌟 <span className="font-bold text-blue-900">{block.heading}</span> {block.explanation}
                        </p>
                    </div>
                  );
                }

                if (block.type === "noteRed") {
                  return (
                    <div key={i} className="bg-red-100 border-l-4 mb-5 border-red-600 p-4 rounded">
                        <p className="text-sm text-red-800">
                        ❌ <span className="font-bold text-red-900">{block.heading}</span> {block.explanation}
                        </p>
                    </div>
                  );
                }

                if (block.type === "note") {
                  return (
                    <div key={i} className="bg-yellow-100 border-l-4 mb-5 border-yellow-600 p-4 rounded">
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