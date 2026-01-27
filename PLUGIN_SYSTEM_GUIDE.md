# Plugin System Guide

This guide provides a comprehensive overview of the plugin (module) system in the Yoga Studio application. It details how to create, structure, and register new modules.

## Overview

The application is built around a modular architecture where features are encapsulated as **Modules**. Each module is self-contained and registers its capabilities (hooks, routes, UI components, tasks) with the core system at startup.

## Directory Structure

All modules are located in the `src/[modules]` directory.

```
src/[modules]/
├── [core]/             # Core system module (infrastructure, base types)
├── membership/         # Example feature module
│   ├── backend/        # Server-side logic (hooks, API handlers)
│   ├── frontend/       # Client-side logic (components, pages)
│   ├── tasks/          # Background tasks
│   ├── membership.module.ts # Module definition
│   └── index.ts        # Entry point
└── your-new-module/    # Your new module
```

## Module Definition

Every module must export a module definition object that implements the `AppModule` interface. This interface is defined in `src/[modules]/[core]/AppModule.ts`.

```typescript
export interface AppModule {
  name: string;
  initCore?: () => void; // Register hooks, services, domain logic
  initUI?: () => void; // Register UI slots and components
  initRoutes?: () => void; // Register Pages and API endpoints
  initTasks?: () => void; // Register CLI or background tasks
}
```

## Registration Mechanisms

The system uses central registries to manage module capabilities. These are exported from `@/lib/registry`.

### 1. Hooks (`initCore`)

Hooks allow modules to tap into core lifecycle events or other modules' actions.

**Registry**: `hookRegistry`

**Usage**:

```typescript
import { hookRegistry } from "@/lib/registry";
import { CoreHooks } from "@/modules/[core]/CoreHooks";

// In initCore()
hookRegistry.registerHook(
  CoreHooks.afterUserCreated, // The hook name (from CoreHooks enum)
  "after", // Phase: "before" or "after"
  (payload) => {
    // Return modified payload or Perform side-effects
    return payload;
  }
);
```

_Note: Use dynamic imports for handlers to keep the initial bundle size small._

### 2. Routes (`initRoutes`)

Modules can register both frontend pages and backend API endpoints.

**Registry**: `routeRegistry`

**Usage**:

**Frontend Pages**:

```typescript
import { routeRegistry } from "@/lib/registry";

// In initRoutes()
routeRegistry.registerPage(
  "my-module", // Module name
  "dashboard", // Path (becomes /my-module/dashboard)
  () => import("./frontend/components/Dashboard") // Lazy loader
);
```

**API Endpoints**:

```typescript
// In initRoutes()
routeRegistry.registerApi(
  "my-module",
  "items/:id", // Path (becomes /api/my-module/items/:id)
  () => import("./backend/api/handlers/GetItemHandler") // Lazy loader
);
```

### 3. UI Slots (`initUI`)

Modules can inject components into specific areas of the application (slots).

**Registry**: `uiRegistry`

**Usage**:

```typescript
import { uiRegistry } from "@/lib/registry";
import { CoreUiSlots } from "@/modules/[core]/CoreUiSlots";
import MyWidget from "./frontend/components/MyWidget";

// In initUI()
uiRegistry.registerUI(
  CoreUiSlots.OwnerDashboardCards, // Slot name
  MyWidget // Component to render
);
```

### 4. Tasks (`initTasks`)

Register background tasks or scripts.

**Registry**: `taskRegistry`

**Usage**:

```typescript
import { taskRegistry } from "@/lib/registry";

// In initTasks()
taskRegistry.registerTask({
  name: "my-module:cleanup",
  run: async (ctx) => {
    // Task logic
  },
});
```

### 5. Database Models

Modules can define their own database tables or add fields to existing ones using Prisma. This is handled by a build script that merges individual schemas.

**File**: `models.prisma` (placed at the root of the module folder)

**Usage**:

- **New Model**: Define a completely new Prisma model.
- **Extension**: Add custom fields to an existing model (e.g., `User`) by redefining it with only the extra fields.

```prisma
// src/[modules]/loyalty/models.prisma

// Add new table
model LoyaltyPoints {
  id     Int @id @default(autoincrement())
  points Int @default(0)
  userId Int @unique
}

// Extend core model
model User {
  points LoyaltyPoints?
}
```

> [!IMPORTANT]
> After adding or modifying a `models.prisma` file, you **must** run the schema generation task:
> `npm run prisma-generate`

## Step-by-Step: Creating a New Plugin

1.  **Create Directory**: Create a new folder in `src/[modules]/` with your module name (e.g., `loyalty`).
2.  **Scaffold Structure**: Create subfolders `backend`, `frontend`, `tasks` as needed.
3.  **Define Models**: (Optional) Create a `models.prisma` file if your module needs database storage or extends core models.
4.  **Create Module Definition**: Create `loyalty.module.ts`:

    ```typescript
    import { AppModule } from "@/modules/[core]/AppModule";

    export const LoyaltyModule: AppModule = {
      name: "loyalty",
      initCore() {
        /* ... */
      },
      initUI() {
        /* ... */
      },
      initRoutes() {
        /* ... */
      },
    };
    ```

5.  **Register Capabilities**: Implement the `init*` methods using the registries as shown above.
6.  **Register Module in Bootstrap**: Add your module to the `MODULES` list in `src/[modules]/[core]/bootstrap/modules.ts`.

    ```typescript
    import { LoyaltyModule } from "@/modules/loyalty/loyalty.module";

    export const MODULES = [
      MembershipModule,
      LoyaltyModule, // Add your module here
    ];
    ```

7.  **Verify**: Start the server. Your module's hooks and routes will be automatically registered during bootstrap.

## Best Practices

- **Lazy Loading**: Always use dynamic imports (e.g., `import(...)`) for route handlers and large hooks to avoid bloating the initial bundle.
- **Isolation**: Keep backend and frontend code separate.
- **Naming**: Namespace your tasks and routes with your module name to avoid collisions.
