import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ModelCardProps = {
  id: string;
  name: string;
  brand: string;
  yearsFrom?: number | null;
  yearsTo?: number | null;
  issuesCount: number;
  recallsCount: number;
  summary?: string | null;
};

export function ModelCard({ id, name, brand, yearsFrom, yearsTo, issuesCount, recallsCount, summary }: ModelCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{brand}</p>
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          {(yearsFrom || yearsTo) && (
            <p className="text-sm text-muted-foreground">
              {yearsFrom ? yearsFrom : "?"} – {yearsTo ? yearsTo : "heute"}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={issuesCount > 0 ? "default" : "secondary"}>Issues {issuesCount}</Badge>
          <Badge variant={recallsCount > 0 ? "destructive" : "secondary"}>Recalls {recallsCount}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary ? <p className="text-sm text-muted-foreground">{summary}</p> : null}
        <Link href={`/models/${id}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          Details ansehen
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
