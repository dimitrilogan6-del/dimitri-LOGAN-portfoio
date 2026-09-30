import React from 'react';
import { ArrowUp, Github, Linkedin, FileDown } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface FooterProps {
  profile: UserProfile;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100/70 dark:bg-neutral-950 py-12 text-xs text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-900">
          <div>
            <span className="font-display font-bold text-neutral-900 dark:text-white text-base block">
              {profile.name}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5 block">
              {profile.title} · {profile.location}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('competences')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Compétences
            </button>
            <button
              onClick={() => onNavigate('experiences')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Expériences
            </button>
            <button
              onClick={() => onNavigate('projets')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Projets
            </button>
            <button
              onClick={() => onNavigate('cv-recruteur')}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Espace Recruteur (PDF)</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Retour en haut"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. Tous droits réservés. Conçu sans artifice, optimisé pour les recruteurs et pairs ingénieurs.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
