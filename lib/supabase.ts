import { cookies } from "next/headers";
import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

export const createSupabaseServerClient = () =>
  createServerComponentClient<Database>({ cookies });

export const createSupabaseRouteHandlerClient = () =>
  createRouteHandlerClient<Database>({ cookies });

export const createSupabaseBrowserClient = () =>
  createClientComponentClient<Database>();
