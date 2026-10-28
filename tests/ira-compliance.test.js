const assert = require("node:assert/strict");
const IRACompliance = require("../ira-compliance.js");

assert.equal(IRACompliance.namesMatch("Adelfo Vargas", "Adelfo Vargas Isidro"), true);
assert.equal(IRACompliance.namesMatch("Rapheal Towne", "Towne Rapheal"), true);
assert.equal(IRACompliance.namesMatch("Miguel A. Segura", "Miguel Segura Zapata"), false);
assert.equal(IRACompliance.namesMatch("Daniel Marquez", "David Contreras"), false);

const apprentices = [
  { name: "Adelfo Vargas Isidro", active: true },
  { name: "Francisco Ibarra", active: true },
  { name: "Jorge Azua", active: false }
];
const summary = IRACompliance.calculate({
  iraMinimumPercent: 15,
  iraMaximumPercent: 20,
  roster: [],
  iraRoster: [
    { name: "Adelfo Vargas" },
    { name: "Francisco Ibarra" },
    { name: "Jorge Azua" },
    ...Array.from({ length: 7 }, (_, index) => ({ name: `Worker ${index + 1}` }))
  ]
}, apprentices);
assert.equal(summary.workerCount, 10);
assert.equal(summary.apprenticeCount, 2);
assert.equal(summary.percentage, 20);
assert.equal(summary.status, "compliant");

const rows = IRACompliance.parseCsv('Apprentice Number,First Name,Middle Name,Last Name\nTX1,Jane,Q,Doe\n');
assert.equal(rows.length, 1);
assert.equal(rows[0]["apprentice number"], "TX1");
assert.equal(rows[0]["middle name"], "Q");

const seededApprentices = [
  "Simon Garcia", "Adelfo Vargas Isidro", "Jorge Azua", "Jorge Villalobos Bocanegra", "Francisco Ibarra",
  "Miguel Segura Zapata", "Carlos Tapia Morales", "Israel Macias", "Jesus Abraham Saldana Calderon",
  "Aiden Lee Hurley", "Terry Joe", "Rapheal Towne"
].map((name) => ({ name, active: true }));
const longspur = IRACompliance.calculate({ iraMinimumPercent: 15, iraMaximumPercent: 20, iraRoster: [
  "Adelfo Vargas Isidro", "Carlos Tapia Morales", "Francisco Ibarra", "Julio Cesar Lugo Hernandez", "Jorge Azua",
  "Jesus Abraham Saldana Calderon", "Jorge Villalobos Bocanegra", "Daniel Marquez", "Luis Perez Leon", "Alberto Hernandez",
  "Alexis Sosa", "Terry Joe", "David Saucedo", "Justin Hendon", "Tyler Henter Hurley", "Aiden Lee Hurley",
  "Rapheal Towne", "Skyler Elias Lee Burty"
].map((name) => ({ name })) }, seededApprentices);
assert.equal(longspur.workerCount, 18);
assert.equal(longspur.apprenticeCount, 9);
assert.equal(longspur.percentage, 50);
assert.equal(longspur.status, "above");

const fourHorizons = IRACompliance.calculate({ iraMinimumPercent: 15, iraMaximumPercent: 20, iraRoster: [
  "Lidio Barron", "Cruz Orosco", "Luis A. Hernandez", "Simon Garcia", "Mauricio Frias", "Gilberto Frias",
  "Israel Macias", "Leobardo Reina", "Eduardo Romero", "Miguel Segura Zapata", "Francis J. Garcia", "Juan A. Sanchez", "Delmar Rivera"
].map((name) => ({ name })) }, seededApprentices);
assert.equal(fourHorizons.workerCount, 13);
assert.equal(fourHorizons.apprenticeCount, 3);
assert.equal(Math.round(fourHorizons.percentage * 10) / 10, 23.1);
assert.equal(fourHorizons.status, "above");

console.log("IRA compliance tests passed");
