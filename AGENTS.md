# SiMiTsu — Workspace Rules for Antigravity

These instructions apply to all work in this repository. Read them before editing code.

## Layer 1 — Role and project context

Act as a senior frontend engineer and product-minded UI/UX engineer. Build maintainable, accessible, responsive interfaces and explain important trade-offs briefly. Prefer small, verifiable changes over large rewrites.

Project: **SiMiTsu (Sistem Mitigasi Tsunami Indonesia)**, an Indonesian-language public education platform for understanding tsunami causes, exploring an educational simulation, viewing risk/event maps, learning historical events, and understanding evacuation guidance. It is an educational product, **not an official real-time early-warning service**. Never present simulated values, illustrative map layers, or static data as live BMKG/BNPB feeds.

The GitHub repository is:
https://github.com/HandhikaPutra-099/SiMiTsu-Global-Disaster-Alert-and-Coordination-System

Use the current local workspace as the source of truth. The repository already uses React, Vite, Tailwind CSS v4, React Router, and Lucide React. Verify `package.json` before changing dependencies. Keep the existing JavaScript/JSX setup unless there is a concrete reason and explicit approval to change it. Do not migrate to Next.js, Vue, TypeScript, or Vanilla JS just for preference.

### Design references

Use these sites as visual inspiration only; do not copy their brand, wording, assets, or exact layouts:
- https://orvane-template.modulify.website/ — borrow the immersive technical/editorial storytelling, strong typography, numbered sections, data callouts, and visual product demonstrations.
- https://liftline-template.modulify.website/ — borrow clear content hierarchy, prominent calls to action, practical cards, trust cues, and guided/step-by-step interactions.

Adapt both approaches to tsunami education. The interface should feel credible, calm, modern, and easy for the general public to understand. Use the original SiMiTsu dark-ocean palette as the starting point: background `#0a0e1a`, surface `#111827`, secondary surface `#1a2234`, border `#1e293b`, text `#e2e8f0`, muted `#64748b`, cyan `#0ea5e9`, orange `#f97316`, danger `#ef4444`, warning `#f59e0b`, success `#22c55e`. Improve contrast and readability as needed; do not use color alone to communicate danger levels. Use responsive layouts and restrained motion; respect `prefers-reduced-motion`.

## Layer 2 — Product requirements and functional scope

### Main navigation and routes

The primary navigation labels are: **Beranda, Penyebab, Simulasi, Peta, Riwayat, Mitigasi**.
- Beranda is the main landing page and contains the educational sections.
- Peta is a dedicated route/page, not merely an anchor inside the homepage.
- Riwayat is a dedicated route/page, designed for browsing historical tsunami events.
- Penyebab, Simulasi, and Mitigasi may navigate to their sections on the homepage unless the existing architecture has a strong reason to make them routes.
- Navigation must work on desktop and mobile, show the active route/section clearly, and handle anchor links correctly when navigating from another route.

### Homepage and content

Hero copy must read: **“Platform edukasi dan simulasi berbasis data.”**
Hero metrics requested by the product owner:
- `20+` — Tsunami Tercatat
- `280K+` — Korban Jiwa
- `5` — Zona Risiko
Remove the `7 Langkah Evakuasi` hero metric. Do not silently change the requested `5 Zona Risiko` metric to `4`; note that the detailed mitigation content currently lists four color bands and flag this inconsistency for product-owner confirmation rather than inventing a fifth band.

### Tsunami causes

Create four concise, visual cards:
1. Gempa Subduksi (Megathrust)
2. Erupsi Vulkanik
3. Longsor Bawah Laut
4. Tumbukan Objek Luar Angkasa / Jatuhnya Benda Langit

Each card should prioritize a short explanation and a clear **Putar Ulang** action for its educational animation/visual. Put longer explanations and supporting bullet points behind a **Detail Penyebab** interaction (accessible modal, drawer, or expandable panel). Do not pretend an animation is a documentary video. If a real video source is not supplied, create or reuse an original educational animation and label it accurately. The extraterrestrial-impact cause is rare/theoretical in the context of modern historical records; do not describe it as a common or locally recorded tsunami trigger.

### Wave physics

Present three explanatory data cards/steps:
- Di Laut Dalam: approximately `800 km/jam`; wave height under 1 m and wavelength over 200 km.
- Mendekati Pantai: approximately `50–80 km/jam`; the wave slows and can grow in height (shoaling).
- Amplifikasi Teluk: approximately `1.5–3×`; local coastal geometry can amplify wave height.
Remove the old **Waktu Deteksi 15–30 mnt** metric. Label physical figures as approximate/context-dependent; do not imply these values apply identically to every tsunami or location.

### Simulation

Preserve the existing educational simulator's controls, state calculations, phase/timeline behavior, outputs, and visualization wherever the legacy source supports them. Remove the separate panel titled **Langkah Mitigasi berdasarkan parameter aktif** and its parameter-generated recommendations. Do not remove the simulator itself or quietly replace it with a static mockup.

Important legacy-code caution: inspect the actual implementation before describing or replacing the renderer. The legacy HTML includes Three.js/OrbitControls CDN script tags, but its `init3DScene()` implementation obtains a 2D canvas context (`getContext("2d")`) and `render3DLoop()` draws the scene through Canvas 2D. Do not assume the active renderer is Three.js/WebGL. Preserve behavior first; only migrate/rebuild the renderer if explicitly planned and tested.

