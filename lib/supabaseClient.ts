// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import fetch from "cross-fetch"; // ✅ 追加

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch }, // ✅ fetch を明示的に指定
});

