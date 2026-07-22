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
  }
};

const delayReasons = ["No delay", "Weather", "Accident", "Illness", "Job site shut down", "Material delay", "Equipment issue", "Inspection hold", "Drawing/RFI issue", "Other"];
const bundleStatuses = ["Cut", "In production", "Staged", "Loaded", "Shipped", "Delivered"];
const jobStatuses = ["Active", "In Progress", "On Hold", "Complete"];
const documentTypes = ["Site Safety Plan", "JHA", "Hot Work Permit", "Fire Extinguisher Inspection", "Rigging Form", "Equipment Inspection", "Client Form", "Other"];
const installationJobTypes = ["Wind Farm", "T-line Substation", "Data Center"];
const fabricationJobTypes = [...installationJobTypes, "Commercial"];
const windFoundationComponents = ["Bottom Mat", "Top", "Pedestal"];
const shifts = ["Day Shift", "Night Shift"];
const appRoles = ["Foreman", "Payroll", "Management", "Admin"];
const foremanNames = ["Lidio Barron", "Gregorio Izaguirre", "Huguer Vazquez", "Hugo Martinez", "Paco", "Wilfredo Vargas", "Erik", "Paul Featherhat"];
const rebarFabForemen = ["Rebar Fabrication Day Foreman", "Rebar Fabrication Night Foreman"];
const solarPilesForemen = ["Solar Piles Day Foreman", "Solar Piles Night Foreman"];
const trialForemanNames = [...foremanNames, ...rebarFabForemen, ...solarPilesForemen];
const appName = "CrewForge";
const appTagline = "Crew time and job progress, forged into one.";
const assetVersion = "64";
const asset = (path) => `${path}?v=${assetVersion}`;
const areaArtwork = {
  rebarFab: asset("./assets/crewforge-rebar-fabrication.png"),
  solarPiles: asset("./assets/crewforge-solar-piles.png"),
  rebarInstall: asset("./assets/crewforge-thumbnail.png")
};
const trialAccounts = [
  { code: "FOREMAN", name: "Foreman", role: "Foreman", needsForeman: true },
  { code: "PAYROLL", name: "Payroll", role: "Payroll", foreman: "Lidio Barron" },
  { code: "MANAGER", name: "Management", role: "Management", foreman: "Lidio Barron" },
  { code: "ADMIN", name: "Admin", role: "Admin", foreman: "Lidio Barron" }
];

const SUPABASE_URL = "https://ehexrdmtqoxjywahqjmh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Nal5T6ZOVJpI-yzzvGOxw_Ypre8otF";
const WORKSPACE_ID = "crewforge-demo";
const SHARED_STATE_KEYS = ["weeks", "people", "jobs", "sheets", "production", "jobLists"];
const MAX_DEMO_DOCUMENT_BYTES = 5 * 1024 * 1024;

const defaultPeople = [
  ...foremanNames.map((name) => [name, "Foreman", "rebarInstall", `${name} Crew`, false]),
  ...rebarFabForemen.map((name, index) => [name, "Foreman", "rebarFab", shifts[index] || shifts[0], false]),
  ...solarPilesForemen.map((name, index) => [name, "Foreman", "solarPiles", shifts[index] || shifts[0], false]),
  ["Cruz Orosco", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Otilio Juarez", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Ubaldo Juarez", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Simon Garcia", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Mauricio Frias", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Filiberto Frias", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Abelardo Esperanza", "Rodbuster", "rebarInstall", "Lidio Barron Crew", false],
  ["Adelfo Vargas", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Maribel Gutierrez", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Eduardo Gomez", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Dario Estrada", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Johan Quintero", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Daniel Marquez", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Leobardo Reina", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Luis Perez Leon", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Felipe Jimenez", "Rodbuster", "rebarInstall", "Huguer Vazquez Crew", false],
  ["Jose Machine Operator", "Machine Operator", "rebarFab", "Day Shift", false],
  ["Carlos Helper", "Helper", "rebarFab", "Day Shift", false],
  ["Rebar QC", "Quality Control", "rebarFab", "Day Shift", false],
  ["Rebar Cleaning", "Cleaning", "rebarFab", "Night Shift", false],
  ["Solar Operator", "Machine Operator", "solarPiles", "Day Shift", false],
  ["Solar Helper", "Helper", "solarPiles", "Night Shift", false],
  ["Solar QC", "Quality Control", "solarPiles", "Day Shift", false],
  ["Solar Cleaning", "Cleaning", "solarPiles", "Night Shift", false]
].map(([name, role, area, group, dol]) => ({ name, role, area, group, dol, hourlyRate: 0 }));

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

const defaultState = {
  auth: null,
  selectedArea: "",
  activeTab: "dashboard",
  selectedWeek: "2026-07-03",
  selectedProductionJob: "",
  selectedEmployeeReport: "",
  selectedEmployeeReportArea: "all",
  selectedEmployeeReportFromWeek: "2026-07-03",
  selectedEmployeeReportToWeek: "2026-07-03",
  jobDraftType: "",
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
    { id: "buffalo-gap", name: "Buffalo Gap - IRA", number: "BG-IRA", customer: "Buffalo Gap", area: "rebarFab", jobType: "Wind Farm", status: "Active" },
    { id: "laurel", name: "Laurel", number: "LAU-2026", customer: "Laurel", area: "rebarFab", jobType: "Commercial", status: "Active" },
    { id: "solar-demo", name: "Solar Piles Demo Job", number: "SP-100", customer: "Solar", area: "solarPiles", status: "Active" }
  ],
  sheets: {},
  production: [
    ...bakersfieldControlCodes,
    { id: "p3", area: "rebarFab", foreman: "Rebar Fabrication Day Foreman", jobId: "buffalo-gap", code: "ACA", description: "Operator pads bundle", planned: 3595, completed: 1800, weekly: 900, bundle: "B-104", bundleStatus: "In production", delay: "No delay", delayNote: "", status: "In Progress" },
    { id: "p4", area: "rebarFab", foreman: "Rebar Fabrication Night Foreman", jobId: "laurel", code: "DYK", description: "Pier type bundle", planned: 6406, completed: 6406, weekly: 1200, bundle: "B-216", bundleStatus: "Shipped", delay: "No delay", delayNote: "", status: "Complete" },
    { id: "p5", area: "solarPiles", foreman: "Solar Piles Day Foreman", jobId: "solar-demo", code: "ORCA-1001", description: "Solar pile batch", planned: 400, completed: 265, weekly: 80, delay: "No delay", delayNote: "", status: "In Progress" }
  ]
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
    } catch (error) {
      console.warn("Cloud save failed; local demo data is still saved.", error);
    }
  };
  clearTimeout(cloudSaveTimer);
  if (immediate) save();
  else cloudSaveTimer = setTimeout(save, 500);
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
    return upgradeState({ ...structuredClone(defaultState), ...saved });
  } catch {
    return upgradeState(structuredClone(defaultState));
  }
}

