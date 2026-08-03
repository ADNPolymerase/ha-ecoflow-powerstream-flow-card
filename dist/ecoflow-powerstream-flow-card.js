const CARD_VERSION = "0.1.0";

console.info(
  "%c ECOFLOW-POWERSTREAM-FLOW-CARD %c v" + CARD_VERSION + " ",
  "color:white;background:#1a6dd4;font-weight:700;",
  "color:#1a6dd4;background:white;font-weight:700;"
);

const EF_LANGNAMES = { en: "English", fr: "Français", de: "Deutsch", es: "Español", it: "Italiano", nl: "Nederlands" };

const EF_T = {
  en: {
    solar: "Solar", inverter: "Inverter", home: "Home", grid: "Grid", battery: "Battery", outputs: "Outputs",
    charging: "Charging", discharging: "Discharging", idle: "Idle", unavailable: "Unavailable",
    string1: "String 1", string2: "String 2", injected: "injected", of: "of",
    title: "Title", language: "Language", auto: "Auto",
    secSolar: "Solar", secInverter: "Inverter", secBattery: "Battery", secGrid: "Grid",
    secOutputs: "Outputs", secAppearance: "Appearance",
    solarEntity: "Total solar power", solar1Entity: "String 1 power", solar2Entity: "String 2 power",
    inverterEntity: "Inverter output to home", ratedPower: "Rated power (W)",
    batteryPowerEntity: "Battery power (signed)",
    batteryHint: "By default negative = charging, positive = discharging.",
    batteryInvert: "Reverse the battery sign", socEntity: "State of charge",
    gridEntity: "Grid charging power",
    outputsEntity: "Pre-summed outputs sensor",
    outputEntities: "Output sensors (summed)",
    deviceStyle: "Node style", styleDevice: "Drawn devices", styleIcon: "Icons",
    animate: "Animate the flows", showStrings: "Show both strings separately",
    dimInactive: "Dim inactive branches", decimals: "Decimals",
    clickable: "Open more-info when tapped",
    addEntity: "Add a sensor", remove: "Remove", none: "None",
    fillTitle: "EcoFlow sensors were found.", fillBtn: "Fill in automatically",
    filled: "Filled in:", fillNone: "Nothing more to fill in.",
    noSolar: "No solar entity configured",
  },
  fr: {
    solar: "Solaire", inverter: "Onduleur", home: "Maison", grid: "Réseau", battery: "Batterie", outputs: "Sorties",
    charging: "En charge", discharging: "En décharge", idle: "Au repos", unavailable: "Indisponible",
    string1: "String 1", string2: "String 2", injected: "injecté", of: "sur",
    title: "Titre", language: "Langue", auto: "Auto",
    secSolar: "Solaire", secInverter: "Onduleur", secBattery: "Batterie", secGrid: "Réseau",
    secOutputs: "Sorties", secAppearance: "Apparence",
    solarEntity: "Puissance solaire totale", solar1Entity: "Puissance string 1", solar2Entity: "Puissance string 2",
    inverterEntity: "Injection de l'onduleur vers la maison", ratedPower: "Puissance nominale (W)",
    batteryPowerEntity: "Puissance batterie (signée)",
    batteryHint: "Par défaut négatif = charge, positif = décharge.",
    batteryInvert: "Inverser le signe de la batterie", socEntity: "État de charge",
    gridEntity: "Puissance de charge depuis le réseau",
    outputsEntity: "Capteur de sorties déjà totalisé",
    outputEntities: "Capteurs de sortie (additionnés)",
    deviceStyle: "Style des nœuds", styleDevice: "Appareils dessinés", styleIcon: "Icônes",
    animate: "Animer les flux", showStrings: "Afficher les deux strings séparément",
    dimInactive: "Estomper les branches inactives", decimals: "Décimales",
    clickable: "Ouvrir more-info au clic",
    addEntity: "Ajouter un capteur", remove: "Retirer", none: "Aucun",
    fillTitle: "Des capteurs EcoFlow ont été trouvés.", fillBtn: "Remplir automatiquement",
    filled: "Rempli :", fillNone: "Plus rien à remplir.",
    noSolar: "Aucune entité solaire configurée",
  },
  de: {
    solar: "Solar", inverter: "Wechselrichter", home: "Haus", grid: "Netz", battery: "Batterie", outputs: "Ausgänge",
    charging: "Lädt", discharging: "Entlädt", idle: "Ruhe", unavailable: "Nicht verfügbar",
    string1: "String 1", string2: "String 2", injected: "eingespeist", of: "von",
    title: "Titel", language: "Sprache", auto: "Auto",
    secSolar: "Solar", secInverter: "Wechselrichter", secBattery: "Batterie", secGrid: "Netz",
    secOutputs: "Ausgänge", secAppearance: "Darstellung",
    solarEntity: "Gesamte Solarleistung", solar1Entity: "Leistung String 1", solar2Entity: "Leistung String 2",
    inverterEntity: "Einspeisung ins Haus", ratedPower: "Nennleistung (W)",
    batteryPowerEntity: "Batterieleistung (vorzeichenbehaftet)",
    batteryHint: "Standard: negativ = laden, positiv = entladen.",
    batteryInvert: "Vorzeichen der Batterie umkehren", socEntity: "Ladezustand",
    gridEntity: "Ladeleistung aus dem Netz",
    outputsEntity: "Bereits summierter Ausgangssensor",
    outputEntities: "Ausgangssensoren (summiert)",
    deviceStyle: "Knotenstil", styleDevice: "Gezeichnete Geräte", styleIcon: "Symbole",
    animate: "Flüsse animieren", showStrings: "Beide Strings einzeln anzeigen",
    dimInactive: "Inaktive Zweige abschwächen", decimals: "Nachkommastellen",
    clickable: "Bei Klick more-info öffnen",
    addEntity: "Sensor hinzufügen", remove: "Entfernen", none: "Keiner",
    fillTitle: "EcoFlow-Sensoren gefunden.", fillBtn: "Automatisch ausfüllen",
    filled: "Ausgefüllt:", fillNone: "Nichts mehr auszufüllen.",
    noSolar: "Keine Solar-Entität konfiguriert",
  },
  es: {
    solar: "Solar", inverter: "Inversor", home: "Casa", grid: "Red", battery: "Batería", outputs: "Salidas",
    charging: "Cargando", discharging: "Descargando", idle: "En reposo", unavailable: "No disponible",
    string1: "String 1", string2: "String 2", injected: "inyectado", of: "de",
    title: "Título", language: "Idioma", auto: "Auto",
    secSolar: "Solar", secInverter: "Inversor", secBattery: "Batería", secGrid: "Red",
    secOutputs: "Salidas", secAppearance: "Apariencia",
    solarEntity: "Potencia solar total", solar1Entity: "Potencia string 1", solar2Entity: "Potencia string 2",
    inverterEntity: "Inyección del inversor a la casa", ratedPower: "Potencia nominal (W)",
    batteryPowerEntity: "Potencia de batería (con signo)",
    batteryHint: "Por defecto negativo = carga, positivo = descarga.",
    batteryInvert: "Invertir el signo de la batería", socEntity: "Estado de carga",
    gridEntity: "Potencia de carga desde la red",
    outputsEntity: "Sensor de salidas ya sumado",
    outputEntities: "Sensores de salida (sumados)",
    deviceStyle: "Estilo de los nodos", styleDevice: "Aparatos dibujados", styleIcon: "Iconos",
    animate: "Animar los flujos", showStrings: "Mostrar los dos strings por separado",
    dimInactive: "Atenuar las ramas inactivas", decimals: "Decimales",
    clickable: "Abrir more-info al pulsar",
    addEntity: "Añadir un sensor", remove: "Quitar", none: "Ninguno",
    fillTitle: "Se han encontrado sensores EcoFlow.", fillBtn: "Rellenar automáticamente",
    filled: "Rellenado:", fillNone: "Nada más que rellenar.",
    noSolar: "Ninguna entidad solar configurada",
  },
  it: {
    solar: "Solare", inverter: "Inverter", home: "Casa", grid: "Rete", battery: "Batteria", outputs: "Uscite",
    charging: "In carica", discharging: "In scarica", idle: "A riposo", unavailable: "Non disponibile",
    string1: "String 1", string2: "String 2", injected: "immesso", of: "su",
    title: "Titolo", language: "Lingua", auto: "Auto",
    secSolar: "Solare", secInverter: "Inverter", secBattery: "Batteria", secGrid: "Rete",
    secOutputs: "Uscite", secAppearance: "Aspetto",
    solarEntity: "Potenza solare totale", solar1Entity: "Potenza string 1", solar2Entity: "Potenza string 2",
    inverterEntity: "Immissione dell'inverter in casa", ratedPower: "Potenza nominale (W)",
    batteryPowerEntity: "Potenza batteria (con segno)",
    batteryHint: "Per impostazione predefinita negativo = carica, positivo = scarica.",
    batteryInvert: "Invertire il segno della batteria", socEntity: "Stato di carica",
    gridEntity: "Potenza di carica dalla rete",
    outputsEntity: "Sensore uscite già totalizzato",
    outputEntities: "Sensori di uscita (sommati)",
    deviceStyle: "Stile dei nodi", styleDevice: "Apparecchi disegnati", styleIcon: "Icone",
    animate: "Animare i flussi", showStrings: "Mostrare le due string separatamente",
    dimInactive: "Attenuare i rami inattivi", decimals: "Decimali",
    clickable: "Aprire more-info al tocco",
    addEntity: "Aggiungere un sensore", remove: "Rimuovere", none: "Nessuno",
    fillTitle: "Sono stati trovati sensori EcoFlow.", fillBtn: "Compilare automaticamente",
    filled: "Compilato:", fillNone: "Niente altro da compilare.",
    noSolar: "Nessuna entità solare configurata",
  },
  nl: {
    solar: "Zon", inverter: "Omvormer", home: "Huis", grid: "Net", battery: "Accu", outputs: "Uitgangen",
    charging: "Laden", discharging: "Ontladen", idle: "Rust", unavailable: "Niet beschikbaar",
    string1: "String 1", string2: "String 2", injected: "ingevoed", of: "van",
    title: "Titel", language: "Taal", auto: "Auto",
    secSolar: "Zon", secInverter: "Omvormer", secBattery: "Accu", secGrid: "Net",
    secOutputs: "Uitgangen", secAppearance: "Weergave",
    solarEntity: "Totaal zonvermogen", solar1Entity: "Vermogen string 1", solar2Entity: "Vermogen string 2",
    inverterEntity: "Invoeding van de omvormer naar het huis", ratedPower: "Nominaal vermogen (W)",
    batteryPowerEntity: "Accuvermogen (met teken)",
    batteryHint: "Standaard negatief = laden, positief = ontladen.",
    batteryInvert: "Teken van de accu omkeren", socEntity: "Laadtoestand",
    gridEntity: "Laadvermogen vanaf het net",
    outputsEntity: "Reeds getotaliseerde uitgangssensor",
    outputEntities: "Uitgangssensoren (opgeteld)",
    deviceStyle: "Knoopstijl", styleDevice: "Getekende apparaten", styleIcon: "Pictogrammen",
    animate: "Stromen animeren", showStrings: "Beide strings apart tonen",
    dimInactive: "Inactieve takken dimmen", decimals: "Decimalen",
    clickable: "more-info openen bij tikken",
    addEntity: "Sensor toevoegen", remove: "Verwijderen", none: "Geen",
    fillTitle: "Er zijn EcoFlow-sensoren gevonden.", fillBtn: "Automatisch invullen",
    filled: "Ingevuld:", fillNone: "Niets meer in te vullen.",
    noSolar: "Geen zonne-entiteit geconfigureerd",
  },
};

