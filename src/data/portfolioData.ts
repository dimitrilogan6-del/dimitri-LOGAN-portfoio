import { UserProfile, Experience, Education, SkillCategory, Project, ReverseCV } from '../types/portfolio';

export const initialProfile: UserProfile = {
  name: 'Logan Dimitri',
  title: 'Analyste Cybersécurité et Data Engineering',
  subTitle: 'Détection & Réponse aux incidents, Pipelines Data ETL/ELT & Automatisation par l’IA',
  email: 'dimitrilogan6@gmail.com',
  phone: '+228 93 23 52 04 / +228 98 43 69 19',
  location: 'Avenu, Lomé (Togo) · Disponible Télétravail & Hybride',
  availability: 'Disponible immédiatement pour missions & recrutements',
  yearsOfExperience: 3,
  bio: "Professionnel polyvalent certifié en cybersécurité et en Data, spécialisé en détection et réponse aux incidents, analyse des vulnérabilités et gestion de la relation client à distance. Expérimenté dans l'utilisation d'outils SIEM/SEM (Splunk, ELK, Wazuh), firewalls et CRM. Rigoureux, adaptable et orienté résultats, capable d'automatiser la détection via des solutions d'Intelligence Artificielle.",
  avatarUrl: '/src/assets/images/portrait_logan_real_1790800730088.jpg',
  linkedin: 'https://www.linkedin.com/in/dimitri-logan-481755378/',
  github: 'https://github.com/djimilog',
  website: 'https://www.linkedin.com/in/dimitri-logan-481755378/',
};

