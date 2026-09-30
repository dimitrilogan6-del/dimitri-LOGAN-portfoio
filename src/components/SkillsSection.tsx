import React, { useState } from 'react';
import { SkillCategory } from '../types/portfolio';
import { AddSkillModal } from './AddSkillModal';
import { Layers, Terminal, Cpu, Users, Plus, Sparkles, Trash2, RotateCcw, Wrench, ShieldCheck, Headphones } from 'lucide-react';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  onAddSkill: (
    categoryId: string,
    skill: {
      name: string;
      level: number;
      experienceYears: string;
      highlights: string;
      isCustom?: boolean;
    },
    newCategoryName?: string
  ) => void;
  onDeleteSkill?: (categoryId: string, skillName: string) => void;
  onResetSkills?: () => void;
  onNavigateProjects?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillCategories,
  onAddSkill,
  onDeleteSkill,
  onResetSkills,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categoryIcons: Record<string, React.ReactNode> = {
    'cybersecurity': <ShieldCheck className="w-4 h-4" />,
    'data-engineering': <Terminal className="w-4 h-4" />,
    'fullstack-python': <Layers className="w-4 h-4" />,
    'crm-teleservices': <Headphones className="w-4 h-4" />,
    'devops-cloud': <Cpu className="w-4 h-4" />,
  };

  const filteredCategories =
    selectedCategoryId === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategoryId);

  const totalSkillsCount = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  const hasCustomSkills = skillCategories.some(
    (cat) => cat.isCustom || cat.skills.some((s) => s.isCustom)
  );

  return (
    <section id="competences" className="py-20 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                Stack Technique & Savoir-Faire
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-400/20">
                {totalSkillsCount} compétences répertoriées
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tracking-tight">
              Compétences éprouvées en production
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Une expertise articulée autour de Python, des architectures de données à grande échelle, du Cloud et de la cybersécurité défensive/offensive.
            </p>
          </div>

          {/* Action buttons & Interactive filter tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Primary Action Button: Ajouter une compétence */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
              title="Ajouter une compétence ou technologie acquise"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Ajouter une compétence</span>
            </button>

            {hasCustomSkills && onResetSkills && (
              <button
                type="button"
                onClick={onResetSkills}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl transition-colors cursor-pointer"
                title="Rétablir les compétences par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
            )}

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl">
              <button
                onClick={() => setSelectedCategoryId('all')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategoryId === 'all'
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                Toutes ({totalSkillsCount})
              </button>
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedCategoryId === cat.id
                      ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {categoryIcons[cat.id] || <Wrench className="w-3.5 h-3.5" />}
                  <span>{cat.name.split('&')[0].trim()}</span>
                  <span className="text-[10px] opacity-70">({cat.skills.length})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-colors shadow-xs dark:shadow-none relative"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-neutral-100 text-amber-600 dark:bg-neutral-800 dark:text-amber-400">
                    {categoryIcons[category.id] || <Wrench className="w-4 h-4" />}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
                    {category.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {category.isCustom && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                      Catégorie créée
                    </span>
                  )}
                  <span className="text-xs font-mono text-neutral-400">
                    {category.skills.length} skills
                  </span>
                </div>
              </div>

              {/* Skills list inside category */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group relative space-y-1.5 p-2 -mx-2 rounded-xl transition-colors hover:bg-neutral-50/70 dark:hover:bg-neutral-800/30">
                    {/* Top line: Name & Experience duration & rating */}
                    <div className="flex items-baseline justify-between text-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{skill.name}</span>
                        {skill.isCustom && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-400 text-neutral-950">
                            <Sparkles className="w-2.5 h-2.5" />
                            Acquise
                          </span>
                        )}
                        <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{skill.experienceYears}</span>
                      </div>
                      
                      {/* Discrete level rating & delete button */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1" aria-label={`Niveau ${skill.level} sur 5`}>
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <span
                              key={lvl}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                lvl <= skill.level ? 'bg-amber-500 dark:bg-amber-400' : 'bg-neutral-200 dark:bg-neutral-800'
                              }`}
                            />
                          ))}
                        </div>

                        {skill.isCustom && onDeleteSkill && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Supprimer la compétence "${skill.name}" ?`)) {
                                onDeleteSkill(category.id, skill.name);
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-500 transition-opacity cursor-pointer"
                            title={`Supprimer ${skill.name}`}
                            aria-label={`Supprimer ${skill.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Concrete contextual highlight */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {skill.highlights}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding skill */}
        <AddSkillModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          categories={skillCategories}
          onAddSkill={onAddSkill}
        />

        {/* Recruiter notice banner */}
        <div className="mt-12 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs dark:shadow-none">
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <strong className="text-neutral-900 dark:text-white font-semibold">Besoin d’un audit sur une technologie spécifique ?</strong> Les compétences ci-dessus sont démontrées avec des dépôts de code réels et des retours d’expérience chiffrés.
          </div>
          <a
            href="#cv-recruteur"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 underline-offset-4 hover:underline whitespace-nowrap"
          >
            Télécharger le dossier technique en PDF →
          </a>
        </div>

      </div>
    </section>
  );
};