function upgradeState(next) {
  if (next.auth === undefined) next.auth = null;
  next.selectedEmployeeReport = next.selectedEmployeeReport || "";
  next.selectedEmployeeReportArea = next.selectedEmployeeReportArea || "all";
  next.selectedEmployeeReportFromWeek = next.selectedEmployeeReportFromWeek || next.selectedWeek || defaultState.selectedWeek;
  next.selectedEmployeeReportToWeek = next.selectedEmployeeReportToWeek || next.selectedWeek || defaultState.selectedWeek;
  next.selectedDocumentJob = next.selectedDocumentJob || "";
  next.jobDraftType = next.jobDraftType || "";
  next.production = next.production || [];
  next.jobLists = {
    solarClients: next.jobLists?.solarClients?.length ? next.jobLists.solarClients : structuredClone(defaultState.jobLists.solarClients),
    solarJobNames: next.jobLists?.solarJobNames?.length ? next.jobLists.solarJobNames : structuredClone(defaultState.jobLists.solarJobNames)
  };
  next.currentForeman = normalizeForemanName(next.currentForeman);
  next.setupForeman = normalizeForemanName(next.setupForeman);
  next.jobs = (next.jobs || []).map((job) => ({
    ...job,
    jobType: job.jobType || defaultJobTypeForArea(job.area),
    foundationIds: job.foundationIds || [],
    customTracking: job.customTracking || [],
    documents: job.documents || []
  }));
  next.people = (next.people || []).map((person) => ({
    ...person,
    name: normalizeForemanName(person.name),
    group: normalizeCrewName(person.group),
    hourlyRate: Number(person.hourlyRate) || 0
  }));
  next.people = next.people.filter((person) => {
    const isFabricationArea = ["rebarFab", "solarPiles"].includes(person.area);
    const isInstallationForeman = foremanNames.includes(person.name) && person.role === "Foreman";
    return !(isFabricationArea && isInstallationForeman);
  });
  defaultPeople.forEach((person) => {
    const exists = next.people.some((entry) => entry.area === person.area && entry.name === person.name);
    if (!exists) next.people.push(structuredClone(person));
  });
  next.sheets = next.sheets || {};
  Object.entries(next.sheets).forEach(([key, sheet]) => {
    const parts = key.split(":");
    if (parts.length !== 2) return;
    const sheetForeman = normalizeForemanName(sheet.foreman || "");
    const migratedKey = `${parts[0]}:${parts[1]}:${sheetForeman}`;
    if (sheetForeman && !next.sheets[migratedKey]) next.sheets[migratedKey] = sheet;
    delete next.sheets[key];
  });
  Object.values(next.sheets).forEach((sheet) => {
    sheet.foreman = normalizeForemanName(sheet.foreman);
    sheet.group = normalizeCrewName(sheet.group);
    sheet.rows = (sheet.rows || []).map((row) => ({
      ...row,
      employee: normalizeForemanName(row.employee),
      lightDuty: row.lightDuty || {}
    }));
  });
  bakersfieldControlCodes.forEach((seedItem) => {
    const exists = next.production.some((item) => item.jobId === seedItem.jobId && item.code === seedItem.code);
    if (!exists) next.production.push(structuredClone(seedItem));
  });
  next.production.forEach((item) => {
    item.foreman = normalizeForemanName(item.foreman);
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

function saveState() {
  pendingRemoteState = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  pushCloud();
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
  return name === "Willie Vargas" ? "Wilfredo Vargas" : name;
}

function normalizeCrewName(group) {
  return group === "Willie Vargas Crew" ? "Wilfredo Vargas Crew" : group;
}

function area() {
  return areas[state.selectedArea];
}

function roleIsElevated() {
  return ["Payroll", "Management", "Admin"].includes(state.selectedRole);
}

function isForemanMode() {
  return state.selectedRole === "Foreman";
}

function availableTabs() {
  if (isForemanMode()) {
    return [
      ["timesheet", "My Timesheet", "Mis horas"],
      ["production", "Production Update", "Produccion"],
      ["documents", "Documents", "Documentos"]
    ];
  }
  return [
    ["dashboard", "Dashboard", "Tablero"],
    ["timesheet", "Timesheet Review", "Revision de horas"],
    ["production", "Production", "Produccion"],
    ["jobs", "Jobs", "Trabajos"],
    ["documents", "Documents", "Documentos"],
    ["deliverables", "Deliverables", "Entregables"],
    ["setup", "People / Crews", "Personas / Cuadrillas"]
  ];
}

function canEditSheet(sheet) {
  if (state.selectedRole === "Management") return false;
  if (roleIsElevated()) return true;
  return sheet.foreman === state.currentForeman && sheet.status !== "Approved";
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

function foremenForArea(areaId = state.selectedArea) {
  return peopleForArea(areaId).filter((person) => person.role === "Foreman");
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
    return (item.foreman || state.currentForeman) === state.currentForeman;
  });
}

function productionTotals() {
  const items = productionForArea();
  const planned = items.reduce((sum, item) => sum + (item.productionMode === "foundation" ? 1 : Number(item.planned) || 0), 0);
  const completed = items.reduce((sum, item) => sum + (item.productionMode === "foundation" ? 1 : item.productionMode === "custom" ? Number(item.completedQty) || 0 : completedWeight(item)), 0);
  const delayed = items.filter((item) => item.delay !== "No delay").length;
  return { planned, completed, delayed, remaining: Math.max(planned - completed, 0) };
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("toast").textContent = message;
  $("toast").classList.add("visible");
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2200);
}

function setArea(areaId) {
  state.selectedArea = areaId;
  state.activeTab = isForemanMode() ? "timesheet" : "dashboard";
  state.selectedProductionJob = "";
  state.selectedDocumentJob = "";
  ensureAreaForeman();
  saveState();
  render();
}

function changeTab(tab) {
  state.activeTab = tab;
  if (tab === "production" && !selectedJobs().some((job) => job.id === state.selectedProductionJob)) {
    state.selectedProductionJob = "";
  }
  saveState();
  render();
}

function setOptions(values, selected, labeler = (value) => value, valueGetter = (value) => value) {
  return values.map((value) => `<option value="${valueGetter(value)}" ${valueGetter(value) === selected ? "selected" : ""}>${labeler(value)}</option>`).join("");
}

function renderLogin() {
  $("app").innerHTML = `
    <main class="login-screen">
      <section class="login-card">
        <div class="login-logo-stack">
          <img class="login-icon" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
          <img class="login-wordmark" src="${asset("./assets/crewforge-logo-lockup.png")}" alt="CrewForge" />
        </div>
        <div>
          <p class="eyebrow">Trial access</p>
          <h1>${t("Sign in", "Iniciar sesion")}</h1>
          <p class="sub">Use one trial code, then choose the right foreman when needed.</p>
        </div>
        <label>Access code<span class="es">Codigo de acceso</span><input id="accessCode" autocomplete="one-time-code" placeholder="FOREMAN, PAYROLL, MANAGER, ADMIN" /></label>
        <label id="foremanLoginField" class="hidden">Foreman<span class="es">Mayordomo</span><select id="loginForeman">${setOptions(trialForemanNames, trialForemanNames[0])}</select></label>
        <button class="primary-action" id="loginButton" type="button">${t("Open CrewForge", "Abrir CrewForge")}</button>
        <div class="trial-note">
          <strong>Trial codes</strong>
          <span>Foremen: FOREMAN, then choose a name</span>
          <span>Office: PAYROLL, MANAGER, or ADMIN</span>
          <span class="es">Codigos de prueba para esta demo.</span>
        </div>
        <p class="sub login-limit">This is trial access for workflow testing. Real company use still needs hosted login and server-side permissions.</p>
      </section>
    </main>
  `;
  $("loginButton").addEventListener("click", loginWithCode);
  $("accessCode").addEventListener("input", updateForemanLoginVisibility);
  $("accessCode").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithCode();
  });
  updateForemanLoginVisibility();
  $("accessCode").focus();
}

