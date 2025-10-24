import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These values can be found in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Database types
export interface UserData {
  id: string;
  user_id: string;
  data: any;
  last_synced: string;
  created_at: string;
  updated_at: string;
}