export const experiencesData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Ambassadeur International',
    company: 'IYC14 — La jeunesse et l’avenir de la gouvernance mondiale',
    location: '14e Conférence internationale de la jeunesse · New York (USA)',
    period: '2026 — 2027',
    type: 'Conseil',
    summary: 'Rôle d’ambassadeur international représentant la jeunesse pour l’avenir de la gouvernance mondiale, la diplomatie numérique et la sécurisation du cyberespace.',
    achievements: [
      'Plaidoyer pour une gouvernance technologique inclusive, éthique et résiliente face aux cybermenaces globales.',
      'Mobilisation et animation d’initiatives internationales pour la jeunesse axées sur la sécurité numérique.',
      'Participation aux tables rondes et contributions aux recommandations stratégiques pour les instances mondiales.'
    ],
    technologies: ['Gouvernance Mondiale', 'Cybergouvernance', 'Relations Internationales', 'Plaidoyer Numérique'],
    metrics: 'Ambassadeur officiel IYC14 (2026-2027)'
  },
  {
    id: 'exp-2',
    role: 'Délégué Virtuel',
    company: 'IYC14 — La jeunesse et l’avenir de la gouvernance mondiale',
    location: '14e Conférence internationale de la jeunesse · New York (USA) · En ligne',
    period: '22 — 25 Septembre 2026',
    type: 'Conseil',
    summary: 'Délégué virtuel aux sessions plénières et groupes de travail de haut niveau sur les défis contemporains de la jeunesse et des technologies.',
    achievements: [
      'Participation active aux débats sur la cybersécurité comme pilier de la gouvernance démocratique moderne.',
      'Collaboration multiculturelle avec des représentants et experts de plus de 40 pays.',
      'Restitution des feuilles de route opérationnelles pour la protection des droits numériques.'
    ],
    technologies: ['Conférences Internationales', 'Cybersécurité', 'Politiques Numériques', 'Diplomatie'],
    metrics: 'Représentation officielle en plénière'
  },
  {
    id: 'exp-3',
    role: 'Co-organisateur & Intervenant Cyber',
    company: 'Campagne #ZeroToxiqueEnLigne — OJCS-BENIN',
    location: 'Organisation des jeunes pour un cyberespace sécurisé · En ligne',
    period: '1er — 31 Août 2026',
    type: 'Conseil',
    summary: 'Campagne de sensibilisation à grande échelle menée en ligne pour l’hygiène numérique, la prévention des fraudes et la sécurisation des données.',
    achievements: [
      'Animation de webinaires et ateliers pratiques sur la détection des arnaques en ligne et du phishing.',
      'Sensibilisation du grand public et des jeunes aux règles fondamentales de protection des données privées.',
      'Élaboration de guides d’hygiène numérique et de bonnes pratiques de sécurisation des comptes.'
    ],
    technologies: ['Sensibilisation Cyber', 'Hygiène Numérique', 'Anti-Phishing', 'Protection des Données'],
    metrics: 'Sensibilisation de milliers d’utilisateurs en Afrique de l’Ouest'
  },
  {
    id: 'exp-4',
    role: 'Agent Recenseur (Module Thématique Café-Cacao)',
    company: 'Projet PHASAO',
    location: 'Préfecture de Kpélé (Togo)',
    period: 'Octobre — Novembre 2025',
    type: 'Mission',
    summary: 'Collecte et validation rigoureuse des données agricoles de terrain auprès des producteurs de la filière café-cacao.',
    achievements: [
      'Collecte et vérification de la cohérence des données agricoles selon un protocole strict et normé.',
      'Contrôle qualité systématique des formulaires et saisie conforme aux standards d’intégrité du projet.',
      'Respect rigoureux des procédures de sécurité des données, d’échantillonnage et des délais de restitution.'
    ],
    technologies: ['Collecte de données', 'Contrôle Qualité', 'Validation Statistique', 'Audit terrain'],
    metrics: '100% de conformité aux protocoles de collecte'
  },
  {
    id: 'exp-5',
    role: 'Agent Recenseur (Module de Base)',
    company: 'Projet PHASAO',
    location: 'Préfecture de Kpélé (Togo)',
    period: 'Novembre — Décembre 2024',
    type: 'Mission',
    summary: 'Réalisation d’enquêtes statistiques auprès des ménages agricoles et non agricoles pour l’actualisation des statistiques nationales.',
    achievements: [
      'Conduite d’entretiens structurés et recueil d’indicateurs socio-économiques fiables sur le terrain.',
      'Contrôle qualité des informations saisies et transmission sécurisée aux équipes centrales de traitement.',
      'Couverture intégrale des zones assignées avec conformité méthodologique stricte.'
    ],
    technologies: ['Enquêtes Statistiques', 'Data Quality Control', 'Agronomie & Données', 'Reporting Centralisé'],
    metrics: 'Couverture intégrale des zones échantillonnées'
  },
  {
    id: 'exp-6',
    role: 'Agent Enquêteur',
    company: 'CPC-Togo (Centrale des Producteurs de Céréales) / Ministère de l’Agriculture',
    location: 'Préfecture Avé-Zio (Togo)',
    period: 'Décembre 2022 — Janvier 2023',
    type: 'Mission',
    summary: 'Enquêtes sectorielles sur les besoins en mécanisation et systèmes d’irrigation pour le Ministère de l’Agriculture.',
    achievements: [
      'Diagnostic technique sur le terrain des équipements et besoins hydriques des exploitants céréaliers.',
      'Saisie, consolidation statistique et synthèse analytique des données recueillies.',
      'Restitution formelle des résultats stratégiques à l’équipe projet du ministère.'
    ],
    technologies: ['Enquêtes de terrain', 'Consolidation de données', 'Synthèse analytique', 'Restitution Ministère'],
    metrics: 'Rapport d’enquête validé par le Ministère de l’Agriculture'
  },
  {
    id: 'exp-7',
    role: 'Agent Recenseur',
    company: 'INSEED (5e Recensement Général de la Population et de l’Habitat — RGPH-5)',
    location: 'Baguida (Togo)',
    period: 'Octobre — Novembre 2022',
    type: 'Mission',
    summary: 'Participation active à l’opération nationale officielle de dénombrement démographique et d’habitat (RGPH-5).',
    achievements: [
      'Collecte numérique des données ménages et structures d’habitat sur tablettes dédiées.',
      'Contrôle qualité des informations recueillies en temps réel et correction des incohérences de données.',
      'Garantie du respect du secret statistique et de la déontologie nationale.'
    ],
    technologies: ['RGPH-5', 'Collecte Numérique', 'Assurance Qualité des Données', 'Tablettes CAPI'],
    metrics: 'Opération officielle d’envergure nationale'
  }
];

