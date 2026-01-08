import React from "react";

export type PageComponent = React.ComponentType<unknown>;
export type PageLoader = () => Promise<{ default: PageComponent }>;

class RouteRegistry {
  private routes: Map<string, PageLoader> = new Map();

  registerPage(module: string, path: string, loader: PageLoader) {
    // Normalize path to ensure consistency (e.g., remove leading slash)
    const normalizedPath = this.normalizePath(path);
    const key = this.getKey(module, normalizedPath);
    this.routes.set(key, loader);
    console.log(
      `[RouteRegistry] Registered route: /${module}/${normalizedPath}`
    );
  }

  getPage(module: string, path: string): PageLoader | undefined {
    const normalizedPath = this.normalizePath(path);
    const key = this.getKey(module, normalizedPath);
    return this.routes.get(key);
  }

  private normalizePath(path: string): string {
    return path.replace(/^\/+/, "").replace(/\/+$/, "");
  }

  private getKey(module: string, path: string): string {
    return `${module}::${path}`;
  }
}

export const routeRegistry = new RouteRegistry();
