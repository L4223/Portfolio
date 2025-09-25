import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { createSupabaseRouteHandlerClient } from "@/lib/supabase";
import { db } from "@/lib/db";
import { reportSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const supabase = createSupabaseRouteHandlerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 });
  }

  const payload = reportSchema.parse(await request.json());

  const model = await db.model.findUnique({
    where: { id: payload.modelId },
    select: { id: true, brandId: true }
  });

  if (!model || model.brandId !== payload.brandId) {
    return NextResponse.json({ message: "Ungültige Modell- oder Markenkombination" }, { status: 400 });
  }

  await db.communityReport.create({
    data: {
      modelId: payload.modelId,
      userId: session.user.id,
      mileage: payload.mileage,
      engineCode: payload.engineCode,
      description: payload.description,
      proofUrl: payload.proofUrl,
      occurredAt: payload.occurredAt
    }
  });

  revalidatePath(`/models/${payload.modelId}`);

  return NextResponse.json({ modelId: payload.modelId }, { status: 201 });
}