export const educationData: Education[] = [
  {
    id: 'edu-1',
    degree: 'Licence en Biologie Physiologie Animale (Fin de parcours)',
    institution: 'Faculté des Sciences, Université de Lomé',
    location: 'Lomé, Togo',
    year: '2026',
    details: 'Formation universitaire scientifique approfondie, modélisation biologique, rigueur de la démarche expérimentale et analyse des données quantitatives.',
    honors: 'Fin de parcours universitaire'
  },
  {
    id: 'edu-2',
    degree: 'Baccalauréat Série D (Mathématiques et Sciences de la Nature)',
    institution: 'Lycée Goudévé, Préfecture de Kpélé',
    location: 'Kpélé, Togo',
    year: 'Août 2018',
    details: 'Bases solides en mathématiques, raisonnement déductif, sciences physiques et démarche scientifique.',
    honors: 'Admis Série D'
  }
];

export const skillsCategories: SkillCategory[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersécurité, SOC & Analyse des Vulnérabilités',
    skills: [
      { name: 'Outils SIEM/SEM (Splunk, ELK, Wazuh)', level: 4, experienceYears: 'Certifié', highlights: 'Détection et réponse aux incidents, corrélation d’événements de sécurité, analyse approfondie de logs' },
      { name: 'Tests d’Intrusion (Pentesting) & Audit de Vulnérabilités', level: 4, experienceYears: 'Certifié Cisco', highlights: 'Scans de vulnérabilités, exploitation, remédiation technique, conformité OWASP Top 10' },
      { name: 'Réseaux & Sécurité Périmétrique', level: 4, experienceYears: 'Pratique pro', highlights: 'Protocoles TCP/IP, pare-feux (Firewalls), antivirus, VPN, chiffrement et gestion des accès (IAM)' },
      { name: 'Gouvernance, Risques & PSSI', level: 4, experienceYears: 'Pratique pro', highlights: 'Évaluation des risques informatiques, contribution à la PSSI, alignement RGPD et ISO 27001' },
      { name: 'Surveillance & Alerting en Temps Réel', level: 5, experienceYears: 'Pratique pro', highlights: 'Surveillance réseaux et systèmes, détection proactive des intrusions et rédaction de rapports d’incident' }
    ]
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering & Traitement de Données',
    skills: [
      { name: 'Chaînes ETL / ELT Fonctionnelles', level: 4, experienceYears: 'Togo AI Lab', highlights: 'Construction de pipelines de données robustes et proposition d’architectures cibles de production' },
      { name: 'Apache Airflow & Apache NiFi', level: 4, experienceYears: 'Formé AI Lab', highlights: 'Orchestration de flux de données, automatisation de tâches et intégration multi-sources' },
      { name: 'PostgreSQL & Modélisation de Données', level: 4, experienceYears: 'Pratique pro', highlights: 'Conception de schémas relationnels, requêtes optimisées et contrôle d’intégrité' },
      { name: 'Conteneurisation & Monitoring Kubernetes', level: 4, experienceYears: 'Formé', highlights: 'Déploiement sous Docker, bases Kubernetes et surveillance des services' },
      { name: 'Collecte & Contrôle Qualité de Données', level: 5, experienceYears: '3+ ans terrain', highlights: 'Protocoles d’enquêtes nationales (INSEED, PHASAO), apurement et validation statistique' }
    ]
  },
  {
    id: 'fullstack-python',
    name: 'Développement Full-Stack Python & IA',
    skills: [
      { name: 'Scripting & Automatisation Python', level: 5, experienceYears: 'GSI MEL Academy', highlights: 'Scripts d’automatisation, traitement de flux, parsing de logs et tooling de sécurité' },
      { name: 'Développement Web : Django & Angular', level: 4, experienceYears: 'Pratique', highlights: 'Architecture full-stack découplée, API backend Python Django et interface Angular moderne' },
      { name: 'HTML5, CSS3 & Intégration Web', level: 4, experienceYears: 'Pratique', highlights: 'Interfaces ergonomiques, responsive design et intégration de dashboards' },
      { name: 'IA & Machine Learning pour la Détection', level: 4, experienceYears: 'Nufia AI Camp', highlights: 'Modèles ML pour la détection d’anomalies et l’automatisation d’alertes de sécurité' },
      { name: 'Solutions d’Intelligence Artificielle Générative', level: 5, experienceYears: 'Certifié Nufia', highlights: 'Utilisation de l’IA dans la création de produits digitaux, d’expériences et d’outils d’analyse' }
    ]
  },
  {
    id: 'crm-teleservices',
    name: 'Téléservices, CRM & Relation Client',
    skills: [
      { name: 'Gestion de la Relation Client à Distance', level: 5, experienceYears: 'Certifié UCHK', highlights: 'Interaction client multicanal, rigueur d’écoute, fidélisation et traitement d’appels' },
      { name: 'Outils CRM & Suivi Client', level: 4, experienceYears: 'Certifié UCHK', highlights: 'Gestion des dossiers, suivi des tickets d’assistance et mise à jour des bases clients' },
      { name: 'Administration Systèmes & Support', level: 4, experienceYears: 'GSI MEL Academy', highlights: 'Administration Linux / Windows, assistance technique utilisateur et diagnostic rapide' },
      { name: 'Communication & Résolution de Problèmes', level: 5, experienceYears: 'Expérience terrain', highlights: 'Réactivité sous pression, esprit d’équipe, communication claire et pédagogie' }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'SIEM-AI Sentinel — Détection d’Anomalies & Corrélation de Logs',
    tagline: 'Plateforme de détection d’intrusions combinant Splunk, Wazuh et modèles de Machine Learning pour l’analyse proactive de logs',
    category: 'Full-Stack',
    image: '/src/assets/images/cyber_data_platform_1790777680669.jpg',
    featured: true,
    context: 'Projet de surveillance opérationnelle conçu pour corréler les événements de sécurité en temps réel et détecter les comportements anormaux sur les réseaux d’entreprise.',
    challenge: 'Filtrer le bruit de milliers de lignes de logs quotidiennes et automatiser la classification des alertes critiques sans faux positifs.',
    solution: 'Architecture couplant des agents Wazuh / Splunk avec un moteur d’analyse en Python utilisant des modèles de détection d’anomalies et transmission d’alertes.',
    results: [
      'Surveillance active des réseaux et systèmes en temps réel avec classification d’alertes automatisée.',
      'Génération de rapports d’incidents exploitables pour la remédiation et la conformité PSSI.',
      'Réduction significative du délai moyen d’investigation des événements suspects.'
    ],
    technologies: ['Wazuh', 'Splunk', 'Python', 'Machine Learning', 'Linux', 'Firewalls', 'SIEM'],
    githubUrl: 'https://github.com/djimilog/siem-ai-sentinel',
    metrics: 'Détection en temps réel · Alertes ML automatisées'
  },
  {
    id: 'proj-2',
    title: 'AgriData Pipeline — Ingestion & Contrôle Qualité de Données Terrain',
    tagline: 'Pipeline Data Engineering de collecte, validation et structuration de données d’enquêtes agricoles vers PostgreSQL',
    category: 'Cloud & API',
    image: '/src/assets/images/project_saas_platform_1790777032608.jpg',
    featured: true,
    context: 'Directement issu de l’expertise de terrain en enquêtes statistiques (PHASAO, INSEED), ce projet automatise le cycle de vie de la donnée agricole.',
    challenge: 'Nettoyer et réconcilier des données hétérogènes de recensement de producteurs avec garantie d’intégrité et traçabilité.',
    solution: 'Chaîne ETL orchestrée avec Apache Airflow et scripts Python, validant les données selon les règles métier avant stockage sous PostgreSQL.',
    results: [
      'Validation automatique de 100% des anomalies de saisie avant injection en base centrale.',
      'Production de tableaux de bord analytiques pour le pilotage des campagnes agricoles.',
      'Conception d’une architecture cible extensible pour de futurs modules sectoriels.'
    ],
    technologies: ['Python', 'PostgreSQL', 'Apache Airflow', 'ETL/ELT', 'Data Quality', 'Docker'],
    githubUrl: 'https://github.com/djimilog/agridata-pipeline',
    metrics: '100% données validées · Pipeline automatisé'
  },
  {
    id: 'proj-3',
    title: 'VulnAudit Framework — Évaluation de Sécurité & Conformité PSSI',
    tagline: 'Suite d’audit de vulnérabilités et de recommandations de sécurisation basée sur les standards ISO 27001 & RGPD',
    category: 'Open Source',
    image: '',
    featured: false,
    context: 'Outil de diagnostic de sécurité pour réaliser des scans de vulnérabilités, évaluer les risques applicatifs et rédiger des recommandations de sécurisation.',
    challenge: 'Fournir aux administrateurs systèmes un rapport d’audit clair et des préconisations de remédiation conformes aux politiques de sécurité PSSI.',
    solution: 'Framework Python orchestrant des scans de ports et vulnérabilités (Nmap, OpenVAS API) avec matrice d’impact et cartographie des risques.',
    results: [
      'Identification exhaustive des configurations réseau et faiblesses d’accès.',
      'Génération de rapports d’alerte et recommandations de durcissement (hardening).',
      'Alignement des pratiques sur les exigences de protection des données (RGPD / PSSI).'
    ],
    technologies: ['Python', 'Pentesting', 'Nmap', 'Audit Vulnérabilités', 'ISO 27001', 'RGPD'],
    githubUrl: 'https://github.com/djimilog/vulnaudit-framework',
    metrics: 'Conforme PSSI & ISO 27001 · Rapports automatisés'
  },
  {
    id: 'proj-4',
    title: 'Portal Django & Angular — Gestion & Relation Client Sécurisée',
    tagline: 'Application web full-stack associant la robustesse d’une API Django et l’ergonomie d’une interface Angular pour le support client',
    category: 'Full-Stack',
    image: '/src/assets/images/project_mobile_fintech_1790777046049.jpg',
    featured: false,
    context: 'Application métier combinant la gestion de la relation client à distance (CRM) et un espace sécurisé de suivi des requêtes d’assistance.',
    challenge: 'Assurer une authentification forte, une séparation stricte des rôles et une navigation fluide pour les télé-opérateurs.',
    solution: 'Architecture modulaire avec backend Python/Django REST API, base PostgreSQL et frontend Angular typé avec composants interactifs.',
    results: [
      'Gestion centralisée des interactions clients, tickets d’assistance et journalisation.',
      'Sécurisation des sessions utilisateurs avec protection contre les failles courantes.',
      'Interface intuitive adaptée au traitement rapide d’appels et de demandes d’assistance.'
    ],
    technologies: ['Python', 'Django', 'Angular', 'PostgreSQL', 'HTML5/CSS3', 'CRM'],
    githubUrl: 'https://github.com/djimilog/crm-portal-django-angular',
    metrics: 'Full-Stack Django + Angular · Support client sécurisé'
  }
];

