import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// If keys are missing, we log a warning instead of crashing the whole app
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Database features will not work.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
