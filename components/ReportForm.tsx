"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reportSchema } from "@/lib/validators";

const formSchema = z.object({
  brandId: z.string({ required_error: "Bitte Marke wählen" }),
  modelId: z.string({ required_error: "Bitte Modell wählen" }),
  mileage: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Number(value)), "Bitte gültige Zahl eingeben"),
  engineCode: z.string().optional(),
  description: z.string().min(30, "Mindestens 30 Zeichen"),
  proofUrl: z.string().url("Bitte gültige URL").optional(),
  occurredAt: z.string().optional()
});

export type ReportFormValues = z.infer<typeof formSchema>;

export type ReportBrandOption = {
  id: string;
  name: string;
};

export type ReportModelOption = {
  id: string;
  name: string;
  brandId: string;
};

interface ReportFormProps {
  brands: ReportBrandOption[];
  models: ReportModelOption[];
  defaultBrandId?: string;
  defaultModelId?: string;
}

export function ReportForm({ brands, models, defaultBrandId, defaultModelId }: ReportFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successModelId, setSuccessModelId] = React.useState<string | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandId: defaultBrandId || "",
      modelId: defaultModelId || "",
      description: "",
      engineCode: "",
      mileage: "",
      occurredAt: searchParams.get("occurredAt") ?? "",
      proofUrl: ""
    }
  });

  const selectedBrandId = form.watch("brandId");
  const filteredModels = React.useMemo(
    () => models.filter((model) => !selectedBrandId || model.brandId === selectedBrandId),
    [models, selectedBrandId]
  );

  React.useEffect(() => {
    if (selectedBrandId && filteredModels.every((model) => model.id !== form.getValues("modelId"))) {
      form.setValue("modelId", "");
    }
  }, [filteredModels, form, selectedBrandId]);

  async function onSubmit(values: ReportFormValues) {
    setIsSubmitting(true);
    setSuccessModelId(null);
    try {
      const payload = reportSchema.parse(values);
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: "Unbekannter Fehler" }));
        throw new Error(data.message ?? "Report konnte nicht gespeichert werden");
      }

      const data = (await response.json()) as { modelId: string };
      form.reset({
        brandId: values.brandId,
        modelId: values.modelId,
        description: "",
        engineCode: "",
        mileage: "",
        proofUrl: "",
        occurredAt: ""
      });
      setSuccessModelId(data.modelId);
      toast.success("Report gespeichert", {
        description: "Danke für deinen Beitrag!"
      });
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Etwas ist schief gelaufen");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl border border-border/70 shadow-sm">
      <CardHeader>
        <CardTitle>Community Report erstellen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="brand">
              Marke
            </label>
            <Select value={form.watch("brandId")} onValueChange={(value) => form.setValue("brandId", value)}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Marke auswählen" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.brandId && (
              <p className="text-xs text-destructive">{form.formState.errors.brandId.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="model">
              Modell
            </label>
            <Select value={form.watch("modelId")} onValueChange={(value) => form.setValue("modelId", value)}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Modell auswählen" />
              </SelectTrigger>
              <SelectContent>
                {filteredModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.modelId && (
              <p className="text-xs text-destructive">{form.formState.errors.modelId.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="mileage">
              Laufleistung (km)
            </label>
            <Input id="mileage" type="number" inputMode="numeric" {...form.register("mileage")} />
            {form.formState.errors.mileage && (
              <p className="text-xs text-destructive">{form.formState.errors.mileage.message as string}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="engineCode">
              Motorcode (optional)
            </label>
            <Input id="engineCode" {...form.register("engineCode")} placeholder="z. B. CXBA" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="occurredAt">
              Datum des Auftretens (optional)
            </label>
            <Input id="occurredAt" type="date" {...form.register("occurredAt")} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="description">
              Beschreibung
            </label>
            <Textarea
              id="description"
              rows={6}
              {...form.register("description")}
              placeholder="Beschreibe das Problem möglichst konkret. Was ist passiert? Wie hat es sich geäußert?"
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="proofUrl">
              Beleg-URL (optional)
            </label>
            <Input id="proofUrl" type="url" placeholder="https://" {...form.register("proofUrl")} />
            {form.formState.errors.proofUrl && (
              <p className="text-xs text-destructive">{form.formState.errors.proofUrl.message}</p>
            )}
          </div>

          <CardFooter className="px-0">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Wird gespeichert..." : "Report senden"}
            </Button>
          </CardFooter>
        </form>
        {successModelId && (
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-4 text-sm">
            <p className="font-medium">Vielen Dank für deinen Beitrag!</p>
            <p className="mt-2 text-muted-foreground">
              Dein Report wurde gespeichert. Du kannst ihn dir im Community-Tab ansehen.
            </p>
            <Link href={`/models/${successModelId}?tab=community`} className="mt-3 inline-flex text-primary hover:underline">
              Zur Modellseite
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
