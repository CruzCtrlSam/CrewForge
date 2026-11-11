(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ShopInspections = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const item = (en, es) => ({ en, es });
  const template = (id, departments, en, es, frequency, items) => ({ id, departments, en, es, frequency, items });

  const forklift = [
    item("Condition of tires", "Condicion de las llantas"),
    item("Condition of forks and carriage", "Condicion de horquillas y carro porta-horquillas"),
    item("Functionality of brakes", "Funcionamiento de los frenos"),
    item("Functionality of steering", "Funcionamiento de la direccion"),
    item("Functionality of horn and backup alarm", "Funcionamiento del claxon y alarma de reversa"),
    item("Condition of seat belt", "Condicion del cinturon de seguridad"),
    item("Condition of hydraulic system", "Condicion del sistema hidraulico"),
    item("Condition of chains and mast", "Condicion de cadenas y mastil"),
    item("Functionality of lights", "Funcionamiento de luces"),
    item("Condition of gauges and indicators", "Condicion de indicadores y medidores"),
    item("Condition of battery or fuel system", "Condicion de la bateria o sistema de combustible"),
    item("Condition of warning labels and load plate", "Estado de etiquetas y placa de capacidad"),
    item("Overall safety condition of the equipment", "Condicion general de seguridad del equipo")
  ];

  const skytrak = [
    item("Condition of tires", "Condicion de las llantas"),
    item("Condition of forks and attachments", "Condicion de horquillas y accesorios"),
    item("Condition of the boom", "Condicion del brazo telescopico"),
    item("Functionality of brakes", "Funcionamiento de los frenos"),
    item("Functionality of steering", "Funcionamiento de la direccion"),
    item("Functionality of horn and backup alarm", "Funcionamiento del claxon y alarma de reversa"),
    item("Condition of seat belt", "Condicion del cinturon de seguridad"),
    item("Condition of hydraulic system", "Condicion del sistema hidraulico"),
    item("Condition of hydraulic hoses and fittings", "Condicion de mangueras y conexiones hidraulicas"),
    item("Functionality of lights and indicators", "Funcionamiento de luces e indicadores"),
    item("Condition of load chart and warning labels", "Estado de la tabla de carga y etiquetas de advertencia"),
    item("Operational performance", "Desempeno operativo"),
    item("Overall safety condition of the equipment", "Condicion general de seguridad del equipo")
  ];

  const templates = [
    template("bending-machine", ["rebarFab", "solarPiles"], "Bending Machine Inspection", "Inspeccion de dobladora", "Each shift / Cada turno", [
      item("Structural condition of the machine", "Condicion estructural de la maquina"), item("Condition of guards and protective covers", "Condicion de las guardas y cubiertas de proteccion"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of pedals, buttons, and control levers", "Condicion de pedales, botones y palancas de control"), item("Condition of bending pin, center pin, and rollers", "Condicion del perno de doblado, perno central y rodillos"), item("Security of bolts, fasteners, and pins", "Aseguramiento de pernos, tornillos y pasadores"), item("Housekeeping around the machine", "Orden y limpieza alrededor de la maquina"), item("Condition of electrical cables and connections", "Condicion de cables y conexiones electricas"), item("Grounding and power supply condition", "Condicion de la conexion electrica y puesta a tierra"), item("Operational performance", "Desempeno operativo"), item("Condition of the bending table surface", "Condicion de la superficie de la mesa de doblado"), item("Condition of warning labels and instructions", "Estado de etiquetas e instrucciones"), item("Overall safety condition of the machine", "Condicion general de seguridad de la maquina")
    ]),
    template("radius-bender", ["rebarFab", "solarPiles"], "Radius Bender Inspection", "Inspeccion de radiera", "Each shift / Cada turno", [
      item("Structural condition of the machine", "Condicion estructural de la maquina"), item("Condition of guards and covers", "Condicion de guardas y cubiertas"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of rollers and bending dies", "Condicion de rodillos y pernos de doblado"), item("Condition of drive chains and gears", "Condicion de cadenas y engranes de transmision"), item("Condition of hydraulic system", "Condicion del sistema hidraulico"), item("Condition of hydraulic hoses and fittings", "Condicion de mangueras y conexiones hidraulicas"), item("Condition of electrical cables and connections", "Condicion de cables y conexiones electricas"), item("Condition of control panel and switches", "Condicion del panel de control e interruptores"), item("Operational performance", "Desempeno operativo"), item("Housekeeping around the machine", "Orden y limpieza alrededor de la maquina"), item("Condition of warning labels and instructions", "Estado de etiquetas e instrucciones"), item("Overall safety condition of the machine", "Condicion general de seguridad de la maquina")
    ]),
    template("shear-line", ["rebarFab", "solarPiles"], "Shear Line Inspection", "Inspeccion de guillotina", "Each shift / Cada turno", [
      item("Structural condition of the machine", "Condicion estructural de la maquina"), item("Condition of guards and protective covers", "Condicion de las guardas y cubiertas"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of pedals and control buttons", "Condicion de pedales y botones"), item("Condition of the cutting blade", "Condicion de la cuchilla de corte"), item("Blade alignment and secure mounting", "Alineacion y aseguramiento de la cuchilla"), item("Condition of bolts and securing components", "Condicion de pernos y componentes de sujecion"), item("Condition of hydraulic system", "Condicion del sistema hidraulico"), item("Condition of hydraulic hoses and fittings", "Condicion de mangueras y conexiones hidraulicas"), item("Condition of rollers and setup table", "Condicion de rodillos y mesa"), item("Condition of electrical cables and connections", "Condicion de cables y conexiones electricas"), item("Operational performance", "Desempeno operativo"), item("Cleanliness of the cutting area", "Limpieza del area de corte"), item("Condition of warning labels and instructions", "Estado de etiquetas e instrucciones"), item("Overall safety condition of the machine", "Condicion general de seguridad de la maquina")
    ]),
    template("overhead-crane", ["rebarFab", "solarPiles"], "Overhead Crane Inspection", "Inspeccion de gruas", "Each shift / Cada turno", [
      item("Inspection tag visible and current", "Etiqueta de inspeccion visible y vigente"), item("Condition of hooks", "Condicion de los ganchos"), item("Condition of wire ropes or chains", "Condicion de cables o cadenas"), item("Condition of sheaves and lubrication", "Condicion de poleas y lubricacion"), item("Functionality of limit switches", "Funcionamiento de interruptores de limite"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of pendant control labels", "Estado de etiquetas del control colgante"), item("Functionality of audible and visual alarms", "Funcionamiento de alarmas audibles y visuales"), item("Condition of the operating area", "Condicion del area de operacion"), item("Condition of shackles", "Condicion de los grilletes"), item("Proper storage of chains", "Almacenamiento adecuado de cadenas"), item("Visibility of spreader bar load ratings", "Visibilidad de etiquetas de carga"), item("Overall safety condition of the equipment", "Condicion general de seguridad del equipo")
    ]),
    template("forklift", ["rebarFab", "solarPiles"], "Forklift Inspection", "Inspeccion de montacargas", "Each shift / Cada turno", forklift),
    template("skytrak", ["rebarFab", "solarPiles"], "SkyTrak Inspection", "Inspeccion del SkyTrak", "Each shift / Cada turno", skytrak),
    template("solar-saw", ["solarPiles"], "Solar Piles Saw Inspection", "Inspeccion de sierra para vigas", "Each shift / Cada turno", [
      item("Structural condition of the machine", "Condicion estructural de la maquina"), item("Condition of guards and covers", "Condicion de guardas y cubiertas"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of saw blade", "Condicion de la hoja de sierra"), item("Condition of blade guides and tension system", "Condicion de guias y sistema de tension"), item("Condition of hydraulic clamping system", "Condicion del sistema hidraulico de sujecion"), item("Condition of electrical cables and connections", "Condicion de cables y conexiones electricas"), item("Functionality of material clamps", "Funcionamiento de sujetadores de material"), item("Operational performance", "Desempeno operativo"), item("Condition of coolant or lubrication system", "Condicion del sistema de enfriamiento o lubricacion"), item("Housekeeping around the machine", "Orden y limpieza alrededor de la maquina"), item("Condition of warning labels and instructions", "Estado de etiquetas e instrucciones"), item("Overall safety condition of the machine", "Condicion general de seguridad de la maquina")
    ]),
    template("solar-press-line", ["solarPiles"], "Solar Pile Press Line Inspection", "Inspeccion de linea de ponchadora", "Each shift / Cada turno", [
      item("Structural condition of the machine", "Condicion estructural de la maquina"), item("Condition of guards and covers", "Condicion de guardas y cubiertas"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Condition of punching dies and tooling", "Condicion de troqueles y herramientas"), item("Condition of hydraulic system", "Condicion del sistema hidraulico"), item("Condition of electrical system and connections", "Condicion del sistema electrico y conexiones"), item("Condition of the 1-ton hoist hook and chain", "Condicion del gancho y cadena del polipasto"), item("Functionality of hoist controls", "Funcionamiento de controles del polipasto"), item("Condition of roller tables", "Condicion de las mesas con rodillos"), item("Operational performance", "Desempeno operativo"), item("Housekeeping around the machine", "Orden y limpieza alrededor de la maquina"), item("Condition of warning labels and instructions", "Estado de etiquetas e instrucciones"), item("Overall safety condition of the machine", "Condicion general de seguridad de la maquina")
    ]),
    template("skids-welding", ["skids"], "Welding Station Inspection", "Inspeccion de estacion de soldadura", "Each shift / Cada turno", [
      item("Welding machine and power cord or plug condition", "Condicion de maquina, cable y clavija"), item("Electrode holder, MIG gun or TIG torch condition", "Condicion del portaelectrodos, pistola MIG o antorcha TIG"), item("Welding leads and cables", "Cables de soldadura"), item("Ground clamp secure and connected", "Pinza de tierra firme y conectada"), item("Gas cylinders secured upright and capped", "Cilindros asegurados, verticales y con tapa"), item("Regulators, gauges and gas hoses", "Reguladores, manometros y mangueras"), item("Fume extraction or ventilation working", "Extraccion de humos o ventilacion funcionando"), item("Welding screens or curtains in place", "Pantallas o cortinas en su lugar"), item("Fire extinguisher accessible", "Extintor accesible"), item("Combustibles protected from sparks", "Combustibles protegidos de chispas"), item("Welder PPE available and in good condition", "EPP disponible y en buen estado"), item("Housekeeping around the station", "Orden y limpieza alrededor de la estacion"), item("Overall safety condition of the station", "Condicion general de seguridad")
    ]),
    template("skids-plasma", ["skids"], "Plasma Cutter Inspection", "Inspeccion de cortadora de plasma", "Each shift / Cada turno", [
      item("Structural condition of machine or table", "Condicion estructural de maquina o mesa"), item("Guards, covers and barriers in place", "Guardas, cubiertas y barreras en su lugar"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Torch and consumables condition", "Condicion de antorcha y consumibles"), item("Torch leads, cables and hoses", "Cables y mangueras de antorcha"), item("Work lead or ground clamp connection", "Conexion del cable de trabajo"), item("Air or gas supply", "Suministro de aire o gas"), item("Fume extraction operating", "Extraccion de humos funcionando"), item("Cutting table clear of slag", "Mesa libre de escoria"), item("Fire extinguisher accessible", "Extintor accesible"), item("Electrical cables and connections", "Cables y conexiones electricas"), item("PPE available", "EPP disponible"), item("Housekeeping around machine", "Orden y limpieza"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-laser", ["skids"], "Laser Cutter Inspection", "Inspeccion de cortadora laser", "Each shift / Cada turno", [
      item("Enclosure, covers and door interlocks functioning", "Cubierta, protecciones y enclavamientos funcionando"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Laser warning signs and indicators", "Letreros e indicadores laser"), item("Cutting head, nozzle and lens condition", "Condicion del cabezal, boquilla y lente"), item("Assist gas supply", "Suministro de gas de asistencia"), item("Chiller or cooling system", "Enfriador o sistema de enfriamiento"), item("Fume extraction and filters", "Extraccion de humos y filtros"), item("Cutting bed clear of slag", "Mesa libre de escoria"), item("Fire extinguisher accessible", "Extintor accesible"), item("Electrical cables and connections", "Cables y conexiones electricas"), item("Operational performance", "Desempeno operativo"), item("Housekeeping around machine", "Orden y limpieza"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-cutting-saw", ["skids"], "Cutting Saw Inspection", "Inspeccion de sierra de corte", "Each shift / Cada turno", [
      item("Structural condition", "Condicion estructural"), item("Guards and covers", "Guardas y cubiertas"), item("Emergency stop functionality", "Funcionamiento del paro de emergencia"), item("Saw blade condition", "Condicion de hoja"), item("Blade guides and tension system", "Guias y sistema de tension"), item("Material clamps or vise", "Sujetadores o prensa"), item("Coolant or lubrication system", "Sistema de enfriamiento o lubricacion"), item("Hydraulic system and hoses", "Sistema hidraulico y mangueras"), item("Electrical cables and connections", "Cables y conexiones electricas"), item("Material supports and roller tables", "Soportes y mesas de rodillos"), item("Operational performance", "Desempeno operativo"), item("Chip cleanup and housekeeping", "Limpieza de virutas y orden"), item("Warning labels and instructions", "Etiquetas e instrucciones"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-grinder", ["skids"], "Grinder Inspection", "Inspeccion de esmeriladora", "Before each use / Antes de cada uso", [
      item("Wheel or disc condition", "Condicion de rueda o disco"), item("Wheel speed rating compatible with tool RPM", "RPM de rueda compatible con herramienta"), item("Guard in place and adjusted", "Guarda en su lugar y ajustada"), item("Side handle secure", "Mango lateral firme"), item("Power cord, plug and switch", "Cable, clavija e interruptor"), item("Work rest and tongue guard spacing", "Espacio de soporte y guarda"), item("Flange, nut and spindle secure", "Brida, tuerca y eje firmes"), item("Eye, face and hearing protection", "Proteccion ocular, facial y auditiva"), item("Sparks directed safely", "Chispas dirigidas con seguridad"), item("Housekeeping", "Orden y limpieza"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-sandblast", ["skids"], "Sandblast Equipment Inspection", "Inspeccion de equipo de arenado", "Each shift / Cada turno", [
      item("Blast pot, gauge and relief valve", "Olla, manometro y valvula de alivio"), item("Deadman control functionality", "Funcionamiento de control de hombre muerto"), item("Blast hose condition", "Condicion de manguera"), item("Couplings, pins and whip checks", "Acoples, pasadores y cables de seguridad"), item("Nozzle and holder condition", "Condicion de boquilla y portaboquilla"), item("Air supply and moisture separator", "Suministro de aire y separador"), item("Abrasive and hopper condition", "Condicion de abrasivo y tolva"), item("Remote controls and valves", "Controles remotos y valvulas"), item("Operator PPE", "EPP del operador"), item("Warning signs and restricted area", "Letreros y area restringida"), item("Spill cleanup", "Limpieza de derrames"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-blast-room", ["skids"], "Blast Room & Air-Supplied Respirator Inspection", "Inspeccion de cuarto de arenado y respirador", "Each shift / Cada turno", [
      item("Blast room structure, doors and seals", "Estructura, puertas y sellos"), item("Ventilation and dust collector", "Ventilacion y colector de polvo"), item("Lighting and viewing windows", "Iluminacion y ventanas"), item("Supplied-air hood condition", "Condicion de capucha de aire"), item("Breathing air hose and connections", "Manguera y conexiones de aire"), item("Breathing air filter, CO monitor and alarm", "Filtro, monitor de CO y alarma"), item("Air pressure or flow at hood", "Presion o flujo de aire"), item("Breathing air free of odor or oil mist", "Aire sin olor ni neblina"), item("Emergency exit and stop", "Salida y paro de emergencia"), item("Abrasive recovery and floor", "Recuperacion de abrasivo y piso"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-paint-booth", ["skids"], "Paint Booth / Spray Area Inspection", "Inspeccion de cabina de pintura", "Each shift / Cada turno", [
      item("Ventilation and airflow", "Ventilacion y flujo de aire"), item("Intake and exhaust filters", "Filtros de entrada y salida"), item("Fire suppression and extinguishers", "Supresion de incendios y extintores"), item("Electrical equipment and lighting", "Equipo electrico e iluminacion"), item("Bonding and grounding", "Conexion y puesta a tierra"), item("Spray guns, hoses and fittings", "Pistolas, mangueras y conexiones"), item("Paint and solvent storage", "Almacenamiento de pintura y solventes"), item("Overspray or residue buildup", "Acumulacion de residuos"), item("Waste and rag containers", "Recipientes para desechos y trapos"), item("Ignition source control", "Control de fuentes de ignicion"), item("Respirators and PPE", "Respiradores y EPP"), item("Eyewash accessible", "Lavaojos accesible"), item("SDS available", "SDS disponibles"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-rigging", ["skids"], "Rigging & Sling Inspection", "Inspeccion de eslingas y aparejos", "Before each use / Antes de cada uso", [
      item("Sling tag legible", "Etiqueta de eslinga legible"), item("Wire rope sling condition", "Condicion de eslinga de cable"), item("Chain sling condition", "Condicion de eslinga de cadena"), item("Synthetic sling condition", "Condicion de eslinga sintetica"), item("Shackle condition", "Condicion de grilletes"), item("Hook condition", "Condicion de ganchos"), item("Spreader or lifting beam condition", "Condicion de vigas de izaje"), item("Edge protection used", "Proteccion de bordes usada"), item("Damaged items removed from service", "Equipo danado retirado"), item("Proper storage", "Almacenamiento adecuado"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-dust-collector", ["skids"], "Dust Collector Inspection", "Inspeccion de colector de polvo", "Each shift / Cada turno", [
      item("Differential pressure within range", "Presion diferencial dentro de rango"), item("Cleaning cycle operating", "Ciclo de limpieza funcionando"), item("Collection bin or hopper", "Contenedor o tolva"), item("Ducts, hoses and connections", "Ductos, mangueras y conexiones"), item("Dust buildup nearby", "Acumulacion de polvo cercana"), item("Fan or motor condition", "Condicion de ventilador o motor"), item("Fire and explosion protection", "Proteccion contra incendio y explosion"), item("Collected dust handling", "Manejo de polvo recolectado"), item("Access doors and panels", "Puertas y paneles de acceso"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-air-compressor", ["skids"], "Air Compressor & Air Hose Inspection", "Inspeccion de compresor y mangueras", "Each shift / Cada turno", [
      item("Receiver tank drained", "Tanque drenado"), item("Oil level or lubrication", "Nivel de aceite o lubricacion"), item("Guards and covers", "Guardas y cubiertas"), item("Pressure gauge and operating range", "Manometro y rango de operacion"), item("Safety relief valve", "Valvula de alivio"), item("Air leaks", "Fugas de aire"), item("Air hose condition", "Condicion de mangueras"), item("Couplings and restraints", "Acoples y restricciones"), item("Air filter or dryer", "Filtro o secador"), item("Electrical connections", "Conexiones electricas"), item("Operational performance", "Desempeno operativo"), item("Intake and ventilation clear", "Entrada y ventilacion despejadas"), item("Overall safety condition", "Condicion general de seguridad")
    ]),
    template("skids-walkthrough", ["skids"], "Shift Area Walk-Through", "Recorrido de area por turno", "Each shift / Cada turno", [
      item("Aisles and floors clear", "Pasillos y pisos despejados"), item("Emergency exits and signs", "Salidas y letreros de emergencia"), item("Electrical panel clearance", "Espacio frente a tableros electricos"), item("Fire extinguishers accessible", "Extintores accesibles"), item("Eyewash or shower accessible", "Lavaojos o regadera accesible"), item("Gas cylinders stored safely", "Cilindros almacenados con seguridad"), item("Flammable liquids stored properly", "Liquidos inflamables almacenados correctamente"), item("Scrap, slag and oily rag handling", "Manejo de desperdicio, escoria y trapos"), item("Material stored stably", "Material almacenado de forma estable"), item("Lighting adequate", "Iluminacion adecuada"), item("Ladders, platforms and guardrails", "Escaleras, plataformas y barandales"), item("PPE and warning signs visible", "EPP y letreros visibles"), item("First aid kit stocked", "Botiquin surtido"), item("Overall housekeeping and safety", "Orden y seguridad general")
    ]),
    template("skids-forklift", ["skids"], "Forklift Inspection - Randall Shop", "Inspeccion de montacargas - Taller Randall", "Each shift / Cada turno", forklift),
    template("skids-skytrak", ["skids"], "SkyTrak Inspection - Randall Shop", "Inspeccion de SkyTrak - Taller Randall", "Each shift / Cada turno", skytrak)
  ];

  function templatesForArea(area) {
    return templates.filter((entry) => entry.departments.includes(area));
  }

  function templateById(id) {
    return templates.find((entry) => entry.id === id) || null;
  }

  function inferTemplate(filename, area) {
    const name = String(filename || "").toLowerCase();
    const candidates = templatesForArea(area);
    const aliases = [
      ["blast room", "skids-blast-room"], ["sandblast", "skids-sandblast"], ["paint", "skids-paint-booth"], ["plasma", "skids-plasma"], ["laser", "skids-laser"], ["dust", "skids-dust-collector"], ["compressor", "skids-air-compressor"], ["walk", "skids-walkthrough"], ["rigging", "skids-rigging"], ["grinder", "skids-grinder"], ["weld", "skids-welding"], ["press", "solar-press-line"], ["solar", "solar-saw"], ["radius", "radius-bender"], ["shear", "shear-line"], ["crane", "overhead-crane"], ["forklift", area === "skids" ? "skids-forklift" : "forklift"], ["skytrak", area === "skids" ? "skids-skytrak" : "skytrak"], ["bender", "bending-machine"], ["saw", area === "skids" ? "skids-cutting-saw" : "solar-saw"]
    ];
    const match = aliases.find(([needle, id]) => name.includes(needle) && candidates.some((entry) => entry.id === id));
    return match ? match[1] : candidates[0]?.id || "";
  }

  function recordMetrics(record) {
    const ratings = Object.values(record?.ratings || {});
    const applicable = ratings.filter((value) => [0, 1, 2, "0", "1", "2"].includes(value));
    const points = applicable.reduce((sum, value) => sum + Number(value), 0);
    const unsafe = applicable.filter((value) => Number(value) === 0).length;
    const deficient = applicable.filter((value) => Number(value) === 1).length;
    const ok = applicable.filter((value) => Number(value) === 2).length;
    return { applicable: applicable.length, points, possible: applicable.length * 2, score: applicable.length ? Math.round((points / (applicable.length * 2)) * 100) : 0, unsafe, deficient, ok };
  }

  function dashboard(records, filters = {}) {
    const filtered = (records || []).filter((record) => (!filters.area || record.area === filters.area) && (!filters.from || record.date >= filters.from) && (!filters.to || record.date <= filters.to) && (!filters.templateId || record.templateId === filters.templateId));
    const totals = filtered.reduce((summary, record) => {
      const metrics = recordMetrics(record);
      summary.points += metrics.points; summary.possible += metrics.possible; summary.unsafe += metrics.unsafe; summary.deficient += metrics.deficient; summary.ok += metrics.ok;
      if (record.correctiveActionRequired && record.actionStatus !== "Closed") summary.openActions += 1;
      return summary;
    }, { inspections: filtered.length, points: 0, possible: 0, unsafe: 0, deficient: 0, ok: 0, openActions: 0 });
    totals.score = totals.possible ? Math.round((totals.points / totals.possible) * 100) : 0;
    totals.records = filtered;
    totals.byTemplate = templatesForArea(filters.area).map((entry) => {
      const group = filtered.filter((record) => record.templateId === entry.id);
      const possible = group.reduce((sum, record) => sum + recordMetrics(record).possible, 0);
      const points = group.reduce((sum, record) => sum + recordMetrics(record).points, 0);
      return { id: entry.id, label: entry.en, count: group.length, score: possible ? Math.round((points / possible) * 100) : 0 };
    }).filter((entry) => entry.count);
    return totals;
  }

  return { templates, templatesForArea, templateById, inferTemplate, recordMetrics, dashboard };
});