// Material Design icon paths, inlined so the card never depends on ha-icon inside the SVG.
const EF_ICONS = {
  solar: "M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0-5l2.39 3.42C13.65 5.15 12.84 5 12 5c-.84 0-1.65.15-2.39.42L12 2M3.34 7l4.16-.35A7.2 7.2 0 005.94 8.5c-.44.74-.69 1.5-.83 2.29L3.34 7m.02 10l1.76-3.79a7.15 7.15 0 002.38 4.14L3.36 17M20.65 7l-1.77 3.79a7.02 7.02 0 00-2.38-4.15l4.15.36m-.01 10l-4.14.35a7.2 7.2 0 001.56-1.85c.44-.74.69-1.5.83-2.29L20.64 17M12 22l-2.39-3.42c.74.27 1.55.42 2.39.42.84 0 1.65-.15 2.39-.42L12 22z",
  inverter: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2m0 2v12h16V6H4m9 1l-4.5 7H11l-.5 4 4.5-7H13l.5-4z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z",
  grid: "M8.28 5.45L6.5 4.55 7.76 2h8.48L17.5 4.55l-1.78.9L15 4H9l-.72 1.45M18.62 8h-4.53L13.3 5h-2.6L9.91 8H5.38L4.1 10.55l1.79.9L6.62 10h10.76l.73 1.45 1.79-.9L18.62 8m-.85 14H15.7l-.24-.9L12 15.9 8.53 21.1 8.3 22H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75L12.81 11h2.07l2.89 11M11.4 15l-.9-1.35L9.32 18.13 11.4 15m3.28 3.12l-1.18-4.48-.9 1.36 2.08 3.12z",
  battery: "M16.67 4H15V2H9v2H7.33A1.33 1.33 0 006 5.33v15.34C6 21.4 6.6 22 7.33 22h9.34c.73 0 1.33-.6 1.33-1.33V5.33C18 4.6 17.4 4 16.67 4z",
  outputs: "M16 7V3h-2v4h-4V3H8v4c-1 0-2 1-2 2v5.5L9.5 18v3h5v-3l3.5-3.5V9c0-1-1-2-2-2z",
};

