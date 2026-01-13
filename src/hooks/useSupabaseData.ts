import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Project, Experience, Service, Profile, Testimonial } from '../lib/supabase';

// Icon mapping for components
const iconMap: Record<string, any> = {};

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        // Transform Supabase data to match component expectations
        const transformed = data?.map((p) => ({
          id: p.project_id,
          category: p.category,
          img: p.img,
          link: p.link,
          name: p.name,
          description: p.description,
          technologies: p.technologies,
          button: p.button,
        })) || [];

        setProjects(transformed);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        // Fallback to local data if Supabase fails
        const { projects: localProjects } = await import('../data/projects');
        setProjects(localProjects);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        // Transform data (icon mapping would need to be implemented)
        const transformed = data?.map((e) => ({
          id: e.experience_id,
          type: e.type,
          Icon: iconMap[e.icon_name] || null, // Would need icon mapping
          iconSize: e.icon_size,
          color: e.color,
          title: e.title,
          company: e.company,
          period: e.period,
          description: e.description,
          technologies: e.technologies,
        })) || [];

        setExperiences(transformed);
        setLoading(false);
      } catch (err) {
        // Fallback to local data
        const { experiences: localExperiences } = await import('../data/experience');
        setExperiences(localExperiences);
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading };
};

// Similar hooks for services, profiles, testimonials
// For now, components can use local data and we'll migrate gradually
