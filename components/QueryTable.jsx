"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/initDB";
import { transformQuery } from "@/lib/sqlTransformer";

export default function QueryTable({ query }) {
  const [result, setResult] = useState(null);

  const monthNames = [
    "", "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

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
        // const res = db.exec(query);
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
                  {/* {cell === null ? "NULL" : cell} */}
                  {formatValue(cell, result.columns[j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}