const EF_DEFAULTS = {
  device_style: "device",
  rated_power: 800,
  animate: true,
  show_strings: true,
  dim_inactive: true,
  decimals: 0,
  clickable: true,
  battery_invert: false,
};

/* ------------------------------------------------------------------ helpers */

function efLang(hass, cfg) {
  const want = cfg && cfg.language && cfg.language !== "auto" ? cfg.language : null;
  if (want && EF_T[want]) return want;
  const hl = (hass && (hass.locale?.language || hass.language) || "en").slice(0, 2).toLowerCase();
  return EF_T[hl] ? hl : "en";
}

// Returns the entity's power in watts, or null when it is missing/unavailable.
function efWatts(hass, entityId) {
  if (!entityId) return null;
  const st = hass && hass.states && hass.states[entityId];
  if (!st) return null;
  if (st.state === "unavailable" || st.state === "unknown" || st.state === "") return null;
  const v = Number(st.state);
  if (!Number.isFinite(v)) return null;
  const u = (st.attributes && st.attributes.unit_of_measurement) || "W";
  if (u === "kW") return v * 1000;
  if (u === "MW") return v * 1e6;
  if (u === "mW") return v / 1000;
  return v;
}

function efSum(hass, ids) {
  if (!ids || !ids.length) return null;
  let total = null;
  for (const id of ids) {
    const w = efWatts(hass, id);
    if (w === null) continue;
    total = (total === null ? 0 : total) + w;
  }
  return total;
}

function efFormat(w, decimals) {
  if (w === null) return "—";
  const a = Math.abs(w);
  if (a >= 1000) return (w / 1000).toFixed(1).replace(/\.0$/, "") + " kW";
  return a.toFixed(decimals) + " W";
}

function efNum(hass, entityId) {
  const st = hass && hass.states && hass.states[entityId];
  if (!st) return null;
  const v = Number(st.state);
  return Number.isFinite(v) ? v : null;
}

function efEsc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

