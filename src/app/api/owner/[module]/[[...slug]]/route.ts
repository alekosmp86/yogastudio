import { NextRequest, NextResponse } from "next/server";
import { routeRegistry } from "@/lib/registry";
import { bootstrapRoutes } from "@/modules/[core]/bootstrap/routes";

interface RouteProps {
  params: Promise<{
    module: string;
    slug?: string[];
  }>;
}

async function handler(req: NextRequest, props: RouteProps) {
  const { module, slug } = await props.params;
  const path = slug?.join("/") ?? "";
  const method = req.method;

  console.log(
    `[API] Handling ${method} request for module: ${module}, path: ${path}`
  );

  // 1. Bootstrap routes (ensure module routes are registered)
  bootstrapRoutes(module);

  // 2. Resolve API handler
  const match = routeRegistry.getApi(module, path);

  if (!match) {
    console.log(`[API] No handler found for ${module}/${path}`);
    return new NextResponse("Not Found", { status: 404 });
  }

  const { loader, params } = match;

  try {
    // 3. Load the module
    const moduleExports = await loader();
    const apiHandler = moduleExports[method]; // e.g., GET, POST

    if (!apiHandler) {
      console.log(`[API] Method ${method} not exported by handler module`);
      return new NextResponse(`Method ${method} Not Allowed`, { status: 405 });
    }

    // 4. Delegate to the handler
    // We pass the extracted params (from path matching) as the second argument
    // mimicking next.js dynamic route params
    return await apiHandler(req, params);
  } catch (error) {
    console.error(
      `[API] Error executing handler for ${module}/${path}:`,
      error
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
