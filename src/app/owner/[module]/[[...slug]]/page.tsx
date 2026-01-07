import { notFound } from "next/navigation";
import { routeRegistry } from "@/lib/hooks";
import { bootstrapRoutes } from "@/modules/[core]/bootstrap/routes";

interface PageProps {
  params: Promise<{
    module: string;
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const { module, slug } = await params;
  const path = slug?.join("/") ?? "";

  console.log(`[Page] Navigating to module: ${module}, path: ${path}`);

  bootstrapRoutes(module);

  const loader = routeRegistry.getPage(module, path);
  console.log(`[Page] Loader found: ${!!loader}`);

  if (!loader) {
    console.log("[Page] Loader not found, returning 404");
    notFound();
  }

  console.log("[Page] Executing loader...");
  const moduleExports = await loader();
  console.log("[Page] Loader result keys:", Object.keys(moduleExports));
  const { default: Component } = moduleExports;

  if (!Component) {
    console.log("[Page] No default export found in module!");
  }

  return <Component />;
}
