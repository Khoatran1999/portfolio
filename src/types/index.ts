export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  type: 'featured' | 'regular';
  category: string;
  metrics?: string;
}

export interface Achievement {
  icon: string;
  value: string;
  label: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
