import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Supabase Client — Single instance for the entire app.
   Uses NEXT_PUBLIC_ env vars so it works in both server and client components.
   --------------------------------------------------------------------------- */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
