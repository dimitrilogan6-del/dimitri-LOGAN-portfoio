import React, { useState } from 'react';
import { UserProfile } from '../types/portfolio';
import { Mail, Phone, MapPin, Send, Check, Copy, Calendar, Clock, MessageSquare, Linkedin, Github } from 'lucide-react';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleType: 'CDI',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const meetingSlots = [
    { id: 'slot-1', day: 'Demain', time: '14:30', duration: '20 min', label: 'Échange découverte' },
    { id: 'slot-2', day: 'Jeudi', time: '10:00', duration: '30 min', label: 'Entretien technique' },
    { id: 'slot-3', day: 'Vendredi', time: '16:00', duration: '30 min', label: 'Discussion opportunité' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14 max-w-2xl">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
            Disponibilité & Prise de Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tracking-tight">
            Échangeons sur vos enjeux
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Vous avez un poste à pourvoir, un projet data/cloud à développer ou un audit de cybersécurité à mener ? Je réponds généralement sous 24 heures ouvrées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct coordinates & Meeting slot selector (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards with 1-click copy */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between shadow-xs dark:shadow-none">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Email</span>
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Copier l'adresse email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between shadow-xs dark:shadow-none">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Téléphone</span>
                    <a href={`tel:${profile.phone}`} className="text-sm font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-mono">
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(profile.phone, 'phone')}
                  className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Copier le numéro de téléphone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 flex items-center gap-3 shadow-xs dark:shadow-none">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">Localisation & Fuseau</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {profile.location} <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">(UTC+0)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Meeting Slot Simulator */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs dark:shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    Réserver un créneau rapide
                  </h4>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">Google Meet</span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Sélectionnez un créneau indicatif pour notre premier échange technique (audio ou visio).
              </p>

              <div className="space-y-2">
                {meetingSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot.id);
                        setFormData(prev => ({
                          ...prev,
                          message: prev.message || `Bonjour ${profile.name.split(' ')[0]},\n\nJe souhaiterais échanger lors du créneau indicatif : ${slot.day} à ${slot.time} (${slot.label}).\n\nBien cordialement.`
                        }));
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-400/10 text-neutral-900 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                        <span className="font-semibold text-neutral-900 dark:text-white">{slot.day} à {slot.time}</span>
                        <span className="text-neutral-500">· {slot.label}</span>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">{slot.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Professional networks */}
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-neutral-400" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-neutral-400" />
                <span>GitHub</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-none">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-300 dark:border-emerald-400/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display">
                    Message transmis avec succès
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Merci <strong className="text-neutral-900 dark:text-white">{formData.name}</strong>. Votre message concernant le rôle ({formData.roleType}) a bien été enregistré. Je reviens vers vous à l'adresse <span className="text-amber-600 dark:text-amber-400 font-medium">{formData.email}</span> dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', company: '', roleType: 'CDI', message: '' });
                      setSelectedSlot(null);
                    }}
                    className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Votre Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sophie Dubois"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Adresse Email professionnelle *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: s.dubois@entreprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Entreprise / Cabinet
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Nova Cloud Tech"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Type d’opportunité
                      </label>
                      <select
                        value={formData.roleType}
                        onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                      >
                        <option value="CDI">CDI (Lead Fullstack Python / DevSecOps)</option>
                        <option value="Freelance">Mission Freelance (TJM Data / Python)</option>
                        <option value="Conseil">Audit Cybersécurité & Pentest</option>
                        <option value="Autre">Autre prise de contact</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Message & Description du besoin *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Présentez brièvement le projet, l'équipe ou le contexte..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">
                      * Champs obligatoires · Données strictement confidentielles
                    </span>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Envoyer la demande</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
