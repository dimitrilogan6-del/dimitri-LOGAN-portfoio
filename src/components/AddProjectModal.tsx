import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Image as ImageIcon, Upload, Code2, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Project } from '../types/portfolio';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

const PRESET_IMAGES = [
  { label: 'SaaS Platform', url: '/src/assets/images/project_saas_platform_1790777032608.jpg' },
  { label: 'Mobile & Fintech', url: '/src/assets/images/project_mobile_fintech_1790777046049.jpg' },
];

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'Full-Stack' | 'Cloud & API' | 'Mobile & Fintech' | 'Open Source' | string>('Full-Stack');
  const [customCategory, setCustomCategory] = useState('');
  const [metrics, setMetrics] = useState('');
  const [technologiesInput, setTechnologiesInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageType, setImageType] = useState<'upload' | 'preset' | 'none'>('preset');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/project_saas_platform_1790777032608.jpg');
  const [context, setContext] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [resultsInput, setResultsInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
      setImageType('upload');
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Veuillez renseigner le titre du projet.');
      return;
    }
    if (!tagline.trim()) {
      setError('Veuillez préciser une phrase d’accroche / description courte.');
      return;
    }

    const finalCategory = category === 'Autre' && customCategory.trim() ? customCategory.trim() : category;

    // Parse technologies
    const techList = technologiesInput
      .split(/[,;\n]/)
      .map(t => t.trim())
      .filter(Boolean);

    // Parse results
    const resultsList = resultsInput
      .split('\n')
      .map(r => r.replace(/^[-•*]\s*/, '').trim())
      .filter(Boolean);

    const newProject: Project = {
      id: `custom-project-${Date.now()}`,
      title: title.trim(),
      tagline: tagline.trim(),
      category: finalCategory,
      image: imageType === 'none' ? '' : imageUrl,
      featured,
      metrics: metrics.trim() || 'Production & Actif',
      technologies: techList.length > 0 ? techList : ['Python', 'Architecture Web'],
      context: context.trim() || `Projet conçu et développé par Logan Dimitri dans le domaine ${finalCategory}.`,
      challenge: challenge.trim() || 'Conception robuste, haute performance et sécurité des données.',
      solution: solution.trim() || 'Architecture moderne modulable avec stack découplée et tests rigoureux.',
      results: resultsList.length > 0 ? resultsList : [
        'Mise en production réussie avec conformité stricte',
        'Architecture résiliente et temps de réponse optimisé'
      ],
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      isCustom: true,
    };

    onAddProject(newProject);
    onClose();

    // Reset fields
    setTitle('');
    setTagline('');
    setMetrics('');
    setTechnologiesInput('');
    setGithubUrl('');
    setLiveUrl('');
    setContext('');
    setChallenge('');
    setSolution('');
    setResultsInput('');
    setError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-neutral-950">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                Ajouter un projet au portfolio
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Mettez en avant une nouvelle réalisation, application ou contribution technique.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section: Informations Principales */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Titre du projet <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: SentinelStream AI Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                >
                  <option value="Full-Stack">Full-Stack & SaaS</option>
                  <option value="Cloud & API">Cloud & APIs</option>
                  <option value="Mobile & Fintech">Mobile & Fintech</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Autre">Autre catégorie personnalisée...</option>
                </select>
              </div>
            </div>

            {category === 'Autre' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Nom de la catégorie personnalisée
                </label>
                <input
                  type="text"
                  placeholder="ex: Cybersécurité & Audit, IA Générative..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Accroche / Synthèse courte <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ex: Architecture distribuée de détection d'intrusions traitant 25k logs/sec en temps réel"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Métrique clé / Impact mesuré
                </label>
                <input
                  type="text"
                  placeholder="ex: 10k req/s · Uptime 99.99% ou +40% de vélocité"
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="ex: Python, FastAPI, Docker, PostgreSQL, React, Tailwind"
                  value={technologiesInput}
                  onChange={(e) => setTechnologiesInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section: Visuel & Illustration */}
          <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Visuel du projet
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setImageType('upload');
                  fileInputRef.current?.click();
                }}
                className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  imageType === 'upload'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-neutral-900 dark:text-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <Upload className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-medium">Charger une image</span>
                <span className="text-[10px] text-neutral-400">PNG, JPG ou WebP</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setImageType('preset');
                  setImageUrl(PRESET_IMAGES[0].url);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  imageType === 'preset'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-neutral-900 dark:text-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <ImageIcon className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-medium">Image Modèle</span>
                <span className="text-[10px] text-neutral-400">Architecture pro</span>
              </button>

              <button
                type="button"
                onClick={() => setImageType('none')}
                className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  imageType === 'none'
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-neutral-900 dark:text-white'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <Code2 className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-medium">Badge Minimal</span>
                <span className="text-[10px] text-neutral-400">Sans capture</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />

            {imageType !== 'none' && imageUrl && (
              <div className="relative aspect-video max-h-36 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950">
                <img src={imageUrl} alt="Prévisualisation" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-neutral-900/80 backdrop-blur-sm text-[10px] text-white rounded">
                  Aperçu
                </div>
              </div>
            )}
          </div>

          {/* Section: Liens GitHub & Live */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Lien GitHub / Dépôt (optionnel)
              </label>
              <input
                type="url"
                placeholder="https://github.com/votre-compte/projet"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Lien Démo / Production (optionnel)
              </label>
              <input
                type="url"
                placeholder="https://mon-application.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>
          </div>

          {/* Section: Détails techniques approfondis */}
          <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Fiche Technique Détaillée (Visible au clic dans la modale)
              </span>
              <span className="text-[11px] text-neutral-400">Pré-remplissage automatique si laissé vide</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Contexte métier & Objectif
              </label>
              <textarea
                rows={2}
                placeholder="Contexte dans lequel le projet s'inscrit..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Défi technique principal
                </label>
                <textarea
                  rows={2}
                  placeholder="Problématique de passage à l'échelle, sécurité..."
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Solution architecturale
                </label>
                <textarea
                  rows={2}
                  placeholder="Choix d'architecture, découplage..."
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Résultats & Impacts chiffrés (un résultat par ligne)
              </label>
              <textarea
                rows={2}
                placeholder="• Temps de latence divisé par 3&#10;• Déploiement sans interruption de service&#10;• Adoption par 500+ utilisateurs"
                value={resultsInput}
                onChange={(e) => setResultsInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
              />
              <label htmlFor="featuredCheck" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                Mettre ce projet en vedette (grand format dans la grille)
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Publier le projet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
