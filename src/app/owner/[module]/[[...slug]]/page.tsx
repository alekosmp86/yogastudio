import { notFound } from "next/navigation";
import { routeRegistry } from "@/lib/registry";
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

  bootstrapRoutes(module);

  const match = routeRegistry.getPage(module, path);

  if (!match) {
    notFound();
  }

  const { loader } = match;
  const moduleExports = await loader();
  const { default: Component } = moduleExports;

  if (!Component) {
    console.log("[Page] No default export found in module!");
  }

  return <Component />;
}
