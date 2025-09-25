import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/EmptyState";
import { db } from "@/lib/db";

interface ModelPageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

export async function generateMetadata({ params }: ModelPageProps) {
  const model = await db.model.findUnique({
    where: { id: params.id },
    include: { brand: true }
  });
  if (!model) return {};
  return {
    title: `${model.brand.name} ${model.name}${model.generation ? ` ${model.generation}` : ""} – CarGuard`,
    description: model.summaryMd ?? undefined
  };
}

export default async function ModelDetailPage({ params, searchParams }: ModelPageProps) {
  const model = await db.model.findUnique({
    where: { id: params.id },
    include: {
      brand: true,
      issues: { orderBy: { createdAt: "desc" } },
      recalls: { orderBy: { startDate: "desc" } },
      reports: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!model) {
    notFound();
  }

  const activeTab = searchParams.tab ?? "issues";
  const displayName = [model.name, model.generation].filter(Boolean).join(" ");
  const reportParams = new URLSearchParams({ brandId: model.brandId, modelId: model.id });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-primary">{model.brand.name}</p>
          <h1 className="text-3xl font-semibold">{displayName}</h1>
          {(model.yearsFrom || model.yearsTo) && (
            <p className="text-sm text-muted-foreground">
              {model.yearsFrom ?? "?"} – {model.yearsTo ?? "heute"}
            </p>
          )}
        </div>
        <Button asChild size="lg" className="rounded-full">
          <Link href={`/report?${reportParams.toString()}`}>Report erstellen</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Überblick</CardTitle>
          <CardDescription>Zusammenfassung der bekannten Informationen zum Modell.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {model.summaryMd ? <ReactMarkdown>{model.summaryMd}</ReactMarkdown> : <p>Noch keine Zusammenfassung vorhanden.</p>}
        </CardContent>
      </Card>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="recalls">Recalls</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          {model.issues.length === 0 ? (
            <EmptyState title="Keine Issues" description="Aktuell sind keine gemeldeten Issues vorhanden." />
          ) : (
            <div className="space-y-4">
              {model.issues.map((issue) => (
                <Card key={issue.id} className="border-border/70">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{issue.title}</CardTitle>
                      {issue.description && (
                        <CardDescription className="text-sm text-muted-foreground">{issue.description}</CardDescription>
                      )}
                    </div>
                    {issue.severity && <Badge>Severity {issue.severity}/5</Badge>}
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recalls">
          {model.recalls.length === 0 ? (
            <EmptyState title="Keine Rückrufe" description="Es sind keine offiziellen Rückrufe hinterlegt." />
          ) : (
            <div className="space-y-4">
              {model.recalls.map((recall) => (
                <Card key={recall.id} className="border-border/70">
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="text-xl">{recall.title}</CardTitle>
                      {recall.code && <Badge variant="outline">{recall.code}</Badge>}
                    </div>
                    {(recall.startDate || recall.endDate) && (
                      <CardDescription>
                        Zeitraum: {recall.startDate ? format(recall.startDate, "PPP", { locale: de }) : "Unbekannt"} – {" "}
                        {recall.endDate ? format(recall.endDate, "PPP", { locale: de }) : "laufend"}
                      </CardDescription>
                    )}
                    {recall.summary && <p className="text-sm text-muted-foreground">{recall.summary}</p>}
                    {recall.link && (
                      <Link
                        href={recall.link}
                        className="text-sm text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Mehr erfahren
                      </Link>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="community">
          {model.reports.length === 0 ? (
            <EmptyState
              title="Noch keine Community-Reports"
              description="Sei die erste Person, die ihre Erfahrungen teilt."
              action={
                <Button asChild>
                  <Link href={`/report?${reportParams.toString()}`}>Report erstellen</Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {model.reports.map((report) => (
                <Card key={report.id} className="border-border/70">
                  <CardHeader className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {report.mileage && <Badge variant="secondary">{report.mileage.toLocaleString()} km</Badge>}
                      {report.engineCode && <Badge variant="outline">Motor {report.engineCode}</Badge>}
                      <span>Gemeldet am {format(report.createdAt, "PPP", { locale: de })}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <p>{report.description}</p>
                    {report.proofUrl && (
                      <Link href={report.proofUrl} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        Beleg ansehen
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