function updateForemanLoginVisibility() {
  const code = $("accessCode")?.value.trim().toUpperCase();
  const showForemen = code === "FOREMAN";
  $("foremanLoginField")?.classList.toggle("hidden", !showForemen);
}

function loginWithCode() {
  const code = $("accessCode").value.trim().toUpperCase();
  const account = trialAccounts.find((entry) => entry.code === code);
  if (!account) {
    showToast("Code not recognized");
    return;
  }
  updateForemanLoginVisibility();
  const selectedForeman = account.needsForeman ? $("loginForeman")?.value : account.foreman;
  const displayName = account.needsForeman ? selectedForeman : account.name;
  state.auth = { name: displayName, role: account.role, code: account.code };
  state.selectedRole = account.role;
  state.currentForeman = selectedForeman || state.currentForeman;
  state.setupForeman = selectedForeman || state.setupForeman;
  state.selectedArea = "";
  state.activeTab = account.role === "Foreman" ? "timesheet" : "dashboard";
  saveState();
  render();
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
        <p class="sub">Start simple: pick the side of the company, then fill out time, production, and reports for that area only.</p>
        <button class="text-button gate-logout" id="gateLogout" type="button">Log out<span class="es">Salir</span></button>
      </section>
      <section class="area-grid">
        ${Object.entries(areas)
          .map(
            ([id, info]) => `
            <button class="area-card" type="button" data-area="${id}">
              <img class="area-card-thumb" src="${areaArtwork[id] || asset("./assets/crewforge-thumbnail.png")}" alt="" />
              <span>
                <strong>${info.label}</strong>
                <span class="es">${info.es}</span>
              </span>
              <span class="sub">${info.mode === "crew" ? "Crew timesheets" : "Day/Night shift timesheets"}</span>
            </button>
          `
          )
          .join("")}
      </section>
    </main>
  `;
  document.querySelectorAll("[data-area]").forEach((button) => button.addEventListener("click", () => setArea(button.dataset.area)));
  $("gateLogout").addEventListener("click", () => {
    state.auth = null;
    state.selectedArea = "";
    saveState();
    render();
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
    <div class="shell ${isForemanMode() ? "foreman-shell" : "office-shell"}">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge logo" />
          <div><strong>${appName}</strong><span>${appTagline}</span><small>${isForemanMode() ? "Foreman view" : "Office view"}</small></div>
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
        <header class="topbar">
          <div class="topbar-title">
            <div class="topbar-brandlockup">
              <img src="${asset("./assets/crewforge-app-icon.png")}" alt="CrewForge icon" />
              <strong>${appName}</strong>
            </div>
            <p class="eyebrow">${area().label}</p>
            <h1>${tabs.find(([id]) => id === state.activeTab)?.[1] || "Dashboard"}</h1>
            ${isForemanMode() ? `<p class="sub">${state.currentForeman} · ${state.selectedWeek}</p>` : ""}
          </div>
          <div class="top-actions">
            <div class="login-pill">Viewing as<span class="es">Viendo como</span><strong>${state.auth?.name || state.selectedRole}</strong><small>${state.selectedRole}</small></div>
            <label class="select-label">Week ending<span class="es">Semana termina</span><select id="weekSelect">${setOptions(state.weeks, state.selectedWeek, (week) => week)}</select></label>
          </div>
        </header>
        ${renderActiveTab()}
      </main>
    </div>
  `;

  document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => changeTab(button.dataset.tab)));
  $("changeArea").addEventListener("click", () => {
    state.selectedArea = "";
    saveState();
    render();
  });
  $("logout").addEventListener("click", () => {
    state.auth = null;
    state.selectedArea = "";
    saveState();
    render();
  });
  $("resetDemo").addEventListener("click", () => {
    const auth = state.auth;
    state = structuredClone(defaultState);
    state.auth = auth;
    if (auth) {
      const account = trialAccounts.find((entry) => entry.code === auth.code);
      state.selectedRole = auth.role;
      const foreman = auth.role === "Foreman" ? auth.name : account?.foreman;
      state.currentForeman = foreman || state.currentForeman;
      state.setupForeman = foreman || state.setupForeman;
    }
    saveState();
    render();
  });
  $("weekSelect").addEventListener("change", (event) => {
    state.selectedWeek = event.target.value;
    saveState();
    render();
  });
  bindTabEvents();
}

function renderActiveTab() {
  if (state.activeTab === "timesheet") return renderTimesheet();
  if (state.activeTab === "production") return renderProduction();
  if (state.activeTab === "jobs") return renderJobs();
  if (state.activeTab === "documents") return renderDocuments();
  if (state.activeTab === "deliverables") return renderDeliverables();
  if (state.activeTab === "setup") return renderSetup();
  return renderDashboard();
}

function renderDashboard() {
  const sheet = currentSheet();
  const totals = productionTotals();
  const pct = totals.planned ? Math.round((totals.completed / totals.planned) * 100) : 0;
  return `
    <section class="metric-grid">
      <article class="metric"><span>Hours</span><strong>${number(totalHours(sheet))}</strong><small>Current week</small></article>
      <article class="metric"><span>Timesheet status</span><strong>${sheet.status}</strong><small>${sheet.foreman || "No foreman selected"}</small></article>
      <article class="metric"><span>Production</span><strong>${pct}%</strong><small>${number(totals.completed)} of ${number(totals.planned)}</small></article>
      <article class="metric"><span>Delays</span><strong>${totals.delayed}</strong><small>Reported production delays</small></article>
    </section>
    <section class="panel">
      <div class="split">
        <div><h2>${t("Today at a glance", "Resumen rapido")}</h2><p class="sub">A management-friendly snapshot for the selected area.</p></div>
        <button class="secondary-action no-print" data-print="dashboard">${t("Export PDF", "Exportar PDF")}</button>
      </div>
      <div class="report-grid section-gap">
        <div class="table-wrap">${timesheetSummaryTable(sheet)}</div>
        <div class="table-wrap">${productionSummaryTable()}</div>
      </div>
    </section>
  `;
}