// Shortest match wins: delta_pro_battery_level beats delta_pro_main_battery_level.
function efPick(ids, patterns) {
  for (const re of patterns) {
    const hits = ids.filter((id) => re.test(id)).sort((a, b) => a.length - b.length || a.localeCompare(b));
    if (hits.length) return hits[0];
  }
  return null;
}

const EF_PATTERNS = {
  solar_entity: [/^sensor\..*_solar_total$/, /^sensor\..*solar.*_watts$/],
  solar_1_entity: [/^sensor\..*_solar_1_watts$/],
  solar_2_entity: [/^sensor\..*_solar_2_watts$/],
  inverter_entity: [/^sensor\..*_inverter_output_watts$/],
  battery_power_entity: [/^sensor\..*_battery_input_watts$/],
  soc_entity: [/^sensor\..*delta.*_battery_level$/, /^sensor\..*_battery_level$/],
  grid_entity: [/^sensor\..*_ac_in_power$/],
};

const EF_OUTPUT_PATTERNS = [
  /^sensor\..*_ac_out_power$/,
  /^sensor\..*_dc_out_power$/,
  /^sensor\..*_usb_\d_out_power$/,
  /^sensor\..*_usb_qc_\d_out_power$/,
  /^sensor\..*_type_c_\d_out_power$/,
];

function efDetect(hass) {
  const ids = Object.keys((hass && hass.states) || {});
  const out = {};
  for (const [key, pats] of Object.entries(EF_PATTERNS)) {
    const hit = efPick(ids, pats);
    if (hit) out[key] = hit;
  }
  const outputs = [];
  for (const re of EF_OUTPUT_PATTERNS) {
    for (const id of ids.filter((i) => re.test(i)).sort()) outputs.push(id);
  }
  if (outputs.length) out.output_entities = outputs;
  return out;
}

/* --------------------------------------------------------------------- card */

// 2 rows x 3 columns. Row 1 is the live path (solar -> inverter -> home),
// row 2 the battery path (grid -> battery -> outputs). The vertical link
// between the inverter and the battery is the only bidirectional flow.
const EF_R = 40;
const EF_COLS = [78, 280, 482];
const EF_ROWS = [76, 240];
const EF_GAP = 10;

const EF_COLORS = {
  solar: "#f5a524",
  inverter: "#7d8fa9",
  home: "#4a9eff",
  grid: "#8e9aaf",
  charge: "#3ddc84",
  discharge: "#ffb020",
  outputs: "#b07cff",
};

/* ------------------------------------------------------- device drawings */
/* Original SVG artwork, not vendor imagery: it scales, follows the theme and
   carries no third-party assets. Attach offsets are per-edge because these
   are boxes, not discs. */

const EF_BOX = {
  icon: { hw: EF_R, top: EF_R, bottom: EF_R },
  powerstream: { hw: 46, top: 32, bottom: 21 },
  deltapro: { hw: 34, top: 46, bottom: 40 },
};

// The PowerStream: an aluminium slab, wordmark on the face, status LED at the
// front edge and the four labelled leads (AC OUT, BATTERY, SOLAR x2) on the back.
function efDrawPowerStream(cx, cy, ledColor, active) {
  const x = cx - 46;
  const y = cy - 22;
  const leads = [-32, -13, 6, 24]
    .map(
      (dx) => `
      <path d="M ${cx + dx + 5} ${y - 4} v -9" stroke="#3b3f45" stroke-width="3" stroke-linecap="round"/>
      <rect x="${cx + dx}" y="${y - 7}" width="11" height="9" rx="2" fill="#d9dde3" stroke="#b3b9c2" stroke-width=".6"/>`
    )
    .join("");
  return `<g>
    ${leads}
    <rect x="${x}" y="${y + 5}" width="92" height="40" rx="9" fill="#8f959d"/>
    <rect x="${x}" y="${y}" width="92" height="40" rx="9" fill="url(#efAlu)" stroke="#9aa1aa" stroke-width="1"/>
    <text x="${cx}" y="${cy + 1}" text-anchor="middle" font-size="9.5" letter-spacing="2.2"
          font-weight="700" fill="#4a4f57" stroke="none">ECOFLOW</text>
    <rect x="${cx - 9}" y="${cy + 10}" width="18" height="4" rx="2"
          fill="${active ? ledColor : "#c2c7ce"}"/>
  </g>`;
}

