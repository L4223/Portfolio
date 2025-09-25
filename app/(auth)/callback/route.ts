import { NextResponse } from "next/server";

import { createSupabaseRouteHandlerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const supabase = createSupabaseRouteHandlerClient();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL(next, request.url));
}
