import React, { useRef } from 'react';
import { ArrowDownRight, Briefcase, Sparkles, MapPin, CheckCircle2, Download, Camera } from 'lucide-react';
import { UserProfile } from '../types/portfolio';

interface HeroProps {
  profile: UserProfile;
  onNavigate: (sectionId: string) => void;
  onUpdateAvatar?: (newUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onUpdateAvatar }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onUpdateAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section id="accueil" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold Typographic Hierarchy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability status line (clean unboxed text with typographic separator) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Disponible immédiatement</span>
              <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {profile.location}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-display text-balance leading-[1.08]">
                Sécuriser les systèmes & bâtir des chaînes de <span className="text-amber-500 dark:text-amber-400">données résilientes</span> avec l’IA.
              </h1>
              <p className="text-lg sm:text-xl font-normal text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed">
                Je suis <strong className="text-neutral-900 dark:text-white font-semibold">{profile.name}</strong>, {profile.title.toLowerCase()}. Certifié en cybersécurité et en ingénierie des données, j'interviens sur la surveillance SOC/SIEM, les audits de vulnérabilités et l'automatisation des pipelines ETL.
              </p>
            </div>

            {/* Bio summary */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('cv-recruteur')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-lg shadow-amber-400/10"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le CV (PDF Recruteur)</span>
              </button>

              <button
                onClick={() => onNavigate('projets')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-800 dark:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-lg transition-colors cursor-pointer shadow-xs dark:shadow-none"
              >
                <span>Découvrir les projets</span>
                <ArrowDownRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Prendre contact →
              </button>
            </div>

            {/* Adjacent Proof Metrics (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums">
                  07+
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Missions & Mandats
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400 tabular-nums">
                  06
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Certifications Cyber & Data
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums">
                  100%
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Qualité & Rigueur des données
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Frame with Profile & Key Specializations (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Outer decorative border frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-xl dark:shadow-2xl">
                
                {/* Image container: Pure, unmodified image display without filters */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} - Portrait professionnel`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fb = document.getElementById('portrait-fallback');
                      if (fb) fb.style.display = 'flex';
                    }}
                  />

                  {/* Optional quick upload button */}
                  {onUpdateAvatar && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-3 right-3 p-2 bg-neutral-900/70 hover:bg-neutral-900 text-white rounded-lg backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm flex items-center gap-1.5 text-xs"
                      title="Changer / Importer ma propre photo"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Changer</span>
                    </button>
                  )}

                  {/* Zero-broken-image policy fallback */}
                  <div
                    id="portrait-fallback"
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 p-6 text-center"
                  >
                    <Briefcase className="w-12 h-12 text-amber-500 dark:text-amber-400 mb-3" />
                    <span className="font-display font-bold text-neutral-900 dark:text-white text-lg">{profile.name}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{profile.title}</span>
                  </div>
                </div>

                {/* Sub-card: Info displayed below photo so image remains 100% visible and unmodified */}
                <div className="mt-3 p-3.5 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800/80 space-y-2 shadow-xs dark:shadow-none">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900 dark:text-white font-display text-sm">{profile.name}</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px] font-semibold">LOMÉ · GMT+0</span>
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-850">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>Disponible pour mission & CDI</span>
                    </div>
                    <button
                      onClick={() => onNavigate('cv-recruteur')}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-semibold cursor-pointer underline-offset-2 hover:underline text-xs"
                    >
                      Voir le CV →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
