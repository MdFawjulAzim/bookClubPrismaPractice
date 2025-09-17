# Frontend Structure & Standards

This repo defines a standardized React + Vite + shadcn/ui setup. Use Yarn for all commands.

![WARNING](https://img.shields.io/badge/WARNING-red?style=for-the-badge)

> Warning: All developers must adhere to the instructions and standards outlined in this document for all projects. Code and PRs that do not comply will be requested for changes or rejected.

## Table of Contents

- [Quick start (Yarn)](#quick-start-yarn)
- [Standard project structure](#standard-project-structure)
- [File naming conventions](#file-naming-conventions)
- [JSX file export](#jsx-file-export)
- [Team workflow notices](#team-workflow-notices)
- [Recent work log](#recent-work-log)
- [Package management standards](#package-management-standards)
- [PDF generation standard](#pdf-generation-standard)
- [Commands cheat‑sheet (Yarn)](#commands-cheat-sheet-yarn)

## Quick start (Yarn)

1) Clone & enter the project
```bash
git clone <your-repo-url>
cd frontend-structure
```

2) Install deps
```bash
yarn install
```

3) Run dev
```bash
yarn dev
```

4) Optional: build & preview
```bash
yarn build
yarn preview
```

## Standard project structure

Recommended folders for projects:

```
src/
├─ assets/                           # Static assets
│  └─ images/                        # images store here
├─ components/                       # Reusable UI components
│  ├─ ui/                            # shadcn/ui generated components (alias "ui")
│  ├─ common/                        # Shared components
│  ├─ pages/                         # All features components 
│  ├─ layout/                        # Layout components (Header, Footer)
│  └─ forms/                         # Form components
├─ config/                           # App configuration
├─ hooks/                            # Custom React hooks
├─ lib/
│  └─ utils.js
├─ store/                            # Redux Toolkit setup
│  ├─ app/
│  │  └─ store.js                    # Store configuration
│  ├─ features/                      # Feature-based slices
│  │  └─ auth/
│  │     └─ authSlice.js
│  └─ services/                      # RTK Query APIs
│     ├─ api.js
│     ├─ authApi.js
│     └─ userApi.js
├─ styles/                           # Global styles and themes 
├─ utils/                            # Generic utilities 
├─ index.css                         # Global stylesheet
├─ App.jsx                           # Root component
└─ main.jsx                          # Entry point (Vite)
```

Note: This repo uses `src/main.jsx`. Adapt as needed but follow the intent above.

## File naming conventions

- Use PascalCase for React components and pages.
- CRUD-style naming follows Action + Entity.
	- GetAllUser: list all users
	- DetailsUser: show a single user in detail
	- UpdateUser: update an existing user
- Apply the same pattern for other entities by replacing "User" with the entity name (e.g., GetAllProduct, DetailsProduct, UpdateProduct).

## JSX file export 
- Default export should be a named function declaration in PascalCase.
- Example:
```jsx
export default function Welcome() {
	return <div>...</div>
}
```
- Avoid anonymous default exports like `export default () => {}`.
- One component per file; file name matches component name (e.g., `Welcome.jsx`).

## Team workflow notices

- Work log: When working on this existing project, append a brief summary of your last changes in this README under "Recent work log" with the date (YYYY-MM-DD) and your name.
- Packages: Before adding any new package, you must first discuss with your Team Lead and get approval. After approval, pin an exact version and document the rationale in the PR description.

## Recent work log

Append new entries at the top in this format:

```
YYYY-MM-DD — Your Name: Short summary of the work done.
```

## Package management standards

- Package manager: Yarn
- Approved packages (examples):
	- HTTP: `axios`
	- Forms: `react-hook-form`
	- State: `@reduxjs/toolkit`, `react-redux`
	- Routing: `react-router-dom`
	- Dates: `dayjs` 
	- PDF: `jspdf` + `jspdf-autotable`
    - Icons: `lucide`
- Version pinning: use exact versions (e.g., `yarn add axios@1.7.4`), avoid ranges like ^ or ~ for production apps.
- Dependency review: propose new packages via PR and standards committee approval before adoption.
- New project template: start from this repo or a centralized template to keep versions aligned.

Current config (from `components.json`):
- Theme: `new-york`
- Base color: `neutral`
- Icon library: `lucide`

Add components (Yarn):
```bash
npx shadcn@latest add button
```
Replace `button` with any component name (e.g., `alert-dialog`, `input`, `card`).

Initialize shadcn in a fresh repo (if needed):
```bash
npx shadcn@latest init
```

Components live under `src/components/ui` (see alias `ui` in `components.json`).

## PDF generation standard

Standardize on `jspdf` with `jspdf-autotable`.

Install:
```bash
yarn add jspdf jspdf-autotable
```

Wrapper service example (`src/services/pdfService.js`):


## Commands cheat‑sheet (Yarn)

```bash
# install deps
yarn install

# dev server
yarn dev

# build & preview
yarn build
yarn preview

# add deps with exact versions
yarn add axios@1.7.4

# add shadcn component
npx shadcn@latest add button
```
