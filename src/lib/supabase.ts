import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zddbnwtzgabzhdrzxygd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZGJud3R6Z2Fiemhkcnp4eWdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTIyNjMsImV4cCI6MjA4Mzc4ODI2M30._jaXuwXs1UwdaDkgLAw0B6pzF1EUs2tHAdvb5wN-oxE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface PageView {
  id: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  session_id?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  created_at: string;
}

export interface UserEvent {
  id: string;
  event_type: string;
  event_name: string;
  element_id?: string;
  element_type?: string;
  page_path: string;
  session_id?: string;
  user_agent?: string;
  ip_address?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Session {
  id: string;
  session_id: string;
  user_agent?: string;
  ip_address?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  first_visit: string;
  last_activity: string;
  page_count: number;
  duration_seconds: number;
  is_bounce: boolean;
}

export interface Project {
  id: string;
  project_id: number;
  category: string;
  img: string;
  link: string;
  name: string;
  description: string;
  technologies: Array<{ label: string; color: string; width: string }>;
  button: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  experience_id: number;
  type: 'work' | 'education';
  icon_name: string;
  icon_size: number;
  color: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  service_id: number;
  title: string;
  icon_name: string;
  icon_size: number;
  color: string;
  description: string;
  features: string[];
  keywords: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  profile_id: number;
  name: string;
  icon_name: string;
  icon_size: number;
  color: string;
  description: string;
  link: string;
  button: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  testimonial_id: string;
  client_name: string;
  client_role: string;
  client_company?: string;
  client_image?: string;
  platform?: string;
  platform_url?: string;
  rating: number;
  testimonial: string;
  date?: string;
  project_type?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
  is_read: boolean;
  created_at: string;
}