export const certificationsData = [
  {
    title: 'Attestation Data Engineering',
    issuer: 'Togo AI SUMMER SCHOOL — Organisé par le TOGO AI LAB',
    date: '24 au 28 Août 2026',
    category: 'Data'
  },
  {
    title: 'Certificate Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: '7 Janvier 2026',
    category: 'Cybersécurité'
  },
  {
    title: 'Attestation d’Analyste en Cybersécurité',
    issuer: 'Université Numérique Cheikh Hamidou Kane (Sénégal)',
    date: 'Août 2025',
    category: 'Cybersécurité'
  },
  {
    title: 'Attestation Téléservices',
    issuer: 'Université Numérique Cheikh Hamidou Kane (Sénégal)',
    date: 'Octobre 2025',
    category: 'Relation Client'
  },
  {
    title: 'Certificat Nufia AI Camp (Utilisation de l’IA dans la création de produits)',
    issuer: 'Nufia AI Camp',
    date: 'Novembre 2025',
    category: 'Intelligence Artificielle'
  },
  {
    title: 'Certificat : Hacking, Python, Administration Système',
    issuer: 'GSI MEL Academy (Côte d’Ivoire)',
    date: 'Août 2023 – Fév. 2024',
    category: 'Cybersécurité & Systèmes'
  }
];

