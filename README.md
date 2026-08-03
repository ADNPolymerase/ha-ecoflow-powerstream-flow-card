<p align="center">
  <img src="https://brands.home-assistant.io/ecoflow_cloud/logo.png" alt="EcoFlow" height="80">
</p>

# EcoFlow PowerStream Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-ecoflow-powerstream-flow-card?sort=semver)](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/blob/main/LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

Multilingual (6 languages: EN, FR, DE, ES, IT, NL — auto-detected from Home Assistant).

An animated power-flow card for a **PowerStream + EcoFlow battery** chain, drawn the way that
chain is actually wired — not as a house with a meter.

> 🇫🇷 [Lire en français](README.fr.md)

![EcoFlow PowerStream Flow Card](https://raw.githubusercontent.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/main/docs/screenshot.png)

## Why another flow card

Every power-flow card starts from the same picture: `grid ↔ inverter ↔ battery ↔ home`, with a
house-consumption sensor and a bidirectional meter. A plug-in balcony setup has neither. The
PowerStream injects **behind** the meter, so there is nothing to measure, and the battery is
charged **by the inverter's own MPPT**, not by the grid through it.

This card draws the real topology instead:

```
  ☀ Solar ──────→ [PowerStream] ──────→ 🏠 Home (injected)
                        ↕
  ⚡ Grid  ──────→ [ Battery  ] ──────→ 🔌 Outputs
```

Two rows, five flows, and only one of them is bidirectional — the link between the inverter and
the battery. No sensor you do not have is required.

## Features

- **The real chain, not a template**: solar strings → inverter → home on the top row, grid charge →
  battery → the station's own AC/USB/DC outputs on the bottom row.
- **One signed sensor drives the battery link**: negative charges the battery, positive feeds the
  inverter, and the arrow flips direction and colour with it. `battery_invert: true` if your
  integration signs it the other way round.
- **The devices, drawn**: the PowerStream as its aluminium slab with a **status LED that follows
  the manual's colour code**, and the power station with the live state of charge on its own
  display. Original SVG — it follows the theme and scales to any width. `device_style: icon` swaps
  both for plain icons.
- **Animation carries the magnitude**: dash speed scales with power against `rated_power`, so a
  quick glance tells you 80 W from 700 W. Honours `prefers-reduced-motion`.
- **Inverter headroom**: the icon-mode inverter node shows the share of the rated ceiling used, not
  a third copy of the number already on the arrow and the home node.
- **Level and state are separate**: the ring (or the display) is coloured by state of charge —
  red, amber, green — while the node itself follows charging / discharging / idle. A full battery
  sitting idle does not read as "inactive".
- **Inactive branches dim** instead of disappearing, so the layout never jumps.
- **Outputs, summed**: list the station's output sensors and the card adds them up. Beware the
  vendor's own "total out" sensor — on a DELTA Pro it *includes* the discharge to the PowerStream
  and would double-count.
- **Auto-detection**: the editor finds the PowerStream and station sensors by name and offers one
  button to fill everything in.
- Native HA editor (entity pickers) + full YAML control.

Works with any integration that exposes the sensors — written against
[tolwi/hassio-ecoflow-cloud](https://github.com/tolwi/hassio-ecoflow-cloud).

The drawn power station follows the DELTA design language (silver top cap and handle, display,
2×2 socket panel). It stands in for the whole DELTA family rather than matching one model exactly;
use `device_style: icon` if you would rather not have a drawing that is not your unit.

## Installation (HACS)

1. HACS → three dots → **Custom repositories**
2. Add `https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card` with category **Dashboard**
3. Install **EcoFlow PowerStream Flow Card**, then hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)

Manual alternative: copy `ecoflow-powerstream-flow-card.js` from the [latest release](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/releases) to `config/www/`, then add `/local/ecoflow-powerstream-flow-card.js` as a JavaScript-module resource.

## Usage

Add the card from the dashboard UI (search "EcoFlow") — the sensors are auto-detected and the
editor offers to fill in anything missing. Or in YAML:

```yaml
type: custom:ecoflow-powerstream-flow-card
solar_entity: sensor.powerstream_solar_total
solar_1_entity: sensor.powerstream_solar_1_watts
solar_2_entity: sensor.powerstream_solar_2_watts
inverter_entity: sensor.powerstream_inverter_output_watts
battery_power_entity: sensor.powerstream_battery_input_watts
soc_entity: sensor.delta_pro_battery_level
grid_entity: sensor.delta_pro_ac_in_power
output_entities:
  - sensor.delta_pro_ac_out_power
  - sensor.delta_pro_dc_out_power
rated_power: 800
```

| Option | Default | Description |
|---|---|---|
| `solar_entity` | auto | Total solar power into the inverter's MPPT |
| `solar_1_entity` / `solar_2_entity` | auto | Per-string power, shown under the solar node |
| `inverter_entity` | auto | Inverter output injected into the home |
| `rated_power` | `800` | Inverter ceiling in W — scales the animation and the headroom figure |
| `battery_power_entity` | auto | **Signed** battery power: negative = charging, positive = discharging |
| `battery_invert` | `false` | Reverse that sign convention |
| `soc_entity` | auto | Battery state of charge (%) |
| `grid_entity` | auto | AC charging power drawn from the grid |
| `smart_plug_entity` | auto | Smart Plug loads — drives the breathing-green LED state |
| `output_entities` | auto | Output sensors, summed for the outputs node |
| `outputs_entity` | — | A single pre-summed sensor instead of the list above |
| `device_style` | `device` | `device` draws the units, `icon` uses plain icons |
| `animate` | `true` | Animate the flows |
| `show_strings` | `true` | Show both strings under the solar node |
| `dim_inactive` | `true` | Dim branches carrying no power |
| `clickable` | `true` | Open more-info when a node is tapped |
| `decimals` | `0` | Decimals on watt values |
| `title` | — | Card header |
| `language` | `auto` | `auto`, `en`, `fr`, `de`, `es`, `it`, `nl` |

## Status LED

The drawn PowerStream reproduces the colour code from the
[PowerStream user manual](https://websiteoss.ecoflow.com/cms/upload/2023/6/9/EcoFlow%20PowerStream%20Microinverter%20User%20Manual%20V1.1%20(EN)_1686293304065.pdf),
for the states Home Assistant can actually see:

| LED | Meaning | Derived from |
|---|---|---|
| 🟢 Green, breathing | AC output, power fed to Smart Plug(s) | `inverter_entity` > 0 and `smart_plug_entity` > 0 |
| 🟢 Green, solid | AC output, nothing fed to Smart Plug(s) | `inverter_entity` > 0 |
| 🟣 Purple | PV in and/or the station charging, no AC output | `inverter_entity` = 0, solar in or battery charging |
| ⚪ White, solid | Powered on, no output at all | everything at 0 |
| ⚫ Grey | Sensors unavailable | — |

The manual's three remaining states — **blue blinking** (pairing), **yellow** (warning) and
**red** (error) — are not exposed as sensors by the integration, so the card never shows them
rather than guessing. A card claiming "no error" it cannot verify would be worse than a card that
stays quiet.

## Sign convention

The card needs exactly one signed sensor for the battery link. On
`tolwi/hassio-ecoflow-cloud`, `sensor.powerstream_battery_input_watts` is measured from the
inverter's point of view:

- **negative** — the inverter is charging the battery (down to `-600 W` on a 600 W storage setpoint)
- **positive** — the battery is feeding the inverter (up to `+200 W` on a 200 W supply setpoint)

If your sensor reads the other way, set `battery_invert: true` rather than building a template.

## Licence

MIT. The device drawings are original SVG artwork; EcoFlow, PowerStream and DELTA are trademarks of
EcoFlow, used here only to name the hardware the card supports.
