<div align="center">

<img src="./public/og-image-en.png" alt="Pedro Novais Portfolio Banner" width="100%" />

# pedro-smaxy.dev

**Personal engineering portfolio built with Next.js, TypeScript, Tailwind CSS, and GSAP.**

[![Live Demo](https://img.shields.io/badge/Live-pedro--smaxy--dev.vercel.app-FF4D00?style=flat-square&logo=vercel&logoColor=white)](https://pedro-smaxy-dev.vercel.app/en)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-0A0B0D?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-0A0B0D?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-0A0B0D?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-EDEAE2?style=flat-square)](./LICENSE)

[Live (`/en`)](https://pedro-smaxy-dev.vercel.app/en) · [Versão em Português (`/pt-BR`)](https://pedro-smaxy-dev.vercel.app/pt-BR) · [GitHub (@PedroSmaxY)](https://github.com/PedroSmaxY)

</div>

---

## Overview

Bilingual (`pt-BR` / `en`) software engineering portfolio with a dark technical-editorial layout, custom 2D Canvas black hole simulation, interactive SVG project schematics, and ATS-friendly downloadable resumes.

## Highlights

- **Bilingual i18n (`next-intl`):** Localized copy, metadata, Open Graph banners, and locale-matched PDF resumes (`/pedro-novais-cv.pdf` and `/pedro-novais-cv-en.pdf`).
- **2D Canvas Engines:** Custom geodesic black hole simulation (`BlackHoleCanvas`, ASCII / Half-Block modes) and pointer-reactive dot grid (`GravitationalGrid`) with `prefers-reduced-motion` support.
- **Project Showcase:** Interactive domain SVG schematics (`ProjectSchematic`) paired with live captures.
- **Motion:** GSAP ScrollTrigger choreography scoped via `gsap.matchMedia()`.

## Project Structure

```text
app/[locale]/       # App Router layout, metadata, and 12-column page
components/         # Canvas engines, SVG schematics, and page sections
i18n/               # next-intl routing and request config
lib/                # Portfolio config, skill matrix, and motion helpers
messages/           # pt-BR.json and en.json translations
public/             # Project captures, OG banners, favicons, and ATS CVs
```

## Local Development

```bash
pnpm install
pnpm dev
pnpm lint && pnpm build
```
