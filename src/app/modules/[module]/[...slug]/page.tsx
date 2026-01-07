import { notFound } from "next/navigation";
import { pageRegistry } from "@/lib/hooks";

type PageProps = {
  params: {
    module: string;
    slug?: string[];
  };
};

export default async function ModulePage({ params }: PageProps) {
  const { module, slug = [] } = params;

  const Page = pageRegistry.resolvePage(module, slug);

  if (!Page) notFound();

  return <Page />;
}