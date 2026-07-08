export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  details?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export type ThemeType = 'minimalist' | 'tech' | 'warm' | 'classic';

export interface CVData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications?: string[];
}

export interface PortfolioSettings {
  theme: ThemeType;
  accentColor: string; // Tailwind color class or hex code
  fontSize: 'sm' | 'base' | 'lg';
  showProjects: boolean;
  showEducation: boolean;
}
