# GymStudio App

A modern, modular React application for managing a small gym or yoga studio, built with Next.js, Prisma, and Tailwind CSS.

## 🚀 Quick Start (30 Seconds)

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Set up environment**:
    Copy `.env` (if available) or ensure required environment variables are set.

3.  **Run database migrations & generate client**:

    ```bash
    npm run prisma-generate
    ```

4.  **Start development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🏗 Architecture Overview

This project follows a **modular architecture** (Plugins/Modules) to ensure scalability and separation of concerns.

### 🧩 Module System

Core logic and features are encapsulated in **Modules** located in `src/[modules]`.

- **Self-contained**: Each module (e.g., `membership`, `crm`) manages its own UI components, API routes, database models, and hooks.
- **Registry Pattern**: Modules register their capabilities (hooks, routes, UI slots) at startup via central registries (`hookRegistry`, `routeRegistry`, `uiRegistry`).
- **Directory Structure**:
  ```
  src/[modules]/
  ├── [core]/             # Core system infra & base types
  ├── membership/         # Feature module example
  │   ├── backend/        # Server-side logic
  │   ├── frontend/       # Client-side components
  │   └── membership.module.ts # Module definition
  └── ...
  ```
- **Extensibility**: New features can be added as new modules without modifying core code. See `PLUGIN_SYSTEM_GUIDE.md` for details on creating new modules.

### 🔐 Authentication

Authentication is secure and user-friendly, primarily using **Google OAuth** for login and registration.

> **Note**: A **Magic Link** flow is also fully implemented (utilizing HTTP-only Cookies) but is currently hidden in the UI.

1.  **Login**: User authenticates via Google OAuth.
2.  **Session**: A secure, HTTP-only JWT cookie is set (15-min sliding expiration).
3.  **Protection**: Middleware and client-side hooks automatically validate the session.

### 🗄 Database (Prisma)

- **Schema Management**: Each module can define its own `models.prisma`.
- **Generation**: A custom task merges these into a single schema. Always run `npm run prisma-generate` after changing models.

## 📂 Project Structure

```
.
├── src/
│   ├── [modules]/      # Feature modules (Business Logic)
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── components/     # Shared UI components
│   ├── lib/            # Shared utilities & Registries
│   └── tasks/          # Build & maintenance scripts
├── public/             # Static assets
└── ...
```

## 🛠 Key Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production (includes module tasks).
- `npm run prisma-generate`: Merge module schemas and generate Prisma client.
