export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'CDI' | 'Freelance' | 'Conseil' | 'Stage' | string;
  summary: string;
  achievements: string[];
  technologies: string[];
  metrics?: string;
  isCustom?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  details: string;
  honors?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  isCustom?: boolean;
  skills: {
    name: string;
    level: number; // 1 to 5
    experienceYears: string;
    highlights: string;
    isCustom?: boolean;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Cloud & API' | 'Mobile & Fintech' | 'Open Source' | string;
  image: string;
  featured: boolean;
  context: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics: string;
  isCustom?: boolean;
}

export interface ReverseCV {
  targetRole: string;
  idealTeamSize: string;
  preferredWorkMode: string;
  salaryExpectation: {
    cdi: string;
    freelanceTjm: string;
  };
  availability: string;
  preferredStack: string[];
  avoidedTech: string[];
  culturalValues: {
    title: string;
    description: string;
    importance: 'Critique' | 'Très important' | 'Appréciable';
  }[];
  greenFlags: string[];
  redFlags: string[];
  questionsForRecruiter: string[];
}

export interface UserProfile {
  name: string;
  title: string;
  subTitle: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  yearsOfExperience: number;
  bio: string;
  avatarUrl: string;
  linkedin: string;
  github: string;
  website: string;
  uploadedCvFile?: {
    name: string;
    size: number;
    uploadDate: string;
    dataUrl?: string;
  };
}
