/**
 * ecoflow-powerstream-flow-card — behaviour tests.  Run with:  node test/run.mjs
 *
 * Two families of failure this card has actually shipped, or could:
 *
 *   1. A dead editor. From v0.1.0 to v0.2.1 config-changed was built with
 *      new CustomEvent(...) and had its detail assigned afterwards. detail is a
 *      readonly accessor, so the assignment was dropped, Home Assistant received
 *      null and discarded every edit. No console error, nothing to see. A test
 *      that only checks the DOM survives passes right through it, which is
 *      exactly what happened, so the assertion here is on detail.config.
 *
 *   2. A sign convention read the wrong way round. The battery link runs off one
 *      signed sensor; flip it and the card renders perfectly while saying the
 *      opposite of the truth. Direction is asserted on the path geometry, not
 *      just on the label.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { loadCard, check, contains, report } from './harness.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
// CARD_FILE lets the same suite run against an older build, which is how the
// v0.2.1 editor regression is demonstrated rather than described.
const SRC  = process.env.CARD_FILE
  ? resolve(process.env.CARD_FILE)
  : join(HERE, '..', 'dist', 'ecoflow-powerstream-flow-card.js');

const registry = await loadCard(SRC);
const Card   = registry.get('ecoflow-powerstream-flow-card');
const Editor = registry.get('ecoflow-powerstream-flow-card-editor');

// ── Fixtures ─────────────────────────────────────────────────────────────────

const W   = v => ({ state: String(v), attributes: { unit_of_measurement: 'W' } });
const KW  = v => ({ state: String(v), attributes: { unit_of_measurement: 'kW' } });
const PCT = v => ({ state: String(v), attributes: { unit_of_measurement: '%' } });
const DEAD = { state: 'unavailable', attributes: {} };

const BASE = {
  solar_entity        : 'sensor.solar_total',
  solar_1_entity      : 'sensor.solar_1',
  solar_2_entity      : 'sensor.solar_2',
  inverter_entity     : 'sensor.inverter_out',
  battery_power_entity: 'sensor.battery_in',
  soc_entity          : 'sensor.soc',
  grid_entity         : 'sensor.grid_in',
  smart_plug_entity   : 'sensor.plugs',
  output_entities     : ['sensor.ac_out', 'sensor.dc_out'],
  rated_power         : 800,
  title               : 'Test',
};

/** hass.states for one moment of the chain. Overrides replace whole entities. */
function scene({ solar = 0, s1 = 0, s2 = 0, inv = 0, bat = 0, soc = 50,
                 grid = 0, plugs = 0, ac = 0, dc = 0, ...over } = {}) {
  return {
    'sensor.solar_total' : W(solar),
    'sensor.solar_1'     : W(s1),
    'sensor.solar_2'     : W(s2),
    'sensor.inverter_out': W(inv),
    'sensor.battery_in'  : W(bat),
    'sensor.soc'         : PCT(soc),
    'sensor.grid_in'     : W(grid),
    'sensor.plugs'       : W(plugs),
    'sensor.ac_out'      : W(ac),
    'sensor.dc_out'      : W(dc),
    ...over,
  };
}

/**
 * Renders the card and hands back its SVG.
 *
 * The card draws into a node it found with querySelector, which the harness
 * returns as an inert stub, so the markup never reaches shadowRoot.markup and
 * has to be read off _wrap directly. Two stub methods the harness has no reason
 * to provide are filled in so _update() can run to the end.
 */
function render(states, cfg = {}, lang = 'en') {
  try {
    const c = new Card();
    c.setConfig({ ...BASE, ...cfg });
    c._build();
    c._wrap.style.setProperty = () => {};
    c._card.removeAttribute   = () => {};
    c.hass = { states, locale: { language: lang } };
    return c._wrap.innerHTML;
  } catch (e) {
    // A broken build must show up as red assertions, not abort the run: the
    // point of the suite is to list everything that regressed at once.
    return `(exception) ${e.message}`;
  }
}

/** Last event dispatched by `el` after calling `fn`, or the throw it produced. */
function fired(el, fn) {
  try { fn(); return el.events.at(-1); }
  catch (e) { return { type: `(exception) ${e.message}` }; }
}

