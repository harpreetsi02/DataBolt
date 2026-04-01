import initSqlJs from "sql.js";
import { dbTables } from "@/data/dbTables";

let db = null;

export async function getDB() {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: () => "/sql-wasm.wasm"
  });

  db = new SQL.Database();

  // Dynamic table creation
  Object.entries(dbTables).forEach(([tableName, table]) => {

    const columns = table.headers
      .map((h) => `${h} TEXT`)
      .join(",");

    db.run(`CREATE TABLE ${tableName} (${columns});`);

    table.rows.forEach((row) => {
      const values = row
        .map((v) => (v === null ? "NULL" : `'${v}'`))
        .join(",");

      db.run(`INSERT INTO ${tableName} VALUES (${values});`);
    });

  });

  return db;
}