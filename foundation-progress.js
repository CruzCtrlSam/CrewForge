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

  return { STATUSES, validStatus, nextStatus, canAdvance, clampCoordinate, counts, transition, shouldAcceptTap, permissions, historyRows };
});
