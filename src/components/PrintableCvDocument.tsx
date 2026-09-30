import React from 'react';
import { UserProfile, Experience, Education, SkillCategory, ReverseCV, Project } from '../types/portfolio';
import { MapPin, Mail, Phone, Globe, Linkedin, Github } from 'lucide-react';

interface PrintableCvDocumentProps {
  profile: UserProfile;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  reverseCv: ReverseCV;
  projects?: Project[];
  mode: 'classic' | 'reverse';
  format: 'compact' | 'detailed';
  palette: 'monochrome' | 'corporate' | 'slate';
}

export const PrintableCvDocument: React.FC<PrintableCvDocumentProps> = ({
  profile,
  experiences,
  education,
  skillCategories,
  reverseCv,
  projects,
  mode,
  format,
  palette,
}) => {
  // Theme color styling mappings
  const themeStyles = {
    monochrome: {
      bg: 'bg-white',
      text: 'text-neutral-900',
      heading: 'text-neutral-950',
      accent: 'text-neutral-900',
      accentBg: 'bg-neutral-900',
      border: 'border-neutral-300',
      subtext: 'text-neutral-600',
    },
    corporate: {
      bg: 'bg-white',
      text: 'text-slate-900',
      heading: 'text-sky-950',
      accent: 'text-sky-700',
      accentBg: 'bg-sky-700',
      border: 'border-sky-200',
      subtext: 'text-slate-600',
    },
    slate: {
      bg: 'bg-white',
      text: 'text-neutral-800',
      heading: 'text-neutral-950',
      accent: 'text-amber-600',
      accentBg: 'bg-amber-600',
      border: 'border-neutral-200',
      subtext: 'text-neutral-600',
    },
  }[palette];

  return (
    <div
      id="recruiter-cv-document"
      className={`print-only-cv w-full max-w-[210mm] mx-auto ${themeStyles.bg} ${themeStyles.text} p-6 sm:p-10 shadow-lg print:shadow-none border ${themeStyles.border} print:border-none print:m-0 print:p-0 print:max-w-none text-left font-sans text-xs leading-relaxed`}
      style={{ minHeight: '297mm' }}
    >
      {/* ========================================================================= */}
      {/* MODE 1: CLASSIQUE (Format standard recruteur chronologique & compétences) */}
      {/* ========================================================================= */}
      {mode === 'classic' && (
        <div className="space-y-6">
          {/* Header Block: Identity & Contacts */}
          <div className={`pb-5 border-b ${themeStyles.border}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {profile.avatarUrl && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border border-neutral-300 dark:border-neutral-700 shrink-0 shadow-xs"
                  />
                )}
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-extrabold ${themeStyles.heading} tracking-tight font-display`}>
                    {profile.name}
                  </h1>
                  <p className={`text-sm sm:text-base font-semibold ${themeStyles.accent} mt-0.5`}>
                    {profile.title}
                  </p>
                  <p className={`text-xs ${themeStyles.subtext} mt-1 max-w-xl`}>
                    {profile.subTitle}
                  </p>
                </div>
              </div>

              {/* Direct Recruiter Contact list */}
              <div className="space-y-1 text-xs text-neutral-600 font-mono shrink-0">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-800">{profile.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span className="text-neutral-800">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <Globe className="w-3 h-3 text-neutral-400" />
                  <span>{profile.website}</span>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <p className="text-xs text-neutral-700 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* Two-Column Body Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Experiences (8 cols) */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} pb-1.5 border-b ${themeStyles.border} mb-4`}>
                  Expériences Professionnelles ({profile.yearsOfExperience} ans)
                </h2>

                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="avoid-break space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-bold text-neutral-900 text-xs sm:text-sm">
                          {exp.role} <span className="font-normal text-neutral-600">· {exp.company}</span>
                        </h3>
                        <span className="font-mono text-[11px] text-neutral-500 shrink-0">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-600 italic">
                        {exp.summary}
                      </p>

                      <ul className="list-disc list-outside ml-3.5 space-y-1 text-[11px] text-neutral-700">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>

                      {exp.metrics && (
                        <div className="text-[11px] font-mono text-emerald-800 font-medium">
                          Impact mesuré : {exp.metrics}
                        </div>
                      )}

                      <div className="text-[10px] text-neutral-500 pt-0.5">
                        <strong className="text-neutral-700 font-semibold">Technologies :</strong>{' '}
                        {exp.technologies.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projets Clés & Architecture (Généré dynamiquement en temps réel) */}
              <div className="pt-2 avoid-break">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} pb-1.5 border-b ${themeStyles.border} mb-3 flex items-center justify-between`}>
                  <span>Projets Réalisés & Contributions ({projects && projects.length > 0 ? projects.length : 4})</span>
                  <span className="text-[10px] font-normal lowercase opacity-75">actualisé en direct</span>
                </h2>
                <div className="space-y-3">
                  {projects && projects.length > 0 ? (
                    projects.map((proj) => (
                      <div key={proj.id} className="text-[11px] space-y-0.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-neutral-900">
                            {proj.title}
                            <span className="font-normal text-neutral-500"> ({proj.category})</span>
                            {proj.isCustom && (
                              <span className="ml-1.5 text-[9px] font-semibold text-amber-700 bg-amber-100 px-1 py-0.2 rounded">
                                Ajouté
                              </span>
                            )}
                          </span>
                          {proj.metrics && (
                            <span className="font-mono text-[10px] text-emerald-700 font-medium shrink-0">
                              {proj.metrics}
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-700 leading-snug">
                          {proj.tagline}
                        </p>
                        {format === 'detailed' && proj.technologies && proj.technologies.length > 0 && (
                          <div className="text-[10px] text-neutral-500 font-mono">
                            Stack : {proj.technologies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-neutral-500">Aucun projet répertorié.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Skills, Education, Info (4 cols) */}
            <div className="md:col-span-4 space-y-6">
              
              {/* Technical Skills */}
              <div className="avoid-break">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} pb-1.5 border-b ${themeStyles.border} mb-3`}>
                  Compétences Clés
                </h2>
                
                <div className="space-y-3 text-[11px]">
                  {skillCategories.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <div className="font-bold text-neutral-900 text-[11px]">
                        {cat.name.split('&')[0].trim()}
                      </div>
                      <p className="text-neutral-600 leading-snug">
                        {cat.skills.map(s => s.name).join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="avoid-break">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} pb-1.5 border-b ${themeStyles.border} mb-3`}>
                  Formation & Diplômes
                </h2>

                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-[11px] space-y-0.5">
                      <div className="font-bold text-neutral-900">
                        {edu.degree}
                      </div>
                      <div className="text-neutral-600">
                        {edu.institution} ({edu.year})
                      </div>
                      {edu.honors && (
                        <div className="text-emerald-700 font-medium text-[10px]">
                          {edu.honors}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formations & Certifications */}
              <div className="avoid-break">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} pb-1.5 border-b ${themeStyles.border} mb-3`}>
                  Certifications & Formations
                </h2>

                <div className="space-y-2 text-[10px] text-neutral-700">
                  <div>
                    <span className="font-bold text-neutral-900">Certificate Ethical Hacker</span>
                    <div className="text-neutral-500">Cisco Networking Academy (2026)</div>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Attestation Data Engineering</span>
                    <div className="text-neutral-500">Togo AI SUMMER SCHOOL · Togo AI Lab (2026)</div>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Analyste en Cybersécurité</span>
                    <div className="text-neutral-500">Univ. Numérique Cheikh Hamidou Kane (2025)</div>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Certificat Nufia AI Camp</span>
                    <div className="text-neutral-500">IA dans la création de produits (2025)</div>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900">Hacking, Python & Admin Système</span>
                    <div className="text-neutral-500">GSI MEL Academy (2023 - 2024)</div>
                  </div>
                </div>
              </div>

              {/* Recruiter Quick Fact Sheet */}
              <div className={`p-3 rounded-lg border ${themeStyles.border} bg-neutral-50/70 avoid-break space-y-2`}>
                <h3 className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">
                  Disponibilité & Profil
                </h3>
                <div className="text-[11px] space-y-1 text-neutral-700">
                  <div>
                    <span className="text-neutral-500">Localisation :</span> {profile.location}
                  </div>
                  <div>
                    <span className="text-neutral-500">Statut :</span> {profile.availability}
                  </div>
                  <div>
                    <span className="text-neutral-500">Langues :</span> Français, Anglais (pro), Ewé, Kabyè
                  </div>
                  <div>
                    <span className="text-neutral-500">Intérêts :</span> Football, Athlétisme, Voyages, Montage vidéo (Photoshop, Premiere)
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: CV INVERSÉ (Ce que le candidat recherche chez son employeur)      */}
      {/* ========================================================================= */}
      {mode === 'reverse' && (
        <div className="space-y-6">
          {/* Header Block */}
          <div className={`pb-4 border-b ${themeStyles.border}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Concept Innovant de Transparence
                </span>
                <h1 className={`text-2xl sm:text-3xl font-extrabold ${themeStyles.heading} tracking-tight font-display`}>
                  CV Inversé — Mes Critères de Recherche
                </h1>
                <p className={`text-xs ${themeStyles.subtext} mt-1 max-w-xl`}>
                  Ce document explicite en toute transparence les conditions, valeurs, stack technique et mode de travail recherchés pour garantir un alignement mutuel immédiat avec votre entreprise.
                </p>
              </div>

              <div className="text-right text-xs font-mono text-neutral-600 shrink-0">
                <div className="font-bold text-neutral-900">{profile.name}</div>
                <div>{profile.email}</div>
                <div className="text-emerald-700 font-semibold">{profile.availability}</div>
              </div>
            </div>
          </div>

          {/* Grid Layout for Reverse CV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Rôle & Conditions Financières */}
            <div className={`p-4 rounded-xl border ${themeStyles.border} bg-neutral-50/60 space-y-3 avoid-break`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent}`}>
                01. Rôle Recherché & Modalités
              </h2>
              
              <div className="space-y-2 text-neutral-700">
                <div>
                  <span className="font-semibold text-neutral-900">Postes cibles :</span>
                  <p className="text-xs">{reverseCv.targetRole}</p>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Organisation du travail :</span>
                  <p className="text-xs">{reverseCv.preferredWorkMode}</p>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Taille d’équipe idéale :</span>
                  <p className="text-xs">{reverseCv.idealTeamSize}</p>
                </div>
                <div className="pt-2 border-t border-neutral-200">
                  <span className="font-semibold text-neutral-900">Fourchette salariale (CDI) :</span>
                  <p className="text-xs font-mono font-medium text-emerald-800">{reverseCv.salaryExpectation.cdi}</p>
                  <span className="font-semibold text-neutral-900 mt-1 block">TJM Freelance :</span>
                  <p className="text-xs font-mono font-medium text-emerald-800">{reverseCv.salaryExpectation.freelanceTjm}</p>
                </div>
              </div>
            </div>

            {/* Box 2: Stack Souhaitée vs Stack Évitée */}
            <div className={`p-4 rounded-xl border ${themeStyles.border} bg-neutral-50/60 space-y-3 avoid-break`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent}`}>
                02. Préférences Techniques
              </h2>

              <div className="space-y-3 text-neutral-700">
                <div>
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5 text-xs text-emerald-800">
                    ✓ Stack sur laquelle je crée un maximum de valeur :
                  </span>
                  <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                    {reverseCv.preferredStack.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5 text-xs text-rose-800">
                    ✕ Technologies que je ne souhaite plus manipuler :
                  </span>
                  <ul className="list-disc list-inside text-xs mt-1 space-y-0.5 text-neutral-600">
                    {reverseCv.avoidedTech.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Box 3: Valeurs Culturelles Essentielles */}
            <div className={`p-4 rounded-xl border ${themeStyles.border} bg-neutral-50/60 space-y-3 avoid-break`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent}`}>
                03. Culture & Environnement Humain
              </h2>
              
              <div className="space-y-2 text-xs">
                {reverseCv.culturalValues.map((val) => (
                  <div key={val.title} className="pb-2 border-b border-neutral-200 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between font-semibold text-neutral-900">
                      <span>{val.title}</span>
                      <span className="text-[10px] font-mono text-amber-700">{val.importance}</span>
                    </div>
                    <p className="text-neutral-600 mt-0.5 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 4: Green Flags & Red Flags */}
            <div className={`p-4 rounded-xl border ${themeStyles.border} bg-neutral-50/60 space-y-3 avoid-break`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent}`}>
                04. Signaux Clés (Green vs Red Flags)
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-bold text-emerald-800 mb-1">
                    Signaux positifs (Green Flags) :
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-neutral-700">
                    {reverseCv.greenFlags.slice(0, 3).map((gf, i) => (
                      <li key={i}>{gf}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <div className="font-bold text-rose-800 mb-1">
                    Signaux d’incompatibilité (Red Flags) :
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-neutral-700">
                    {reverseCv.redFlags.slice(0, 3).map((rf, i) => (
                      <li key={i}>{rf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Recruiter Questions */}
          <div className={`p-4 rounded-xl border ${themeStyles.border} bg-neutral-50/80 avoid-break`}>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.accent} mb-2`}>
              Questions que je poserai lors de notre premier échange technique :
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {reverseCv.questionsForRecruiter.map((q, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="font-mono text-neutral-500 font-bold shrink-0">0{i+1}.</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer stamp of authenticity */}
      <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
        <div>Document généré le {new Date().toLocaleDateString('fr-FR')} pour les recruteurs</div>
        <div>Alexandre Martin · {profile.email}</div>
      </div>
    </div>
  );
};
