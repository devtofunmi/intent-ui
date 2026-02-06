# INTENT UI

### Intent-Driven Generative UI Platform

**Intent UI** is a "Prompt-to-Platform" engine that generates **high-fidelity, interactive React UIs** based on natural language.

Unlike traditional generative UI that just outputs text or static HTML, Intent UI streams **live React components**, renders them in real-time, and provides a full **embedded IDE** (Sandpack) for code inspection and editing. You can then **export your creation** as a ZIP file or **push directly to GitHub** as a new repository.

---

## Features

### Generative Engine (Tambo)

- **Natural Language to UI**: Describe dashboard, landing pages, or application interfaces, and watch them build instantly.
- **Component Streaming**: Uses `@tambo-ai/react` to stream component props and structures in real-time.
- **Context Awareness**: Maintains conversation history to iteratively refine the interface.

### Dual-Mode Canvas

- **Visual Preview**: Interact with the generated application in a high-fidelity rendering environment.
- **Code View (Sandpack)**: Switch to a full browser-based IDE (powered by CodeSandbox) to inspect files, edit code, and see changes live.

### Seamless Export

- **One-Click GitHub Push**: Connect your GitHub account and push your generated app to a new repository instantly.
- **ZIP Download**: Export a standard Vite + React project structure ready for local development.

### Modern Stack

- **Shadcn UI & Tailwind**: Generated apps use industry-standard libraries for beautiful, accessible, and maintainable code.
- **Framer Motion**: Smooth animations for generation and transitions.
- **React 19**: Built on the latest React patterns.

---

## Architecture

- **Frontend**: React 19 + Vite + TypeScript
- **AI Orchestration**: `@tambo-ai/react` (Tambo SDK)
- **Code Environment**: `@codesandbox/sandpack-react`
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Integrations**:
  - **Octokit**: GitHub API integration for repo creation and commits.
  - **JSZip**: Client-side project packaging.

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/intent-ui.git
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

# Optional: GitHub OAuth Client ID (for production auth flow)
# For local dev, you can use a Personal Access Token (PAT) directly in the UI
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

### 3. Run Locally

```bash
npm run dev
```

### 4. GitHub Connection (Local Dev)

When running locally, the OAuth redirect flow typically requires a backend component to exchange tokens. Intent UI detects local environments and provides a **Personal Access Token (PAT)** fallback:

1. Generate a GitHub PAT with `repo` and `user` scopes.
2. Click "Connect GitHub" in the UI.
3. Paste your PAT to authenticate instantly.

---

## Project Structure

```text
src/
├── components/
│   ├── layout/       # App shell (Canvas, Header, Sidebars)
│   ├── modals/       # GitHub & Auth modals
│   ├── registry/     # Component mapping for AI
│   └── ui/           # Shadcn UI primitives
├── lib/
│   ├── github/       # Octokit integration & Auth context
│   └── export-utils.ts # ZIP generation logic
├── pages/
│   ├── Landing.tsx   # Zero-state entry point
│   ├── ChatInterface.tsx # Main controller & layout
│   └── AuthCallback.tsx # OAuth handler
└── main.tsx          # App entry
```

---

_Built for the future of interface design._
