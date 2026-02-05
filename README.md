# INTENT UI

### Intent-Driven Generative UI powered by Tambo

**Intent UI** is a Generative UI engine built with **Tambo** where the interface is determined entirely by user intent.

Instead of navigating static screens, users describe what they want, and the AI **decides which React components to render, remove, and reconfigure in real time**.

This project demonstrates how Generative UI can replace fixed layouts with adaptive, AI-driven interfaces.

---

## What Intent UI Does

- **Intent → Interface**  
  Natural language prompts directly control UI composition (e.g. dashboards, tables, metrics, activity feeds).

- **AI-Driven Component Selection (Tambo)**  
  Using Tambo’s component registry, the AI autonomously selects and configures high-fidelity React components based on user intent.

- **Progressive UI Synthesis**  
  Interfaces are built section-by-section as the AI reasons, rather than generated as a static export.

- **Dynamic Layout Handling**  
  Components automatically adapt grid span, hierarchy, and density to fit the requested interface context.

- **Session History**  
  Each UI generation is preserved, allowing users to revisit or branch previous interface states.

---

## Core Features

### Component Registry (Tambo-Powered)

A curated set of schema-validated React components registered with Tambo, enabling the AI to choose and configure them autonomously:

- `DataSummary` – High-density analytics and system status
- `MetricGrid` / `Metric` – KPI tracking and trends
- `DataTable` – Transactional or operational tables
- `ActivityFeed` – Chronological system or user activity
- `UserOverview` – Profile-level command headers
- Marketing sections – Hero, Features, Pricing, Stats, Testimonials

### Interactive Generative Flow

User prompts and UI interactions continuously influence the interface.  
The AI responds by **changing the UI**, not just generating text.

---

## Design Philosophy

Intent UI uses a focused dark-mode **Command Center** aesthetic optimized for dense, productivity-oriented interfaces:

- Glassmorphism for visual layering
- Subtle procedural noise for material depth
- Micro-animations (scanning lines, pulses) to signal active synthesis

Design supports the Generative UI experience without overshadowing functionality.

---

## Architecture

- **Framework:** React 19 + Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + Framer Motion
- **Schemas:** Zod-validated component definitions
- **Generative Engine:** `@tambo-ai/react`

---

## Project Structure

```text
src/
├─ components/     # Registered UI components
├─ registry/       # Tambo component definitions & schemas
├─ pages/          # Workspace and demo flows
├─ lib/            # Utilities
```

---

## Quick Start

1. **Clone and Install**

   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to a new file named `.env` and add your Tambo public key:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and set your key:
   `VITE_TAMBO_PUBLIC_KEY=your_key_here`

3. **Run Development Server**
   ```bash
   npm run dev
   ```