const led      = svg => (svg.match(/class="ef-led[^"]*"[\s\S]*?fill="([^"]+)"/) || [])[1];
/** Every <text class="sub"> in document order. */
const subs     = svg => [...svg.matchAll(/<text class="sub"[^>]*>([^<]*)<\/text>/g)].map(m => m[1]);
const walk     = (n, out = []) => { for (const c of n.children ?? []) { out.push(c); walk(c, out); } return out; };

/** Fill of the arrowhead travelling along path `d`, or undefined if none does. */
function chevronFill(svg, d) {
  const esc = d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (svg.match(new RegExp(`fill="(#[0-9a-f]{6})"><animateMotion[^>]*path="${esc}"`)) || [])[1];
}

// Geometry of the inverter → battery link, from EF_ROWS/EF_BOX/EF_GAP.
const DOWN = 'M 280 119 L 280 196';   // inverter charging the battery
const UP   = 'M 280 196 L 280 119';   // battery feeding the inverter

// ── 1. The editor contract ───────────────────────────────────────────────────
// The regression that shipped. detail must survive, or every edit is discarded.

const ed = new Editor();
try {
  ed.setConfig({ ...BASE });
  ed.hass = { states: scene(), locale: { language: 'fr' } };
} catch (e) {
  console.log(`⚠️  le rendu de l'éditeur a levé : ${e.message}`);
}

// In a browser the card is a classic script, so assigning a readonly accessor is
// a silent no-op. Under Node it is strict mode and throws. Both are the bug.
const ev = fired(ed, () => ed._emit({ flow_style: 'dashes' }));

check("l'éditeur émet config-changed", ev?.type, 'config-changed');
check('config-changed porte bien detail.config',
  ev?.detail?.config?.flow_style, 'dashes');
check('config-changed ne perd pas le reste de la config',
  ev?.detail?.config?.solar_entity, 'sensor.solar_total');
check('config-changed remonte (bubbles) et traverse le shadow DOM (composed)',
  `${ev?.bubbles}/${ev?.composed}`, 'true/true');

const listEv = fired(ed, () => ed._emit({ home_consumers: ['sensor.fridge'] }, true));
check('un changement de liste porte aussi son detail',
  listEv?.detail?.config?.home_consumers?.[0], 'sensor.fridge');

const cardForMoreInfo = new Card();
cardForMoreInfo.setConfig({ ...BASE });
const infoEv = fired(cardForMoreInfo, () => cardForMoreInfo._more('sensor.solar_total'));
check('hass-more-info porte son detail.entityId',
  infoEv?.detail?.entityId, 'sensor.solar_total');

// ── 2. The editor's controls ─────────────────────────────────────────────────
// mwc-list-item is not registered in recent frontends: items built from it are
// inert and the control falls back to showing the raw config value.

const built = walk(ed);
const tag = t => built.filter(n => n.tagName === t).length;

check('aucun mwc-list-item construit', tag('MWC-LIST-ITEM'), 0);
check('aucun ha-select construit', tag('HA-SELECT'), 0);
check('3 ha-selector construits (langue, style de nœuds, style de flux)',
  tag('HA-SELECTOR'), 3);

const selectors = built.filter(n => n.tagName === 'HA-SELECTOR');
check('les options arrivent comme données, pas comme enfants inertes',
  selectors[2]?.selector?.select?.options?.length, 2);
check('les libellés des options sont traduits',
  selectors[2]?.selector?.select?.options?.map(o => o.label).join(' / '),
  'Pointes de flèche / Tirets');
check('chaque ha-selector reçoit hass', selectors.every(s => !!s.hass), true);

// The only textual occurrence left in the source must be prose, not a control.
const src = readFileSync(SRC, 'utf8');
const liveListItem = src
  .split('\n')
  .some(l => l.includes('mwc-list-item') && /createElement|appendChild/.test(l));
check('mwc-list-item résiduel : commentaire, pas un dropdown actif', liveListItem, false);

// ── 3. Battery sign convention ───────────────────────────────────────────────
// Negative charges the battery, positive feeds the inverter. A flipped sign
// renders perfectly, so the arrow geometry is asserted, not only the wording.

const charging = render(scene({ solar: 685, s1: 342, s2: 343, inv: 96, bat: -568, soc: 72 }));
contains('batterie négative → état "Charging"', subs(charging).join('|'), 'Charging');
contains('batterie négative → flux dessiné du haut vers le bas', charging, DOWN);
check('batterie négative → chevrons en couleur de charge', chevronFill(charging, DOWN), '#3ddc84');

const discharging = render(scene({ inv: 196, bat: 217, soc: 34 }));
contains('batterie positive → état "Discharging"', subs(discharging).join('|'), 'Discharging');
contains('batterie positive → flux dessiné du bas vers le haut', discharging, UP);
check('batterie positive → chevrons en couleur de décharge', chevronFill(discharging, UP), '#ffb020');

const inverted = render(scene({ inv: 196, bat: 217, soc: 34 }), { battery_invert: true });
contains('battery_invert → le même capteur devient une charge', subs(inverted).join('|'), 'Charging');
contains('battery_invert → et le sens du flux s\'inverse', inverted, DOWN);

const idle = render(scene({ inv: 0, bat: 0, soc: 95 }));
contains('batterie à zéro → état "Idle"', subs(idle).join('|'), 'Idle');
// At 0 W the link is still drawn, but nothing may travel along it. Which of the
// two directions the inert track carries is meaningless, so it is not asserted.
check('batterie à zéro → liaison tracée mais sans flux',
  /class="track" d="M 280 \d+ L 280 \d+"/.test(idle) && !/path="M 280 \d+ L 280 \d+"/.test(idle), true);

// ── 4. Sums and units ────────────────────────────────────────────────────────

contains('les deux strings sont affichées séparément',
  render(scene({ solar: 685, s1: 342, s2: 343 })), '342 W · 343 W');

contains('les sorties sont additionnées (15 + 2.3 → 17 W)',
  render(scene({ ac: 15, dc: 2.3 })), '17 W');

contains('une sortie indisponible n\'annule pas la somme des autres',
  render(scene({ ac: 15, 'sensor.dc_out': DEAD })), '15 W');

contains('les kW sont normalisés en W puis reformatés',
  render(scene({ 'sensor.solar_total': KW(1.5) })), '1.5 kW');

check('la puissance nominale cadre le pourcentage de l\'onduleur',
  /400 W \/ 800 W/.test(render(scene({ inv: 400 }))), true);

// ── 5. Unavailable and missing entities ──────────────────────────────────────
// null must reach the display as an em dash, never as a silent zero.

const deadSolar = render(scene({ 'sensor.solar_total': DEAD }));
contains('capteur solaire unavailable → tiret, pas 0 W', deadSolar, '—');

const missing = render(scene({}), { soc_entity: 'sensor.nope' });
contains('entité absente de hass → tiret', missing, '—');
check('entité absente → pas de 0 % inventé', /<text class="val"[^>]*>0 %<\/text>/.test(missing), false);

const socDead = render(scene({ 'sensor.soc': DEAD }));
contains('SoC unavailable → tiret sur l\'écran de la station', socDead, '—');

check('tout indisponible → rendu sans exception',
  typeof render({ }) === 'string', true);

// ── 6. Status LED ────────────────────────────────────────────────────────────
// Reproduces the manual's colour code, and only the states a sensor can prove.

check('injection en cours → LED verte', led(render(scene({ inv: 410, bat: -260 }))), '#35d07f');
check('charge sans sortie CA → LED violette', led(render(scene({ solar: 312, inv: 0, bat: -305 }))), '#a259ff');
check('tout au repos → LED blanche', led(render(scene({}))), '#ffffff');
check('injection vers des Smart Plug → LED en respiration',
  /class="ef-led breathe"/.test(render(scene({ inv: 410, plugs: 180 }))), true);
check('injection sans Smart Plug → LED fixe',
  /class="ef-led breathe"/.test(render(scene({ inv: 410, plugs: 0 }))), false);

// ── 7. Household consumers ───────────────────────────────────────────────────
// The branch may only animate while the inverter actually injects: a load on
// grid power is not being fed by the panels.

const CONSUMER = { home_consumers: ['sensor.fridge'] };
const fridge = { 'sensor.fridge': W(140) };

const fed = render(scene({ inv: 410, ...fridge }), CONSUMER);
contains('la branche du consommateur est tracée', fed, 'M 532 88 C');
check('injection en cours → la branche est animée', fed.includes('path="M 532 88 C'), true);

const notFed = render(scene({ inv: 0, ...fridge }), CONSUMER);
contains('sans injection, la charge affiche quand même sa puissance', notFed, '140 W');
check('sans injection → branche non animée', notFed.includes('path="M 532 88 C'), false);

// ── 8. Escaping ──────────────────────────────────────────────────────────────

const named = render(
  { ...scene({ inv: 410 }), 'sensor.fridge': { state: '140', attributes: { unit_of_measurement: 'W', friendly_name: 'Frigo "atelier" <b>' } } },
  CONSUMER);
contains('nom de consommateur échappé', named, 'Frigo &quot;atelier&quot; &lt;b&gt;');
check('nom de consommateur : rien d\'injecté', /Frigo "atelier" <b>/.test(named), false);

report();