function timesheetSummaryTable(sheet) {
  return `
    <table>
      <thead><tr><th>Employee</th><th>Role</th><th>Total</th>${area().perDiem ? "<th>Per diem</th>" : ""}</tr></thead>
      <tbody>
        ${sheet.rows
          .map((row) => {
            const person = personByName(row.employee) || {};
            return `<tr><td><strong>${row.employee}</strong>${row.borrowed ? '<span class="tag">Borrowed</span>' : ""}</td><td>${rowRole(row)}</td><td>${rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0)}</td>${area().perDiem ? `<td>${money(row.perDiem)}</td>` : ""}</tr>`;
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

function uniqueEmployees() {
  return [...new Set(state.people.map((person) => person.name).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function weekInRange(week, fromWeek, toWeek) {
  if (fromWeek && week < fromWeek) return false;
  if (toWeek && week > toWeek) return false;
  return true;
}

function employeeReportRecords(employee, fromWeek = state.selectedWeek, toWeek = state.selectedWeek, areaFilter = "all") {
  if (!employee) return [];
  return Object.values(state.sheets || [])
    .flatMap((sheet) => {
      if (!weekInRange(sheet.week, fromWeek, toWeek)) return [];
      if (areaFilter !== "all" && sheet.area !== areaFilter) return [];
      return (sheet.rows || [])
        .filter((row) => row.employee === employee)
        .map((row) => {
          const person = personByName(row.employee) || {};
          const regular = rowHours(row);
          const pto = Number(row.pto) || 0;
          const sick = Number(row.sick) || 0;
          const perDiem = Number(row.perDiem) || 0;
          const rate = Number(person.hourlyRate) || 0;
          const lightDutyDays = days.filter((day) => row.lightDuty?.[day]).map((day) => dayLabels[days.indexOf(day)]);
          return {
            areaId: sheet.area,
            areaLabel: areas[sheet.area]?.label || sheet.area,
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
            rate,
            gross: (regular + pto + sick) * rate + perDiem,
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
        <tr><th>Week</th><th>Area</th><th>Job</th><th>Foreman</th><th>Role</th><th>Hours</th><th>PTO</th><th>Sick</th><th>Per diem</th><th>Rate</th><th>Gross est.</th><th>Notes</th></tr>
      </thead>
      <tbody>
        ${records
          .map((record) => `<tr>
            <td>${record.week}</td>
            <td>${record.areaLabel}</td>
            <td>${record.job || ""}</td>
            <td>${record.foreman || ""}</td>
            <td>${record.role || ""}${record.borrowed ? '<span class="tag">Borrowed</span>' : ""}${record.dol ? '<span class="tag">DOL</span>' : ""}${record.lightDutyDays.length ? `<span class="tag">Light duty: ${record.lightDutyDays.join(", ")}</span>` : ""}</td>
            <td>${preciseNumber(record.total)}</td>
            <td>${preciseNumber(record.pto)}</td>
            <td>${preciseNumber(record.sick)}</td>
            <td>${money(record.perDiem)}</td>
            <td>${money(record.rate)}</td>
            <td>${money(record.gross)}</td>
            <td>${record.notes}</td>
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
  const useCards = isForemanMode();
  const showTimesheetJob = state.selectedArea === "rebarInstall";
  const isCrewArea = area().mode === "crew";
  const helperText =
    isCrewArea
      ? t("Choose a foreman and that foreman's crew fills in automatically.", "Escoja un mayordomo y se llena su cuadrilla automaticamente.")
      : t("Choose day or night shift; no crews needed for shop fabrication.", "Escoja turno de dia o noche; no se necesitan cuadrillas para fabricacion.");
  return `
    ${!editable ? `<div class="notice">Read only for this login. Payroll/Admin can edit all records. <span class="es">Solo lectura para este usuario.</span></div>` : ""}
    <section class="panel ${useCards ? "foreman-panel" : ""}">
      <div class="split">
        <div><h2>${t("Timesheet", "Registro de horas")}</h2><p class="sub">${helperText}</p></div>
        <span class="tag">${sheet.status}</span>
      </div>
      <div class="form-grid section-gap">
        ${showTimesheetJob ? `<label>Job<span class="es">Trabajo</span><select id="sheetJob" ${!editable ? "disabled" : ""}>${setOptions(selectedJobs(), sheet.jobId, (job) => job.name, (job) => job.id)}</select></label>` : ""}
        <label>Foreman<span class="es">Mayordomo</span><select id="sheetForeman" ${!editable || state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), sheet.foreman)}</select></label>
        ${isCrewArea ? `<label>Crew<span class="es">Cuadrilla</span><input value="${sheet.group || crewNameForForeman(sheet.foreman)}" disabled /></label>` : `<label>Shift<span class="es">Turno</span><select id="sheetGroup" ${!editable ? "disabled" : ""}>${setOptions(groupOptions(), sheet.group)}</select></label>`}
        <label>Status<span class="es">Estado</span><select id="sheetStatus" ${!roleIsElevated() ? "disabled" : ""}>${setOptions(["Draft", "Submitted", "Approved"], sheet.status)}</select></label>
      </div>
      ${renderWorkerAdder(editable)}
      ${useCards ? renderForemanTimeCards(sheet, editable) : `
      <div class="timesheet-wrap section-gap office-timesheet">
        <table class="entry-table ${!editable ? "locked" : ""}">
          <thead>
            <tr>
              <th>Employee</th><th>Role</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th><th>PTO</th><th>Sick</th>${area().perDiem ? "<th>Per diem</th>" : ""}${area().dol ? "<th>DOL</th>" : ""}<th>Total</th><th>Notes</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${sheet.rows.map((row, index) => renderTimesheetRow(row, index, editable)).join("")}
          </tbody>
        </table>
      </div>`}
      ${sheet.submittedAt ? `<div class="audit-note section-gap">Submitted by ${sheet.submittedBy || sheet.foreman} on ${sheet.submittedAt}. <span class="es">Enviado por ${sheet.submittedBy || sheet.foreman}.</span></div>` : ""}
      <div class="action-row section-gap">
        <strong>Total: ${number(totalHours(sheet))} hours</strong>
        ${area().perDiem ? `<strong>Per diem: ${money(totalPerDiem(sheet))}</strong>` : ""}
        <button class="secondary-action" id="duplicateWeek" type="button">${t("Duplicate Week", "Duplicar semana")}</button>
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
      <td><button class="danger-action icon-action" data-delete-row="${index}" type="button" ${disabled}>Remove<span class="es">Quitar</span></button></td>
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
      <button class="danger-action table-action" data-delete-row="${index}" type="button" ${disabled}>Remove from week<span class="es">Quitar de semana</span></button>
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
      ${area().dol ? `<td>${person.dol ? "Yes" : ""}</td>` : ""}
      <td><strong>${rowHours(row) + Number(row.pto || 0) + Number(row.sick || 0)}</strong></td>
      <td><textarea data-row="${index}" data-field="notes" ${disabled}>${row.notes || ""}</textarea></td>
      <td><button class="danger-action table-action" data-delete-row="${index}" type="button" ${disabled}>Remove<span class="es">Quitar</span></button></td>
    </tr>
  `;
}

