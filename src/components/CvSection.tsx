import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Experience, Education, SkillCategory, ReverseCV, Project } from '../types/portfolio';
import { initialProfile } from '../data/portfolioData';
import { PrintableCvDocument } from './PrintableCvDocument';
import {
  FileDown,
  Printer,
  FileText,
  Repeat,
  Upload,
  Copy,
  Check,
  Eye,
  Sliders,
  Sparkles,
  HelpCircle,
  FileCheck,
  Trash2,
  Edit3,
  Camera,
  RotateCcw,
  Plus,
  FolderGit2
} from 'lucide-react';

interface CvSectionProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  experiences: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  reverseCv: ReverseCV;
  projects?: Project[];
  onOpenAddProject?: () => void;
  onOpenAddSkill?: () => void;
  onOpenAddExperience?: () => void;
  lastUpdatedCvAt?: Date;
  generationTrigger?: number;
}

export const CvSection: React.FC<CvSectionProps> = ({
  profile,
  setProfile,
  experiences,
  education,
  skillCategories,
  reverseCv,
  projects = [],
  onOpenAddProject,
  onOpenAddSkill,
  onOpenAddExperience,
  lastUpdatedCvAt,
  generationTrigger,
}) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'recruiter' | 'reverse' | 'customize'>('recruiter');
  const [justRegenerated, setJustRegenerated] = useState(false);

  // When skills, projects, experiences or profile change, automatically generate and show standard CV
  useEffect(() => {
    if (generationTrigger && generationTrigger > 0) {
      setActiveTab('recruiter');
      setJustRegenerated(true);
      const timer = setTimeout(() => setJustRegenerated(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [generationTrigger]);

  const handleManualRegenerate = () => {
    setActiveTab('recruiter');
    setJustRegenerated(true);
    setTimeout(() => setJustRegenerated(false), 2500);
    const docEl = document.getElementById('recruiter-cv-document');
    if (docEl) {
      docEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  // PDF Export Configuration
  const [pdfPalette, setPdfPalette] = useState<'monochrome' | 'corporate' | 'slate'>('monochrome');
  const [pdfFormat, setPdfFormat] = useState<'compact' | 'detailed'>('detailed');
  const [copiedAts, setCopiedAts] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Trigger high-fidelity PDF print
  const handlePrintPdf = () => {
    setIsExporting(true);
    // Smooth scroll document into view then trigger print
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 250);
  };

  // Copy structured executive resume for ATS recruiter CRM
  const handleCopyAtsText = () => {
    const atsText = `
CURRICULUM VITAE — ${profile.name.toUpperCase()}
${profile.title}
Email: ${profile.email} | Téléphone: ${profile.phone}
Localisation: ${profile.location}
Disponibilité: ${profile.availability}

RÉSUMÉ PROFESSIONNEL :
${profile.bio}

EXPÉRIENCES CLÉS :
${experiences.map(e => `• ${e.period}: ${e.role} @ ${e.company} (${e.type})
  ${e.summary}
  Stack: ${e.technologies.join(', ')}
  Impact: ${e.metrics || 'N/A'}`).join('\n\n')}

COMPÉTENCES CLÉS :
${skillCategories.map(c => `• ${c.name}: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

PROJETS & RÉALISATIONS PHARES :
${projects.slice(0, 4).map(p => `• ${p.title} (${p.category}) : ${p.tagline} [Stack: ${p.technologies.join(', ')}] [Impact: ${p.metrics}]`).join('\n')}

FORMATION :
${education.map(ed => `• ${ed.year}: ${ed.degree} — ${ed.institution}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(atsText).then(() => {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2500);
    });
  };

  // Handle CV file insertion/upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setUploadMessage('Format invalide. Veuillez sélectionner un document au format PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setProfile(prev => ({
        ...prev,
        uploadedCvFile: {
          name: file.name,
          size: file.size,
          uploadDate: new Date().toLocaleDateString('fr-FR'),
          dataUrl,
        }
      }));
      setUploadMessage(`Document "${file.name}" inséré avec succès ! Il est maintenant accessible au téléchargement.`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedFile = () => {
    setProfile(prev => {
      const copy = { ...prev };
      delete copy.uploadedCvFile;
      return copy;
    });
    setUploadMessage('Le fichier personnalisé a été retiré.');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadMessage('Format invalide. Veuillez sélectionner une image (JPG, PNG ou WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setProfile(prev => ({
        ...prev,
        avatarUrl: dataUrl,
      }));
      setUploadMessage('Photo mise à jour avec succès sur l’accueil et sur le CV !');
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setProfile(prev => ({
      ...prev,
      avatarUrl: initialProfile.avatarUrl,
    }));
    setUploadMessage('Photo par défaut réinitialisée.');
  };

  return (
    <section id="cv-recruteur" className="py-20 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 max-w-3xl">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Espace Recrutement & Candidature
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tracking-tight">
            CV, CV Inversé & Espace Recruteur
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Consultez le CV classique au format A4 haute fidélité, découvrez le <strong className="text-neutral-900 dark:text-neutral-200">CV Inversé</strong> (mes critères et attentes transparentes envers l’entreprise), ou insérez/personnalisez votre propre CV avec téléchargement PDF direct.
          </p>
        </div>

        {/* Tab switcher: Allowed interactive functional buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'recruiter'
                ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>CV Format Recruteur (A4)</span>
          </button>

          <button
            onClick={() => setActiveTab('reverse')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'reverse'
                ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>CV Inversé (Mes Attentes)</span>
          </button>

          <button
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'customize'
                ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Insérer / Éditer le CV</span>
            {profile.uploadedCvFile && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PDF EXPORT TOOLBAR FOR RECRUITERS                                         */}
        {/* ========================================================================= */}
        <div className="recruiter-toolbar p-5 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 mb-8 space-y-4 shadow-xs dark:shadow-none">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left toolbar settings: Format & Palette */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Options d’export PDF :
              </span>

              {/* Format selection */}
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-950 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setPdfFormat('compact')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    pdfFormat === 'compact' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  1 Page ATS
                </button>
                <button
                  onClick={() => setPdfFormat('detailed')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    pdfFormat === 'detailed' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  Détaillé 2 Pages
                </button>
              </div>

              {/* Palette selection */}
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-950 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setPdfPalette('monochrome')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    pdfPalette === 'monochrome' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  Noir & Blanc Éco
                </button>
                <button
                  onClick={() => setPdfPalette('corporate')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    pdfPalette === 'corporate' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  Bleu Corporate
                </button>
                <button
                  onClick={() => setPdfPalette('slate')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    pdfPalette === 'slate' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  Ardoise
                </button>
              </div>
            </div>

            {/* Right toolbar buttons: Direct PDF Download & ATS copy */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Force Regenerate Standard CV button */}
              <button
                type="button"
                onClick={handleManualRegenerate}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 rounded-lg transition-colors cursor-pointer"
                title="Régénérer immédiatement le document de CV Standard avec toutes les modifications"
              >
                <RotateCcw className={`w-3.5 h-3.5 text-amber-600 dark:text-amber-400 ${justRegenerated ? 'animate-spin' : ''}`} />
                <span>Régénérer le CV Standard</span>
              </button>

              {/* ATS copy text */}
              <button
                onClick={handleCopyAtsText}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-transparent rounded-lg transition-colors cursor-pointer"
                title="Copier le texte brut pour le coller dans votre logiciel de recrutement"
              >
                {copiedAts ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAts ? 'Copié dans le presse-papier !' : 'Copier pour ATS / CRM'}</span>
              </button>

              {/* If user uploaded their custom PDF, show direct download for it */}
              {profile.uploadedCvFile?.dataUrl && (
                <a
                  href={profile.uploadedCvFile.dataUrl}
                  download={profile.uploadedCvFile.name}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Télécharger PDF Original</span>
                </a>
              )}

              {/* Main PDF Print/Download button */}
              <button
                onClick={handlePrintPdf}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <FileDown className="w-4 h-4" />
                <span>{isExporting ? 'Génération du PDF...' : 'Télécharger au format PDF'}</span>
              </button>
            </div>

          </div>

          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 pt-1 border-t border-neutral-200 dark:border-neutral-800/60">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
            <span>
              Astuce pour les recruteurs : Dans la fenêtre d’impression qui s’ouvre, choisissez la destination <strong className="text-neutral-800 dark:text-neutral-300">« Enregistrer au format PDF »</strong> pour obtenir un fichier vectoriel net et prêt pour vos dossiers.
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 3: INSÉRER / ÉDITER LE CV (INTERFACE UTILISATEUR & UPLOAD)            */}
        {/* ========================================================================= */}
        {activeTab === 'customize' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-8 mb-12 shadow-sm dark:shadow-none">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                Insérer ou Personnaliser Votre CV
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Vous pouvez soit téléverser votre propre fichier PDF de CV officiel, soit modifier les données de profil ci-dessous en direct.
              </p>
            </div>

            {/* Upload Zone */}
            <div className="p-6 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950/60 text-center space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />

              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400">
                  <Upload className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Téléversez votre propre CV au format PDF
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Glissez-déposez votre fichier ici, ou cliquez pour parcourir vos dossiers (PDF uniquement).
                </p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Sélectionner un fichier PDF
              </button>

              {/* Status or Active uploaded file */}
              {profile.uploadedCvFile && (
                <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-300 max-w-md mx-auto">
                  <div className="flex items-center gap-2 truncate">
                    <FileCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="truncate font-mono">{profile.uploadedCvFile.name}</span>
                    <span className="text-neutral-500 text-[11px]">
                      ({Math.round(profile.uploadedCvFile.size / 1024)} Ko)
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveUploadedFile}
                    className="p-1 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="Supprimer le fichier inséré"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {uploadMessage && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  {uploadMessage}
                </div>
              )}
            </div>

            {/* Quick Profile Form Editor */}
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider text-xs">
                Informations du profil (modifiables en temps réel)
              </h4>

              {/* Photo Management Card */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="file"
                  ref={photoInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border-2 border-amber-400 shrink-0 shadow-sm">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Camera className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="font-semibold text-xs text-neutral-900 dark:text-white">
                    Photo de profil du portfolio & du CV
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Cette photo apparaît en grand sur la page d'accueil et sur l'en-tête du document de CV.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-500" />
                      <span>Changer la photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetPhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                      title="Revenir à la photo par défaut de Logan Dimitri"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Réinitialiser</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Nom Complet</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Titre Professionnel</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Email Professionnel</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Téléphone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Disponibilité</label>
                  <input
                    type="text"
                    value={profile.availability}
                    onChange={(e) => setProfile(p => ({ ...p, availability: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Localisation & Télétravail</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 text-xs">Résumé / Bio Exécutive</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-400/5 dark:bg-amber-400/10 border border-amber-400/20">
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ajouter des réalisations ou compétences au CV</span>
                    </h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Les éléments ajoutés sont automatiquement synchronisés avec le portfolio et le PDF du CV.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {onOpenAddExperience && (
                      <button
                        type="button"
                        onClick={onOpenAddExperience}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Ajouter une expérience</span>
                      </button>
                    )}
                    {onOpenAddProject && (
                      <button
                        type="button"
                        onClick={onOpenAddProject}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-500" />
                        <span>+ Ajouter un projet</span>
                      </button>
                    )}
                    {onOpenAddSkill && (
                      <button
                        type="button"
                        onClick={onOpenAddSkill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-500" />
                        <span>+ Ajouter une compétence</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('recruiter')}
                  className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  Voir le résultat sur le CV (A4)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DOCUMENT PREVIEW CONTAINER (A4 FORMAT)                                    */}
        {/* ========================================================================= */}

        {/* Real-time Dynamic CV Generation Indicator Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3.5 rounded-xl bg-amber-400/10 dark:bg-amber-400/15 border border-amber-400/30 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              CV Standard régénéré en direct :
            </span>
            <span className="text-neutral-600 dark:text-neutral-300">
              {experiences.length} expériences · {projects.length} projets · {totalSkills} compétences
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-[11px] font-mono">
            <span>Dernière régénération :</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {lastUpdatedCvAt ? lastUpdatedCvAt.toLocaleTimeString('fr-FR') : new Date().toLocaleTimeString('fr-FR')}
            </span>
          </div>
        </div>

        {justRegenerated && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 animate-fadeIn font-semibold">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Votre CV Standard vient d'être mis à jour et régénéré avec vos dernières modifications !</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Prêt pour impression / export</span>
          </div>
        )}

        <div className={`relative rounded-2xl bg-neutral-200/70 dark:bg-neutral-900/40 p-4 sm:p-8 border transition-all duration-500 overflow-x-auto ${
          justRegenerated
            ? 'border-amber-400 dark:border-amber-400 ring-4 ring-amber-400/20 shadow-xl'
            : 'border-neutral-300 dark:border-neutral-800/80'
        }`}>
          {/* Document Header Bar */}
          <div className="no-print flex items-center justify-between mb-4 pb-3 border-b border-neutral-300 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                Aperçu fidèle du document PDF A4 ({activeTab === 'reverse' ? 'CV Inversé' : 'CV Standard Recruteur'})
              </span>
            </div>
            <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              Format Standard 210 × 297 mm
            </div>
          </div>

          {/* Render the printable document */}
          <PrintableCvDocument
            profile={profile}
            experiences={experiences}
            education={education}
            skillCategories={skillCategories}
            reverseCv={reverseCv}
            projects={projects}
            mode={activeTab === 'reverse' ? 'reverse' : 'classic'}
            format={pdfFormat}
            palette={pdfPalette}
          />
        </div>

      </div>
    </section>
  );
};
