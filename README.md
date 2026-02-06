# INTENT UI

### Intent-Driven Generative UI Platform

**Intent UI** is a "Prompt-to-Platform" engine that generates **high-fidelity, interactive React UIs** based on natural language.

Unlike traditional generative UI that just outputs text or static HTML, Intent UI streams **live React components**, renders them in real-time, and provides a full **embedded Editor** (Sandpack) for code inspection and editing. You can then **export your creation** as a ZIP file, **push directly to GitHub**, or **deploy instantly to Vercel**.

---

## Features

### Generative Engine (Tambo)

- **Natural Language to UI**: Describe dashboards, landing pages, or application interfaces, and watch them build instantly.
- **Component Streaming**: Uses `@tambo-ai/react` to stream component props and structures in real-time.
- **Context Awareness**: Maintains conversation history to iteratively refine the interface.

### Dual-Mode Canvas

- **Visual Preview**: Interact with the generated application in a high-fidelity rendering environment.
- **Live Editor (Sandpack)**: Switch to a full browser-based editor (powered by CodeSandbox) to inspect files, edit code, and see changes live.

### Seamless Deployment & Export

- **Instant Vercel Deployment**: Connect your Vercel account via API Token and deploy your project to production in one click. Includes automatic SPA routing configuration (`vercel.json`).
- **One-Click GitHub Push**: Connect your GitHub account (OAuth or PAT) and push your generated app to a new repository instantly.
- **ZIP Download**: Export a fully configured **Vite + React + TypeScript** project structure, ready for local development or custom deployment.

### Modern Stack

- **Shadcn UI & Tailwind**: Generated apps use industry-standard libraries for beautiful, accessible, and maintainable code.
- **Framer Motion**: Smooth animations for generation and transitions.
- **Lucide Icons**: High-energy iconography.
- **Vite-Optimized**: Exports include `vite.config.ts`, `index.html`, and proper `package.json` scripts for maximum compatibility.

---

## Architecture

- **Frontend**: React 19 + Vite + TypeScript
- **AI Orchestration**: `@tambo-ai/react` (Tambo SDK)
- **Code Environment**: `@codesandbox/sandpack-react`
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Integrations**:
  - **Vercel API**: Direct deployment synthesis using Vercel serverless platform.
  - **Octokit**: GitHub API integration for repo creation and commits.
  - **JSZip**: Client-side project packaging.

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/devtofunmi/intent-ui.git
cd intent-ui
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your required keys:

```env
# Required for AI Generation
VITE_TAMBO_PUBLIC_KEY=your_tambo_public_key

# GitHub OAuth (For Production)
VITE_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Vercel Deployment (Stored locally in-app, but can be pre-configured)
# VERCEL_TOKEN=your_vercel_token
```

### 3. Run Locally

```bash
npm run dev
```

---

## Deployment Configuration

Intent UI is pre-configured for seamless production hosting:

- **Single Page Application (SPA)**: Includes `vercel.json` with rewrites to ensure all routes resolve to `index.html`.
- **API Functions**: Includes serverless function handlers in `/api` for OAuth token exchange.

---

## Project Structure

```text
src/
├── components/
│   ├── layout/       # App shell (Canvas, Header, Sidebars)
│   ├── modals/       # GitHub, Vercel & Auth modals
│   ├── registry/     # Component mapping for AI
│   └── ui/           # Shadcn UI primitives
├── lib/
│   ├── github/       # Octokit integration & Auth context
│   └── export-utils.ts # Source code generation logic
├── pages/
│   ├── Landing.tsx   # Zero-state entry point
│   ├── ChatInterface.tsx # Main controller & layout
│   └── AuthCallback.tsx # OAuth handler
└── main.tsx          # App entry
```

---

_Built for the future of interface design._
