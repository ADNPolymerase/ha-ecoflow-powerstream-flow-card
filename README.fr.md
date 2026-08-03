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
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Multilingue (6 langues : EN, FR, DE, ES, IT, NL — détectées depuis Home Assistant).

Une card de flux animée pour une chaîne **PowerStream + batterie EcoFlow**, dessinée telle qu'elle
est réellement câblée — pas comme une maison avec un compteur.

> 🇬🇧 [Read in English](README.md)

![EcoFlow PowerStream Flow Card](https://raw.githubusercontent.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/main/docs/screenshot.fr.png)

## Pourquoi encore une card de flux

Toutes les cards de flux partent de la même image : `réseau ↔ onduleur ↔ batterie ↔ maison`, avec
un capteur de consommation maison et un compteur bidirectionnel. Une installation plug-and-play
n'a ni l'un ni l'autre. Le PowerStream injecte **derrière** le compteur, donc il n'y a rien à
mesurer, et la batterie est chargée **par le MPPT de l'onduleur lui-même**, pas par le réseau à
travers lui.

Cette card dessine la vraie topologie :

```
  ☀ Solaire ────→ [PowerStream] ────→ 🏠 Maison (injecté)
                        ↕
  ⚡ Réseau  ────→ [ Batterie  ] ────→ 🔌 Sorties
```

Deux rangées, cinq flux, et un seul est bidirectionnel : la liaison onduleur ↔ batterie. Aucun
capteur que vous n'avez pas n'est exigé.

## Fonctionnalités

- **La vraie chaîne, pas un gabarit** : strings solaires → onduleur → maison en haut, charge
  réseau → batterie → sorties AC/USB/DC de la station en bas.
- **Un seul capteur signé pilote la liaison batterie** : négatif charge la batterie, positif
  alimente l'onduleur, et la flèche change de sens et de couleur avec lui. `battery_invert: true`
  si votre intégration signe dans l'autre sens.
- **Les appareils, dessinés** : le PowerStream en boîtier alu avec sa LED d'état allumée pendant
  l'injection, et la station avec son état de charge en direct sur son propre écran. SVG original —
  il suit le thème et se met à l'échelle. `device_style: icon` remet des icônes simples.
- **L'animation porte l'ordre de grandeur** : la vitesse des tirets suit la puissance rapportée à
  `rated_power`, donc un coup d'œil suffit pour distinguer 80 W de 700 W. Respecte
  `prefers-reduced-motion`.
- **Marge de l'onduleur** : en mode icônes, le nœud onduleur affiche la part du plafond utilisée,
  pas une troisième copie du chiffre déjà présent sur la flèche et sur le nœud maison.
- **Niveau et état sont dissociés** : l'anneau (ou l'écran) est coloré par l'état de charge —
  rouge, ambre, vert — tandis que le nœud suit charge / décharge / repos. Une batterie pleine à
  l'arrêt ne doit pas se lire comme « inactive ».
- **Les branches inactives s'estompent** au lieu de disparaître : la mise en page ne saute jamais.
- **Sorties additionnées** : listez les capteurs de sortie de la station, la card fait la somme.
  Attention au capteur « total out » du constructeur — sur un DELTA Pro il **inclut** la décharge
  vers le PowerStream et provoquerait un double comptage.
- **Détection automatique** : l'éditeur trouve les capteurs PowerStream et station par leur nom et
  propose un bouton pour tout remplir.
- Éditeur HA natif (sélecteurs d'entités) + contrôle YAML complet.

Fonctionne avec toute intégration exposant ces capteurs — écrite contre
[tolwi/hassio-ecoflow-cloud](https://github.com/tolwi/hassio-ecoflow-cloud).

La station dessinée suit le langage visuel de la gamme DELTA (capot argent avec poignée, écran,
panneau 2×2 de prises). Elle représente la famille DELTA plutôt qu'un modèle précis ; utilisez
`device_style: icon` si vous préférez éviter un dessin qui n'est pas votre appareil.

## Installation (HACS)

1. HACS → trois points → **Dépôts personnalisés**
2. Ajouter `https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card` en catégorie **Tableau de bord**
3. Installer **EcoFlow PowerStream Flow Card**, puis rafraîchir sans cache (Ctrl+Maj+R / Cmd+Maj+R)

Alternative manuelle : copier `ecoflow-powerstream-flow-card.js` depuis la [dernière release](https://github.com/ADNPolymerase/ha-ecoflow-powerstream-flow-card/releases) dans `config/www/`, puis ajouter `/local/ecoflow-powerstream-flow-card.js` comme ressource module JavaScript.

## Utilisation

Ajoutez la card depuis l'interface (cherchez « EcoFlow ») — les capteurs sont détectés
automatiquement et l'éditeur propose de compléter ce qui manque. Ou en YAML :

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

| Option | Défaut | Description |
|---|---|---|
| `solar_entity` | auto | Puissance solaire totale entrant dans le MPPT de l'onduleur |
| `solar_1_entity` / `solar_2_entity` | auto | Puissance par string, affichée sous le nœud solaire |
| `inverter_entity` | auto | Sortie de l'onduleur injectée dans la maison |
| `rated_power` | `800` | Plafond de l'onduleur en W — cadre l'animation et le calcul de marge |
| `battery_power_entity` | auto | Puissance batterie **signée** : négatif = charge, positif = décharge |
| `battery_invert` | `false` | Inverser cette convention de signe |
| `soc_entity` | auto | État de charge de la batterie (%) |
| `grid_entity` | auto | Puissance de charge AC tirée du réseau |
| `output_entities` | auto | Capteurs de sortie, additionnés pour le nœud sorties |
| `outputs_entity` | — | Un capteur déjà totalisé à la place de la liste ci-dessus |
| `device_style` | `device` | `device` dessine les appareils, `icon` met des icônes |
| `animate` | `true` | Animer les flux |
| `show_strings` | `true` | Afficher les deux strings sous le nœud solaire |
| `dim_inactive` | `true` | Estomper les branches sans puissance |
| `clickable` | `true` | Ouvrir more-info au clic sur un nœud |
| `decimals` | `0` | Décimales sur les valeurs en watts |
| `title` | — | En-tête de la card |
| `language` | `auto` | `auto`, `en`, `fr`, `de`, `es`, `it`, `nl` |

## Convention de signe

La card a besoin d'exactement un capteur signé pour la liaison batterie. Sur
`tolwi/hassio-ecoflow-cloud`, `sensor.powerstream_battery_input_watts` est mesuré du point de vue
de l'onduleur :

- **négatif** — l'onduleur charge la batterie (jusqu'à `-600 W` sur une consigne stockage 600 W)
- **positif** — la batterie alimente l'onduleur (jusqu'à `+200 W` sur une consigne supply 200 W)

Si votre capteur va dans l'autre sens, mettez `battery_invert: true` plutôt que de fabriquer un
template.

## Licence

MIT. Les dessins des appareils sont des illustrations SVG originales ; EcoFlow, PowerStream et
DELTA sont des marques d'EcoFlow, citées uniquement pour désigner le matériel pris en charge.
