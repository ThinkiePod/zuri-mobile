import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  avatar_url?: string;
  learning_level?: string;
  interests: string[];
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  child_id: string;
  type: "story" | "phonics" | "routine" | "affirmation";
  content_id: string;
  duration: number;
  completed_at: string;
  emotion_rating?: number;
}

export interface LearningProgress {
  id: string;
  child_id: string;
  skill_type: string;
  progress_percentage: number;
  last_updated: string;
}
