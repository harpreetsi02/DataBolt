"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/initDB";

export default function QueryTable({ query }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const run = async () => {
      const db = await getDB();

      try {
        const res = db.exec(query);
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
    <div className="overflow-x-auto">
      <h2 className="flex gap-2 text-red-300 font-bold"><i className="ri-file-marked-fill font-medium"></i>Result:</h2>
      <table className="w-full text-sm whitespace-nowrap">
        <thead className="bg-red-300 text-gray-900">
          <tr>
            {result.columns.map((col, i) => (
              <th key={i} className="p-2.5 border">{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {result.values.map((row, i) => (
            <tr key={i} className="odd:bg-red-600/20 text-center">
              {row.map((cell, j) => (
                <td key={j} className="px-2.5 py-2 border">
                  {cell === null ? "NULL" : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}