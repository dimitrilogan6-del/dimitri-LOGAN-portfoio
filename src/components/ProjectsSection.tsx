import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';
import { AddProjectModal } from './AddProjectModal';
import { ArrowUpRight, FolderGit2, Code2, Plus, Trash2, Sparkles, RotateCcw } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
  onResetProjects?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  onDeleteProject,
  onResetProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Base categories
  const baseCategories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'Full-Stack', label: 'Full-Stack & SaaS' },
    { id: 'Mobile & Fintech', label: 'Fintech & Mobile' },
    { id: 'Cloud & API', label: 'Cloud & APIs' },
    { id: 'Open Source', label: 'Open Source' },
  ];

  // Include any custom categories from user added projects
  const customCategories = Array.from(
    new Set(
      projects
        .map((p) => p.category)
        .filter((c) => !baseCategories.some((bc) => bc.id === c))
    )
  ).map((catName) => ({ id: catName, label: catName }));

  const allCategories = [...baseCategories, ...customCategories];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const hasCustomProjects = projects.some((p) => p.isCustom);

  return (
    <section id="projets" className="py-20 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                Portfolio & Réalisations
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-400/20">
                {projects.length} projets actifs
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tracking-tight">
              Projets Conçus & Déployés
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Applications complexes conçues de bout en bout, avec focus sur la performance, l’accessibilité et la maintenabilité à long terme.
            </p>
          </div>

          {/* Action buttons & Filter tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Primary Action Button: Ajouter un projet */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
              title="Ajouter un nouveau projet ou réalisation au portfolio"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Ajouter un projet</span>
            </button>

            {hasCustomProjects && onResetProjects && (
              <button
                type="button"
                onClick={onResetProjects}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl transition-colors cursor-pointer"
                title="Rétablir les projets initiaux"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
            )}

            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project) => {
            const isFeatured = project.featured;
            const colSpanClass = isFeatured ? 'lg:col-span-6' : 'lg:col-span-6';

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`${colSpanClass} group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer overflow-hidden shadow-xs dark:shadow-none`}
              >
                {/* Custom badge & delete action if user created */}
                {project.isCustom && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-neutral-950 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      Nouveau
                    </span>
                    {onDeleteProject && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Supprimer le projet "${project.title}" ?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-neutral-900/70 hover:bg-rose-600 text-neutral-200 hover:text-white transition-colors cursor-pointer"
                        title="Supprimer ce projet"
                        aria-label={`Supprimer ${project.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Media frame if present */}
                {project.image ? (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const fb = document.getElementById(`fb-${project.id}`);
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    <div
                      id={`fb-${project.id}`}
                      style={{ display: 'none' }}
                      className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 p-6 text-center"
                    >
                      <FolderGit2 className="w-8 h-8 text-amber-500 dark:text-amber-400 mb-2" />
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">{project.title}</span>
                    </div>

                    {/* Gradient scrim for visual contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />
                  </div>
                ) : (
                  <div className="relative h-28 w-full rounded-xl mb-6 bg-neutral-100/70 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-amber-600 dark:text-amber-400">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Projet Architecture</span>
                        <div className="text-sm font-bold text-neutral-900 dark:text-white font-mono">{project.metrics}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                  </div>
                )}

                {/* Content info */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Unboxed kicker metadata */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{project.metrics}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech stack metadata */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {project.technologies.slice(0, 5).map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="font-mono text-neutral-700 dark:text-neutral-300">{tech}</span>
                        {i < Math.min(project.technologies.length, 5) - 1 && (
                          <span className="text-neutral-400 dark:text-neutral-600">/</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-neutral-400 dark:text-neutral-500 text-[11px]">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for detailed view */}
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

        {/* Modal for adding new project */}
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProject={onAddProject}
        />

      </div>
    </section>
  );
};