// A DELTA-family power station seen head-on: silver top cap and handle, the
// display carrying the live state of charge, the port row and the 2x2 sockets.
function efDrawDeltaPro(cx, cy, label, socColor) {
  const vents = Array.from(
    { length: 6 },
    (_, i) => `<path d="M ${cx - 26 + i * 3.2} ${cy - 35} v 6" stroke="#5b616a" stroke-width="1.2"/>`
  ).join("");
  const socket = (dx, dy) =>
    `<circle cx="${cx + dx}" cy="${cy + dy}" r="5" fill="#15171a" stroke="#4b515a" stroke-width="1.2"/>
     <circle cx="${cx + dx}" cy="${cy + dy}" r="1.6" fill="#3a4048"/>`;
  const ports = [-19, -9.5, 0, 9.5]
    .map((dx) => `<rect x="${cx + dx}" y="${cy - 5}" width="7" height="3.2" rx="1.2" fill="#565c65"/>`)
    .join("");
  return `<g>
    <rect x="${cx - 34}" y="${cy + 28}" width="9" height="12" rx="3.5" fill="#1b1d20"/>
    <rect x="${cx + 25}" y="${cy + 28}" width="9" height="12" rx="3.5" fill="#1b1d20"/>
    <rect x="${cx - 30}" y="${cy - 40}" width="60" height="76" rx="7" fill="#2e3136"/>
    <rect x="${cx - 33}" y="${cy - 46}" width="66" height="13" rx="4.5" fill="url(#efCap)"/>
    <rect x="${cx - 13}" y="${cy - 42}" width="26" height="5" rx="2.5" fill="#6b717a"/>
    ${vents}
    <rect x="${cx - 24}" y="${cy - 28}" width="48" height="21" rx="3.5" fill="#141619"/>
    <text x="${cx}" y="${cy - 13}" text-anchor="middle" font-size="12.5" font-weight="700"
          fill="${socColor}" stroke="none">${efEsc(label)}</text>
    ${ports}
    <rect x="${cx - 24}" y="${cy + 2}" width="48" height="25" rx="4" fill="#212429"/>
    ${socket(-11, 9)}${socket(11, 9)}${socket(-11, 20)}${socket(11, 20)}
    <rect x="${cx - 30}" y="${cy + 29}" width="60" height="7" rx="3.5" fill="url(#efCap)"/>
  </g>`;
}

const EF_DEFS = `<defs>
  <linearGradient id="efAlu" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e6e9ed"/><stop offset=".55" stop-color="#ccd1d8"/>
    <stop offset="1" stop-color="#b8bec6"/>
  </linearGradient>
  <linearGradient id="efCap" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b6bcc4"/><stop offset="1" stop-color="#878d96"/>
  </linearGradient>
</defs>`;

class EcoflowFlowCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("ecoflow-powerstream-flow-card-editor");
  }

  static getStubConfig(hass) {
    return { type: "custom:ecoflow-powerstream-flow-card", ...efDetect(hass) };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...EF_DEFAULTS, ...config };
    this._built = false;
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config) this._update();
  }

  getCardSize() {
    return 5;
  }

  _build() {
    const root = this.attachShadow ? this.shadowRoot || this.attachShadow({ mode: "open" }) : this;
    root.innerHTML = `
      <style>
        ha-card { padding: 12px 8px 4px; overflow: hidden; }
        .wrap { width: 100%; }
        svg { width: 100%; height: auto; display: block; }
        .node-hit { cursor: var(--ef-cursor, default); }
        .name { fill: var(--secondary-text-color); font-size: 13px; }
        .val  { fill: var(--primary-text-color); font-size: 15px; font-weight: 600; }
        .sub  { fill: var(--secondary-text-color); font-size: 11px; }
        .flabel { fill: var(--secondary-text-color); font-size: 12px; }
        .track { stroke: var(--divider-color, #e0e0e0); stroke-width: 2; fill: none; }
        .disc  { fill: var(--card-background-color, var(--ha-card-background, #fff)); }
        .ring-bg { stroke: var(--divider-color, #e0e0e0); }
        text { font-family: var(--paper-font-body1_-_font-family, inherit); }
        /* Halo in the card colour so a flow line reads as passing behind the label. */
        .val, .name, .sub, .flabel {
          paint-order: stroke fill;
          stroke: var(--card-background-color, var(--ha-card-background, #fff));
          stroke-width: 3.5px;
          stroke-linejoin: round;
        }
        .flow {
          fill: none; stroke-width: 3.5; stroke-linecap: round;
          stroke-dasharray: 5 11;
        }
        .flow.anim { animation: ef-dash var(--ef-dur, 1.4s) linear infinite; }
        .flow.rev  { animation-direction: reverse; }
        @keyframes ef-dash { to { stroke-dashoffset: -16; } }
        @media (prefers-reduced-motion: reduce) { .flow.anim { animation: none; } }
      </style>
      <ha-card><div class="wrap"></div></ha-card>`;
    this._card = root.querySelector("ha-card");
    this._wrap = root.querySelector(".wrap");
    this._built = true;
  }

  _more(entityId) {
    if (!entityId || !this._config.clickable) return;
    const ev = new Event("hass-more-info", { bubbles: true, composed: true });
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }

  _update() {
    if (!this._built) this._build();
    const hass = this._hass;
    const c = this._config;
    const t = EF_T[efLang(hass, c)];

    if (c.title) this._card.setAttribute("header", c.title);
    else this._card.removeAttribute("header");

    const dec = Number.isFinite(+c.decimals) ? +c.decimals : 0;
    const rated = Number(c.rated_power) || EF_DEFAULTS.rated_power;

    const solar = efWatts(hass, c.solar_entity);
    const s1 = efWatts(hass, c.solar_1_entity);
    const s2 = efWatts(hass, c.solar_2_entity);
    const inv = efWatts(hass, c.inverter_entity);
    const grid = efWatts(hass, c.grid_entity);
    const soc = efNum(hass, c.soc_entity);

    let bat = efWatts(hass, c.battery_power_entity);
    if (bat !== null && c.battery_invert) bat = -bat;
    // Positive = the battery feeds the inverter, negative = the inverter charges it.
    const charging = bat !== null && bat < 0;
    const batMag = bat === null ? null : Math.abs(bat);

    const outs = c.outputs_entity
      ? efWatts(hass, c.outputs_entity)
      : efSum(hass, c.output_entities);

    const parts = [];

    /* ---- flows (drawn under the nodes) ---- */
    const flow = (x1, y1, x2, y2, watts, color, reverse) => {
      const d = `M ${x1} ${y1} L ${x2} ${y2}`;
      let s = `<path class="track" d="${d}"/>`;
      const w = watts === null ? 0 : Math.abs(watts);
      if (w > 0.5) {
        const ratio = Math.max(0, Math.min(1, w / rated));
        const dur = Math.max(0.35, Math.min(3, 0.9 / (0.12 + 0.88 * ratio)));
        const cls = "flow" + (c.animate ? " anim" : "") + (reverse ? " rev" : "");
        s += `<path class="${cls}" d="${d}" stroke="${color}" style="--ef-dur:${dur.toFixed(2)}s"/>`;
      }
      return s;
    };

    const [cx0, cx1, cx2] = EF_COLS;
    const [ry0, ry1] = EF_ROWS;
    const asDevice = c.device_style !== "icon";
    const invBox = asDevice ? EF_BOX.powerstream : EF_BOX.icon;
    const batBox = asDevice ? EF_BOX.deltapro : EF_BOX.icon;
    const edge = EF_R + EF_GAP;

    const vTop = ry0 + invBox.bottom + EF_GAP;
    const vBot = ry1 - batBox.top - EF_GAP;

    parts.push(flow(cx0 + edge, ry0, cx1 - invBox.hw - EF_GAP, ry0, solar, EF_COLORS.solar, false));
    parts.push(flow(cx1 + invBox.hw + EF_GAP, ry0, cx2 - edge, ry0, inv, EF_COLORS.home, false));
    parts.push(
      flow(cx1, vTop, cx1, vBot, bat, charging ? EF_COLORS.charge : EF_COLORS.discharge, !charging)
    );
    parts.push(flow(cx0 + edge, ry1, cx1 - batBox.hw - EF_GAP, ry1, grid, EF_COLORS.grid, false));
    parts.push(flow(cx1 + batBox.hw + EF_GAP, ry1, cx2 - edge, ry1, outs, EF_COLORS.outputs, false));

    /* ---- flow labels ---- */
    const flabel = (x, y, text, anchor) =>
      `<text class="flabel" x="${x}" y="${y}" text-anchor="${anchor || "middle"}">${efEsc(text)}</text>`;

    parts.push(flabel((cx0 + cx1) / 2, ry0 - 12, efFormat(solar, dec)));
    parts.push(flabel((cx1 + cx2) / 2, ry0 - 12, efFormat(inv, dec)));
    // Offset to the right of the vertical run; the text halo lets the line pass behind.
    parts.push(flabel(cx1 + 20, (vTop + vBot) / 2 + 4, efFormat(batMag, dec), "start"));
    parts.push(flabel((cx0 + cx1) / 2, ry1 - 12, efFormat(grid, dec)));
    parts.push(flabel((cx1 + cx2) / 2, ry1 - 12, efFormat(outs, dec)));

    /* ---- nodes ---- */
    const labels = (cx, cy, bottom, name, sub) =>
      `<text class="name" x="${cx}" y="${cy + bottom + 22}" text-anchor="middle">${efEsc(name)}</text>` +
      (sub ? `<text class="sub" x="${cx}" y="${cy + bottom + 37}" text-anchor="middle">${efEsc(sub)}</text>` : "");

    const wrapNode = (inner, entityId, inactive) => {
      const dim = inactive && c.dim_inactive ? ` opacity=".35"` : "";
      const hit = entityId && c.clickable ? ` class="node-hit" data-ef-entity="${efEsc(entityId)}"` : "";
      return `<g${hit}${dim}>${inner}</g>`;
    };

    const node = (cx, cy, icon, color, value, name, sub, entityId, inactive) =>
      wrapNode(
        `<circle class="disc" cx="${cx}" cy="${cy}" r="${EF_R}" stroke="${color}" stroke-width="2.5"/>
         <g transform="translate(${cx - 12}, ${cy - 26})"><path d="${icon}" fill="${color}"/></g>
         <text class="val" x="${cx}" y="${cy + 20}" text-anchor="middle">${efEsc(value)}</text>` +
          labels(cx, cy, EF_R, name, sub),
        entityId,
        inactive
      );

    const strings =
      c.show_strings && (s1 !== null || s2 !== null)
        ? `${efFormat(s1, dec)} · ${efFormat(s2, dec)}`
        : "";

    parts.push(
      node(cx0, ry0, EF_ICONS.solar, EF_COLORS.solar, efFormat(solar, dec), t.solar, strings, c.solar_entity, solar !== null && Math.abs(solar) < 0.5)
    );

    // Headline is the share of the rated ceiling, so the node adds something the
    // home node and the flow label do not already say.
    const invPct = inv === null ? null : Math.max(0, Math.min(999, (Math.abs(inv) / rated) * 100));
    const invSub = `${efFormat(inv, dec)} / ${rated} W`;
    if (asDevice) {
      parts.push(
        wrapNode(
          efDrawPowerStream(cx1, ry0, EF_COLORS.charge, inv !== null && Math.abs(inv) > 0.5) +
            labels(cx1, ry0, invBox.bottom, t.inverter, invSub),
          c.inverter_entity,
          false
        )
      );
    } else {
      parts.push(
        node(
          cx1, ry0, EF_ICONS.inverter, EF_COLORS.inverter,
          invPct === null ? "—" : `${Math.round(invPct)} %`,
          t.inverter, invSub, c.inverter_entity, false
        )
      );
    }

    parts.push(
      node(cx2, ry0, EF_ICONS.home, EF_COLORS.home, efFormat(inv, dec), t.home, t.injected, c.inverter_entity, inv !== null && Math.abs(inv) < 0.5)
    );

    parts.push(
      node(cx0, ry1, EF_ICONS.grid, EF_COLORS.grid, efFormat(grid, dec), t.grid, "", c.grid_entity, grid === null || Math.abs(grid) < 0.5)
    );

    const batColor = bat === null || Math.abs(bat) < 0.5 ? EF_COLORS.inverter : charging ? EF_COLORS.charge : EF_COLORS.discharge;
    const batState = bat === null ? t.unavailable : Math.abs(bat) < 0.5 ? t.idle : charging ? t.charging : t.discharging;
    const pct = soc === null ? 0 : Math.max(0, Math.min(100, soc));
    // Level colour, deliberately separate from the charge-state colour: a full
    // battery sitting idle must not read as "inactive".
    const socColor =
      soc === null ? "#9aa1aa" : pct < 20 ? "#ef5350" : pct < 50 ? "#ffb020" : "#3ddc84";
    const socLabel = soc === null ? "—" : `${Math.round(pct)} %`;

    if (asDevice) {
      // The station's own display carries the state of charge.
      parts.push(
        wrapNode(
          efDrawDeltaPro(cx1, ry1, socLabel, socColor) +
            labels(cx1, ry1, batBox.bottom, t.battery, batState),
          c.soc_entity,
          false
        )
      );
    } else {
      const ringR = EF_R + 7;
      const circ = 2 * Math.PI * ringR;
      parts.push(`<g>
        <circle cx="${cx1}" cy="${ry1}" r="${ringR}" class="ring-bg" fill="none" stroke-width="4"/>
        <circle cx="${cx1}" cy="${ry1}" r="${ringR}" fill="none" stroke="${socColor}" stroke-width="4"
                stroke-linecap="round" stroke-dasharray="${((pct / 100) * circ).toFixed(1)} ${circ.toFixed(1)}"
                transform="rotate(-90 ${cx1} ${ry1})"/>
      </g>`);
      parts.push(
        node(cx1, ry1, EF_ICONS.battery, batColor, socLabel, t.battery, batState, c.soc_entity, false)
      );
    }

    parts.push(
      node(cx2, ry1, EF_ICONS.outputs, EF_COLORS.outputs, efFormat(outs, dec), t.outputs, "", c.outputs_entity || (c.output_entities || [])[0], outs === null || Math.abs(outs) < 0.5)
    );

    const svg = `<svg viewBox="0 0 560 336" role="img" preserveAspectRatio="xMidYMid meet">${EF_DEFS}${parts.join("")}</svg>`;
    this._wrap.innerHTML = svg;
    this._wrap.style.setProperty("--ef-cursor", c.clickable ? "pointer" : "default");

    if (c.clickable) {
      this._wrap.querySelectorAll("[data-ef-entity]").forEach((el) => {
        el.addEventListener("click", () => this._more(el.getAttribute("data-ef-entity")));
      });
    }
  }
}

