# Pinellas XD Virtual City

An open-source **civic front door** and **3D virtual city map of Pinellas County, Florida** — kids-friendly on the surface, serious under the hood.

Connect **Phantom**, an **EVM wallet**, or a **DEMO civic pass**. Vote, ride, and watch every DEMO cent as the city interacts — then flip style skins (Realistic, Kids, Roblox-like, Lego-like, Blueprint) and peel municipal infrastructure layers on the peninsula.

Working title: **Pinellas County, Florida — Agentic Smart City**.

This is a civic demo, not an official county product, not medical advice, and not a live blockchain. City funds, fares, and votes in this app stay **DEMO-labeled**.

**Public GitHub (MIT):** [github.com/masterledgerlive/pinellas-xd-virtual-city](https://github.com/masterledgerlive/pinellas-xd-virtual-city)

## How to access it

| Where | What you get |
| --- | --- |
| [GitHub repo](https://github.com/masterledgerlive/pinellas-xd-virtual-city) | Source, MIT license, issues, forks |
| Landing `/` | City front door — connect a wallet or DEMO pass |
| `/wallet` | Roles (visitor / resident / city-ops) and civic actions |
| `/map` | 3D Pinellas map, skins, layers, agents, live DEMO ledger |
| `/references` | 22 world smart-city write-ups |
| `/safety` | Family ethos |

1. Open the [public repository](https://github.com/masterledgerlive/pinellas-xd-virtual-city).
2. Click **Code → HTTPS or SSH** and clone, or use **Use this template / Fork**.
3. Run it locally (below). The landing page is the city’s access point.

If you are looking at this project inside Cursor and do not yet see it on GitHub, create or connect a repository from the **Create repo** control, then the same MIT source is what you publish.

## License

**MIT.** See [LICENSE](LICENSE). You may use, copy, modify, merge, publish, distribute, sublicense, and sell the software, provided the copyright notice and permission notice stay with copies.

```
Copyright (c) 2026 Pinellas XD contributors
```

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server binds to **http://127.0.0.1:4321**.

| Script | What it does |
| --- | --- |
| `npm run dev` | Civic landing + map (hot reload) |
| `npm run build` | Typecheck + production bundle in `dist/` |
| `npm run preview` | Serve the static `dist/` build on port 4321 |
| `npm run lint` | Oxlint |

Static-friendly path: `npm run build && npm run preview`. Routes are `/` (landing), `/map`, `/wallet`, `/references`, `/safety`. A convenience redirect lives at `public/references.html`. Hosts that do not rewrite unknown paths to `index.html` should enable SPA fallback.

No API keys. No production secrets. Optional later: `VITE_AGENT_URL` for a real agent backend (the chat UI already posts `{ districtId, layers, prompt }`).

## Civic wallet (how the city interacts)

The landing page is the public door. A wallet does **not** move mainnet money. Connecting Phantom or MetaMask (or any injected EIP-1193 wallet) signs a civic-bind message and mints a local DEMO pass (`PXD-SOL-…` / `PXD-EVM-…`). Anyone can skip extensions and take a **DEMO civic pass**.

Once bound, the same pass is how the city interacts in all the demo ways:

| Gate | What posts to the ledger |
| --- | --- |
| Visitor pass | Time-bounded credential, seats, pier access |
| Weighted votes | Shade, night buses, lighting — weight from **role**, not wealth |
| Public spend | City-ops DEMO invoices, visible to the cent |
| Household data-pay | Opt-in flood / heat / wait-time pings |

The map’s visitor panel and `/wallet` share one DEMO ledger. Grants (municipal line items) stay listed without changing your pass balance.

**Not official county credentials. Not financial advice. Not a live chain.**

## What you can do in the MVP

1. **Land on `/`** — connect Phantom, EVM, or DEMO, then enter the map or the wallet desk.
2. **Orbit and inspect** the peninsula — 24 incorporated municipalities from US Census TIGERweb polygons, plus unincorporated labels (Palm Harbor, East Lake, Lealman, …).
3. **Click a district** for a dossier and agent suggestions. Hover for population tooltips (Census 2020, rounded).
4. **Switch skins instantly** — CSS + MapLibre paint/material swaps, not a game engine.
5. **Toggle 11 layers** (municipal boundaries + 10 overlays). At least sewage, water, power, transit, IoT, drones, flying-car, plasma/data, household data-pay, and voting. Each has a plain-language explainer.
6. **Ask the agent stub** to propose a district project (local mocks; hook for a real agent).
7. **Open the civic ledger** — every DEMO cent listed; wallet actions prepend new rows.
8. **Read `/references`** — 22 global smart-city write-ups with sources.
9. **Read `/safety`** — parents as parents, robots + humans, nobody left behind.

Keyboard: `1`–`5` switch skins while the map is focused (not while typing).

## Why this map stack

Developers building 3D city / digital-twin views in 2024–2026 typically pick one of:

| Stack | Why people use it | Why we did or didn’t |
| --- | --- | --- |
| **MapLibre GL JS + vector tiles** | Open-source Mapbox GL fork. Fill-extrusions, GeoJSON overlays, style JSON. No vendor lock-in. | **Chosen.** Instant skin restyle via `setPaintProperty`, GeoJSON infrastructure layers, 3D buildings. |
| **OpenFreeMap** | OSM vector tiles, **no API key**, Liberty style includes building heights. | **Chosen as basemap.** Realistic skin shows real streets and OSM 3D buildings at higher zoom. |
| Mapbox GL | Same renderer family; requires a token and ToS. | Skipped so `npm run dev` works offline-of-accounts. |
| CesiumJS | True globe, 3D Tiles, photogrammetry. | Heavier than an MVP that must also do Lego/Roblox skins. |
| Three.js + GeoJSON | Full material control. | Used *spiritually* via fill-extrusion “toy blocks”; MapLibre still gives GIS camera, labels, and tiles. |
| deck.gl | Huge overlay performance. | Unnecessary at county scale with ~300 illustrative buildings. |

**Honest geography:** municipality polygons are simplified Census TIGERweb places (Florida, Pinellas bbox, Tampa excluded). County outline is Census GEOID `12103`. Infrastructure **lines are schematic**, grounded in public roles (PLANPinellas, PCU, Tampa Bay Water, PSTA SunRunner, Duke Energy Florida territory) — not as-built GIS, not a locate ticket, not an FAA chart.

If OpenFreeMap is slow to load, the app falls back to a local 3D GeoJSON city after a few seconds so the demo still runs.

## Architecture

```
src/
  pages/           Landing, Explore (map), Wallet, References, Safety
  context/         Civic session + shared DEMO ledger
  lib/wallet.ts    Phantom / EIP-1193 / DEMO bind (message sign only)
  components/      MapCanvas, skins, layers, agents, ledger, header
  data/            municipalities, layers, skins, cities, ledger, agent mocks
public/geojson/    Census-derived polygons + generated schematic layers
LICENSE            MIT
```

- **UI:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4. shadcn-style primitives (`Button`, composition) without a second component library.
- **Map:** `maplibre-gl` on a full-viewport canvas. Vector tiles from OpenFreeMap (no API key). MapLibre’s worker scripts are vendored in `public/maplibre/` so Vite can load them. Sources in `public/geojson`. Skins mutate paint. Layers toggle `visibility`.
- **Wallets:** injected `window.solana` (Phantom) and `window.ethereum` (EIP-1193 `personal_sign`). No Phantom Portal app id, no custody, no mainnet send.
- **Agents:** `src/data/agent.ts` — mock civic/pipe/grid/mobility/safety voices. `VITE_AGENT_URL` is the future hook.
- **Ledger:** `src/data/ledger.ts` + `WalletContext` — DEMO amounts in integer cents so “every cent” is literal.
- **References:** `src/data/cities.ts` — 22 cities, each with sources. IMD ranks are survey indexes, quoted as such.

Pinellas facts encoded in the UI (not invented):

- **24 municipalities** listed by [pinellas.gov](https://pinellas.gov/municipalities-and-cities/).
- **PSTA SunRunner** — Tampa Bay’s first BRT, ~10 miles, St. Pete Beach ↔ downtown St. Petersburg, service began 21 Oct 2022 ([PSTA](https://psta.net/services/sunrunner/), [Forward Pinellas](https://forwardpinellas.org/safety/sunrunner/)).
- **Wastewater split** — Dunn WRF (north) and South Cross Bayou (south); several cities keep their own systems (PLANPinellas / PCU manuals).
- **Tampa Bay Water** — regional wholesale supplier to member governments since 1998.
- **Duke Energy Florida** + **PSTA 2022** electric-bus charging agreement.

## Conceptual layers (read this)

- **Plasma / blood-bank nodes** — civic pins near hospital clusters. Not medical advice, not a clinic list, not a marketplace. Lawful collection already exists under FDA rules elsewhere; this map does not recruit anyone.
- **Household data-pay** — opt-in dividend *idea*. Services work if you never participate.
- **Weighted voting** — complementary DEMO ballots weighted by proven residency + consented civic data, **not money**. Does not replace the Supervisor of Elections.
- **Visitor pass / “our own blockchain”** — a **mock municipal ledger** you can bind a real wallet to (message only). No mainnet, no real funds. The product vision is: every fare, vote, and public cent is the same accountable list.
- **Drone / eVTOL corridors** — planning sketches. Singapore’s MOT treats drones-before-passengers; we copy that sequencing, not a launch date.

## Roadmap

1. **Digital twin of real Pinellas plans** — ingest county GIS (egis.pinellas.gov), Forward Pinellas layers, and building footprints instead of illustrative blocks.
2. **Live IoT** — flood gauges, PSTA GTFS-realtime, heat sensors; public by default, personal data opt-in.
3. **Real chain pass** — a permissioned municipal ledger (or a public L2) with DEMO still as the default in this repo.
4. **Agent backends** — plug `VITE_AGENT_URL` into a planner that shares the map’s GeoJSON as tools (district, visible layers, ledger).
5. **Inclusion** — offline/paper twin of the ledger; languages spoken in Pinellas; Trail + bus-stop shade as first “Oslo/Melbourne” projects.

## License & credits

Released under the **MIT License**. Map data © OpenStreetMap contributors, via OpenFreeMap. Boundaries © US Census Bureau TIGERweb (simplified). Smart-city notes cite the sources on `/references`. Pinellas XD is an independent educational demo.
