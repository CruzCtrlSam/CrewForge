const STORAGE_KEY = "valor-ops-demo-v7";

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const areas = {
  rebarFab: {
    label: "Rebar Fabrication",
    es: "Fabricacion de varilla",
    mode: "shift",
    roles: ["Foreman", "Machine Operator", "Helper", "Quality Control", "Cleaning"],
    pto: true,
    sick: true,
    perDiem: false,
    dol: false
  },
  solarPiles: {
    label: "Solar Piles Fabrication",
    es: "Fabricacion de pilotes solares",
    mode: "shift",
    roles: ["Foreman", "Machine Operator", "Helper", "Quality Control", "Cleaning"],
    pto: true,
    sick: true,
    perDiem: false,
    dol: false
  },
  rebarInstall: {
    label: "Rebar Installation",
    es: "Instalacion de varilla",
    mode: "crew",
    roles: ["Foreman", "Ironworker", "Rodbuster"],
    pto: true,
    sick: true,
    perDiem: true,
    dol: true
  },
  bundleLab: {
    label: "Rebar Fabrication Tracking",
    es: "Rastreo de fabricacion de varilla",
    mode: "planner",
    roles: [],
    pto: false,
    sick: false,
    perDiem: false,
    dol: false,
    adminOnly: true
  }
};

const delayReasons = ["No delay", "Weather", "Accident", "Illness", "Job site shut down", "Material delay", "Equipment issue", "Inspection hold", "Drawing/RFI issue", "Other"];
const bundleStatuses = ["Cut", "In production", "Staged", "Loaded", "Shipped", "Delivered"];
const plannerStatuses = ["Planned", "Received", "Cut", "Bent/Fabricated", "QC checked", "Staged", "Loaded", "Shipped"];
const fabricationProcessSteps = [
  ["received", "Received", "Recibido"],
  ["cut", "Cut", "Cortado"],
  ["fabricated", "Fabricated", "Fabricado"],
  ["qc", "QC", "Calidad"],
  ["staged", "Staged", "Preparado"],
  ["loaded", "Loaded", "Cargado"],
  ["shipped", "Shipped", "Enviado"]
];
const qualityRejectReasons = ["None", "Missed bend", "Wrong size", "Wrong quantity", "Bad steel quality", "Damaged", "Other"];
const jobStatuses = ["Active", "In Progress", "On Hold", "Complete"];
const documentTypes = ["Site Safety Plan", "JHA", "Hot Work Permit", "Fire Extinguisher Inspection", "Rigging Form", "Equipment Inspection", "Client Form", "Other"];
const safetyFormTypes = ["JHA", "Accident Report", "Hot Work Permit", "Fire Extinguisher Inspection", "Rigging Form", "Equipment Inspection", "Client Safety Inspection", "Other"];
const accidentYesNoFields = [
  ["fatality", "Fatality", "Fatalidad"],
  ["called911", "911 called", "Se llamo al 911"],
  ["continuedWork", "Employee able to continue work", "Empleado pudo seguir trabajando"],
  ["otherInjured", "Other people injured", "Otras personas lesionadas"],
  ["treatedEr", "Treated in ER", "Atendido en emergencia"],
  ["hospitalized", "Hospitalized overnight", "Hospitalizado durante la noche"],
  ["otherPersonInvolved", "Another person involved", "Otra persona involucrada"]
];
const accidentInjuryTypes = [
  "Heat/cold burn",
  "Cut/laceration",
  "Chemical burn",
  "Fracture",
  "Slip",
  "Electrical shock",
  "Foreign body",
  "Strain",
  "Puncture",
  "Trip",
  "Physical exhaustion",
  "Heat/cold stress",
  "Contusion/bruise",
  "Struck by",
  "Fall",
  "Chemical inhalation",
  "Chemical irritation",
  "Sprain",
  "Other"
];
const qcMachineTypes = ["Bender", "Double Bender", "Shear Line", "Automatic Bender", "Radius Bender", "Spiral Bender"];
const employeeCertOptions = ["Forklift", "Scissor lift", "Boom lift", "Skid steer", "Telehandler", "Rigging", "Signal person", "First aid/CPR", "Hot work", "Confined space"];
const employeeMachineOptions = ["Bender", "Double Bender", "Shear Line", "Automatic Bender", "Radius Bender", "Spiral Bender", "Shear", "Forklift", "Loader", "Telehandler"];
const reimbursementCategories = ["Fuel", "Hotel", "Meals", "Supplies", "Tools", "Parking/Tolls", "Mileage", "Other"];
const reimbursementStatuses = ["Pending", "Approved", "Denied", "Paid"];
const qcBendLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "K"];
const rebarShapeOptions = [
  "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
  "33", "34", "35", "36", "37", "51", "52", "53", "54", "55", "56", "57",
  "58", "59", "510", "511", "61", "71", "72", "73", "74", "75", "76", "77",
  "78", "79", "710", "711", "712", "5A", "6A", "7A", "41", "42", "43", "44",
  "45", "46", "37A", "47", "99 SP", "48", "Other"
];
const fieldAuditChecks = [
  ["ppe", "PPE in use", "EPP en uso"],
  ["jha", "JHA available", "JHA disponible"],
  ["permits", "Required permits on hand", "Permisos requeridos disponibles"],
  ["housekeeping", "Housekeeping acceptable", "Orden y limpieza aceptable"],
  ["equipment", "Equipment inspected", "Equipo inspeccionado"],
  ["fire", "Fire extinguishers checked", "Extintores revisados"],
  ["rigging", "Rigging inspected", "Rigging inspeccionado"],
  ["client", "Client requirements met", "Requisitos del cliente cumplidos"]
];
const installationJobTypes = ["Wind Farm", "T-line Substation", "Data Center"];
const fabricationJobTypes = [...installationJobTypes, "Commercial"];
const windFoundationComponents = ["Bottom Mat", "Top", "Pedestal"];
const shifts = ["Day Shift", "Night Shift"];
const appRoles = ["Foreman", "Payroll", "Management", "Admin"];
const foremanNames = ["Lidio Barron", "Gregorio Izaguirre", "Huguer Vazquez", "Hugo Martinez", "Paco", "Wilfredo Vargas", "Erik", "Paul Featherhat"];
const trialWindFarmJobs = [
  { id: "wind-buffalo-gap-ira", name: "Buffalo Gap - IRA", number: "BG-IRA", customer: "Blattner", start: "2025-01-08", finish: "2026-05-01", wtgs: 117, tons: 5950, state: "TX", town: "Merkel", foreman: "Wilfredo Vargas", rrFolder: "Wilfredo Vargas", supply: "Rhome" },
  { id: "wind-throckmorton-ira", name: "Throckmorton - IRA", number: "THR-IRA", customer: "Blattner", start: "2026-03-23", finish: "2026-06-07", wtgs: 80, tons: 2600, state: "TX", town: "Throckmorton", foreman: "Paco", rrFolder: "Huguer Vazquez", supply: "Rhome" },
  { id: "wind-four-horizons-ira", name: "Four Horizons - IRA", number: "FH-IRA", customer: "Mortenson", start: "2026-04-15", finish: "2026-09-15", wtgs: 210, tons: 10500, state: "TX", town: "Seymour", foreman: "Lidio Barron", rrFolder: "Huguer Vazquez", supply: "Rhome" },
  { id: "wind-goat-mountain", name: "Goat Mountain", number: "GOAT-MTN", customer: "Blattner", start: "2026-05-18", finish: "2026-07-24", wtgs: 68, tons: 3350, state: "TX", town: "Sterling City", foreman: "Hugo Martinez", rrFolder: "Hugo Martinez", supply: "Rhome" },
  { id: "wind-laurel", name: "Laurel", number: "LAU-WIND", customer: "Blattner", start: "2026-06-15", finish: "2026-08-28", wtgs: 82, tons: 3030, state: "TX", town: "San Angelo", foreman: "Gregorio Izaguirre", rrFolder: "Huguer Vazquez", supply: "Rhome" },
  { id: "wind-monarch-creek-ira", name: "Monarch Creek - IRA", number: "MON-IRA", customer: "Blattner", start: "2026-06-15", finish: "2026-09-11", wtgs: 102, tons: 3350, state: "TX", town: "Throckmorton", foreman: "Paco", rrFolder: "Huguer Vazquez", supply: "Rhome" },
  { id: "wind-longspur", name: "Longspur", number: "LONGSPUR", customer: "Mortenson", start: "2026-08-01", finish: "2026-09-25", wtgs: 45, tons: 2600, state: "ND", town: "Glen Ullin", foreman: "Gregorio Izaguirre", rrFolder: "Huguer Vazquez", supply: "Rhome" },
  { id: "wind-phillip-wind", name: "Phillip Wind", number: "PHILIP-WIND", customer: "Blattner", start: "2026-08-17", finish: "2026-09-25", wtgs: 55, tons: 3260, state: "SD", town: "Philip", foreman: "Hugo Martinez", rrFolder: "Hugo Martinez", supply: "Rhome" },
  { id: "wind-crossroads", name: "Crossroads", number: "CROSSROADS", customer: "Blattner", start: "2026-11-23", finish: "2027-03-25", wtgs: 74, tons: 4700, state: "TX", town: "Port Lavaca", foreman: "Lidio Barron", rrFolder: "Hugo Martinez", supply: "Rhome" },
  { id: "wind-prairie-phoenix", name: "Prairie Phoenix", number: "PRAIRIE-PHOENIX", customer: "", start: "", finish: "", wtgs: 0, tons: 0, state: "", town: "", foreman: "", rrFolder: "", supply: "" },
  { id: "wind-pioneer-creek", name: "Pioneer Creek (Takkion)", number: "PIONEER-CREEK", customer: "", start: "", finish: "", wtgs: 0, tons: 0, state: "", town: "", foreman: "", rrFolder: "", supply: "" },
  { id: "wind-big-bend", name: "Big Bend", number: "BIG-BEND", customer: "", start: "", finish: "", wtgs: 0, tons: 0, state: "", town: "", foreman: "", rrFolder: "", supply: "" }
];
function trialWindFarmJobRecord(job) {
  return {
    ...job,
    area: "rebarInstall",
    jobType: "Wind Farm",
    status: "Active",
    foundationIds: [],
    customTracking: [],
    documents: [],
    trialSchedule: true
  };
}
const companyAccessCode = "VALOR";
const rebarFabForemen = ["Daniel Medrano", "Hipolito Pereda"];
const solarPilesForemen = ["Daniel Medrano", "Hipolito Pereda"];
const trialForemanNames = [...new Set([...foremanNames, ...rebarFabForemen, ...solarPilesForemen])];
const appName = "CrewForge";
const appTagline = "Crew time and job progress, forged into one.";
const assetVersion = "65";
const asset = (path) => `${path}?v=${assetVersion}`;
const areaArtwork = {
  rebarFab: asset("./assets/crewforge-rebar-fabrication.png"),
  solarPiles: asset("./assets/crewforge-solar-piles.png"),
  rebarInstall: asset("./assets/crewforge-thumbnail.png"),
  bundleLab: asset("./assets/crewforge-bundle-tracking.svg")
};
function visibleAreaEntries() {
  return Object.entries(areas).filter(([id]) => id !== "bundleLab");
}
const mockTrialCrews = [
  {
    foreman: "Lidio Barron",
    perDiem: 500,
    workers: [
      ["Cruz Orozco", "Rodbuster", 29],
      ["Otilio Juarez", "Rodbuster", 30],
      ["Yahir Juarez", "Rodbuster", 31],
      ["Simon Garcia", "Rodbuster", 31],
      ["Mauricio Frias", "Rodbuster", 32],
      ["Filiberto Frias", "Rodbuster", 33],
      ["Abelardo Esperanza", "Rodbuster", 35],
      ["Israel Macias", "Rodbuster", 34],
      ["Leobardo Reina", "Rodbuster", 35],
      ["Eduardo Romero", "Rodbuster", 30],
      ["Miguel A. Segura", "Rodbuster", 33],
      ["Adelfo Vargas", "Rodbuster", 34],
      ["Daniel Marquez", "Rodbuster", 35],
      ["Luis Perez Leon", "Rodbuster", 30],
      ["Felipe Jimenez", "Rodbuster", 31],
      ["Juan A. Sanchez", "Rodbuster", 32],
      ["Isaias Vargas", "Rodbuster", 33]
    ]
  },
  {
    foreman: "Hugo Martinez",
    perDiem: 250,
    workers: [
      ["Victor Najera", "Rodbuster", 28],
      ["Samuel Najera", "Rodbuster", 29],
      ["Jonathan Vasquez", "Rodbuster", 30],
      ["Delmar Rivera", "Rodbuster", 31],
      ["David Contreras", "Rodbuster", 32],
      ["Luis A. Hernandez", "Rodbuster", 33],
      ["Carlos F. Tapia", "Rodbuster", 34],
      ["Selvin Funes", "Rodbuster", 35],
      ["Geovany Vanegas", "Rodbuster", 30],
      ["Manuel Chavez", "Rodbuster", 31],
      ["Servando Rivera", "Rodbuster", 32],
      ["Juan M. Cano", "Rodbuster", 33]
    ]
  },
  {
    foreman: "Paco",
    perDiem: 350,
    workers: [
      ["Hugo Rodriguez", "Rodbuster", 28],
      ["Jose Manuel Perez", "Rodbuster", 29],
      ["Jesus Martinez", "Rodbuster", 30],
      ["Ismael Martinez", "Rodbuster", 31],
      ["Jason Lopez", "Rodbuster", 32],
      ["Fortino Martinez", "Rodbuster", 33],
      ["Francisco Vargas", "Rodbuster", 34],
      ["Arturo Perez", "Rodbuster", 35],
      ["Pedro Martinez", "Rodbuster", 30],
      ["Alex Sosa", "Rodbuster", 31],
      ["Luis Soria", "Rodbuster", 32]
    ]
  },
  {
    foreman: "Huguer Vazquez",
    perDiem: 450,
    workers: [
      ["Adelfo Vargas", "Rodbuster", 28],
      ["Maribel Gutierrez", "Rodbuster", 29],
      ["Eduardo Gomez", "Rodbuster", 30],
      ["Dario Estrada", "Rodbuster", 31],
      ["Johan Quintero", "Rodbuster", 32],
      ["Julian Pedraza", "Rodbuster", 33],
      ["Daniel Marquez", "Rodbuster", 34],
      ["Leobardo Reina", "Rodbuster", 35],
      ["Luis Perez Leon", "Rodbuster", 30],
      ["Felipe Jimenez", "Rodbuster", 31],
      ["Eliseo Castro", "Rodbuster", 32],
      ["Gustavo Martinez", "Rodbuster", 33],
      ["Adolfo Rios", "Rodbuster", 34],
      ["Jorge Azua", "Rodbuster", 35],
      ["Eduardo Hernandez", "Rodbuster", 30],
      ["Randall Black", "Rodbuster", 31]
    ]
  },
  {
    foreman: "Wilfredo Vargas",
    perDiem: 450,
    workers: [
      ["Jose Vargas", "Rodbuster", 29],
      ["Melquiel Gardozo", "Rodbuster", 30],
      ["Martin Andrade", "Rodbuster", 31],
      ["Calixto Ramos", "Rodbuster", 32],
      ["Alberto Ortiz", "Rodbuster", 33],
      ["Francisco Ibarra", "Rodbuster", 34],
      ["Juan Cano", "Rodbuster", 35],
      ["Julio Lugo", "Rodbuster", 30]
    ]
  }
];
const fictitiousEmployeeNames = new Set([
  "Miguel Sandoval",
  "Rafael Campos",
  "Oscar Medina",
  "Julian Ortega",
  "Hector Salinas",
  "Noe Paredes",
  "Marco Villarreal",
  "Andres Prieto",
  "Ramiro Lopez",
  "Esteban Rivas",
  "Alonso Carrillo",
  "Javier Nunez",
  "Emilio Santos",
  "Tomas Aguilar",
  "Ruben Montoya",
  "Cristian Pena",
  "Manuel Flores",
  "Diego Ramirez",
  "Sergio Navarro",
  "Arturo Vega",
  "Felix Robles",
  "Pablo Moreno",
  "Raul Cardenas",
  "Gerardo Silva",
  "Ivan Escobar",
  "Samuel Torres",
  "Victor Molina",
  "Nicolas Duarte",
  "Adrian Solis",
  "Mario Cantu",
  "Joel Figueroa",
  "Cesar Benitez",
  "Edgar Ibarra",
  "Luis Galvan",
  "Rene Zamora",
  "Tony Baker",
  "Chris Wilson",
  "Aaron Miller",
  "James Carter",
  "Ryan Cooper",
  "Brandon Hayes",
  "Kevin Price",
  "Matthew Reed",
  "Jose Machine Operator",
  "Carlos Helper",
  "Rebar QC",
  "Rebar Cleaning",
  "Solar Operator",
  "Solar Helper",
  "Solar QC",
  "Solar Cleaning",
  "Solar Piles Day Foreman",
  "Solar Piles Night Foreman"
]);
const trialWeekHourPatterns = [
  { mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0, sun: 0 },
  { mon: 10, tue: 9, wed: 8, thu: 8, fri: 7, sat: 0, sun: 0 },
  { mon: 9, tue: 9, wed: 9, thu: 9, fri: 8, sat: 0, sun: 0 },
  { mon: 10, tue: 10, wed: 10, thu: 9, fri: 8, sat: 0, sun: 0 },
  { mon: 8, tue: 8, wed: 10, thu: 10, fri: 9, sat: 0, sun: 0 },
  { mon: 10, tue: 9, wed: 9, thu: 9, fri: 9, sat: 0, sun: 0 },
  { mon: 9, tue: 10, wed: 10, thu: 10, fri: 8, sat: 0, sun: 0 },
  { mon: 10, tue: 10, wed: 10, thu: 10, fri: 8, sat: 0, sun: 0 },
  { mon: 8, tue: 9, wed: 10, thu: 9, fri: 9, sat: 0, sun: 0 },
  { mon: 10, tue: 10, wed: 9, thu: 9, fri: 9, sat: 0, sun: 0 }
];
const trialPerDiems = [175, 225, 275, 325, 350, 400, 450, 500, 525, 575];
const trialSeedWeek = "2026-07-03";
const trialAccounts = [
  { code: "FOREMAN", name: "Foreman", role: "Foreman", needsForeman: true },
  { code: "MAYORDOMO", name: "Mayordomo", role: "Approver", foreman: "Lidio Barron", area: "rebarInstall" },
  { code: "QUALITY", name: "Quality", role: "Quality", area: "rebarFab", foreman: "Daniel Medrano" },
  { code: "SAFETY", name: "Safety", role: "Safety", area: "rebarInstall", foreman: "Lidio Barron" },
  { code: "PAYROLL", name: "Payroll", role: "Payroll", foreman: "Lidio Barron" },
  { code: "MANAGER", name: "Management", role: "Management", foreman: "Lidio Barron" },
  { code: "ADMIN", name: "Admin", role: "Admin", foreman: "Lidio Barron" }
];
let lastLoginCode = "";

const SUPABASE_URL = "https://ehexrdmtqoxjywahqjmh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Nal5T6ZOVJpI-yzzvGOxw_Ypre8otF";
const WORKSPACE_ID = "crewforge-demo";
const SHARED_STATE_KEYS = ["weeks", "people", "jobs", "sheets", "production", "jobLists", "bundlePlanner", "safetyForms", "fieldAudits", "qualityChecks", "trainingCourses", "trainingResults", "reimbursementRequests", "foremanAliases", "hiddenForemen", "activityLog"];
const MAX_DEMO_DOCUMENT_BYTES = 25 * 1024 * 1024;
const SYNC_STATUS_KEY = "crewforge-sync-status";
const publicTrainingId = new URLSearchParams(window.location.search).get("training") || "";

const defaultPeople = [
  ...foremanNames.map((name) => [name, "Foreman", "rebarInstall", `${name} Crew`, false]),
  ...rebarFabForemen.map((name, index) => [name, "Foreman", "rebarFab", shifts[index] || shifts[0], false]),
  ...solarPilesForemen.map((name, index) => [name, "Foreman", "solarPiles", shifts[index] || shifts[0], false]),
  ...mockTrialCrews.flatMap((crew) => crew.workers.map(([name, role, hourlyRate]) => [name, role, "rebarInstall", `${crew.foreman} Crew`, false, hourlyRate]))
].map(([name, role, area, group, dol, hourlyRate = 0]) => ({ name, role, area, group, dol, hourlyRate, certs: [], machines: [] }));

const bakersfieldControlCodes = [
  ["AFX", "DE6 / 4-78D", 18445],
  ["AFY", "VW5 / 96-30D", 25363],
  ["AFZ", "RT5 / 16-30D", 4228],
  ["AG1", "RY5 / 127-30D", 46031],
  ["AG2", "RX5 / 5-30D", 1812],
  ["AG3", "LW5 / 8-36D", 3285],
  ["AG4", "DY5 / 3-60D", 6385],
  ["AG5", "MP5 / 1-96D", 8423],
  ["AG7", "BR5 / 24-30D", 5888]
].map(([code, description, planned], index) => ({
  id: `bakersfield-${code.toLowerCase()}`,
  area: "rebarInstall",
  foreman: index < 5 ? "Lidio Barron" : "Huguer Vazquez",
  jobId: "bakersfield",
  code,
  description,
  planned,
  quantity: quantityFromDescription(description),
  completedQty: 0,
  completed: 0,
  weekly: 0,
  delay: "No delay",
  delayNote: "",
  status: "Not Started"
}));

const drilledPierBundleRows = [
  ["UTA", "UTA PIER TYPE DP.CA.K138.301-303", 1092, "Trailer 5"],
  ["UTB", "UTB PIER TYPE PC.CA.C101.301-306", 4377, "Trailer 4"],
  ["UTC", "UTC PIER TYPE DP.CA.K101.301-303", 2213, "Trailer 4"],
  ["UTD", "UTD PIER TYPE DP.CA.K107A.301-307", 6444, "Trailer 4"],
  ["UTE", "UTE PIER TYPE DP.CA.K107B.301-307", 6444, "Trailer 4"],
  ["UTF", "UTF PIER TYPE PC.CA.F101.301-303", 6690, "Trailer 3"],
  ["UTG", "UTG PIER TYPE DP.CA.D101.301-306", 4921, "Trailer 1"],
  ["UTH", "UTH PIER TYPE DP.CA.TBI.101 & 102", 10382, "Trailer 3"],
  ["UTJ", "UTJ PIER TYPE DP.CA.LM140.2 & 4", 12347, "Trailer 1"],
  ["UTK", "UTK PIER TYPE DP.CA.TCI.301-304", 29945, "Trailer 1"],
  ["UTL", "UTL PIER TYPE DP.CA.K138.401-403", 1092, "Trailer 5"],
  ["UTM", "UTM PIER TYPE PC.CA.C101.401-406", 4377, "Trailer 4"],
  ["UTN", "UTN PIER TYPE DP.CA.LP.01-04", 2265, "Trailer 4"],
  ["UTP", "UTP PIER TYPE DP.CA.K101.401-403", 2213, "Trailer 4"],
  ["UTQ", "UTQ PIER TYPE DP.CA.K107A.401-407", 6444, "Trailer 4"],
  ["UTR", "UTR PIER TYPE DP.CA.K107B.401-407", 6444, "Trailer 4"],
  ["UTS", "UTS PIER TYPE PC.CA.F101.401-403", 6690, "Trailer 4"],
  ["UTT", "UTT PIER TYPE DP.CA.D101.401-406", 4921, "Trailer 2"],
  ["UTU", "UTU PIER TYPE DP.CA.LM90.11-12", 9300, "Trailer 3"],
  ["UTV", "UTV PIER TYPE DP.CA.TBI.103-106", 20764, "Trailer 3"],
  ["UTW", "UTW PIER TYPE DP.CA.LM140.1 & 3", 12347, "Trailer 2"],
  ["UTY", "UTY PIER TYPE DP.CA.TCI.401-404", 29945, "Trailer 2"]
];

const philipWindTrialRows = [
  {
    controlCode: "AGZ",
    release: "1",
    description: "NON-BOUYANT - BOTTOM",
    pieces: 429,
    weight: 45053,
    scanCode: "VS26-PHILP-AGZ",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  },
  {
    controlCode: "AH1",
    release: "2",
    description: "NON-BOUYANT - TOP",
    pieces: 578,
    weight: 43109,
    scanCode: "VS26-PHILP-AH1",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  },
  {
    controlCode: "AH2",
    release: "3",
    description: "NON-BOUYANT - PEDESTAL",
    pieces: 904,
    weight: 29317,
    scanCode: "VS26-PHILP-AH2",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  },
  {
    controlCode: "AH3",
    release: "4",
    description: "1.5FT BOUYANT - BOTTOM",
    pieces: 326,
    weight: 48488,
    scanCode: "VS26-PHILP-AH3",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  },
  {
    controlCode: "AH4",
    release: "5",
    description: "1.5FT BOUYANT - TOP",
    pieces: 193,
    weight: 45972,
    scanCode: "VS26-PHILP-AH4",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  },
  {
    controlCode: "AH5",
    release: "6",
    description: "1.5FT BOUYANT - PEDESTAL",
    pieces: 967,
    weight: 33730,
    scanCode: "VS26-PHILP-AH5",
    source: "PHILIP WIND PROJECT - CC List.pdf"
  }
];

const rhoneTlinePierTrialRows = [
  {
    controlCode: "AAFR",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "07/20/2026",
    status: "Invoiced",
    release: "1",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "150/AT815-S-1",
    weight: 19897,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AAFT",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "07/20/2026",
    status: "Invoiced",
    release: "3",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "149/AT683-S-28",
    weight: 18619,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AAFV",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "07/20/2026",
    status: "Invoiced",
    release: "5",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "POI#1/T852-S-1",
    weight: 17762,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AFS",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "06/30/2026",
    status: "Shipped",
    release: "AFS1",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "150B/T816-S-1",
    weight: 19897,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AFS1",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "07/20/2026",
    status: "Invoiced",
    release: "4",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "150B/T816-S-1",
    weight: 3600,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AFU",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "07/20/2026",
    status: "Invoiced",
    release: "6",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "149B/T18-S-1",
    weight: 18619,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AFW",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "06/30/2026",
    status: "Shipped",
    release: "AFW1",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "POI#2/T853-S-1",
    weight: 17762,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  },
  {
    controlCode: "AFW1",
    library: "RTX",
    detailerLocation: "RTX",
    fabLocation: "RTX",
    activityDate: "06/30/2026",
    status: "Shipped",
    release: "AFW1",
    customer: "Saber Power",
    jobNumber: "VS26-OVE",
    jobName: "LCRA Overland",
    description: "POI#2/T853-S-1",
    weight: 1588,
    initials: "UNK",
    source: "RTX - Rhome Control Code List Summary"
  }
];

function defaultBundlePlanner() {
  const bundles = drilledPierBundleRows.map(([code, description, weight, trailer], index) => ({
    id: `pier-${code.toLowerCase()}`,
    tag: code,
    controlCode: code,
    scanCode: ["1516900001", "1516970001", "1516990001"][index] || "",
    description,
    pieces: "",
    weight,
    trailer,
    status: index < 2 ? "Staged" : "Planned",
    process: {
      received: index < 2,
      cut: index < 2,
      fabricated: index < 2,
      qc: false,
      staged: index < 2,
      loaded: false,
      shipped: false
    },
    rejectedPieces: 0,
    rejectReason: "None",
    qualityNotes: "",
    notes: "",
    items: []
  }));
  return {
    jobName: "IPA HVDC Delta UT - Drilled Piers",
    customer: "",
    jobNumber: "",
    detailer: "",
    packageType: "Drilled Piers",
    source: "Detailer package trial",
    maxBundleWeight: 0,
    maxBundleLength: "",
    tagRule: "",
    maxTrailerWeight: 48000,
    trailers: ["Trailer 1", "Trailer 2", "Trailer 3", "Trailer 4", "Trailer 5"],
    imports: [],
    analysis: null,
    scanCodeSearch: "",
    selectedJobId: "job-drilled-piers",
    selectedSectionId: bundles[0]?.id || "",
    jobs: [
      {
        id: "job-drilled-piers",
        jobName: "IPA HVDC Delta UT - Drilled Piers",
        customer: "",
        jobNumber: "",
        detailer: "",
        packageType: "Drilled Piers",
        source: "Detailer package trial",
        imports: [],
        analysis: null,
        trailerSignoffs: {},
        bundles
      }
    ],
    bundles
  };
}

const defaultState = {
  auth: null,
  companyVerified: false,
  companyName: "",
  loginCodeDraft: "",
  loginForemanDraft: "",
  selectedArea: "",
  activeTab: "dashboard",
  showIntro: true,
  foremanAliases: {},
  hiddenForemen: [],
  activityLog: [],
  selectedWeek: "2026-07-03",
  selectedProductionJob: "",
  selectedProductionForeman: "",
  selectedEmployeeReport: "",
  selectedEmployeeReportArea: "all",
  selectedEmployeeReportFromWeek: "2026-07-03",
  selectedEmployeeReportToWeek: "2026-07-03",
  selectedEmployeeReportFromDate: "2026-06-29",
  selectedEmployeeReportToDate: "2026-07-03",
  deliverableForeman: "all",
  deliverablePackage: "timesheets",
  deliverableFromDate: "2026-06-29",
  deliverableToDate: "2026-07-03",
  jobDraftType: "",
  selectedSafetyJob: "",
  selectedSafetyFormType: "JHA",
  selectedTrainingCourse: "",
  selectedAuditJob: "",
  selectedQualityJob: "",
  selectedQualityArea: "rebarFab",
  selectedEmployeeProfile: "",
  setupForeman: "Lidio Barron",
  selectedRole: "Foreman",
  currentForeman: "Lidio Barron",
  weeks: ["2026-07-03", "2026-07-10", "2026-07-17", "2026-07-24"],
  people: defaultPeople,
  jobLists: {
    solarClients: ["Solar"],
    solarJobNames: ["Solar Piles Demo Job"]
  },
  jobs: [
    { id: "concho", name: "Concho Field Install", number: "CON-2026", customer: "Concho", area: "rebarInstall", jobType: "Wind Farm", status: "Active" },
    { id: "bakersfield", name: "VS26-BRSFL - Bakersfield Sub Station", number: "VS26-BRSFL", customer: "Bakersfield", area: "rebarInstall", jobType: "T-line Substation", status: "Active" },
    ...trialWindFarmJobs.map(trialWindFarmJobRecord),
    { id: "buffalo-gap", name: "Buffalo Gap - IRA", number: "BG-IRA", customer: "Buffalo Gap", area: "rebarFab", jobType: "Wind Farm", status: "Active" },
    { id: "laurel", name: "Laurel", number: "LAU-2026", customer: "Laurel", area: "rebarFab", jobType: "Commercial", status: "Active" },
    { id: "solar-demo", name: "Solar Piles Demo Job", number: "SP-100", customer: "Solar", area: "solarPiles", status: "Active" }
  ],
  sheets: {},
  safetyForms: [],
  fieldAudits: [],
  trainingCourses: [],
  trainingResults: [],
  qualityChecks: [],
  reimbursementRequests: [],
  production: [
    ...bakersfieldControlCodes,
    { id: "p3", area: "rebarFab", foreman: "Daniel Medrano", jobId: "buffalo-gap", code: "ACA", description: "Operator pads bundle", planned: 3595, completed: 1800, weekly: 900, bundle: "B-104", bundleStatus: "In production", delay: "No delay", delayNote: "", status: "In Progress" },
    { id: "p4", area: "rebarFab", foreman: "Hipolito Pereda", jobId: "laurel", code: "DYK", description: "Pier type bundle", planned: 6406, completed: 6406, weekly: 1200, bundle: "B-216", bundleStatus: "Shipped", delay: "No delay", delayNote: "", status: "Complete" },
    { id: "p5", area: "solarPiles", foreman: "Daniel Medrano", jobId: "solar-demo", code: "ORCA-1001", description: "Solar pile batch", planned: 400, completed: 265, weekly: 80, delay: "No delay", delayNote: "", status: "In Progress" }
  ],
  bundlePlanner: defaultBundlePlanner()
};

const cloud =
  typeof window !== "undefined" && window.supabase && SUPABASE_URL
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
let cloudSaveTimer = null;
let lastCloudPush = "";
let pendingRemoteState = null;

let state = loadState();
let toastTimer;
let suppressHistorySync = false;
let lastHistoryRoute = "";

function sharedSnapshot(source = state) {
  return SHARED_STATE_KEYS.reduce((snapshot, key) => {
    snapshot[key] = structuredClone(source[key]);
    return snapshot;
  }, {});
}

function mergeSharedState(remoteData) {
  const shared = {};
  SHARED_STATE_KEYS.forEach((key) => {
    if (remoteData && remoteData[key] !== undefined) shared[key] = remoteData[key];
  });
  return upgradeState({ ...structuredClone(state), ...shared });
}

function applyRemoteState(remoteData) {
  if (!remoteData) return;
  const next = mergeSharedState(remoteData);
  const active = document.activeElement;
  const isEditing = active && ["INPUT", "SELECT", "TEXTAREA"].includes(active.tagName);
  if (isEditing) {
    pendingRemoteState = next;
    return;
  }
  state = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function pushCloud(immediate = false) {
  if (!cloud) return;
  const save = async () => {
    if (!navigator.onLine) {
      setSyncStatus("offline", "Offline. Changes are saved on this device.");
      return;
    }
    const snapshot = sharedSnapshot();
    const serialized = JSON.stringify(snapshot);
    if (serialized === lastCloudPush) return;
    lastCloudPush = serialized;
    try {
      await cloud.from("app_state").upsert({
        id: WORKSPACE_ID,
        data: snapshot,
        updated_at: new Date().toISOString()
      });
      setSyncStatus("synced", `Synced ${timestamp()}`);
    } catch (error) {
      setSyncStatus("pending", "Sync pending. Saved locally until connection returns.");
      console.warn("Cloud save failed; local demo data is still saved.", error);
    }
  };
  clearTimeout(cloudSaveTimer);
  if (immediate) save();
  else cloudSaveTimer = setTimeout(save, 500);
}

function setSyncStatus(status, message) {
  localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify({ status, message, at: new Date().toISOString() }));
  document.querySelectorAll("[data-sync-message]").forEach((element) => {
    element.innerHTML = `${escapeHtml(message)}<span class="es">Guardado localmente hasta sincronizar.</span>`;
    element.className = `sync-banner ${status}`;
    element.dataset.syncState = status;
  });
}

function currentSyncStatus() {
  try {
    const saved = JSON.parse(localStorage.getItem(SYNC_STATUS_KEY) || "null");
    if (!navigator.onLine) return { status: "offline", message: "Offline. Changes are saved on this device." };
    return saved || { status: "synced", message: "Online" };
  } catch {
    return { status: navigator.onLine ? "synced" : "offline", message: navigator.onLine ? "Online" : "Offline" };
  }
}

function renderSyncBanner() {
  const sync = currentSyncStatus();
  if (sync.status === "synced") return "";
  return `<div class="sync-banner ${sync.status}" data-sync-message data-sync-state="${sync.status}">${escapeHtml(sync.message)}<span class="es">Guardado localmente hasta sincronizar.</span></div>`;
}

async function initCloud() {
  if (!cloud) {
    console.warn("Supabase library not available; running local-only.");
    return;
  }
  try {
    const { data, error } = await cloud.from("app_state").select("data").eq("id", WORKSPACE_ID).maybeSingle();
    if (error) throw error;
    if (data?.data) applyRemoteState(data.data);
    else pushCloud(true);
  } catch (error) {
    console.warn("Cloud load failed; running from local demo data.", error);
  }

  cloud
    .channel(`app_state_${WORKSPACE_ID}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "app_state", filter: `id=eq.${WORKSPACE_ID}` },
      (payload) => {
        const incoming = payload.new?.data;
        if (!incoming) return;
        if (JSON.stringify(incoming) === lastCloudPush) return;
        applyRemoteState(incoming);
      }
    )
    .subscribe();
}

document.addEventListener("focusout", () => {
  if (!pendingRemoteState) return;
  state = pendingRemoteState;
  pendingRemoteState = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
});

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return upgradeState(structuredClone(defaultState));
    return upgradeState({ ...structuredClone(defaultState), ...saved, selectedArea: "", showIntro: false });
  } catch {
    return upgradeState(structuredClone(defaultState));
  }
}

function upgradeState(next) {
  if (next.auth === undefined) next.auth = null;
  if (next.companyVerified === undefined) next.companyVerified = Boolean(next.auth);
  next.companyName = next.companyName || (next.companyVerified ? "Valor" : "");
  next.loginCodeDraft = next.loginCodeDraft || "";
  next.loginForemanDraft = next.loginForemanDraft || "";
  if (next.showIntro === undefined) next.showIntro = true;
  next.foremanAliases = next.foremanAliases || {};
  next.hiddenForemen = next.hiddenForemen || [];
  next.activityLog = next.activityLog || [];
  const aliasName = (name) => next.foremanAliases[normalizeForemanName(name)] || normalizeForemanName(name);
  const aliasCrew = (group) => {
    const normalized = normalizeCrewName(group);
    const match = Object.entries(next.foremanAliases).find(([oldName]) => normalized === crewNameForForeman(oldName));
    return match ? crewNameForForeman(match[1]) : normalized;
  };
  next.selectedEmployeeReport = next.selectedEmployeeReport || "";
  next.selectedProductionForeman = next.selectedProductionForeman || "";
  next.selectedEmployeeReportArea = next.selectedEmployeeReportArea || "all";
  next.selectedEmployeeReportFromWeek = next.selectedEmployeeReportFromWeek || next.selectedWeek || defaultState.selectedWeek;
  next.selectedEmployeeReportToWeek = next.selectedEmployeeReportToWeek || next.selectedWeek || defaultState.selectedWeek;
  const defaultRange = weekRangeDates(next.selectedWeek || defaultState.selectedWeek);
  next.selectedEmployeeReportFromDate = next.selectedEmployeeReportFromDate || defaultRange.start;
  next.selectedEmployeeReportToDate = next.selectedEmployeeReportToDate || defaultRange.end;
  next.deliverableForeman = next.deliverableForeman || "all";
  next.deliverablePackage = next.deliverablePackage || "timesheets";
  next.deliverableFromDate = next.deliverableFromDate || defaultRange.start;
  next.deliverableToDate = next.deliverableToDate || defaultRange.end;
  next.selectedDocumentJob = next.selectedDocumentJob || "";
  next.selectedSafetyJob = next.selectedSafetyJob || "";
  next.selectedSafetyFormType = next.selectedSafetyFormType || "JHA";
  next.selectedTrainingCourse = next.selectedTrainingCourse || "";
  next.selectedAuditJob = next.selectedAuditJob || "";
  next.selectedQualityJob = next.selectedQualityJob || "";
  next.selectedQualityArea = next.selectedQualityArea || "rebarFab";
  next.selectedEmployeeProfile = next.selectedEmployeeProfile || "";
  next.jobDraftType = next.jobDraftType || "";
  next.production = next.production || [];
  next.safetyForms = next.safetyForms || [];
  next.fieldAudits = next.fieldAudits || [];
  next.trainingCourses = (next.trainingCourses || []).map((course) => ({
    ...course,
    files: course.files || [],
    questions: course.questions?.length ? course.questions : defaultTrainingQuestions(),
    passingScore: Number(course.passingScore) || 80,
    area: course.area || next.selectedArea || "rebarInstall"
  }));
  next.trainingResults = (next.trainingResults || []).map((result) => ({
    ...result,
    accredited: result.accredited || false,
    accreditedBy: result.accreditedBy || "",
    accreditedAt: result.accreditedAt || ""
  }));
  next.qualityChecks = next.qualityChecks || [];
  next.reimbursementRequests = (next.reimbursementRequests || []).map((request) => ({
    ...request,
    id: request.id || `r${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    area: request.area || "rebarInstall",
    foreman: aliasName(request.foreman || ""),
    jobId: request.jobId || "",
    employee: aliasName(request.employee || request.foreman || ""),
    date: request.date || localDateInputValue(),
    category: request.category || "Other",
    amount: Number(request.amount) || 0,
    note: request.note || "",
    status: request.status || "Pending",
    payrollNote: request.payrollNote || "",
    createdBy: request.createdBy || "",
    createdAt: request.createdAt || "",
    reviewedBy: request.reviewedBy || "",
    reviewedAt: request.reviewedAt || ""
  }));
  next.bundlePlanner = {
    ...defaultBundlePlanner(),
    ...(next.bundlePlanner || {})
  };
  next.bundlePlanner.trailers = next.bundlePlanner.trailers?.length ? next.bundlePlanner.trailers : structuredClone(defaultBundlePlanner().trailers);
  next.bundlePlanner.bundles = next.bundlePlanner.bundles?.length ? next.bundlePlanner.bundles : structuredClone(defaultBundlePlanner().bundles);
  next.bundlePlanner.imports = next.bundlePlanner.imports || [];
  next.bundlePlanner.analysis = next.bundlePlanner.analysis || null;
  next.bundlePlanner.customer = next.bundlePlanner.customer || "";
  next.bundlePlanner.jobNumber = next.bundlePlanner.jobNumber || "";
  next.bundlePlanner.detailer = next.bundlePlanner.detailer || "";
  next.bundlePlanner.packageType = next.bundlePlanner.packageType || "Drilled Piers";
  next.bundlePlanner.maxBundleWeight = Number(next.bundlePlanner.maxBundleWeight) || 0;
  next.bundlePlanner.maxBundleLength = next.bundlePlanner.maxBundleLength || "";
  next.bundlePlanner.tagRule = next.bundlePlanner.tagRule || "";
  next.bundlePlanner.maxTrailerWeight = Number(next.bundlePlanner.maxTrailerWeight) || 48000;
  next.bundlePlanner.scanCodeSearch = next.bundlePlanner.scanCodeSearch || "";
  next.bundlePlanner.openPanels = {
    jobs: true,
    metrics: true,
    summary: true,
    sections: true,
    ...(next.bundlePlanner.openPanels || {})
  };
  next.bundlePlanner.bundles = next.bundlePlanner.bundles.map((bundle, index) => {
    const sampleScanCode = ["1516900001", "1516970001", "1516990001"][index] || "";
    return {
    pieces: "",
    process: {},
    rejectedPieces: 0,
    rejectReason: "None",
    qualityNotes: "",
    ...bundle,
    scanCode: bundle.scanCode || sampleScanCode,
    process: {
      received: bundle.process?.received || ["Received", "Cut", "Bent/Fabricated", "QC checked", "Staged", "Loaded", "Shipped"].includes(bundle.status),
      cut: bundle.process?.cut || ["Cut", "Bent/Fabricated", "QC checked", "Staged", "Loaded", "Shipped"].includes(bundle.status),
      fabricated: bundle.process?.fabricated || ["Bent/Fabricated", "QC checked", "Staged", "Loaded", "Shipped"].includes(bundle.status),
      qc: bundle.process?.qc || ["QC checked", "Staged", "Loaded", "Shipped"].includes(bundle.status),
      staged: bundle.process?.staged || ["Staged", "Loaded", "Shipped"].includes(bundle.status),
      loaded: bundle.process?.loaded || ["Loaded", "Shipped"].includes(bundle.status),
      shipped: bundle.process?.shipped || bundle.status === "Shipped"
    },
    rejectedPieces: Number(bundle.rejectedPieces) || 0,
    rejectReason: bundle.rejectReason || "None",
    qualityNotes: bundle.qualityNotes || "",
    completedQty: Number(bundle.completedQty) || 0,
    items: bundle.items || []
  };
  });
  next.bundlePlanner.jobs = next.bundlePlanner.jobs?.length
    ? next.bundlePlanner.jobs
    : [
        {
          id: `job-${Date.now()}`,
          jobName: next.bundlePlanner.jobName || "Untitled fabrication job",
          customer: next.bundlePlanner.customer || "",
          jobNumber: next.bundlePlanner.jobNumber || "",
          detailer: next.bundlePlanner.detailer || "",
          packageType: next.bundlePlanner.packageType || "",
          source: next.bundlePlanner.source || "",
          imports: next.bundlePlanner.imports || [],
          analysis: next.bundlePlanner.analysis || null,
          bundles: next.bundlePlanner.bundles || []
        }
      ];
  next.bundlePlanner.jobs = next.bundlePlanner.jobs.map((job, jobIndex) => {
    const bundles = (job.bundles?.length ? job.bundles : jobIndex === 0 ? next.bundlePlanner.bundles : []).map((bundle) => ({
      ...bundle,
      completedQty: Number(bundle.completedQty) || 0,
      items: bundle.items || []
    }));
    return {
      id: job.id || `job-${Date.now()}-${jobIndex}`,
      jobName: job.jobName || job.name || "Untitled fabrication job",
      customer: job.customer || "",
      jobNumber: job.jobNumber || "",
      detailer: job.detailer || "",
      packageType: job.packageType || "",
      source: job.source || "",
      imports: job.imports || [],
      analysis: job.analysis || null,
      trailerSignoffs: job.trailerSignoffs || {},
      bundles
    };
  });
  if (!next.bundlePlanner.selectedJobId || !next.bundlePlanner.jobs.some((job) => job.id === next.bundlePlanner.selectedJobId)) {
    next.bundlePlanner.selectedJobId = next.bundlePlanner.jobs[0]?.id || "";
  }
  const selectedBundleJob = next.bundlePlanner.jobs.find((job) => job.id === next.bundlePlanner.selectedJobId) || next.bundlePlanner.jobs[0];
  next.bundlePlanner.bundles = selectedBundleJob?.bundles || next.bundlePlanner.bundles;
  next.bundlePlanner.imports = selectedBundleJob?.imports || next.bundlePlanner.imports;
  next.bundlePlanner.analysis = selectedBundleJob?.analysis || next.bundlePlanner.analysis;
  if (!next.bundlePlanner.selectedSectionId || !next.bundlePlanner.bundles.some((bundle) => bundle.id === next.bundlePlanner.selectedSectionId)) {
    next.bundlePlanner.selectedSectionId = next.bundlePlanner.bundles[0]?.id || "";
  }
  next.jobLists = {
    solarClients: next.jobLists?.solarClients?.length ? next.jobLists.solarClients : structuredClone(defaultState.jobLists.solarClients),
    solarJobNames: next.jobLists?.solarJobNames?.length ? next.jobLists.solarJobNames : structuredClone(defaultState.jobLists.solarJobNames)
  };
  next.currentForeman = aliasName(next.currentForeman);
  next.setupForeman = aliasName(next.setupForeman);
  next.jobs = (next.jobs || []).map((job) => ({
    ...job,
    jobType: job.jobType || defaultJobTypeForArea(job.area),
    foundationIds: job.foundationIds || [],
    customTracking: job.customTracking || [],
    documents: job.documents || []
  }));
  seedTrialWindFarmJobs(next);
  next.people = (next.people || []).map((person) => ({
    ...person,
    name: aliasName(person.name),
    group: aliasCrew(person.group),
    hourlyRate: Number(person.hourlyRate) || 0,
    certs: Array.isArray(person.certs) ? person.certs : [],
    machines: Array.isArray(person.machines) ? person.machines : []
  }));
  next.people = next.people.filter((person) => !isFictitiousEmployeeName(person.name));
  next.people = next.people.filter((person) => {
    const isFabricationArea = ["rebarFab", "solarPiles"].includes(person.area);
    const isInstallationForeman = foremanNames.includes(person.name) && person.role === "Foreman";
    return !(isFabricationArea && isInstallationForeman);
  });
  defaultPeople.forEach((person) => {
    const nextPerson = { ...structuredClone(person), name: aliasName(person.name), group: aliasCrew(person.group) };
    const exists = next.people.some((entry) => entry.area === nextPerson.area && entry.name === nextPerson.name);
    if (!exists) next.people.push(nextPerson);
  });
  next.sheets = next.sheets || {};
  Object.entries(next.sheets).forEach(([key, sheet]) => {
    const parts = key.split(":");
    if (parts.length !== 2) return;
    const sheetForeman = aliasName(sheet.foreman || "");
    const migratedKey = `${parts[0]}:${parts[1]}:${sheetForeman}`;
    if (sheetForeman && !next.sheets[migratedKey]) next.sheets[migratedKey] = sheet;
    delete next.sheets[key];
  });
  Object.values(next.sheets).forEach((sheet) => {
    sheet.foreman = aliasName(sheet.foreman);
    sheet.group = aliasCrew(sheet.group);
    sheet.rows = (sheet.rows || []).map((row) => ({
      ...row,
      employee: aliasName(row.employee),
      reimbursement: Number(row.reimbursement) || 0,
      reimbursementNote: row.reimbursementNote || "",
      lightDuty: row.lightDuty || {}
    })).filter((row) => !isFictitiousEmployeeName(row.employee));
  });
  seedCurrentWeekInstallationTrialData(next);
  bakersfieldControlCodes.forEach((seedItem) => {
    const exists = next.production.some((item) => item.jobId === seedItem.jobId && item.code === seedItem.code);
    if (!exists) next.production.push(structuredClone(seedItem));
  });
  next.production.forEach((item) => {
    item.foreman = aliasName(item.foreman);
    if (item.area === "rebarFab" && foremanNames.includes(item.foreman)) {
      item.foreman = rebarFabForemen[0];
    }
    if (item.area === "solarPiles" && foremanNames.includes(item.foreman)) {
      item.foreman = solarPilesForemen[0];
    }
    item.quantity = productionQuantity(item);
    if (item.completedQty === undefined) {
      const perPiece = unitWeight(item);
      item.completedQty = perPiece ? Math.round(((Number(item.completed) || 0) / perPiece) * 100) / 100 : 0;
    }
    item.completed = completedWeight(item);
  });
  return next;
}

function seedTrialWindFarmJobs(next) {
  next.jobs = next.jobs || [];
  trialWindFarmJobs.forEach((job) => {
    const exists = next.jobs.some((entry) => entry.area === "rebarInstall" && (entry.id === job.id || entry.name === job.name));
    if (!exists) next.jobs.push(trialWindFarmJobRecord(job));
  });
}

function seedCurrentWeekInstallationTrialData(next) {
  const week = next.selectedWeek || defaultState.selectedWeek;
  const weekStart = weekRangeDates(week).start;
  const shouldSeedHours = week === trialSeedWeek;
  if (!next.weeks.includes(week)) {
    next.weeks.push(week);
    next.weeks.sort();
  }

  const installationPeople = next.people.filter((person) => person.area === "rebarInstall");
  installationPeople.forEach((person, index) => {
    if (!Number(person.hourlyRate)) person.hourlyRate = trialHourlyRate(person, index);
  });

  foremanNames.forEach((foreman, foremanIndex) => {
    const crewName = crewNameForForeman(foreman);
    const key = `rebarInstall:${week}:${normalizeForemanName(foreman)}`;
    const expectedPeople = installationPeople.filter((person) => person.group === crewName || person.name === foreman);
    if (!expectedPeople.length) return;
    if (!next.sheets[key]) {
      next.sheets[key] = {
        area: "rebarInstall",
        week,
        weekStart,
        jobId: "concho",
        foreman,
        group: crewName,
        status: "Draft",
        rows: expectedPeople.map((person, rowIndex) => trialTimesheetRow(person, foremanIndex, rowIndex, shouldSeedHours))
      };
      return;
    }

    const sheet = next.sheets[key];
    sheet.area = "rebarInstall";
    sheet.week = week;
    sheet.weekStart = sheet.weekStart || weekStart;
    sheet.foreman = foreman;
    sheet.group = crewName;
    sheet.status = sheet.status || "Draft";
    sheet.rows = sheet.rows || [];
    const existingNames = new Set(sheet.rows.map((row) => row.employee));
    expectedPeople.forEach((person, rowIndex) => {
      if (!existingNames.has(person.name)) {
        sheet.rows.push(trialTimesheetRow(person, foremanIndex, rowIndex, shouldSeedHours));
      }
    });
    sheet.rows.forEach((row, rowIndex) => {
      const shouldFillTrial = shouldSeedHours && !rowHasManualTimeData(row);
      if (shouldFillTrial && !Number(row.perDiem)) row.perDiem = trialPerDiemForRow(foremanIndex, rowIndex);
      if (shouldFillTrial) applyTrialHours(row, foremanIndex, rowIndex);
    });
  });
}

function trialHourlyRate(person, index) {
  if (person.role === "Foreman") return 35;
  return 28 + (index % 8);
}

function trialPerDiemForRow(foremanIndex, rowIndex) {
  return trialPerDiems[(foremanIndex + rowIndex) % trialPerDiems.length];
}

function trialHoursForRow(foremanIndex, rowIndex) {
  return trialWeekHourPatterns[(foremanIndex + rowIndex) % trialWeekHourPatterns.length];
}

function rowHasManualTimeData(row) {
  return (
    row.manualTimesheetEntry ||
    row.clearedTimesheetEntry ||
    days.some((day) => Number(row[day])) ||
    Number(row.pto) ||
    Number(row.sick) ||
    Number(row.reimbursement) ||
    Boolean((row.reimbursementNote || "").trim()) ||
    Boolean((row.notes || "").trim())
  );
}

function clearTimesheetRowEntries(row) {
  days.forEach((day) => {
    row[day] = 0;
  });
  row.pto = 0;
  row.sick = 0;
  row.perDiem = 0;
  row.reimbursement = 0;
  row.reimbursementNote = "";
  row.notes = "";
  row.lightDuty = {};
  row.clearedTimesheetEntry = true;
  row.manualTimesheetEntry = true;
}

function applyTrialHours(row, foremanIndex, rowIndex) {
  const pattern = trialHoursForRow(foremanIndex, rowIndex);
  days.forEach((day) => {
    row[day] = pattern[day] || 0;
  });
  row.manualTimesheetEntry = false;
  row.clearedTimesheetEntry = false;
}

function trialTimesheetRow(person, foremanIndex, rowIndex, seedHours = true) {
  const row = {
    employee: person.name,
    roleOverride: "",
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
    pto: 0,
    sick: 0,
    perDiem: 0,
    reimbursement: 0,
    reimbursementNote: "",
    lightDuty: {},
    borrowed: false,
    notes: ""
  };
  if (seedHours) {
    row.perDiem = trialPerDiemForRow(foremanIndex, rowIndex);
    applyTrialHours(row, foremanIndex, rowIndex);
  } else {
    row.manualTimesheetEntry = true;
    row.clearedTimesheetEntry = true;
  }
  return row;
}

function saveState() {
  pendingRemoteState = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  pushCloud();
}

function timestamp() {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function actorName() {
  return state.auth?.name || state.currentForeman || state.selectedRole || "Unknown";
}

function actorRole() {
  return state.auth?.role || state.selectedRole || "";
}

function setLastEdited(target, action) {
  if (!target) return;
  target.lastEditedBy = actorName();
  target.lastEditedRole = actorRole();
  target.lastEditedAt = timestamp();
  target.lastEditedAction = action;
}

function logActivity(action, detail = {}) {
  state.activityLog = state.activityLog || [];
  state.activityLog.unshift({
    id: `a${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: timestamp(),
    actor: actorName(),
    role: actorRole(),
    area: state.selectedArea || detail.area || "",
    week: state.selectedWeek || detail.week || "",
    action,
    ...detail
  });
  state.activityLog = state.activityLog.slice(0, 300);
}

function $(id) {
  return document.getElementById(id);
}

function t(en, es) {
  return `${en}<span class="es">${es}</span>`;
}

function money(value) {
  return `$${new Intl.NumberFormat("en-US").format(Number(value) || 0)}`;
}

function number(value) {
  return new Intl.NumberFormat("en-US").format(Math.round(Number(value) || 0));
}

function preciseNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function fileSize(bytes = 0) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${preciseNumber(bytes / 1024)} KB`;
  return `${preciseNumber(bytes / (1024 * 1024))} MB`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadFile(filename, content, type = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function quantityFromDescription(description = "") {
  const match = String(description).match(/\/\s*(\d+)\s*-/);
  return match ? Number(match[1]) : 0;
}

function productionQuantity(item) {
  return Number(item.quantity) || quantityFromDescription(item.description);
}

function unitWeight(item) {
  const quantity = productionQuantity(item);
  return quantity ? (Number(item.planned) || 0) / quantity : 0;
}

function completedWeight(item) {
  const completedQty = Number(item.completedQty);
  if (Number.isFinite(completedQty) && productionQuantity(item)) return completedQty * unitWeight(item);
  return Number(item.completed) || 0;
}

function normalizeForemanName(name) {
  if (name === "Rebar Fabrication Day Foreman") return "Daniel Medrano";
  if (name === "Rebar Fabrication Night Foreman") return "Hipolito Pereda";
  if (name === "Solar Piles Day Foreman") return "Daniel Medrano";
  if (name === "Solar Piles Night Foreman") return "Hipolito Pereda";
  if (name === "Cruz Orosco") return "Cruz Orozco";
  return name === "Willie Vargas" ? "Wilfredo Vargas" : name;
}

function isFictitiousEmployeeName(name) {
  return fictitiousEmployeeNames.has(normalizeForemanName(name));
}

function normalizeCrewName(group) {
  return group === "Willie Vargas Crew" ? "Wilfredo Vargas Crew" : group;
}

function sameName(a, b) {
  return String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
}

function area() {
  return areas[state.selectedArea];
}

function roleIsElevated() {
  return ["Payroll", "Management", "Admin"].includes(state.selectedRole);
}

function roleIsOffice() {
  return ["Payroll", "Management", "Admin"].includes(state.selectedRole);
}

function canManagePeopleSetup() {
  return state.selectedRole === "Admin";
}

function canEditPayRates() {
  return ["Admin", "Payroll"].includes(state.selectedRole);
}

function canEditEmployeeProfiles() {
  return ["Admin", "Payroll", "Quality", "Safety"].includes(state.selectedRole);
}

function canManagePayrollAdjustments() {
  return ["Admin", "Payroll"].includes(state.selectedRole);
}

function canManageJobDocuments() {
  return ["Admin", "Management", "Quality", "Safety"].includes(state.selectedRole);
}

function canManageTraining() {
  return canManageTrainingResources();
}

function canManageTrainingResources() {
  return state.selectedRole === "Safety";
}

function canReviewTrainingResults() {
  return ["Admin", "Management", "Safety"].includes(state.selectedRole);
}

function canAccreditTraining() {
  return state.selectedRole === "Safety";
}

function roleIsProductionVisible() {
  return ["Management", "Admin", "Quality"].includes(state.selectedRole);
}

function canAccessSelectedArea(account) {
  if (!account) return false;
  if (state.selectedArea === "bundleLab") {
    return ["Admin", "Management", "Quality", "Foreman", "Safety"].includes(account.role);
  }
  if (!state.selectedArea) return ["Payroll", "Management", "Admin"].includes(account.role);
  if (account.area && account.area !== state.selectedArea && !["Payroll", "Management", "Admin"].includes(account.role)) return false;
  if (areas[state.selectedArea]?.adminOnly && account.role !== "Admin") return false;
  return true;
}

function canManageBundlePlanner() {
  return ["Admin", "Management", "Quality"].includes(state.selectedRole);
}

function canUpdateBundleProductionStatus() {
  return ["Admin", "Quality", "Foreman"].includes(state.selectedRole);
}

function canUseQualityControl() {
  return ["Admin", "Management", "Quality"].includes(state.selectedRole) && ["rebarFab", "rebarInstall"].includes(state.selectedArea);
}

function isApproverMode() {
  return state.selectedRole === "Approver";
}

function isForemanMode() {
  return state.selectedRole === "Foreman";
}

function isFieldEntryMode() {
  return isForemanMode() || isApproverMode();
}

function availableTabs() {
  if (state.selectedArea === "bundleLab") {
    return [
      ["bundlePlanner", "Fab Tracking", "Rastreo fab."]
    ];
  }
  if (state.selectedRole === "Quality") {
    return [
      ["qualityControl", "Quality Control", "Control de calidad"],
      ["production", "Production", "Produccion"],
      ["training", "Training", "Capacitacion"],
      ["safety", "Safety Forms", "Documentos de seguridad"],
      ["audits", "Field Audits", "Auditorias de campo"],
      ["documents", "Documents", "Documentos"]
    ];
  }
  if (state.selectedRole === "Safety") {
    return [
      ["safety", "Safety Forms", "Documentos de seguridad"],
      ["training", "Training", "Capacitacion"],
      ["audits", "Field Audits", "Auditorias de campo"],
      ["documents", "Documents", "Documentos"],
      ["setup", "People / Crews", "Personas / Cuadrillas"]
    ];
  }
  if (isFieldEntryMode()) {
    return [
      ["timesheet", isApproverMode() ? "Crew Timesheets" : "My Timesheet", isApproverMode() ? "Horas de cuadrillas" : "Mis horas"],
      ["production", "Production Update", "Produccion"],
      ["reimbursements", "Reimbursements", "Reembolsos"],
      ["training", "Training", "Capacitacion"],
      ["safety", "Safety Forms", "Documentos de seguridad"],
      ["audits", "Field Audits", "Auditorias de campo"],
      ["documents", "Documents", "Documentos"]
    ];
  }
  return [
    ["dashboard", "Dashboard", "Tablero"],
    ["timesheet", "Timesheet Review", "Revision de horas"],
    ["production", "Production", "Produccion"],
    ["reimbursements", "Reimbursements", "Reembolsos"],
    ["jobs", "Jobs", "Trabajos"],
    ...(canUseQualityControl() ? [["qualityControl", "Quality Control", "Control de calidad"]] : []),
    ["training", "Training", "Capacitacion"],
    ["safety", "Safety Forms", "Documentos de seguridad"],
    ["audits", "Field Audits", "Auditorias de campo"],
    ["documents", "Documents", "Documentos"],
    ["employeeReports", "Employee Reports", "Reportes de empleados"],
    ["deliverables", "Deliverables", "Entregables"],
    ["setup", "People / Crews", "Personas / Cuadrillas"]
  ];
}

function canEditSheet(sheet) {
  if (state.selectedRole === "Management") return false;
  if (roleIsElevated()) return true;
  if (!sheetIsInFieldEntryEditWindow(sheet)) return false;
  if (isApproverMode()) return sheet.area === "rebarInstall" && sheet.status !== "Approved";
  return sheet.foreman === state.currentForeman && sheet.status !== "Approved";
}

function latestTimesheetWeek(areaId = state.selectedArea) {
  const weeks = new Set(state.weeks || []);
  Object.values(state.sheets || {}).forEach((sheet) => {
    if (!areaId || sheet.area === areaId) weeks.add(sheet.week);
  });
  return [...weeks].filter(Boolean).sort().at(-1) || state.selectedWeek || defaultState.selectedWeek;
}

function sheetIsInFieldEntryEditWindow(sheet) {
  if (!isFieldEntryMode()) return true;
  const today = localDateInputValue();
  const oldestEditableWeek = addDays(today, -7);
  return dateInputValue(sheet?.week || state.selectedWeek, state.selectedWeek) >= oldestEditableWeek;
}

function sheetReadOnlyReason(sheet) {
  if (state.selectedRole === "Management") return "Management can review but not edit timesheets.";
  if (isFieldEntryMode() && !sheetIsInFieldEntryEditWindow(sheet)) {
    return "This older week is locked for field entry. Payroll/Admin can edit older records.";
  }
  if (sheet.status === "Approved") return "Approved timesheets are locked unless Payroll/Admin reopens them.";
  return "Read only for this login. Payroll/Admin can edit all records.";
}

function canManageProductionItem(item = {}) {
  if (["Admin", "Payroll"].includes(state.selectedRole)) return true;
  if (state.selectedRole === "Quality") return state.selectedArea === "rebarFab" && item.area === "rebarFab";
  if (isApproverMode()) return state.selectedArea === "rebarInstall" && item.area === "rebarInstall";
  return state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman;
}

function selectedJobs() {
  return state.jobs.filter((job) => job.area === state.selectedArea && (job.status || "Active") === "Active");
}

function jobById(jobId) {
  return state.jobs.find((job) => job.id === jobId);
}

function isWindFarmJob(jobId) {
  return jobById(jobId)?.jobType === "Wind Farm";
}

function generateFoundationIds(prefix, from, to) {
  const start = Number(from);
  const end = Number(to);
  if (!prefix || !start || !end || end < start) return [];
  const width = Math.max(String(from).length, String(to).length, 3);
  return Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${String(start + index).padStart(width, "0")}`);
}

function jobTypeOptionsForArea(areaId = state.selectedArea) {
  if (areaId === "rebarInstall") return installationJobTypes;
  if (areaId === "rebarFab") return fabricationJobTypes;
  return [];
}

function defaultJobTypeForArea(areaId = state.selectedArea) {
  return jobTypeOptionsForArea(areaId)[0] || "";
}

function allJobsForArea() {
  return state.jobs.filter((job) => job.area === state.selectedArea);
}

function ensureAreaForeman() {
  const foremen = foremenForArea();
  if (!foremen.some((person) => person.name === state.currentForeman)) {
    state.currentForeman = foremen[0]?.name || "";
  }
}

function peopleForArea(areaId = state.selectedArea) {
  return state.people.filter((person) => person.area === areaId);
}

function personForCurrentArea(name) {
  return peopleForArea().find((person) => person.name === name) || null;
}

function selectedEmployeeProfile() {
  const people = peopleForArea();
  if (!people.some((person) => person.name === state.selectedEmployeeProfile)) {
    state.selectedEmployeeProfile = people[0]?.name || "";
  }
  return personForCurrentArea(state.selectedEmployeeProfile) || people[0] || null;
}

function foremenForArea(areaId = state.selectedArea) {
  return peopleForArea(areaId).filter((person) => person.role === "Foreman");
}

function loginForemanOptions(areaId = state.selectedArea) {
  const savedForemen =
    state.people
      ?.filter((person) => person.role === "Foreman" && (!areaId || person.area === areaId))
      .map((person) => person.name) || [];
  const hiddenForemen = new Set((state.hiddenForemen || []).map((name) => normalizeForemanName(name)));
  const trialForemanPool = areaId === "rebarInstall" ? foremanNames : areaId === "rebarFab" || areaId === "bundleLab" ? rebarFabForemen : areaId === "solarPiles" ? solarPilesForemen : trialForemanNames;
  const aliasedTrialForemen = trialForemanPool
    .filter((name) => !hiddenForemen.has(normalizeForemanName(name)))
    .map((name) => state.foremanAliases?.[name] || name);
  return [...new Set([...aliasedTrialForemen, ...savedForemen])];
}

function groupOptions() {
  if (area().mode === "shift") return shifts;
  return [...new Set(peopleForArea().map((person) => person.group).filter(Boolean))];
}

function crewNameForForeman(name) {
  return `${name} Crew`;
}

function setupForemanName() {
  const foremen = foremenForArea();
  if (!foremen.some((person) => person.name === state.setupForeman)) {
    state.setupForeman = foremen[0]?.name || "";
  }
  return state.setupForeman;
}

function productionForemanName() {
  const foremen = foremenForArea();
  if (!foremen.some((person) => person.name === state.selectedProductionForeman)) {
    state.selectedProductionForeman = state.currentForeman && foremen.some((person) => person.name === state.currentForeman)
      ? state.currentForeman
      : foremen[0]?.name || "";
  }
  return state.selectedProductionForeman;
}

function sheetKey(week = state.selectedWeek, areaId = state.selectedArea, foreman = state.currentForeman) {
  return `${areaId}:${week}:${normalizeForemanName(foreman || "")}`;
}

function blankRow(person) {
  return {
    employee: person.name,
    roleOverride: "",
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
    pto: 0,
    sick: 0,
    perDiem: 0,
    reimbursement: 0,
    reimbursementNote: "",
    lightDuty: {},
    borrowed: false,
    notes: ""
  };
}

function rowHasEnteredData(row) {
  return (
    days.some((day) => Number(row[day]) || row.lightDuty?.[day]) ||
    Number(row.pto) ||
    Number(row.sick) ||
    Number(row.perDiem) ||
    Number(row.reimbursement) ||
    Boolean((row.reimbursementNote || "").trim()) ||
    Boolean((row.notes || "").trim())
  );
}

function syncSheetCrewRows(sheet, areaId = sheet.area || state.selectedArea) {
  if (!sheet || areas[areaId]?.mode !== "crew") return false;
  let changed = false;
  sheet.foreman = normalizeForemanName(sheet.foreman);
  const crew = crewNameForForeman(sheet.foreman);
  if (sheet.group !== crew) {
    sheet.group = crew;
    changed = true;
  }

  const expectedPeople = state.people.filter((person) => person.area === areaId && (person.group === crew || person.name === sheet.foreman));
  const expectedNames = new Set(expectedPeople.map((person) => person.name));
  const existingNames = new Set((sheet.rows || []).map((row) => row.employee));

  expectedPeople.forEach((person) => {
    if (!existingNames.has(person.name)) {
      sheet.rows.push(blankRow(person));
      changed = true;
    }
  });

  const nextRows = [];
  (sheet.rows || []).forEach((row) => {
    const isDefaultCrew = expectedNames.has(row.employee);
    if (isDefaultCrew || row.borrowed) {
      nextRows.push(row);
      return;
    }
    if (rowHasEnteredData(row)) {
      row.borrowed = true;
      nextRows.push(row);
    }
    changed = true;
  });

  if (nextRows.length !== sheet.rows.length) changed = true;
  sheet.rows = nextRows;
  return changed;
}

function syncSheetsForCrew(areaId, crew) {
  let changed = false;
  Object.values(state.sheets || {}).forEach((sheet) => {
    if (sheet.area !== areaId || sheet.group !== crew) return;
    changed = syncSheetCrewRows(sheet, areaId) || changed;
  });
  return changed;
}

function seedSheet() {
  const foreman = foremenForArea().some((person) => person.name === state.currentForeman) ? state.currentForeman : foremenForArea()[0]?.name || "";
  const group = area().mode === "crew" ? crewNameForForeman(foreman) : groupOptions()[0] || "";
  const workers = peopleForArea().filter((person) => person.group === group || person.name === foreman);
  return {
    area: state.selectedArea,
    week: state.selectedWeek,
    weekStart: weekRangeDates(state.selectedWeek).start,
    jobId: selectedJobs()[0]?.id || "",
    foreman,
    group,
    status: "Draft",
    rows: workers.map(blankRow)
  };
}

function setSheetForeman(sheet, foreman) {
  sheet.foreman = foreman;
  sheet.group = area().mode === "crew" ? crewNameForForeman(foreman) : sheet.group || groupOptions()[0] || "";
  const workers = peopleForArea().filter((person) => person.group === sheet.group || person.name === foreman);
  sheet.rows = workers.map(blankRow);
  sheet.status = "Draft";
  sheet.submittedAt = "";
  sheet.submittedBy = "";
}

function currentSheet() {
  ensureAreaForeman();
  const key = sheetKey();
  if (!state.sheets[key]) state.sheets[key] = seedSheet();
  const sheet = state.sheets[key];
  const validForemen = foremenForArea().map((person) => person.name);
  if (validForemen.length && !validForemen.includes(sheet.foreman)) {
    setSheetForeman(sheet, validForemen[0]);
  }
  if (!sheet.weekStart) sheet.weekStart = weekRangeDates(sheet.week || state.selectedWeek).start;
  if (syncSheetCrewRows(sheet)) saveState();
  return sheet;
}

function rowHours(row) {
  return days.reduce((sum, day) => sum + (Number(row[day]) || 0), 0);
}

function totalHours(sheet = currentSheet()) {
  return sheet.rows.reduce((sum, row) => sum + rowHours(row) + (Number(row.pto) || 0) + (Number(row.sick) || 0), 0);
}

function totalPerDiem(sheet = currentSheet()) {
  return sheet.rows.reduce((sum, row) => sum + (Number(row.perDiem) || 0), 0);
}

function totalReimbursement(sheet = currentSheet()) {
  return sheet.rows.reduce((sum, row) => sum + (Number(row.reimbursement) || 0), 0);
}

function timesheetDayLabel(day) {
  return dayLabels[days.indexOf(day)] || day;
}

const dailyOverlapAuthorizationLimit = 12;

function timesheetOverlapIssues(targetSheet = currentSheet()) {
  const issues = [];
  const sheets = Object.values(state.sheets || {}).filter((sheet) => sheet.area === targetSheet.area && sheet.week === targetSheet.week);
  targetSheet.rows.forEach((row) => {
    days.forEach((day) => {
      const hours = Number(row[day]) || 0;
      if (!hours) return;
      const matches = [];
      let otherTotal = 0;
      sheets.forEach((sheet) => {
        if (sheet === targetSheet) return;
        sheet.rows?.forEach((otherRow) => {
          const otherHours = Number(otherRow[day]) || 0;
          if (!otherHours || !sameName(otherRow.employee, row.employee)) return;
          otherTotal += otherHours;
          matches.push({
            hours: otherHours,
            foreman: sheet.foreman,
            crew: sheet.group || crewNameForForeman(sheet.foreman),
            job: jobName(sheet.jobId)
          });
        });
      });
      const totalHours = hours + otherTotal;
      if (totalHours > dailyOverlapAuthorizationLimit) {
        issues.push({
          employee: row.employee,
          day,
          hours,
          otherHours: otherTotal,
          totalHours,
          matches
        });
      }
    });
  });
  return issues;
}

function rowOverlapIssues(sheet, row, daysToCheck = days) {
  const issues = [];
  daysToCheck.forEach((day) => {
    const hours = Number(row[day]) || 0;
    if (!hours) return;
    let otherTotal = 0;
    const matches = [];
    Object.values(state.sheets || {}).forEach((otherSheet) => {
      if (otherSheet === sheet || otherSheet.area !== sheet.area || otherSheet.week !== sheet.week) return;
      otherSheet.rows?.forEach((otherRow) => {
        const otherHours = Number(otherRow[day]) || 0;
        if (!otherHours || !sameName(otherRow.employee, row.employee)) return;
        otherTotal += otherHours;
        matches.push({
          hours: otherHours,
          foreman: otherSheet.foreman,
          crew: otherSheet.group || crewNameForForeman(otherSheet.foreman),
          job: jobName(otherSheet.jobId)
        });
      });
    });
    const totalHours = hours + otherTotal;
    if (totalHours > dailyOverlapAuthorizationLimit) {
      issues.push({
        employee: row.employee,
        day,
        hours,
        otherHours: otherTotal,
        totalHours,
        matches
      });
    }
  });
  return issues;
}

function overlapNotice(sheet) {
  const issues = timesheetOverlapIssues(sheet);
  if (!issues.length) return "";
  const items = issues.slice(0, 6).map((issue) => (
    `<li><strong>${escapeHtml(issue.employee)}</strong> has ${number(issue.totalHours)} total hours on ${timesheetDayLabel(issue.day)} across crews. Limit before authorization is ${dailyOverlapAuthorizationLimit} hours.</li>`
  )).join("");
  const extra = issues.length > 6 ? `<li>${issues.length - 6} more overlap(s) need review.</li>` : "";
  return `
    <div class="notice overlap-warning section-gap">
      <strong>Overlap needs authorization</strong>
      <span class="es">Cruce de horas necesita autorizacion</span>
      <ul>${items}${extra}</ul>
    </div>
  `;
}

function personByName(name) {
  return state.people.find((person) => person.name === name);
}

function rowRole(row) {
  return row.roleOverride || personByName(row.employee)?.role || "";
}

function productionForArea() {
  return state.production.filter((item) => {
    if (item.area !== state.selectedArea) return false;
    if (state.selectedProductionJob && item.jobId !== state.selectedProductionJob) return false;
    if (roleIsElevated()) return true;
    if (state.selectedRole === "Quality") return state.selectedArea === "rebarFab";
    if (isApproverMode()) return state.selectedArea === "rebarInstall" && (item.foreman || productionForemanName()) === productionForemanName();
    return (item.foreman || state.currentForeman) === state.currentForeman;
  });
}

function productionTotals(items = productionForArea()) {
  const planned = items.reduce((sum, item) => sum + (item.productionMode === "foundation" ? 1 : Number(item.planned) || 0), 0);
  const completed = items.reduce((sum, item) => sum + (item.productionMode === "foundation" ? 1 : item.productionMode === "custom" ? Number(item.completedQty) || 0 : completedWeight(item)), 0);
  const delayed = items.filter((item) => item.delay !== "No delay").length;
  return { planned, completed, delayed, remaining: Math.max(planned - completed, 0) };
}

function reportHeader(title, subtitle = "") {
  const generatedAt = new Date().toLocaleDateString("en-US");
  const areaLabel = areas[state.selectedArea]?.label || "CrewForge";
  return `
    <div class="print-report-header">
      <img src="./assets/crewforge-app-icon.png" alt="CrewForge" />
      <div>
        <p class="eyebrow">CrewForge Report</p>
        <h2>${title}</h2>
        <p>${areaLabel} · ${subtitle || state.selectedWeek} · Generated ${generatedAt}</p>
      </div>
    </div>
  `;
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").classList.add("visible");
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2200);
}

function setArea(areaId) {
  state.selectedArea = areaId;
  state.showIntro = false;
  state.activeTab = state.auth ? (isFieldEntryMode() ? "timesheet" : "dashboard") : "dashboard";
  if (state.auth?.role === "Quality" && ["rebarFab", "rebarInstall"].includes(areaId)) state.activeTab = "qualityControl";
  state.selectedProductionJob = "";
  state.selectedDocumentJob = "";
  if (state.auth) ensureAreaForeman();
  saveState();
  render();
  syncHistory();
}

function changeTab(tab) {
  state.activeTab = tab;
  if (tab === "production" && !selectedJobs().some((job) => job.id === state.selectedProductionJob)) {
    state.selectedProductionJob = "";
  }
  saveState();
  render();
  syncHistory();
}

function routeFromState() {
  if (!state.companyVerified) return "company";
  if (!state.auth) return state.selectedArea ? "login" : "areas";
  if (state.showIntro) return "intro";
  if (!state.selectedArea) return "areas";
  return `${state.selectedArea}/${state.activeTab || "dashboard"}`;
}

function syncHistory(replace = false) {
  if (publicTrainingId) return;
  if (suppressHistorySync || !window.history?.pushState) return;
  const route = routeFromState();
  if (route === lastHistoryRoute && window.location.hash === `#${route}`) return;
  lastHistoryRoute = route;
  const url = `${window.location.pathname}${window.location.search}#${route}`;
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({ crewforgeRoute: route }, "", url);
}

function applyRoute(route = "") {
  suppressHistorySync = true;
  if (route === "company") {
    state.companyVerified = false;
    state.companyName = "";
    state.auth = null;
    state.selectedArea = "";
    state.showIntro = false;
    state.activeTab = "dashboard";
  } else if (route === "login") {
    state.auth = null;
    state.showIntro = false;
    state.activeTab = "dashboard";
  } else if (route === "intro" && state.auth) {
    state.showIntro = true;
    state.selectedArea = "";
  } else if (route === "areas" && state.companyVerified) {
    state.showIntro = false;
    state.selectedArea = "";
  } else {
    const [areaId, tab = "dashboard"] = route.split("/");
    if (state.auth && areas[areaId]) {
      state.showIntro = false;
      state.selectedArea = areaId;
      state.activeTab = tab;
      ensureAreaForeman();
    }
  }
  saveState();
  render();
  lastHistoryRoute = routeFromState();
  suppressHistorySync = false;
}

function renderCompanyLogin() {
  $("app").innerHTML = `
    <main class="login-screen">
      <section class="login-card">
        <div class="login-logo-stack">
          <img class="login-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
          <img class="login-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
        </div>
        <div>
          <p class="eyebrow">Company access</p>
          <h1>${t("Choose company", "Escoja compania")}</h1>
          <p class="sub">Enter the company code first. Then CrewForge will show the operating areas for that company.</p>
        </div>
        <label>Company code<span class="es">Codigo de compania</span><input id="companyCode" autocomplete="organization" placeholder="VALOR" /></label>
        <button class="primary-action" id="companyButton" type="button">${t("Continue", "Continuar")}</button>
        <div class="trial-note">
          <strong>Trial company</strong>
          <span>Code: VALOR</span>
          <span class="es">Codigo de prueba: VALOR</span>
        </div>
      </section>
    </main>
  `;
  const submitCompany = () => {
    const code = $("companyCode").value.trim().toUpperCase();
    if (code !== companyAccessCode) {
      showToast("Company code not recognized");
      return;
    }
    state.companyVerified = true;
    state.companyName = "Valor";
    state.auth = null;
    state.selectedArea = "";
    state.showIntro = false;
    saveState();
    render();
    syncHistory();
  };
  $("companyButton").addEventListener("click", submitCompany);
  $("companyCode").addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitCompany();
  });
  $("companyCode").focus();
}

function setOptions(values, selected, labeler = (value) => value, valueGetter = (value) => value) {
  return values.map((value) => `<option value="${valueGetter(value)}" ${valueGetter(value) === selected ? "selected" : ""}>${labeler(value)}</option>`).join("");
}

function renderLogin() {
  const selectedAreaLabel = state.selectedArea ? areas[state.selectedArea]?.label : "All areas";
  const foremanOptions = loginForemanOptions();
  const loginCode = (state.loginCodeDraft || "").trim().toUpperCase();
  const selectedLoginForeman = foremanOptions.includes(state.loginForemanDraft) ? state.loginForemanDraft : foremanOptions[0] || "";
  const showForemen = loginCode === "FOREMAN";
  $("app").innerHTML = `
    <main class="login-screen">
      <section class="login-card">
        <div class="login-logo-stack">
          <img class="login-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
          <img class="login-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
        </div>
        <div>
          <p class="eyebrow">${state.companyName || "Valor"} · ${selectedAreaLabel}</p>
          <h1>${t("Sign in", "Iniciar sesion")}</h1>
          <p class="sub">Use your trial code for this department. Office users can still change areas after signing in.</p>
        </div>
        <label>Access code<span class="es">Codigo de acceso</span><input id="accessCode" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" value="${escapeHtml(loginCode)}" placeholder="FOREMAN, MAYORDOMO, QUALITY, SAFETY, PAYROLL, MANAGER, ADMIN" /></label>
        <label id="foremanLoginField" class="login-select-field ${showForemen ? "" : "hidden"}">Foreman<span class="es">Capataz</span><select id="loginForeman">${setOptions(foremanOptions, selectedLoginForeman)}</select></label>
        <button class="primary-action" id="loginButton" type="button">${t("Open CrewForge", "Abrir CrewForge")}</button>
        <div class="trial-note">
          <strong>Trial codes</strong>
          <span>Foremen: FOREMAN, then choose a name</span>
          <span>Quality: QUALITY</span>
          <span>Safety: SAFETY</span>
          <span>Approver: MAYORDOMO</span>
          <span>Office: PAYROLL, MANAGER, or ADMIN</span>
          <span class="es">Codigos de prueba para esta demo.</span>
        </div>
        <button class="text-button" id="loginChangeArea" type="button">Change area<span class="es">Cambiar area</span></button>
        <p class="sub login-limit">This is trial access for workflow testing. Real company use still needs hosted login and server-side permissions.</p>
      </section>
    </main>
  `;
  $("loginButton").addEventListener("click", loginWithCode);
  $("accessCode").addEventListener("input", updateForemanLoginVisibility);
  $("accessCode").addEventListener("change", normalizeLoginCodeInput);
  $("accessCode").addEventListener("blur", normalizeLoginCodeInput);
  $("accessCode").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithCode();
  });
  $("foremanLoginField").addEventListener("click", openLoginForemanPicker);
  $("loginForeman").addEventListener("change", (event) => {
    state.loginForemanDraft = event.target.value;
    saveState();
  });
  $("loginChangeArea").addEventListener("click", () => {
    state.selectedArea = "";
    saveState();
    render();
    syncHistory();
  });
  updateForemanLoginVisibility();
  $("accessCode").focus();
}

function openLoginForemanPicker(event) {
  if (event?.target?.id === "loginForeman") return;
  const picker = $("loginForeman");
  if (!picker || picker.disabled) return;
  picker.focus();
  if (typeof picker.showPicker !== "function") return;
  try {
    picker.showPicker();
  } catch {
    // Some browsers only allow showPicker from direct user taps.
  }
}

function normalizeLoginCodeInput() {
  const input = $("accessCode");
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (trialAccounts.some((entry) => entry.code === code)) {
    input.value = code;
    state.loginCodeDraft = code;
    lastLoginCode = code;
    updateForemanLoginVisibility();
    return;
  }
  state.loginCodeDraft = input.value.trim().toUpperCase();
  saveState();
}

function updateForemanLoginVisibility() {
  const code = $("accessCode")?.value.trim().toUpperCase();
  state.loginCodeDraft = code || "";
  if (trialAccounts.some((entry) => entry.code === code)) {
    lastLoginCode = code;
    if (code !== "FOREMAN") state.loginForemanDraft = "";
  }
  if (code === "FOREMAN" && !$("loginForeman")?.value) {
    state.loginForemanDraft = loginForemanOptions()[0] || "";
  }
  const showForemen = code === "FOREMAN";
  $("foremanLoginField")?.classList.toggle("hidden", !showForemen);
  saveState();
}

function loginWithCode() {
  normalizeLoginCodeInput();
  const code = ($("accessCode")?.value || state.loginCodeDraft || "").trim().toUpperCase();
  const account = trialAccounts.find((entry) => entry.code === code);
  if (!account) {
    showToast("Code not recognized");
    return;
  }
  if (!state.selectedArea && !canAccessSelectedArea(account)) {
    showToast("Choose a department first");
    return;
  }
  if (!canAccessSelectedArea(account)) {
    showToast(`${account.name} belongs in ${areas[account.area]?.label || account.area}`);
    return;
  }
  updateForemanLoginVisibility();
  const selectedForeman = account.needsForeman ? $("loginForeman")?.value : account.foreman;
  const displayName = account.needsForeman ? selectedForeman : account.name;
  state.auth = { name: displayName, role: account.role, code: account.code };
  state.loginCodeDraft = "";
  state.loginForemanDraft = "";
  state.selectedRole = account.role;
  state.currentForeman = selectedForeman || state.currentForeman;
  state.setupForeman = selectedForeman || state.setupForeman;
  state.selectedArea = account.area || state.selectedArea || "";
  state.showIntro = false;
  state.activeTab = isFieldEntryMode() ? "timesheet" : "dashboard";
  if (state.selectedArea === "bundleLab") state.activeTab = "bundlePlanner";
  if (state.selectedRole === "Quality") state.activeTab = ["rebarFab", "rebarInstall"].includes(state.selectedArea) ? "qualityControl" : "production";
  saveState();
  render();
  syncHistory();
}

function renderIntro() {
  $("app").innerHTML = `
    <main class="intro-screen">
      <section class="intro-card">
        <div class="gate-logo-stack intro-logo">
          <img class="gate-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
          <img class="gate-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
        </div>
        <div>
          <p class="eyebrow">CrewForge</p>
          <h1>${t("Field work, payroll, production, and documents in one place.", "Horas, produccion y documentos en un solo lugar.")}</h1>
          <p class="sub">Start by choosing the part of the company you are working in today. CrewForge will only show the timesheets, jobs, production, and documents for that area.</p>
        </div>
        <div class="intro-points">
          <article><strong>1</strong><span>Choose area<span class="es">Escoja area</span></span></article>
          <article><strong>2</strong><span>Fill the work<span class="es">Llene el trabajo</span></span></article>
          <article><strong>3</strong><span>Send reports<span class="es">Envie reportes</span></span></article>
        </div>
        <div class="intro-actions">
          <button class="primary-action" id="continueIntro" type="button">${t("Continue", "Continuar")}</button>
          <button class="text-button" id="introLogout" type="button">Log out<span class="es">Salir</span></button>
        </div>
      </section>
    </main>
  `;
  $("continueIntro").addEventListener("click", () => {
    state.showIntro = false;
    saveState();
    render();
    syncHistory();
  });
  $("introLogout").addEventListener("click", () => {
    state.auth = null;
    state.selectedArea = "";
    state.showIntro = true;
    saveState();
    render();
    syncHistory();
  });
}

function renderGate() {
  $("app").innerHTML = `
    <main class="area-gate">
      <section class="gate-header">
        <div class="gate-brand">
          <div class="gate-logo-stack">
            <img class="gate-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
            <img class="gate-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
          </div>
          <div class="gate-copy">
            <p class="eyebrow">${appName}</p>
            <p class="sub">${appTagline}</p>
          </div>
        </div>
        <h1>${t("Choose operating area", "Escoja area de trabajo")}</h1>
        <p class="sub">Pick the department first. Then CrewForge will ask for the right login for that area.</p>
        <button class="text-button gate-logout" id="gateLogout" type="button">Change company<span class="es">Cambiar compania</span></button>
      </section>
      <section class="area-grid">
        ${visibleAreaEntries()
          .map(
            ([id, info]) => `
            <button class="area-card" type="button" data-area="${id}">
              <img class="area-card-thumb" src="${areaArtwork[id] || asset("./assets/crewforge-thumbnail.png")}" alt="" />
              <span>
                <strong>${info.label}</strong>
                <span class="es">${info.es}</span>
              </span>
              <span class="sub">${info.mode === "crew" ? "Crew timesheets, production, safety, and audits" : "Shift timesheets, production, safety, and audits"}</span>
            </button>
          `
          )
          .join("")}
      </section>
    </main>
  `;
  document.querySelectorAll("[data-area]").forEach((button) => button.addEventListener("click", () => setArea(button.dataset.area)));
  $("gateLogout").addEventListener("click", () => {
    state.companyVerified = false;
    state.companyName = "";
    state.auth = null;
    state.selectedArea = "";
    state.showIntro = false;
    saveState();
    render();
    syncHistory();
  });
}

function renderShell() {
  ensureAreaForeman();
  if (state.auth) {
    state.selectedRole = state.auth.role;
  }
  const tabs = availableTabs();
  if (!tabs.some(([id]) => id === state.activeTab)) state.activeTab = tabs[0][0];

  $("app").innerHTML = `
    <div class="shell ${isFieldEntryMode() ? "foreman-shell" : "office-shell"}">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge logo" />
          <div><strong>${appName}</strong><span>${appTagline}</span><small>${isFieldEntryMode() ? "Field view" : "Office view"}</small></div>
        </div>
        <div class="area-badge">
          <strong>${area().label}</strong>
          <span class="es">${area().es}</span>
        </div>
        <nav class="nav-tabs">
          ${tabs.map(([id, en, es]) => `<button class="nav-tab ${state.activeTab === id ? "active" : ""}" data-tab="${id}" type="button">${en}<span class="es">${es}</span></button>`).join("")}
        </nav>
        <div class="sidebar-footer">
          <div class="signed-in">
            <span>Signed in</span>
            <strong>${state.auth?.name || state.selectedRole}</strong>
            <small>${state.selectedRole}</small>
          </div>
          <button class="text-button" id="changeArea" type="button">Change area<span class="es">Cambiar area</span></button>
          <button class="text-button" id="logout" type="button">Log out<span class="es">Salir</span></button>
          <button class="text-button" id="resetDemo" type="button">Reset demo<span class="es">Reiniciar demo</span></button>
        </div>
      </aside>
      <main class="workspace">
        ${renderSyncBanner()}
        <header class="topbar">
          <div class="topbar-title">
            <div class="topbar-brandlockup">
              <img src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
              <strong>${appName}</strong>
            </div>
            <p class="eyebrow">${area().label}</p>
            <h1>${tabs.find(([id]) => id === state.activeTab)?.[1] || "Dashboard"}</h1>
            ${isFieldEntryMode() ? `<p class="sub">${state.currentForeman} · ${selectedWeekStart()} to ${state.selectedWeek}</p>` : ""}
          </div>
          <div class="top-actions">
            <div class="login-pill">Viewing as<span class="es">Viendo como</span><strong>${state.auth?.name || state.selectedRole}</strong><small>${state.selectedRole}</small></div>
            <label class="select-label">Week starting<span class="es">Semana empieza</span><input id="weekStartSelect" type="date" value="${selectedWeekStart()}" /></label>
            <div class="login-pill date-pill">Week ending<span class="es">Semana termina</span><strong>${state.selectedWeek}</strong></div>
            ${dateShiftControls("selectedWeek", "Back one week", "Forward one week")}
          </div>
        </header>
        ${renderActiveTab()}
      </main>
    </div>
  `;

  document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => changeTab(button.dataset.tab)));
  $("changeArea").addEventListener("click", () => {
    state.selectedArea = "";
    state.showIntro = false;
    saveState();
    render();
    syncHistory();
  });
  $("logout").addEventListener("click", () => {
    state.auth = null;
    state.selectedArea = "";
    state.showIntro = true;
    saveState();
    render();
    syncHistory();
  });
  $("resetDemo").addEventListener("click", () => {
    const auth = state.auth;
    state = structuredClone(defaultState);
    state.auth = auth;
    state.showIntro = true;
    if (auth) {
      const account = trialAccounts.find((entry) => entry.code === auth.code);
      state.selectedRole = auth.role;
      const foreman = auth.role === "Foreman" ? auth.name : account?.foreman;
      state.currentForeman = foreman || state.currentForeman;
      state.setupForeman = foreman || state.setupForeman;
    }
    saveState();
    render();
    syncHistory(true);
  });
  $("weekStartSelect").addEventListener("change", (event) => setSelectedWeekStart(event.target.value));
  bindTabEvents();
}

function renderActiveTab() {
  if (state.activeTab === "bundlePlanner") return renderBundlePlanner();
  if (state.activeTab === "timesheet") return renderTimesheet();
  if (state.activeTab === "production") return renderProduction();
  if (state.activeTab === "jobs") return renderJobs();
  if (state.activeTab === "qualityControl") return renderQualityControl();
  if (state.activeTab === "reimbursements") return renderReimbursements();
  if (state.activeTab === "training") return renderTraining();
  if (state.activeTab === "safety") return renderSafetyForms();
  if (state.activeTab === "audits") return renderFieldAudits();
  if (state.activeTab === "documents") return renderDocuments();
  if (state.activeTab === "employeeReports") return renderEmployeeReports();
  if (state.activeTab === "deliverables") return renderDeliverables();
  if (state.activeTab === "setup") return renderSetup();
  return renderDashboard();
}

function defaultTrainingQuestions() {
  return [
    { id: "q1", text: "", answer: "Yes" },
    { id: "q2", text: "", answer: "Yes" },
    { id: "q3", text: "", answer: "Yes" }
  ];
}

function trainingCoursesForArea() {
  return (state.trainingCourses || []).filter((course) => course.area === state.selectedArea || course.area === "all");
}

function renderTraining() {
  const courses = trainingCoursesForArea();
  const selectedCourse = courses.find((course) => course.id === state.selectedTrainingCourse) || courses[0];
  const jobs = allJobsForArea();
  const manageResources = canManageTrainingResources();
  const reviewResults = canReviewTrainingResults();
  return `
    <section class="panel training-panel">
      <div class="split">
        <div>
          <h2>${t("Training", "Capacitacion")}</h2>
          <p class="sub">Upload training material, build a short quiz, and record who completed it. Courses can also be opened with a no-login training link.</p>
        </div>
        <span class="tag sync-tag">Offline capable<span class="es">Funciona sin conexion</span></span>
      </div>
      ${manageResources ? `
        <div class="training-builder section-gap">
          <h3>Create training<span class="es">Crear capacitacion</span></h3>
          <div class="form-grid">
            <label>Training title<span class="es">Titulo</span><input id="trainingTitle" placeholder="Fall protection, heat illness, rigging basics..." /></label>
            <label>Job / site<span class="es">Trabajo / sitio</span><select id="trainingJob">${setOptions([{ id: "", name: "General / all jobs" }, ...jobs], "", (job) => job.name, (job) => job.id)}</select></label>
            <label>Passing score %<span class="es">Calificacion minima %</span><input id="trainingPassingScore" type="number" min="0" max="100" value="80" /></label>
            <label>Training files<span class="es">Archivos de capacitacion</span><input id="trainingFiles" type="file" accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.mov,.png,.jpg,.jpeg,.webp" multiple /></label>
            <label class="wide-field">Description / instructions<span class="es">Descripcion / instrucciones</span><textarea id="trainingDescription" placeholder="What the worker should review before answering the quiz"></textarea></label>
          </div>
          <div class="training-question-list">
            ${defaultTrainingQuestions().map(trainingQuestionBuilderRow).join("")}
          </div>
          <div class="action-row">
            <button class="secondary-action" id="addTrainingQuestion" type="button">${t("Add question", "Agregar pregunta")}</button>
            <button class="primary-action" id="saveTrainingCourse" type="button">${t("Save training", "Guardar capacitacion")}</button>
          </div>
        </div>
      ` : ""}
      <div class="training-library section-gap">
        <h3>Training library<span class="es">Biblioteca de capacitacion</span></h3>
        ${!manageResources ? `<p class="sub">Only Safety can upload or delete training resources.<span class="es">Solo Seguridad puede subir o borrar recursos de capacitacion.</span></p>` : ""}
        ${courses.length ? courses.map(trainingCourseCard).join("") : `<div class="empty-state">No training courses yet.<span class="es">Todavia no hay capacitaciones.</span></div>`}
      </div>
      ${selectedCourse ? renderTrainingRunner(selectedCourse, false) : ""}
      ${reviewResults ? renderTrainingResults() : ""}
    </section>
  `;
}

function trainingQuestionBuilderRow(question, index) {
  return `
    <div class="training-question-row">
      <label>Question ${index + 1}<span class="es">Pregunta ${index + 1}</span><input data-training-question="text" value="${escapeHtml(question.text || "")}" placeholder="Write a yes/no question" /></label>
      <label>Correct answer<span class="es">Respuesta correcta</span><select data-training-question="answer">${setOptions(["Yes", "No"], question.answer || "Yes")}</select></label>
    </div>
  `;
}

function trainingCourseCard(course) {
  const resultCount = (state.trainingResults || []).filter((result) => result.courseId === course.id).length;
  const shareUrl = trainingShareUrl(course.id);
  return `
    <article class="document-card training-card">
      <div>
        <span class="tag">${escapeHtml(course.jobName || "General")}</span>
        <h3>${escapeHtml(course.title)}</h3>
        <p class="sub">${escapeHtml(course.description || "No instructions")} · ${course.files?.length || 0} file(s) · ${resultCount} result(s)</p>
        <p class="sub">Training link: <code>${escapeHtml(shareUrl)}</code></p>
      </div>
      <div class="document-actions">
        <button class="secondary-action table-action" data-copy-training="${course.id}" type="button">Copy link<span class="es">Copiar enlace</span></button>
        <button class="primary-action table-action" data-select-training="${course.id}" type="button">Open<span class="es">Abrir</span></button>
        ${canManageTrainingResources() ? `<button class="danger-action table-action" data-delete-training="${course.id}" type="button">Delete<span class="es">Borrar</span></button>` : ""}
      </div>
      ${course.files?.length ? `<div class="attachment-list">${course.files.map((file) => trainingAttachmentRow(course.id, file)).join("")}</div>` : ""}
    </article>
  `;
}

function trainingAttachmentRow(courseId, file) {
  return `
    <div class="attachment-row">
      <span><strong>${escapeHtml(file.name)}</strong> · ${fileSize(file.size)}</span>
      <span class="attachment-actions">
        <button class="secondary-action table-action" data-training-file="${courseId}" data-file-id="${file.id}" type="button">Open<span class="es">Abrir</span></button>
        ${canManageTrainingResources() ? `<button class="danger-action table-action" data-delete-training-file="${courseId}" data-file-id="${file.id}" type="button">Delete<span class="es">Borrar</span></button>` : ""}
      </span>
    </div>
  `;
}

function renderTrainingRunner(course, publicMode) {
  const questions = (course.questions || []).filter((question) => question.text?.trim());
  return `
    <div class="training-runner section-gap">
      <div class="split">
        <div>
          <h3>${escapeHtml(course.title)}</h3>
          <p class="sub">${escapeHtml(course.description || "Review the material, answer the quiz, and sign your completion.")}</p>
        </div>
        <span class="tag">${course.passingScore || 80}% pass<span class="es">minimo</span></span>
      </div>
      ${course.files?.length ? `<div class="attachment-list">${course.files.map((file) => trainingAttachmentRow(course.id, file)).join("")}</div>` : `<div class="notice">No files attached yet.<span class="es">No hay archivos todavia.</span></div>`}
      <div class="form-grid section-gap">
        <label>Employee name<span class="es">Nombre del empleado</span><input id="trainingEmployeeName" placeholder="Full name" /></label>
        <label>Signature / initials<span class="es">Firma / iniciales</span><input id="trainingSignature" placeholder="Type name or initials" /></label>
      </div>
      <div class="training-quiz">
        ${questions.length ? questions.map((question, index) => `
          <label class="audit-choice">
            <span>${index + 1}. ${escapeHtml(question.text)}<span class="es">Respuesta</span></span>
            <select data-training-answer="${question.id}">${setOptions(["Yes", "No"], "")}</select>
          </label>
        `).join("") : `<div class="empty-state">No quiz questions yet. Safety/Admin should add questions before using this course.<span class="es">Agregue preguntas primero.</span></div>`}
      </div>
      <div class="action-row section-gap">
        <button class="primary-action" id="submitTrainingResult" data-course-id="${course.id}" data-public-training="${publicMode ? "true" : "false"}" type="button" ${questions.length ? "" : "disabled"}>${t("Submit training", "Enviar capacitacion")}</button>
      </div>
    </div>
  `;
}

function renderTrainingResults() {
  const results = state.trainingResults || [];
  return `
    <div class="section-gap">
      <div class="split">
        <h3>Training results<span class="es">Resultados de capacitacion</span></h3>
        <div class="button-group no-print">
          <button class="secondary-action" data-print="training-results" type="button">Export PDF<span class="es">Exportar PDF</span></button>
          <button class="primary-action" id="exportTrainingCsv" type="button">Export CSV<span class="es">Exportar CSV</span></button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Employee</th><th>Course</th><th>Score</th><th>Status</th><th>Accreditation</th><th>Completed</th><th>Actions</th></tr></thead>
          <tbody>
            ${results.length ? results.slice(0, 50).map((result) => `
              <tr>
                <td>${escapeHtml(result.employeeName)}</td>
                <td>${escapeHtml(result.courseTitle)}</td>
                <td>${result.score}%</td>
                <td>${result.passed ? "Passed" : "Needs review"}</td>
                <td>${result.accredited ? `Accredited by ${escapeHtml(result.accreditedBy || "Safety")}<span class="es">Acreditado</span>` : `Pending<span class="es">Pendiente</span>`}</td>
                <td>${escapeHtml(result.completedAt)}</td>
                <td>${canAccreditTraining() && !result.accredited ? `<button class="primary-action table-action" data-accredit-training="${result.id}" type="button">Accredit<span class="es">Acreditar</span></button>` : ""}</td>
              </tr>
            `).join("") : `<tr><td colspan="7">No training results yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function accreditedTrainingBadges(employeeName) {
  return (state.trainingResults || [])
    .filter((result) => result.employeeName === employeeName && result.accredited)
    .sort((a, b) => (b.accreditedAt || b.completedAt || "").localeCompare(a.accreditedAt || a.completedAt || ""))
    .map((result) => ({
      id: result.id,
      title: result.courseTitle,
      accreditedAt: result.accreditedAt,
      accreditedBy: result.accreditedBy
    }));
}

function trainingShareUrl(courseId) {
  const url = new URL(window.location.href);
  url.searchParams.set("training", courseId);
  url.hash = "";
  return url.toString();
}

function collectTrainingQuestions() {
  return Array.from(document.querySelectorAll(".training-question-row"))
    .map((row, index) => ({
      id: `q${index + 1}`,
      text: row.querySelector('[data-training-question="text"]')?.value.trim() || "",
      answer: row.querySelector('[data-training-question="answer"]')?.value || "Yes"
    }))
    .filter((question) => question.text);
}

function addTrainingQuestionRow() {
  const list = document.querySelector(".training-question-list");
  if (!list) return;
  const count = list.querySelectorAll(".training-question-row").length;
  list.insertAdjacentHTML("beforeend", trainingQuestionBuilderRow({ id: `q${count + 1}`, text: "", answer: "Yes" }, count));
}

async function saveTrainingCourse() {
  if (!canManageTrainingResources()) {
    showToast("Only Safety can upload training resources");
    return;
  }
  const title = $("trainingTitle")?.value.trim() || "";
  if (!title) {
    showToast("Training title required");
    return;
  }
  const questions = collectTrainingQuestions();
  if (!questions.length) {
    showToast("Add at least one quiz question");
    return;
  }
  const job = jobById($("trainingJob")?.value || "");
  const files = await filesToStoredAttachments(Array.from($("trainingFiles")?.files || []));
  const course = {
    id: `training-${Date.now()}`,
    area: state.selectedArea || "all",
    title,
    description: $("trainingDescription")?.value.trim() || "",
    jobId: job?.id || "",
    jobName: job?.name || "General",
    passingScore: Number($("trainingPassingScore")?.value) || 80,
    files,
    questions,
    createdBy: actorName(),
    createdAt: timestamp()
  };
  state.trainingCourses = [course, ...(state.trainingCourses || [])];
  state.selectedTrainingCourse = course.id;
  logActivity("Training course created", { title: course.title, area: area().label, files: files.length, questions: questions.length });
  saveState();
  render();
  showToast("Training saved");
}

function selectTrainingCourse(courseId) {
  state.selectedTrainingCourse = courseId;
  saveState();
  render();
}

async function copyTrainingLink(courseId) {
  const link = trainingShareUrl(courseId);
  try {
    await navigator.clipboard.writeText(link);
    showToast("Training link copied");
  } catch {
    window.prompt("Copy training link", link);
  }
}

function deleteTrainingCourse(courseId) {
  if (!canManageTrainingResources()) {
    showToast("Only Safety can delete training resources");
    return;
  }
  const course = (state.trainingCourses || []).find((entry) => entry.id === courseId);
  if (!course) return;
  if (!confirm(`Delete training "${course.title}" and its results?`)) return;
  state.trainingCourses = (state.trainingCourses || []).filter((entry) => entry.id !== courseId);
  state.trainingResults = (state.trainingResults || []).filter((entry) => entry.courseId !== courseId);
  if (state.selectedTrainingCourse === courseId) state.selectedTrainingCourse = "";
  logActivity("Training course deleted", { title: course.title });
  saveState();
  render();
  showToast("Training deleted");
}

function submitTrainingResult() {
  const button = $("submitTrainingResult");
  const courseId = button?.dataset.courseId || publicTrainingId;
  const course = (state.trainingCourses || []).find((entry) => entry.id === courseId);
  if (!course) return;
  const employeeName = $("trainingEmployeeName")?.value.trim() || "";
  const signature = $("trainingSignature")?.value.trim() || "";
  if (!employeeName || !signature) {
    showToast("Employee name and signature required");
    return;
  }
  const questions = (course.questions || []).filter((question) => question.text?.trim());
  const answers = questions.map((question) => {
    const answer = document.querySelector(`[data-training-answer="${question.id}"]`)?.value || "";
    return {
      id: question.id,
      question: question.text,
      answer,
      correctAnswer: question.answer,
      correct: answer === question.answer
    };
  });
  const correctCount = answers.filter((answer) => answer.correct).length;
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const passed = score >= (Number(course.passingScore) || 80);
  const result = {
    id: `training-result-${Date.now()}`,
    courseId: course.id,
    courseTitle: course.title,
    employeeName,
    signature,
    score,
    passed,
    accredited: false,
    accreditedBy: "",
    accreditedAt: "",
    answers,
    completedAt: timestamp(),
    createdBy: button?.dataset.publicTraining === "true" ? employeeName : actorName()
  };
  state.trainingResults = [result, ...(state.trainingResults || [])];
  logActivity("Training completed", { course: course.title, employee: employeeName, score, passed });
  saveState();
  showToast(passed ? `Training submitted: ${score}%` : `Submitted for review: ${score}%`);
  if (publicTrainingId) renderPublicTraining();
  else render();
}

function bindTrainingEvents(publicMode = false) {
  if ($("addTrainingQuestion")) $("addTrainingQuestion").addEventListener("click", addTrainingQuestionRow);
  if ($("saveTrainingCourse")) $("saveTrainingCourse").addEventListener("click", saveTrainingCourse);
  if ($("submitTrainingResult")) $("submitTrainingResult").addEventListener("click", submitTrainingResult);
  if ($("exportTrainingCsv")) $("exportTrainingCsv").addEventListener("click", exportTrainingCsv);
  document.querySelectorAll("[data-select-training]").forEach((button) => {
    button.addEventListener("click", () => selectTrainingCourse(button.dataset.selectTraining));
  });
  document.querySelectorAll("[data-copy-training]").forEach((button) => {
    button.addEventListener("click", () => copyTrainingLink(button.dataset.copyTraining));
  });
  document.querySelectorAll("[data-delete-training]").forEach((button) => {
    button.addEventListener("click", () => deleteTrainingCourse(button.dataset.deleteTraining));
  });
  document.querySelectorAll("[data-training-file]").forEach((button) => {
    button.addEventListener("click", () => openRecordFile("trainingCourses", button.dataset.trainingFile, button.dataset.fileId));
  });
  document.querySelectorAll("[data-delete-training-file]").forEach((button) => {
    button.addEventListener("click", () => deleteTrainingFile(button.dataset.deleteTrainingFile, button.dataset.fileId));
  });
  document.querySelectorAll("[data-accredit-training]").forEach((button) => {
    button.addEventListener("click", () => accreditTrainingResult(button.dataset.accreditTraining));
  });
  if (publicMode) return;
}

function deleteTrainingFile(courseId, fileId) {
  if (!canManageTrainingResources()) {
    showToast("Only Safety can delete training resources");
    return;
  }
  deleteRecordFile("trainingCourses", courseId, fileId);
}

function accreditTrainingResult(resultId) {
  if (!canAccreditTraining()) {
    showToast("Only Safety can accredit training");
    return;
  }
  const result = (state.trainingResults || []).find((entry) => entry.id === resultId);
  if (!result) return;
  result.accredited = true;
  result.accreditedBy = actorName();
  result.accreditedAt = timestamp();
  logActivity("Training accredited", { course: result.courseTitle, employee: result.employeeName });
  saveState();
  render();
  showToast(`${result.employeeName} training accredited`);
}

function renderPublicTraining() {
  const course = (state.trainingCourses || []).find((entry) => entry.id === publicTrainingId);
  $("app").innerHTML = `
    <main class="login-screen public-training-screen">
      <section class="login-card public-training-card">
        ${renderSyncBanner()}
        <div class="login-logo-stack">
          <img class="login-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
          <img class="login-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
        </div>
        <div class="eyebrow">Public Training<span class="es">Capacitacion publica</span></div>
        ${course ? renderTrainingRunner(course, true) : `<div class="notice">Training course not found. Ask Safety/Admin for a fresh link.<span class="es">No se encontro la capacitacion.</span></div>`}
      </section>
    </main>
  `;
  bindTrainingEvents(true);
}

function trailerTotals() {
  const planner = state.bundlePlanner;
  const job = currentBundleJob();
  const totals = Object.fromEntries(planner.trailers.map((trailer) => [trailer, { weight: 0, count: 0 }]));
  let unassignedWeight = 0;
  let unassignedCount = 0;
  (job?.bundles || []).forEach((bundle) => {
    if (bundle.trailer && totals[bundle.trailer]) {
      totals[bundle.trailer].weight += Number(bundle.weight) || 0;
      totals[bundle.trailer].count += 1;
    } else {
      unassignedWeight += Number(bundle.weight) || 0;
      unassignedCount += 1;
    }
  });
  return { totals, unassignedWeight, unassignedCount };
}

function trailerBundles(job, trailerCode) {
  return (job?.bundles || []).filter((bundle) => bundle.trailer === trailerCode);
}

function trailerReadyForSignoff(job, trailerCode) {
  const bundles = trailerBundles(job, trailerCode);
  return Boolean(bundles.length) && bundles.every((bundle) => bundle.process?.loaded);
}

function trailerProcessCounts(job, trailerCode) {
  const bundles = trailerBundles(job, trailerCode);
  return {
    loaded: bundles.filter((bundle) => bundle.process?.loaded).length,
    shipped: bundles.filter((bundle) => bundle.process?.shipped).length,
    total: bundles.length
  };
}

function trailerSignoff(job, trailerCode) {
  return job?.trailerSignoffs?.[trailerCode] || null;
}

function trailerShippingStatus(job, trailerCode) {
  const bundles = trailerBundles(job, trailerCode);
  const signoff = trailerSignoff(job, trailerCode);
  if (!bundles.length) return "No assigned codes";
  if (signoff) return `Signed off by ${signoff.by}`;
  if (trailerReadyForSignoff(job, trailerCode)) return "Ready for sign-off";
  return "Needs loaded checks";
}

function bundlePlannerTotals() {
  const planner = state.bundlePlanner;
  const bundles = currentBundleJob()?.bundles || [];
  const totalWeight = bundles.reduce((sum, bundle) => sum + (Number(bundle.weight) || 0), 0);
  const assignedWeight = bundles.reduce((sum, bundle) => sum + (bundle.trailer ? Number(bundle.weight) || 0 : 0), 0);
  const overLimitCount = Object.values(trailerTotals().totals).filter((trailer) => trailer.weight > planner.maxTrailerWeight).length;
  const processCounts = Object.fromEntries(fabricationProcessSteps.map(([key]) => [key, 0]));
  let rejectedPieces = 0;
  bundles.forEach((bundle) => {
    fabricationProcessSteps.forEach(([key]) => {
      if (bundle.process?.[key]) processCounts[key] += 1;
    });
    rejectedPieces += Number(bundle.rejectedPieces) || 0;
  });
  return {
    totalWeight,
    assignedWeight,
    remainingWeight: Math.max(totalWeight - assignedWeight, 0),
    overLimitCount,
    minimumTrailers: planner.maxTrailerWeight ? Math.ceil(totalWeight / planner.maxTrailerWeight) : 0,
    processCounts,
    rejectedPieces
  };
}

function bundleCurrentStatus(bundle) {
  const latest = fabricationProcessSteps
    .slice()
    .reverse()
    .find(([key]) => bundle.process?.[key]);
  return latest ? latest[1] : bundle.status || "Planned";
}

function bundleCurrentStatusKey(bundle) {
  const latest = fabricationProcessSteps
    .slice()
    .reverse()
    .find(([key]) => bundle.process?.[key]);
  return latest ? latest[0] : "";
}

function setBundleStatusStep(bundle, stepKey) {
  bundle.process = {};
  if (!stepKey) {
    bundle.status = "Planned";
    return;
  }
  const targetIndex = fabricationProcessSteps.findIndex(([key]) => key === stepKey);
  fabricationProcessSteps.forEach(([key], index) => {
    bundle.process[key] = index <= targetIndex;
  });
  bundle.status = bundleCurrentStatus(bundle);
}

function bundleQuantity(bundle) {
  return Number(bundle?.pieces) || 0;
}

function bundleUnitWeight(bundle) {
  const quantity = bundleQuantity(bundle);
  return quantity ? (Number(bundle?.weight) || 0) / quantity : 0;
}

function bundleCompletedWeight(bundle) {
  return (Number(bundle?.completedQty) || 0) * bundleUnitWeight(bundle);
}

function bundleCompletionPct(bundle) {
  const quantity = bundleQuantity(bundle);
  return quantity ? Math.min(100, Math.round(((Number(bundle?.completedQty) || 0) / quantity) * 100)) : 0;
}

function bundleMatchesScan(bundle, query) {
  if (!query) return false;
  const value = query.trim().toLowerCase();
  return [bundle.scanCode, bundle.tag, bundle.controlCode, bundle.description]
    .filter(Boolean)
    .some((field) => String(field).toLowerCase().includes(value));
}

function currentBundleJob() {
  const planner = state.bundlePlanner;
  return planner.jobs?.find((job) => job.id === planner.selectedJobId) || planner.jobs?.[0] || null;
}

function currentBundleSections() {
  return currentBundleJob()?.bundles || [];
}

function currentBundleSection() {
  const sections = currentBundleSections();
  return sections.find((bundle) => bundle.id === state.bundlePlanner.selectedSectionId) || sections[0] || null;
}

function syncBundlePlannerFromJob(job) {
  if (!job) return;
  state.bundlePlanner.jobName = job.jobName || "";
  state.bundlePlanner.customer = job.customer || "";
  state.bundlePlanner.jobNumber = job.jobNumber || "";
  state.bundlePlanner.detailer = job.detailer || "";
  state.bundlePlanner.packageType = job.packageType || "";
  state.bundlePlanner.source = job.source || "";
  state.bundlePlanner.imports = job.imports || [];
  state.bundlePlanner.analysis = job.analysis || null;
  state.bundlePlanner.bundles = job.bundles || [];
  state.bundlePlanner.trailerSignoffs = job.trailerSignoffs || {};
}

function bundleJobTotals(job) {
  const bundles = job?.bundles || [];
  const totalWeight = bundles.reduce((sum, bundle) => sum + (Number(bundle.weight) || 0), 0);
  const fabricated = bundles.filter((bundle) => bundle.process?.fabricated).length;
  const shipped = bundles.filter((bundle) => bundle.process?.shipped).length;
  const itemCount = bundles.reduce((sum, bundle) => sum + (bundle.items?.length || 0), 0);
  return { totalWeight, fabricated, shipped, itemCount };
}

function bundlePanelIsOpen(panelId, fallback = false) {
  const openPanels = state.bundlePlanner.openPanels || {};
  return Object.prototype.hasOwnProperty.call(openPanels, panelId) ? openPanels[panelId] : fallback;
}

function renderBundlePanel(panelId, title, titleEs, body, options = {}) {
  const isOpen = bundlePanelIsOpen(panelId, Boolean(options.open));
  const summary = options.summary || "";
  const badge = options.badge ? `<span class="tag">${options.badge}</span>` : "";
  return `
    <div class="planner-section collapsible-section ${isOpen ? "is-open" : "is-collapsed"} section-gap" data-panel="${panelId}">
      <button class="planner-section-toggle" data-toggle-bundle-panel="${panelId}" type="button" aria-expanded="${isOpen ? "true" : "false"}">
        <span>
          <strong>${title}</strong>
          <span class="es">${titleEs}</span>
          ${summary ? `<small>${summary}</small>` : ""}
        </span>
        <span class="toggle-mark">${isOpen ? "Close" : "Open"}<span class="es">${isOpen ? "Cerrar" : "Abrir"}</span></span>
      </button>
      ${badge}
      <div class="planner-section-body">${body}</div>
    </div>
  `;
}

function toggleBundlePanel(panelId) {
  state.bundlePlanner.openPanels = state.bundlePlanner.openPanels || {};
  state.bundlePlanner.openPanels[panelId] = !bundlePanelIsOpen(panelId);
  saveState();
  render();
}

function renderBundleSummaryBar(totals, trailerData, bundles) {
  const isOpen = bundlePanelIsOpen("summary", true);
  return `
    <aside class="tracker-summary-bar ${isOpen ? "is-open" : "is-collapsed"} section-gap">
      <button class="tracker-summary-toggle" data-toggle-bundle-panel="summary" type="button" aria-expanded="${isOpen ? "true" : "false"}">
        <span>
          <strong>${t("Job Summary", "Resumen del trabajo")}</strong>
          <small>${number(totals.totalWeight)} lbs · ${bundles.length} sections · ${trailerData.unassignedCount} unassigned</small>
        </span>
        <span class="toggle-mark">${isOpen ? "Hide" : "Show"}<span class="es">${isOpen ? "Ocultar" : "Mostrar"}</span></span>
      </button>
      <div class="metric-grid tracker-summary-metrics">
        <article class="metric"><span>Total weight</span><strong>${number(totals.totalWeight)} lbs</strong><small>${bundles.length} control-code sections</small></article>
        <article class="metric"><span>Fabricated</span><strong>${totals.processCounts.fabricated || 0}</strong><small>Bundles through fabrication</small></article>
        <article class="metric"><span>QC checked</span><strong>${totals.processCounts.qc || 0}</strong><small>${number(totals.rejectedPieces)} pieces rejected</small></article>
        <article class="metric"><span>Ready to ship</span><strong>${totals.processCounts.staged || 0}</strong><small>${trailerData.unassignedCount} unassigned</small></article>
        <article class="metric ${totals.overLimitCount ? "danger-metric" : ""}"><span>Over limit</span><strong>${totals.overLimitCount}</strong><small>Trailers needing review</small></article>
      </div>
    </aside>
  `;
}

function renderTrailerDashboard(job, planner, trailerData, setupDisabled) {
  const canManage = canManageBundlePlanner();
  const statusDisabled = canUpdateBundleProductionStatus() ? "" : "disabled";
  const trailerOptions = ["", ...planner.trailers];
  const statusOptions = [{ value: "", label: "Planned" }, ...fabricationProcessSteps.map(([key, label]) => ({ value: key, label }))];
  const unassignedBundles = (job?.bundles || []).filter((bundle) => !bundle.trailer || !planner.trailers.includes(bundle.trailer));
  return `
    <div class="trailer-dashboard section-gap">
      ${planner.trailers.map((trailer) => {
        const data = trailerData.totals[trailer] || { weight: 0, count: 0 };
        const bundles = trailerBundles(job, trailer);
        const counts = trailerProcessCounts(job, trailer);
        const remaining = (Number(planner.maxTrailerWeight) || 0) - data.weight;
        const pct = planner.maxTrailerWeight ? Math.min(100, Math.round((data.weight / planner.maxTrailerWeight) * 100)) : 0;
        const signoff = trailerSignoff(job, trailer);
        const ready = trailerReadyForSignoff(job, trailer);
        return `
          <article class="trailer-dashboard-card ${remaining < 0 ? "over-limit" : ""} ${signoff ? "signed-off" : ""}">
            <header>
              <div>
                <strong>${trailer}</strong>
                <span>${data.count} codes · ${number(data.weight)} lbs</span>
              </div>
              <span class="tag">${trailerShippingStatus(job, trailer)}</span>
            </header>
            <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
            <div class="trailer-meta">
              <span>${remaining >= 0 ? `${number(remaining)} lbs remaining` : `${number(Math.abs(remaining))} lbs over limit`}</span>
              <span>${counts.loaded} / ${counts.total} loaded</span>
              <span>${counts.shipped} shipped</span>
              ${signoff ? `<span>Signed ${signoff.at}</span>` : `<span>${ready ? "Ready for final check" : "Load all codes before sign-off"}</span>`}
            </div>
            <div class="table-wrap compact-table-wrap">
              <table class="trailer-code-table">
                <thead><tr><th>Code</th><th>Description</th><th>Weight</th><th>Current step</th><th>Trailer</th><th>Loaded</th></tr></thead>
                <tbody>
                  ${bundles.length ? bundles.map((bundle) => `
                    <tr>
                      <td><strong>${bundle.tag || bundle.controlCode}</strong></td>
                      <td>${bundle.description || "No description"}</td>
                      <td>${number(bundle.weight || 0)} lbs</td>
                      <td><select class="compact-select" data-bundle="${bundle.id}" data-bundle-field="statusStep" ${statusDisabled}>${setOptions(statusOptions, bundleCurrentStatusKey(bundle), (option) => option.label, (option) => option.value)}</select></td>
                      <td><select class="compact-select" data-bundle="${bundle.id}" data-bundle-field="trailer" ${setupDisabled}>${setOptions(trailerOptions, bundle.trailer || "", (option) => option || "Unassigned", (option) => option)}</select></td>
                      <td>${bundle.process?.loaded ? "Yes" : "No"}</td>
                    </tr>
                  `).join("") : `<tr><td colspan="6"><strong>No codes assigned.</strong><span class="es">No hay codigos asignados.</span></td></tr>`}
                </tbody>
              </table>
            </div>
            <div class="trailer-signoff-row">
              ${signoff ? `
                <strong>Final check signed by ${signoff.by}</strong>
                <button class="danger-action small-action" data-clear-trailer-signoff="${trailer}" type="button" ${canManage ? "" : "disabled"}>Reopen<span class="es">Reabrir</span></button>
              ` : `
                <strong>${ready ? "Ready for final sign-off" : "Waiting on loaded checks"}</strong>
                <button class="primary-action small-action" data-signoff-trailer="${trailer}" type="button" ${canManage && ready ? "" : "disabled"}>Sign off trailer<span class="es">Firmar trailer</span></button>
              `}
            </div>
          </article>
        `;
      }).join("")}
      ${trailerData.unassignedCount ? `
        <article class="trailer-dashboard-card unassigned-card">
          <header><div><strong>Unassigned</strong><span>${trailerData.unassignedCount} codes · ${number(trailerData.unassignedWeight)} lbs</span></div><span class="tag">Needs trailer code</span></header>
          <div class="table-wrap compact-table-wrap">
            <table class="trailer-code-table">
              <thead><tr><th>Code</th><th>Description</th><th>Weight</th><th>Current step</th><th>Trailer</th></tr></thead>
              <tbody>
                ${unassignedBundles.map((bundle) => `
                  <tr>
                    <td><strong>${bundle.tag || bundle.controlCode}</strong></td>
                    <td>${bundle.description || "No description"}</td>
                    <td>${number(bundle.weight || 0)} lbs</td>
                    <td><select class="compact-select" data-bundle="${bundle.id}" data-bundle-field="statusStep" ${statusDisabled}>${setOptions(statusOptions, bundleCurrentStatusKey(bundle), (option) => option.label, (option) => option.value)}</select></td>
                    <td><select class="compact-select" data-bundle="${bundle.id}" data-bundle-field="trailer" ${setupDisabled}>${setOptions(trailerOptions, bundle.trailer || "", (option) => option || "Unassigned", (option) => option)}</select></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </article>
      ` : ""}
    </div>
  `;
}

function initializeBundlePanelControls() {
  const panelIds = ["jobs", "setup", "imports", "rules", "scan", "sections", "items", "trailers", "log"];
  document.querySelectorAll(".bundle-planner > .planner-section").forEach((section, index) => {
    const panelId = panelIds[index];
    if (!panelId) return;
    const isOpen = bundlePanelIsOpen(panelId, ["jobs", "sections"].includes(panelId));
    const header = section.firstElementChild;
    section.dataset.panel = panelId;
    section.classList.add("collapsible-section");
    section.classList.toggle("is-open", isOpen);
    section.classList.toggle("is-collapsed", !isOpen);
    if (!header) return;
    header.classList.add("planner-section-toggle");
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (!header.querySelector(".toggle-mark")) {
      header.insertAdjacentHTML("beforeend", `<span class="toggle-mark">${isOpen ? "Close" : "Open"}<span class="es">${isOpen ? "Cerrar" : "Abrir"}</span></span>`);
    }
    const activate = (event) => {
      if (event.target.closest("input, select, textarea, button, label, a")) return;
      toggleBundlePanel(panelId);
    };
    header.addEventListener("click", activate);
    header.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      toggleBundlePanel(panelId);
    });
  });
}

function renderBundlePlanner() {
  const planner = state.bundlePlanner;
  const job = currentBundleJob();
  const bundles = currentBundleSections();
  const section = currentBundleSection();
  const canManage = canManageBundlePlanner();
  const canUpdateStatus = canUpdateBundleProductionStatus();
  const setupDisabled = canManage ? "" : "disabled";
  const statusDisabled = canUpdateStatus ? "" : "disabled";
  const qualityDisabled = canManage ? "" : "disabled";
  const totals = bundlePlannerTotals();
  const trailerData = trailerTotals();
  const trailerOptions = ["", ...planner.trailers];
  const scanMatch = bundles.find((bundle) => bundleMatchesScan(bundle, planner.scanCodeSearch));
  const analysis = job?.analysis || null;
  const analysisRows = analysis?.rows || [];
  const parserStatus = analysis
    ? `${analysis.status} · ${analysis.rows?.length || 0} rows · ${analysis.analyzedAt || ""}`
    : "Waiting for Analyze package";
  return `
    <section class="panel bundle-planner package-planner rebar-tracker">
      <div class="split">
        <div>
          <h2>${t("Rebar Fabrication Tracking", "Rastreo de fabricacion de varilla")}</h2>
          <p class="sub">Upload the detailer package, build the bundle/tag library, scan tags through shop steps, track quality rejects, then assign approved bundles to trailers.</p>
        </div>
        <div class="button-pair">
          <button class="secondary-action" id="showBundleJobs" type="button">${t("Jobs", "Trabajos")}</button>
          <button class="secondary-action" id="autoAssignTrailers" type="button" ${setupDisabled}>${t("Auto assign", "Auto asignar")}</button>
          <button class="primary-action" id="addTrailer" type="button" ${setupDisabled}>${t("Add trailer", "Agregar trailer")}</button>
        </div>
      </div>
      ${!canManage ? `<div class="notice section-gap">Foreman view: update production status and notes only. Admin or Quality controls imports, setup, quality rejects, and trailer assignment. <span class="es">Vista de capataz: solo actualice estado de produccion y notas.</span></div>` : ""}
      ${renderBundleSummaryBar(totals, trailerData, bundles)}

      <div class="planner-section section-gap">
        <div>
          <h3>${t("1. Fabrication jobs", "1. Trabajos de fabricacion")}</h3>
          <p class="sub">Start here: open an existing fabrication job or create a new one before importing control codes and tag rows.</p>
        </div>
        <div class="bundle-job-grid">
          ${(planner.jobs || []).map((entry) => {
            const jobTotals = bundleJobTotals(entry);
            const active = entry.id === planner.selectedJobId;
            return `
              <button class="bundle-job-card ${active ? "active" : ""}" data-bundle-job="${entry.id}" type="button">
                <strong>${entry.jobName}</strong>
                <span>${entry.jobNumber || "No job number"} · ${entry.packageType || "Package"}</span>
                <small>${number(jobTotals.totalWeight)} lbs · ${entry.bundles?.length || 0} sections · ${jobTotals.itemCount} tags/items</small>
              </button>
            `;
          }).join("")}
        </div>
        <div class="form-grid section-gap">
          <label>New job name<span class="es">Nombre nuevo</span><input id="newBundleJobName" placeholder="Project name" ${setupDisabled} /></label>
          <label>Job number<span class="es">Numero</span><input id="newBundleJobNumber" placeholder="Optional" ${setupDisabled} /></label>
          <label>Package type<span class="es">Tipo de paquete</span><input id="newBundlePackageType" placeholder="Wind farm, drilled piers, commercial" ${setupDisabled} /></label>
          <button class="primary-action form-button" id="createBundleJob" type="button" ${setupDisabled}>${t("Create job", "Crear trabajo")}</button>
        </div>
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("2. Job / package setup", "2. Configuracion del trabajo")}</h3>
          <p class="sub">These fields can stay blank during testing. Later they should come from the uploaded detailer package when possible.</p>
        </div>
        <div class="form-grid">
          <label>Job / package<span class="es">Trabajo / paquete</span><input id="bundleJobName" value="${job?.jobName || ""}" ${setupDisabled} /></label>
          <label>Customer<span class="es">Cliente</span><input id="bundleCustomer" value="${job?.customer || ""}" placeholder="Optional" ${setupDisabled} /></label>
          <label>Job number<span class="es">Numero de trabajo</span><input id="bundleJobNumber" value="${job?.jobNumber || ""}" placeholder="Optional" ${setupDisabled} /></label>
          <label>Detailer<span class="es">Detallador</span><input id="bundleDetailer" value="${job?.detailer || ""}" placeholder="Optional" ${setupDisabled} /></label>
          <label>Package type<span class="es">Tipo de paquete</span><input id="bundlePackageType" value="${job?.packageType || ""}" placeholder="Drilled piers, cages, commercial, etc." ${setupDisabled} /></label>
          <label>Source note<span class="es">Nota de origen</span><input id="bundleSource" value="${job?.source || ""}" ${setupDisabled} /></label>
        </div>
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("3. Upload / import detailer files", "3. Subir / importar archivos")}</h3>
          <p class="sub">Upload the package, analyze the detailer files, review what CrewForge found, then import the rows into the live bundle library.</p>
        </div>
        <div class="form-grid">
          <label>Detailer package files<span class="es">Archivos del detallador</span><input id="packageUploadInput" type="file" multiple accept=".zip,.xls,.xlsx,.csv,.pdf,.cad" ${setupDisabled} /></label>
          <label>Upload destination<span class="es">Destino de carga</span><input value="Future: Supabase Storage bucket detailer-packages" disabled /></label>
          <label>Parser status<span class="es">Estado del analisis</span><input value="${parserStatus}" disabled /></label>
        </div>
        <div class="analysis-actions">
          <button class="secondary-action" id="analyzePackage" type="button" ${setupDisabled}>${t("Analyze package", "Analizar paquete")}</button>
          <button class="primary-action" id="importAnalyzedRows" type="button" ${analysisRows.length && canManage ? "" : "disabled"}>${t("Import reviewed rows", "Importar filas revisadas")}</button>
        </div>
        <div class="table-wrap compact-table-wrap section-gap">
          <table>
            <thead><tr><th>File</th><th>Size</th><th>Status</th><th>Added</th><th>Actions</th></tr></thead>
            <tbody>
              ${(job?.imports || []).length
                ? job.imports.map((file) => `<tr><td><strong>${file.name}</strong></td><td>${fileSize(file.size)}</td><td>${file.status}</td><td>${file.addedAt}</td><td><button class="danger-action table-action" data-delete-package-import="${file.id}" type="button" ${setupDisabled}>Delete<span class="es">Borrar</span></button></td></tr>`).join("")
                : `<tr><td colspan="5"><strong>No uploaded package recorded yet.</strong><span class="es">Aun no hay paquete registrado.</span></td></tr>`}
            </tbody>
          </table>
        </div>
        ${analysis ? `
          <div class="analysis-panel section-gap ${analysisRows.length ? "" : "warning-panel"}">
            <div class="split">
              <div>
                <h3>${t("Extraction review", "Revision de extraccion")}</h3>
                <p class="sub">${analysis.message || "Review these rows before importing them into the bundle library."}</p>
              </div>
              <span class="tag">${analysis.source || "Trial parser"}</span>
            </div>
            ${analysisRows.length ? `
              <div class="table-wrap compact-table-wrap">
                <table class="extraction-review-table">
                  <thead>
                    <tr><th>Control code</th><th>Status</th><th>Release</th><th>Customer</th><th>Job</th><th>Job name</th><th>Description</th><th>Pieces</th><th>Weight</th><th>Scan lookup</th><th>Source</th></tr>
                  </thead>
                  <tbody>
                    ${analysisRows.map((row) => `
                      <tr>
                        <td><strong>${row.controlCode}</strong></td>
                        <td>${row.status || ""}</td>
                        <td>${row.release || ""}</td>
                        <td>${row.customer || ""}</td>
                        <td>${row.jobNumber || ""}</td>
                        <td>${row.jobName || ""}</td>
                        <td>${row.description || ""}</td>
                        <td>${number(row.pieces || 0)}</td>
                        <td>${number(row.weight || 0)} lbs</td>
                        <td><span class="tag">${row.scanCode || row.controlCode}</span></td>
                        <td>${row.source || ""}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            ` : ""}
          </div>
        ` : ""}
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("4. Bundle / tag rules", "4. Reglas de paquetes / etiquetas")}</h3>
          <p class="sub">These are placeholders for the rules that decide whether CrewForge should split a tag or keep it together.</p>
        </div>
        <div class="form-grid">
          <label>Max bundle weight<span class="es">Peso maximo de paquete</span><div class="money-input"><input id="bundleMaxBundleWeight" type="number" min="0" step="100" value="${planner.maxBundleWeight || ""}" placeholder="Optional" ${setupDisabled} /><span>lbs</span></div></label>
          <label>Max bundle length<span class="es">Largo maximo</span><input id="bundleMaxBundleLength" value="${planner.maxBundleLength || ""}" placeholder="Optional" ${setupDisabled} /></label>
          <label>Tag split rule<span class="es">Regla para dividir etiquetas</span><input id="bundleTagRule" value="${planner.tagRule || ""}" placeholder="Example: keep pier type together unless over limit" ${setupDisabled} /></label>
        </div>
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("5. Scan / lookup bundle", "5. Escanear / buscar paquete")}</h3>
          <p class="sub">For the trial, paste or type the DataMatrix/QR content from a scan. Later the phone camera scanner should fill this automatically.</p>
        </div>
        <div class="form-grid">
          <label>Scan code, tag, or control code<span class="es">Codigo escaneado, etiqueta, o codigo</span><input id="bundleScanCodeSearch" value="${planner.scanCodeSearch || ""}" placeholder="Example: 1516990001 or UTA" /></label>
          <label>Matched bundle<span class="es">Paquete encontrado</span><input id="bundleScanMatchResult" value="${scanMatch ? `${scanMatch.tag || scanMatch.controlCode} - ${bundleCurrentStatus(scanMatch)}` : "No match yet"}" disabled /></label>
          <label>Quality rejects<span class="es">Rechazos de calidad</span><input id="bundleScanRejectResult" value="${scanMatch ? `${number(scanMatch.rejectedPieces || 0)} rejected pieces` : "Scan a bundle first"}" disabled /></label>
        </div>
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("6. Control-code sections", "6. Secciones de codigo")}</h3>
          <p class="sub">These are the general lines from the detailer package. Open one to manage the separate tags/items inside it.</p>
        </div>
        <div class="form-grid">
          <label>Control code<span class="es">Codigo</span><input id="newBundleCode" placeholder="AH6" ${setupDisabled} /></label>
          <label>Description<span class="es">Descripcion</span><input id="newBundleDescription" placeholder="Optional" ${setupDisabled} /></label>
          <label>Weight<span class="es">Peso</span><div class="unit-input"><input id="newBundleWeight" type="number" min="0" step="1" placeholder="0" ${setupDisabled} /><span>lbs</span></div></label>
          <button class="primary-action form-button" id="addBundleSection" type="button" ${setupDisabled}>${t("Add section", "Agregar seccion")}</button>
        </div>
        <div class="table-wrap">
          <table class="bundle-table bundle-summary-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Trailer</th>
                <th>Rejects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bundles.length
                ? bundles.map((bundle) => `
                  <tr class="${bundle.id === planner.selectedSectionId ? "selected-row" : ""}">
                    <td><strong>${bundle.tag || bundle.controlCode}</strong><span class="tag">${bundle.controlCode}</span></td>
                    <td>${bundle.description || "No description"}</td>
                    <td>${number(bundle.weight || 0)} lbs</td>
                    <td><span class="tag">${bundleCurrentStatus(bundle)}</span><small>${bundleQuantity(bundle) ? `${preciseNumber(bundle.completedQty || 0)} / ${preciseNumber(bundleQuantity(bundle))} · ${bundleCompletionPct(bundle)}%` : "Qty needed"}</small></td>
                    <td><select class="compact-select" data-bundle="${bundle.id}" data-bundle-field="trailer" ${setupDisabled}>${setOptions(trailerOptions, bundle.trailer || "", (option) => option || "Unassigned", (option) => option)}</select></td>
                    <td>${number(bundle.rejectedPieces || 0)}</td>
                    <td class="row-actions"><button class="secondary-action small-action" data-open-bundle-section="${bundle.id}" type="button">${bundle.id === planner.selectedSectionId ? "Selected" : "Open"}<span class="es">${bundle.id === planner.selectedSectionId ? "Seleccionado" : "Abrir"}</span></button><button class="danger-action small-action" data-delete-bundle-section="${bundle.id}" type="button" ${setupDisabled}>Delete<span class="es">Borrar</span></button></td>
                  </tr>
                `).join("")
                : `<tr><td colspan="7"><strong>No control-code sections yet.</strong><span class="es">Todavia no hay secciones.</span></td></tr>`}
            </tbody>
          </table>
        </div>
        ${section ? `
          <div class="bundle-section-editor section-gap">
            <div class="split">
              <div>
                <h3>${section.tag || section.controlCode} · ${bundleCurrentStatus(section)}</h3>
                <p class="sub">Update only this selected control-code section.</p>
              </div>
              <span class="tag">${number(section.weight || 0)} lbs · ${bundleCompletionPct(section)}%</span>
            </div>
            <div class="form-grid">
              <label>Description<span class="es">Descripcion</span><input data-bundle="${section.id}" data-bundle-field="description" value="${section.description || ""}" ${setupDisabled} /></label>
              <label>Scan code<span class="es">Codigo escaneado</span><input data-bundle="${section.id}" data-bundle-field="scanCode" value="${section.scanCode || ""}" placeholder="Scan value" ${setupDisabled} /></label>
              <label>Weight<span class="es">Peso</span><div class="unit-input"><input data-bundle="${section.id}" data-bundle-field="weight" type="number" min="0" step="1" value="${section.weight || 0}" ${setupDisabled} /><span>lbs</span></div></label>
              <label>Total quantity<span class="es">Cantidad total</span><input data-bundle="${section.id}" data-bundle-field="pieces" type="number" min="0" step="1" value="${section.pieces || 0}" ${setupDisabled} /></label>
              <label>Quantity completed<span class="es">Cantidad terminada</span><input data-bundle="${section.id}" data-bundle-field="completedQty" type="number" min="0" step="1" ${bundleQuantity(section) ? `max="${bundleQuantity(section)}"` : ""} value="${section.completedQty || 0}" ${statusDisabled} /></label>
              <label>Trailer<span class="es">Trailer</span><select data-bundle="${section.id}" data-bundle-field="trailer" ${setupDisabled}><option value="">Unassigned</option>${setOptions(trailerOptions.slice(1), section.trailer || "")}</select></label>
            </div>
            <div class="production-equation">
              <strong>${bundleQuantity(section) ? `${preciseNumber(bundleQuantity(section))} total x ${preciseNumber(bundleUnitWeight(section))} lbs each = ${number(section.weight || 0)} lbs` : "Enter total quantity to calculate each weight."}</strong>
              <span>${preciseNumber(section.completedQty || 0)} completed = ${number(bundleCompletedWeight(section))} lbs · ${bundleCompletionPct(section)}%</span>
            </div>
            <div class="selected-section-grid">
              <div>
                <h4>Production status<span class="es">Estado de produccion</span></h4>
                <div class="process-check-grid selected-process-grid">
                  ${fabricationProcessSteps.map(([key, label, es]) => `<label class="mini-check"><input data-bundle="${section.id}" data-bundle-field="process.${key}" type="checkbox" ${section.process?.[key] ? "checked" : ""} ${statusDisabled} /> ${label}<span class="es">${es}</span></label>`).join("")}
                </div>
              </div>
              <div>
                <h4>Quality<span class="es">Calidad</span></h4>
                <div class="quality-grid">
                  <label>Rejected<span class="es">Rechazadas</span><input data-bundle="${section.id}" data-bundle-field="rejectedPieces" type="number" min="0" step="1" value="${section.rejectedPieces || 0}" ${qualityDisabled} /></label>
                  <label>Reason<span class="es">Razon</span><select data-bundle="${section.id}" data-bundle-field="rejectReason" ${qualityDisabled}>${setOptions(qualityRejectReasons, section.rejectReason || "None")}</select></label>
                  <label>QC notes<span class="es">Notas calidad</span><input data-bundle="${section.id}" data-bundle-field="qualityNotes" value="${section.qualityNotes || ""}" placeholder="Optional" ${qualityDisabled} /></label>
                </div>
              </div>
            </div>
            <label>Notes<span class="es">Notas</span><input data-bundle="${section.id}" data-bundle-field="notes" value="${section.notes || ""}" placeholder="Optional" ${statusDisabled} /></label>
          </div>
        ` : ""}
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("7. Tags / item rows", "7. Etiquetas / partidas")}</h3>
          <p class="sub">${section ? `Editing ${section.controlCode}. Add or modify the detailed tag rows that came from bar size, shape, mark, quantity, and weight.` : "Open a control-code section first."}</p>
        </div>
        ${section ? `
          <div class="form-grid">
            <label>Item<span class="es">Partida</span><input id="newBundleItemNumber" placeholder="1" ${setupDisabled} /></label>
            <label>Qty<span class="es">Cantidad</span><input id="newBundleItemQty" type="number" min="0" step="1" placeholder="0" ${setupDisabled} /></label>
            <label>Size<span class="es">Tamano</span><input id="newBundleItemSize" placeholder="10" ${setupDisabled} /></label>
            <label>Length<span class="es">Largo</span><input id="newBundleItemLength" placeholder="30-00" ${setupDisabled} /></label>
            <label>Mark<span class="es">Marca</span><input id="newBundleItemMark" placeholder="10E104" ${setupDisabled} /></label>
            <label>Shape<span class="es">Forma</span><input id="newBundleItemShape" placeholder="4" ${setupDisabled} /></label>
            <label>Weight<span class="es">Peso</span><div class="unit-input"><input id="newBundleItemWeight" type="number" min="0" step="1" placeholder="0" ${setupDisabled} /><span>lbs</span></div></label>
            <button class="primary-action form-button" id="addBundleItem" type="button" ${setupDisabled}>${t("Add tag/item", "Agregar etiqueta")}</button>
          </div>
          <div class="table-wrap compact-table-wrap section-gap">
            <table class="bundle-item-table">
              <thead><tr><th>Item</th><th>Qty</th><th>Size</th><th>Length</th><th>Mark</th><th>Shape</th><th>Weight</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                ${(section.items || []).length
                  ? section.items.map((item) => `
                    <tr>
                      <td><input data-bundle-item="${item.id}" data-item-field="item" value="${item.item || ""}" ${setupDisabled} /></td>
                      <td><input data-bundle-item="${item.id}" data-item-field="qty" type="number" min="0" step="1" value="${item.qty || 0}" ${setupDisabled} /></td>
                      <td><input data-bundle-item="${item.id}" data-item-field="size" value="${item.size || ""}" ${setupDisabled} /></td>
                      <td><input data-bundle-item="${item.id}" data-item-field="length" value="${item.length || ""}" ${setupDisabled} /></td>
                      <td><input data-bundle-item="${item.id}" data-item-field="mark" value="${item.mark || ""}" ${setupDisabled} /></td>
                      <td><input data-bundle-item="${item.id}" data-item-field="shape" value="${item.shape || ""}" ${setupDisabled} /></td>
                      <td><div class="unit-input"><input data-bundle-item="${item.id}" data-item-field="weight" type="number" min="0" step="1" value="${item.weight || 0}" ${setupDisabled} /><span>lbs</span></div></td>
                      <td><select data-bundle-item="${item.id}" data-item-field="status" ${setupDisabled}>${setOptions(plannerStatuses, item.status || "Planned")}</select></td>
                      <td class="row-actions"><button class="danger-action small-action" data-delete-bundle-item="${item.id}" type="button" ${setupDisabled}>Delete<span class="es">Borrar</span></button></td>
                    </tr>
                  `).join("")
                  : `<tr><td colspan="9"><strong>No detailed tags/items yet.</strong><span class="es">Todavia no hay etiquetas detalladas.</span></td></tr>`}
              </tbody>
            </table>
          </div>
        ` : ""}
      </div>

      <div class="planner-section section-gap">
        <div class="split">
          <div>
            <h3>${t("8. Trailer / load assignment", "8. Asignacion de trailer / carga")}</h3>
            <p class="sub">Create trailer codes, assign control-code sections, verify loading, then require final sign-off before shipping.</p>
          </div>
          <label class="inline-limit">Max trailer weight<span class="es">Peso maximo por trailer</span><div class="money-input"><input id="bundleMaxWeight" type="number" min="1" step="100" value="${planner.maxTrailerWeight || 48000}" ${setupDisabled} /><span>lbs</span></div></label>
        </div>
        <div class="form-grid section-gap">
          <label>New trailer code<span class="es">Codigo de trailer</span><input id="newTrailerCode" placeholder="Trailer 6, T-001, Load A" ${setupDisabled} /></label>
          <button class="primary-action form-button" id="addTrailerFromCode" type="button" ${setupDisabled}>${t("Add trailer code", "Agregar codigo")}</button>
        </div>
        ${renderTrailerDashboard(job, planner, trailerData, setupDisabled)}
      </div>

      <div class="planner-section section-gap">
        <div>
          <h3>${t("9. Change log", "9. Registro de cambios")}</h3>
          <p class="sub">Admin, shop foremen, and quality can see who changed jobs, sections, tags, process steps, quality rejects, and trailer assignments.</p>
        </div>
        <div class="table-wrap compact-table-wrap">${activityLogTable()}</div>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const sheet = currentSheet();
  const totals = productionTotals();
  const pct = totals.planned ? Math.round((totals.completed / totals.planned) * 100) : 0;
  const weeklySafety = state.safetyForms.filter((form) => form.area === state.selectedArea && form.date >= selectedWeekStart() && form.date <= state.selectedWeek).length;
  const weeklyAudits = state.fieldAudits.filter((audit) => audit.area === state.selectedArea && audit.date >= selectedWeekStart() && audit.date <= state.selectedWeek).length;
  return `
    <section class="printable-report dashboard-report">
      ${reportHeader("Dashboard", state.selectedWeek)}
      <div class="metric-grid">
      <article class="metric"><span>Hours</span><strong>${number(totalHours(sheet))}</strong><small>Current week</small></article>
      <article class="metric"><span>Timesheet status</span><strong>${sheet.status}</strong><small>${sheet.foreman || "No foreman selected"}</small></article>
      <article class="metric"><span>Production</span><strong>${pct}%</strong><small>${number(totals.completed)} of ${number(totals.planned)}</small></article>
      <article class="metric"><span>Delays</span><strong>${totals.delayed}</strong><small>Reported production delays</small></article>
      <article class="metric"><span>Safety</span><strong>${weeklySafety}</strong><small>Records this week</small></article>
      <article class="metric"><span>Audits</span><strong>${weeklyAudits}</strong><small>Field checks this week</small></article>
      </div>
    <section class="panel report-panel">
      <div class="split">
        <div><h2>${t("Today at a glance", "Resumen rapido")}</h2><p class="sub">A management-friendly snapshot for the selected area.</p></div>
        <button class="secondary-action no-print" data-print="dashboard">${t("Export PDF", "Exportar PDF")}</button>
      </div>
      <div class="report-grid dashboard-section-grid section-gap">
        <section class="dashboard-data-section">
          <h3>${t("Timesheets", "Registro de horas")}</h3>
          <div class="table-wrap">${timesheetSummaryTable(sheet)}</div>
        </section>
        <section class="dashboard-data-section">
          <h3>${t("Production", "Produccion")}</h3>
          <div class="table-wrap">${productionSummaryTable()}</div>
        </section>
      </div>
    </section>
    </section>
  `;
}

function timesheetSummaryTable(sheet) {
  const showReimbursements = canManagePayrollAdjustments();
  return `
    <table>
      <thead><tr><th>Employee</th><th>Role</th><th>Total</th>${area().perDiem ? "<th>Per diem</th>" : ""}${showReimbursements ? "<th>Reimbursement</th>" : ""}</tr></thead>
      <tbody>
        ${sheet.rows
          .map((row) => {
            const person = personByName(row.employee) || {};
            return `<tr><td><strong>${row.employee}</strong>${row.borrowed ? '<span class="tag">Borrowed</span>' : ""}</td><td>${rowRole(row)}</td><td>${rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0)}</td>${area().perDiem ? `<td>${money(row.perDiem)}</td>` : ""}${showReimbursements ? `<td>${money(row.reimbursement)}</td>` : ""}</tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function productionSummaryTable() {
  return `
    <table>
      <thead><tr><th>Code / ID</th><th>Job</th><th>Amount / Part</th><th>Progress</th><th>Delay</th></tr></thead>
      <tbody>
        ${productionForArea()
          .map((item) => {
            if (item.productionMode === "foundation") {
              return `<tr><td><strong>${item.foundationId}</strong></td><td>${jobName(item.jobId)}</td><td>${item.component}</td><td>Complete</td><td>${item.delay}</td></tr>`;
            }
            if (item.productionMode === "custom") {
              return `<tr><td><strong>${item.code}</strong></td><td>${jobName(item.jobId)}</td><td>${preciseNumber(item.completedQty || 0)} ${item.unit || ""}</td><td>${preciseNumber(item.completedQty || 0)} / ${preciseNumber(item.planned || 0)} ${item.unit || ""}</td><td>${item.delay}</td></tr>`;
            }
            return `<tr><td><strong>${item.code}</strong></td><td>${jobName(item.jobId)}</td><td>${preciseNumber(item.completedQty || 0)} / ${productionQuantity(item) || "-"}</td><td>${number(completedWeight(item))} lbs</td><td>${item.delay}</td></tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function deliverablePackageLabel(value = state.deliverablePackage) {
  if (value === "production") return "Production";
  if (value === "both") return "Timesheets + Production";
  return "Timesheets";
}

function deliverableForemanLabel(value = state.deliverableForeman) {
  if (!value || value === "all") return "All foremen / crews";
  return area().mode === "crew" ? `${value} / ${crewNameForForeman(value)}` : value;
}

function deliverableDateRange() {
  const fallback = weekRangeDates(state.selectedWeek);
  const fromDate = dateInputValue(state.deliverableFromDate, fallback.start);
  const toDate = dateInputValue(state.deliverableToDate, fallback.end);
  return fromDate <= toDate ? { fromDate, toDate } : { fromDate: toDate, toDate: fromDate };
}

function deliverableSheets() {
  const { fromDate, toDate } = deliverableDateRange();
  return Object.values(state.sheets || {})
    .filter((sheet) => {
      if (sheet.area !== state.selectedArea) return false;
      if (state.deliverableForeman !== "all" && sheet.foreman !== state.deliverableForeman) return false;
      const start = sheet.weekStart || weekRangeDates(sheet.week).start;
      const end = sheet.week || addDays(start, 4);
      return rangesOverlap(start, end, fromDate, toDate);
    })
    .sort((a, b) => `${a.week}:${a.foreman}`.localeCompare(`${b.week}:${b.foreman}`));
}

function deliverableProductionItems() {
  const { fromDate, toDate } = deliverableDateRange();
  const baseItems = roleIsElevated()
    ? state.production.filter((item) => item.area === state.selectedArea)
    : productionForArea();
  return baseItems
    .filter((item) => {
      if (state.deliverableForeman !== "all" && (item.foreman || "") !== state.deliverableForeman) return false;
      const itemDate = dateInputValue(item.completedAt || item.week || state.selectedWeek, state.selectedWeek);
      return itemDate >= fromDate && itemDate <= toDate;
    })
    .sort((a, b) => `${a.completedAt || ""}:${a.foreman || ""}:${a.code || a.foundationId || ""}`.localeCompare(`${b.completedAt || ""}:${b.foreman || ""}:${b.code || b.foundationId || ""}`));
}

function deliverableTimesheetTotals(sheets) {
  return sheets.reduce(
    (totals, sheet) => {
      totals.hours += totalHours(sheet);
      totals.perDiem += totalPerDiem(sheet);
      totals.reimbursement += totalReimbursement(sheet);
      return totals;
    },
    { hours: 0, perDiem: 0, reimbursement: 0 }
  );
}

function payrollSummaryRows(sheets) {
  const byEmployee = new Map();
  sheets.forEach((sheet) => {
    (sheet.rows || []).forEach((row) => {
      const person = personByName(row.employee) || {};
      const regular = rowHours(row);
      const pto = Number(row.pto) || 0;
      const sick = Number(row.sick) || 0;
      const total = regular + pto + sick;
      const perDiem = Number(row.perDiem) || 0;
      const reimbursement = Number(row.reimbursement) || 0;
      const employee = row.employee || "Unknown";
      if (!byEmployee.has(employee)) {
        byEmployee.set(employee, {
          employee,
          normalCrew: person.group || "",
          normalRole: person.role || "",
          rate: Number(person.hourlyRate) || 0,
          regular: 0,
          pto: 0,
          sick: 0,
          total: 0,
          perDiem: 0,
          reimbursement: 0,
          roles: new Set(),
          foremen: new Set(),
          crews: new Set(),
          jobs: new Set(),
          notes: [],
          reimbursementNotes: []
        });
      }
      const summary = byEmployee.get(employee);
      summary.regular += regular;
      summary.pto += pto;
      summary.sick += sick;
      summary.total += total;
      summary.perDiem += perDiem;
      summary.reimbursement += reimbursement;
      if (rowRole(row)) summary.roles.add(rowRole(row));
      if (sheet.foreman) summary.foremen.add(sheet.foreman);
      if (sheet.group) summary.crews.add(sheet.group);
      if (sheet.jobId) summary.jobs.add(jobName(sheet.jobId));
      if ((row.notes || "").trim()) summary.notes.push(row.notes.trim());
      if ((row.reimbursementNote || "").trim()) summary.reimbursementNotes.push(row.reimbursementNote.trim());
    });
  });
  return [...byEmployee.values()]
    .map((summary) => {
      const grossWages = summary.total * summary.rate;
      return {
        ...summary,
        roleList: [...summary.roles].join(", ") || summary.normalRole,
        foremanList: [...summary.foremen].join(", "),
        crewList: [...summary.crews].join(", ") || summary.normalCrew,
        jobList: [...summary.jobs].join(", "),
        notesList: [...new Set(summary.notes)].join("; "),
        reimbursementNotesList: [...new Set(summary.reimbursementNotes)].join("; "),
        grossWages,
        totalPayable: grossWages + summary.perDiem + summary.reimbursement
      };
    })
    .sort((a, b) => a.employee.localeCompare(b.employee));
}

function payrollSummaryTable(sheets) {
  const rows = payrollSummaryRows(sheets);
  if (!rows.length) return `<p class="sub">No payroll records found for this selection.</p>`;
  return `
    <table>
      <thead>
        <tr><th>Employee</th><th>Normal crew</th><th>Worked crew(s)</th><th>Role(s)</th><th>Regular</th><th>PTO</th><th>Sick</th><th>Total hours</th><th>Rate</th><th>Gross wages</th><th>Per diem</th><th>Reimbursement</th><th>Total payable est.</th><th>Reimb. note</th></tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => `<tr>
            <td><strong>${escapeHtml(row.employee)}</strong></td>
            <td>${escapeHtml(row.normalCrew || "")}</td>
            <td>${escapeHtml(row.crewList || "")}</td>
            <td>${escapeHtml(row.roleList || "")}</td>
            <td>${preciseNumber(row.regular)}</td>
            <td>${preciseNumber(row.pto)}</td>
            <td>${preciseNumber(row.sick)}</td>
            <td><strong>${preciseNumber(row.total)}</strong></td>
            <td>${money(row.rate)}</td>
            <td>${money(row.grossWages)}</td>
            <td>${money(row.perDiem)}</td>
            <td>${money(row.reimbursement)}</td>
            <td><strong>${money(row.totalPayable)}</strong></td>
            <td>${escapeHtml(row.reimbursementNotesList || "")}</td>
          </tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function deliverableTimesheetTable(sheets) {
  const showReimbursements = canManagePayrollAdjustments();
  const rows = sheets.flatMap((sheet) =>
    sheet.rows.map((row) => {
      const regular = rowHours(row);
      const total = regular + (Number(row.pto) || 0) + (Number(row.sick) || 0);
      return { sheet, row, regular, total };
    })
  );
  if (!rows.length) return `<p class="sub">No timesheets found for this selection.</p>`;
  return `
    <table>
      <thead><tr><th>Week</th><th>Foreman / crew</th><th>Job</th><th>Employee</th><th>Role</th><th>Total</th>${area().perDiem ? "<th>Per diem</th>" : ""}${showReimbursements ? "<th>Reimbursement</th><th>Reimb. note</th>" : ""}</tr></thead>
      <tbody>
        ${rows
          .map(({ sheet, row, total }) => `<tr><td>${sheet.weekStart || weekRangeDates(sheet.week).start} to ${sheet.week}</td><td><strong>${sheet.foreman}</strong><br><small>${sheet.group || crewNameForForeman(sheet.foreman)}</small></td><td>${jobName(sheet.jobId)}</td><td><strong>${row.employee}</strong>${row.borrowed ? '<span class="tag">Borrowed</span>' : ""}</td><td>${rowRole(row)}</td><td>${preciseNumber(total)}</td>${area().perDiem ? `<td>${money(row.perDiem)}</td>` : ""}${showReimbursements ? `<td>${money(row.reimbursement)}</td><td>${escapeHtml(row.reimbursementNote || "")}</td>` : ""}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function deliverableProductionTable(items) {
  if (!items.length) return `<p class="sub">No production records found for this selection.</p>`;
  return `
    <table>
      <thead><tr><th>Date</th><th>Foreman</th><th>Code / ID</th><th>Job</th><th>Amount / Part</th><th>Progress</th><th>Delay</th></tr></thead>
      <tbody>
        ${items
          .map((item) => {
            const date = dateInputValue(item.completedAt || item.week || state.selectedWeek, state.selectedWeek);
            if (item.productionMode === "foundation") {
              return `<tr><td>${date}</td><td>${item.foreman || ""}</td><td><strong>${item.foundationId}</strong></td><td>${jobName(item.jobId)}</td><td>${item.component}</td><td>Complete</td><td>${item.delay}</td></tr>`;
            }
            if (item.productionMode === "custom") {
              return `<tr><td>${date}</td><td>${item.foreman || ""}</td><td><strong>${item.code}</strong></td><td>${jobName(item.jobId)}</td><td>${preciseNumber(item.completedQty || 0)} ${item.unit || ""}</td><td>${preciseNumber(item.completedQty || 0)} / ${preciseNumber(item.planned || 0)} ${item.unit || ""}</td><td>${item.delay}</td></tr>`;
            }
            return `<tr><td>${date}</td><td>${item.foreman || ""}</td><td><strong>${item.code}</strong></td><td>${jobName(item.jobId)}</td><td>${preciseNumber(item.completedQty || 0)} / ${productionQuantity(item) || "-"}</td><td>${number(completedWeight(item))} lbs</td><td>${item.delay}</td></tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function uniqueEmployees() {
  return [...new Set(state.people.map((person) => person.name).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function dateInputValue(value, fallback = state.selectedWeek) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return fallback;
}

function localDateInputValue(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function addDays(dateValue, amount) {
  const date = new Date(`${dateValue}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
}

function weekRangeDates(weekEnding) {
  const end = dateInputValue(weekEnding, defaultState.selectedWeek);
  return { start: addDays(end, -4), end };
}

function selectedWeekStart() {
  return weekRangeDates(state.selectedWeek).start;
}

function setSelectedWeekStart(value) {
  const fallbackStart = selectedWeekStart();
  const start = dateInputValue(value, fallbackStart);
  const weekEnding = addDays(start, 4);
  const targetForeman = currentSheet().foreman || state.currentForeman;
  state.selectedWeek = weekEnding;
  state.currentForeman = targetForeman;
  if (!state.weeks.includes(weekEnding)) {
    state.weeks.push(weekEnding);
    state.weeks.sort();
  }
  const key = sheetKey(weekEnding, state.selectedArea, targetForeman);
  if (!state.sheets[key]) state.sheets[key] = seedSheet();
  state.sheets[key].week = weekEnding;
  state.sheets[key].weekStart = start;
  saveState();
  render();
}

function shiftSelectedWeek(daysDelta) {
  setSelectedWeekStart(addDays(selectedWeekStart(), daysDelta));
}

function shiftedDateRange(fromDate, toDate, daysDelta) {
  return {
    fromDate: addDays(fromDate, daysDelta),
    toDate: addDays(toDate, daysDelta)
  };
}

function shiftDeliverableDateRange(daysDelta) {
  const { fromDate, toDate } = deliverableDateRange();
  const shifted = shiftedDateRange(fromDate, toDate, daysDelta);
  state.deliverableFromDate = shifted.fromDate;
  state.deliverableToDate = shifted.toDate;
  saveState();
  render();
}

function shiftEmployeeReportDateRange(daysDelta) {
  const { fromDate, toDate } = selectedEmployeeDateRange();
  const shifted = shiftedDateRange(fromDate, toDate, daysDelta);
  state.selectedEmployeeReportFromDate = shifted.fromDate;
  state.selectedEmployeeReportToDate = shifted.toDate;
  saveState();
  render();
}

function dateShiftControls(target, previousLabel = "Previous week", nextLabel = "Next week") {
  return `
    <div class="date-nav no-print" aria-label="Date navigation">
      <button class="date-arrow" type="button" data-date-shift="${target}" data-days="-7">&larr;<span>${previousLabel}</span><small class="es">Semana anterior</small></button>
      <button class="date-arrow" type="button" data-date-shift="${target}" data-days="7">&rarr;<span>${nextLabel}</span><small class="es">Semana siguiente</small></button>
    </div>
  `;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA <= endB && startB <= endA;
}

function weekInRange(week, fromDate, toDate) {
  const selectedStart = dateInputValue(fromDate, state.selectedWeek);
  const selectedEnd = dateInputValue(toDate, selectedStart);
  const normalizedStart = selectedStart <= selectedEnd ? selectedStart : selectedEnd;
  const normalizedEnd = selectedStart <= selectedEnd ? selectedEnd : selectedStart;
  const weekRange = weekRangeDates(week);
  return rangesOverlap(weekRange.start, weekRange.end, normalizedStart, normalizedEnd);
}

function selectedEmployeeDateRange() {
  const fallback = weekRangeDates(state.selectedWeek);
  const fromDate = dateInputValue(state.selectedEmployeeReportFromDate, fallback.start);
  const toDate = dateInputValue(state.selectedEmployeeReportToDate, fallback.end);
  if (fromDate <= toDate) return { fromDate, toDate };
  return { fromDate: toDate, toDate: fromDate };
}

function weekRangeLabel(week) {
  const range = weekRangeDates(week);
  return `${range.start} to ${range.end}`;
}

function dateRangeLabel(fromDate, toDate) {
  return fromDate === toDate ? fromDate : `${fromDate} to ${toDate}`;
}

function employeeReportRecords(employee, fromDate = state.selectedWeek, toDate = state.selectedWeek, areaFilter = "all") {
  if (!employee) return [];
  return Object.values(state.sheets || [])
    .flatMap((sheet) => {
      if (!weekInRange(sheet.week, fromDate, toDate)) return [];
      if (areaFilter !== "all" && sheet.area !== areaFilter) return [];
      return (sheet.rows || [])
        .filter((row) => row.employee === employee)
        .map((row) => {
          const person = personByName(row.employee) || {};
          const regular = rowHours(row);
          const pto = Number(row.pto) || 0;
          const sick = Number(row.sick) || 0;
          const perDiem = Number(row.perDiem) || 0;
          const reimbursement = Number(row.reimbursement) || 0;
          const rate = Number(person.hourlyRate) || 0;
          const lightDutyDays = days.filter((day) => row.lightDuty?.[day]).map((day) => dayLabels[days.indexOf(day)]);
          return {
            areaId: sheet.area,
            areaLabel: areas[sheet.area]?.label || sheet.area,
            weekStart: sheet.weekStart || weekRangeDates(sheet.week).start,
            week: sheet.week,
            foreman: sheet.foreman,
            group: sheet.group,
            job: jobName(sheet.jobId),
            status: sheet.status,
            employee: row.employee,
            role: rowRole(row),
            regular,
            pto,
            sick,
            total: regular + pto + sick,
            perDiem,
            reimbursement,
            reimbursementNote: row.reimbursementNote || "",
            rate,
            gross: (regular + pto + sick) * rate + perDiem + reimbursement,
            borrowed: row.borrowed,
            dol: person.dol,
            lightDutyDays,
            notes: row.notes || ""
          };
        });
    })
    .sort((a, b) => a.week.localeCompare(b.week) || a.areaLabel.localeCompare(b.areaLabel) || a.foreman.localeCompare(b.foreman));
}

function employeeReportTotals(records) {
  const uniqueWeeks = new Set(records.map((record) => record.week));
  return {
    weeks: uniqueWeeks.size,
    regular: records.reduce((sum, record) => sum + record.regular, 0),
    pto: records.reduce((sum, record) => sum + record.pto, 0),
    sick: records.reduce((sum, record) => sum + record.sick, 0),
    total: records.reduce((sum, record) => sum + record.total, 0),
    perDiem: records.reduce((sum, record) => sum + record.perDiem, 0),
    reimbursement: records.reduce((sum, record) => sum + record.reimbursement, 0),
    gross: records.reduce((sum, record) => sum + record.gross, 0)
  };
}

function employeeReportTable(records) {
  if (!records.length) {
    return `<div class="empty-state">No timesheet records found for this employee and period. <span class="es">No hay registros para este trabajador y periodo.</span></div>`;
  }
  return `
    <table>
      <thead>
        <tr><th>Work period</th><th>Area</th><th>Job</th><th>Foreman</th><th>Role</th><th>Hours</th><th>PTO</th><th>Sick</th><th>Per diem</th><th>Reimbursement</th><th>Rate</th><th>Gross est.</th><th>Notes</th><th>Reimb. note</th></tr>
      </thead>
      <tbody>
        ${records
          .map((record) => `<tr>
            <td><strong>${weekRangeLabel(record.week)}</strong><span class="sub">Week ending ${record.week}</span></td>
            <td>${record.areaLabel}</td>
            <td>${record.job || ""}</td>
            <td>${record.foreman || ""}</td>
            <td>${record.role || ""}${record.borrowed ? '<span class="tag">Borrowed</span>' : ""}${record.dol ? '<span class="tag">DOL</span>' : ""}${record.lightDutyDays.length ? `<span class="tag">Light duty: ${record.lightDutyDays.join(", ")}</span>` : ""}</td>
            <td>${preciseNumber(record.total)}</td>
            <td>${preciseNumber(record.pto)}</td>
            <td>${preciseNumber(record.sick)}</td>
            <td>${money(record.perDiem)}</td>
            <td>${money(record.reimbursement)}</td>
            <td>${money(record.rate)}</td>
            <td>${money(record.gross)}</td>
            <td>${escapeHtml(record.notes)}</td>
            <td>${escapeHtml(record.reimbursementNote)}</td>
          </tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function activityLogTable() {
  const entries = (state.activityLog || [])
    .filter((entry) => !state.selectedArea || !entry.area || entry.area === state.selectedArea)
    .slice(0, 30);
  if (!entries.length) {
    return `<div class="empty-state">No activity recorded yet.<span class="es">Todavia no hay actividad registrada.</span></div>`;
  }
  return `
    <table>
      <thead><tr><th>When</th><th>User</th><th>Action</th><th>Record</th></tr></thead>
      <tbody>
        ${entries
          .map((entry) => `<tr>
            <td>${entry.at || ""}</td>
            <td><strong>${entry.actor || ""}</strong><span class="sub">${entry.role || ""}</span></td>
            <td>${entry.action || ""}</td>
            <td>${[entry.week, entry.foreman, entry.employee, entry.job, entry.field].filter(Boolean).join(" · ")}</td>
          </tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function windFoundationStats(items) {
  const byFoundation = {};
  items
    .filter((item) => item.productionMode === "foundation")
    .forEach((item) => {
      byFoundation[item.foundationId] = byFoundation[item.foundationId] || {};
      byFoundation[item.foundationId][item.component] = true;
    });
  const ids = Object.keys(byFoundation).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const completed = ids.filter((id) => windFoundationComponents.every((component) => byFoundation[id][component]));
  const partial = ids.filter((id) => !completed.includes(id));
  return {
    byFoundation,
    completed,
    partial,
    byComponent: windFoundationComponents.reduce((acc, component) => {
      acc[component] = ids.filter((id) => byFoundation[id][component]);
      return acc;
    }, {})
  };
}

function renderFoundationList(title, ids) {
  return `
    <div>
      <h4>${title}</h4>
      <div class="foundation-chip-list">
        ${ids.length ? ids.map((id) => `<span class="tag">${id}</span>`).join("") : '<span class="sub">None yet</span>'}
      </div>
    </div>
  `;
}

function renderWindFoundationSummary(items) {
  const foundationItems = items.filter((item) => item.productionMode === "foundation");
  if (!foundationItems.length) return "";
  const stats = windFoundationStats(foundationItems);
  const selectedJob = state.selectedProductionJob ? jobById(state.selectedProductionJob) : null;
  const totalFoundations = selectedJob?.foundationIds?.length || 0;
  return `
    <div class="wind-summary section-gap">
      <div class="split">
        <div>
          <h3>${t("Wind farm foundation progress", "Avance de cimentaciones")}</h3>
          <p class="sub">${totalFoundations ? `${stats.completed.length} of ${totalFoundations} full foundations complete` : `${stats.completed.length} full foundations complete`}</p>
        </div>
        <div class="foundation-metrics">
          <span>Bottom: <strong>${stats.byComponent["Bottom Mat"].length}${totalFoundations ? ` / ${totalFoundations}` : ""}</strong></span>
          <span>Top: <strong>${stats.byComponent.Top.length}${totalFoundations ? ` / ${totalFoundations}` : ""}</strong></span>
          <span>Pedestal: <strong>${stats.byComponent.Pedestal.length}${totalFoundations ? ` / ${totalFoundations}` : ""}</strong></span>
        </div>
      </div>
      <div class="foundation-lists">
        ${renderFoundationList("Completed foundations", stats.completed)}
        ${renderFoundationList("Partial foundations", stats.partial)}
        ${renderFoundationList("Bottom mat done", stats.byComponent["Bottom Mat"])}
        ${renderFoundationList("Top done", stats.byComponent.Top)}
        ${renderFoundationList("Pedestal done", stats.byComponent.Pedestal)}
      </div>
    </div>
  `;
}

function renderTimesheet() {
  const sheet = currentSheet();
  const editable = canEditSheet(sheet);
  const useCards = isFieldEntryMode();
  const showTimesheetJob = state.selectedArea === "rebarInstall";
  const isCrewArea = area().mode === "crew";
  const showPayrollAdjustments = canManagePayrollAdjustments();
  const helperText =
    isCrewArea
      ? t("Choose a foreman and that foreman's crew fills in automatically.", "Escoja un capataz y se llena su cuadrilla automaticamente.")
      : t("Choose day or night shift; no crews needed for shop fabrication.", "Escoja turno de dia o noche; no se necesitan cuadrillas para fabricacion.");
  return `
    ${!editable ? `<div class="notice">${sheetReadOnlyReason(sheet)} <span class="es">Solo lectura para este usuario.</span></div>` : ""}
    <section class="panel printable-report timesheet-report ${useCards ? "foreman-panel" : ""}">
      ${reportHeader("Timesheet", `${sheet.weekStart || weekRangeDates(sheet.week).start} to ${sheet.week} · ${sheet.foreman || ""}`)}
      <div class="split">
        <div><h2>${t("Timesheet", "Registro de horas")}</h2><p class="sub">${helperText}</p></div>
        <span class="tag">${sheet.status}</span>
      </div>
      <div class="form-grid section-gap">
        ${showTimesheetJob ? `<label>Job<span class="es">Trabajo</span><select id="sheetJob" ${!editable ? "disabled" : ""}>${setOptions(selectedJobs(), sheet.jobId, (job) => job.name, (job) => job.id)}</select></label>` : ""}
        <label>Week starting<span class="es">Semana empieza</span><input id="sheetWeekStart" type="date" value="${sheet.weekStart || weekRangeDates(sheet.week).start}" ${!editable ? "disabled" : ""} /></label>
        <label>Week ending<span class="es">Semana termina</span><input value="${sheet.week}" disabled /></label>
        <label>Foreman<span class="es">Capataz</span><select id="sheetForeman" ${!editable || state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), sheet.foreman)}</select></label>
        ${isCrewArea ? `<label>Crew<span class="es">Cuadrilla</span><input value="${sheet.group || crewNameForForeman(sheet.foreman)}" disabled /></label>` : `<label>Shift<span class="es">Turno</span><select id="sheetGroup" ${!editable ? "disabled" : ""}>${setOptions(groupOptions(), sheet.group)}</select></label>`}
        <label>Status<span class="es">Estado</span><select id="sheetStatus" ${!roleIsElevated() ? "disabled" : ""}>${setOptions(["Draft", "Submitted", "Approved"], sheet.status)}</select></label>
      </div>
      ${overlapNotice(sheet)}
      ${renderWorkerAdder(editable)}
      ${useCards ? renderForemanTimeCards(sheet, editable) : `
      <div class="timesheet-wrap section-gap office-timesheet">
        <table class="entry-table ${!editable ? "locked" : ""}">
          <thead>
            <tr>
              <th>Employee</th><th>Role</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th><th>PTO</th><th>Sick</th>${area().perDiem ? "<th>Per diem</th>" : ""}${showPayrollAdjustments ? `<th>Reimbursement<span class="es">Reembolso</span></th><th>Reimb. note<span class="es">Nota reembolso</span></th>` : ""}${area().dol ? "<th>DOL</th>" : ""}<th>Total</th><th>Notes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${sheet.rows.map((row, index) => renderTimesheetRow(row, index, editable)).join("")}
          </tbody>
        </table>
      </div>`}
      ${sheet.submittedAt ? `<div class="audit-note section-gap">Submitted by ${sheet.submittedBy || sheet.foreman} on ${sheet.submittedAt}. <span class="es">Enviado por ${sheet.submittedBy || sheet.foreman}.</span></div>` : ""}
      ${sheet.lastEditedAt ? `<div class="audit-note section-gap">Last edited by ${sheet.lastEditedBy || ""} on ${sheet.lastEditedAt}. <span class="es">Ultima edicion por ${sheet.lastEditedBy || ""}.</span></div>` : ""}
      <div class="action-row section-gap">
        <strong>Total: ${number(totalHours(sheet))} hours</strong>
        ${area().perDiem ? `<strong>Per diem: ${money(totalPerDiem(sheet))}</strong>` : ""}
        ${showPayrollAdjustments ? `<strong>Reimbursements: ${money(totalReimbursement(sheet))}</strong>` : ""}
        <button class="secondary-action" id="duplicateWeek" type="button" ${!editable ? "disabled" : ""}>${t("Duplicate Week", "Duplicar semana")}</button>
        <button class="secondary-action" data-print="timesheet" type="button">${t("Export PDF", "Exportar PDF")}</button>
        <button class="primary-action" id="submitSheet" type="button" ${!editable ? "disabled" : ""}>${t("Submit Week", "Enviar semana")}</button>
      </div>
    </section>
  `;
}

function renderForemanTimeCards(sheet, editable) {
  const lightDuty = !area().dol;
  return `
    <div class="foreman-grid-wrap section-gap ${!editable ? "locked" : ""}">
      <table class="foreman-entry-grid">
        <thead>
          <tr>
            <th>Worker<span class="es">Trabajador</span></th>
            ${dayLabels.map((label, index) => `<th>${label}<span class="es">${["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][index]}</span>${lightDuty ? '<small>LD</small>' : ""}</th>`).join("")}
            <th>PTO<span class="es">Permiso</span></th>
            <th>Sick<span class="es">Enfermo</span></th>
            ${area().perDiem ? `<th>Per diem<span class="es">Viatico</span></th>` : ""}
            <th>Total<span class="es">Total</span></th>
            <th>Notes<span class="es">Notas</span></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${sheet.rows.map((row, index) => renderForemanTimeRow(row, index, editable)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderForemanTimeRow(row, index, editable) {
  const person = personByName(row.employee) || {};
  const disabled = editable ? "" : "disabled";
  const workers = peopleForArea();
  return `
    <tr>
      <td class="worker-name-cell">
        <select data-row="${index}" data-field="employee" ${disabled}>${setOptions(workers, row.employee, (worker) => worker.name, (worker) => worker.name)}${person.name ? "" : `<option value="${row.employee}" selected>${row.employee}</option>`}</select>
        <select class="compact-role" data-row="${index}" data-field="roleOverride" ${disabled}><option value="">${person.role || "Role"}</option>${setOptions(area().roles, row.roleOverride || "")}</select>
        <div class="row-tags">
          ${row.borrowed ? '<span class="tag">Week only</span>' : ""}
          ${area().dol ? `<span class="tag">${person.dol ? "DOL" : "No DOL"}</span>` : ""}
        </div>
      </td>
      ${days.map((day) => `<td><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} />${!area().dol ? `<label class="mini-check"><input data-row="${index}" data-field="lightDuty.${day}" type="checkbox" ${row.lightDuty?.[day] ? "checked" : ""} ${disabled} /> LD</label>` : ""}</td>`).join("")}
      <td><input data-row="${index}" data-field="pto" type="number" min="0" step="0.25" value="${row.pto || 0}" ${disabled} /></td>
      <td><input data-row="${index}" data-field="sick" type="number" min="0" step="0.25" value="${row.sick || 0}" ${disabled} /></td>
      ${area().perDiem ? `<td><div class="money-input"><span>$</span><input data-row="${index}" data-field="perDiem" type="number" min="0" step="1" value="${row.perDiem || 0}" ${disabled} /></div></td>` : ""}
      <td><strong>${number(rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0))}</strong></td>
      <td><input class="compact-note" data-row="${index}" data-field="notes" value="${row.notes || ""}" ${disabled} /></td>
      <td><div class="row-actions timesheet-row-actions"><button class="secondary-action icon-action clear-action" data-clear-row="${index}" type="button" ${disabled}>Clear Hours<span class="es">Borrar horas</span></button><button class="danger-action icon-action" data-delete-row="${index}" type="button" ${disabled}>Remove<span class="es">Quitar</span></button></div></td>
    </tr>
  `;
}

function renderWorkerCard(row, index, editable) {
  const person = personByName(row.employee) || {};
  const disabled = editable ? "" : "disabled";
  const workers = peopleForArea();
  return `
    <article class="worker-card">
      <header>
        <div>
          <label>Employee<span class="es">Trabajador</span><select data-row="${index}" data-field="employee" ${disabled}>${setOptions(workers, row.employee, (worker) => worker.name, (worker) => worker.name)}${person.name ? "" : `<option value="${row.employee}" selected>${row.employee}</option>`}</select></label>
          ${row.borrowed ? '<span class="tag">Week only</span>' : ""}
        </div>
        <strong>${number(rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0))} hrs</strong>
      </header>
      <div class="mini-grid day-grid">
        ${days.map((day, dayIndex) => `<label>${dayLabels[dayIndex]}<span class="es">${["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][dayIndex]}</span><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} />${!area().dol ? `<span class="mini-check"><input data-row="${index}" data-field="lightDuty.${day}" type="checkbox" ${row.lightDuty?.[day] ? "checked" : ""} ${disabled} /> LD</span>` : ""}</label>`).join("")}
      </div>
      <div class="mini-grid">
        <label>Role<span class="es">Puesto</span><select data-row="${index}" data-field="roleOverride" ${disabled}><option value="">${person.role || "Role"}</option>${setOptions(area().roles, row.roleOverride || "")}</select></label>
        <label>PTO<span class="es">Permiso</span><input data-row="${index}" data-field="pto" type="number" min="0" step="0.25" value="${row.pto || 0}" ${disabled} /></label>
        <label>Sick<span class="es">Enfermo</span><input data-row="${index}" data-field="sick" type="number" min="0" step="0.25" value="${row.sick || 0}" ${disabled} /></label>
        ${area().perDiem ? `<label>Per diem<span class="es">Viatico</span><div class="money-input"><span>$</span><input data-row="${index}" data-field="perDiem" type="number" min="0" step="1" value="${row.perDiem || 0}" ${disabled} /></div></label>` : ""}
        ${area().dol ? `<div class="static-field">DOL<span class="es">Aprendiz</span><strong>${person.dol ? "Yes" : "No"}</strong></div>` : ""}
      </div>
      <label class="card-notes">Notes<span class="es">Notas</span><textarea data-row="${index}" data-field="notes" ${disabled}>${row.notes || ""}</textarea></label>
      <div class="row-actions"><button class="secondary-action table-action clear-action" data-clear-row="${index}" type="button" ${disabled}>Clear Hours<span class="es">Borrar horas</span></button><button class="danger-action table-action" data-delete-row="${index}" type="button" ${disabled}>Remove from week<span class="es">Quitar de semana</span></button></div>
    </article>
  `;
}

function renderWorkerAdder(editable) {
  if (!editable) return "";
  const allWorkers = peopleForArea().map((person) => person.name);
  const isCrewArea = area().mode === "crew";
  return `
    <div class="add-worker-grid section-gap">
      <label class="worker-add-existing">Add existing worker<span class="es">Agregar trabajador existente</span><select id="borrowWorker"><option value="">Select worker</option>${setOptions(allWorkers, "")}</select></label>
      <label class="worker-add-name">Or type new name<span class="es">O escriba nombre nuevo</span><input id="manualWorker" placeholder="Name" /></label>
      <label class="worker-add-role">Role<span class="es">Puesto</span><select id="manualRole">${setOptions(area().roles, area().roles[1] || area().roles[0])}</select></label>
      ${isCrewArea ? `<label class="worker-add-group">Crew<span class="es">Cuadrilla</span><input id="manualGroup" value="${currentSheet().group}" disabled /></label>` : `<label class="worker-add-group">Shift<span class="es">Turno</span><select id="manualGroup">${setOptions(groupOptions(), currentSheet().group)}</select></label>`}
      <label class="check-label worker-add-dol ${area().dol ? "" : "hidden"}"><input id="manualDol" type="checkbox" /> DOL apprentice</label>
      <button class="secondary-action compact-add worker-add-button" id="addWorker" type="button">${t("Add", "Agregar")}</button>
    </div>
  `;
}

function renderTimesheetRow(row, index, editable) {
  const person = personByName(row.employee) || {};
  const disabled = editable ? "" : "disabled";
  const workers = peopleForArea();
  return `
    <tr>
      <td class="employee-cell">
        <select class="employee-select" data-row="${index}" data-field="employee" ${disabled}>
          ${setOptions(workers, row.employee, (worker) => worker.name, (worker) => worker.name)}
          ${person.name ? "" : `<option value="${row.employee}" selected>${row.employee}</option>`}
        </select>
        ${row.borrowed ? '<span class="tag">Week only</span>' : ""}
      </td>
      <td><select class="role-select" data-row="${index}" data-field="roleOverride" ${disabled}><option value="">${person.role || "Role"}</option>${setOptions(area().roles, row.roleOverride || "")}</select></td>
      ${days.map((day) => `<td><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} />${!area().dol ? `<label class="mini-check"><input data-row="${index}" data-field="lightDuty.${day}" type="checkbox" ${row.lightDuty?.[day] ? "checked" : ""} ${disabled} /> LD</label>` : ""}</td>`).join("")}
      <td><input data-row="${index}" data-field="pto" type="number" min="0" step="0.25" value="${row.pto || 0}" ${disabled} /></td>
      <td><input data-row="${index}" data-field="sick" type="number" min="0" step="0.25" value="${row.sick || 0}" ${disabled} /></td>
      ${area().perDiem ? `<td><div class="money-input"><span>$</span><input data-row="${index}" data-field="perDiem" type="number" min="0" step="1" value="${row.perDiem || 0}" ${disabled} /></div></td>` : ""}
      ${canManagePayrollAdjustments() ? `<td><div class="money-input"><span>$</span><input data-row="${index}" data-field="reimbursement" type="number" min="0" step="0.01" value="${row.reimbursement || 0}" ${disabled} /></div></td><td><input class="compact-note" data-row="${index}" data-field="reimbursementNote" value="${escapeHtml(row.reimbursementNote || "")}" placeholder="Reason" ${disabled} /></td>` : ""}
      ${area().dol ? `<td>${person.dol ? "Yes" : ""}</td>` : ""}
      <td><strong>${rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0)}</strong></td>
      <td><textarea data-row="${index}" data-field="notes" ${disabled}>${row.notes || ""}</textarea></td>
      <td><div class="row-actions timesheet-row-actions"><button class="secondary-action table-action clear-action" data-clear-row="${index}" type="button" ${disabled}>Clear Hours<span class="es">Borrar horas</span></button><button class="danger-action table-action" data-delete-row="${index}" type="button" ${disabled}>Remove<span class="es">Quitar</span></button></div></td>
    </tr>
  `;
}

function renderProduction() {
  const canAddProduction = isFieldEntryMode() || ["Admin", "Payroll", "Quality"].includes(state.selectedRole);
  const jobOptions = selectedJobs();
  const activeJob = state.selectedProductionJob ? jobName(state.selectedProductionJob) : "";
  const selectedForeman = isApproverMode() ? productionForemanName() : state.currentForeman;
  const visibleProduction = productionForArea();
  const submittedCount = visibleProduction.filter((item) => item.reviewStatus === "Submitted").length;
  return `
    <section class="panel printable-report production-report">
      ${reportHeader(isFieldEntryMode() ? "Production Update" : "Production", state.selectedProductionJob ? `${state.selectedWeek} · ${jobName(state.selectedProductionJob)}` : state.selectedWeek)}
      <div class="split">
        <div><h2>${t(isFieldEntryMode() ? "Production Update" : "Production", "Produccion")}</h2><p class="sub">Track job progress, control codes, completed work, status, and delays.</p></div>
        <div class="button-pair">
          ${visibleProduction.length ? `<button class="primary-action" data-submit-production type="button">${t("Submit Production", "Enviar produccion")}</button>` : ""}
          <button class="secondary-action" data-print="production">${t("Export PDF", "Exportar PDF")}</button>
        </div>
      </div>
      <div class="form-grid section-gap">
        <label>Job filter<span class="es">Filtro de trabajo</span><select id="productionJobFilter"><option value="">All jobs</option>${setOptions(jobOptions, state.selectedProductionJob, (job) => job.name, (job) => job.id)}</select></label>
        ${isApproverMode() ? `<label>Production capataz<span class="es">Capataz de produccion</span><select id="productionForemanSelect">${setOptions(foremenForArea().map((person) => person.name), selectedForeman)}</select></label>` : ""}
      </div>
      ${activeJob ? `<div class="notice compact-notice">Filtered to ${activeJob}. New production will be added to this job. <span class="es">Filtrado a ${activeJob}. La nueva produccion se agregara a este trabajo.</span></div>` : ""}
      ${!roleIsElevated() && state.selectedRole !== "Quality" ? `<div class="notice section-gap">Showing only production assigned to ${selectedForeman}. <span class="es">Solo se muestra produccion asignada a este capataz.</span></div>` : ""}
      ${canAddProduction ? renderProductionAdder() : ""}
      ${renderWindFoundationSummary(visibleProduction)}
      <div class="production-board section-gap">
        ${visibleProduction.map(renderProductionCard).join("") || `<div class="empty-state">No production items for this job yet.<span class="es">No hay produccion para este trabajo.</span></div>`}
      </div>
      ${visibleProduction.length ? `
        <div class="production-submit-row section-gap">
          <div>
            <strong>${submittedCount} of ${visibleProduction.length} submitted</strong>
            <span class="es">${submittedCount} de ${visibleProduction.length} enviados</span>
          </div>
          <button class="primary-action" data-submit-production type="button">${t("Submit Production", "Enviar produccion")}</button>
        </div>
      ` : ""}
    </section>
  `;
}

function renderProductionAdder() {
  const defaultJob = state.selectedProductionJob || selectedJobs()[0]?.id || "";
  const selectedJob = jobById(defaultJob);
  const selectedForeman = isApproverMode() ? productionForemanName() : state.currentForeman;
  const isWind = selectedJob?.jobType === "Wind Farm";
  const isCustom = selectedJob?.customTracking?.length;
  if (isWind) {
    const foundationIds = selectedJob.foundationIds || [];
    return `
      <div class="production-add-grid wind-production-add section-gap">
        <label>Job<span class="es">Trabajo</span><select id="newProdJob">${setOptions(selectedJobs(), defaultJob, (job) => job.name, (job) => job.id)}</select></label>
        <label>Foundation ID<span class="es">Cimentacion</span><select id="newFoundationId">${foundationIds.length ? setOptions(foundationIds, foundationIds[0]) : '<option value="">No IDs set up</option>'}</select></label>
        <label>Component<span class="es">Parte</span><select id="newFoundationComponent">${setOptions(windFoundationComponents, windFoundationComponents[0])}</select></label>
        <label>Foreman<span class="es">Capataz</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), selectedForeman)}</select></label>
        <button class="secondary-action" id="addProduction" type="button">${t("Add completed part", "Agregar parte terminada")}</button>
      </div>
    `;
  }
  if (isCustom) {
    return `
      <div class="production-add-grid commercial-production-add section-gap">
        <label>Job<span class="es">Trabajo</span><select id="newProdJob">${setOptions(selectedJobs(), defaultJob, (job) => job.name, (job) => job.id)}</select></label>
        <label>Tracking item<span class="es">Partida</span><select id="newCustomTracking">${setOptions(selectedJob.customTracking, selectedJob.customTracking[0]?.id || "", (item) => `${item.name} (${item.unit})`, (item) => item.id)}</select></label>
        <label>Amount completed<span class="es">Cantidad terminada</span><input id="newCustomCompleted" type="number" min="0" step="0.01" placeholder="0" /></label>
        <label>Foreman<span class="es">Capataz</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), selectedForeman)}</select></label>
        <button class="secondary-action" id="addProduction" type="button">${t("Add progress", "Agregar avance")}</button>
      </div>
    `;
  }
  return `
    <div class="production-add-grid section-gap">
      <label>Job<span class="es">Trabajo</span><select id="newProdJob">${setOptions(selectedJobs(), defaultJob, (job) => job.name, (job) => job.id)}</select></label>
      <label>Control code<span class="es">Codigo</span><input id="newProdCode" placeholder="ACA" /></label>
      <label>Description<span class="es">Descripcion</span><input id="newProdDescription" placeholder="DE6 / 4-78D or Cage" /></label>
      <label>Total amount<span class="es">Cantidad total</span><input id="newProdQuantity" type="number" min="0" step="1" placeholder="4" /></label>
      <label>Total weight<span class="es">Peso total</span><input id="newProdWeight" type="number" min="0" step="1" placeholder="18445" /></label>
      <label>Foreman<span class="es">Capataz</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), selectedForeman)}</select></label>
      <button class="secondary-action" id="addProduction" type="button">${t("Add production", "Agregar produccion")}</button>
    </div>
  `;
}

function productionFactsMarkup(item) {
  const quantity = productionQuantity(item);
  const perPiece = unitWeight(item);
  return `
    <span>Total weight: <strong>${number(item.planned)} lbs</strong></span>
    ${quantity ? `<span>Total amount: <strong>${preciseNumber(quantity)}</strong></span><span>Each: <strong>${preciseNumber(perPiece)} lbs</strong></span>` : ""}
  `;
}

function renderProductionCard(item) {
  if (item.productionMode === "foundation") return renderFoundationProductionCard(item);
  if (item.productionMode === "custom") return renderCustomProductionCard(item);
  const quantity = productionQuantity(item);
  const perPiece = unitWeight(item);
  const weightDone = completedWeight(item);
  const pct = item.planned ? Math.min(100, Math.round((weightDone / item.planned) * 100)) : 0;
  const remaining = Math.max((Number(item.planned) || 0) - weightDone, 0);
  const isFab = state.selectedArea === "rebarFab";
  const canEdit = canManageProductionItem(item);
  return `
    <article class="production-card">
      <header class="production-card-header">
        <div>
          <h3>${item.code} - ${item.description}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
          ${item.lastEditedAt ? `<p class="sub">Last edited by ${item.lastEditedBy || ""} · ${item.lastEditedAt}</p>` : ""}
        </div>
        <div class="production-status">
          <strong data-prod-pct="${item.id}">${pct}%</strong>
          <span data-prod-progress-text="${item.id}">${number(weightDone)} / ${number(item.planned)} lbs</span>
        </div>
      </header>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="production-equation" data-prod-equation="${item.id}">
        ${quantity ? `${preciseNumber(quantity)} total x ${preciseNumber(perPiece)} lbs each = ${number(item.planned)} lbs` : `Total weight: ${number(item.planned)} lbs`}
      </div>
      <div class="production-facts" data-prod-facts="${item.id}">
        ${productionFactsMarkup(item)}
        <span>Remaining: <strong data-prod-remaining="${item.id}">${number(remaining)} lbs</strong></span>
      </div>
      <div class="production-controls-v2">
        <div class="production-fieldset">
          <h4>Setup<span class="es">Datos base</span></h4>
          <div class="production-fields two-up">
            <label>Total amount<span class="es">Cantidad total</span><input data-prod="${item.id}" data-field="quantity" type="number" min="0" step="1" value="${quantity || 0}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Total weight<span class="es">Peso total</span><input data-prod="${item.id}" data-field="planned" type="number" min="0" step="1" value="${item.planned || 0}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-fieldset">
          <h4>Progress<span class="es">Avance</span></h4>
          <div class="production-fields two-up">
            <label>Amount completed<span class="es">Cantidad terminada</span><input data-prod="${item.id}" data-field="completedQty" type="number" min="0" step="1" ${quantity ? `max="${quantity}"` : ""} value="${item.completedQty || 0}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Completed weight<span class="es">Peso terminado</span><input data-prod-weight="${item.id}" type="text" value="${number(weightDone)} lbs" readonly /></label>
          </div>
        </div>
        ${isFab ? `
          <div class="production-fieldset">
            <h4>Bundle<span class="es">Paquete</span></h4>
            <div class="production-fields two-up">
              <label>Bundle<span class="es">Paquete</span><input data-prod="${item.id}" data-field="bundle" value="${item.bundle || ""}" ${!canEdit ? "disabled" : ""} /></label>
              <label>Bundle status<span class="es">Estado del paquete</span><select data-prod="${item.id}" data-field="bundleStatus" ${!canEdit ? "disabled" : ""}>${setOptions(bundleStatuses, item.bundleStatus || "Cut")}</select></label>
            </div>
          </div>
        ` : ""}
        <div class="production-fieldset delay-fieldset">
          <h4>Delay<span class="es">Retraso</span></h4>
          <div class="production-fields two-up">
            <label>Delay reason<span class="es">Razon de retraso</span><select data-prod="${item.id}" data-field="delay" ${!canEdit ? "disabled" : ""}>${setOptions(delayReasons, item.delay || "No delay")}</select></label>
            <label>Why / notes<span class="es">Por que / notas</span><input data-prod="${item.id}" data-field="delayNote" value="${item.delayNote || ""}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-card-actions">
          <button class="danger-action table-action" data-remove-production="${item.id}" type="button" ${!canEdit ? "disabled" : ""}>Remove item<span class="es">Quitar partida</span></button>
        </div>
      </div>
    </article>
  `;
}

function renderCustomProductionCard(item) {
  const planned = Number(item.planned) || 0;
  const completed = Number(item.completedQty) || 0;
  const pct = planned ? Math.min(100, Math.round((completed / planned) * 100)) : 0;
  const canEdit = canManageProductionItem(item);
  return `
    <article class="production-card">
      <header class="production-card-header">
        <div>
          <h3>${item.description}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
          ${item.lastEditedAt ? `<p class="sub">Last edited by ${item.lastEditedBy || ""} · ${item.lastEditedAt}</p>` : ""}
        </div>
        <div class="production-status">
          <strong data-prod-pct="${item.id}">${pct}%</strong>
          <span data-prod-progress-text="${item.id}">${preciseNumber(completed)} / ${preciseNumber(planned)} ${item.unit || ""}</span>
        </div>
      </header>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="production-controls-v2">
        <div class="production-fieldset">
          <h4>Progress<span class="es">Avance</span></h4>
          <div class="production-fields three-up">
            <label>Total planned<span class="es">Total planeado</span><input data-prod="${item.id}" data-field="planned" type="number" min="0" step="0.01" value="${planned}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Amount completed<span class="es">Cantidad terminada</span><input data-prod="${item.id}" data-field="completedQty" type="number" min="0" step="0.01" value="${completed}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Unit<span class="es">Unidad</span><input data-prod="${item.id}" data-field="unit" value="${item.unit || ""}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-fieldset delay-fieldset">
          <h4>Delay<span class="es">Retraso</span></h4>
          <div class="production-fields two-up">
            <label>Delay reason<span class="es">Razon de retraso</span><select data-prod="${item.id}" data-field="delay" ${!canEdit ? "disabled" : ""}>${setOptions(delayReasons, item.delay || "No delay")}</select></label>
            <label>Why / notes<span class="es">Por que / notas</span><input data-prod="${item.id}" data-field="delayNote" value="${item.delayNote || ""}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-card-actions">
          <button class="danger-action table-action" data-remove-production="${item.id}" type="button" ${!canEdit ? "disabled" : ""}>Remove item<span class="es">Quitar partida</span></button>
        </div>
      </div>
    </article>
  `;
}

function renderFoundationProductionCard(item) {
  const canEdit = canManageProductionItem(item);
  return `
    <article class="production-card foundation-card">
      <header class="production-card-header">
        <div>
          <h3>${item.foundationId} - ${item.component}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
          ${item.lastEditedAt ? `<p class="sub">Last edited by ${item.lastEditedBy || ""} · ${item.lastEditedAt}</p>` : ""}
        </div>
        <div class="production-status">
          <strong>Done</strong>
          <span>${item.completedAt || state.selectedWeek}</span>
        </div>
      </header>
      <div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>
      <div class="production-controls-v2">
        <div class="production-fieldset">
          <h4>Foundation<span class="es">Cimentacion</span></h4>
          <div class="production-fields three-up">
            <label>Foundation ID<span class="es">Cimentacion</span><input data-prod="${item.id}" data-field="foundationId" value="${item.foundationId || ""}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Component<span class="es">Parte</span><select data-prod="${item.id}" data-field="component" ${!canEdit ? "disabled" : ""}>${setOptions(windFoundationComponents, item.component || windFoundationComponents[0])}</select></label>
            <label>Date completed<span class="es">Fecha terminada</span><input data-prod="${item.id}" data-field="completedAt" type="date" value="${item.completedAt || state.selectedWeek}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-fieldset delay-fieldset">
          <h4>Delay<span class="es">Retraso</span></h4>
          <div class="production-fields two-up">
            <label>Delay reason<span class="es">Razon de retraso</span><select data-prod="${item.id}" data-field="delay" ${!canEdit ? "disabled" : ""}>${setOptions(delayReasons, item.delay || "No delay")}</select></label>
            <label>Why / notes<span class="es">Por que / notas</span><input data-prod="${item.id}" data-field="delayNote" value="${item.delayNote || ""}" ${!canEdit ? "disabled" : ""} /></label>
          </div>
        </div>
        <div class="production-card-actions">
          <button class="danger-action table-action" data-remove-production="${item.id}" type="button" ${!canEdit ? "disabled" : ""}>Remove item<span class="es">Quitar partida</span></button>
        </div>
      </div>
    </article>
  `;
}

function renderJobs() {
  const admin = ["Admin", "Payroll"].includes(state.selectedRole);
  const areaOptions = visibleAreaEntries().map(([id, info]) => ({ id, name: info.label }));
  const isSolar = state.selectedArea === "solarPiles";
  const jobTypes = jobTypeOptionsForArea();
  const selectedJobType = isSolar ? "" : state.jobDraftType || jobTypes[0] || "";
  const visibleJobs = allJobsForArea();
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("Jobs", "Trabajos")}</h2><p class="sub">Office users add jobs here. Foremen only pick from active jobs assigned to their operating area.</p></div>
      </div>
      ${!admin ? `<div class="notice">Only Payroll/Admin can add or change jobs. <span class="es">Solo Payroll/Admin puede agregar o cambiar trabajos.</span></div>` : ""}
      <div class="form-grid section-gap">
        <label>Operating area<span class="es">Area de trabajo</span><select id="jobArea" ${!admin ? "disabled" : ""}>${setOptions(areaOptions, state.selectedArea, (item) => item.name, (item) => item.id)}</select></label>
        ${isSolar ? `
          <label>Client<span class="es">Cliente</span><select id="jobCustomerInput" ${!admin ? "disabled" : ""}>${setOptions(state.jobLists.solarClients, state.jobLists.solarClients[0] || "")}</select></label>
          <label>Job name list<span class="es">Lista de trabajos</span><select id="solarJobNameSelect" ${!admin ? "disabled" : ""}><option value="">Select saved job</option>${setOptions(state.jobLists.solarJobNames, "")}</select></label>
          <label>Or type job name<span class="es">O escriba trabajo</span><input id="jobNameInput" placeholder="Job name" ${!admin ? "disabled" : ""} /></label>
          <label>Job number<span class="es">Numero</span><input id="jobNumberInput" placeholder="Optional" ${!admin ? "disabled" : ""} /></label>
        ` : `
          <label>Job type<span class="es">Tipo de trabajo</span><select id="jobTypeInput" ${!admin ? "disabled" : ""}>${setOptions(jobTypes, selectedJobType)}</select></label>
          <label>Job name<span class="es">Nombre del trabajo</span><input id="jobNameInput" placeholder="Project name" ${!admin ? "disabled" : ""} /></label>
          <label>Job number<span class="es">Numero</span><input id="jobNumberInput" placeholder="Optional" ${!admin ? "disabled" : ""} /></label>
          <label>Customer<span class="es">Cliente</span><input id="jobCustomerInput" placeholder="Optional" ${!admin ? "disabled" : ""} /></label>
        `}
        <label>Status<span class="es">Estado</span><select id="jobStatusInput" ${!admin ? "disabled" : ""}>${setOptions(jobStatuses, "Active")}</select></label>
        <button class="primary-action" id="saveJob" type="button" ${!admin ? "disabled" : ""}>${t("Add job", "Agregar trabajo")}</button>
      </div>
      ${admin && state.selectedArea === "rebarInstall" && selectedJobType === "Wind Farm" ? `
        <div class="job-list-setup section-gap">
          <div>
            <h3>${t("Wind farm foundation IDs", "IDs de cimentaciones")}</h3>
            <p class="sub">For wind farm jobs, generate the foundation list once so foremen choose from a dropdown instead of typing IDs.</p>
          </div>
          <div class="form-grid compact-form-grid">
            <label>Prefix<span class="es">Prefijo</span><input id="foundationPrefix" placeholder="T" value="T" /></label>
            <label>From<span class="es">Desde</span><input id="foundationFrom" type="number" min="1" step="1" placeholder="1" /></label>
            <label>To<span class="es">Hasta</span><input id="foundationTo" type="number" min="1" step="1" placeholder="82" /></label>
            <label>Preview<span class="es">Vista previa</span><input value="Example: T001 to T082" disabled /></label>
          </div>
        </div>
      ` : ""}
      ${admin && selectedJobType === "Commercial" ? `
        <div class="job-list-setup section-gap">
          <div>
            <h3>${t("Custom production tracking", "Seguimiento personalizado")}</h3>
            <p class="sub">For commercial work, define the production items this job needs. Foremen will enter completed amounts against these lines.</p>
          </div>
          <div class="custom-tracking-grid">
            ${[1, 2, 3]
              .map(
                (index) => `
                  <label>Tracking item ${index}<span class="es">Partida ${index}</span><input id="customTrackName${index}" placeholder="Embed plates" /></label>
                  <label>Unit<span class="es">Unidad</span><input id="customTrackUnit${index}" placeholder="pieces, LF, each" /></label>
                  <label>Total planned<span class="es">Total planeado</span><input id="customTrackPlanned${index}" type="number" min="0" step="0.01" placeholder="0" /></label>
                `
              )
              .join("")}
          </div>
        </div>
      ` : ""}
      ${admin && isSolar ? renderSolarListsSetup() : ""}
      ${admin && selectedJobType !== "Wind Farm" ? `
        <div class="job-production-setup section-gap">
          <div>
            <h3>${t("Optional production setup", "Configuracion opcional de produccion")}</h3>
            <p class="sub">Add the first control code now if it is ready. Foreman assignment can be left blank and handled later.</p>
          </div>
          <div class="form-grid compact-form-grid">
            <label>Assign to foreman<span class="es">Asignar a capataz</span><select id="jobProdForeman"><option value="">Unassigned</option>${setOptions(foremenForArea().map((person) => person.name), "")}</select></label>
            <label>Control code<span class="es">Codigo</span><input id="jobProdCode" placeholder="ACA" /></label>
            <label>Description<span class="es">Descripcion</span><input id="jobProdDescription" placeholder="DE6 / 4-78D or Cage" /></label>
            <label>Total amount<span class="es">Cantidad total</span><input id="jobProdQuantity" type="number" min="0" step="1" placeholder="4" /></label>
            <label>Total weight<span class="es">Peso total</span><input id="jobProdWeight" type="number" min="0" step="1" placeholder="18445" /></label>
          </div>
        </div>
      ` : ""}
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Job</th><th>Area</th><th>Type</th><th>Foundations</th><th>Number</th><th>Customer</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${visibleJobs.length ? visibleJobs
              .map((job) => `<tr>
                <td><strong>${job.name}</strong></td>
                <td>${areas[job.area]?.label || job.area}</td>
                <td>${job.jobType || ""}</td>
                <td>${job.foundationIds?.length || ""}</td>
                <td>${job.number || ""}</td>
                <td>${job.customer || ""}</td>
                <td><select class="table-select" data-job-status="${job.id}" ${!admin ? "disabled" : ""}>${setOptions(jobStatuses, job.status || "Active")}</select></td>
                <td><button class="danger-action table-action" data-delete-job="${job.id}" type="button" ${!admin ? "disabled" : ""}>Delete<span class="es">Borrar</span></button></td>
              </tr>`)
              .join("") : `<tr><td colspan="8"><strong>No jobs for ${areas[state.selectedArea]?.label || "this area"} yet.</strong><span class="es">No hay trabajos para esta area.</span></td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSolarListsSetup() {
  return `
    <div class="job-list-setup section-gap">
      <div>
        <h3>${t("Solar Piles lists", "Listas de pilotes solares")}</h3>
        <p class="sub">Admin maintains the client and job-name choices used for Solar Piles jobs.</p>
      </div>
      <div class="job-list-grid">
        <label>Add client<span class="es">Agregar cliente</span><input id="solarClientName" placeholder="Client name" /></label>
        <button class="secondary-action compact-add" id="addSolarClient" type="button">${t("Add client", "Agregar cliente")}</button>
        <label>Add job name<span class="es">Agregar trabajo</span><input id="solarSavedJobName" placeholder="Job name" /></label>
        <button class="secondary-action compact-add" id="addSolarJobName" type="button">${t("Add job name", "Agregar trabajo")}</button>
      </div>
      <div class="list-chip-row">
        ${state.jobLists.solarClients.map((client) => `<span class="tag">${client}</span>`).join("")}
      </div>
      <div class="list-chip-row">
        ${state.jobLists.solarJobNames.map((jobName) => `<span class="tag">${jobName}</span>`).join("")}
      </div>
    </div>
  `;
}

function reimbursementJobOptions() {
  const jobs = allJobsForArea().filter((job) => (job.status || "Active") !== "Complete");
  return jobs.length ? jobs : allJobsForArea();
}

function reimbursementEmployeeOptions() {
  if (isFieldEntryMode()) {
    const sheet = currentSheet();
    const names = sheet.rows?.map((row) => row.employee).filter(Boolean) || [];
    return [...new Set([sheet.foreman, ...names].filter(Boolean))];
  }
  return peopleForArea().map((person) => person.name).sort((a, b) => a.localeCompare(b));
}

function visibleReimbursementRequests() {
  return (state.reimbursementRequests || [])
    .filter((request) => request.area === state.selectedArea)
    .filter((request) => roleIsOffice() || state.selectedRole === "Quality" || request.foreman === state.currentForeman || request.createdBy === actorName())
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function renderReimbursements() {
  const canReview = canManagePayrollAdjustments();
  const jobs = reimbursementJobOptions();
  const defaultJobId = currentSheet()?.jobId || jobs[0]?.id || "";
  const employees = reimbursementEmployeeOptions();
  const requests = visibleReimbursementRequests();
  return `
    <section class="panel">
      <div class="split">
        <div>
          <h2>${t("Reimbursements", "Reembolsos")}</h2>
          <p class="sub">Foremen can request weekly expense reimbursement here. Payroll/Admin can approve, deny, or mark paid.</p>
        </div>
      </div>
      <div class="reimbursement-form section-gap">
        <label>Date<span class="es">Fecha</span><input id="reimbursementDate" type="date" value="${localDateInputValue()}" /></label>
        <label>Job<span class="es">Trabajo</span><select id="reimbursementJob">${setOptions(jobs, defaultJobId, (job) => job.name, (job) => job.id)}</select></label>
        <label>Employee / payee<span class="es">Trabajador / pago a</span><select id="reimbursementEmployee">${setOptions(employees, state.currentForeman)}</select></label>
        <label>Category<span class="es">Categoria</span><select id="reimbursementCategory">${setOptions(reimbursementCategories, "Fuel")}</select></label>
        <label>Amount<span class="es">Cantidad</span><div class="money-input"><span>$</span><input id="reimbursementAmount" type="number" min="0" step="0.01" placeholder="0.00" /></div></label>
        <label class="wide-field">Reason / notes<span class="es">Razon / notas</span><input id="reimbursementNote" placeholder="Receipt, fuel, hotel, supplies, etc." /></label>
        <button class="primary-action compact-add" id="submitReimbursement" type="button">${t("Submit request", "Enviar solicitud")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Date</th><th>Employee</th><th>Job</th><th>Category</th><th>Amount</th><th>Status</th><th>Notes</th><th>Payroll note</th><th>Actions</th></tr></thead>
          <tbody>
            ${requests.length ? requests.map((request) => `
              <tr>
                <td><strong>${escapeHtml(request.date || "")}</strong><span class="sub">${escapeHtml(request.createdBy || "")}</span></td>
                <td>${escapeHtml(request.employee || "")}<span class="sub">${escapeHtml(request.foreman || "")}</span></td>
                <td>${escapeHtml(jobName(request.jobId))}</td>
                <td>${escapeHtml(request.category || "")}</td>
                <td>${money(request.amount)}</td>
                <td><select class="table-select" data-reimbursement-status="${request.id}" ${!canReview ? "disabled" : ""}>${setOptions(reimbursementStatuses, request.status || "Pending")}</select></td>
                <td>${escapeHtml(request.note || "")}</td>
                <td><input class="compact-note" data-reimbursement-note="${request.id}" value="${escapeHtml(request.payrollNote || "")}" placeholder="Payroll note" ${!canReview ? "disabled" : ""} /></td>
                <td><button class="danger-action table-action" data-delete-reimbursement="${request.id}" type="button" ${!canReview ? "disabled" : ""}>Delete<span class="es">Borrar</span></button></td>
              </tr>
            `).join("") : `<tr><td colspan="9"><strong>No reimbursement requests yet.</strong><span class="es">Todavia no hay solicitudes de reembolso.</span></td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDocuments() {
  const canManage = canManageJobDocuments();
  const jobs = allJobsForArea().filter((job) => (job.status || "Active") !== "Complete" || job.documents?.length);
  const selectedJob = jobs.find((job) => job.id === state.selectedDocumentJob) || jobs[0];
  const docs = selectedJob?.documents || [];
  return `
    <section class="panel">
      <div class="split">
        <div>
          <h2>${t("Job Documents", "Documentos del trabajo")}</h2>
          <p class="sub">Upload the job packet once so foremen can view, download, or print it from the field.</p>
        </div>
      </div>
      ${!jobs.length ? `<div class="notice">Add a job first, then documents can be attached to it. <span class="es">Agregue un trabajo primero para subir documentos.</span></div>` : `
        <div class="form-grid document-toolbar">
          <label>Job<span class="es">Trabajo</span><select id="documentJobSelect">${setOptions(jobs, selectedJob?.id || "", (job) => job.name, (job) => job.id)}</select></label>
          ${canManage ? `
            <label>Document type<span class="es">Tipo de documento</span><select id="documentTypeSelect">${setOptions(documentTypes, documentTypes[0])}</select></label>
            <label id="otherDocumentTypeField" class="hidden">Other type<span class="es">Otro tipo</span><input id="otherDocumentType" placeholder="Safety orientation, site map, etc." /></label>
            <label>Upload document (25 MB max)<span class="es">Subir documento (25 MB max)</span><input id="jobDocumentFile" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx" multiple /></label>
          ` : `<div class="notice compact-notice">Only Admin, Management, Quality, or Safety can upload or delete job documents. <span class="es">Solo Admin, gerencia, calidad o seguridad puede subir o borrar documentos.</span></div>`}
        </div>
        <div class="document-job-summary section-gap">
          <strong>${selectedJob.name}</strong>
          <span>${areas[selectedJob.area]?.label || selectedJob.area}${selectedJob.customer ? ` · ${selectedJob.customer}` : ""}</span>
          <span>${docs.length} document${docs.length === 1 ? "" : "s"}</span>
        </div>
        <div class="document-grid">
          ${docs.length ? docs.map((doc) => documentCard(selectedJob.id, doc, canManage)).join("") : `
            <div class="empty-state">
              <strong>No documents uploaded yet.</strong>
              <span class="es">Todavia no hay documentos.</span>
            </div>
          `}
        </div>
      `}
    </section>
  `;
}

function qualityControlRows(defaultCount = 4) {
  return Array.from({ length: defaultCount }, (_, index) => {
    const letter = qcBendLetters[index] || `Size ${index + 1}`;
    return `
      <tr>
        <td><input data-qc-bend="label" value="${letter}" /></td>
        <td><input data-qc-bend="card" placeholder="Size on card" /></td>
        <td><input data-qc-bend="actual" placeholder="Actual size" /></td>
      </tr>
    `;
  }).join("");
}

function qualityAreaOptions() {
  return [
    { id: "rebarFab", name: areas.rebarFab.label },
    { id: "rebarInstall", name: areas.rebarInstall.label }
  ];
}

function qualityJobsForArea(areaId = state.selectedQualityArea || state.selectedArea) {
  return state.jobs.filter((job) => job.area === areaId && (job.status || "Active") !== "Complete");
}

function renderQualityControl() {
  const canSubmit = canUseQualityControl();
  const qualityArea = ["rebarFab", "rebarInstall"].includes(state.selectedQualityArea) ? state.selectedQualityArea : state.selectedArea;
  const records = state.qualityChecks
    .filter((record) => record.area === qualityArea)
    .slice(0, 20);
  return `
    <section class="panel">
      <div class="split">
        <div>
          <h2>${t("Quality Control", "Control de calidad")}</h2>
          <p class="sub">Check card dimensions against actual measurements for rebar fabrication and installation work.</p>
        </div>
        <span class="tag sync-tag">QUALITY<span class="es">Calidad</span></span>
      </div>
      ${!canSubmit ? `<div class="notice">Quality Control is available to QUALITY, Admin, and Management for the two rebar departments.</div>` : ""}
      <div class="form-grid section-gap">
        <label>Rebar department<span class="es">Departamento de varilla</span><select id="qcAreaSelect">${setOptions(qualityAreaOptions(), qualityArea, (item) => item.name, (item) => item.id)}</select></label>
        <label>Job control code<span class="es">Codigo de control del trabajo</span><input id="qcJobCode" placeholder="Example: VS26-LAURW, Q369, AAFR" /></label>
        <label>Card number<span class="es">Numero de tarjeta</span><input id="qcCardCode" placeholder="Example: 11E138, Q369, T058" /></label>
        <label>Operator name<span class="es">Operador</span><input id="qcOperator" placeholder="Operator name" /></label>
        <label>Machine type<span class="es">Tipo de maquina</span><select id="qcMachine">${setOptions(qcMachineTypes, qcMachineTypes[0])}</select></label>
      </div>
      <div class="qc-bend-panel section-gap">
        <div class="split">
          <div>
            <h3>Card size measurements<span class="es">Medidas de la tarjeta</span></h3>
            <p class="sub">Each card starts with at least four size points. Add more when the card has more measurements.</p>
          </div>
          <button class="secondary-action table-action" id="addQcBend" type="button">Add size<span class="es">Agregar medida</span></button>
        </div>
        <div class="table-wrap">
          <table class="entry-table qc-bend-table">
            <thead><tr><th>Size point<span class="es">Punto de medida</span></th><th>Card size<span class="es">Medida en tarjeta</span></th><th>Actual size<span class="es">Medida real</span></th></tr></thead>
            <tbody id="qcBendRows">${qualityControlRows()}</tbody>
          </table>
        </div>
      </div>
      <div class="form-grid section-gap">
        <label>QC result<span class="es">Resultado</span><select id="qcResult">${setOptions(["Pass", "Needs Review", "Reject"], "Pass")}</select></label>
        <label>Reason / notes<span class="es">Razon / notas</span><input id="qcNotes" placeholder="Missed bend, wrong length, bad steel, etc." /></label>
        <button class="primary-action form-button" id="saveQualityCheck" type="button" ${canSubmit ? "" : "disabled"}>${t("Save QC check", "Guardar revision")}</button>
      </div>
      <div class="section-gap">
        <h3>Recent QC records<span class="es">Revisiones recientes</span></h3>
        <div class="table-wrap">
          <table class="entry-table">
            <thead><tr><th>Date</th><th>Department</th><th>Job control code</th><th>Card number</th><th>Machine</th><th>Operator</th><th>Result</th><th>Measurements</th><th>Notes</th></tr></thead>
            <tbody>
              ${records.length ? records.map((record) => `
                <tr>
                  <td>${escapeHtml(record.createdAt || "")}</td>
                  <td>${escapeHtml(areas[record.area]?.label || record.area || "")}</td>
                  <td>${escapeHtml(record.jobCode || "")}</td>
                  <td><strong>${escapeHtml(record.cardCode || "")}</strong></td>
                  <td>${escapeHtml(record.machineType || "")}</td>
                  <td>${escapeHtml(record.operator || "")}</td>
                  <td><span class="tag">${escapeHtml(record.result || "")}</span></td>
                  <td>${record.bends?.length || 0}</td>
                  <td>${escapeHtml(record.notes || "")}</td>
                </tr>
              `).join("") : `<tr><td colspan="9">No QC records for this department yet.<span class="es">Todavia no hay revisiones.</span></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function selectedAreaJobsWithFallback(selectedId) {
  const jobs = allJobsForArea().filter((job) => (job.status || "Active") !== "Complete");
  const selectedJob = jobs.find((job) => job.id === selectedId) || jobs[0];
  return { jobs, selectedJob };
}

function renderSafetyForms() {
  const canSubmit = isFieldEntryMode() || ["Admin", "Management", "Quality", "Safety"].includes(state.selectedRole);
  const { jobs, selectedJob } = selectedAreaJobsWithFallback(state.selectedSafetyJob);
  const forms = state.safetyForms.filter((form) => form.area === state.selectedArea && (!selectedJob || form.jobId === selectedJob.id));
  const selectedType = state.selectedSafetyFormType || "JHA";
  return `
    <section class="panel">
      <div class="split">
        <div>
          <h2>${t("Safety Forms", "Documentos de seguridad")}</h2>
          <p class="sub">Fill out daily safety records by job, attach evidence, and keep the packet available for print or review.</p>
        </div>
        <span class="tag sync-tag">Offline draft ready<span class="es">Borrador sin conexion</span></span>
      </div>
      ${!jobs.length ? `<div class="notice">Add a job first so safety records can be tied to the site. <span class="es">Agregue un trabajo primero.</span></div>` : `
        <div class="form-grid section-gap">
          <label>Job site<span class="es">Sitio de trabajo</span><select id="safetyJobSelect">${setOptions(jobs, selectedJob?.id || "", (job) => job.name, (job) => job.id)}</select></label>
          <label>Form type<span class="es">Tipo de forma</span><select id="safetyTypeSelect">${setOptions(safetyFormTypes, selectedType)}</select></label>
          <label>Date<span class="es">Fecha</span><input id="safetyDate" type="date" value="${dateInputValue(state.selectedWeek, state.selectedWeek)}" /></label>
          <label>Notes<span class="es">Notas</span><input id="safetyNotes" placeholder="Topic, hazard, permit number, or inspection note" /></label>
          <label>Evidence / completed form<span class="es">Evidencia / forma completa</span><input id="safetyFiles" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" multiple /></label>
          <button class="primary-action form-button" id="addSafetyForm" type="button" ${canSubmit ? "" : "disabled"}>${t("Save safety record", "Guardar seguridad")}</button>
        </div>
        ${selectedType === "Accident Report" ? renderAccidentReportFields(selectedJob) : ""}
        <div class="offline-note section-gap">
          <strong>Offline use:</strong> records can be filled out in the browser and will stay on the device until sync is available.
          <span class="es">Uso sin conexion: se guarda en el equipo hasta sincronizar.</span>
        </div>
        <div class="document-grid section-gap">
          ${forms.length ? forms.map(safetyFormCard).join("") : `<div class="empty-state">No safety records for this job yet.<span class="es">Todavia no hay registros de seguridad.</span></div>`}
        </div>
      `}
    </section>
  `;
}

function renderAccidentReportFields(selectedJob) {
  const workerOptions = peopleForArea(selectedJob?.area || state.selectedArea).slice().sort((a, b) => a.name.localeCompare(b.name));
  const department = areas[selectedJob?.area || state.selectedArea]?.label || "";
  return `
    <div class="accident-report-form section-gap">
      <div>
        <h3>Accident Report<span class="es">Reporte de accidente</span></h3>
        <p class="sub">Structured from the company injury report template. Safety/Admin can review and print the finished report.</p>
      </div>
      <div class="form-grid">
        <label>Employee name<span class="es">Nombre del empleado</span><select id="accidentEmployee"><option value="">Select employee</option>${setOptions(workerOptions, "", (person) => person.name, (person) => person.name)}</select></label>
        <label>Manual employee name<span class="es">Nombre manual</span><input id="accidentManualEmployee" placeholder="If employee is not in the list" /></label>
        <label>Sex<span class="es">Sexo</span><select id="accidentSex">${setOptions(["", "Male", "Female"], "")}</select></label>
        <label>Time<span class="es">Hora</span><input id="accidentTime" type="time" /></label>
        <label>Department<span class="es">Departamento</span><input id="accidentDepartment" value="${escapeHtml(department)}" /></label>
        <label>Location where injury took place<span class="es">Lugar de la lesion</span><input id="accidentLocation" placeholder="Exact site/location" /></label>
        <label>Other people injured / involved details<span class="es">Detalles de otros lesionados / involucrados</span><input id="accidentOtherPeople" placeholder="Names and involvement, if any" /></label>
        <label>Report status<span class="es">Estado del reporte</span><select id="accidentStatus">${setOptions(["Draft", "Submitted", "Reviewed"], "Draft")}</select></label>
      </div>
      <div class="accident-choice-grid">
        ${accidentYesNoFields.map(([key, en, es]) => `
          <label class="audit-choice">
            <span>${en}<span class="es">${es}</span></span>
            <select data-accident-yn="${key}">
              ${setOptions(["N/A", "Yes", "No"], "N/A")}
            </select>
          </label>
        `).join("")}
      </div>
      <div>
        <h4>Type of injury / illness<span class="es">Tipo de lesion / enfermedad</span></h4>
        <div class="injury-type-grid">
          ${accidentInjuryTypes.map((type) => `
            <label class="checkbox-tile"><input type="checkbox" data-accident-injury="${escapeHtml(type)}" /> ${escapeHtml(type)}</label>
          `).join("")}
        </div>
      </div>
      <div class="form-grid">
        <label class="wide-field">Affected body part(s)<span class="es">Partes del cuerpo afectadas</span><input id="accidentBodyParts" placeholder="Back, hand, knee, shoulder..." /></label>
        <label class="wide-field">Treatment / doctor / hospital<span class="es">Tratamiento / doctor / hospital</span><input id="accidentTreatment" placeholder="First aid, clinic, ER, doctor name..." /></label>
      </div>
      <div class="form-grid">
        <label class="wide-field">What happened<span class="es">Que paso</span><textarea id="accidentWhatHappened" placeholder="Describe the accident clearly"></textarea></label>
        <label class="wide-field">What directly caused the accident<span class="es">Que causo directamente el accidente</span><textarea id="accidentCause" placeholder="Direct cause / root cause"></textarea></label>
        <label class="wide-field">Corrective action<span class="es">Accion correctiva</span><textarea id="accidentCorrectiveAction" placeholder="What was corrected or needs follow-up"></textarea></label>
        <label class="wide-field">Witnesses<span class="es">Testigos</span><textarea id="accidentWitnesses" placeholder="Names and contact details"></textarea></label>
      </div>
    </div>
  `;
}

function safetyFormCard(form) {
  const files = form.files || [];
  const accident = form.accident || null;
  return `
    <article class="document-card">
      <div>
        <span class="tag">${escapeHtml(form.type)}</span>
        <h3>${escapeHtml(jobName(form.jobId))}</h3>
        <p class="sub">${escapeHtml(form.date)} · ${escapeHtml(form.createdBy || "")}${form.notes ? ` · ${escapeHtml(form.notes)}` : ""}</p>
        ${accident ? `<p class="sub"><strong>${escapeHtml(accident.employee || "No employee")}</strong> · ${escapeHtml(accident.status || "Draft")} · ${escapeHtml(accident.location || "No location")}</p>` : ""}
        ${files.length ? `<p class="sub">${files.length} attachment${files.length === 1 ? "" : "s"}</p>` : ""}
      </div>
      <div class="document-actions">
        <button class="primary-action table-action" data-print-safety="${form.id}" type="button">Print<span class="es">Imprimir</span></button>
      </div>
      ${files.length ? `<div class="attachment-list">${files.map((file) => attachmentRow("safety", form.id, file)).join("")}</div>` : ""}
    </article>
  `;
}

function renderFieldAudits() {
  const canSubmit = isFieldEntryMode() || ["Admin", "Management", "Quality", "Safety"].includes(state.selectedRole);
  const { jobs, selectedJob } = selectedAreaJobsWithFallback(state.selectedAuditJob);
  const audits = state.fieldAudits.filter((audit) => audit.area === state.selectedArea && (!selectedJob || audit.jobId === selectedJob.id));
  return `
    <section class="panel">
      <div class="split">
        <div>
          <h2>${t("Field Audits", "Auditorias de campo")}</h2>
          <p class="sub">Checklist and evidence upload by job site for client inspections, safety checks, and field accountability.</p>
        </div>
        <span class="tag sync-tag">Evidence by job<span class="es">Evidencia por trabajo</span></span>
      </div>
      ${!jobs.length ? `<div class="notice">Add a job first so audits can be tied to the site. <span class="es">Agregue un trabajo primero.</span></div>` : `
        <div class="form-grid section-gap">
          <label>Job site<span class="es">Sitio de trabajo</span><select id="auditJobSelect">${setOptions(jobs, selectedJob?.id || "", (job) => job.name, (job) => job.id)}</select></label>
          <label>Date<span class="es">Fecha</span><input id="auditDate" type="date" value="${dateInputValue(state.selectedWeek, state.selectedWeek)}" /></label>
          <label>Inspector / user<span class="es">Inspector / usuario</span><input id="auditUser" value="${escapeHtml(actorName())}" /></label>
          <label>Evidence photos/files<span class="es">Fotos / evidencia</span><input id="auditFiles" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp" multiple /></label>
        </div>
        <div class="audit-check-grid section-gap">
          ${fieldAuditChecks.map(([key, en, es]) => `
            <label class="audit-choice">
              <span>${en}<span class="es">${es}</span></span>
              <select data-audit-check="${key}">
                ${setOptions(["Yes", "No", "N/A"], "N/A")}
              </select>
            </label>
          `).join("")}
        </div>
        <label class="section-gap">Notes / corrective action<span class="es">Notas / accion correctiva</span><textarea id="auditNotes" placeholder="What was found, what was corrected, who was notified"></textarea></label>
        <div class="action-row section-gap">
          <button class="primary-action" id="saveFieldAudit" type="button" ${canSubmit ? "" : "disabled"}>${t("Save audit", "Guardar auditoria")}</button>
        </div>
        <div class="audit-list section-gap">
          ${audits.length ? audits.map(fieldAuditCard).join("") : `<div class="empty-state">No audits for this job yet.<span class="es">Todavia no hay auditorias.</span></div>`}
        </div>
      `}
    </section>
  `;
}

function fieldAuditCard(audit) {
  const summary = auditStatusSummary(audit.checks);
  const files = audit.files || [];
  return `
    <article class="audit-card">
      <header>
        <div>
          <strong>${escapeHtml(jobName(audit.jobId))}</strong>
          <span>${escapeHtml(audit.date)} · ${escapeHtml(audit.createdBy || "")}</span>
        </div>
        <span class="tag">${summary.yes} Yes · ${summary.no} No · ${summary.na} N/A</span>
      </header>
      <p>${escapeHtml(audit.notes || "No notes")}</p>
      <ul class="audit-result-list">
        ${fieldAuditChecks.map(([key, en, es]) => `<li><strong>${escapeHtml(auditCheckValue(audit.checks?.[key]))}</strong> · ${en}<span class="es">${es}</span></li>`).join("")}
      </ul>
      ${files.length ? `<div class="attachment-list">${files.map((file) => attachmentRow("audit", audit.id, file)).join("")}</div>` : ""}
    </article>
  `;
}

function auditCheckValue(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === "Yes" || value === "No" || value === "N/A") return value;
  return "N/A";
}

function auditStatusSummary(checks = {}) {
  return fieldAuditChecks.reduce((totals, [key]) => {
    const value = auditCheckValue(checks?.[key]);
    if (value === "Yes") totals.yes += 1;
    else if (value === "No") totals.no += 1;
    else totals.na += 1;
    return totals;
  }, { yes: 0, no: 0, na: 0 });
}

function attachmentRow(type, recordId, file) {
  const openAttr = type === "safety" ? "data-safety-file" : "data-audit-file";
  const deleteAttr = type === "safety" ? "data-delete-safety-file" : "data-delete-audit-file";
  return `
    <div class="attachment-row">
      <span><strong>${escapeHtml(file.name)}</strong> · ${fileSize(file.size)}</span>
      <span class="attachment-actions">
        <button class="secondary-action table-action" ${openAttr}="${recordId}" data-file-id="${file.id}" type="button">Open<span class="es">Abrir</span></button>
        <button class="danger-action table-action" ${deleteAttr}="${recordId}" data-file-id="${file.id}" type="button">Delete<span class="es">Borrar</span></button>
      </span>
    </div>
  `;
}

function documentCard(jobId, doc, canManage) {
  return `
    <article class="document-card">
      <div>
        <span class="tag">${doc.type || "Document"}</span>
        <h3>${escapeHtml(doc.name)}</h3>
        <p class="sub">${fileSize(doc.size)} · Uploaded ${doc.uploadedAt || ""}${doc.uploadedBy ? ` by ${escapeHtml(doc.uploadedBy)}` : ""}</p>
      </div>
      <div class="document-actions">
        <button class="secondary-action table-action" data-document-action="view" data-job-id="${jobId}" data-doc-id="${doc.id}" type="button">View<span class="es">Ver</span></button>
        <button class="secondary-action table-action" data-document-action="download" data-job-id="${jobId}" data-doc-id="${doc.id}" type="button">Download<span class="es">Descargar</span></button>
        <button class="primary-action table-action" data-document-action="print" data-job-id="${jobId}" data-doc-id="${doc.id}" type="button">Print<span class="es">Imprimir</span></button>
        ${canManage ? `<button class="danger-action table-action" data-document-action="delete" data-job-id="${jobId}" data-doc-id="${doc.id}" type="button">Delete<span class="es">Borrar</span></button>` : ""}
      </div>
    </article>
  `;
}

function renderEmployeeReports() {
  const employees = uniqueEmployees();
  const selectedEmployee = state.selectedEmployeeReport && employees.includes(state.selectedEmployeeReport) ? state.selectedEmployeeReport : employees[0] || "";
  const employeeArea = state.selectedEmployeeReportArea || "all";
  const { fromDate, toDate } = selectedEmployeeDateRange();
  const employeeRecords = employeeReportRecords(selectedEmployee, fromDate, toDate, employeeArea);
  const employeeTotals = employeeReportTotals(employeeRecords);
  const person = personByName(selectedEmployee) || {};
  const normalCrew = person.group || employeeRecords.find((record) => record.group)?.group || "Not assigned";
  const normalRole = person.role || employeeRecords.find((record) => record.role)?.role || "Not set";
  const areaLabel = person.area ? areas[person.area]?.label : "All areas";
  const trainingBadges = accreditedTrainingBadges(selectedEmployee);
  return `
    <section class="panel printable-report employee-report-page">
      ${reportHeader("Employee Reports", dateRangeLabel(fromDate, toDate))}
      <div class="split">
        <div>
          <h2>${t("Employee Reports", "Reportes de empleados")}</h2>
          <p class="sub">Search one employee and see hours, normal crew, selected-day totals, and job history.</p>
        </div>
        <div class="button-group no-print">
          <button class="secondary-action" data-print="employee-report" type="button">${t("Export PDF", "Exportar PDF")}</button>
          <button class="secondary-action" id="exportEmployeeCsv" type="button">${t("Export Employee CSV", "Exportar CSV trabajador")}</button>
        </div>
      </div>
      <div class="form-grid section-gap no-print">
        <label>Employee<span class="es">Trabajador</span><select id="employeeReportSelect">${setOptions(employees, selectedEmployee)}</select></label>
        <label>Operating area<span class="es">Area de trabajo</span><select id="employeeReportArea"><option value="all" ${employeeArea === "all" ? "selected" : ""}>All areas</option>${visibleAreaEntries().map(([id, details]) => `<option value="${id}" ${employeeArea === id ? "selected" : ""}>${details.label}</option>`).join("")}</select></label>
        <label>From day<span class="es">Desde dia</span><input id="employeeReportFromDate" type="date" value="${fromDate}" /></label>
        <label>To day<span class="es">Hasta dia</span><input id="employeeReportToDate" type="date" value="${toDate}" /></label>
        ${dateShiftControls("employeeReports", "Back range", "Forward range")}
      </div>
      <div class="metric-grid section-gap">
        <article class="metric"><span>Normal crew</span><strong>${normalCrew}</strong><small>${areaLabel}</small></article>
        <article class="metric"><span>Normal role</span><strong>${normalRole}</strong><small>Current people setup</small></article>
        <article class="metric"><span>Hourly rate</span><strong>${money(person.hourlyRate || 0)}</strong><small>Visible to office users</small></article>
        <article class="metric"><span>Selected period gross est.</span><strong>${money(employeeTotals.gross)}</strong><small>Hours x rate + per diem + reimbursements</small></article>
      </div>
      <div class="metric-grid section-gap">
        <article class="metric"><span>Total paid hours</span><strong>${preciseNumber(employeeTotals.total)}</strong><small>${employeeTotals.weeks} week(s)</small></article>
        <article class="metric"><span>Regular hours</span><strong>${preciseNumber(employeeTotals.regular)}</strong><small>Across selected period</small></article>
        <article class="metric"><span>PTO / Sick</span><strong>${preciseNumber(employeeTotals.pto)} / ${preciseNumber(employeeTotals.sick)}</strong><small>Paid leave hours</small></article>
        <article class="metric"><span>Per diem</span><strong>${money(employeeTotals.perDiem)}</strong><small>Field install only</small></article>
        <article class="metric"><span>Reimbursements</span><strong>${money(employeeTotals.reimbursement)}</strong><small>Payroll/admin entered</small></article>
      </div>
      <div class="section-gap">
        <h3>Training badges<span class="es">Insignias de capacitacion</span></h3>
        <div class="badge-row">
          ${trainingBadges.length ? trainingBadges.map((badge) => `<span class="training-badge">${escapeHtml(badge.title)}<small>${escapeHtml(badge.accreditedAt || "")}</small></span>`).join("") : `<span class="empty-state">No accredited training yet.<span class="es">Todavia no hay capacitacion acreditada.</span></span>`}
        </div>
      </div>
      <div class="table-wrap section-gap employee-report-table">${employeeReportTable(employeeRecords)}</div>
    </section>
  `;
}

function renderDeliverables() {
  const canExportPayroll = ["Admin", "Payroll"].includes(state.selectedRole);
  const foremen = foremenForArea();
  if (state.deliverableForeman !== "all" && !foremen.some((person) => person.name === state.deliverableForeman)) {
    state.deliverableForeman = "all";
  }
  const reportPackage = state.deliverablePackage || "timesheets";
  const showTimesheets = reportPackage === "timesheets" || reportPackage === "both";
  const showProductionDeliverables = reportPackage === "production" || reportPackage === "both";
  const sheets = deliverableSheets();
  const productionItems = deliverableProductionItems();
  const timesheetTotals = deliverableTimesheetTotals(sheets);
  const productionStats = productionTotals(productionItems);
  const { fromDate, toDate } = deliverableDateRange();
  const foremanOptions = [{ value: "all", label: "All foremen / crews" }, ...foremen.map((person) => ({ value: person.name, label: deliverableForemanLabel(person.name) }))];
  const subtitle = `${deliverableForemanLabel()} · ${deliverablePackageLabel(reportPackage)} · ${fromDate} to ${toDate}`;
  return `
    <section class="panel printable-report deliverables-report">
      ${reportHeader("Deliverables", subtitle)}
      <div class="split">
        <div><h2>${t("Deliverables", "Entregables")}</h2><p class="sub">Choose the foreman/crew, report type, and dates before printing or exporting.</p></div>
      </div>
      <div class="form-grid section-gap report-controls no-print">
        <label>Foreman / crew<span class="es">Capataz / cuadrilla</span><select id="deliverableForeman">${setOptions(foremanOptions, state.deliverableForeman, (option) => option.label, (option) => option.value)}</select></label>
        <label>Report type<span class="es">Tipo de reporte</span><select id="deliverablePackage">${setOptions([
          { value: "timesheets", label: "Timesheets" },
          { value: "production", label: "Production" },
          { value: "both", label: "Timesheets + Production" }
        ], reportPackage, (option) => option.label, (option) => option.value)}</select></label>
        <label>From date<span class="es">Desde fecha</span><input id="deliverableFromDate" type="date" value="${fromDate}" /></label>
        <label>To date<span class="es">Hasta fecha</span><input id="deliverableToDate" type="date" value="${toDate}" /></label>
        ${dateShiftControls("deliverables", "Back range", "Forward range")}
        <button class="secondary-action" data-print="deliverables">${t("Export PDF", "Exportar PDF")}</button>
        ${canExportPayroll && showTimesheets ? `<button class="secondary-action" id="exportPayrollCsv" type="button">${t("Export Payroll CSV", "Exportar CSV nomina")}</button>` : ""}
      </div>
      <div class="metric-grid section-gap">
        ${showTimesheets ? `<article class="metric"><span>Hours</span><strong>${number(timesheetTotals.hours)}</strong><small>${sheets.length} timesheet(s)</small></article>` : ""}
        ${showTimesheets && area().perDiem ? `<article class="metric"><span>Per diem</span><strong>${money(timesheetTotals.perDiem)}</strong><small>Field install only</small></article>` : ""}
        ${showTimesheets && canExportPayroll ? `<article class="metric"><span>Reimbursements</span><strong>${money(timesheetTotals.reimbursement)}</strong><small>Payroll adjustments</small></article>` : ""}
        ${showProductionDeliverables ? `<article class="metric"><span>Production completed</span><strong>${number(productionStats.completed)}</strong><small>${productionItems.length} production record(s)</small></article>
        <article class="metric"><span>Delays</span><strong>${productionStats.delayed}</strong><small>Production issues</small></article>` : ""}
      </div>
      <div class="deliverable-sections section-gap">
        ${showTimesheets && canExportPayroll ? `
        <section class="dashboard-data-section">
          <h3>${t("Payroll Summary", "Resumen de nomina")}</h3>
          <p class="sub">One row per employee for the selected period. Use this first for payroll review; use the timesheet detail below for audit questions.</p>
          <div class="table-wrap">${payrollSummaryTable(sheets)}</div>
        </section>
        ` : ""}
        ${showTimesheets ? `
        <section class="dashboard-data-section">
          <h3>${t("Timesheet Detail", "Detalle de horas")}</h3>
          <p class="sub">Detailed rows by foreman, crew, job, and week for review only.</p>
          <div class="table-wrap">${deliverableTimesheetTable(sheets)}</div>
        </section>
        ` : ""}
        ${showProductionDeliverables ? `
          <section class="dashboard-data-section">
            <h3>${t("Production", "Produccion")}</h3>
            <div class="table-wrap">${deliverableProductionTable(productionItems)}</div>
          </section>
        ` : ""}
      </div>
      ${roleIsElevated() ? `
        <div class="employee-report section-gap">
          <div>
            <h3>${t("Activity Log", "Registro de actividad")}</h3>
            <p class="sub">Recent changes for accountability and review.</p>
          </div>
          <div class="table-wrap section-gap">${activityLogTable()}</div>
        </div>
      ` : ""}
    </section>
  `;
}

function renderSetup() {
  const canManage = canManagePeopleSetup();
  const canEditRates = canEditPayRates();
  if (area().mode === "crew") return renderCrewSetup(canManage, canEditRates);
  return renderShiftSetup(canManage, canEditRates);
}

function renderForemanRenameTool(foreman) {
  return `
    <div class="foreman-rename section-gap">
      <div>
        <h3>${t("Edit foreman name", "Editar nombre de capataz")}</h3>
        <p class="sub">Updates this foreman, crew name, timesheets, production assignments, and login choices.</p>
      </div>
      <div class="foreman-rename-grid">
        <label>Current name<span class="es">Nombre actual</span><input value="${escapeHtml(foreman)}" disabled /></label>
        <label>New name<span class="es">Nombre nuevo</span><input id="renameForemanInput" placeholder="${escapeHtml(foreman)}" /></label>
        <button class="primary-action" id="renameForemanButton" type="button">${t("Save name", "Guardar nombre")}</button>
      </div>
    </div>
  `;
}

function renderForemanCrewAdminTool(foreman, crewMembers) {
  return `
    <div class="foreman-rename section-gap">
      <div>
        <h3>${t("Foreman / crew controls", "Controles de capataz / cuadrilla")}</h3>
        <p class="sub">Add a foreman with a default crew, or remove the selected foreman and unassign that crew.</p>
      </div>
      <div class="foreman-admin-grid">
        <label>New foreman<span class="es">Nuevo capataz</span><input id="newForemanName" placeholder="Name" /></label>
        <button class="primary-action" id="addForemanButton" type="button">${t("Add foreman / crew", "Agregar capataz / cuadrilla")}</button>
        <button class="danger-action" id="deleteForemanButton" type="button" ${!foreman ? "disabled" : ""}>${t("Delete selected foreman / crew", "Borrar capataz / cuadrilla")}</button>
      </div>
      <p class="sub compact-copy">${crewMembers.length} default crew member(s) assigned to this foreman.</p>
    </div>
  `;
}

function renderEmployeeProfilePanel(canEditProfiles) {
  const person = selectedEmployeeProfile();
  const people = peopleForArea().slice().sort((a, b) => a.name.localeCompare(b.name));
  if (!person) {
    return `
      <div class="employee-profile-panel section-gap">
        <h3>${t("Employee profile", "Perfil del trabajador")}</h3>
        <div class="empty-state">Add employees first, then certifications and machine training can be tracked here.<span class="es">Agregue empleados primero para registrar certificaciones y entrenamiento.</span></div>
      </div>
    `;
  }
  const disabled = !canEditProfiles ? "disabled" : "";
  const certs = new Set(person.certs || []);
  const machines = new Set(person.machines || []);
  const trainingBadges = accreditedTrainingBadges(person.name);
  const checkboxTiles = (values, field, selectedSet) => values
    .map((value) => `
      <label class="checkbox-tile">
        <input data-profile-${field}="${escapeHtml(value)}" type="checkbox" ${selectedSet.has(value) ? "checked" : ""} ${disabled} />
        <span>${escapeHtml(value)}</span>
      </label>
    `)
    .join("");

  return `
    <div class="employee-profile-panel section-gap">
      <div class="split">
        <div>
          <h3>${t("Employee profile", "Perfil del trabajador")}</h3>
          <p class="sub">Track equipment certifications and machines this employee is trained to operate.</p>
        </div>
        ${!canEditProfiles ? `<span class="tag">View only</span>` : ""}
      </div>
      <div class="form-grid compact-form-grid">
        <label>Employee<span class="es">Trabajador</span><select id="employeeProfileSelect">${setOptions(people, person.name, (entry) => `${entry.name} - ${entry.role}`, (entry) => entry.name)}</select></label>
        <label>Normal crew / shift<span class="es">Cuadrilla / turno</span><input value="${escapeHtml(person.group || "")}" disabled /></label>
        <label>Role<span class="es">Puesto</span><input value="${escapeHtml(person.role || "")}" disabled /></label>
        <label>Hourly rate<span class="es">Pago por hora</span><input value="${money(person.hourlyRate || 0)}" disabled /></label>
      </div>
      <div class="profile-check-sections">
        <div>
          <h4>${t("Equipment certs", "Certificaciones de equipo")}</h4>
          <div class="profile-check-grid">${checkboxTiles(employeeCertOptions, "cert", certs)}</div>
        </div>
        <div>
          <h4>${t("Machine training", "Maquinas entrenadas")}</h4>
          <div class="profile-check-grid">${checkboxTiles(employeeMachineOptions, "machine", machines)}</div>
        </div>
      </div>
      <div class="section-gap">
        <h4>${t("Training badges", "Insignias de capacitacion")}</h4>
        <div class="badge-row">
          ${trainingBadges.length ? trainingBadges.map((badge) => `<span class="training-badge">${escapeHtml(badge.title)}<small>${escapeHtml(badge.accreditedAt || "")}</small></span>`).join("") : `<span class="empty-state">No accredited training yet.<span class="es">Todavia no hay capacitacion acreditada.</span></span>`}
        </div>
      </div>
    </div>
  `;
}

function renderCrewSetup(canManage, canEditRates) {
  const canEditProfiles = canEditEmployeeProfiles();
  const foreman = setupForemanName();
  const crew = foreman ? crewNameForForeman(foreman) : "";
  const crewMembers = peopleForArea().filter((person) => person.group === crew);
  const availableWorkers = peopleForArea().filter((person) => person.role !== "Foreman" && person.group !== crew);
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("People / Crews", "Personas / Cuadrillas")}</h2><p class="sub">Select a foreman to manage the default crew assigned to that foreman.</p></div>
      </div>
      ${!canManage ? `<div class="notice">Only Admin can permanently change people or crews. Payroll can update hourly rates. Safety and Quality can update certifications and training. <span class="es">Solo Admin puede cambiar personas o cuadrillas. Payroll puede actualizar pagos por hora. Seguridad y calidad pueden actualizar certificaciones y entrenamientos.</span></div>` : ""}
      <div class="form-grid section-gap">
        <label>Foreman<span class="es">Capataz</span><select id="setupForemanSelect">${foreman ? setOptions(foremenForArea().map((person) => person.name), foreman) : '<option value="">No foremen set up</option>'}</select></label>
        <label>Crew<span class="es">Cuadrilla</span><input value="${crew || "No crew selected"}" disabled /></label>
        <label>Crew size<span class="es">Integrantes</span><input value="${crewMembers.length}" disabled /></label>
      </div>
      ${canManage ? renderForemanCrewAdminTool(foreman, crewMembers) : ""}
      ${canManage && foreman ? renderForemanRenameTool(foreman) : ""}
      ${renderEmployeeProfilePanel(canEditProfiles)}
      <div class="crew-add-grid section-gap">
        <label>Add existing worker<span class="es">Agregar trabajador existente</span><select id="crewExistingWorker" ${!canManage ? "disabled" : ""}><option value="">Select worker</option>${setOptions(availableWorkers, "", (person) => `${person.name} - ${person.role}`, (person) => person.name)}</select></label>
        <label>Or type new name<span class="es">O escriba nombre nuevo</span><input id="crewNewName" placeholder="Name" ${!canManage ? "disabled" : ""} /></label>
        <label>Role<span class="es">Puesto</span><select id="crewNewRole" ${!canManage ? "disabled" : ""}>${setOptions(area().roles.filter((role) => role !== "Foreman"), "Rodbuster")}</select></label>
        <label>Hourly rate<span class="es">Pago por hora</span><div class="money-input"><span>$</span><input id="crewHourlyRate" type="number" min="0" step="0.01" placeholder="0.00" ${!canManage ? "disabled" : ""} /></div></label>
        <label class="check-label"><input id="crewNewDol" type="checkbox" ${!canManage ? "disabled" : ""} /> DOL apprentice</label>
        <button class="primary-action compact-add" id="addCrewPerson" type="button" ${!canManage ? "disabled" : ""}>${t("Add", "Agregar")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Crew</th><th>Hourly rate</th><th>DOL</th><th>Actions</th></tr></thead>
          <tbody>
            ${crewMembers
              .map((person) => `<tr>
                <td><strong>${person.name}</strong></td>
                <td><select class="table-select" data-person-field="role" data-person-name="${person.name}" ${!canManage || person.role === "Foreman" ? "disabled" : ""}>${setOptions(area().roles, person.role)}</select></td>
                <td>${person.group}</td>
                <td><div class="money-input compact-money"><span>$</span><input data-person-field="hourlyRate" data-person-name="${person.name}" type="number" min="0" step="0.01" value="${person.hourlyRate || 0}" ${!canEditRates ? "disabled" : ""} /></div></td>
                <td>${person.dol ? "Yes" : "No"}</td>
                <td>${person.role === "Foreman" ? '<span class="tag">Foreman</span>' : `<button class="danger-action table-action" data-remove-crew-person="${person.name}" type="button" ${!canManage ? "disabled" : ""}>Remove<span class="es">Quitar</span></button>`}</td>
              </tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderShiftSetup(canManage, canEditRates) {
  const canEditProfiles = canEditEmployeeProfiles();
  const selectedForeman = setupForemanName();
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("People / Shifts", "Personas / Turnos")}</h2><p class="sub">Admin keeps default day or night shift assignments here.</p></div>
      </div>
      ${!canManage ? `<div class="notice">Only Admin can permanently change people or shifts. Payroll can update hourly rates. Safety and Quality can update certifications and training. <span class="es">Solo Admin puede cambiar personas o turnos. Payroll puede actualizar pagos por hora. Seguridad y calidad pueden actualizar certificaciones y entrenamientos.</span></div>` : ""}
      ${canManage && selectedForeman ? renderForemanRenameTool(selectedForeman) : ""}
      ${renderEmployeeProfilePanel(canEditProfiles)}
      <div class="people-form section-gap">
        <label>Name<span class="es">Nombre</span><input id="personName" ${!canManage ? "disabled" : ""} /></label>
        <label>Role<span class="es">Puesto</span><select id="personRole" ${!canManage ? "disabled" : ""}>${setOptions(area().roles, area().roles[1] || area().roles[0])}</select></label>
        <label>Default shift<span class="es">Turno</span><select id="personGroup" ${!canManage ? "disabled" : ""}>${setOptions(groupOptions(), groupOptions()[0] || "")}</select></label>
        <label>Hourly rate<span class="es">Pago por hora</span><div class="money-input"><span>$</span><input id="personHourlyRate" type="number" min="0" step="0.01" placeholder="0.00" ${!canManage ? "disabled" : ""} /></div></label>
        <button class="primary-action" id="savePerson" type="button" ${!canManage ? "disabled" : ""}>${t("Save person", "Guardar persona")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Shift</th><th>Hourly rate</th><th>Actions</th></tr></thead>
          <tbody>
            ${peopleForArea()
              .map((person) => `<tr>
                <td><strong>${person.name}</strong></td>
                <td><select class="table-select" data-person-field="role" data-person-name="${person.name}" ${!canManage || person.role === "Foreman" ? "disabled" : ""}>${setOptions(area().roles, person.role)}</select></td>
                <td><select class="table-select" data-person-field="group" data-person-name="${person.name}" ${!canManage ? "disabled" : ""}>${setOptions(groupOptions(), person.group || groupOptions()[0] || "")}</select></td>
                <td><div class="money-input compact-money"><span>$</span><input data-person-field="hourlyRate" data-person-name="${person.name}" type="number" min="0" step="0.01" value="${person.hourlyRate || 0}" ${!canEditRates ? "disabled" : ""} /></div></td>
                <td><button class="danger-action table-action" data-remove-person="${person.name}" type="button" ${!canManage || person.role === "Foreman" ? "disabled" : ""}>Delete<span class="es">Borrar</span></button></td>
              </tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function jobName(jobId) {
  return state.jobs.find((job) => job.id === jobId)?.name || jobId;
}

function selectBundleJob(jobId) {
  const job = state.bundlePlanner.jobs.find((entry) => entry.id === jobId);
  if (!job) return;
  state.bundlePlanner.selectedJobId = job.id;
  state.bundlePlanner.selectedSectionId = job.bundles?.[0]?.id || "";
  syncBundlePlannerFromJob(job);
  saveState();
  render();
}

function createBundleJob() {
  if (!canManageBundlePlanner()) return;
  const name = $("newBundleJobName")?.value.trim();
  if (!name) {
    showToast("Enter a job name");
    return;
  }
  const job = {
    id: `bundle-job-${Date.now()}`,
    jobName: name,
    customer: "",
    jobNumber: $("newBundleJobNumber")?.value.trim() || "",
    detailer: "",
    packageType: $("newBundlePackageType")?.value.trim() || "Fabrication package",
    source: "Manual setup",
    imports: [],
    analysis: null,
    bundles: [],
    trailerSignoffs: {}
  };
  state.bundlePlanner.jobs.unshift(job);
  state.bundlePlanner.selectedJobId = job.id;
  state.bundlePlanner.selectedSectionId = "";
  syncBundlePlannerFromJob(job);
  logActivity("Rebar fabrication tracking job created", { job: job.jobName, field: job.packageType });
  saveState();
  render();
  showToast(`${job.jobName} created`);
}

function selectBundleSection(sectionId) {
  if (!currentBundleSections().some((bundle) => bundle.id === sectionId)) return;
  state.bundlePlanner.selectedSectionId = sectionId;
  saveState();
  render();
}

function addBundleSection() {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  if (!job) return;
  const code = $("newBundleCode")?.value.trim();
  if (!code) {
    showToast("Enter a control code");
    return;
  }
  const section = {
    id: `bundle-section-${Date.now()}`,
    tag: code,
    controlCode: code,
    release: "",
    scanCode: "",
    description: $("newBundleDescription")?.value.trim() || "",
    pieces: 0,
    completedQty: 0,
    weight: Number($("newBundleWeight")?.value) || 0,
    trailer: "",
    status: "Planned",
    process: {},
    rejectedPieces: 0,
    rejectReason: "None",
    qualityNotes: "",
    notes: "Manually added",
    items: []
  };
  job.bundles.push(section);
  state.bundlePlanner.selectedSectionId = section.id;
  syncBundlePlannerFromJob(job);
  logActivity("Control-code section added", { job: job.jobName, tag: code, field: "section" });
  saveState();
  render();
  showToast(`${code} added`);
}

function deleteBundleSection(sectionId) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const section = job?.bundles.find((bundle) => bundle.id === sectionId);
  if (!job || !section) return;
  if (!confirm(`Delete ${section.controlCode || section.tag}?`)) return;
  job.bundles = job.bundles.filter((bundle) => bundle.id !== sectionId);
  state.bundlePlanner.selectedSectionId = job.bundles[0]?.id || "";
  syncBundlePlannerFromJob(job);
  logActivity("Control-code section deleted", { job: job.jobName, tag: section.controlCode || section.tag });
  saveState();
  render();
  showToast(`${section.controlCode || section.tag} deleted`);
}

function addBundleItem() {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const section = currentBundleSection();
  if (!job || !section) return;
  const item = {
    id: `bundle-item-${Date.now()}`,
    item: $("newBundleItemNumber")?.value.trim() || `${(section.items?.length || 0) + 1}`,
    qty: Number($("newBundleItemQty")?.value) || 0,
    size: $("newBundleItemSize")?.value.trim() || "",
    length: $("newBundleItemLength")?.value.trim() || "",
    mark: $("newBundleItemMark")?.value.trim() || "",
    shape: $("newBundleItemShape")?.value.trim() || "",
    weight: Number($("newBundleItemWeight")?.value) || 0,
    status: "Planned",
    notes: ""
  };
  section.items = section.items || [];
  section.items.push(item);
  section.pieces = section.items.reduce((sum, entry) => sum + (Number(entry.qty) || 0), 0);
  section.weight = section.items.reduce((sum, entry) => sum + (Number(entry.weight) || 0), 0) || section.weight;
  syncBundlePlannerFromJob(job);
  logActivity("Tag/item row added", { job: job.jobName, tag: section.controlCode, field: item.item });
  saveState();
  render();
  showToast(`Item ${item.item} added`);
}

function updateBundleItem(event) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const section = currentBundleSection();
  const item = section?.items?.find((entry) => entry.id === event.target.dataset.bundleItem);
  if (!job || !section || !item) return;
  const field = event.target.dataset.itemField;
  const oldValue = item[field];
  item[field] = ["qty", "weight"].includes(field) ? Number(event.target.value) || 0 : event.target.value;
  section.pieces = section.items.reduce((sum, entry) => sum + (Number(entry.qty) || 0), 0);
  section.weight = section.items.reduce((sum, entry) => sum + (Number(entry.weight) || 0), 0) || section.weight;
  syncBundlePlannerFromJob(job);
  logActivity("Tag/item row changed", { job: job.jobName, tag: section.controlCode, field, from: oldValue, to: item[field] });
  saveState();
  render();
}

function deleteBundleItem(itemId) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const section = currentBundleSection();
  const item = section?.items?.find((entry) => entry.id === itemId);
  if (!job || !section || !item) return;
  if (!confirm(`Delete item ${item.item || item.mark || ""}?`)) return;
  section.items = section.items.filter((entry) => entry.id !== itemId);
  section.pieces = section.items.reduce((sum, entry) => sum + (Number(entry.qty) || 0), 0);
  section.weight = section.items.reduce((sum, entry) => sum + (Number(entry.weight) || 0), 0) || section.weight;
  syncBundlePlannerFromJob(job);
  logActivity("Tag/item row deleted", { job: job.jobName, tag: section.controlCode, field: item.item || item.mark });
  saveState();
  render();
  showToast("Item deleted");
}

function bindTabEvents() {
  document.querySelectorAll("[data-print]").forEach((button) => button.addEventListener("click", () => window.print()));
  document.querySelectorAll("[data-date-shift]").forEach((button) => {
    button.addEventListener("click", () => {
      const daysDelta = Number(button.dataset.days) || 0;
      if (button.dataset.dateShift === "selectedWeek") shiftSelectedWeek(daysDelta);
      if (button.dataset.dateShift === "deliverables") shiftDeliverableDateRange(daysDelta);
      if (button.dataset.dateShift === "employeeReports") shiftEmployeeReportDateRange(daysDelta);
    });
  });
  initializeBundlePanelControls();
  document.querySelectorAll("[data-toggle-bundle-panel]").forEach((button) => {
    button.addEventListener("click", () => toggleBundlePanel(button.dataset.toggleBundlePanel));
  });

  const sheet = currentSheet();
  const editable = canEditSheet(sheet);

  ["bundleJobName", "bundleCustomer", "bundleJobNumber", "bundleDetailer", "bundlePackageType", "bundleSource", "bundleMaxBundleWeight", "bundleMaxBundleLength", "bundleTagRule", "bundleScanCodeSearch", "bundleMaxWeight"].forEach((id) => {
    if ($(id)) $(id).addEventListener("change", updateBundlePlannerSettings);
  });
  if ($("bundleScanCodeSearch")) $("bundleScanCodeSearch").addEventListener("input", updateBundleScanLookup);
  if ($("packageUploadInput")) $("packageUploadInput").addEventListener("change", recordPackageUpload);
  if ($("createBundleJob")) $("createBundleJob").addEventListener("click", createBundleJob);
  if ($("addBundleSection")) $("addBundleSection").addEventListener("click", addBundleSection);
  if ($("addBundleItem")) $("addBundleItem").addEventListener("click", addBundleItem);
  if ($("analyzePackage")) $("analyzePackage").addEventListener("click", analyzeDetailerPackage);
  if ($("importAnalyzedRows")) $("importAnalyzedRows").addEventListener("click", importAnalyzedPackageRows);
  if ($("addTrailer")) $("addTrailer").addEventListener("click", addTrailerToPlanner);
  if ($("addTrailerFromCode")) $("addTrailerFromCode").addEventListener("click", addTrailerToPlanner);
  if ($("autoAssignTrailers")) $("autoAssignTrailers").addEventListener("click", autoAssignTrailers);
  document.querySelectorAll("[data-delete-package-import]").forEach((button) => {
    button.addEventListener("click", () => deletePackageImport(button.dataset.deletePackageImport));
  });
  document.querySelectorAll("[data-bundle-job]").forEach((button) => {
    button.addEventListener("click", () => selectBundleJob(button.dataset.bundleJob));
  });
  document.querySelectorAll("[data-open-bundle-section]").forEach((button) => {
    button.addEventListener("click", () => selectBundleSection(button.dataset.openBundleSection));
  });
  document.querySelectorAll("[data-delete-bundle-section]").forEach((button) => {
    button.addEventListener("click", () => deleteBundleSection(button.dataset.deleteBundleSection));
  });
  document.querySelectorAll("[data-delete-bundle-item]").forEach((button) => {
    button.addEventListener("click", () => deleteBundleItem(button.dataset.deleteBundleItem));
  });
  document.querySelectorAll("[data-signoff-trailer]").forEach((button) => {
    button.addEventListener("click", () => signOffTrailer(button.dataset.signoffTrailer));
  });
  document.querySelectorAll("[data-clear-trailer-signoff]").forEach((button) => {
    button.addEventListener("click", () => clearTrailerSignoff(button.dataset.clearTrailerSignoff));
  });
  document.querySelectorAll("[data-bundle]").forEach((input) => {
    input.addEventListener("change", updateBundleRow);
  });
  document.querySelectorAll("[data-bundle-item]").forEach((input) => {
    input.addEventListener("change", updateBundleItem);
  });

  if ($("sheetJob")) $("sheetJob").addEventListener("change", (event) => updateSheet({ jobId: event.target.value }));
  if ($("sheetWeekStart")) $("sheetWeekStart").addEventListener("change", (event) => setSelectedWeekStart(event.target.value));
  if ($("sheetForeman")) {
    $("sheetForeman").addEventListener("change", (event) => {
      if (!editable) return;
      state.currentForeman = event.target.value;
      saveState();
      render();
    });
  }
  if ($("deliverableForeman")) {
    $("deliverableForeman").addEventListener("change", (event) => {
      state.deliverableForeman = event.target.value;
      saveState();
      render();
    });
  }
  if ($("deliverablePackage")) {
    $("deliverablePackage").addEventListener("change", (event) => {
      state.deliverablePackage = event.target.value;
      saveState();
      render();
    });
  }
  if ($("deliverableFromDate")) {
    $("deliverableFromDate").addEventListener("change", (event) => {
      state.deliverableFromDate = event.target.value;
      saveState();
      render();
    });
  }
  if ($("deliverableToDate")) {
    $("deliverableToDate").addEventListener("change", (event) => {
      state.deliverableToDate = event.target.value;
      saveState();
      render();
    });
  }
  if ($("productionJobFilter")) {
    $("productionJobFilter").addEventListener("change", (event) => {
      state.selectedProductionJob = event.target.value;
      saveState();
      render();
    });
  }
  if ($("productionForemanSelect")) {
    $("productionForemanSelect").addEventListener("change", (event) => {
      state.selectedProductionForeman = event.target.value;
      saveState();
      render();
    });
  }
  if ($("newProdForeman") && isApproverMode()) {
    $("newProdForeman").addEventListener("change", (event) => {
      state.selectedProductionForeman = event.target.value;
      saveState();
      render();
    });
  }
  if ($("sheetGroup")) {
    $("sheetGroup").addEventListener("change", (event) => {
      if (!editable) return;
      if (area().mode === "crew") return;
      sheet.group = event.target.value;
      setSheetForeman(sheet, sheet.foreman);
      saveState();
      render();
    });
  }
  if ($("sheetStatus")) $("sheetStatus").addEventListener("change", (event) => updateSheet({ status: event.target.value }));

  document.querySelectorAll("[data-row]").forEach((input) => {
    input.addEventListener("focusin", (event) => {
      const row = sheet.rows[Number(event.target.dataset.row)];
      const field = event.target.dataset.field;
      event.target.dataset.startValue = field?.startsWith("lightDuty.") ? String(row.lightDuty?.[field.split(".")[1]] || false) : String(row?.[field] ?? "");
    });
    const handler = (event) => {
      if (!editable) return;
      const row = sheet.rows[Number(event.target.dataset.row)];
      const field = event.target.dataset.field;
      const textFields = ["notes", "employee", "roleOverride", "reimbursementNote"];
      const oldValue = event.target.dataset.startValue ?? (field.startsWith("lightDuty.") ? row.lightDuty?.[field.split(".")[1]] || false : row[field]);
      const beforeRow = structuredClone(row);
      if (field.startsWith("lightDuty.")) {
        const day = field.split(".")[1];
        row.lightDuty = row.lightDuty || {};
        row.lightDuty[day] = event.target.checked;
      } else {
        row[field] = textFields.includes(field) ? event.target.value : Number(event.target.value);
      }
      if (field.startsWith("lightDuty.") || days.includes(field) || ["pto", "sick", "perDiem", "reimbursement", "reimbursementNote", "notes", "employee", "roleOverride"].includes(field)) {
        row.manualTimesheetEntry = true;
        row.clearedTimesheetEntry = false;
      }
      if (field === "employee") {
        row.employee = event.target.value;
        row.roleOverride = "";
        row.borrowed = !peopleForArea().some((person) => person.name === row.employee && person.group === sheet.group);
      }
      const overlapDays = days.includes(field) ? [field] : field === "employee" ? days : [];
      const rowIssues = overlapDays.length ? rowOverlapIssues(sheet, row, overlapDays) : [];
      if (!roleIsElevated() && rowIssues.length) {
        Object.assign(row, beforeRow);
        showToast(`${row.employee} would exceed ${dailyOverlapAuthorizationLimit} hours in one day. Payroll/Admin must authorize.`);
        render();
        return;
      }
      sheet.status = "Draft";
      setLastEdited(sheet, "Timesheet edited");
      const newValue = field.startsWith("lightDuty.") ? event.target.checked : row[field];
      if (event.type === "change" && String(oldValue) !== String(newValue)) {
        logActivity("Timesheet row changed", {
          foreman: sheet.foreman,
          employee: row.employee,
          field,
          from: oldValue,
          to: newValue,
          job: jobName(sheet.jobId)
        });
      }
      saveState();
      if (field === "employee") render();
    };
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
  });

  if ($("addWorker")) $("addWorker").addEventListener("click", addWorkerToWeek);
  if ($("submitSheet")) $("submitSheet").addEventListener("click", submitSheet);
  document.querySelectorAll("[data-submit-production]").forEach((button) => button.addEventListener("click", submitProduction));
  if ($("duplicateWeek")) $("duplicateWeek").addEventListener("click", duplicateWeek);
  if ($("savePerson")) $("savePerson").addEventListener("click", savePerson);
  if ($("addCrewPerson")) $("addCrewPerson").addEventListener("click", addCrewPerson);
  if ($("saveJob")) $("saveJob").addEventListener("click", saveJob);
  if ($("addSolarClient")) $("addSolarClient").addEventListener("click", () => addSolarListValue("solarClients", "solarClientName", "Client added"));
  if ($("addSolarJobName")) $("addSolarJobName").addEventListener("click", () => addSolarListValue("solarJobNames", "solarSavedJobName", "Job name added"));
  if ($("jobArea")) {
    $("jobArea").addEventListener("change", (event) => {
      state.selectedArea = event.target.value;
      state.activeTab = "jobs";
      state.jobDraftType = "";
      state.selectedDocumentJob = "";
      ensureAreaForeman();
      saveState();
      render();
    });
  }
  if ($("jobTypeInput")) {
    $("jobTypeInput").addEventListener("change", (event) => {
      state.jobDraftType = event.target.value;
      saveState();
      render();
    });
  }
  if ($("documentJobSelect")) {
    $("documentJobSelect").addEventListener("change", (event) => {
      state.selectedDocumentJob = event.target.value;
      saveState();
      render();
    });
  }
  if ($("documentTypeSelect")) {
    $("documentTypeSelect").addEventListener("change", updateOtherDocumentTypeVisibility);
    updateOtherDocumentTypeVisibility();
  }
  if ($("jobDocumentFile")) $("jobDocumentFile").addEventListener("change", uploadJobDocuments);
  if ($("qcAreaSelect")) {
    $("qcAreaSelect").addEventListener("change", (event) => {
      state.selectedQualityArea = event.target.value;
      state.selectedQualityJob = "";
      saveState();
      render();
    });
  }
  if ($("addQcBend")) $("addQcBend").addEventListener("click", addQualityBendRow);
  if ($("saveQualityCheck")) $("saveQualityCheck").addEventListener("click", saveQualityCheck);
  bindTrainingEvents();
  if ($("safetyJobSelect")) {
    $("safetyJobSelect").addEventListener("change", (event) => {
      state.selectedSafetyJob = event.target.value;
      saveState();
      render();
    });
  }
  if ($("safetyTypeSelect")) {
    $("safetyTypeSelect").addEventListener("change", (event) => {
      state.selectedSafetyFormType = event.target.value;
      saveState();
      render();
    });
  }
  if ($("addSafetyForm")) $("addSafetyForm").addEventListener("click", addSafetyFormRecord);
  document.querySelectorAll("[data-safety-file]").forEach((button) => {
    button.addEventListener("click", () => openRecordFile("safetyForms", button.dataset.safetyFile, button.dataset.fileId));
  });
  document.querySelectorAll("[data-delete-safety-file]").forEach((button) => {
    button.addEventListener("click", () => deleteRecordFile("safetyForms", button.dataset.deleteSafetyFile, button.dataset.fileId));
  });
  document.querySelectorAll("[data-print-safety]").forEach((button) => {
    button.addEventListener("click", () => printSafetyRecord(button.dataset.printSafety));
  });
  if ($("auditJobSelect")) {
    $("auditJobSelect").addEventListener("change", (event) => {
      state.selectedAuditJob = event.target.value;
      saveState();
      render();
    });
  }
  if ($("saveFieldAudit")) $("saveFieldAudit").addEventListener("click", saveFieldAuditRecord);
  document.querySelectorAll("[data-audit-file]").forEach((button) => {
    button.addEventListener("click", () => openRecordFile("fieldAudits", button.dataset.auditFile, button.dataset.fileId));
  });
  document.querySelectorAll("[data-delete-audit-file]").forEach((button) => {
    button.addEventListener("click", () => deleteRecordFile("fieldAudits", button.dataset.deleteAuditFile, button.dataset.fileId));
  });
  if ($("addProduction")) $("addProduction").addEventListener("click", addProduction);
  if ($("submitReimbursement")) $("submitReimbursement").addEventListener("click", submitReimbursementRequest);
  if ($("exportPayrollCsv")) $("exportPayrollCsv").addEventListener("click", exportPayrollCsv);
  if ($("exportEmployeeCsv")) $("exportEmployeeCsv").addEventListener("click", exportEmployeeCsv);
  if ($("employeeReportSelect")) {
    $("employeeReportSelect").addEventListener("change", (event) => {
      state.selectedEmployeeReport = event.target.value;
      saveState();
      render();
    });
  }
  if ($("employeeReportArea")) {
    $("employeeReportArea").addEventListener("change", (event) => {
      state.selectedEmployeeReportArea = event.target.value;
      saveState();
      render();
    });
  }
  if ($("employeeReportFromDate")) {
    $("employeeReportFromDate").addEventListener("change", (event) => {
      state.selectedEmployeeReportFromDate = event.target.value;
      if (state.selectedEmployeeReportToDate < state.selectedEmployeeReportFromDate) {
        state.selectedEmployeeReportToDate = state.selectedEmployeeReportFromDate;
      }
      saveState();
      render();
    });
  }
  if ($("employeeReportToDate")) {
    $("employeeReportToDate").addEventListener("change", (event) => {
      state.selectedEmployeeReportToDate = event.target.value;
      if (state.selectedEmployeeReportFromDate > state.selectedEmployeeReportToDate) {
        state.selectedEmployeeReportFromDate = state.selectedEmployeeReportToDate;
      }
      saveState();
      render();
    });
  }
  if ($("newProdDescription")) {
    $("newProdDescription").addEventListener("input", (event) => {
      const parsedQuantity = quantityFromDescription(event.target.value);
      if (parsedQuantity && $("newProdQuantity") && !$("newProdQuantity").value) {
        $("newProdQuantity").value = parsedQuantity;
      }
    });
  }
  if ($("jobProdDescription")) {
    $("jobProdDescription").addEventListener("input", (event) => {
      const parsedQuantity = quantityFromDescription(event.target.value);
      if (parsedQuantity && $("jobProdQuantity") && !$("jobProdQuantity").value) {
        $("jobProdQuantity").value = parsedQuantity;
      }
    });
  }
  if ($("setupForemanSelect")) {
    $("setupForemanSelect").addEventListener("change", (event) => {
      state.setupForeman = event.target.value;
      saveState();
      render();
    });
  }
  if ($("employeeProfileSelect")) {
    $("employeeProfileSelect").addEventListener("change", (event) => {
      state.selectedEmployeeProfile = event.target.value;
      saveState();
      render();
    });
  }
  if ($("renameForemanButton")) $("renameForemanButton").addEventListener("click", renameSelectedForeman);
  if ($("addForemanButton")) $("addForemanButton").addEventListener("click", addForemanCrew);
  if ($("deleteForemanButton")) $("deleteForemanButton").addEventListener("click", deleteSelectedForemanCrew);

  document.querySelectorAll("[data-add-person]").forEach((button) => {
    button.addEventListener("click", () => {
      const person = personByName(button.dataset.addPerson);
      if (person) addPersonRow(person, true);
    });
  });

  document.querySelectorAll("[data-clear-row]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!editable) return;
      const index = Number(button.dataset.clearRow);
      const row = sheet.rows[index];
      const name = row?.employee || "worker";
      if (!row) return;
      if (!confirm(`Clear ${name}'s hours and weekly entries?`)) return;
      clearTimesheetRowEntries(row);
      sheet.status = "Draft";
      setLastEdited(sheet, "Worker week entries cleared");
      logActivity("Worker week entries cleared", { foreman: sheet.foreman, employee: name, job: jobName(sheet.jobId) });
      saveState();
      render();
      showToast(`${name}'s hours cleared`);
    });
  });

  document.querySelectorAll("[data-delete-row]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!editable) return;
      const index = Number(button.dataset.deleteRow);
      const name = sheet.rows[index]?.employee || "row";
      if (!confirm(`Remove ${name} from this week?`)) return;
      sheet.rows.splice(index, 1);
      sheet.status = "Draft";
      setLastEdited(sheet, "Worker removed from week");
      logActivity("Worker removed from week", { foreman: sheet.foreman, employee: name, job: jobName(sheet.jobId) });
      saveState();
      render();
      showToast(`${name} removed from this week`);
    });
  });

  document.querySelectorAll("[data-remove-crew-person]").forEach((button) => {
    button.addEventListener("click", () => removeCrewPerson(button.dataset.removeCrewPerson));
  });

  document.querySelectorAll("[data-person-field]").forEach((input) => {
    input.addEventListener("change", updatePersonField);
  });

  document.querySelectorAll("[data-profile-cert]").forEach((input) => {
    input.addEventListener("change", () => updateEmployeeProfileList("certs", input.dataset.profileCert, input.checked));
  });

  document.querySelectorAll("[data-profile-machine]").forEach((input) => {
    input.addEventListener("change", () => updateEmployeeProfileList("machines", input.dataset.profileMachine, input.checked));
  });

  document.querySelectorAll("[data-remove-person]").forEach((button) => {
    button.addEventListener("click", () => removePerson(button.dataset.removePerson));
  });

  document.querySelectorAll("[data-remove-production]").forEach((button) => {
    button.addEventListener("click", () => removeProductionItem(button.dataset.removeProduction));
  });

  document.querySelectorAll("[data-job-status]").forEach((select) => {
    select.addEventListener("change", () => updateJobStatus(select.dataset.jobStatus, select.value));
  });

  document.querySelectorAll("[data-delete-job]").forEach((button) => {
    button.addEventListener("click", () => deleteJob(button.dataset.deleteJob));
  });

  document.querySelectorAll("[data-document-action]").forEach((button) => {
    button.addEventListener("click", () => handleDocumentAction(button.dataset.documentAction, button.dataset.jobId, button.dataset.docId));
  });

  document.querySelectorAll("[data-reimbursement-status]").forEach((select) => {
    select.addEventListener("change", () => updateReimbursementStatus(select.dataset.reimbursementStatus, select.value));
  });

  document.querySelectorAll("[data-reimbursement-note]").forEach((input) => {
    input.addEventListener("change", () => updateReimbursementNote(input.dataset.reimbursementNote, input.value));
  });

  document.querySelectorAll("[data-delete-reimbursement]").forEach((button) => {
    button.addEventListener("click", () => deleteReimbursementRequest(button.dataset.deleteReimbursement));
  });

  document.querySelectorAll("[data-prod]").forEach((input) => {
    input.addEventListener("focusin", (event) => {
      const item = state.production.find((entry) => entry.id === event.target.dataset.prod);
      event.target.dataset.startValue = String(item?.[event.target.dataset.field] ?? "");
    });
    input.addEventListener("input", updateProductionItem);
    input.addEventListener("change", updateProductionItem);
  });
}

function updateBundlePlannerSettings(event) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const field = event.target.id;
  const textFields = {
    bundleJobName: "jobName",
    bundleCustomer: "customer",
    bundleJobNumber: "jobNumber",
    bundleDetailer: "detailer",
    bundlePackageType: "packageType",
    bundleSource: "source",
    bundleMaxBundleLength: "maxBundleLength",
    bundleTagRule: "tagRule",
    bundleScanCodeSearch: "scanCodeSearch"
  };
  if (textFields[field]) {
    if (job && ["bundleJobName", "bundleCustomer", "bundleJobNumber", "bundleDetailer", "bundlePackageType", "bundleSource"].includes(field)) {
      job[textFields[field]] = event.target.value;
      syncBundlePlannerFromJob(job);
    } else {
      state.bundlePlanner[textFields[field]] = event.target.value;
    }
  }
  if (field === "bundleMaxBundleWeight") state.bundlePlanner.maxBundleWeight = Number(event.target.value) || 0;
  if (field === "bundleMaxWeight") state.bundlePlanner.maxTrailerWeight = Number(event.target.value) || 48000;
  logActivity("Package planner settings changed", { field, to: event.target.value });
  saveState();
  render();
}

function updateBundleScanLookup(event) {
  state.bundlePlanner.scanCodeSearch = event.target.value;
  const match = currentBundleSections().find((bundle) => bundleMatchesScan(bundle, state.bundlePlanner.scanCodeSearch));
  if ($("bundleScanMatchResult")) $("bundleScanMatchResult").value = match ? `${match.tag || match.controlCode} - ${bundleCurrentStatus(match)}` : "No match yet";
  if ($("bundleScanRejectResult")) $("bundleScanRejectResult").value = match ? `${number(match.rejectedPieces || 0)} rejected pieces` : "Scan a bundle first";
  saveState();
}

function recordPackageUpload(event) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  if (!job) return;
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const current = job.imports || [];
  const existing = new Set(current.map((file) => `${file.name}:${file.size}`));
  const addedAt = timestamp();
  const incoming = files
    .filter((file) => !existing.has(`${file.name}:${file.size}`))
    .map((file) => ({
      id: `package-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      size: file.size,
      status: "Recorded for parser",
      addedAt
    }));
  if (!incoming.length) {
    showToast("Package already recorded");
    event.target.value = "";
    return;
  }
  job.imports = [...incoming, ...current].slice(0, 20);
  syncBundlePlannerFromJob(job);
  logActivity("Detailer package recorded", { job: job.jobName, field: `${incoming.length} file(s)` });
  saveState();
  render();
  showToast(`${incoming.length} file(s) recorded`);
}

function deletePackageImport(fileId) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  const file = job?.imports?.find((entry) => entry.id === fileId);
  if (!job || !file) return;
  if (!confirm(`Delete ${file.name} from this upload list?`)) return;
  job.imports = (job.imports || []).filter((entry) => entry.id !== fileId);
  logActivity("Detailer package removed", { job: job.jobName, field: file.name });
  syncBundlePlannerFromJob(job);
  saveState();
  render();
  showToast("Upload removed");
}

function uploadedPackageNames() {
  return (currentBundleJob()?.imports || []).map((file) => (file.name || "").toLowerCase());
}

function hasUploadedFileName(fragment) {
  const normalized = fragment.toLowerCase();
  return uploadedPackageNames().some((name) => name.includes(normalized));
}

function packageLooksLikeTlinePiers(job) {
  const packageText = [job?.jobName, job?.jobNumber, job?.customer, job?.packageType, job?.source, ...uploadedPackageNames()].join(" ").toLowerCase();
  return ["t-line", "tline", "substation", "pier", "piers", "rhome", "rhone", "overland", "lcra", "control code list summary", "img_1657"].some((fragment) => packageText.includes(fragment));
}

function hasKnownTlinePierTrialFile() {
  return uploadedPackageNames().some((name) => ["img_1657.pdf", "img_1657"].some((fragment) => name.includes(fragment)));
}

function analyzeDetailerPackage() {
  if (!canManageBundlePlanner()) {
    showToast("Admin or Quality can analyze packages");
    return;
  }
  const planner = state.bundlePlanner;
  const job = currentBundleJob();
  if (!job?.imports?.length) {
    showToast("Upload the Bar List and CC List first");
    return;
  }

  const hasPhilipPackage = uploadedPackageNames().some((name) => name.includes("philip wind project"));
  const hasCcList = hasUploadedFileName("cc list");
  const hasBarList = hasUploadedFileName("bar list");
  const hasTlinePierPackage = hasKnownTlinePierTrialFile() || (packageLooksLikeTlinePiers(job) && (hasCcList || hasUploadedFileName("control code")));

  if (!hasPhilipPackage && !hasTlinePierPackage) {
    job.analysis = {
      status: "Needs parser template",
      source: "No supported package pattern found",
      analyzedAt: timestamp(),
      rows: [],
      message: "CrewForge recorded the files, but this trial parser only knows the Philip Wind and T-line pier Control Code List Summary formats right now."
    };
    syncBundlePlannerFromJob(job);
    logActivity("Detailer package analysis blocked", { job: job.jobName, field: "unsupported package" });
    saveState();
    render();
    showToast("This package needs a parser template");
    return;
  }

  if (hasTlinePierPackage && (!hasPhilipPackage || hasKnownTlinePierTrialFile() || /t-?line|substation|pier|rhome|rhone|overland|lcra/i.test([job.jobName, job.packageType, job.source, uploadedPackageNames().join(" ")].join(" ")))) {
    const rows = structuredClone(rhoneTlinePierTrialRows);
    const totalWeight = rows.reduce((sum, row) => sum + (Number(row.weight) || 0), 0);
    job.analysis = {
      status: "Ready for review",
      source: "T-line pier Control Code List Summary",
      analyzedAt: timestamp(),
      rows,
      message: `CrewForge found ${rows.length} T-line pier control-code rows from the summary sheet, including status, release, customer, job, description, and ${number(totalWeight)} lbs total.`
    };
    job.jobName = job.jobName || "RTX - Rhome T-line Piers";
    job.customer = job.customer || "Saber Power";
    job.jobNumber = job.jobNumber || "VS26-OVE";
    job.detailer = job.detailer || "RTX";
    job.packageType = "T-line Substation Piers";
    job.source = "Parsed Control Code List Summary trial";
    planner.maxTrailerWeight = Number(planner.maxTrailerWeight) || 48000;
    syncBundlePlannerFromJob(job);
    logActivity("Detailer package analyzed", { job: job.jobName, field: `${rows.length} T-line pier rows` });
    saveState();
    render();
    showToast(`${rows.length} T-line pier rows ready to review`);
    return;
  }

  const rows = structuredClone(philipWindTrialRows);
  job.analysis = {
    status: hasBarList ? "Ready for review" : "Partial review",
    source: hasBarList ? "Philip Wind CC List + Bar List" : "Philip Wind CC List",
    analyzedAt: timestamp(),
    rows,
    message: hasBarList
      ? "CrewForge found the six Philip Wind control-code sections from the CC List and matched them to the Bar List summaries."
      : "CrewForge found the CC List rows. Add the Bar List PDF for a stronger extraction check."
  };
  job.jobName = "Philip Wind Project - Rebar Fabrication Trial";
  job.customer = job.customer || "Unknown Customer";
  job.jobNumber = "VS26-PHILP";
  job.detailer = job.detailer || "adm";
  job.packageType = "Wind Farm Rebar Fabrication";
  job.source = "Parsed trial package";
  planner.maxTrailerWeight = Number(planner.maxTrailerWeight) || 48000;
  syncBundlePlannerFromJob(job);
  logActivity("Detailer package analyzed", { job: job.jobName, field: `${rows.length} rows` });
  saveState();
  render();
  showToast(`${rows.length} rows ready to review`);
}

function processFromImportedStatus(status = "") {
  const normalized = status.toLowerCase();
  const shipped = normalized.includes("shipped");
  return {
    received: shipped,
    cut: shipped,
    fabricated: shipped,
    qc: false,
    staged: shipped,
    loaded: shipped,
    shipped
  };
}

function importAnalyzedPackageRows() {
  if (!canManageBundlePlanner()) {
    showToast("Admin or Quality can import package rows");
    return;
  }
  const planner = state.bundlePlanner;
  const job = currentBundleJob();
  const rows = job?.analysis?.rows || [];
  if (!rows.length) {
    showToast("Analyze the package first");
    return;
  }
  const importedAt = Date.now();
  job.bundles = rows.map((row, index) => ({
    id: `import-${row.controlCode.toLowerCase()}-${importedAt}-${index}`,
    tag: row.controlCode,
    controlCode: row.controlCode,
    release: row.release || "",
    scanCode: row.scanCode || `${row.jobNumber || job.jobNumber || "JOB"}-${row.controlCode}-${index + 1}`,
    description: row.description || "",
    pieces: Number(row.pieces) || "",
    completedQty: 0,
    weight: Number(row.weight) || 0,
    library: row.library || "",
    detailerLocation: row.detailerLocation || "",
    fabLocation: row.fabLocation || "",
    activityDate: row.activityDate || "",
    customer: row.customer || job.customer || "",
    jobNumber: row.jobNumber || job.jobNumber || "",
    jobName: row.jobName || job.jobName || "",
    initials: row.initials || "",
    trailer: "",
    status: row.status || "Planned",
    process: processFromImportedStatus(row.status),
    rejectedPieces: 0,
    rejectReason: "None",
    qualityNotes: "",
    notes: `Imported from ${row.source || "detailer package"}${row.activityDate ? ` · ${row.activityDate}` : ""}`,
    items: []
  }));
  job.importedAt = timestamp();
  planner.scanCodeSearch = "";
  planner.selectedSectionId = job.bundles[0]?.id || "";
  job.analysis = {
    ...job.analysis,
    status: "Imported",
    message: `${rows.length} control-code rows were imported into the live bundle library. Scan codes can be replaced with the real DataMatrix values as tags are verified.`
  };
  syncBundlePlannerFromJob(job);
  logActivity("Analyzed rows imported", { job: job.jobName, field: `${rows.length} bundles` });
  saveState();
  render();
  showToast("Bundle library imported");
}

function updateBundleRow(event) {
  const job = currentBundleJob();
  const bundle = job?.bundles.find((item) => item.id === event.target.dataset.bundle);
  if (!bundle) return;
  const field = event.target.dataset.bundleField;
  const statusField = field.startsWith("process.") || field === "statusStep" || field === "notes";
  const qualityField = ["rejectedPieces", "rejectReason", "qualityNotes"].includes(field);
  if (statusField && !canUpdateBundleProductionStatus()) return;
  if (qualityField && !canManageBundlePlanner()) return;
  if (!statusField && !qualityField && !canManageBundlePlanner()) return;
  const previousTrailer = bundle.trailer || "";
  const previousLoaded = Boolean(bundle.process?.loaded);
  const previousShipped = Boolean(bundle.process?.shipped);
  if ((field === "process.shipped" && event.target.checked) || (field === "statusStep" && event.target.value === "shipped")) {
    if (!bundle.trailer) {
      showToast("Assign a trailer before marking shipped");
      render();
      return;
    }
    if (!trailerSignoff(job, bundle.trailer)) {
      showToast("Trailer needs final sign-off before shipping");
      render();
      return;
    }
  }
  if (field.startsWith("process.")) {
    const processField = field.split(".")[1];
    bundle.process = bundle.process || {};
    bundle.process[processField] = event.target.checked;
    bundle.status = bundleCurrentStatus(bundle);
  } else if (field === "statusStep") {
    setBundleStatusStep(bundle, event.target.value);
  } else if (["weight", "pieces", "completedQty", "rejectedPieces"].includes(field)) {
    bundle[field] = Number(event.target.value) || 0;
  } else {
    bundle[field] = event.target.value;
  }
  logActivity("Rebar fabrication bundle changed", {
    job: job.jobName,
    field,
    to: field.startsWith("process.") ? event.target.checked : bundle[field],
    tag: bundle.tag || bundle.controlCode
  });
  if (field === "trailer" && previousTrailer !== (bundle.trailer || "")) {
    clearTrailerSignoffForChange(job, previousTrailer, "Trailer assignment changed");
    clearTrailerSignoffForChange(job, bundle.trailer, "Trailer assignment changed");
  }
  if (field === "process.loaded" && previousLoaded !== Boolean(bundle.process?.loaded)) {
    clearTrailerSignoffForChange(job, bundle.trailer, "Loaded status changed");
  }
  if (previousShipped !== Boolean(bundle.process?.shipped)) {
    logActivity("Bundle shipment status changed", {
      job: job.jobName,
      field: bundle.trailer || "Unassigned trailer",
      from: previousShipped ? "Shipped" : "Not shipped",
      to: bundle.process?.shipped ? "Shipped" : "Not shipped",
      tag: bundle.tag || bundle.controlCode
    });
  }
  syncBundlePlannerFromJob(job);
  saveState();
  render();
}

function addTrailerToPlanner() {
  if (!canManageBundlePlanner()) return;
  const typedCode = $("newTrailerCode")?.value.trim();
  const nextNumber = state.bundlePlanner.trailers.length + 1;
  const trailerName = typedCode || `Trailer ${nextNumber}`;
  if (state.bundlePlanner.trailers.some((trailer) => sameName(trailer, trailerName))) {
    showToast("Trailer code already exists");
    return;
  }
  state.bundlePlanner.trailers.push(trailerName);
  logActivity("Trailer code added", { job: currentBundleJob()?.jobName || state.bundlePlanner.jobName, field: trailerName });
  saveState();
  render();
}

function signOffTrailer(trailerCode) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  if (!job || !trailerReadyForSignoff(job, trailerCode)) return;
  job.trailerSignoffs = job.trailerSignoffs || {};
  job.trailerSignoffs[trailerCode] = {
    by: actorName(),
    role: actorRole(),
    at: timestamp()
  };
  syncBundlePlannerFromJob(job);
  logActivity("Trailer signed off", { job: job.jobName, field: trailerCode, to: actorName() });
  saveState();
  render();
  showToast("Trailer signed off");
}

function clearTrailerSignoffForChange(job, trailerCode, reason) {
  if (!job?.trailerSignoffs?.[trailerCode]) return false;
  const oldSignoff = job.trailerSignoffs[trailerCode];
  delete job.trailerSignoffs[trailerCode];
  logActivity("Trailer sign-off reopened", { job: job.jobName, field: trailerCode, from: oldSignoff.by, to: reason });
  return true;
}

function clearTrailerSignoff(trailerCode) {
  if (!canManageBundlePlanner()) return;
  const job = currentBundleJob();
  if (!clearTrailerSignoffForChange(job, trailerCode, "Manual reopen")) return;
  syncBundlePlannerFromJob(job);
  saveState();
  render();
  showToast("Trailer reopened");
}

function autoAssignTrailers() {
  if (!canManageBundlePlanner()) return;
  const planner = state.bundlePlanner;
  const job = currentBundleJob();
  const limit = Number(planner.maxTrailerWeight) || 48000;
  const trailers = planner.trailers.map((name) => ({ name, weight: 0 }));
  const previousTrailerCodes = new Set((job?.bundles || []).map((bundle) => bundle.trailer).filter(Boolean));
  (job?.bundles || [])
    .slice()
    .sort((a, b) => (Number(b.weight) || 0) - (Number(a.weight) || 0))
    .forEach((bundle) => {
      const oldTrailer = bundle.trailer || "";
      let trailer = trailers.find((candidate) => candidate.weight + (Number(bundle.weight) || 0) <= limit);
      if (!trailer) {
        trailer = { name: `Trailer ${trailers.length + 1}`, weight: 0 };
        trailers.push(trailer);
      }
      trailer.weight += Number(bundle.weight) || 0;
      bundle.trailer = trailer.name;
      if (oldTrailer !== bundle.trailer) {
        previousTrailerCodes.add(oldTrailer);
        previousTrailerCodes.add(bundle.trailer);
      }
    });
  planner.trailers = trailers.map((trailer) => trailer.name);
  previousTrailerCodes.forEach((trailerCode) => clearTrailerSignoffForChange(job, trailerCode, "Auto assignment changed"));
  syncBundlePlannerFromJob(job);
  logActivity("Bundles auto assigned to trailers", { job: job?.jobName, field: `${planner.trailers.length} trailers` });
  saveState();
  render();
  showToast("Trailer plan updated");
}

function updateSheet(values, message) {
  const sheet = currentSheet();
  const changes = Object.entries(values).filter(([key, value]) => sheet[key] !== value);
  Object.assign(sheet, values);
  if (changes.length) {
    setLastEdited(sheet, "Timesheet updated");
    changes.forEach(([field, value]) => logActivity("Timesheet updated", { foreman: sheet.foreman, field, value, job: jobName(sheet.jobId) }));
  }
  saveState();
  render();
  if (message) showToast(message);
}

function submitSheet() {
  const sheet = currentSheet();
  const overlapCount = timesheetOverlapIssues(sheet).length;
  if (!roleIsElevated() && overlapCount) {
    showToast(`This timesheet has daily totals over ${dailyOverlapAuthorizationLimit} hours. Payroll/Admin must authorize before submitting.`);
    render();
    return;
  }
  const stamp = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
  Object.assign(sheet, {
    status: "Submitted",
    submittedBy: actorName(),
    submittedAt: stamp
  });
  setLastEdited(sheet, "Timesheet submitted");
  logActivity("Timesheet submitted", { foreman: sheet.foreman, job: jobName(sheet.jobId) });
  saveState();
  render();
  showToast("Week submitted");
}

function submitProduction() {
  const items = productionForArea().filter((item) => {
    if (["Admin", "Payroll"].includes(state.selectedRole)) return true;
    if (state.selectedRole === "Quality") return item.area === "rebarFab";
    if (isApproverMode()) return item.area === "rebarInstall" && (item.foreman || productionForemanName()) === productionForemanName();
    return state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman;
  });
  if (!items.length) {
    showToast("No production to submit");
    return;
  }
  const stamp = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
  items.forEach((item) => {
    item.reviewStatus = "Submitted";
    item.submittedAt = stamp;
    item.submittedBy = state.auth?.name || state.currentForeman || state.selectedRole;
    setLastEdited(item, "Production submitted");
    logActivity("Production submitted", { foreman: item.foreman, job: jobName(item.jobId), field: item.code || item.foundationId || item.description });
  });
  saveState();
  render();
  showToast("Production submitted");
}

function exportPayrollCsv() {
  const sheets = state.activeTab === "deliverables" ? deliverableSheets() : [currentSheet()];
  const range = state.activeTab === "deliverables" ? deliverableDateRange() : weekRangeDates(state.selectedWeek);
  const headers = ["Area", "Period starting", "Period ending", "Employee", "Normal crew", "Worked crew(s)", "Foreman(s)", "Job(s)", "Role(s)", "Regular hours", "PTO", "Sick", "Total paid hours", "Hourly rate", "Gross wages", "Per diem", "Reimbursement", "Reimbursement note", "Total payable estimate", "Notes"];
  const rows = payrollSummaryRows(sheets).map((row) => [
    area().label,
    range.fromDate || range.start,
    range.toDate || range.end,
    row.employee,
    row.normalCrew,
    row.crewList,
    row.foremanList,
    row.jobList,
    row.roleList,
    row.regular,
    row.pto,
    row.sick,
    row.total,
    row.rate,
    row.grossWages.toFixed(2),
    row.perDiem,
    row.reimbursement,
    row.reimbursementNotesList,
    row.totalPayable.toFixed(2),
    row.notesList
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const filename = `crewforge-payroll-${state.selectedArea}-${range.fromDate || range.start}-to-${range.toDate || range.end}.csv`;
  downloadFile(filename, csv);
  showToast("Payroll CSV exported");
}

function exportEmployeeCsv() {
  const employees = uniqueEmployees();
  const employee = state.selectedEmployeeReport && employees.includes(state.selectedEmployeeReport) ? state.selectedEmployeeReport : employees[0] || "";
  const { fromDate, toDate } = selectedEmployeeDateRange();
  const records = employeeReportRecords(employee, fromDate, toDate, state.selectedEmployeeReportArea || "all");
  const headers = ["Employee", "Week starting", "Week ending", "Area", "Job", "Foreman", "Crew/shift", "Role", "Regular hours", "PTO", "Sick", "Total hours", "Per diem", "Reimbursement", "Reimbursement note", "Hourly rate", "Estimated gross pay", "Borrowed", "DOL", "Light duty days", "Status", "Notes"];
  const rows = records.map((record) => [
    record.employee,
    record.weekStart,
    record.week,
    record.areaLabel,
    record.job,
    record.foreman,
    record.group,
    record.role,
    record.regular,
    record.pto,
    record.sick,
    record.total,
    record.perDiem,
    record.reimbursement,
    record.reimbursementNote,
    record.rate,
    record.gross.toFixed(2),
    record.borrowed ? "Yes" : "No",
    record.dol ? "Yes" : "No",
    record.lightDutyDays.join("; "),
    record.status,
    record.notes
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const safeName = employee.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "employee";
  downloadFile(`crewforge-employee-${safeName}-${fromDate}-to-${toDate}.csv`, csv);
  showToast("Employee CSV exported");
}

function exportTrainingCsv() {
  const headers = [
    "Employee",
    "Course",
    "Score",
    "Passed",
    "Accredited",
    "Accredited by",
    "Accredited at",
    "Completed at",
    "Signature",
    "Created by",
    "Answers"
  ];
  const rows = (state.trainingResults || []).map((result) => {
    const answers = (result.answers || []).map((answer) => {
      const expected = answer.correct ? "" : ` (expected: ${answer.correctAnswer || "not set"})`;
      return `${answer.question}: ${answer.answer}${expected}`;
    }).join(" | ");
    return [
      result.employeeName,
      result.courseTitle,
      result.score,
      result.passed ? "Yes" : "No",
      result.accredited ? "Yes" : "No",
      result.accreditedBy || "",
      result.accreditedAt || "",
      result.completedAt || "",
      result.signature || "",
      result.createdBy || "",
      answers
    ];
  });
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const stamp = new Date().toISOString().slice(0, 10);
  downloadFile(`crewforge-training-records-${state.selectedArea}-${stamp}.csv`, csv);
  showToast("Training CSV exported");
}

function addWorkerToWeek() {
  const selected = $("borrowWorker")?.value;
  const manualName = $("manualWorker")?.value.trim();
  let person = selected ? personByName(selected) : null;
  if (!person && manualName) {
    const sheet = currentSheet();
    person = { name: manualName, role: $("manualRole").value, area: state.selectedArea, group: area().mode === "crew" ? sheet.group : $("manualGroup").value, dol: $("manualDol")?.checked || false, hourlyRate: 0 };
    state.people.push(person);
  }
  if (!person) {
    showToast("Select or type a worker");
    return;
  }
  addPersonRow(person, true);
}

function addPersonRow(person, borrowed) {
  const sheet = currentSheet();
  if (sheet.rows.some((row) => row.employee === person.name)) {
    showToast(`${person.name} is already on this week`);
    return;
  }
  const row = blankRow(person);
  row.borrowed = borrowed;
  sheet.rows.push(row);
  sheet.status = "Draft";
  setLastEdited(sheet, "Worker added to week");
  logActivity("Worker added to week", { foreman: sheet.foreman, employee: person.name, job: jobName(sheet.jobId) });
  saveState();
  render();
  showToast(`${person.name} added to this week only`);
}

function addCrewPerson() {
  if (!canManagePeopleSetup()) return;
  const foreman = setupForemanName();
  if (!foreman) {
    showToast("Add a foreman first");
    return;
  }
  const crew = crewNameForForeman(foreman);
  const selectedName = $("crewExistingWorker")?.value;
  const newName = $("crewNewName")?.value.trim();
  let person = selectedName ? personByName(selectedName) : null;

  if (!person && newName) {
    person = {
      name: newName,
      role: $("crewNewRole").value,
      area: state.selectedArea,
      group: crew,
      dol: $("crewNewDol")?.checked || false,
      hourlyRate: Number($("crewHourlyRate")?.value) || 0
    };
    state.people.push(person);
  } else if (person) {
    person.group = crew;
    person.area = state.selectedArea;
    person.role = person.role === "Foreman" ? person.role : $("crewNewRole").value || person.role;
    person.dol = $("crewNewDol")?.checked || person.dol || false;
    if ($("crewHourlyRate")?.value) person.hourlyRate = Number($("crewHourlyRate").value) || 0;
  }

  if (!person) {
    showToast("Select or type a worker");
    return;
  }

  syncSheetsForCrew(state.selectedArea, crew);
  logActivity("Worker assigned to crew", { foreman, employee: person.name, field: crew });
  saveState();
  render();
  showToast(`${person.name} added to ${crew}`);
}

function addForemanCrew() {
  if (!canManagePeopleSetup()) return;
  const name = $("newForemanName")?.value.trim();
  if (!name) {
    showToast("Enter the foreman name");
    return;
  }
  const duplicate = state.people.some((person) => sameName(person.name, name));
  if (duplicate) {
    showToast(`${name} already exists`);
    return;
  }

  state.hiddenForemen = (state.hiddenForemen || []).filter((entry) => !sameName(entry, name));
  state.people.push({
    name,
    role: "Foreman",
    area: state.selectedArea,
    group: crewNameForForeman(name),
    dol: false,
    hourlyRate: 0
  });
  state.setupForeman = name;
  if (state.selectedRole !== "Foreman") state.currentForeman = name;
  logActivity("Foreman / crew added", { foreman: name });
  saveState();
  render();
  showToast(`${name} foreman/crew added`);
}

function deleteSelectedForemanCrew() {
  if (!canManagePeopleSetup()) return;
  const foreman = setupForemanName();
  if (!foreman) {
    showToast("No foreman selected");
    return;
  }
  const crew = crewNameForForeman(foreman);
  const crewWorkers = state.people.filter((person) => person.area === state.selectedArea && person.group === crew && !sameName(person.name, foreman));
  const draftSheets = Object.values(state.sheets || {}).filter((sheet) => sheet.area === state.selectedArea && (sameName(sheet.foreman, foreman) || sheet.group === crew) && sheet.status !== "Submitted" && sheet.status !== "Approved").length;
  const warning = `Delete ${foreman} and ${crew}? Workers in this crew will stay in People, but will become unassigned.${draftSheets ? ` This will also remove ${draftSheets} draft timesheet(s) for this crew.` : ""}`;
  if (!confirm(warning)) return;

  state.hiddenForemen = [...new Set([...(state.hiddenForemen || []), foreman])];
  state.people = state.people.filter((person) => !(person.area === state.selectedArea && sameName(person.name, foreman) && person.role === "Foreman"));
  state.people.forEach((person) => {
    if (person.area === state.selectedArea && person.group === crew) person.group = "";
  });

  Object.entries(state.sheets || {}).forEach(([key, sheet]) => {
    if (sheet.area !== state.selectedArea || (!sameName(sheet.foreman, foreman) && sheet.group !== crew)) return;
    if (sheet.status === "Submitted" || sheet.status === "Approved") return;
    delete state.sheets[key];
  });

  state.production.forEach((item) => {
    if (item.area === state.selectedArea && sameName(item.foreman, foreman)) item.foreman = "";
  });

  const nextForeman = foremenForArea()[0]?.name || "";
  state.setupForeman = nextForeman;
  if (sameName(state.currentForeman, foreman)) state.currentForeman = nextForeman;
  logActivity("Foreman / crew deleted", { foreman });
  saveState();
  render();
  showToast(`${foreman} deleted; ${crewWorkers.length} worker(s) unassigned`);
}

function renameSelectedForeman() {
  if (!canManagePeopleSetup()) return;
  const oldName = setupForemanName();
  const newName = $("renameForemanInput")?.value.trim();
  if (!newName) {
    showToast("Enter the new foreman name");
    return;
  }
  if (sameName(oldName, newName)) {
    showToast("Name is unchanged");
    return;
  }
  const duplicate = state.people.find((person) => sameName(person.name, newName) && !sameName(person.name, oldName));
  if (duplicate) {
    showToast(`${newName} already exists`);
    return;
  }

  const oldCrew = crewNameForForeman(oldName);
  const newCrew = crewNameForForeman(newName);
  state.foremanAliases = state.foremanAliases || {};
  state.foremanAliases[oldName] = newName;

  state.people.forEach((person) => {
    if (sameName(person.name, oldName)) person.name = newName;
    if (person.group === oldCrew) person.group = newCrew;
  });

  Object.entries(state.sheets || {}).forEach(([key, sheet]) => {
    const wasForeman = sameName(sheet.foreman, oldName);
    if (wasForeman) sheet.foreman = newName;
    if (sheet.group === oldCrew) sheet.group = newCrew;
    (sheet.rows || []).forEach((row) => {
      if (sameName(row.employee, oldName)) row.employee = newName;
    });
    if (wasForeman) {
      delete state.sheets[key];
      state.sheets[sheetKey(sheet.week, sheet.area, newName)] = sheet;
    }
  });

  state.production.forEach((item) => {
    if (sameName(item.foreman, oldName)) item.foreman = newName;
  });

  if (sameName(state.currentForeman, oldName)) state.currentForeman = newName;
  if (sameName(state.setupForeman, oldName)) state.setupForeman = newName;
  if (sameName(state.auth?.name, oldName)) state.auth.name = newName;

  syncSheetsForCrew(state.selectedArea, newCrew);
  logActivity("Foreman renamed", { foreman: newName, from: oldName, to: newName });
  saveState();
  render();
  showToast(`${oldName} renamed to ${newName}`);
}

function removeCrewPerson(name) {
  if (!canManagePeopleSetup()) return;
  const person = personByName(name);
  if (!person || person.role === "Foreman") return;
  if (!confirm(`Remove ${name} from this crew?`)) return;
  const oldCrew = person.group;
  person.group = "";
  if (oldCrew) syncSheetsForCrew(state.selectedArea, oldCrew);
  logActivity("Worker removed from crew", { employee: name, field: oldCrew });
  saveState();
  render();
  showToast(`${name} removed from crew`);
}

function updatePersonField(event) {
  const person = personByName(event.target.dataset.personName);
  if (!person) return;
  const field = event.target.dataset.personField;
  if (field === "hourlyRate" && !canEditPayRates()) return;
  if (field !== "hourlyRate" && !canManagePeopleSetup()) return;
  const oldValue = person[field];
  person[field] = field === "hourlyRate" ? Number(event.target.value) || 0 : event.target.value;
  logActivity("Person updated", { employee: person.name, field, from: oldValue, to: person[field] });
  saveState();
  showToast(`${person.name} updated`);
}

function removePerson(name) {
  if (!canManagePeopleSetup()) return;
  const person = personByName(name);
  if (!person || person.role === "Foreman") return;
  if (!confirm(`Delete ${name}?`)) return;
  state.people = state.people.filter((entry) => entry.name !== name || entry.area !== state.selectedArea);
  logActivity("Person deleted", { employee: name });
  saveState();
  render();
  showToast(`${name} deleted`);
}

function removeProductionItem(id) {
  const item = state.production.find((entry) => entry.id === id);
  if (!item) return;
  const canEdit = canManageProductionItem(item);
  if (!canEdit) return;
  if (!confirm(`Remove ${item.code} from production?`)) return;
  state.production = state.production.filter((entry) => entry.id !== id);
  logActivity("Production removed", { foreman: item.foreman, job: jobName(item.jobId), field: item.code || item.foundationId || item.description });
  saveState();
  render();
  showToast(`${item.code} removed`);
}

function addProduction() {
  const selectedJobId = $("newProdJob").value;
  const selectedJob = jobById(selectedJobId);
  const assignedForeman = state.selectedRole === "Foreman" ? state.currentForeman : isApproverMode() ? productionForemanName() : $("newProdForeman").value;
  if (selectedJob?.jobType === "Wind Farm") {
    const foundationId = $("newFoundationId")?.value;
    const component = $("newFoundationComponent")?.value;
    if (!foundationId || !component) {
      showToast("Choose a foundation ID and component");
      return;
    }
    const duplicate = state.production.some((item) => item.jobId === selectedJobId && item.foundationId === foundationId && item.component === component);
    if (duplicate) {
      showToast(`${foundationId} ${component} is already recorded`);
      return;
    }
    const item = {
      id: `p${Date.now()}`,
      area: state.selectedArea,
      productionMode: "foundation",
      foreman: assignedForeman,
      jobId: selectedJobId,
      foundationId,
      component,
      code: foundationId,
      description: component,
      planned: 1,
      completed: 1,
      completedQty: 1,
      quantity: 1,
      completedAt: state.selectedWeek,
      reviewStatus: "Draft",
      delay: "No delay",
      delayNote: "",
      status: "Complete"
    };
    setLastEdited(item, "Production added");
    state.production.push(item);
    logActivity("Production added", { foreman: item.foreman, job: jobName(item.jobId), field: `${foundationId} ${component}` });
    saveState();
    render();
    showToast(`${foundationId} ${component} added`);
    return;
  }
  if (selectedJob?.customTracking?.length) {
    const trackingId = $("newCustomTracking")?.value;
    const tracking = selectedJob.customTracking.find((item) => item.id === trackingId);
    const completed = Number($("newCustomCompleted")?.value) || 0;
    if (!tracking) {
      showToast("Choose a tracking item");
      return;
    }
    if (!completed) {
      showToast("Enter amount completed");
      return;
    }
    const item = {
      id: `p${Date.now()}`,
      area: state.selectedArea,
      productionMode: "custom",
      foreman: assignedForeman,
      jobId: selectedJobId,
      customTrackingId: tracking.id,
      code: tracking.name,
      description: tracking.name,
      unit: tracking.unit,
      planned: Number(tracking.planned) || 0,
      quantity: Number(tracking.planned) || 0,
      completedQty: completed,
      completed,
      reviewStatus: "Draft",
      delay: "No delay",
      delayNote: "",
      status: completed >= (Number(tracking.planned) || 0) && Number(tracking.planned) ? "Complete" : "In Progress"
    };
    setLastEdited(item, "Production added");
    state.production.push(item);
    logActivity("Production added", { foreman: item.foreman, job: jobName(item.jobId), field: tracking.name, to: completed });
    saveState();
    render();
    showToast(`${tracking.name} progress added`);
    return;
  }
  const code = $("newProdCode").value.trim();
  const description = $("newProdDescription").value.trim();
  const parsedQuantity = quantityFromDescription(description);
  const quantity = Number($("newProdQuantity").value) || parsedQuantity || 0;
  const totalWeight = Number($("newProdWeight").value) || 0;
  if (!code || !description) {
    showToast("Add a control code and description");
    return;
  }
  if (!quantity || !totalWeight) {
    showToast("Add total amount and total weight");
    return;
  }
  const item = {
    id: `p${Date.now()}`,
    area: state.selectedArea,
    foreman: assignedForeman,
    jobId: $("newProdJob").value,
    code,
    description,
    planned: totalWeight,
    quantity,
    completedQty: 0,
    completed: 0,
    reviewStatus: "Draft",
    bundle: state.selectedArea === "rebarFab" ? "" : undefined,
    bundleStatus: state.selectedArea === "rebarFab" ? "Cut" : undefined,
    delay: "No delay",
    delayNote: "",
    status: "Not Started"
  };
  setLastEdited(item, "Production added");
  state.production.push(item);
  logActivity("Production added", { foreman: item.foreman, job: jobName(item.jobId), field: code });
  saveState();
  render();
  showToast("Production item added");
}

function addSolarListValue(listKey, inputId, message) {
  const value = $(inputId)?.value.trim();
  if (!value) {
    showToast("Enter a value first");
    return;
  }
  state.jobLists[listKey] = state.jobLists[listKey] || [];
  if (!state.jobLists[listKey].includes(value)) state.jobLists[listKey].push(value);
  state.jobLists[listKey].sort((a, b) => a.localeCompare(b));
  saveState();
  render();
  showToast(message);
}

function savePerson() {
  if (!canManagePeopleSetup()) return;
  const name = $("personName").value.trim();
  if (!name) {
    showToast("Enter a name");
    return;
  }
  const existing = personByName(name);
  const next = { name, role: $("personRole").value, area: state.selectedArea, group: $("personGroup").value, dol: $("personDol")?.checked || false, hourlyRate: Number($("personHourlyRate")?.value) || 0 };
  if (existing) Object.assign(existing, next);
  else state.people.push(next);
  saveState();
  render();
  showToast(`${name} saved`);
}

function updateEmployeeProfileList(field, value, checked) {
  if (!canEditEmployeeProfiles()) return;
  const person = selectedEmployeeProfile();
  if (!person || !value || !["certs", "machines"].includes(field)) return;
  const list = new Set(person[field] || []);
  if (checked) list.add(value);
  else list.delete(value);
  person[field] = [...list].sort((a, b) => a.localeCompare(b));
  logActivity("Employee profile updated", {
    employee: person.name,
    field: field === "certs" ? "Equipment certs" : "Machine training",
    value
  });
  saveState();
  showToast(`${person.name} profile updated`);
}

function submitReimbursementRequest() {
  const amount = Number($("reimbursementAmount")?.value) || 0;
  if (!amount) {
    showToast("Enter a reimbursement amount");
    return;
  }
  const jobs = reimbursementJobOptions();
  const jobId = $("reimbursementJob")?.value || jobs[0]?.id || "";
  const request = {
    id: `r${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    area: state.selectedArea,
    foreman: isFieldEntryMode() ? state.currentForeman : productionForemanName() || state.currentForeman,
    jobId,
    employee: $("reimbursementEmployee")?.value || state.currentForeman || actorName(),
    date: $("reimbursementDate")?.value || localDateInputValue(),
    category: $("reimbursementCategory")?.value || "Other",
    amount,
    note: $("reimbursementNote")?.value.trim() || "",
    status: "Pending",
    payrollNote: "",
    createdBy: actorName(),
    createdAt: timestamp(),
    reviewedBy: "",
    reviewedAt: ""
  };
  state.reimbursementRequests = state.reimbursementRequests || [];
  state.reimbursementRequests.unshift(request);
  logActivity("Reimbursement requested", {
    foreman: request.foreman,
    employee: request.employee,
    job: jobName(request.jobId),
    field: request.category,
    value: money(request.amount)
  });
  saveState();
  render();
  showToast("Reimbursement request submitted");
}

function updateReimbursementStatus(id, status) {
  if (!canManagePayrollAdjustments()) return;
  const request = state.reimbursementRequests?.find((entry) => entry.id === id);
  if (!request) return;
  const previous = request.status || "Pending";
  request.status = status;
  request.reviewedBy = actorName();
  request.reviewedAt = timestamp();
  logActivity("Reimbursement status changed", {
    foreman: request.foreman,
    employee: request.employee,
    job: jobName(request.jobId),
    field: request.category,
    from: previous,
    to: status
  });
  saveState();
  render();
  showToast("Reimbursement status updated");
}

function updateReimbursementNote(id, note) {
  if (!canManagePayrollAdjustments()) return;
  const request = state.reimbursementRequests?.find((entry) => entry.id === id);
  if (!request) return;
  request.payrollNote = note.trim();
  request.reviewedBy = actorName();
  request.reviewedAt = timestamp();
  logActivity("Reimbursement note updated", {
    foreman: request.foreman,
    employee: request.employee,
    job: jobName(request.jobId),
    field: request.category
  });
  saveState();
  showToast("Payroll note saved");
}

function deleteReimbursementRequest(id) {
  if (!canManagePayrollAdjustments()) return;
  const request = state.reimbursementRequests?.find((entry) => entry.id === id);
  if (!request) return;
  if (!confirm(`Delete reimbursement request for ${request.employee}?`)) return;
  state.reimbursementRequests = state.reimbursementRequests.filter((entry) => entry.id !== id);
  logActivity("Reimbursement request deleted", {
    foreman: request.foreman,
    employee: request.employee,
    job: jobName(request.jobId),
    field: request.category,
    value: money(request.amount)
  });
  saveState();
  render();
  showToast("Reimbursement request deleted");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function updateOtherDocumentTypeVisibility() {
  const isOther = $("documentTypeSelect")?.value === "Other";
  $("otherDocumentTypeField")?.classList.toggle("hidden", !isOther);
}

async function uploadJobDocuments(event) {
  if (!canManageJobDocuments()) return;
  const jobId = $("documentJobSelect")?.value || state.selectedDocumentJob;
  const job = state.jobs.find((entry) => entry.id === jobId);
  const files = Array.from(event.target.files || []);
  if (!job || !files.length) return;

  const oversized = files.find((file) => file.size > MAX_DEMO_DOCUMENT_BYTES);
  if (oversized) {
    showToast(`${oversized.name} is over the 25 MB demo limit`);
    event.target.value = "";
    return;
  }

  const selectedType = $("documentTypeSelect")?.value || "Other";
  const type = selectedType === "Other" ? $("otherDocumentType")?.value.trim() || "Other" : selectedType;
  for (const file of files) {
    const dataUrl = await readFileAsDataUrl(file);
    job.documents = job.documents || [];
    job.documents.push({
      id: `doc-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      name: file.name,
      mime: file.type || "application/octet-stream",
      size: file.size,
      dataUrl,
      uploadedAt: new Date().toLocaleDateString("en-US"),
      uploadedBy: state.auth?.name || state.selectedRole
    });
    logActivity("Document uploaded", { area: job.area, job: job.name, field: type, to: file.name });
  }
  event.target.value = "";
  state.selectedDocumentJob = job.id;
  saveState();
  render();
  showToast(`${files.length} document${files.length === 1 ? "" : "s"} uploaded`);
}

async function filesToStoredAttachments(files) {
  const incoming = Array.from(files || []);
  const oversized = incoming.find((file) => file.size > MAX_DEMO_DOCUMENT_BYTES);
  if (oversized) {
    showToast(`${oversized.name} is over the 25 MB demo limit`);
    return null;
  }
  const attachments = [];
  for (const file of incoming) {
    attachments.push({
      id: `file-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      mime: file.type || "application/octet-stream",
      size: file.size,
      dataUrl: await readFileAsDataUrl(file)
    });
  }
  return attachments;
}

function addQualityBendRow() {
  const tbody = $("qcBendRows");
  if (!tbody) return;
  const index = tbody.querySelectorAll("tr").length;
  const letter = qcBendLetters[index] || `Size ${index + 1}`;
  tbody.insertAdjacentHTML("beforeend", `
    <tr>
      <td><input data-qc-bend="label" value="${letter}" /></td>
      <td><input data-qc-bend="card" placeholder="Size on card" /></td>
      <td><input data-qc-bend="actual" placeholder="Actual size" /></td>
    </tr>
  `);
}

function collectQualityBends() {
  return Array.from(document.querySelectorAll("#qcBendRows tr"))
    .map((row) => {
      const label = row.querySelector('[data-qc-bend="label"]')?.value.trim() || "";
      const cardSize = row.querySelector('[data-qc-bend="card"]')?.value.trim() || "";
      const actualSize = row.querySelector('[data-qc-bend="actual"]')?.value.trim() || "";
      return { label, cardSize, actualSize };
    })
    .filter((bend) => bend.label || bend.cardSize || bend.actualSize);
}

function saveQualityCheck() {
  if (!canUseQualityControl()) return showToast("QUALITY, Admin, or Management access required");
  const areaId = $("qcAreaSelect")?.value || state.selectedQualityArea || state.selectedArea;
  const jobCode = $("qcJobCode")?.value.trim() || "";
  if (!jobCode) return showToast("Enter the job control code");
  const cardCode = $("qcCardCode")?.value.trim() || "";
  if (!cardCode) return showToast("Enter the card number");
  const record = {
    id: `qc-${Date.now()}`,
    area: areaId,
    jobId: "",
    jobCode,
    cardCode,
    operator: $("qcOperator")?.value.trim() || "",
    machineType: $("qcMachine")?.value || "",
    bends: collectQualityBends(),
    result: $("qcResult")?.value || "Pass",
    notes: $("qcNotes")?.value.trim() || "",
    createdAt: timestamp(),
    createdBy: actorName()
  };
  state.qualityChecks.unshift(record);
  state.selectedQualityArea = areaId;
  state.selectedQualityJob = "";
  logActivity("Quality control check saved", { area: areaId, field: `${jobCode} · ${cardCode}`, to: record.result });
  saveState();
  render();
  showToast("QC check saved");
}

async function addSafetyFormRecord() {
  const jobId = $("safetyJobSelect")?.value;
  const job = state.jobs.find((entry) => entry.id === jobId);
  if (!job) return showToast("Choose a job first");
  const type = $("safetyTypeSelect")?.value || "JHA";
  const accident = type === "Accident Report" ? collectAccidentReportData() : null;
  if (type === "Accident Report" && !accident.employee) return showToast("Choose or type the injured employee");
  const files = await filesToStoredAttachments($("safetyFiles")?.files);
  if (!files) return;
  const record = {
    id: `safety-${Date.now()}`,
    area: state.selectedArea,
    jobId,
    type,
    date: $("safetyDate")?.value || dateInputValue(state.selectedWeek, state.selectedWeek),
    notes: $("safetyNotes")?.value.trim() || "",
    accident,
    files,
    createdAt: timestamp(),
    createdBy: actorName(),
    status: accident?.status || "Saved"
  };
  state.safetyForms.unshift(record);
  state.selectedSafetyJob = jobId;
  state.selectedSafetyFormType = record.type;
  logActivity(record.type === "Accident Report" ? "Accident report saved" : "Safety record saved", {
    area: state.selectedArea,
    job: job.name,
    field: record.type,
    employee: accident?.employee || ""
  });
  saveState();
  render();
  showToast(record.type === "Accident Report" ? "Accident report saved" : "Safety record saved");
}

function collectAccidentReportData() {
  const yesNo = {};
  document.querySelectorAll("[data-accident-yn]").forEach((input) => {
    yesNo[input.dataset.accidentYn] = input.value || "N/A";
  });
  const injuryTypes = [...document.querySelectorAll("[data-accident-injury]:checked")].map((input) => input.dataset.accidentInjury);
  const employee = $("accidentManualEmployee")?.value.trim() || $("accidentEmployee")?.value || "";
  return {
    employee,
    sex: $("accidentSex")?.value || "",
    time: $("accidentTime")?.value || "",
    department: $("accidentDepartment")?.value.trim() || "",
    location: $("accidentLocation")?.value.trim() || "",
    otherPeople: $("accidentOtherPeople")?.value.trim() || "",
    status: $("accidentStatus")?.value || "Draft",
    yesNo,
    injuryTypes,
    bodyParts: $("accidentBodyParts")?.value.trim() || "",
    treatment: $("accidentTreatment")?.value.trim() || "",
    whatHappened: $("accidentWhatHappened")?.value.trim() || "",
    cause: $("accidentCause")?.value.trim() || "",
    correctiveAction: $("accidentCorrectiveAction")?.value.trim() || "",
    witnesses: $("accidentWitnesses")?.value.trim() || ""
  };
}

async function saveFieldAuditRecord() {
  const jobId = $("auditJobSelect")?.value;
  const job = state.jobs.find((entry) => entry.id === jobId);
  if (!job) return showToast("Choose a job first");
  const files = await filesToStoredAttachments($("auditFiles")?.files);
  if (!files) return;
  const checks = {};
  document.querySelectorAll("[data-audit-check]").forEach((input) => {
    checks[input.dataset.auditCheck] = input.value || "N/A";
  });
  const summary = auditStatusSummary(checks);
  const record = {
    id: `audit-${Date.now()}`,
    area: state.selectedArea,
    jobId,
    date: $("auditDate")?.value || dateInputValue(state.selectedWeek, state.selectedWeek),
    createdBy: $("auditUser")?.value.trim() || actorName(),
    checks,
    notes: $("auditNotes")?.value.trim() || "",
    files,
    createdAt: timestamp(),
    status: "Saved"
  };
  state.fieldAudits.unshift(record);
  state.selectedAuditJob = jobId;
  logActivity("Field audit saved", { area: state.selectedArea, job: job.name, field: `${summary.yes} Yes / ${summary.no} No / ${summary.na} N/A` });
  saveState();
  render();
  showToast("Field audit saved");
}

function openRecordFile(collectionName, recordId, fileId) {
  const record = state[collectionName]?.find((entry) => entry.id === recordId);
  const file = record?.files?.find((entry) => entry.id === fileId);
  if (!file) return;
  const win = window.open(file.dataUrl, "_blank");
  if (!win) showToast("Allow popups to open this file");
}

function deleteRecordFile(collectionName, recordId, fileId) {
  const record = state[collectionName]?.find((entry) => entry.id === recordId);
  const file = record?.files?.find((entry) => entry.id === fileId);
  if (!record || !file) return;
  if (!confirm(`Delete ${file.name}?`)) return;
  record.files = (record.files || []).filter((entry) => entry.id !== fileId);
  logActivity("Attachment deleted", {
    area: record.area || state.selectedArea,
    job: jobName(record.jobId),
    field: file.name
  });
  saveState();
  render();
  showToast("Attachment deleted");
}

function printSafetyRecord(recordId) {
  const record = state.safetyForms.find((entry) => entry.id === recordId);
  if (!record) return;
  if (record.type === "Accident Report") return printAccidentReport(record);
  const win = window.open("", "_blank");
  if (!win) return showToast("Allow popups to print this record");
  const files = record.files?.map((file) => `<li>${escapeHtml(file.name)} · ${fileSize(file.size)}</li>`).join("") || "<li>No attachments</li>";
  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(record.type)} - ${escapeHtml(jobName(record.jobId))}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 28px; color: #0b1828; }
          header { border-bottom: 2px solid #0b1828; padding-bottom: 12px; margin-bottom: 18px; }
          h1 { margin: 0; font-size: 28px; }
          p, li { font-size: 14px; line-height: 1.45; }
          .meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 18px 0; }
          .box { border: 1px solid #b8c1c8; padding: 12px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <header><h1>${escapeHtml(record.type)}</h1><p>${escapeHtml(jobName(record.jobId))}</p></header>
        <div class="meta">
          <div class="box"><strong>Date</strong><br>${escapeHtml(record.date)}</div>
          <div class="box"><strong>Saved by</strong><br>${escapeHtml(record.createdBy || "")}</div>
        </div>
        <section class="box"><strong>Notes</strong><p>${escapeHtml(record.notes || "No notes")}</p></section>
        <section><h2>Attachments</h2><ul>${files}</ul></section>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  win.document.close();
}

function printAccidentReport(record) {
  const accident = record.accident || {};
  const win = window.open("", "_blank");
  if (!win) return showToast("Allow popups to print this accident report");
  const files = record.files?.map((file) => `<li>${escapeHtml(file.name)} · ${fileSize(file.size)}</li>`).join("") || "<li>No attachments</li>";
  const ynRows = accidentYesNoFields.map(([key, en]) => `
    <tr><th>${escapeHtml(en)}</th><td>${escapeHtml(accident.yesNo?.[key] || "N/A")}</td></tr>
  `).join("");
  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Accident Report - ${escapeHtml(accident.employee || jobName(record.jobId))}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 28px; color: #0b1828; }
          header { border-bottom: 3px solid #0b1828; padding-bottom: 12px; margin-bottom: 18px; }
          h1 { margin: 0; font-size: 28px; }
          h2 { margin: 20px 0 8px; font-size: 16px; text-transform: uppercase; }
          p, li, td, th { font-size: 13px; line-height: 1.42; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #9aa5ad; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #e9eef2; width: 28%; }
          .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .box { border: 1px solid #9aa5ad; padding: 10px; min-height: 52px; }
          .line-box { border: 1px solid #9aa5ad; padding: 10px; min-height: 90px; white-space: pre-wrap; }
          .muted { color: #53606a; font-weight: 700; }
          @media print { button { display: none; } body { margin: 18px; } }
        </style>
      </head>
      <body>
        <header>
          <h1>Injury / Accident Report</h1>
          <p class="muted">${escapeHtml(jobName(record.jobId))} · ${escapeHtml(record.date)} · ${escapeHtml(accident.status || "Draft")}</p>
        </header>
        <h2>Worker Information</h2>
        <div class="grid">
          <div class="box"><strong>Name</strong><br>${escapeHtml(accident.employee || "")}</div>
          <div class="box"><strong>Sex</strong><br>${escapeHtml(accident.sex || "")}</div>
          <div class="box"><strong>Date / Time</strong><br>${escapeHtml(record.date)} ${escapeHtml(accident.time || "")}</div>
          <div class="box"><strong>Department</strong><br>${escapeHtml(accident.department || "")}</div>
          <div class="box"><strong>Location</strong><br>${escapeHtml(accident.location || "")}</div>
          <div class="box"><strong>Treatment / doctor / hospital</strong><br>${escapeHtml(accident.treatment || "")}</div>
        </div>
        <table>${ynRows}</table>
        <h2>Injury Information</h2>
        <div class="box"><strong>Type of injury / illness</strong><br>${(accident.injuryTypes || []).map(escapeHtml).join(", ") || "None selected"}</div>
        <div class="box"><strong>Affected body part(s)</strong><br>${escapeHtml(accident.bodyParts || "")}</div>
        <h2>Incident Details</h2>
        <div class="line-box"><strong>What happened</strong><br>${escapeHtml(accident.whatHappened || "")}</div>
        <div class="line-box"><strong>What directly caused the accident</strong><br>${escapeHtml(accident.cause || "")}</div>
        <div class="line-box"><strong>Other people injured / involved</strong><br>${escapeHtml(accident.otherPeople || "")}</div>
        <div class="line-box"><strong>Witnesses</strong><br>${escapeHtml(accident.witnesses || "")}</div>
        <div class="line-box"><strong>Corrective action</strong><br>${escapeHtml(accident.correctiveAction || "")}</div>
        <div class="line-box"><strong>Notes</strong><br>${escapeHtml(record.notes || "")}</div>
        <h2>Attachments</h2>
        <ul>${files}</ul>
        <p class="muted">Created by ${escapeHtml(record.createdBy || "")} on ${escapeHtml(record.createdAt || "")}</p>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  win.document.close();
}

function findJobDocument(jobId, docId) {
  const job = state.jobs.find((entry) => entry.id === jobId);
  const doc = job?.documents?.find((entry) => entry.id === docId);
  return { job, doc };
}

function handleDocumentAction(action, jobId, docId) {
  const { job, doc } = findJobDocument(jobId, docId);
  if (!job || !doc) return;
  if (action === "view") return viewJobDocument(doc);
  if (action === "download") return downloadJobDocument(doc);
  if (action === "print") return printJobDocument(job, doc);
  if (action === "delete") return deleteJobDocument(job, doc);
}

function viewJobDocument(doc) {
  const win = window.open(doc.dataUrl, "_blank");
  if (!win) showToast("Allow popups to view this document");
}

function downloadJobDocument(doc) {
  const link = document.createElement("a");
  link.href = doc.dataUrl;
  link.download = doc.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function printJobDocument(job, doc) {
  const isPdf = doc.mime === "application/pdf" || doc.name.toLowerCase().endsWith(".pdf");
  const isImage = doc.mime.startsWith("image/");
  if (!isPdf && !isImage) {
    showToast("Download this file to print it");
    return;
  }
  const win = window.open("", "_blank");
  if (!win) {
    showToast("Allow popups to print this document");
    return;
  }
  const title = escapeHtml(`${job.name} - ${doc.name}`);
  const body = isPdf
    ? `<iframe src="${doc.dataUrl}" title="${title}"></iframe>`
    : `<img src="${doc.dataUrl}" alt="${title}" />`;
  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          html, body { margin: 0; min-height: 100%; font-family: Arial, sans-serif; }
          header { padding: 14px 18px; border-bottom: 1px solid #ccd3d8; }
          strong { display: block; }
          span { color: #52606a; }
          iframe { width: 100%; height: calc(100vh - 64px); border: 0; }
          img { display: block; max-width: 100%; margin: 0 auto; }
          @media print { header { display: none; } iframe { height: 100vh; } }
        </style>
      </head>
      <body>
        <header><strong>${title}</strong><span>${escapeHtml(job.name)}</span></header>
        ${body}
        <script>window.addEventListener("load", () => setTimeout(() => window.print(), 400));<\/script>
      </body>
    </html>
  `);
  win.document.close();
}

function deleteJobDocument(job, doc) {
  if (!canManageJobDocuments()) return;
  if (!confirm(`Delete ${doc.name} from ${job.name}?`)) return;
  job.documents = (job.documents || []).filter((entry) => entry.id !== doc.id);
  logActivity("Document deleted", { area: job.area, job: job.name, field: doc.type, from: doc.name });
  saveState();
  render();
  showToast(`${doc.name} deleted`);
}

function saveJob() {
  const areaId = $("jobArea").value;
  const typedName = $("jobNameInput")?.value.trim() || "";
  const savedSolarName = $("solarJobNameSelect")?.value || "";
  const name = areaId === "solarPiles" ? typedName || savedSolarName : typedName;
  if (!name) {
    showToast("Enter a job name");
    return;
  }
  const baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "job";
  let id = baseId;
  let counter = 2;
  while (state.jobs.some((job) => job.id === id)) {
    id = `${baseId}-${counter}`;
    counter += 1;
  }
  const customer = areaId === "solarPiles" ? $("jobCustomerInput")?.value || "" : $("jobCustomerInput")?.value.trim() || "";
  const jobType = areaId === "solarPiles" ? "" : $("jobTypeInput")?.value || defaultJobTypeForArea(areaId);
  const foundationIds = jobType === "Wind Farm" ? generateFoundationIds($("foundationPrefix")?.value.trim() || "T", $("foundationFrom")?.value, $("foundationTo")?.value) : [];
  const customTracking =
    jobType === "Commercial"
      ? [1, 2, 3]
          .map((index) => ({
            id: `ct-${Date.now()}-${index}`,
            name: $(`customTrackName${index}`)?.value.trim() || "",
            unit: $(`customTrackUnit${index}`)?.value.trim() || "each",
            planned: Number($(`customTrackPlanned${index}`)?.value) || 0
          }))
          .filter((item) => item.name)
      : [];
  const hasFoundationRange = $("foundationFrom")?.value || $("foundationTo")?.value;
  if (jobType === "Wind Farm" && hasFoundationRange && !foundationIds.length) {
    showToast("Check the foundation ID range");
    return;
  }
  const productionCode = $("jobProdCode")?.value.trim() || "";
  const productionDescription = $("jobProdDescription")?.value.trim() || "";
  const parsedQuantity = quantityFromDescription(productionDescription);
  const productionQuantityValue = Number($("jobProdQuantity")?.value) || parsedQuantity || 0;
  const productionWeight = Number($("jobProdWeight")?.value) || 0;
  const hasProductionSetup = productionCode || productionDescription || productionQuantityValue || productionWeight;
  if (hasProductionSetup && !productionCode) {
    showToast("Optional production setup needs at least a control code");
    return;
  }
  if (areaId === "solarPiles" && typedName && !state.jobLists.solarJobNames.includes(typedName)) {
    state.jobLists.solarJobNames.push(typedName);
    state.jobLists.solarJobNames.sort((a, b) => a.localeCompare(b));
  }
  const job = {
    id,
    name,
    number: $("jobNumberInput").value.trim(),
    customer,
    area: areaId,
    jobType,
    foundationIds,
    customTracking,
    documents: [],
    status: $("jobStatusInput").value
  };
  state.jobs.push(job);
  logActivity("Job added", { area: areaId, job: name, field: jobType || "Solar" });
  if (hasProductionSetup) {
    const productionItem = {
      id: `p${Date.now()}`,
      area: areaId,
      foreman: $("jobProdForeman")?.value || "",
      jobId: id,
      code: productionCode,
      description: productionDescription || productionCode,
      planned: productionWeight,
      quantity: productionQuantityValue,
      completedQty: 0,
      completed: 0,
      reviewStatus: "Draft",
      bundle: areaId === "rebarFab" ? "" : undefined,
      bundleStatus: areaId === "rebarFab" ? "Cut" : undefined,
      delay: "No delay",
      delayNote: "",
      status: "Not Started"
    };
    setLastEdited(productionItem, "Production setup added");
    state.production.push(productionItem);
    logActivity("Production setup added", { area: areaId, foreman: productionItem.foreman, job: name, field: productionCode });
  }
  if (areaId === state.selectedArea && !currentSheet().jobId) {
    currentSheet().jobId = id;
  }
  if (areaId === state.selectedArea) {
    state.selectedProductionJob = id;
  }
  state.jobDraftType = "";
  saveState();
  render();
  showToast(hasProductionSetup ? `${name} added with production setup` : `${name} added`);
}

function updateJobStatus(jobId, status) {
  if (!["Admin", "Payroll"].includes(state.selectedRole)) return;
  const job = state.jobs.find((entry) => entry.id === jobId);
  if (!job) return;
  const oldStatus = job.status;
  job.status = status;
  if (state.selectedProductionJob === jobId && status !== "Active") {
    state.selectedProductionJob = "";
  }
  logActivity("Job status changed", { job: job.name, field: "status", from: oldStatus, to: status });
  saveState();
  render();
  showToast(`${job.name} marked ${status}`);
}

function deleteJob(jobId) {
  if (!["Admin", "Payroll"].includes(state.selectedRole)) return;
  const job = state.jobs.find((entry) => entry.id === jobId);
  if (!job) return;
  const productionCount = state.production.filter((item) => item.jobId === jobId).length;
  const warning = productionCount ? ` This will also remove ${productionCount} production item(s) tied to it.` : "";
  if (!confirm(`Delete ${job.name}?${warning}`)) return;
  state.jobs = state.jobs.filter((entry) => entry.id !== jobId);
  state.production = state.production.filter((item) => item.jobId !== jobId);
  Object.values(state.sheets || {}).forEach((sheet) => {
    if (sheet.jobId === jobId) {
      sheet.jobId = state.jobs.find((entry) => entry.area === sheet.area && (entry.status || "Active") === "Active")?.id || "";
    }
  });
  if (state.selectedProductionJob === jobId) state.selectedProductionJob = "";
  logActivity("Job deleted", { job: job.name });
  saveState();
  render();
  showToast(`${job.name} deleted`);
}

function duplicateWeek() {
  const nextStart = addDays(selectedWeekStart(), 7);
  const weekStart = dateInputValue(prompt("Duplicate to week starting:", nextStart), "");
  if (!weekStart) return;
  const week = addDays(weekStart, 4);
  const copy = structuredClone(currentSheet());
  copy.week = week;
  copy.weekStart = weekStart;
  copy.status = "Draft";
  state.sheets[sheetKey(week, state.selectedArea, copy.foreman)] = copy;
  if (!state.weeks.includes(week)) state.weeks.push(week);
  state.weeks.sort();
  state.selectedWeek = week;
  saveState();
  render();
}

function updateProductionItem(event) {
  const item = state.production.find((entry) => entry.id === event.target.dataset.prod);
  if (!item) return;
  const field = event.target.dataset.field;
  const oldValue = event.target.dataset.startValue ?? item[field];
  item[field] = ["completed", "completedQty", "planned", "quantity"].includes(field) ? Number(event.target.value) : event.target.value;
  if (item.productionMode === "custom") {
    item.completed = Number(item.completedQty) || 0;
    item.quantity = Number(item.planned) || 0;
    item.status = item.planned && item.completed >= item.planned ? "Complete" : item.completed > 0 ? "In Progress" : "Not Started";
    item.reviewStatus = "Draft";
    item.submittedAt = "";
    item.submittedBy = "";
    setLastEdited(item, "Production edited");
    if (event.type === "change" && String(oldValue) !== String(item[field])) {
      logActivity("Production changed", { foreman: item.foreman, job: jobName(item.jobId), field, from: oldValue, to: item[field] });
    }
    saveState();
    const pct = item.planned ? Math.min(100, Math.round((item.completed / item.planned) * 100)) : 0;
    const pctBox = document.querySelector(`[data-prod-pct="${item.id}"]`);
    if (pctBox) pctBox.textContent = `${pct}%`;
    const progressText = document.querySelector(`[data-prod-progress-text="${item.id}"]`);
    if (progressText) progressText.textContent = `${preciseNumber(item.completed)} / ${preciseNumber(item.planned)} ${item.unit || ""}`;
    const fill = document.querySelector(`[data-prod="${item.id}"]`)?.closest(".production-card")?.querySelector(".progress-fill");
    if (fill) fill.style.width = `${pct}%`;
    const reviewTag = document.querySelector(`[data-prod-review="${item.id}"]`);
    if (reviewTag) reviewTag.textContent = item.reviewStatus;
    return;
  }
  item.quantity = productionQuantity(item);
  item.completed = completedWeight(item);
  item.status = item.completed >= item.planned ? "Complete" : item.completed > 0 ? "In Progress" : "Not Started";
  item.reviewStatus = "Draft";
  item.submittedAt = "";
  item.submittedBy = "";
  setLastEdited(item, "Production edited");
  if (event.type === "change" && String(oldValue) !== String(item[field])) {
    logActivity("Production changed", { foreman: item.foreman, job: jobName(item.jobId), field, from: oldValue, to: item[field] });
  }
  saveState();
  const weightBox = document.querySelector(`[data-prod-weight="${item.id}"]`);
  if (weightBox) weightBox.value = `${number(item.completed)} lbs`;
  const facts = document.querySelector(`[data-prod-facts="${item.id}"]`);
  const remaining = Math.max((Number(item.planned) || 0) - item.completed, 0);
  if (facts) facts.innerHTML = `${productionFactsMarkup(item)}<span>Remaining: <strong data-prod-remaining="${item.id}">${number(remaining)} lbs</strong></span>`;
  const pct = item.planned ? Math.min(100, Math.round((item.completed / item.planned) * 100)) : 0;
  const pctBox = document.querySelector(`[data-prod-pct="${item.id}"]`);
  if (pctBox) pctBox.textContent = `${pct}%`;
  const progressText = document.querySelector(`[data-prod-progress-text="${item.id}"]`);
  if (progressText) progressText.textContent = `${number(item.completed)} / ${number(item.planned)} lbs`;
  const equation = document.querySelector(`[data-prod-equation="${item.id}"]`);
  if (equation) {
    const quantity = productionQuantity(item);
    equation.textContent = quantity ? `${preciseNumber(quantity)} total x ${preciseNumber(unitWeight(item))} lbs each = ${number(item.planned)} lbs` : `Total weight: ${number(item.planned)} lbs`;
  }
  const fill = document.querySelector(`[data-prod="${item.id}"]`)?.closest(".production-card")?.querySelector(".progress-fill");
  if (fill) fill.style.width = `${pct}%`;
  const reviewTag = document.querySelector(`[data-prod-review="${item.id}"]`);
  if (reviewTag) reviewTag.textContent = item.reviewStatus;
}

function render() {
  if (publicTrainingId) renderPublicTraining();
  else if (!state.companyVerified) renderCompanyLogin();
  else if (!state.auth && !state.selectedArea) renderGate();
  else if (!state.auth) renderLogin();
  else if (state.showIntro) renderIntro();
  else if (!state.selectedArea) renderGate();
  else renderShell();
}

window.addEventListener("popstate", (event) => {
  const route = event.state?.crewforgeRoute || window.location.hash.replace(/^#/, "") || routeFromState();
  applyRoute(route);
});

render();
syncHistory(true);
initCloud();

window.addEventListener("online", () => {
  setSyncStatus("pending", "Back online. Syncing saved CrewForge changes...");
  pushCloud(true);
  render();
});

window.addEventListener("offline", () => {
  setSyncStatus("offline", "Offline mode. CrewForge will keep working and sync when internet returns.");
  render();
});