### Map page

Keep the existing Leaflet map behavior and available layers/filters. Initialize the map through a React lifecycle-safe component (for example, `useEffect` + `useRef`) and destroy/remove listeners/map instances during cleanup. Avoid initializing multiple maps on rerender. Clearly label static/illustrative layers; never claim sensor points are live unless a verified live data source is actually connected.

### Historical events page

Keep historical-event data separate from UI components. Provide useful browsing controls such as search, year/location/cause filters, and an event detail view when supported by the existing data. Prepare a clean data-access layer so a database can be connected later. Supabase is the intended future PostgreSQL database for historical events and, if needed, a restricted admin workflow. During the audit, only inspect whether Supabase dependencies, environment-variable names, client setup, tables, or policies already exist; never print secret values. Do not create a Supabase project, run SQL, alter tables or RLS policies, add credentials, or implement the integration until the owner explicitly approves that implementation milestone. For a future integration, public visitors should have only the read access actually needed; admin writes must require authentication and authorization enforced by database policies. Never put a service-role/secret key in frontend code. Never invent dates, magnitudes, fatalities, wave heights, or sources; flag questionable/uncertain records and preserve source attribution.

### Mitigation page/section

Organize guidance into three clear groups:
- **Sebelum terjadi:** Kenali jalur evakuasi; Buat rencana keluarga; Siapkan tas darurat.
- **Saat ada ancaman:** Gempa kuat/lama di pesisir means evacuate immediately; Jauhi pantai, muara, and rivers; Follow official information and local authority instructions.
- **Setelah gelombang:** Wait for an official all-clear; Watch for secondary hazards and additional waves; Use official information before returning.

Also include the four draft risk bands: Zona Merah, Oranye, Kuning, and Hijau; seven independent-evacuation steps; and a Go Bag checklist. Make the content scannable with cards, numbered steps, icons, and plain Indonesian.

Safety/content rules:
- Do not describe fixed distance/elevation boundaries as universal official standards. State that actual safe areas and evacuation routes must follow locally issued hazard maps and BPBD/authority guidance.
- Do not tell people to delay evacuation to collect a Go Bag or to wait a fixed three hours. The primary instruction is to evacuate immediately when natural warning signs are experienced and remain in a safe place until authorities declare the threat over.
- Do not hard-code a universal 30 m elevation or 3 km distance as a guarantee of safety.
- Do not claim a generic zone classification is an official BNPB/UNESCO-IOC standard unless a precise, authoritative source verifies that exact classification.

### Remove

Remove the quiz feature and its navigation, components, data, and unused code. Remove the old parameter-driven mitigation recommendation panel from the simulator. Do not remove the standalone mitigation guidance, four risk-band cards, seven evacuation steps, or Go Bag checklist.

## Layer 3 — Engineering constraints and output

### Architecture and coding standards

- Follow the existing `src` structure where practical; prefer clear feature boundaries such as `components/`, `pages/`, `sections/`, `features/`, `data/`, and `styles/`.
- Use React function components and JSX. Keep UI state in React; do not imperatively rewrite DOM nodes owned by React.
- Use `useRef` for canvas and Leaflet DOM containers. Put browser event listeners, animation loops, map initialization, and other imperative integrations in effects with complete cleanup.
- Reuse existing dependencies. Do not install libraries or replace the build system without a concrete need. Check whether a library is already installed before proposing installation.
- Use Tailwind CSS v4 conventions already configured in the project. Avoid mixing a second styling framework.
- Use Lucide React icons where useful. Keep labels and buttons understandable in Indonesian.
- Use semantic HTML, keyboard-accessible controls, visible focus states, meaningful alt text, sufficient color contrast, and responsive behavior down to mobile widths.
- Avoid giant components, duplicated data, dead code, `dangerouslySetInnerHTML`, placeholder buttons that do nothing, and fake live-data badges.
- Keep UI strings and historical datasets separate from complex behavior where practical.

### Safe agent workflow

1. Before editing, inspect `git status`, `package.json`, the current `src` tree, routing, global styles, and available legacy source files. Do not overwrite uncommitted user work.
2. Treat local files as authoritative; do not assume GitHub contains files that are only on the user's computer or in a chat attachment.
3. If the legacy HTML is needed but is missing, report the exact missing file and stop the migration that depends on it. Do not hallucinate or reconstruct unavailable legacy logic.
4. Work in small milestones. State the intended files and behavior before a substantial change. Do not refactor unrelated areas.
5. Do not reinitialize the project, replace `package.json`, delete existing folders, or change frameworks.
6. Do not run `git push`, create commits, delete files, or overwrite source backups unless explicitly asked.
7. Do not repeatedly dump whole files or explain routine steps. Keep reports short and focused on changed files, test results, and blockers.
8. After each milestone run the available checks, normally `npm run lint` and `npm run build`. Fix errors caused by your changes before saying the milestone is complete. If a command cannot run, state why.
9. Never claim a feature is complete unless it was implemented and tested. Distinguish existing, migrated, mocked, and live-connected features.

### Required completion report

At the end of each milestone provide:
- Files created/modified (short list).
- What user-visible behavior changed.
- Commands/tests run and whether they passed.
- Known limitations or decisions requiring owner confirmation.
- The single recommended next milestone.