export const reverseCvData: ReverseCV = {
  targetRole: 'Analyste Cybersécurité / Data Engineer Junior-Intermédiaire / Consultant Sécurité & Data',
  idealTeamSize: 'Structure dynamique de 5 à 30 personnes favorisant la rigueur, l’apprentissage continu et l’innovation IA',
  preferredWorkMode: 'Télétravail (Full Remote) ou Hybride avec déplacements ciblés',
  salaryExpectation: {
    cdi: 'Rémunération compétitive selon le cadre de mission et localisation',
    freelanceTjm: 'Tarif journalier négociable selon l’envergure du projet'
  },
  availability: 'Disponible immédiatement pour missions de conseil, contrats et recrutements',
  preferredStack: [
    'Cybersécurité : Splunk, Wazuh, ELK, Firewalls, Pentesting éthique Cisco',
    'Data : PostgreSQL, Apache Airflow, NiFi, Pipelines ETL/ELT',
    'Développement : Python, Django, Angular, HTML/CSS',
    'Intelligence Artificielle : ML pour détection d’anomalies, IA générative',
    'Relation Client : Outils CRM, Téléservices, Enquêtes de terrain'
  ],
  avoidedTech: [
    'Infrastructures refusant les bonnes pratiques d’hygiène cyber de base',
    'Gestion de données sensibles sans sauvegarde ni chiffrement',
    'Environnements dépourvus de traçabilité des incidents ou de veille sécuritaire',
    'Pratiques de micro-management sans confiance mutuelle'
  ],
  culturalValues: [
    {
      title: 'Sécurité proactive & Résilience',
      description: 'Détecter les anomalies avant qu’elles ne deviennent des incidents majeurs, et sensibiliser activement les équipes.',
      importance: 'Critique'
    },
    {
      title: 'Intégrité & Rigueur de la Donnée',
      description: 'Une analyse de données fiable repose sur des protocoles de collecte rigoureux et des chaînes de validation éprouvées.',
      importance: 'Critique'
    },
    {
      title: 'Apprentissage continu & Curiosité',
      description: 'Veille permanente sur les menaces émergentes, les technologies Data et les opportunités offertes par l’IA.',
      importance: 'Très important'
    },
    {
      title: 'Esprit d’équipe & Orientation Solution',
      description: 'Communication fluide, réactivité sous pression et transmission bienveillante des savoirs.',
      importance: 'Très important'
    }
  ],
  greenFlags: [
    'Environnement encourageant la certification et la formation continue (Cisco, IA Lab...)',
    'Culture ouverte à l’automatisation des tâches récurrentes via scripts Python et IA',
    'Respect strict de la confidentialité et des normes de sécurité (RGPD, ISO 27001)',
    'Équipes soudées avec communication bienveillante et feedback constructif',
    'Flexibilité pour le travail à distance et valorisation des résultats concrets'
  ],
  redFlags: [
    'Négligence manifeste de la sécurité des identifiants et accès systèmes',
    'Traitement opaque des données personnelles ou non-respect des règles déontologiques',
    'Culture du blâme plutôt que de l’analyse d’incident post-mortem constructive',
    'Absence de documentation et de formation aux outils'
  ],
  questionsForRecruiter: [
    'Quels sont vos principaux défis actuels en matière de détection d’incidents de sécurité et de gestion de logs ?',
    'Comment vos équipes traitent-elles et automatisent-elles les flux de données et la qualité des pipelines ?',
    'Quelles opportunités d’évolution ou de montée en compétences (certifications, projets IA) proposez-vous ?',
    'Quels outils SIEM, CRM ou cloud utilisez-vous au quotidien ?'
  ]
};
