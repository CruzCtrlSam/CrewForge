const assert = require("assert");
const ShopInspections = require("../shop-inspections.js");

const rebarIds = ShopInspections.templatesForArea("rebarFab").map((entry) => entry.id);
const solarIds = ShopInspections.templatesForArea("solarPiles").map((entry) => entry.id);
const skidsIds = ShopInspections.templatesForArea("skids").map((entry) => entry.id);

assert(rebarIds.includes("bending-machine"));
assert(!rebarIds.includes("solar-saw"));
assert(!rebarIds.includes("skids-welding"));
assert(solarIds.includes("solar-saw"));
assert(solarIds.includes("overhead-crane"));
assert(!solarIds.includes("skids-plasma"));
assert(skidsIds.includes("skids-welding"));
assert(skidsIds.includes("skids-forklift"));
assert(!skidsIds.includes("forklift"));

assert.strictEqual(ShopInspections.inferTemplate("Completed Forklift.pdf", "rebarFab"), "forklift");
assert.strictEqual(ShopInspections.inferTemplate("Randall Forklift Inspection.jpg", "skids"), "skids-forklift");
assert.strictEqual(ShopInspections.inferTemplate("Solar pile press line.png", "solarPiles"), "solar-press-line");

const first = { area: "rebarFab", templateId: "bending-machine", date: "2026-11-10", ratings: { 0: "2", 1: "2", 2: "1", 3: "0", 4: "N/A" }, correctiveActionRequired: true, actionStatus: "Open" };
const second = { area: "rebarFab", templateId: "bending-machine", date: "2026-11-11", ratings: { 0: "2", 1: "2" }, correctiveActionRequired: false, actionStatus: "Not required" };
const other = { area: "skids", templateId: "skids-welding", date: "2026-11-11", ratings: { 0: "0" }, correctiveActionRequired: true, actionStatus: "Open" };

assert.deepStrictEqual(ShopInspections.recordMetrics(first), { applicable: 4, points: 5, possible: 8, score: 63, unsafe: 1, deficient: 1, ok: 2 });
const dashboard = ShopInspections.dashboard([first, second, other], { area: "rebarFab", from: "2026-11-01", to: "2026-11-30" });
assert.strictEqual(dashboard.inspections, 2);
assert.strictEqual(dashboard.unsafe, 1);
assert.strictEqual(dashboard.deficient, 1);
assert.strictEqual(dashboard.openActions, 1);
assert.strictEqual(dashboard.score, 75);

console.log("Shop inspection routing and KPI tests passed");
