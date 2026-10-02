const assert = require("node:assert/strict");
const FoundationProgress = require("../foundation-progress.js");

const stages = FoundationProgress.STATUSES;
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
assert.equal(FoundationProgress.shouldAcceptTap(1000, 1100, 2), false);
assert.equal(FoundationProgress.shouldAcceptTap(1000, 1800, 2), true);
assert.equal(FoundationProgress.shouldAcceptTap(0, 1000, 20), false);

assert.deepEqual(FoundationProgress.permissions("Foreman", true), { view: true, update: true, manage: false });
assert.deepEqual(FoundationProgress.permissions("Admin", true), { view: true, update: true, manage: true });
assert.deepEqual(FoundationProgress.permissions("Safety", true), { view: true, update: false, manage: false });
assert.deepEqual(FoundationProgress.permissions("Admin", false), { view: false, update: false, manage: false });

const reloaded = JSON.parse(JSON.stringify(foundations));
assert.equal(reloaded[0].status, "Started");
assert.equal(reloaded[0].history.length, 1);

console.log("Foundation progress model tests passed.");
