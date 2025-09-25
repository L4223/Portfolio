import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModelCard } from "@/components/ModelCard";
import { db } from "@/lib/db";

async function FeaturedModels() {
  const models = await db.model.findMany({
    take: 3,
    include: {
      brand: true,
      _count: {
        select: {
          issues: true,
          recalls: true
        }
      }
    }
  });

  if (models.length === 0) {
    return (
      <Card className="border-dashed bg-muted/30">
        <CardContent className="flex flex-col gap-3 py-8 text-center">
          <p className="text-sm font-medium">Noch keine Modelle verfügbar.</p>
          <p className="text-sm text-muted-foreground">Sobald Daten vorhanden sind, erscheinen sie hier.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="card-grid">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          id={model.id}
          brand={model.brand.name}
          name={`${model.name} ${model.generation ? model.generation : ""}`.trim()}
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

function FeaturedSkeleton() {
  return (
    <div className="card-grid">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="border-border/60">
          <CardContent className="space-y-4 py-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-3">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Frühzeitige Einblicke für Gebrauchtwagenkäufer:innen
        </span>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Finde typische Schwachstellen & Rückrufe – schnell und übersichtlich.
        </h1>
        <p className="text-base text-muted-foreground">
          CarGuard bündelt Erfahrungsberichte, bekannte Issues und Rückrufe in einer modernen Oberfläche. So triffst du fundierte Entscheidungen für dein nächstes Fahrzeug.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/browse">Modelle entdecken</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link href="/report">Report erstellen</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Beliebte Modelle</h2>
          <Link href="/browse" className="text-sm text-primary hover:underline">
            Alle ansehen
          </Link>
        </div>
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedModels />
        </Suspense>
      </div>
    </section>
  );
}
