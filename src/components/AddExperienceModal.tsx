import React, { useState, useEffect } from 'react';
import { X, Briefcase, Plus, Check, AlertCircle } from 'lucide-react';
import { Experience } from '../types/portfolio';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExperience: (experience: Experience) => void;
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onAddExperience,
}) => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('2024 - Présent');
  const [type, setType] = useState<'CDI' | 'Freelance' | 'Conseil' | 'Stage' | string>('CDI');
  const [location, setLocation] = useState('Lomé · Hybride / Remote');
  const [summary, setSummary] = useState('');
  const [achievementsInput, setAchievementsInput] = useState('');
  const [technologiesInput, setTechnologiesInput] = useState('');
  const [metrics, setMetrics] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      setError('Veuillez préciser l’intitulé du poste ou rôle.');
      return;
    }
    if (!company.trim()) {
      setError('Veuillez préciser le nom de l’entreprise ou organisation.');
      return;
    }
    if (!period.trim()) {
      setError('Veuillez indiquer la période de l’expérience.');
      return;
    }

    // Parse achievements
    const achievementsList = achievementsInput
      .split('\n')
      .map((r) => r.replace(/^[-•*]\s*/, '').trim())
      .filter(Boolean);

    // Parse technologies
    const techList = technologiesInput
      .split(/[,;\n]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newExperience: Experience = {
      id: `custom-exp-${Date.now()}`,
      role: role.trim(),
      company: company.trim(),
      period: period.trim(),
      type,
      location: location.trim() || 'Télétravail / Sur site',
      summary: summary.trim() || `Intervention au poste de ${role.trim()} au sein de ${company.trim()}, avec pilotage technique et livraison continue.`,
      achievements: achievementsList.length > 0 ? achievementsList : [
        'Conception et livraison de fonctionnalités techniques critiques',
        'Optimisation des performances et amélioration de la résilience système'
      ],
      technologies: techList.length > 0 ? techList : ['Python', 'Architecture Logicielle', 'Cloud'],
      metrics: metrics.trim() || undefined,
      isCustom: true,
    };

    onAddExperience(newExperience);
    onClose();

    // Reset form
    setRole('');
    setCompany('');
    setPeriod('2024 - Présent');
    setType('CDI');
    setLocation('Lomé · Hybride / Remote');
    setSummary('');
    setAchievementsInput('');
    setTechnologiesInput('');
    setMetrics('');
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
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-neutral-950">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                Ajouter une expérience professionnelle
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Enrichissez votre parcours technique en entreprise, mission ou freelance.
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Poste / Rôle <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ex: Senior Full-Stack Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Entreprise / Organisation <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ex: TechCorp Innovations"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Période <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ex: 2024 - Présent"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Type de contrat
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              >
                <option value="CDI">CDI</option>
                <option value="Freelance">Freelance</option>
                <option value="Conseil">Conseil & Audit</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Localisation
              </label>
              <input
                type="text"
                placeholder="ex: Lomé · Télétravail"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Résumé de la mission
            </label>
            <textarea
              rows={2}
              placeholder="ex: Conception et maintenance d’architectures distribuées haut débit, coordination technique avec les équipes produit..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Réalisations & Faits marquants (une puce par ligne)
            </label>
            <textarea
              rows={3}
              placeholder="• Refonte de l’API backend avec gain de 40% sur le temps de latence&#10;• Déploiement d’un pipeline de détection d’anomalies en temps réel&#10;• Mise en place de l'automatisation CI/CD sur Docker"
              value={achievementsInput}
              onChange={(e) => setAchievementsInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Technologies & Outils (séparés par des virgules)
              </label>
              <input
                type="text"
                placeholder="ex: Python, FastAPI, Docker, PostgreSQL, Redis"
                value={technologiesInput}
                onChange={(e) => setTechnologiesInput(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Impact mesuré / Métrique (optionnel)
              </label>
              <input
                type="text"
                placeholder="ex: +45% de vélocité · 99.99% uptime"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
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
              <span>Ajouter l'expérience</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
