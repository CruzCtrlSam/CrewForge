const STORAGE_KEY = "valor-ops-demo-v7";

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const areas = {
  rebarFab: {
    label: "Rebar Fabrication",
    es: "Fabricacion de varilla",
    mode: "shift",
    roles: ["Foreman", "Machine Operator", "Helper"],
    pto: true,
    sick: true,
    perDiem: false,
    dol: false
  },
  solarPiles: {
    label: "Solar Piles Fabrication",
    es: "Fabricacion de pilotes solares",
    mode: "shift",
    roles: ["Foreman", "Machine Operator", "Helper"],
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
const shifts = ["Day Shift", "Night Shift"];
const appRoles = ["Foreman", "Payroll", "Management", "Admin"];
const foremanNames = ["Lidio Barron", "Gregorio Izaguirre", "Huguer Vazquez", "Hugo Martinez", "Paco", "Willie Vargas", "Erik", "Paul Featherhat"];
const appName = "CrewForge";
const appTagline = "Crew time and job progress, forged into one.";
const trialAccounts = [
  { code: "LIDIO", name: "Lidio Barron", role: "Foreman", foreman: "Lidio Barron" },
  { code: "HUGUER", name: "Huguer Vazquez", role: "Foreman", foreman: "Huguer Vazquez" },
  { code: "PAYROLL", name: "Payroll", role: "Payroll", foreman: "Lidio Barron" },
  { code: "MANAGER", name: "Management", role: "Management", foreman: "Lidio Barron" },
  { code: "ADMIN", name: "Admin", role: "Admin", foreman: "Lidio Barron" }
];

const defaultPeople = [
  ...foremanNames.map((name) => [name, "Foreman", "rebarInstall", `${name} Crew`, false]),
  ...foremanNames.map((name) => [name, "Foreman", "rebarFab", "", false]),
  ...foremanNames.map((name) => [name, "Foreman", "solarPiles", "", false]),
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
  ["Solar Operator", "Machine Operator", "solarPiles", "Day Shift", false],
  ["Solar Helper", "Helper", "solarPiles", "Night Shift", false]
].map(([name, role, area, group, dol]) => ({ name, role, area, group, dol }));

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
  setupForeman: "Lidio Barron",
  selectedRole: "Foreman",
  currentForeman: "Lidio Barron",
  weeks: ["2026-07-03", "2026-07-10", "2026-07-17", "2026-07-24"],
  people: defaultPeople,
  jobs: [
    { id: "concho", name: "Concho Field Install", number: "CON-2026", customer: "Concho", area: "rebarInstall", status: "Active" },
    { id: "bakersfield", name: "VS26-BRSFL - Bakersfield Sub Station", number: "VS26-BRSFL", customer: "Bakersfield", area: "rebarInstall", status: "Active" },
    { id: "buffalo-gap", name: "Buffalo Gap - IRA", number: "BG-IRA", customer: "Buffalo Gap", area: "rebarFab", status: "Active" },
    { id: "laurel", name: "Laurel", number: "LAU-2026", customer: "Laurel", area: "rebarFab", status: "Active" },
    { id: "solar-demo", name: "Solar Piles Demo Job", number: "SP-100", customer: "Solar", area: "solarPiles", status: "Active" }
  ],
  sheets: {},
  production: [
    ...bakersfieldControlCodes,
    { id: "p3", area: "rebarFab", foreman: "Lidio Barron", jobId: "buffalo-gap", code: "ACA", description: "Operator pads bundle", planned: 3595, completed: 1800, weekly: 900, bundle: "B-104", bundleStatus: "In production", delay: "No delay", delayNote: "", status: "In Progress" },
    { id: "p4", area: "rebarFab", foreman: "Huguer Vazquez", jobId: "laurel", code: "DYK", description: "Pier type bundle", planned: 6406, completed: 6406, weekly: 1200, bundle: "B-216", bundleStatus: "Shipped", delay: "No delay", delayNote: "", status: "Complete" },
    { id: "p5", area: "solarPiles", foreman: "Gregorio Izaguirre", jobId: "solar-demo", code: "ORCA-1001", description: "Solar pile batch", planned: 400, completed: 265, weekly: 80, delay: "No delay", delayNote: "", status: "In Progress" }
  ]
};

let state = loadState();
let toastTimer;

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
  next.production = next.production || [];
  bakersfieldControlCodes.forEach((seedItem) => {
    const exists = next.production.some((item) => item.jobId === seedItem.jobId && item.code === seedItem.code);
    if (!exists) next.production.push(structuredClone(seedItem));
  });
  next.production.forEach((item) => {
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      ["production", "Production Update", "Produccion"]
    ];
  }
  return [
    ["dashboard", "Dashboard", "Tablero"],
    ["timesheet", "Timesheet Review", "Revision de horas"],
    ["production", "Production", "Produccion"],
    ["jobs", "Jobs", "Trabajos"],
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

function sheetKey(week = state.selectedWeek, areaId = state.selectedArea) {
  return `${areaId}:${week}`;
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
    borrowed: false,
    notes: ""
  };
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

function currentSheet() {
  const key = sheetKey();
  if (!state.sheets[key]) state.sheets[key] = seedSheet();
  return state.sheets[key];
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
  const planned = items.reduce((sum, item) => sum + (Number(item.planned) || 0), 0);
  const completed = items.reduce((sum, item) => sum + completedWeight(item), 0);
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
        <img src="./assets/crewforge-logo-lockup.png" alt="CrewForge logo" />
        <div>
          <p class="eyebrow">Trial access</p>
          <h1>${t("Sign in", "Iniciar sesion")}</h1>
          <p class="sub">Use the assigned trial code so each person only opens the correct view.</p>
        </div>
        <label>Access code<span class="es">Codigo de acceso</span><input id="accessCode" autocomplete="one-time-code" placeholder="Example: LIDIO" /></label>
        <button class="primary-action" id="loginButton" type="button">${t("Open CrewForge", "Abrir CrewForge")}</button>
        <div class="trial-note">
          <strong>Trial codes</strong>
          <span>Foreman: LIDIO or HUGUER</span>
          <span>Office: PAYROLL, MANAGER, or ADMIN</span>
          <span class="es">Codigos de prueba para esta demo.</span>
        </div>
        <p class="sub login-limit">This is trial access for workflow testing. Real company use still needs hosted login and server-side permissions.</p>
      </section>
    </main>
  `;
  $("loginButton").addEventListener("click", loginWithCode);
  $("accessCode").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loginWithCode();
  });
  $("accessCode").focus();
}

function loginWithCode() {
  const code = $("accessCode").value.trim().toUpperCase();
  const account = trialAccounts.find((entry) => entry.code === code);
  if (!account) {
    showToast("Code not recognized");
    return;
  }
  state.auth = { name: account.name, role: account.role, code: account.code };
  state.selectedRole = account.role;
  state.currentForeman = account.foreman;
  state.setupForeman = account.foreman;
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
          <img src="./assets/crewforge-logo-lockup.png" alt="CrewForge logo" />
          <div>
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
          <img class="brand-logo" src="./assets/crewforge-app-icon.png" alt="CrewForge logo" />
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
          <div>
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
      state.currentForeman = account?.foreman || state.currentForeman;
      state.setupForeman = account?.foreman || state.setupForeman;
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
      <thead><tr><th>Code</th><th>Job</th><th>Amount</th><th>Completed weight</th><th>Delay</th></tr></thead>
      <tbody>
        ${productionForArea()
          .map((item) => `<tr><td><strong>${item.code}</strong></td><td>${jobName(item.jobId)}</td><td>${preciseNumber(item.completedQty || 0)} / ${productionQuantity(item) || "-"}</td><td>${number(completedWeight(item))} lbs</td><td>${item.delay}</td></tr>`)
          .join("")}
      </tbody>
    </table>
  `;
}

function renderTimesheet() {
  const sheet = currentSheet();
  const editable = canEditSheet(sheet);
  const groupingLabel = area().mode === "crew" ? "Crew" : "Shift";
  const useCards = isForemanMode();
  const showTimesheetJob = state.selectedArea === "rebarInstall";
  const helperText =
    area().mode === "crew"
      ? t("Choose a crew and it auto-fills the assigned workers.", "Escoja una cuadrilla y se llenan los trabajadores asignados.")
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
        <label>${groupingLabel}<span class="es">${area().mode === "crew" ? "Cuadrilla" : "Turno"}</span><select id="sheetGroup" ${!editable ? "disabled" : ""}>${setOptions(groupOptions(), sheet.group)}</select></label>
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
  return `
    <div class="foreman-grid-wrap section-gap ${!editable ? "locked" : ""}">
      <table class="foreman-entry-grid">
        <thead>
          <tr>
            <th>Worker<span class="es">Trabajador</span></th>
            ${dayLabels.map((label, index) => `<th>${label}<span class="es">${["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][index]}</span></th>`).join("")}
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
      ${days.map((day) => `<td><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} /></td>`).join("")}
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
        ${days.map((day, dayIndex) => `<label>${dayLabels[dayIndex]}<span class="es">${["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"][dayIndex]}</span><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} /></label>`).join("")}
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
  return `
    <div class="add-worker-grid section-gap">
      <label class="worker-add-existing">Add existing worker<span class="es">Agregar trabajador existente</span><select id="borrowWorker"><option value="">Select worker</option>${setOptions(allWorkers, "")}</select></label>
      <label class="worker-add-name">Or type new name<span class="es">O escriba nombre nuevo</span><input id="manualWorker" placeholder="Name" /></label>
      <label class="worker-add-role">Role<span class="es">Puesto</span><select id="manualRole">${setOptions(area().roles, area().roles[1] || area().roles[0])}</select></label>
      <label class="worker-add-group">${area().mode === "crew" ? "Crew" : "Shift"}<span class="es">${area().mode === "crew" ? "Cuadrilla" : "Turno"}</span><select id="manualGroup">${setOptions(groupOptions(), currentSheet().group)}</select></label>
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
      ${days.map((day) => `<td><input data-row="${index}" data-field="${day}" type="number" min="0" step="0.25" value="${row[day] || 0}" ${disabled} /></td>`).join("")}
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
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t(isForemanMode() ? "Production Update" : "Production", "Produccion")}</h2><p class="sub">Track jobs, control codes, bundles, status, and delays.</p></div>
        <button class="secondary-action" data-print="production">${t("Export PDF", "Exportar PDF")}</button>
      </div>
      <div class="form-grid section-gap">
        <label>Job filter<span class="es">Filtro de trabajo</span><select id="productionJobFilter"><option value="">All jobs</option>${setOptions(jobOptions, state.selectedProductionJob, (job) => job.name, (job) => job.id)}</select></label>
      </div>
      ${!roleIsElevated() ? `<div class="notice section-gap">Showing only production assigned to ${state.currentForeman}. <span class="es">Solo se muestra produccion asignada a este mayordomo.</span></div>` : ""}
      ${canAddProduction ? renderProductionAdder() : ""}
      <div class="production-board section-gap">
        ${productionForArea().map(renderProductionCard).join("") || `<div class="empty-state">No production items for this job yet.<span class="es">No hay produccion para este trabajo.</span></div>`}
      </div>
    </section>
  `;
}

function renderProductionAdder() {
  return `
    <div class="production-add-grid section-gap">
      <label>Job<span class="es">Trabajo</span><select id="newProdJob">${setOptions(selectedJobs(), selectedJobs()[0]?.id || "", (job) => job.name, (job) => job.id)}</select></label>
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
          <p class="sub">${jobName(item.jobId)} · ${item.foreman || state.currentForeman}</p>
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
          <div class="production-fields three-up">
            <label>Amount completed<span class="es">Cantidad terminada</span><input data-prod="${item.id}" data-field="completedQty" type="number" min="0" step="1" ${quantity ? `max="${quantity}"` : ""} value="${item.completedQty || 0}" ${!canEdit ? "disabled" : ""} /></label>
            <label>Completed weight<span class="es">Peso terminado</span><input data-prod-weight="${item.id}" type="text" value="${number(weightDone)} lbs" readonly /></label>
            <label>Weight completed this week<span class="es">Peso terminado esta semana</span><input data-prod="${item.id}" data-field="weekly" type="number" value="${item.weekly}" ${!canEdit ? "disabled" : ""} /></label>
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

function renderJobs() {
  const admin = ["Admin", "Payroll"].includes(state.selectedRole);
  const areaOptions = Object.entries(areas).map(([id, info]) => ({ id, name: info.label }));
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("Jobs", "Trabajos")}</h2><p class="sub">Office users add jobs here. Foremen only pick from active jobs assigned to their operating area.</p></div>
      </div>
      ${!admin ? `<div class="notice">Only Payroll/Admin can add or change jobs. <span class="es">Solo Payroll/Admin puede agregar o cambiar trabajos.</span></div>` : ""}
      <div class="form-grid section-gap">
        <label>Operating area<span class="es">Area de trabajo</span><select id="jobArea" ${!admin ? "disabled" : ""}>${setOptions(areaOptions, state.selectedArea, (item) => item.name, (item) => item.id)}</select></label>
        <label>Job name<span class="es">Nombre del trabajo</span><input id="jobNameInput" placeholder="Project name" ${!admin ? "disabled" : ""} /></label>
        <label>Job number<span class="es">Numero</span><input id="jobNumberInput" placeholder="Optional" ${!admin ? "disabled" : ""} /></label>
        <label>Customer<span class="es">Cliente</span><input id="jobCustomerInput" placeholder="Optional" ${!admin ? "disabled" : ""} /></label>
        <label>Status<span class="es">Estado</span><select id="jobStatusInput" ${!admin ? "disabled" : ""}>${setOptions(["Active", "On Hold", "Complete"], "Active")}</select></label>
        <button class="primary-action" id="saveJob" type="button" ${!admin ? "disabled" : ""}>${t("Add job", "Agregar trabajo")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Job</th><th>Area</th><th>Number</th><th>Customer</th><th>Status</th></tr></thead>
          <tbody>
            ${state.jobs
              .map((job) => `<tr><td><strong>${job.name}</strong></td><td>${areas[job.area]?.label || job.area}</td><td>${job.number || ""}</td><td>${job.customer || ""}</td><td><span class="tag">${job.status || "Active"}</span></td></tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDeliverables() {
  const sheet = currentSheet();
  return `
    <section class="panel">
      <div class="split">
        <div><h2>${t("Deliverables", "Entregables")}</h2><p class="sub">Choose the package payroll or management needs.</p></div>
      </div>
      <div class="form-grid section-gap">
        <label>Total period<span class="es">Periodo total</span><select id="periodSelect">${setOptions(["This week", "This month", "Custom weeks"], "This week")}</select></label>
        <label>From week<span class="es">Desde semana</span><select id="fromWeek">${setOptions(state.weeks, state.selectedWeek)}</select></label>
        <label>To week<span class="es">Hasta semana</span><select id="toWeek">${setOptions(state.weeks, state.selectedWeek)}</select></label>
        <button class="secondary-action" data-print="deliverables">${t("Export PDF", "Exportar PDF")}</button>
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
        <label class="check-label"><input id="crewNewDol" type="checkbox" ${!admin ? "disabled" : ""} /> DOL apprentice</label>
        <button class="primary-action compact-add" id="addCrewPerson" type="button" ${!admin ? "disabled" : ""}>${t("Add", "Agregar")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Crew</th><th>DOL</th><th>Actions</th></tr></thead>
          <tbody>
            ${crewMembers
              .map((person) => `<tr><td><strong>${person.name}</strong></td><td>${person.role}</td><td>${person.group}</td><td>${person.dol ? "Yes" : "No"}</td><td>${person.role === "Foreman" ? '<span class="tag">Foreman</span>' : `<button class="danger-action table-action" data-remove-crew-person="${person.name}" type="button" ${!admin ? "disabled" : ""}>Remove<span class="es">Quitar</span></button>`}</td></tr>`)
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
        <button class="primary-action" id="savePerson" type="button" ${!admin ? "disabled" : ""}>${t("Save person", "Guardar persona")}</button>
      </div>
      <div class="table-wrap section-gap">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Shift</th><th>Actions</th></tr></thead>
          <tbody>
            ${peopleForArea()
              .map((person) => `<tr><td><strong>${person.name}</strong></td><td>${person.role}</td><td>${person.group || ""}</td><td><button class="danger-action table-action" data-remove-person="${person.name}" type="button" ${!admin || person.role === "Foreman" ? "disabled" : ""}>Delete<span class="es">Borrar</span></button></td></tr>`)
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
  if ($("sheetForeman")) $("sheetForeman").addEventListener("change", (event) => updateSheet({ foreman: event.target.value }));
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
      const group = event.target.value;
      const foreman = sheet.foreman;
      const workers = peopleForArea().filter((person) => person.group === group || person.name === foreman);
      sheet.group = group;
      sheet.rows = workers.map(blankRow);
      sheet.status = "Draft";
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
      row[field] = textFields.includes(field) ? event.target.value : Number(event.target.value);
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
  if ($("duplicateWeek")) $("duplicateWeek").addEventListener("click", duplicateWeek);
  if ($("savePerson")) $("savePerson").addEventListener("click", savePerson);
  if ($("addCrewPerson")) $("addCrewPerson").addEventListener("click", addCrewPerson);
  if ($("saveJob")) $("saveJob").addEventListener("click", saveJob);
  if ($("addProduction")) $("addProduction").addEventListener("click", addProduction);
  if ($("newProdDescription")) {
    $("newProdDescription").addEventListener("input", (event) => {
      const parsedQuantity = quantityFromDescription(event.target.value);
      if (parsedQuantity && $("newProdQuantity") && !$("newProdQuantity").value) {
        $("newProdQuantity").value = parsedQuantity;
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

  document.querySelectorAll("[data-remove-person]").forEach((button) => {
    button.addEventListener("click", () => removePerson(button.dataset.removePerson));
  });

  document.querySelectorAll("[data-remove-production]").forEach((button) => {
    button.addEventListener("click", () => removeProductionItem(button.dataset.removeProduction));
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

function addWorkerToWeek() {
  const selected = $("borrowWorker")?.value;
  const manualName = $("manualWorker")?.value.trim();
  let person = selected ? personByName(selected) : null;
  if (!person && manualName) {
    person = { name: manualName, role: $("manualRole").value, area: state.selectedArea, group: $("manualGroup").value, dol: $("manualDol")?.checked || false };
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
      dol: $("crewNewDol")?.checked || false
    };
    state.people.push(person);
  } else if (person) {
    person.group = crew;
    person.area = state.selectedArea;
    person.role = person.role === "Foreman" ? person.role : $("crewNewRole").value || person.role;
    person.dol = $("crewNewDol")?.checked || person.dol || false;
  }

  if (!person) {
    showToast("Select or type a worker");
    return;
  }

  saveState();
  render();
  showToast(`${person.name} added to ${crew}`);
}

function removeCrewPerson(name) {
  const person = personByName(name);
  if (!person || person.role === "Foreman") return;
  if (!confirm(`Remove ${name} from this crew?`)) return;
  person.group = "";
  saveState();
  render();
  showToast(`${name} removed from crew`);
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
    weekly: 0,
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

function savePerson() {
  const name = $("personName").value.trim();
  if (!name) {
    showToast("Enter a name");
    return;
  }
  const existing = personByName(name);
  const next = { name, role: $("personRole").value, area: state.selectedArea, group: $("personGroup").value, dol: $("personDol")?.checked || false };
  if (existing) Object.assign(existing, next);
  else state.people.push(next);
  saveState();
  render();
  showToast(`${name} saved`);
}

function saveJob() {
  const name = $("jobNameInput").value.trim();
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
  const areaId = $("jobArea").value;
  state.jobs.push({
    id,
    name,
    number: $("jobNumberInput").value.trim(),
    customer: $("jobCustomerInput").value.trim(),
    area: areaId,
    status: $("jobStatusInput").value
  });
  if (areaId === state.selectedArea && !currentSheet().jobId) {
    currentSheet().jobId = id;
  }
  saveState();
  render();
  showToast(`${name} added`);
}

function duplicateWeek() {
  const nextDate = new Date(`${state.selectedWeek}T00:00:00`);
  nextDate.setDate(nextDate.getDate() + 7);
  const week = prompt("Duplicate to week ending:", nextDate.toISOString().slice(0, 10));
  if (!week) return;
  const copy = structuredClone(currentSheet());
  copy.week = week;
  copy.status = "Draft";
  state.sheets[sheetKey(week)] = copy;
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
  item[field] = ["completed", "completedQty", "weekly", "planned", "quantity"].includes(field) ? Number(event.target.value) : event.target.value;
  item.quantity = productionQuantity(item);
  item.completed = completedWeight(item);
  item.status = item.completed >= item.planned ? "Complete" : item.completed > 0 ? "In Progress" : "Not Started";
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
}

function render() {
  if (!state.auth) renderLogin();
  else if (!state.selectedArea) renderGate();
  else renderShell();
}

render();
