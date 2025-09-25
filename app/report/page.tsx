import { redirect } from "next/navigation";

import { ReportForm } from "@/components/ReportForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase";
import { db } from "@/lib/db";

interface ReportPageProps {
  searchParams: {
    brandId?: string;
    modelId?: string;
  };
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    const params = new URLSearchParams();
    const redirectParams = new URLSearchParams();
    if (searchParams.brandId) redirectParams.set("brandId", searchParams.brandId);
    if (searchParams.modelId) redirectParams.set("modelId", searchParams.modelId);
    const target = redirectParams.toString() ? `/report?${redirectParams.toString()}` : "/report";
    params.set("redirect", target);
    redirect(`/login?${params.toString()}`);
  }

  const [brands, models] = await Promise.all([
    db.brand.findMany({ orderBy: { name: "asc" } }),
    db.model.findMany({ orderBy: { name: "asc" } })
  ]);

  return (
    <section className="space-y-6">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle>Deine Erfahrung zählt</CardTitle>
          <CardDescription>
            Teile konkrete Probleme, damit andere Käufer:innen besser informiert sind.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportForm
            brands={brands.map((brand) => ({ id: brand.id, name: brand.name }))}
            models={models.map((model) => ({
              id: model.id,
              name: `${model.name} ${model.generation ?? ""}`.trim(),
              brandId: model.brandId
            }))}
            defaultBrandId={searchParams.brandId}
            defaultModelId={searchParams.modelId}
          />
        </CardContent>
      </Card>
    </section>
  );
}
