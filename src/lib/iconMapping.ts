import { ComponentType } from 'react';
import {
  RiCodeSSlashLine,
  RiSmartphoneLine,
  RiDatabaseLine,
  RiCloudLine,
  RiSearchLine,
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiCustomerServiceLine,
  RiGithubFill,
  RiLinkedinFill,
  RiBriefcaseLine,
  RiGraduationCapLine,
} from 'react-icons/ri';
import {
  SiUpwork,
  SiFiverr,
  SiFreelancer,
  SiLeetcode,
  SiCredly,
  SiWordpress,
} from 'react-icons/si';

// Map icon names to actual icon components
export const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  // Services icons
  'RiCodeSSlashLine': RiCodeSSlashLine,
  'RiSmartphoneLine': RiSmartphoneLine,
  'RiDatabaseLine': RiDatabaseLine,
  'RiCloudLine': RiCloudLine,
  'RiSearchLine': RiSearchLine,
  'RiShieldCheckLine': RiShieldCheckLine,
  'RiSpeedUpLine': RiSpeedUpLine,
  'RiCustomerServiceLine': RiCustomerServiceLine,
  'SiWordpress': SiWordpress,
  
  // Profile icons
  'RiGithubFill': RiGithubFill,
  'RiLinkedinFill': RiLinkedinFill,
  'RiBriefcaseLine': RiBriefcaseLine,
  'SiUpwork': SiUpwork,
  'SiFiverr': SiFiverr,
  'SiFreelancer': SiFreelancer,
  'SiLeetcode': SiLeetcode,
  'SiCredly': SiCredly,
  
  // Experience icons
  'RiGraduationCapLine': RiGraduationCapLine,
};

// Get icon component by name
export const getIcon = (iconName: string): ComponentType<{ size?: number }> => {
  return iconMap[iconName] || RiCodeSSlashLine; // Default fallback
};