function renderProduction() {
  const canAddProduction = state.selectedRole === "Foreman" || ["Admin", "Payroll"].includes(state.selectedRole);
  const jobOptions = selectedJobs();
  const activeJob = state.selectedProductionJob ? jobName(state.selectedProductionJob) : "";
  const visibleProduction = productionForArea();
  const submittedCount = visibleProduction.filter((item) => item.reviewStatus === "Submitted").length;
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t(isForemanMode() ? "Production Update" : "Production", "Produccion")}</h2><p class="sub">Track jobs, control codes, bundles, status, and delays.</p></div>
        <div class="button-pair">
          ${visibleProduction.length ? `<button class="primary-action" data-submit-production type="button">${t("Submit Production", "Enviar produccion")}</button>` : ""}
          <button class="secondary-action" data-print="production">${t("Export PDF", "Exportar PDF")}</button>
        </div>
      </div>
      <div class="form-grid section-gap">
        <label>Job filter<span class="es">Filtro de trabajo</span><select id="productionJobFilter"><option value="">All jobs</option>${setOptions(jobOptions, state.selectedProductionJob, (job) => job.name, (job) => job.id)}</select></label>
      </div>
      ${activeJob ? `<div class="notice compact-notice">Filtered to ${activeJob}. New production will be added to this job. <span class="es">Filtrado a ${activeJob}. La nueva produccion se agregara a este trabajo.</span></div>` : ""}
      ${!roleIsElevated() ? `<div class="notice section-gap">Showing only production assigned to ${state.currentForeman}. <span class="es">Solo se muestra produccion asignada a este mayordomo.</span></div>` : ""}
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
  const isWind = selectedJob?.jobType === "Wind Farm";
  const isCustom = selectedJob?.customTracking?.length;
  if (isWind) {
    const foundationIds = selectedJob.foundationIds || [];
    return `
      <div class="production-add-grid wind-production-add section-gap">
        <label>Job<span class="es">Trabajo</span><select id="newProdJob">${setOptions(selectedJobs(), defaultJob, (job) => job.name, (job) => job.id)}</select></label>
        <label>Foundation ID<span class="es">Cimentacion</span><select id="newFoundationId">${foundationIds.length ? setOptions(foundationIds, foundationIds[0]) : '<option value="">No IDs set up</option>'}</select></label>
        <label>Component<span class="es">Parte</span><select id="newFoundationComponent">${setOptions(windFoundationComponents, windFoundationComponents[0])}</select></label>
        <label>Foreman<span class="es">Mayordomo</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), state.currentForeman)}</select></label>
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
        <label>Foreman<span class="es">Mayordomo</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), state.currentForeman)}</select></label>
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
      <label>Foreman<span class="es">Mayordomo</span><select id="newProdForeman" ${state.selectedRole === "Foreman" ? "disabled" : ""}>${setOptions(foremenForArea().map((person) => person.name), state.currentForeman)}</select></label>
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
  const canEdit = ["Admin", "Payroll"].includes(state.selectedRole) || (state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman);
  return `
    <article class="production-card">
      <header class="production-card-header">
        <div>
          <h3>${item.code} - ${item.description}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
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
  const canEdit = ["Admin", "Payroll"].includes(state.selectedRole) || (state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman);
  return `
    <article class="production-card">
      <header class="production-card-header">
        <div>
          <h3>${item.description}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
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
  const canEdit = ["Admin", "Payroll"].includes(state.selectedRole) || (state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman);
  return `
    <article class="production-card foundation-card">
      <header class="production-card-header">
        <div>
          <h3>${item.foundationId} - ${item.component}</h3>
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || "Unassigned"}</p>
          <span class="tag status-tag" data-prod-review="${item.id}">${item.reviewStatus || "Draft"}</span>
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
  const areaOptions = Object.entries(areas).map(([id, info]) => ({ id, name: info.label }));
  const isSolar = state.selectedArea === "solarPiles";
  const jobTypes = jobTypeOptionsForArea();
  const selectedJobType = isSolar ? "" : state.jobDraftType || jobTypes[0] || "";
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
            <label>Assign to foreman<span class="es">Asignar a mayordomo</span><select id="jobProdForeman"><option value="">Unassigned</option>${setOptions(foremenForArea().map((person) => person.name), "")}</select></label>
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
            ${state.jobs
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
              .join("")}
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

