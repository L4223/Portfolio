import Link from "next/link";
import { Suspense } from "react";

import { ModelCard } from "@/components/ModelCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";

interface BrowsePageProps {
  searchParams: {
    q?: string;
    brandId?: string;
    modelId?: string;
  };
}

async function Filters({ searchParams }: BrowsePageProps) {
  const brands = await db.brand.findMany({ orderBy: { name: "asc" } });
  const models = await db.model.findMany({ orderBy: { name: "asc" } });

  return (
    <Card className="border-border/70">
      <CardContent className="flex flex-col gap-4 py-6">
        <form className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto]" action="/browse" method="get">
          <Input
            name="q"
            placeholder="Suche nach Modell oder Stichwort"
            defaultValue={searchParams.q}
            className="md:col-span-1"
          />
          <Select name="brandId" defaultValue={searchParams.brandId ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Alle Marken" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle Marken</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="modelId" defaultValue={searchParams.modelId ?? ""}>
            <SelectTrigger>
              <SelectValue placeholder="Alle Modelle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle Modelle</SelectItem>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} {model.generation ?? ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="h-11 rounded-2xl">Filtern</Button>
        </form>
      </CardContent>
    </Card>
  );
}

async function ModelResults({ searchParams }: BrowsePageProps) {
  const filters: Record<string, string> = {};
  if (searchParams.brandId) {
    filters.brandId = searchParams.brandId;
  }
  if (searchParams.modelId) {
    filters.id = searchParams.modelId;
  }

  const models = await db.model.findMany({
    where: {
      ...filters,
      OR: searchParams.q
        ? [
            { name: { contains: searchParams.q, mode: "insensitive" } },
            { generation: { contains: searchParams.q, mode: "insensitive" } },
            { summaryMd: { contains: searchParams.q, mode: "insensitive" } },
            { brand: { name: { contains: searchParams.q, mode: "insensitive" } } }
          ]
        : undefined
    },
    orderBy: { name: "asc" },
    include: {
      brand: true,
      _count: { select: { issues: true, recalls: true } }
    }
  });

  if (models.length === 0) {
    return (
      <EmptyState
        title="Keine Ergebnisse"
        description="Versuche es mit einer anderen Schreibweise oder entferne einige Filter."
        action={<Button asChild><Link href="/browse">Filter zurücksetzen</Link></Button>}
      />
    );
  }

  return (
    <div className="card-grid">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          id={model.id}
          brand={model.brand.name}
          name={`${model.name} ${model.generation ?? ""}`.trim()}
          yearsFrom={model.yearsFrom}
          yearsTo={model.yearsTo}
          issuesCount={model._count.issues}
          recallsCount={model._count.recalls}
          summary={model.summaryMd}
        />
      ))}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="card-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="border-border/60">
          <CardContent className="space-y-4 py-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function BrowsePage(props: BrowsePageProps) {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-primary">Browse</p>
        <h1 className="text-2xl font-semibold">Finde bekannte Schwachstellen & Rückrufe</h1>
        <p className="text-sm text-muted-foreground">
          Filtere nach Marke und Modell, um direkt zu relevanten Insights zu springen.
        </p>
      </header>
      <Suspense fallback={<Card className="border-border/60"><CardContent className="py-10"><Skeleton className="h-8 w-full" /></CardContent></Card>}>
        <Filters {...props} />
      </Suspense>
      <Suspense fallback={<ResultsSkeleton />}>
        <ModelResults {...props} />
      </Suspense>
    </section>
  );
}
