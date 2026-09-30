import React, { useState } from 'react';
import { Experience, Education } from '../types/portfolio';
import { educationData as defaultEducationData, certificationsData } from '../data/portfolioData';
import { AddExperienceModal } from './AddExperienceModal';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  RotateCcw,
  Award,
  ShieldCheck,
  Target
} from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
  education?: Education[];
  onAddExperience: (experience: Experience) => void;
  onDeleteExperience?: (experienceId: string) => void;
  onResetExperiences?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  education = defaultEducationData,
  onAddExperience,
  onDeleteExperience,
  onResetExperiences,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const hasCustomExperiences = experiences.some((e) => e.isCustom);

  return (
    <section id="experiences" className="py-20 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                Parcours Professionnel & Formation
              </span>
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-400/20">
                {experiences.length} expériences enregistrées
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tracking-tight">
              Expériences & Réalisations
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Un cheminement technique éprouvé, de la conception logicielle distribuée à la direction de chantiers Big Data et d'audits de cybersécurité.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
              title="Ajouter une nouvelle expérience professionnelle"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Ajouter une expérience</span>
            </button>

            {hasCustomExperiences && onResetExperiences && (
              <button
                type="button"
                onClick={onResetExperiences}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl transition-colors cursor-pointer"
                title="Rétablir les expériences par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Layout: Experiences (Left 8 cols) & Education / Degrees (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Column: Professional Experiences */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                  Parcours en entreprise & missions
                </h3>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l border-neutral-300 dark:border-neutral-800 space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline node marker */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-amber-500 dark:border-amber-400 bg-white dark:bg-neutral-950 group-hover:bg-amber-400 transition-colors" />

                  <div className="space-y-3 p-4 -m-4 rounded-2xl transition-colors group-hover:bg-neutral-100/50 dark:group-hover:bg-neutral-900/30">
                    {/* Header: Role and Company */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2.5 gap-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                            {exp.role}
                          </h4>
                          <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
                          <span className="text-base font-semibold text-amber-600 dark:text-amber-400">
                            {exp.company}
                          </span>
                        </div>

                        {/* Custom tag & delete button */}
                        {exp.isCustom && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-neutral-950">
                              <Sparkles className="w-2.5 h-2.5" />
                              Ajoutée
                            </span>
                            {onDeleteExperience && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Supprimer l'expérience chez "${exp.company}" ?`)) {
                                    onDeleteExperience(exp.id);
                                  }
                                }}
                                className="p-1 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Supprimer cette expérience"
                                aria-label={`Supprimer ${exp.role} chez ${exp.company}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Clean metadata without pill boxes */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                          {exp.period}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                          {exp.location}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">{exp.type}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {exp.summary}
                    </p>

                    {/* Achievements with clear bullet indicators */}
                    <ul className="space-y-2 pt-1">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                          <CheckCircle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quantifiable metrics callout */}
                    {exp.metrics && (
                      <div className="pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                        Impact : {exp.metrics}
                      </div>
                    )}

                    {/* Technologies list as quiet unboxed text */}
                    <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="text-neutral-400 dark:text-neutral-500 font-medium">Stack :</span>
                      {exp.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-neutral-800 dark:text-neutral-300 font-mono">{tech}</span>
                          {i < exp.technologies.length - 1 && <span className="text-neutral-400 dark:text-neutral-600">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Education & Diplomas */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                Formation & Diplômes
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 space-y-2 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-colors shadow-xs dark:shadow-none"
                >
                  <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    {edu.year}
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {edu.institution} <span className="text-xs font-normal text-neutral-500">· {edu.location}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                    {edu.details}
                  </p>
                  {edu.honors && (
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 pt-1">
                      {edu.honors}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Formations & Certifications Professionnelles */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs dark:shadow-none">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <Award className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Formations & Certifications
                </h4>
              </div>

              <div className="space-y-3">
                {certificationsData.map((cert) => (
                  <div key={cert.title} className="text-xs space-y-0.5">
                    <div className="font-semibold text-neutral-900 dark:text-white leading-snug">
                      {cert.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {cert.issuer}
                    </div>
                    <div className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                      {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missions & Objectifs Opérationnels */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs dark:shadow-none">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                <Target className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display">
                  Missions & Objectifs Clés
                </h4>
              </div>
              <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Surveiller réseaux et systèmes pour détecter intrusions et anomalies en temps réel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Analyser les incidents, rédiger rapports d’alerte et proposer remédiations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Réaliser audits de vulnérabilités, évaluer risques et contribuer à la PSSI (RGPD, ISO 27001).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Tests d’intrusion (pentesting éthique) et recommandations de durcissement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Construction de chaînes Data Engineering fonctionnelles (ETL/ELT).</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Modal for adding experience */}
        <AddExperienceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddExperience={onAddExperience}
        />

      </div>
    </section>
  );
};
