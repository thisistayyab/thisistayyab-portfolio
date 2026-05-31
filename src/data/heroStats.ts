import { Code2, Rocket, Sparkles, Smile, type LucideIcon } from 'lucide-react';

export type HeroStatTone = 'violet' | 'purple' | 'blue' | 'pink';

export interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
  tone: HeroStatTone;
}

export const heroStats: HeroStat[] = [
  { icon: Sparkles, value: '3+', label: 'Years Experience', tone: 'violet' },
  { icon: Rocket, value: '15+', label: 'Projects Completed', tone: 'purple' },
  { icon: Code2, value: '1150+', label: 'Problems Solved', tone: 'blue' },
  { icon: Smile, value: '100%', label: 'Client Satisfaction', tone: 'pink' },
];
