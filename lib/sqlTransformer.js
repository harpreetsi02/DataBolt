export function transformQuery(query) {
  let q = query;

  const numericColumns = ["price", "salary", "total"]; // ✅ yahan hona chahiye

  // normalize spaces (IMPORTANT)
  q = q.replace(/\s+/g, " ");

  // -------------------------
  // CURRENT DATE/TIME
  // -------------------------
  q = q.replace(/\bNOW\(\)/gi, "datetime('now')");
  q = q.replace(/\bCURDATE\(\)/gi, "date('now')");
  q = q.replace(/\bCURTIME\(\)/gi, "time('now')");

  // -------------------------
  // DATE PARTS
  // -------------------------
  q = q.replace(/\bYEAR\((.*?)\)/gi, (_, p1) => {
    return `CAST(strftime('%Y', ${p1}) AS INTEGER)`;
  });

  q = q.replace(/\bMONTH\((.*?)\)/gi, (_, p1) => {
    return `CAST(strftime('%m', ${p1}) AS INTEGER)`;
  });

  q = q.replace(/\bDAY\((.*?)\)/gi, (_, p1) => {
    return `CAST(strftime('%d', ${p1}) AS INTEGER)`;
  });

  // -------------------------
  // MONTHNAME / DAYNAME
  // -------------------------
  q = q.replace(/\bMONTHNAME\((.*?)\)/gi, (_, p1) => {
    return `strftime('%m', ${p1})`;
  });

  q = q.replace(/\bDAYNAME\((.*?)\)/gi, (_, p1) => {
    return `strftime('%w', ${p1})`;
  });

  // -------------------------
  // DATE_ADD (flexible spacing)
  // -------------------------
  q = q.replace(
    /\bDATE_ADD\(\s*(.*?)\s*,\s*INTERVAL\s*(\d+)\s*DAY\s*\)/gi,
    (_, date, num) => `date(${date}, '+${num} day')`
  );

  // -------------------------
  // DATE_SUB
  // -------------------------
  q = q.replace(
    /\bDATE_SUB\(\s*(.*?)\s*,\s*INTERVAL\s*(\d+)\s*DAY\s*\)/gi,
    (_, date, num) => `date(${date}, '-${num} day')`
  );

  // -------------------------
  // DATEDIFF
  // -------------------------
  q = q.replace(
    /\bDATEDIFF\s*\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/gi,
    (_, d1, d2) => {
      return `(julianday(${d1}) - julianday(${d2}))`;
    }
  );

  // -------------------------
  // DAYOFWEEK
  // -------------------------
  q = q.replace(/\bDAYOFWEEK\((.*?)\)/gi, (_, p1) => {
    return `CAST(strftime('%w', ${p1}) AS INTEGER)`;
  });

  // -------------------------
  // TIMESTAMPDIFF (basic support)
  // -------------------------
  q = q.replace(
    /\bTIMESTAMPDIFF\(\s*YEAR\s*,\s*(.*?)\s*,\s*(.*?)\s*\)/gi,
    (_, d1, d2) =>
      `CAST((julianday(${d2}) - julianday(${d1})) / 365 AS INTEGER)`
  );

  // 🔥 auto-fix numeric comparisons for known columns
  if (!q.toLowerCase().startsWith("update")) {
  numericColumns.forEach((col) => {
    const regex = new RegExp(`(\\b\\w+\\.)?${col}\\b\\s*([<>=]+)\\s*(\\d+)`, "gi");

    q = q.replace(regex, (_, prefix = "", op, num) => {
      return `CAST(${prefix}${col} AS INTEGER) ${op} ${num}`;
    });
  });
}

  return q.trim();
}