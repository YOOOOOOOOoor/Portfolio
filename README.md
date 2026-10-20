# Yordanos Teshome — Portfolio

## Overview

A personal portfolio presenting Yordanos Teshome’s software projects, technical interests, and project case studies.

## Tech stack

- React 19 and TypeScript
- TanStack Start, TanStack Router, and TanStack Query
- Vite 8 and Tailwind CSS 4
- Motion for interface animation
- Lenis for smooth scrolling
- Radix UI primitives and Lucide icons
- Vitest, ESLint, and Prettier for development checks

## Features

- Responsive portfolio sections for work, about, technology, and contact
- Dedicated case-study routes for the e-commerce project and FoMA
- Smooth in-page navigation, animated transitions, and reduced-motion support
- Desktop custom cursor, project-row previews, case-study image tilt, and ambient glow
- A short first-visit introduction and route-level error and not-found pages

## Project structure

| Path                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `src/routes/`        | TanStack Start root, homepage, and project case-study routes |
| `src/components/`    | Reusable interface components                                |
| `src/components/fx/` | Cursor, scrolling, tilt, spotlight, and motion effects       |
| `src/data/`          | Project technology and presentation data                     |
| `src/assets/`        | Project screenshots bundled by the app                       |
| `src/lib/`           | Shared helpers and server-side error handling                |
| `public/`            | Static favicon, Yordanos mark, and robots file               |

## Prerequisites

- Bun for the primary workflow, or npm if you prefer the npm lockfile
- Node.js 20.19 or newer (or 22.12 or newer)

## Getting started

Bun is the repository’s primary package manager; the repository also retains an npm lockfile.

```bash
git clone https://github.com/YOOOOOOOOoor/Portfolio.git
cd Portfolio
bun install
bun run dev
```

The development server prints its local URL when it starts. To use npm instead, run `npm install` and then the equivalent `npm run` commands below.

## Available commands

| Command              | Purpose                             |
| -------------------- | ----------------------------------- |
| `bun run dev`        | Start the development server        |
| `bun run build`      | Create a production build           |
| `bun run build:dev`  | Build using Vite’s development mode |
| `bun run preview`    | Preview a Vite build locally        |
| `bun run lint`       | Run ESLint                          |
| `bun run test`       | Run the Vitest suite once           |
| `bun run test:watch` | Run Vitest in watch mode            |
| `bun run format`     | Format the repository with Prettier |

Use the same command names with `npm run` when working with npm.

## Production and deployment

Build with `bun run build` (or `npm run build`). Vite is configured with Nitro’s `cloudflare-module` preset for Cloudflare Workers output. No deployment script is defined in this repository; deploy the generated Nitro build using the deployment process for your Cloudflare Workers project. The custom SSR server entry in `src/server.ts` handles server error responses and is configured through `vite.config.ts`.
