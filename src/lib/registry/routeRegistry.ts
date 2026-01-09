import React from "react";
import { NextRequest, NextResponse } from "next/server";

// Define PageComponent to accept params prop, avoiding 'any'
export type PageComponent = React.ComponentType<{
  params?: Record<string, string | string[] | undefined>;
}>;
export type PageLoader = () => Promise<{ default: PageComponent }>;

export type ApiHandler = (
  req: NextRequest,
  params?: Record<string, string>
) => Promise<NextResponse> | NextResponse;

export type ApiLoader = () => Promise<{
  [key: string]: ApiHandler | undefined;
}>;

interface RegisteredRoute<T> {
  pathPattern: RegExp;
  paramNames: string[];
  loader: T;
}

class RouteRegistry {
  private pageRoutes: Map<string, RegisteredRoute<PageLoader>[]> = new Map();
  private apiRoutes: Map<string, RegisteredRoute<ApiLoader>[]> = new Map();

  registerPage(module: string, path: string, loader: PageLoader) {
    this.register(this.pageRoutes, module, path, loader);
  }

  registerApi(module: string, path: string, loader: ApiLoader) {
    this.register(this.apiRoutes, module, path, loader);
  }

  getPage(
    module: string,
    path: string
  ): { loader: PageLoader; params: Record<string, string> } | undefined {
    return this.match(this.pageRoutes, module, path);
  }

  getApi(
    module: string,
    path: string
  ): { loader: ApiLoader; params: Record<string, string> } | undefined {
    return this.match(this.apiRoutes, module, path);
  }

  private register<T>(
    collection: Map<string, RegisteredRoute<T>[]>,
    module: string,
    path: string,
    loader: T
  ) {
    const normalizedPath = this.normalizePath(path);
    const { pattern, paramNames } = this.createPathPattern(normalizedPath);

    if (!collection.has(module)) {
      collection.set(module, []);
    }
    const routes = collection.get(module)!;

    routes.push({
      pathPattern: pattern,
      paramNames,
      loader,
    });

    console.log(
      `[RouteRegistry] Registered route: /${module}/${normalizedPath} (RegExp: ${pattern})`
    );
  }

  private match<T>(
    collection: Map<string, RegisteredRoute<T>[]>,
    module: string,
    path: string
  ): { loader: T; params: Record<string, string> } | undefined {
    const normalizedPath = this.normalizePath(path);
    const routes = collection.get(module);

    if (!routes) return undefined;

    for (const route of routes) {
      const match = route.pathPattern.exec(normalizedPath);
      if (match) {
        const params: Record<string, string> = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        return { loader: route.loader, params };
      }
    }

    return undefined;
  }

  private normalizePath(path: string): string {
    return path.replace(/^\/+/, "").replace(/\/+$/, "");
  }

  private createPathPattern(path: string): {
    pattern: RegExp;
    paramNames: string[];
  } {
    const paramNames: string[] = [];
    const patternString = path
      .replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "([^/]+)";
      })
      .replace(/\//g, "\\/"); // Escape slashes

    return {
      pattern: new RegExp(`^${patternString}$`),
      paramNames,
    };
  }
}

export const routeRegistry = new RouteRegistry();
