(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.IRACompliance = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function normalizeName(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function nameTokens(value) {
    return normalizeName(value).split(" ").filter(Boolean);
  }

  function namesMatch(workerName, apprenticeName) {
    const worker = nameTokens(workerName);
    const apprentice = nameTokens(apprenticeName);
    if (!worker.length || !apprentice.length) return false;
    if (worker.join(" ") === apprentice.join(" ")) return true;
    const short = worker.length <= apprentice.length ? worker : apprentice;
    const long = worker.length <= apprentice.length ? apprentice : worker;
    return short.length >= 2 && short.every((token) => long.includes(token));
  }

  function matchingApprentice(workerName, apprentices = []) {
    return apprentices.find((apprentice) => apprentice.active !== false && namesMatch(workerName, apprentice.name)) || null;
  }

  function calculate(job, apprentices = []) {
    const sourceRoster = Array.isArray(job?.iraRoster) ? job.iraRoster : job?.roster;
    const roster = Array.isArray(sourceRoster) ? sourceRoster.filter((worker) => worker?.name) : [];
    const minimumPercent = Number(job?.iraMinimumPercent ?? 15);
    const maximumPercent = Number(job?.iraMaximumPercent ?? 20);
    const apprenticeWorkers = roster.filter((worker) => matchingApprentice(worker.name, apprentices));
    const workerCount = roster.length;
    const apprenticeCount = apprenticeWorkers.length;
    const percentage = workerCount ? (apprenticeCount / workerCount) * 100 : 0;
    const minimumCount = workerCount ? Math.ceil((workerCount * minimumPercent) / 100) : 0;
    const maximumCount = workerCount ? Math.floor((workerCount * maximumPercent) / 100) : 0;
    let status = "needs-roster";
    if (workerCount) {
      if (percentage < minimumPercent) status = "below";
      else if (percentage > maximumPercent) status = "above";
      else status = "compliant";
    }
    return {
      workerCount,
      apprenticeCount,
      percentage,
      minimumPercent,
      maximumPercent,
      minimumCount,
      maximumCount,
      status,
      apprenticeWorkers
    };
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;
    for (let index = 0; index < String(text || "").length; index += 1) {
      const char = text[index];
      const next = text[index + 1];
      if (char === '"' && quoted && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(field.trim());
        field = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(field.trim());
        if (row.some(Boolean)) rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
    row.push(field.trim());
    if (row.some(Boolean)) rows.push(row);
    if (rows.length < 2) return [];
    const headers = rows[0].map((header) => normalizeName(header));
    return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
  }

  return { normalizeName, namesMatch, matchingApprentice, calculate, parseCsv };
});
