(function foundationProgressModule(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.FoundationProgress = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createFoundationProgress() {
  const STATUSES = ["Not Started", "Started", "Bottom", "Top", "Pedestal", "Completed"];
  const UPDATE_ROLES = ["Admin", "Foreman", "Approver", "Quality"];

  function validStatus(status) {
    return STATUSES.includes(status) ? status : STATUSES[0];
  }

  function nextStatus(status) {
    const index = STATUSES.indexOf(validStatus(status));
    return STATUSES[Math.min(index + 1, STATUSES.length - 1)];
  }

  function canAdvance(status) {
    return validStatus(status) !== "Completed";
  }

  function clampCoordinate(value) {
    return Math.max(0, Math.min(1, Number(value) || 0));
  }

  function positionFromClient(rect, clientX, clientY) {
    const width = Number(rect?.width) || 1;
    const height = Number(rect?.height) || 1;
    return {
      x: clampCoordinate((Number(clientX) - (Number(rect?.left) || 0)) / width),
      y: clampCoordinate((Number(clientY) - (Number(rect?.top) || 0)) / height)
    };
  }

  function mergeDeletedHotspotIds(...lists) {
    return [...new Set(lists.flatMap((list) => Array.isArray(list) ? list : []).map((id) => String(id || "").trim()).filter(Boolean))];
  }

  function excludeDeletedHotspots(hotspots = [], deletedIds = []) {
    const deleted = new Set(mergeDeletedHotspotIds(deletedIds));
    return (Array.isArray(hotspots) ? hotspots : []).filter((hotspot) => !deleted.has(String(hotspot?.id || hotspot?.foundationId || "")));
  }

  function counts(foundations = []) {
    return foundations.reduce(
      (totals, foundation) => {
        totals.total += 1;
        totals[validStatus(foundation.status)] += 1;
        return totals;
      },
      { total: 0, "Not Started": 0, Started: 0, Bottom: 0, Pedestal: 0, Top: 0, Completed: 0 }
    );
  }

  function transition(foundations, foundationId, requestedStatus, metadata = {}) {
    const foundation = foundations.find((entry) => entry.id === foundationId || entry.foundationId === foundationId);
    if (!foundation) return { changed: false, reason: "missing" };
    const previousStatus = validStatus(foundation.status);
    const newStatus = validStatus(requestedStatus);
    if (previousStatus === newStatus) return { changed: false, reason: "unchanged", foundation };
    const at = metadata.at || new Date().toISOString();
    const historyEntry = {
      id: metadata.historyId || `foundation-history-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      projectId: metadata.projectId || "",
      mapId: metadata.mapId || "",
      foundationId: foundation.foundationId || foundation.id,
      previousStatus,
      newStatus,
      at,
      by: metadata.by || "Unknown",
      userId: metadata.userId || "",
      correction: Boolean(metadata.correction),
      deviceId: metadata.deviceId || "",
      baseUpdatedAt: metadata.baseUpdatedAt || foundation.updatedAt || ""
    };
    foundation.status = newStatus;
    foundation.updatedAt = at;
    foundation.updatedBy = historyEntry.by;
    foundation.updatedByUserId = historyEntry.userId;
    foundation.history = [...(foundation.history || []), historyEntry];
    return { changed: true, foundation, historyEntry };
  }

  function shouldAcceptTap(lastAcceptedAt, now, movement, minimumInterval = 650, movementLimit = 12) {
    if (Number(movement) > movementLimit) return false;
    if (!lastAcceptedAt) return true;
    return Number(now) - Number(lastAcceptedAt) >= minimumInterval;
  }

  function permissions(role, authenticated = true) {
    return {
      view: Boolean(authenticated),
      update: Boolean(authenticated) && UPDATE_ROLES.includes(role),
      manage: Boolean(authenticated) && role === "Admin"
    };
  }

  function canAccessJob(role, jobId, assignedJobIds = []) {
    if (role !== "Foreman") return true;
    const allowed = Array.isArray(assignedJobIds) ? assignedJobIds.map(String) : [];
    return allowed.includes(String(jobId || ""));
  }

  function historyRows(foundations = []) {
    return foundations
      .slice()
      .sort((a, b) => String(a.foundationId || a.id).localeCompare(String(b.foundationId || b.id), undefined, { numeric: true }))
      .flatMap((foundation) => {
        const history = (foundation.history || []).slice().sort((a, b) => String(a.at || "").localeCompare(String(b.at || "")));
        if (!history.length) {
          return [{
            foundationId: foundation.foundationId || foundation.id,
            currentStatus: validStatus(foundation.status),
            previousStatus: "",
            newStatus: "",
            at: "",
            by: "",
            userId: "",
            correction: false
          }];
        }
        return history.map((entry) => ({
          foundationId: foundation.foundationId || foundation.id,
          currentStatus: validStatus(foundation.status),
          previousStatus: validStatus(entry.previousStatus),
          newStatus: validStatus(entry.newStatus),
          at: entry.at || "",
          by: entry.by || "",
          userId: entry.userId || "",
          correction: Boolean(entry.correction)
        }));
      });
  }

  function reportDateBoundary(value, endOfRange = false) {
    const clean = String(value || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean)) return null;
    const date = new Date(`${clean}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;
    if (endOfRange) date.setDate(date.getDate() + 1);
    return date.getTime();
  }

  function progressRows(foundations = [], fromDate = "", toDate = "") {
    const from = reportDateBoundary(fromDate);
    const until = reportDateBoundary(toDate, true);
    return historyRows(foundations).filter((row) => {
      if (!row.at) return false;
      const timestamp = new Date(row.at).getTime();
      if (Number.isNaN(timestamp)) return false;
      return (from === null || timestamp >= from) && (until === null || timestamp < until);
    });
  }

  function generateMapIds(prefix, from, to) {
    const start = Number(from);
    const end = Number(to);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end - start > 2000) return [];
    const cleanPrefix = String(prefix || "").trim();
    const width = cleanPrefix ? Math.max(String(from).length, String(to).length, 3) : Math.max(String(from).length, String(to).length);
    return Array.from({ length: end - start + 1 }, (_, index) => `${cleanPrefix}${String(start + index).padStart(width, "0")}`);
  }

  function validateMapping(map, expectedIds = []) {
    const errors = [];
    if (!map?.imageSrc) errors.push("missing-image");
    const hotspots = map?.hotspots || [];
    if (!hotspots.length) errors.push("missing-hotspots");
    const ids = hotspots.map((hotspot) => String(hotspot.foundationId || "").trim()).filter(Boolean);
    if (new Set(ids.map((id) => id.toLowerCase())).size !== ids.length) errors.push("duplicate-ids");
    const expected = expectedIds.map((id) => String(id));
    if (expected.length && (expected.length !== ids.length || expected.some((id) => !ids.includes(id)))) errors.push("incomplete-ids");
    return errors;
  }

  return { STATUSES, validStatus, nextStatus, canAdvance, clampCoordinate, positionFromClient, mergeDeletedHotspotIds, excludeDeletedHotspots, counts, transition, shouldAcceptTap, permissions, canAccessJob, historyRows, progressRows, generateMapIds, validateMapping };
});
