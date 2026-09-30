import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles, Check, AlertCircle, Layers } from 'lucide-react';
import { SkillCategory } from '../types/portfolio';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: SkillCategory[];
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
}

const LEVEL_DESCRIPTIONS: Record<number, string> = {
  1: 'Notions fondamentales & prise en main',
  2: 'Opérationnel / Usage sur des projets d’application',
  3: 'Confirmé / Pratique régulière en environnement pro',
  4: 'Avancé / Conception d’architecture & optimisation',
  5: 'Expert / Maîtrise totale & référent technique',
};

export const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddSkill,
}) => {
  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || 'fullstack-python');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [level, setLevel] = useState<number>(4);
  const [experienceYears, setExperienceYears] = useState('Acquis récemment (2026)');
  const [highlights, setHighlights] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      if (categories.length > 0 && !categories.some(c => c.id === selectedCategoryId)) {
        setSelectedCategoryId(categories[0].id);
      }
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, categories, selectedCategoryId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Veuillez renseigner le nom de la compétence.');
      return;
    }

    if (isNewCategory && !newCategoryName.trim()) {
      setError('Veuillez préciser le titre de la nouvelle catégorie.');
      return;
    }

    const targetCategoryId = isNewCategory
      ? `cat-${Date.now()}`
      : selectedCategoryId;

    const skillData = {
      name: name.trim(),
      level,
      experienceYears: experienceYears.trim() || '2026',
      highlights: highlights.trim() || `Compétence acquise et mise en œuvre par Logan Dimitri avec focus sur la qualité de code et l’efficacité en production.`,
      isCustom: true,
    };

    onAddSkill(
      targetCategoryId,
      skillData,
      isNewCategory ? newCategoryName.trim() : undefined
    );

    onClose();

    // Reset fields
    setName('');
    setLevel(4);
    setExperienceYears('Acquis récemment (2026)');
    setHighlights('');
    setIsNewCategory(false);
    setNewCategoryName('');
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
        className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-neutral-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                Ajouter une compétence acquise
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Enrichissez votre socle technique et votre profil professionnel.
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

          {/* Nom de la compétence */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Nom de la technologie ou compétence <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ex: Rust, Apache Kafka, Kubernetes, LangChain, Next.js 15..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Catégorie de rattachement
            </label>
            {!isNewCategory ? (
              <div className="space-y-2">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsNewCategory(true);
                    } else {
                      setSelectedCategoryId(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value="__new__">+ Créer une nouvelle catégorie personnalisée...</option>
                </select>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="ex: Intelligence Artificielle & LLMs, Cloud & Infra..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setIsNewCategory(false)}
                    className="px-3 py-2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                  >
                    Annuler
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Cette catégorie apparaîtra avec ses filtres et son bloc dédié.
                </p>
              </div>
            )}
          </div>

          {/* Niveau de maîtrise (1 à 5) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Niveau d'expertise ({level}/5)
              </label>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                {LEVEL_DESCRIPTIONS[level]}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    lvl <= level
                      ? 'bg-amber-400 text-neutral-950 shadow-xs'
                      : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Durée / Pratique */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Expérience ou date d'acquisition
            </label>
            <input
              type="text"
              placeholder="ex: Acquis en 2026, 1 an, 2+ ans..."
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
            />
          </div>

          {/* Contexte d'application / Highlights */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Contexte d'application & Réalisations concrètes
            </label>
            <textarea
              rows={3}
              placeholder="ex: Conception et déploiement d’architectures haute disponibilité, tests automatisés et monitoring..."
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              Visible sous la compétence et inclus dans le dossier recruteur PDF.
            </p>
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
              <span>Ajouter la compétence</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