function renderDocuments() {
  const canManage = ["Admin", "Payroll"].includes(state.selectedRole);
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
            <label>Upload document<span class="es">Subir documento</span><input id="jobDocumentFile" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx" multiple /></label>
          ` : `<div class="notice compact-notice">Only Admin/Payroll can upload or delete job documents. <span class="es">Solo Admin/Payroll puede subir o borrar documentos.</span></div>`}
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

function renderDeliverables() {
  const sheet = currentSheet();
  const canExportPayroll = ["Admin", "Payroll"].includes(state.selectedRole);
  const canExportEmployee = roleIsElevated();
  const employees = uniqueEmployees();
  const selectedEmployee = state.selectedEmployeeReport && employees.includes(state.selectedEmployeeReport) ? state.selectedEmployeeReport : employees[0] || "";
  const employeeArea = state.selectedEmployeeReportArea || "all";
  const fromWeek = state.weeks.includes(state.selectedEmployeeReportFromWeek) ? state.selectedEmployeeReportFromWeek : state.selectedWeek;
  const toWeek = state.weeks.includes(state.selectedEmployeeReportToWeek) ? state.selectedEmployeeReportToWeek : fromWeek;
  const employeeRecords = employeeReportRecords(selectedEmployee, fromWeek, toWeek, employeeArea);
  const employeeTotals = employeeReportTotals(employeeRecords);
  const generatedAt = new Date().toLocaleDateString("en-US");
  return `
    <section class="panel deliverables-report">
      <div class="print-report-header">
        <img src="./assets/crewforge-app-icon.png" alt="CrewForge" />
        <div>
          <p class="eyebrow">CrewForge Report</p>
          <h2>${areas[state.selectedArea]?.label || "CrewForge"} ${t("Deliverables", "Entregables")}</h2>
          <p>${state.selectedWeek} · Generated ${generatedAt}</p>
        </div>
      </div>
      <div class="split">
        <div><h2>${t("Deliverables", "Entregables")}</h2><p class="sub">Choose the package payroll or management needs.</p></div>
      </div>
      <div class="form-grid section-gap report-controls no-print">
        <label>Total period<span class="es">Periodo total</span><select id="periodSelect">${setOptions(["This week", "This month", "Custom weeks"], "This week")}</select></label>
        <label>From week<span class="es">Desde semana</span><select id="fromWeek">${setOptions(state.weeks, state.selectedWeek)}</select></label>
        <label>To week<span class="es">Hasta semana</span><select id="toWeek">${setOptions(state.weeks, state.selectedWeek)}</select></label>
        <button class="secondary-action" data-print="deliverables">${t("Export PDF", "Exportar PDF")}</button>
        ${canExportPayroll ? `<button class="secondary-action" id="exportPayrollCsv" type="button">${t("Export Payroll CSV", "Exportar CSV nomina")}</button>` : ""}
      </div>
      <div class="metric-grid section-gap">
        <article class="metric"><span>Hours</span><strong>${number(totalHours(sheet))}</strong><small>Selected week</small></article>
        ${area().perDiem ? `<article class="metric"><span>Per diem</span><strong>${money(totalPerDiem(sheet))}</strong><small>Installation only</small></article>` : ""}
        <article class="metric"><span>Production completed</span><strong>${number(productionTotals().completed)}</strong><small>Selected area</small></article>
        <article class="metric"><span>Delays</span><strong>${productionTotals().delayed}</strong><small>Production issues</small></article>
      </div>
      <div class="report-grid section-gap">
        <div class="table-wrap">${timesheetSummaryTable(sheet)}</div>
        <div class="table-wrap">${productionSummaryTable()}</div>
      </div>
      <div class="employee-report section-gap">
        <div class="split">
          <div>
            <h3>${t("Employee Report", "Reporte de trabajador")}</h3>
            <p class="sub">Pick one employee to see their timesheet history across crews, jobs, and weeks.</p>
          </div>
          <div class="button-group no-print">
            <button class="secondary-action" data-print="employee-report" type="button">${t("Export PDF", "Exportar PDF")}</button>
            ${canExportEmployee ? `<button class="secondary-action" id="exportEmployeeCsv" type="button">${t("Export Employee CSV", "Exportar CSV trabajador")}</button>` : ""}
          </div>
        </div>
        <div class="form-grid section-gap no-print">
          <label>Employee<span class="es">Trabajador</span><select id="employeeReportSelect">${setOptions(employees, selectedEmployee)}</select></label>
          <label>Operating area<span class="es">Area de trabajo</span><select id="employeeReportArea"><option value="all" ${employeeArea === "all" ? "selected" : ""}>All areas</option>${Object.entries(areas).map(([id, details]) => `<option value="${id}" ${employeeArea === id ? "selected" : ""}>${details.label}</option>`).join("")}</select></label>
          <label>From week<span class="es">Desde semana</span><select id="employeeReportFromWeek">${setOptions(state.weeks, fromWeek)}</select></label>
          <label>To week<span class="es">Hasta semana</span><select id="employeeReportToWeek">${setOptions(state.weeks, toWeek)}</select></label>
        </div>
        <div class="metric-grid section-gap">
          <article class="metric"><span>Total paid hours</span><strong>${preciseNumber(employeeTotals.total)}</strong><small>${employeeTotals.weeks} week(s)</small></article>
          <article class="metric"><span>Regular hours</span><strong>${preciseNumber(employeeTotals.regular)}</strong><small>Across selected period</small></article>
          <article class="metric"><span>PTO / Sick</span><strong>${preciseNumber(employeeTotals.pto)} / ${preciseNumber(employeeTotals.sick)}</strong><small>Paid leave hours</small></article>
          <article class="metric"><span>Per diem / Gross</span><strong>${money(employeeTotals.perDiem)}</strong><small>Gross est. ${money(employeeTotals.gross)}</small></article>
        </div>
        <div class="table-wrap section-gap employee-report-table">${employeeReportTable(employeeRecords)}</div>
      </div>
    </section>
  `;
}

function renderSetup() {
  const admin = ["Admin", "Payroll"].includes(state.selectedRole);
  if (area().mode === "crew") return renderCrewSetup(admin);
  return renderShiftSetup(admin);
}

function renderCrewSetup(admin) {
  const foreman = setupForemanName();
  const crew = crewNameForForeman(foreman);
  const crewMembers = peopleForArea().filter((person) => person.group === crew);
  const availableWorkers = peopleForArea().filter((person) => person.role !== "Foreman" && person.group !== crew);
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("People / Crews", "Personas / Cuadrillas")}</h2><p class="sub">Select a foreman to manage the default crew assigned to that foreman.</p></div>
      </div>
      ${!admin ? `<div class="notice">Only Payroll/Admin can permanently change people or crews. <span class="es">Solo Payroll/Admin puede cambiar cuadrillas permanentes.</span></div>` : ""}
      <div class="form-grid section-gap">
        <label>Foreman<span class="es">Mayordomo</span><select id="setupForemanSelect">${setOptions(foremenForArea().map((person) => person.name), foreman)}</select></label>
        <label>Crew<span class="es">Cuadrilla</span><input value="${crew}" disabled /></label>
        <label>Crew size<span class="es">Integrantes</span><input value="${crewMembers.length}" disabled /></label>
      </div>
      <div class="crew-add-grid section-gap">
        <label>Add existing worker<span class="es">Agregar trabajador existente</span><select id="crewExistingWorker" ${!admin ? "disabled" : ""}><option value="">Select worker</option>${setOptions(availableWorkers, "", (person) => `${person.name} - ${person.role}`, (person) => person.name)}</select></label>
        <label>Or type new name<span class="es">O escriba nombre nuevo</span><input id="crewNewName" placeholder="Name" ${!admin ? "disabled" : ""} /></label>
        <label>Role<span class="es">Puesto</span><select id="crewNewRole" ${!admin ? "disabled" : ""}>${setOptions(area().roles.filter((role) => role !== "Foreman"), "Rodbuster")}</select></label>
        <label>Hourly rate<span class="es">Pago por hora</span><div class="money-input"><span>$</span><input id="crewHourlyRate" type="number" min="0" step="0.01" placeholder="0.00" ${!admin ? "disabled" : ""} /></div></label>
        <label class="check-label"><input id="crewNewDol" type="checkbox" ${!admin ? "disabled" : ""} /> DOL apprentice</label>
        <button class="primary-action compact-add" id="addCrewPerson" type="button" ${!admin ? "disabled" : ""}>${t("Add", "Agregar")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Crew</th><th>Hourly rate</th><th>DOL</th><th>Actions</th></tr></thead>
          <tbody>
            ${crewMembers
              .map((person) => `<tr>
                <td><strong>${person.name}</strong></td>
                <td><select class="table-select" data-person-field="role" data-person-name="${person.name}" ${!admin || person.role === "Foreman" ? "disabled" : ""}>${setOptions(area().roles, person.role)}</select></td>
                <td>${person.group}</td>
                <td><div class="money-input compact-money"><span>$</span><input data-person-field="hourlyRate" data-person-name="${person.name}" type="number" min="0" step="0.01" value="${person.hourlyRate || 0}" ${!admin ? "disabled" : ""} /></div></td>
                <td>${person.dol ? "Yes" : "No"}</td>
                <td>${person.role === "Foreman" ? '<span class="tag">Foreman</span>' : `<button class="danger-action table-action" data-remove-crew-person="${person.name}" type="button" ${!admin ? "disabled" : ""}>Remove<span class="es">Quitar</span></button>`}</td>
              </tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderShiftSetup(admin) {
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("People / Shifts", "Personas / Turnos")}</h2><p class="sub">Admin keeps default day or night shift assignments here.</p></div>
      </div>
      ${!admin ? `<div class="notice">Only Payroll/Admin can permanently change people or shifts. <span class="es">Solo Payroll/Admin puede cambiar turnos permanentes.</span></div>` : ""}
      <div class="people-form section-gap">
        <label>Name<span class="es">Nombre</span><input id="personName" ${!admin ? "disabled" : ""} /></label>
        <label>Role<span class="es">Puesto</span><select id="personRole" ${!admin ? "disabled" : ""}>${setOptions(area().roles, area().roles[1] || area().roles[0])}</select></label>
        <label>Default shift<span class="es">Turno</span><select id="personGroup" ${!admin ? "disabled" : ""}>${setOptions(groupOptions(), groupOptions()[0] || "")}</select></label>
        <label>Hourly rate<span class="es">Pago por hora</span><div class="money-input"><span>$</span><input id="personHourlyRate" type="number" min="0" step="0.01" placeholder="0.00" ${!admin ? "disabled" : ""} /></div></label>
        <button class="primary-action" id="savePerson" type="button" ${!admin ? "disabled" : ""}>${t("Save person", "Guardar persona")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Shift</th><th>Hourly rate</th><th>Actions</th></tr></thead>
          <tbody>
            ${peopleForArea()
              .map((person) => `<tr>
                <td><strong>${person.name}</strong></td>
                <td><select class="table-select" data-person-field="role" data-person-name="${person.name}" ${!admin || person.role === "Foreman" ? "disabled" : ""}>${setOptions(area().roles, person.role)}</select></td>
                <td><select class="table-select" data-person-field="group" data-person-name="${person.name}" ${!admin ? "disabled" : ""}>${setOptions(groupOptions(), person.group || groupOptions()[0] || "")}</select></td>
                <td><div class="money-input compact-money"><span>$</span><input data-person-field="hourlyRate" data-person-name="${person.name}" type="number" min="0" step="0.01" value="${person.hourlyRate || 0}" ${!admin ? "disabled" : ""} /></div></td>
                <td><button class="danger-action table-action" data-remove-person="${person.name}" type="button" ${!admin || person.role === "Foreman" ? "disabled" : ""}>Delete<span class="es">Borrar</span></button></td>
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

function bindTabEvents() {
  document.querySelectorAll("[data-print]").forEach((button) => button.addEventListener("click", () => window.print()));

  const sheet = currentSheet();
  const editable = canEditSheet(sheet);

  if ($("sheetJob")) $("sheetJob").addEventListener("change", (event) => updateSheet({ jobId: event.target.value }));
  if ($("sheetForeman")) {
    $("sheetForeman").addEventListener("change", (event) => {
      if (!editable) return;
      state.currentForeman = event.target.value;
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
    const handler = (event) => {
      if (!editable) return;
      const row = sheet.rows[Number(event.target.dataset.row)];
      const field = event.target.dataset.field;
      const textFields = ["notes", "employee", "roleOverride"];
      if (field.startsWith("lightDuty.")) {
        const day = field.split(".")[1];
        row.lightDuty = row.lightDuty || {};
        row.lightDuty[day] = event.target.checked;
      } else {
        row[field] = textFields.includes(field) ? event.target.value : Number(event.target.value);
      }
      if (field === "employee") {
        row.employee = event.target.value;
        row.roleOverride = "";
        row.borrowed = !peopleForArea().some((person) => person.name === row.employee && person.group === sheet.group);
      }
      sheet.status = "Draft";
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
  if ($("jobDocumentFile")) $("jobDocumentFile").addEventListener("change", uploadJobDocuments);
  if ($("addProduction")) $("addProduction").addEventListener("click", addProduction);
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
  if ($("employeeReportFromWeek")) {
    $("employeeReportFromWeek").addEventListener("change", (event) => {
      state.selectedEmployeeReportFromWeek = event.target.value;
      if (state.selectedEmployeeReportToWeek < state.selectedEmployeeReportFromWeek) {
        state.selectedEmployeeReportToWeek = state.selectedEmployeeReportFromWeek;
      }
      saveState();
      render();
    });
  }
  if ($("employeeReportToWeek")) {
    $("employeeReportToWeek").addEventListener("change", (event) => {
      state.selectedEmployeeReportToWeek = event.target.value;
      if (state.selectedEmployeeReportFromWeek > state.selectedEmployeeReportToWeek) {
        state.selectedEmployeeReportFromWeek = state.selectedEmployeeReportToWeek;
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

  document.querySelectorAll("[data-add-person]").forEach((button) => {
    button.addEventListener("click", () => {
      const person = personByName(button.dataset.addPerson);
      if (person) addPersonRow(person, true);
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

  document.querySelectorAll("[data-prod]").forEach((input) => {
    input.addEventListener("input", updateProductionItem);
    input.addEventListener("change", updateProductionItem);
  });
}

function updateSheet(values, message) {
  Object.assign(currentSheet(), values);
  saveState();
  render();
  if (message) showToast(message);
}

function submitSheet() {
  const sheet = currentSheet();
  const stamp = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
  Object.assign(sheet, {
    status: "Submitted",
    submittedBy: isForemanMode() ? state.currentForeman : state.selectedRole,
    submittedAt: stamp
  });
  saveState();
  render();
  showToast("Week submitted");
}

function submitProduction() {
  const items = productionForArea().filter((item) => {
    if (["Admin", "Payroll"].includes(state.selectedRole)) return true;
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
  });
  saveState();
  render();
  showToast("Production submitted");
}

function exportPayrollCsv() {
  const sheet = currentSheet();
  const headers = ["Area", "Week ending", "Foreman", "Job", "Employee", "Role", "Regular hours", "PTO", "Sick", "Total hours", "Per diem", "Hourly rate", "Estimated gross pay", "Notes"];
  const rows = sheet.rows.map((row) => {
    const person = personByName(row.employee) || {};
    const regular = rowHours(row);
    const pto = Number(row.pto) || 0;
    const sick = Number(row.sick) || 0;
    const total = regular + pto + sick;
    const perDiem = Number(row.perDiem) || 0;
    const rate = Number(person.hourlyRate) || 0;
    const gross = total * rate + perDiem;
    return [
      area().label,
      sheet.week,
      sheet.foreman,
      jobName(sheet.jobId),
      row.employee,
      rowRole(row),
      regular,
      pto,
      sick,
      total,
      perDiem,
      rate,
      gross.toFixed(2),
      row.notes || ""
    ];
  });
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const filename = `crewforge-payroll-${state.selectedArea}-${state.selectedWeek}.csv`;
  downloadFile(filename, csv);
  showToast("Payroll CSV exported");
}

function exportEmployeeCsv() {
  const employees = uniqueEmployees();
  const employee = state.selectedEmployeeReport && employees.includes(state.selectedEmployeeReport) ? state.selectedEmployeeReport : employees[0] || "";
  const fromWeek = state.weeks.includes(state.selectedEmployeeReportFromWeek) ? state.selectedEmployeeReportFromWeek : state.selectedWeek;
  const toWeek = state.weeks.includes(state.selectedEmployeeReportToWeek) ? state.selectedEmployeeReportToWeek : fromWeek;
  const records = employeeReportRecords(employee, fromWeek, toWeek, state.selectedEmployeeReportArea || "all");
  const headers = ["Employee", "Week ending", "Area", "Job", "Foreman", "Crew/shift", "Role", "Regular hours", "PTO", "Sick", "Total hours", "Per diem", "Hourly rate", "Estimated gross pay", "Borrowed", "DOL", "Light duty days", "Status", "Notes"];
  const rows = records.map((record) => [
    record.employee,
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
  downloadFile(`crewforge-employee-${safeName}-${fromWeek}-to-${toWeek}.csv`, csv);
  showToast("Employee CSV exported");
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
  saveState();
  render();
  showToast(`${person.name} added to this week only`);
}

function addCrewPerson() {
  const foreman = setupForemanName();
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
  saveState();
  render();
  showToast(`${person.name} added to ${crew}`);
}

function removeCrewPerson(name) {
  const person = personByName(name);
  if (!person || person.role === "Foreman") return;
  if (!confirm(`Remove ${name} from this crew?`)) return;
  const oldCrew = person.group;
  person.group = "";
  if (oldCrew) syncSheetsForCrew(state.selectedArea, oldCrew);
  saveState();
  render();
  showToast(`${name} removed from crew`);
}

function updatePersonField(event) {
  if (!["Admin", "Payroll"].includes(state.selectedRole)) return;
  const person = personByName(event.target.dataset.personName);
  if (!person) return;
  const field = event.target.dataset.personField;
  person[field] = field === "hourlyRate" ? Number(event.target.value) || 0 : event.target.value;
  saveState();
  showToast(`${person.name} updated`);
}

function removePerson(name) {
  const person = personByName(name);
  if (!person || person.role === "Foreman") return;
  if (!confirm(`Delete ${name}?`)) return;
  state.people = state.people.filter((entry) => entry.name !== name || entry.area !== state.selectedArea);
  saveState();
  render();
  showToast(`${name} deleted`);
}

function removeProductionItem(id) {
  const item = state.production.find((entry) => entry.id === id);
  if (!item) return;
  const canEdit = ["Admin", "Payroll"].includes(state.selectedRole) || (state.selectedRole === "Foreman" && (item.foreman || state.currentForeman) === state.currentForeman);
  if (!canEdit) return;
  if (!confirm(`Remove ${item.code} from production?`)) return;
  state.production = state.production.filter((entry) => entry.id !== id);
  saveState();
  render();
  showToast(`${item.code} removed`);
}

function addProduction() {
  const selectedJobId = $("newProdJob").value;
  const selectedJob = jobById(selectedJobId);
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
    state.production.push({
      id: `p${Date.now()}`,
      area: state.selectedArea,
      productionMode: "foundation",
      foreman: state.selectedRole === "Foreman" ? state.currentForeman : $("newProdForeman").value,
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
    });
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
    state.production.push({
      id: `p${Date.now()}`,
      area: state.selectedArea,
      productionMode: "custom",
      foreman: state.selectedRole === "Foreman" ? state.currentForeman : $("newProdForeman").value,
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
    });
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
  state.production.push({
    id: `p${Date.now()}`,
    area: state.selectedArea,
    foreman: state.selectedRole === "Foreman" ? state.currentForeman : $("newProdForeman").value,
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
  });
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

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function uploadJobDocuments(event) {
  if (!["Admin", "Payroll"].includes(state.selectedRole)) return;
  const jobId = $("documentJobSelect")?.value || state.selectedDocumentJob;
  const job = state.jobs.find((entry) => entry.id === jobId);
  const files = Array.from(event.target.files || []);
  if (!job || !files.length) return;

  const oversized = files.find((file) => file.size > MAX_DEMO_DOCUMENT_BYTES);
  if (oversized) {
    showToast(`${oversized.name} is over the 5 MB demo limit`);
    event.target.value = "";
    return;
  }

  const type = $("documentTypeSelect")?.value || "Other";
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
  }
  event.target.value = "";
  state.selectedDocumentJob = job.id;
  saveState();
  render();
  showToast(`${files.length} document${files.length === 1 ? "" : "s"} uploaded`);
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
  if (!["Admin", "Payroll"].includes(state.selectedRole)) return;
  if (!confirm(`Delete ${doc.name} from ${job.name}?`)) return;
  job.documents = (job.documents || []).filter((entry) => entry.id !== doc.id);
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
  state.jobs.push({
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
  });
  if (hasProductionSetup) {
    state.production.push({
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
    });
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
  job.status = status;
  if (state.selectedProductionJob === jobId && status !== "Active") {
    state.selectedProductionJob = "";
  }
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
  saveState();
  render();
  showToast(`${job.name} deleted`);
}

function duplicateWeek() {
  const nextDate = new Date(`${state.selectedWeek}T00:00:00`);
  nextDate.setDate(nextDate.getDate() + 7);
  const week = prompt("Duplicate to week ending:", nextDate.toISOString().slice(0, 10));
  if (!week) return;
  const copy = structuredClone(currentSheet());
  copy.week = week;
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
  item[field] = ["completed", "completedQty", "planned", "quantity"].includes(field) ? Number(event.target.value) : event.target.value;
  if (item.productionMode === "custom") {
    item.completed = Number(item.completedQty) || 0;
    item.quantity = Number(item.planned) || 0;
    item.status = item.planned && item.completed >= item.planned ? "Complete" : item.completed > 0 ? "In Progress" : "Not Started";
    item.reviewStatus = "Draft";
    item.submittedAt = "";
    item.submittedBy = "";
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
  if (!state.auth) renderLogin();
  else if (!state.selectedArea) renderGate();
  else renderShell();
}

render();
initCloud();
