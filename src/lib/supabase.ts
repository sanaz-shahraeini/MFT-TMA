import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qgqxzxmtbqbgvhqhgzrg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncXh6eG10YnFiZ3ZocWhnenJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3OTY4MDAsImV4cCI6MjAyNjM3MjgwMH0.Pu_TJrJDxkODZxjPgd_JHn3K4Yt_UPJHHgZDVNfxE0M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
