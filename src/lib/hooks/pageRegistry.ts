import { ComponentType } from "react";

type PageKey = string;

class PageRegistry {
  private pages = new Map<PageKey, ComponentType<any>>();

  registerPage(
    module: string,
    path: string[],
    component: ComponentType<any>
  ) {
    const key = `${module}/${path.join("/")}`;
    this.pages.set(key, component);
    console.log("Registered page:", key);
  }

  resolvePage(module: string, slug: string[]) {
    const key = `${module}/${slug.join("/")}`;
    return this.pages.get(key);
  }
}

export const pageRegistry = new PageRegistry();
