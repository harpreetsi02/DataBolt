// export function transformQuery(query) {
//   let q = query;

//   // CURRENT DATE/TIME
//   q = q.replace(/NOW\(\)/gi, "datetime('now')");
//   q = q.replace(/CURDATE\(\)/gi, "date('now')");
//   q = q.replace(/CURTIME\(\)/gi, "time('now')");

//   // DATE PARTS
//   q = q.replace(/YEAR\((.*?)\)/gi, "strftime('%Y', $1)");
//   q = q.replace(/MONTH\((.*?)\)/gi, "strftime('%m', $1)");
//   q = q.replace(/DAY\((.*?)\)/gi, "strftime('%d', $1)");

//   // MONTHNAME / DAYNAME (IMPORTANT → alias force)
//   q = q.replace(/MONTHNAME\((.*?)\)/gi, "strftime('%m', $1) AS monthname");
//   q = q.replace(/DAYNAME\((.*?)\)/gi, "strftime('%w', $1) AS dayname");

//   // DATE ADD / SUB
//   q = q.replace(
//     /DATE_ADD\((.*?),\s*INTERVAL\s*(\d+)\s*DAY\)/gi,
//     "date($1, '+' || $2 || ' day')"
//   );

//   q = q.replace(
//     /DATE_SUB\((.*?),\s*INTERVAL\s*(\d+)\s*DAY\)/gi,
//     "date($1, '-' || $2 || ' day')"
//   );

//   // DATEDIFF
//   q = q.replace(
//     /DATEDIFF\((.*?),(.*?)\)/gi,
//     "CAST(julianday($1) - julianday($2) AS INTEGER)"
//   );

//   return q;
// }

export function transformQuery(query) {
  let q = query;

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
    /\bDATEDIFF\(\s*(.*?)\s*,\s*(.*?)\s*\)/gi,
    (_, d1, d2) =>
      `CAST(julianday(${d1}) - julianday(${d2}) AS INTEGER)`
  );

  // -------------------------
  // TIMESTAMPDIFF (basic support)
  // -------------------------
  q = q.replace(
    /\bTIMESTAMPDIFF\(\s*YEAR\s*,\s*(.*?)\s*,\s*(.*?)\s*\)/gi,
    (_, d1, d2) =>
      `CAST((julianday(${d2}) - julianday(${d1})) / 365 AS INTEGER)`
  );

  return q.trim();
}