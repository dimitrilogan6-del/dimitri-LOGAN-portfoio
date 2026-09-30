import React, { useState, useEffect } from 'react';
import {
  initialProfile,
  experiencesData,
  educationData,
  skillsCategories,
  projectsData,
  reverseCvData,
} from './data/portfolioData';
import { UserProfile, Project, SkillCategory, Experience } from './types/portfolio';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CvSection } from './components/CvSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AddProjectModal } from './components/AddProjectModal';
import { AddSkillModal } from './components/AddSkillModal';
import { AddExperienceModal } from './components/AddExperienceModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // ignore
    }
    return 'dark'; // Default sleek dark theme
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_profile_logan_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.avatarUrl ||
          parsed.avatarUrl.includes('portrait_developer_profile') ||
          parsed.avatarUrl.includes('1790800210935') ||
          parsed.avatarUrl.includes('1790777665598')
        ) {
          parsed.avatarUrl = initialProfile.avatarUrl;
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return initialProfile;
  });

  // Dynamic projects with localStorage persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_logan_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return projectsData;
  });

  // Dynamic skills with localStorage persistence
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_skills_logan_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return skillsCategories;
  });

  // Dynamic experiences with localStorage persistence
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_experiences_logan_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return experiencesData;
  });

  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live regeneration tracking
  const [generationTrigger, setGenerationTrigger] = useState(0);
  const [lastUpdatedCvAt, setLastUpdatedCvAt] = useState<Date>(new Date());

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const notifyCvRegeneration = (actionDescription: string) => {
    setGenerationTrigger((prev) => prev + 1);
    setLastUpdatedCvAt(new Date());
    showToast(`${actionDescription} — CV Standard actualisé.`);
  };

  const handleUpdateAvatar = (newUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarUrl: newUrl }));
    notifyCvRegeneration('Photo de profil modifiée');
  };

  const handleProfileChange: React.Dispatch<React.SetStateAction<UserProfile>> = (updater) => {
    setProfile(updater);
    setGenerationTrigger((prev) => prev + 1);
    setLastUpdatedCvAt(new Date());
  };

  // Synchronize theme with document element class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Save profile to localStorage when edited
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_user_profile_logan_v6', JSON.stringify(profile));
    } catch {
      // Ignore quota errors if large base64 file
    }
  }, [profile]);

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_projects_logan_v3', JSON.stringify(projects));
    } catch {
      // Ignore quota errors
    }
  }, [projects]);

  // Save skills to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_skills_logan_v3', JSON.stringify(skillCategories));
    } catch {
      // Ignore quota errors
    }
  }, [skillCategories]);

  // Save experiences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_experiences_logan_v3', JSON.stringify(experiences));
    } catch {
      // Ignore quota errors
    }
  }, [experiences]);

  // Project Management Handlers
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    notifyCvRegeneration(`Projet « ${newProject.title} » ajouté`);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    notifyCvRegeneration('Projet supprimé');
  };

  const handleResetProjects = () => {
    if (window.confirm('Voulez-vous rétablir la sélection initiale des projets ?')) {
      setProjects(projectsData);
      notifyCvRegeneration('Projets réinitialisés');
    }
  };

  // Skill Management Handlers
  const handleAddSkill = (
    categoryId: string,
    newSkill: {
      name: string;
      level: number;
      experienceYears: string;
      highlights: string;
      isCustom?: boolean;
    },
    newCategoryName?: string
  ) => {
    if (newCategoryName) {
      const newCategory: SkillCategory = {
        id: categoryId,
        name: newCategoryName,
        isCustom: true,
        skills: [newSkill],
      };
      setSkillCategories((prev) => [...prev, newCategory]);
      notifyCvRegeneration(`Compétence « ${newSkill.name} » ajoutée`);
    } else {
      setSkillCategories((prev) =>
        prev.map((cat) => {
          if (cat.id === categoryId) {
            const existingIndex = cat.skills.findIndex((s) => s.name.toLowerCase() === newSkill.name.toLowerCase());
            if (existingIndex >= 0) {
              const updatedSkills = [...cat.skills];
              updatedSkills[existingIndex] = newSkill;
              return { ...cat, skills: updatedSkills };
            }
            return { ...cat, skills: [...cat.skills, newSkill] };
          }
          return cat;
        })
      );
      notifyCvRegeneration(`Compétence « ${newSkill.name} » ajoutée`);
    }
  };

  const handleDeleteSkill = (categoryId: string, skillName: string) => {
    setSkillCategories((prev) =>
      prev
        .map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              skills: cat.skills.filter((s) => s.name !== skillName),
            };
          }
          return cat;
        })
        .filter((cat) => cat.skills.length > 0 || !cat.isCustom)
    );
    notifyCvRegeneration(`Compétence « ${skillName} » retirée`);
  };

  const handleResetSkills = () => {
    if (window.confirm('Voulez-vous rétablir le socle initial de compétences ?')) {
      setSkillCategories(skillsCategories);
      notifyCvRegeneration('Compétences réinitialisées');
    }
  };

  // Experience Management Handlers
  const handleAddExperience = (newExp: Experience) => {
    setExperiences((prev) => [newExp, ...prev]);
    notifyCvRegeneration(`Expérience chez « ${newExp.company} » ajoutée`);
  };

  const handleDeleteExperience = (expId: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== expId));
    notifyCvRegeneration('Expérience retirée');
  };

  const handleResetExperiences = () => {
    if (window.confirm('Voulez-vous rétablir les expériences professionnelles par défaut ?')) {
      setExperiences(experiencesData);
      notifyCvRegeneration('Expériences réinitialisées');
    }
  };

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'competences', 'experiences', 'projets', 'cv-recruteur', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950 transition-colors duration-200">
      {/* Top Bar Navigation with Theme Switcher */}
      <Header
        profileName={profile.name}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Page / Section: Accueil */}
        <Hero
          profile={profile}
          onNavigate={handleNavigate}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* 2. Page / Section: Compétences */}
        <SkillsSection
          skillCategories={skillCategories}
          onAddSkill={handleAddSkill}
          onDeleteSkill={handleDeleteSkill}
          onResetSkills={handleResetSkills}
          onNavigateProjects={() => handleNavigate('projets')}
        />

        {/* 3. Page / Section: Expériences */}
        <ExperienceSection
          experiences={experiences}
          education={educationData}
          onAddExperience={handleAddExperience}
          onDeleteExperience={handleDeleteExperience}
          onResetExperiences={handleResetExperiences}
        />

        {/* 4. Page / Section: Projets réalisés */}
        <ProjectsSection
          projects={projects}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onResetProjects={handleResetProjects}
        />

        {/* 5. Page / Section: CV, CV Inversé & Espace Recruteur avec Téléchargement PDF */}
        <CvSection
          profile={profile}
          setProfile={handleProfileChange}
          experiences={experiences}
          education={educationData}
          skillCategories={skillCategories}
          projects={projects}
          reverseCv={reverseCvData}
          onOpenAddProject={() => setIsAddProjectModalOpen(true)}
          onOpenAddSkill={() => setIsAddSkillModalOpen(true)}
          onOpenAddExperience={() => setIsAddExperienceModalOpen(true)}
          lastUpdatedCvAt={lastUpdatedCvAt}
          generationTrigger={generationTrigger}
        />

        {/* 6. Page / Section: Contact */}
        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />

      {/* Global Modals for direct trigger */}
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        categories={skillCategories}
        onAddSkill={handleAddSkill}
      />

      <AddExperienceModal
        isOpen={isAddExperienceModalOpen}
        onClose={() => setIsAddExperienceModalOpen(false)}
        onAddExperience={handleAddExperience}
      />

      {/* Floating Toast Notification with quick CV review button */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xl border border-neutral-700 dark:border-neutral-200 animate-fadeIn text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => handleNavigate('cv-recruteur')}
            className="ml-2 px-2.5 py-1 text-[11px] font-bold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
          >
            Voir le CV →
          </button>
        </div>
      )}
    </div>
  );
}