/* ------------------------------------------------------------------- editor */

class EcoflowFlowCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...EF_DEFAULTS, ...config };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _emit(patch) {
    this._config = { ...this._config, ...patch };
    const ev = new CustomEvent("config-changed", { bubbles: true, composed: true });
    ev.detail = { config: this._config };
    this.dispatchEvent(ev);
    this._render();
  }

  _row(label, node) {
    const wrap = document.createElement("div");
    wrap.className = "row";
    const lab = document.createElement("div");
    lab.className = "lab";
    lab.textContent = label;
    wrap.appendChild(lab);
    wrap.appendChild(node);
    return wrap;
  }

  _entityPicker(key, value) {
    const el = document.createElement("ha-entity-picker");
    el.hass = this._hass;
    el.value = value || "";
    el.includeDomains = ["sensor"];
    el.allowCustomEntity = true;
    el.addEventListener("value-changed", (e) => {
      e.stopPropagation();
      this._emit({ [key]: e.detail.value || undefined });
    });
    return el;
  }

  _switch(key, value) {
    const el = document.createElement("ha-switch");
    el.checked = !!value;
    el.addEventListener("change", (e) => this._emit({ [key]: e.target.checked }));
    return el;
  }

  _text(key, value, type) {
    const el = document.createElement("ha-textfield");
    el.type = type || "text";
    el.value = value == null ? "" : String(value);
    el.addEventListener("change", (e) => {
      const v = e.target.value;
      this._emit({ [key]: type === "number" ? (v === "" ? undefined : Number(v)) : v || undefined });
    });
    return el;
  }

  _render() {
    if (!this._hass || !this._config) return;
    const t = EF_T[efLang(this._hass, this._config)];
    const c = this._config;

    this.innerHTML = `<style>
      .sec { font-weight: 600; margin: 16px 0 4px; color: var(--primary-color); }
      .row { display: flex; align-items: center; gap: 12px; margin: 6px 0; }
      .lab { flex: 1 1 auto; font-size: 14px; }
      .row > *:not(.lab) { flex: 0 0 auto; }
      ha-entity-picker, ha-textfield { flex: 1 1 60%; }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 2px 0 6px; }
      .chip { display:flex; align-items:center; gap:8px; margin:4px 0; }
      .chip ha-entity-picker { flex: 1 1 auto; }
      .fill { margin: 12px 0; }
    </style>`;

    const add = (n) => this.appendChild(n);
    const sec = (label) => {
      const d = document.createElement("div");
      d.className = "sec";
      d.textContent = label;
      add(d);
    };
    const hint = (text) => {
      const d = document.createElement("div");
      d.className = "hint";
      d.textContent = text;
      add(d);
    };

    add(this._row(t.title, this._text("title", c.title)));

    const langSel = document.createElement("ha-select");
    langSel.value = c.language || "auto";
    langSel.naturalMenuWidth = true;
    [["auto", t.auto], ...Object.entries(EF_LANGNAMES)].forEach(([v, n]) => {
      const it = document.createElement("mwc-list-item");
      it.value = v;
      it.textContent = n;
      langSel.appendChild(it);
    });
    langSel.addEventListener("selected", (e) => {
      const v = e.target.value;
      if (v && v !== (c.language || "auto")) this._emit({ language: v });
    });
    langSel.addEventListener("closed", (e) => e.stopPropagation());
    add(this._row(t.language, langSel));

    sec(t.secSolar);
    add(this._row(t.solarEntity, this._entityPicker("solar_entity", c.solar_entity)));
    add(this._row(t.solar1Entity, this._entityPicker("solar_1_entity", c.solar_1_entity)));
    add(this._row(t.solar2Entity, this._entityPicker("solar_2_entity", c.solar_2_entity)));

    sec(t.secInverter);
    add(this._row(t.inverterEntity, this._entityPicker("inverter_entity", c.inverter_entity)));
    add(this._row(t.ratedPower, this._text("rated_power", c.rated_power, "number")));

    sec(t.secBattery);
    add(this._row(t.batteryPowerEntity, this._entityPicker("battery_power_entity", c.battery_power_entity)));
    hint(t.batteryHint);
    add(this._row(t.batteryInvert, this._switch("battery_invert", c.battery_invert)));
    add(this._row(t.socEntity, this._entityPicker("soc_entity", c.soc_entity)));

    sec(t.secGrid);
    add(this._row(t.gridEntity, this._entityPicker("grid_entity", c.grid_entity)));

    sec(t.secOutputs);
    add(this._row(t.outputsEntity, this._entityPicker("outputs_entity", c.outputs_entity)));
    const list = (c.output_entities || []).slice();
    const listWrap = document.createElement("div");
    [...list, ""].forEach((id, i) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      const p = document.createElement("ha-entity-picker");
      p.hass = this._hass;
      p.value = id;
      p.includeDomains = ["sensor"];
      p.allowCustomEntity = true;
      p.addEventListener("value-changed", (e) => {
        e.stopPropagation();
        const next = list.slice();
        if (e.detail.value) next[i] = e.detail.value;
        else next.splice(i, 1);
        this._emit({ output_entities: next.filter(Boolean) });
      });
      chip.appendChild(p);
      listWrap.appendChild(chip);
    });
    add(this._row(t.outputEntities, listWrap));

    sec(t.secAppearance);

    const styleSel = document.createElement("ha-select");
    styleSel.value = c.device_style || "device";
    styleSel.naturalMenuWidth = true;
    [["device", t.styleDevice], ["icon", t.styleIcon]].forEach(([v, n]) => {
      const it = document.createElement("mwc-list-item");
      it.value = v;
      it.textContent = n;
      styleSel.appendChild(it);
    });
    styleSel.addEventListener("selected", (e) => {
      const v = e.target.value;
      if (v && v !== (c.device_style || "device")) this._emit({ device_style: v });
    });
    styleSel.addEventListener("closed", (e) => e.stopPropagation());
    add(this._row(t.deviceStyle, styleSel));

    add(this._row(t.animate, this._switch("animate", c.animate)));
    add(this._row(t.showStrings, this._switch("show_strings", c.show_strings)));
    add(this._row(t.dimInactive, this._switch("dim_inactive", c.dim_inactive)));
    add(this._row(t.clickable, this._switch("clickable", c.clickable)));
    add(this._row(t.decimals, this._text("decimals", c.decimals, "number")));

    const detected = efDetect(this._hass);
    const missing = Object.entries(detected).filter(([k, v]) => {
      if (k === "output_entities") return !(c.output_entities || []).length;
      return !c[k];
    });
    if (missing.length) {
      const btn = document.createElement("mwc-button");
      btn.className = "fill";
      btn.raised = true;
      btn.label = t.fillBtn;
      btn.addEventListener("click", () => this._emit(Object.fromEntries(missing)));
      const d = document.createElement("div");
      d.className = "hint";
      d.textContent = t.fillTitle;
      add(d);
      add(btn);
    }
  }
}

customElements.define("ecoflow-powerstream-flow-card", EcoflowFlowCard);
customElements.define("ecoflow-powerstream-flow-card-editor", EcoflowFlowCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ecoflow-powerstream-flow-card",
  name: "EcoFlow PowerStream Flow Card",
  description: "Animated power flow for an EcoFlow PowerStream + battery chain: strings, inverter, battery and outputs.",
  preview: true,
  documentationURL: "https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card",
});
