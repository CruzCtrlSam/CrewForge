const assert = require("node:assert/strict");
const FoundationProgress = require("../foundation-progress.js");

const stages = FoundationProgress.STATUSES;
assert.deepEqual(stages, ["Not Started", "Started", "Bottom", "Top", "Pedestal", "Completed"]);
for (let index = 0; index < stages.length - 1; index += 1) {
  assert.equal(FoundationProgress.nextStatus(stages[index]), stages[index + 1]);
}
assert.equal(FoundationProgress.nextStatus("Completed"), "Completed");
assert.equal(FoundationProgress.canAdvance("Completed"), false);

const foundations = [
  { id: "1", foundationId: "1", status: "Not Started", history: [] },
  { id: "2", foundationId: "2", status: "Bottom", history: [] },
  { id: "3", foundationId: "3", status: "Completed", history: [] }
];
const result = FoundationProgress.transition(foundations, "1", "Started", {
  at: "2026-10-02T12:00:00.000Z",
  by: "Test Foreman",
  userId: "user-1"
});
assert.equal(result.changed, true);
assert.equal(foundations[0].status, "Started");
assert.equal(foundations[0].history.length, 1);
assert.deepEqual(
  { previousStatus: foundations[0].history[0].previousStatus, newStatus: foundations[0].history[0].newStatus },
  { previousStatus: "Not Started", newStatus: "Started" }
);

const totals = FoundationProgress.counts(foundations);
assert.deepEqual(totals, { total: 3, "Not Started": 0, Started: 1, Bottom: 1, Pedestal: 0, Top: 0, Completed: 1 });
assert.equal(FoundationProgress.clampCoordinate(-0.4), 0);
assert.equal(FoundationProgress.clampCoordinate(1.4), 1);
assert.equal(FoundationProgress.clampCoordinate(0.42), 0.42);
assert.deepEqual(FoundationProgress.positionFromClient({ left: 100, top: 200, width: 400, height: 200 }, 300, 250), { x: 0.5, y: 0.25 });
assert.deepEqual(FoundationProgress.positionFromClient({ left: 100, top: 200, width: 400, height: 200 }, 50, 500), { x: 0, y: 1 });
assert.equal(FoundationProgress.shouldAcceptTap(1000, 1100, 2), false);
assert.equal(FoundationProgress.shouldAcceptTap(1000, 1800, 2), true);
assert.equal(FoundationProgress.shouldAcceptTap(0, 1000, 20), false);

assert.deepEqual(FoundationProgress.permissions("Foreman", true), { view: true, update: true, manage: false });
assert.deepEqual(FoundationProgress.permissions("Admin", true), { view: true, update: true, manage: true });
assert.deepEqual(FoundationProgress.permissions("Safety", true), { view: true, update: false, manage: false });
assert.deepEqual(FoundationProgress.permissions("Admin", false), { view: false, update: false, manage: false });
assert.equal(FoundationProgress.canAccessJob("Foreman", "longspur", ["longspur"]), true);
assert.equal(FoundationProgress.canAccessJob("Foreman", "other-job", ["longspur"]), false);
assert.equal(FoundationProgress.canAccessJob("Admin", "other-job", []), true);

const reloaded = JSON.parse(JSON.stringify(foundations));
assert.equal(reloaded[0].status, "Started");
assert.equal(reloaded[0].history.length, 1);

const historyRows = FoundationProgress.historyRows(reloaded);
assert.equal(historyRows.length, 3);
assert.deepEqual(
  { foundationId: historyRows[0].foundationId, previousStatus: historyRows[0].previousStatus, newStatus: historyRows[0].newStatus, currentStatus: historyRows[0].currentStatus },
  { foundationId: "1", previousStatus: "Not Started", newStatus: "Started", currentStatus: "Started" }
);
assert.equal(historyRows[1].foundationId, "2");
assert.equal(historyRows[1].at, "");

const datedFoundations = [{
  id: "T001",
  foundationId: "T001",
  status: "Top",
  history: [
    { previousStatus: "Not Started", newStatus: "Bottom", at: "2026-10-01T14:00:00.000Z", by: "A" },
    { previousStatus: "Bottom", newStatus: "Top", at: "2026-10-02T18:00:00.000Z", by: "B" }
  ]
}, { id: "T002", foundationId: "T002", status: "Not Started", history: [] }];
assert.equal(FoundationProgress.progressRows(datedFoundations).length, 2);
assert.equal(FoundationProgress.progressRows(datedFoundations, "2026-10-02", "2026-10-02").length, 1);
assert.equal(FoundationProgress.progressRows(datedFoundations, "2026-10-03", "").length, 0);

assert.deepEqual(FoundationProgress.generateMapIds("", 1, 3), ["1", "2", "3"]);
assert.deepEqual(FoundationProgress.generateMapIds("WTG-", 1, 3), ["WTG-001", "WTG-002", "WTG-003"]);
assert.deepEqual(FoundationProgress.generateMapIds("T", 4, 2), []);
assert.deepEqual(FoundationProgress.validateMapping({ imageSrc: "map.jpg", hotspots: [{ foundationId: "1" }] }, ["1"]), []);
assert.deepEqual(FoundationProgress.validateMapping({ imageSrc: "map.jpg", hotspots: [{ foundationId: "1" }, { foundationId: "1" }] }, ["1", "2"]), ["duplicate-ids", "incomplete-ids"]);

console.log("Foundation progress model tests passed.");
