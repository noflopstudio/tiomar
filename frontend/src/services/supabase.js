import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixgfnvwjphnbbuizkucy.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4Z2ZudndqcGhuYmJ1aXprdWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzAwOTEsImV4cCI6MjA5OTAwNjA5MX0.diaa1T4gyQsANRY46HaYcaSnsYZAz3Ho8InJJHfm-Wc";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);