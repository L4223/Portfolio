import { z } from "zod";

export const reportSchema = z
  .object({
    brandId: z.string({ required_error: "Bitte Marke wählen" }),
    modelId: z.string({ required_error: "Bitte Modell wählen" }),
    mileage: z
      .union([z.string(), z.number()])
      .optional()
      .transform((value) => {
        if (value === undefined || value === "") return undefined;
        const numeric = typeof value === "number" ? value : Number(value);
        return Number.isNaN(numeric) ? undefined : numeric;
      })
      .refine((value) => value === undefined || value >= 0, {
        message: "Bitte gültige Kilometerzahl eingeben"
      }),
    engineCode: z.string().optional(),
    description: z.string().min(30, "Mindestens 30 Zeichen"),
    proofUrl: z.string().url("Bitte gültige URL").optional(),
    occurredAt: z
      .union([z.string(), z.date()])
      .optional()
      .transform((value) => {
        if (!value) return undefined;
        if (value instanceof Date) return value;
        const date = new Date(value as string);
        return Number.isNaN(date.getTime()) ? undefined : date;
      })
  })
  .transform((values) => ({
    ...values,
    mileage: typeof values.mileage === "number" ? Math.round(values.mileage) : undefined
  }));

export type ReportPayload = z.infer<typeof reportSchema>;
