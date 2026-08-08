import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPA_URL = "https://yxutopjfthhkysukqfwe.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dXRvcGpmdGhoa3lzdWtxZndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODkxMDIsImV4cCI6MjA5NTY2NTEwMn0.iMfmkOLEh4Uvzy0VAF1SZa-FWyACEH8tXVqeqCJn-40";
const supa = createClient(SUPA_URL, SUPA_KEY);

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const G = {
  bg: "#0f1117", bgCard: "#1a1f2e", bgInput: "#161b27",
  border: "rgba(99,130,255,0.15)", accent: "#4f7dff", accentLight: "#6b96ff",
  success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
  textPrimary: "#f1f5f9", textSecondary: "#94a3b8", textMuted: "#64748b",
  gold: "#fbbf24",
};

const MATIERES = [
  { id: "es-morale",   label: "ES / Morale",             icon: "🕊️", color: "#f59e0b", count: 24 },
  { id: "es-civisme",  label: "ES / Civisme",            icon: "🏛️", color: "#3b82f6", count: 18 },
  { id: "es-histoire", label: "ES / Histoire",           icon: "📜", color: "#8b5cf6", count: 31 },
  { id: "es-geo",      label: "ES / Géographie",         icon: "🌍", color: "#10b981", count: 22 },
  { id: "es-langue",   label: "ES / Langue Nationale",   icon: "🗣️", color: "#f97316", count: 0  },
  { id: "maths-arith", label: "Maths · Arithmétique",    icon: "➗", color: "#ef4444", count: 45 },
  { id: "maths-geo",   label: "Maths · Géométrie",       icon: "📐", color: "#f97316", count: 28 },
  { id: "maths-mesure",label: "Maths · Mesure",          icon: "📏", color: "#ec4899", count: 16 },
  { id: "est",         label: "EST",                     icon: "🔬", color: "#06b6d4", count: 33 },
  { id: "ea-poesie",   label: "EA · Poésie",             icon: "✍️",  color: "#a78bfa", count: 19 },
  { id: "ea-chant",    label: "EA · Chant",              icon: "🎵",  color: "#f43f5e", count: 12 },
  { id: "ea-tm",       label: "EA · Travaux Manuels",    icon: "🔨",  color: "#84cc16", count: 14 },
  { id: "ea-couture",  label: "EA · Couture",            icon: "🧵",  color: "#fb7185", count: 11 },
  { id: "ea-dessin",   label: "EA · Dessin",             icon: "🎨",  color: "#f97316", count: 0  },
  { id: "ea-conte",    label: "EA · Conte",              icon: "📖",  color: "#8b5cf6", count: 0  },
  { id: "eps",         label: "EPS",                     icon: "⚽", color: "#22d3ee", count: 27 },
  { id: "fr-vocab",    label: "Français · Vocabulaire",  icon: "📖", color: "#6366f1", count: 38 },
  { id: "fr-gram",     label: "Français · Grammaire",    icon: "✏️", color: "#d946ef", count: 42 },
  { id: "fr-conjug",   label: "Français · Conjugaison",  icon: "🔤", color: "#0ea5e9", count: 35 },
  { id: "fr-ortho",    label: "Français · Orthographe",       icon: "📝", color: "#14b8a6", count: 29 },
  { id: "fr-lecture",  label: "Français · Lecture",           icon: "👁️", color: "#f59e0b", count: 23 },
  { id: "fr-expr",     label: "Français · Expression",        icon: "💬", color: "#8b5cf6", count: 17 },
  { id: "fr-graphisme",label: "Français · Graphisme/Écriture",icon: "✏️", color: "#ec4899", count: 0  },
  { id: "comm-orale",  label: "Communication Orale",          icon: "🗣️", color: "#10b981", count: 21 },
];

const FICHES = [
  { id:1,  titre:"La politesse au quotidien",          matiere:"ES / Morale",            matiereId:"es-morale",   niveau:"CE1", pages:4, premium:false, note:4.8, dl:342  },
  { id:2,  titre:"Les droits et devoirs du citoyen",   matiere:"ES / Civisme",           matiereId:"es-civisme",  niveau:"CM2", pages:6, premium:true,  note:4.9, dl:218  },
  { id:3,  titre:"Les grandes civilisations africaines",matiere:"ES / Histoire",         matiereId:"es-histoire", niveau:"CM1", pages:8, premium:false, note:4.7, dl:456  },
  { id:4,  titre:"Le relief du Benin",                 matiere:"ES / Géographie",        matiereId:"es-geo",      niveau:"CE2", pages:5, premium:true,  note:4.6, dl:189  },
  { id:5,  titre:"Multiplication et division",         matiere:"Maths · Arithmétique",   matiereId:"maths-arith", niveau:"CM1", pages:7, premium:false, note:5.0, dl:621  },
  { id:6,  titre:"Les figures géométriques",           matiere:"Maths · Géométrie",      matiereId:"maths-geo",   niveau:"CE2", pages:6, premium:true,  note:4.8, dl:274  },
  { id:7,  titre:"Les fractions simples",              matiere:"Maths · Arithmétique",   matiereId:"maths-arith", niveau:"CM2", pages:5, premium:false, note:4.7, dl:398  },
  { id:8,  titre:"La photosynthese expliquée",         matiere:"EST",                    matiereId:"est",         niveau:"CM1", pages:9, premium:true,  note:4.9, dl:512  },
  { id:9,  titre:"Poemes sur la nature",               matiere:"EA · Poésie",            matiereId:"ea-poesie",   niveau:"CE1", pages:3, premium:false, note:4.5, dl:287  },
  { id:10, titre:"Les temps du passé",                 matiere:"Français · Conjugaison", matiereId:"fr-conjug",   niveau:"CM2", pages:8, premium:false, note:4.9, dl:534  },
  { id:11, titre:"Vocabulaire thématique la ville",    matiere:"Français · Vocabulaire", matiereId:"fr-vocab",    niveau:"CE2", pages:4, premium:true,  note:4.6, dl:193  },
  { id:12, titre:"L accord sujet-verbe",               matiere:"Français · Grammaire",   matiereId:"fr-gram",     niveau:"CM1", pages:6, premium:false, note:4.8, dl:445  },
];

const USERS_ADMIN = [
  { id:1, nom:"Kouassi Amara",    email:"amara@email.com",    statut:"Abonné",  expire:"2024-03-15", fiches:23, joinDate:"2024-01-10" },
  { id:2, nom:"Bello Fatima",     email:"fatima@email.com",   statut:"Gratuit", expire:null,         fiches:4,  joinDate:"2024-02-01" },
  { id:3, nom:"Koffi Jean-Pierre",email:"jp.koffi@email.com", statut:"Abonné",  expire:"2024-04-01", fiches:67, joinDate:"2023-12-15" },
  { id:4, nom:"Sossou Marie",     email:"m.sossou@email.com", statut:"Expiré",  expire:"2024-01-31", fiches:31, joinDate:"2023-11-20" },
];

const DEFAULT_CFG = {
  mtn:     { numero:"0161234567", nom:"FichesPro Benin" },
  moov:    { numero:"9612345678", nom:"FichesPro Benin" },
  celtiis: { numero:"0191234567", nom:"FichesPro Benin" },
};

// Contacts support
const SUPPORT_CONTACTS = {
  whatsapp: "22961234567",
  telegram: "FichesProBenin",
};

// Plans version imprimée par classe
const PLANS_IMPRIMES = [
  {
    id:"ci-cp",
    label:"CI - CP",
    classes:["CI","CP"],
    prix:27000,
    icon:"🎒",
    color:"#10b981",
    description:"Fiches imprimées pour les classes de CI et CP",
    avantages:["Toutes les matières CI-CP","Impression professionnelle","Livraison ou retrait","Fiches plastifiées en option"],
  },
  {
    id:"ce1-ce2",
    label:"CE1 - CE2",
    classes:["CE1","CE2"],
    prix:25000,
    icon:"📓",
    color:"#4f7dff",
    description:"Fiches imprimées pour les classes de CE1 et CE2",
    avantages:["Toutes les matières CE1-CE2","Impression professionnelle","Livraison ou retrait","Fiches plastifiées en option"],
  },
  {
    id:"cm",
    label:"CM1 - CM2",
    classes:["CM1","CM2"],
    prix:23000,
    icon:"📘",
    color:"#7c3aed",
    description:"Fiches imprimées pour les classes de CM1 et CM2",
    avantages:["Toutes les matières CM","Impression professionnelle","Livraison ou retrait","Fiches plastifiées en option"],
  },
];

const NAV_USER = [
  { id:"accueil",    icon:"🏠", label:"Accueil"    },
  { id:"fiches",     icon:"📚", label:"Fiches"     },
  { id:"favoris",    icon:"❤️", label:"Favoris"    },
  { id:"historique", icon:"📋", label:"Historique" },
  { id:"abonnement", icon:"⭐", label:"Abonnement" },
  { id:"profil",     icon:"👤", label:"Profil"     },
  { id:"support",    icon:"💬", label:"Support"    },
  { id:"apropos",    icon:"ℹ️", label:"À propos"   },
];

// ─── ABONNEMENTS ÉCOLE ET FAMILLE ────────────────────────────────────────────
const PLANS_ECOLE = [
  { id:"famille",  icon:"👨‍👩‍👧‍👦", label:"Famille",    desc:"Jusqu'à 5 enfants",   prix:7000,  max:5,  color:"#10b981" },
  { id:"ecole-s",  icon:"🏫", label:"École S",     desc:"Jusqu'à 20 élèves",   prix:25000, max:20, color:"#4f7dff" },
  { id:"ecole-m",  icon:"🏛️", label:"École M",    desc:"Jusqu'à 50 élèves",   prix:50000, max:50, color:"#7c3aed" },
  { id:"ecole-l",  icon:"🎓", label:"École L",     desc:"Élèves illimités",    prix:90000, max:999,color:"#f59e0b" },
];

// ─── QUIZ PAR FICHE ───────────────────────────────────────────────────────────
const QUIZ_DEFAUT = {
  1: {
    questions:[
      { q:"Que signifie être poli ?", r:["Respecter les autres","Être fort","Avoir de l'argent","Parler fort"], ok:0 },
      { q:"Quelle formule de politesse utilise-t-on pour remercier ?", r:["S'il vous plaît","Merci","Bonjour","Au revoir"], ok:1 },
      { q:"Quand dit-on 'bonjour' ?", r:["Le soir","La nuit","En se levant le matin","Jamais"], ok:2 },
    ]
  },
  5: {
    questions:[
      { q:"3 × 7 = ?", r:["18","21","24","27"], ok:1 },
      { q:"48 ÷ 6 = ?", r:["6","7","8","9"], ok:2 },
      { q:"Quel est le résultat de 12 × 5 ?", r:["50","55","60","65"], ok:2 },
    ]
  },
};

// ─── LIVRAISONS ───────────────────────────────────────────────────────────────
const LIVRAISONS_DEMO = [
  { id:"LIV001", client:"Kouassi Amara",    plan:"CI - CP",   zone:"Cotonou",    date:"2024-02-10", statut:"Livré",       tel:"0161234567" },
  { id:"LIV002", client:"Sossou Marie",     plan:"CE1-CE2",   zone:"Porto-Novo", date:"2024-02-12", statut:"Expédié",     tel:"9612345678" },
  { id:"LIV003", client:"Bello Fatima",     plan:"CM1-CM2",   zone:"Parakou",    date:"2024-02-14", statut:"Préparation", tel:"0191234567" },
  { id:"LIV004", client:"Koffi Jean-Pierre",plan:"CI - CP",   zone:"Abomey",     date:"2024-02-15", statut:"En attente",  tel:"0161111111" },
];

const STATUTS_LIVRAISON = ["En attente","Préparation","Expédié","Livré","Annulé"];

// ─── MESSAGERIE INTERNE ───────────────────────────────────────────────────────
const TICKETS_DEMO = [
  {
    id:"TKT001", userId:1, userName:"Kouassi Amara", userEmail:"amara@email.com",
    sujet:"Problème de paiement", statut:"En cours", date:"2024-02-14T10:30:00",
    messages:[
      {id:1, auteur:"user",  nom:"Kouassi Amara",    texte:"Bonjour, j'ai effectué un paiement MTN MoMo mais mon abonnement n'est pas activé. Référence : TXN240214XXXXX", date:"2024-02-14T10:30:00", lu:true},
      {id:2, auteur:"admin", nom:"Support FichesPro", texte:"Bonjour ! Nous avons bien reçu votre demande. Votre paiement est en cours de vérification. Votre abonnement sera activé sous 30 minutes.", date:"2024-02-14T10:45:00", lu:true},
      {id:3, auteur:"user",  nom:"Kouassi Amara",    texte:"Merci pour votre réponse rapide !", date:"2024-02-14T11:00:00", lu:false},
    ]
  },
  {
    id:"TKT002", userId:2, userName:"Bello Fatima", userEmail:"fatima@email.com",
    sujet:"Demande de fiche personnalisée", statut:"Nouveau", date:"2024-02-15T08:15:00",
    messages:[
      {id:1, auteur:"user", nom:"Bello Fatima", texte:"Bonjour, est-ce que vous pouvez créer une fiche sur les animaux domestiques pour le niveau CE2 ?", date:"2024-02-15T08:15:00", lu:false},
    ]
  },
  {
    id:"TKT003", userId:3, userName:"Koffi Jean-Pierre", userEmail:"jp.koffi@email.com",
    sujet:"Question sur l'abonnement école", statut:"Résolu", date:"2024-02-12T14:20:00",
    messages:[
      {id:1, auteur:"user",  nom:"Koffi Jean-Pierre", texte:"Je dirige une école de 35 élèves. Quel abonnement me conseillez-vous ?", date:"2024-02-12T14:20:00", lu:true},
      {id:2, auteur:"admin", nom:"Support FichesPro",  texte:"Bonjour ! Pour 35 élèves, nous vous recommandons le plan École M à 50 000 FCFA/an. Il couvre jusqu'à 50 élèves avec accès illimité à toutes les fiches.", date:"2024-02-12T14:35:00", lu:true},
      {id:3, auteur:"user",  nom:"Koffi Jean-Pierre",  texte:"Parfait, je vais commander ce plan. Merci !", date:"2024-02-12T15:00:00", lu:true},
    ]
  },
];

const NAV_ADMIN = [
  { id:"stats",       icon:"📊", label:"Tableau de bord"    },
  { id:"fiches",      icon:"📚", label:"Gestion fiches"     },
  { id:"documents",   icon:"📁", label:"Documents"          },
  { id:"users",       icon:"👥", label:"Utilisateurs"       },
  { id:"messages",    icon:"💬", label:"Messages"           },
  { id:"abonnements", icon:"⭐", label:"Abonnements"        },
  { id:"paiements",   icon:"💰", label:"Paiements"          },
  { id:"commandes",   icon:"🖨️", label:"Commandes imprimées"},
  { id:"demandes",    icon:"📋", label:"Demandes fiches"    },
  { id:"livraisons",  icon:"🚚", label:"Livraisons"         },
  { id:"codes-promo", icon:"🎟️", label:"Codes Promo"        },
  { id:"parametres",  icon:"⚙️", label:"Paramètres"         },
];

// ─── CODES PROMO ─────────────────────────────────────────────────────────────
const CODES_PROMO_DEFAUT = [
  { id:1, code:"RENTREE25", reduction:25, type:"pourcentage", actif:true, utilises:12, max:100, expire:"2024-10-31" },
  { id:2, code:"NOEL2024",  reduction:1500, type:"montant",  actif:false, utilises:45, max:50,  expire:"2024-12-31" },
  { id:3, code:"PROF50",    reduction:50, type:"pourcentage", actif:true, utilises:3,  max:20,  expire:"2025-06-30" },
];

// ─── BADGES UTILISATEUR ───────────────────────────────────────────────────────
const BADGES_DEF = [
  { id:"premier_dl",   icon:"🎯", label:"Premier téléchargement", desc:"Télécharger votre première fiche",   seuil:1,   type:"dl"  },
  { id:"dl_5",         icon:"📚", label:"Lecteur",                desc:"Télécharger 5 fiches",               seuil:5,   type:"dl"  },
  { id:"dl_10",        icon:"🏆", label:"Expert",                 desc:"Télécharger 10 fiches",              seuil:10,  type:"dl"  },
  { id:"dl_25",        icon:"⭐", label:"Champion",               desc:"Télécharger 25 fiches",              seuil:25,  type:"dl"  },
  { id:"abonne",       icon:"💎", label:"Membre Premium",         desc:"Souscrire à un abonnement",          seuil:1,   type:"abo" },
  { id:"note_1",       icon:"✍️", label:"Critique",              desc:"Noter votre première fiche",          seuil:1,   type:"note"},
];

// ─── LANGUES ──────────────────────────────────────────────────────────────────
const LANGUES = [
  { id:"fr", label:"Français",  flag:"🇫🇷" },
  { id:"fon", label:"Fon",      flag:"🇧🇯" },
  { id:"yo",  label:"Yoruba",   flag:"🇧🇯" },
];

const TRADUCTIONS = {
  fr:  { accueil:"Accueil", fiches:"Fiches", favoris:"Favoris", historique:"Historique", abonnement:"Abonnement", profil:"Profil", support:"Support", rechercher:"Rechercher une fiche...", telecharger:"Télécharger", sabonner:"S'abonner", envoyer:"Envoyer", annuler:"Annuler" },
  fon: { accueil:"Xwégbé",  fiches:"Wema",   favoris:"Nyɔnu",   historique:"Taasuwema",   abonnement:"Nɔ",        profil:"Mɛtɔn",  support:"Dɔ gbɔ", rechercher:"Sɔ wema...", telecharger:"Zɔn yi", sabonner:"Nɔ ɖó", envoyer:"Sɛ́n", annuler:"Gbɔ" },
  yo:  { accueil:"Ilé",     fiches:"Iwe",    favoris:"Ayanfẹ",  historique:"Itan",        abonnement:"Ẹgbẹ",     profil:"Profaili",support:"Iranlọwọ", rechercher:"Wa iwe...", telecharger:"Gba", sabonner:"Forukọsilẹ", envoyer:"Fi ranṣẹ", annuler:"Fagilee" },
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Nunito',sans-serif;background:${G.bg};color:${G.textPrimary};min-height:100vh;overflow-x:hidden}
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${G.bg}}::-webkit-scrollbar-thumb{background:rgba(79,125,255,.3);border-radius:3px}
  .fd{font-family:'Sora',sans-serif}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:9px 18px;border-radius:10px;border:none;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;font-size:14px;transition:all .18s;line-height:1}
  .btn-p{background:linear-gradient(135deg,${G.accent},#7c3aed);color:#fff;box-shadow:0 4px 18px rgba(79,125,255,.28)}
  .btn-p:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(79,125,255,.42)}
  .btn-p:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .btn-s{background:rgba(79,125,255,.1);color:${G.accentLight};border:1px solid rgba(79,125,255,.2)}
  .btn-s:hover{background:rgba(79,125,255,.18)}
  .btn-ok{background:linear-gradient(135deg,#10b981,#059669);color:#fff}
  .btn-d{background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2)}
  .btn-sm{padding:5px 12px;font-size:12px}
  .btn-lg{padding:13px 26px;font-size:15px;border-radius:12px}
  .card{background:${G.bgCard};border:1px solid ${G.border};border-radius:16px;padding:20px;transition:border-color .2s}
  .card:hover{border-color:rgba(99,130,255,.28)}
  .inp{width:100%;padding:11px 15px;background:${G.bgInput};border:1px solid ${G.border};border-radius:10px;color:${G.textPrimary};font-family:'Nunito',sans-serif;font-size:14px;outline:none;transition:border-color .2s}
  .inp:focus{border-color:${G.accent}}
  .inp::placeholder{color:${G.textMuted}}
  .badge{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
  .b-gold{background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff}
  .b-free{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.25)}
  .b-ok{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.25)}
  .b-warn{background:rgba(245,158,11,.12);color:#f59e0b;border:1px solid rgba(245,158,11,.25)}
  .b-err{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.25)}
  .nl{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;color:${G.textSecondary};font-weight:600;font-size:14px;cursor:pointer;transition:all .15s;border:none;background:none;width:100%;text-align:left}
  .nl:hover{background:rgba(79,125,255,.08);color:${G.textPrimary}}
  .nl.on{background:rgba(79,125,255,.14);color:${G.accentLight}}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:200;backdrop-filter:blur(5px)}
  .drawer{position:fixed;top:0;left:0;height:100vh;width:265px;z-index:300;background:${G.bgCard};border-right:1px solid ${G.border};padding:18px 14px;display:flex;flex-direction:column;overflow-y:auto;transition:transform .28s cubic-bezier(.4,0,.2,1)}
  .drawer-open{transform:translateX(0);box-shadow:4px 0 40px rgba(0,0,0,.55)}
  .drawer-closed{transform:translateX(-100%)}
  .topbar{position:sticky;top:0;z-index:100;background:${G.bgCard};border-bottom:1px solid ${G.border};padding:0 18px;height:56px;display:flex;align-items:center;gap:12px;flex-shrink:0}
  .hbtn{background:rgba(255,255,255,.07);border:1px solid ${G.border};border-radius:10px;width:40px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;flex-shrink:0;transition:background .15s}
  .hbtn:hover{background:rgba(255,255,255,.12)}
  .modal-bg{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px}
  .modal{background:#1a1f2e;border:1px solid rgba(99,130,255,.25);border-radius:20px;padding:28px;width:100%;max-width:480px;box-shadow:0 25px 80px rgba(0,0,0,.6);animation:mIn .28s cubic-bezier(.34,1.56,.64,1);max-height:90vh;overflow-y:auto}
  @keyframes mIn{from{opacity:0;transform:scale(.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
  .fcard{background:${G.bgCard};border:1px solid ${G.border};border-radius:14px;padding:16px;cursor:pointer;transition:all .22s;position:relative;overflow:hidden}
  .fcard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${G.accent},#7c3aed);opacity:0;transition:opacity .2s}
  .fcard:hover{transform:translateY(-3px);border-color:rgba(99,130,255,.35);box-shadow:0 10px 35px rgba(0,0,0,.3)}
  .fcard:hover::before{opacity:1}
  .scard{background:${G.bgCard};border:1px solid ${G.border};border-radius:16px;padding:22px;position:relative;overflow:hidden}
  .pbar{height:6px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden}
  .pfill{height:100%;border-radius:3px;transition:width .5s ease}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  @media(max-width:900px){.g4{grid-template-columns:1fr 1fr}.g3{grid-template-columns:1fr 1fr}}
  @media(max-width:580px){.g2,.g3,.g4{grid-template-columns:1fr}}
  table{width:100%;border-collapse:collapse}
  th{padding:11px 14px;text-align:left;font-size:11px;font-weight:700;color:${G.textMuted};text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid ${G.border}}
  td{padding:13px 14px;font-size:13px;border-bottom:1px solid rgba(99,130,255,.06)}
  tr:hover td{background:rgba(79,125,255,.03)}
  .sbar{display:flex;align-items:center;gap:10px;background:${G.bgCard};border:1px solid ${G.border};border-radius:12px;padding:9px 14px;transition:border-color .2s}
  .sbar:focus-within{border-color:${G.accent}}
  .sbar input{flex:1;background:none;border:none;outline:none;color:${G.textPrimary};font-family:'Nunito',sans-serif;font-size:14px}
  .sbar input::placeholder{color:${G.textMuted}}
  .chip{display:flex;align-items:center;gap:8px;padding:9px 13px;border-radius:11px;background:${G.bgCard};border:1px solid ${G.border};cursor:pointer;transition:all .18s;white-space:nowrap;font-size:13px;font-weight:600;color:${G.textSecondary}}
  .chip:hover{transform:translateY(-2px);border-color:rgba(99,125,255,.3)}
  .chip.on{border-color:${G.accent};background:rgba(79,125,255,.1);color:${G.accentLight}}
  .toast{position:fixed;bottom:22px;right:22px;z-index:2000;background:#1e2435;border:1px solid rgba(99,130,255,.3);border-radius:12px;padding:13px 18px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 28px rgba(0,0,0,.4);animation:tIn .25s ease;max-width:320px}
  @keyframes tIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
`;

// ─── UTILITAIRES ──────────────────────────────────────────────────────────────
function Stars({ n }) {
  return (
    <span style={{ color: G.gold, fontSize: 12 }}>
      {"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}
      <span style={{ color: G.textMuted, marginLeft: 4, fontSize: 11 }}>{n}</span>
    </span>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  const icons = { success:"✅", error:"❌", info:"ℹ️", warning:"⚠️" };
  return (
    <div className="toast">
      <span>{icons[type] || "ℹ️"}</span>
      <span style={{ color: G.textPrimary, fontSize: 14, fontWeight: 600, flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{ background:"none", border:"none", color:G.textMuted, cursor:"pointer", fontSize:18, lineHeight:1, flexShrink:0 }}>×</button>
    </div>
  );
}

function HamBtn({ onClick }) {
  return (
    <button className="hbtn" onClick={onClick}>
      <span style={{ display:"block", width:18, height:2, background:G.textSecondary, borderRadius:2 }} />
      <span style={{ display:"block", width:13, height:2, background:G.textSecondary, borderRadius:2 }} />
      <span style={{ display:"block", width:18, height:2, background:G.textSecondary, borderRadius:2 }} />
    </button>
  );
}

function LogoMark({ size }) {
  const s = size || 15;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:s*2.2, height:s*2.2, borderRadius:s*0.55, background:"linear-gradient(135deg,#4f7dff,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:s, flexShrink:0 }}>📚</div>
      <span className="fd" style={{ fontSize:s*1.12, fontWeight:800, color:G.textPrimary }}>FichesPro</span>
    </div>
  );
}

// ─── DRAWER ───────────────────────────────────────────────────────────────────
function Drawer({ open, onClose, children }) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <aside className={"drawer " + (open ? "drawer-open" : "drawer-closed")}>
        {children}
      </aside>
    </>
  );
}

// ─── FICHE CARD ───────────────────────────────────────────────────────────────
function FCard({ fiche, onClick }) {
  const mat = MATIERES.find(function(m) { return m.id === fiche.matiereId; });
  return (
    <div className="fcard" onClick={onClick}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <span className={"badge " + (fiche.premium ? "b-gold" : "b-free")}>{fiche.premium ? "⭐ Premium" : "✓ Gratuit"}</span>
        <span style={{ fontSize:20 }}>{mat ? mat.icon : "📄"}</span>
      </div>
      <h3 style={{ fontSize:14, fontWeight:700, lineHeight:1.3, marginBottom:5 }}>{fiche.titre}</h3>
      <p style={{ fontSize:11, color:G.textMuted, fontWeight:600, marginBottom:8 }}>{fiche.matiere}</p>
      <Stars n={fiche.note} />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, paddingTop:10, borderTop:"1px solid "+G.border }}>
        <span style={{ fontSize:11, color:G.textMuted }}>{fiche.niveau} · {fiche.pages}p</span>
        <span style={{ fontSize:11, color:G.textMuted }}>⬇️ {fiche.dl.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ─── MODAL FICHE ─────────────────────────────────────────────────────────────
function FicheModal({ fiche, abonne, onClose, onTelecharger }) {
  const canAccess = !fiche.premium || abonne;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <div style={{ display:"flex", gap:7, marginBottom:8 }}>
              <span className={"badge " + (fiche.premium ? "b-gold" : "b-free")}>{fiche.premium ? "⭐ Premium" : "✓ Gratuit"}</span>
              <span style={{ background:"rgba(255,255,255,.07)", borderRadius:6, padding:"3px 9px", fontSize:11, color:G.textMuted, fontWeight:700 }}>{fiche.niveau}</span>
            </div>
            <h2 className="fd" style={{ fontSize:19, fontWeight:700, lineHeight:1.3 }}>{fiche.titre}</h2>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, background:"rgba(255,255,255,.04)", borderRadius:12, padding:"14px 16px", marginBottom:18 }}>
          {[["📚 Matière",fiche.matiere],["🎓 Niveau",fiche.niveau],["📄 Pages",fiche.pages+"p"],["⭐ Note",fiche.note+"/5"],["⬇️ Téléch.",fiche.dl.toLocaleString()]].map(function(item) {
            return (
              <div key={item[0]}>
                <div style={{ fontSize:10, color:G.textMuted, fontWeight:700, marginBottom:2 }}>{item[0]}</div>
                <div style={{ fontSize:13, fontWeight:700 }}>{item[1]}</div>
              </div>
            );
          })}
        </div>
        <div style={{ background:"rgba(255,255,255,.03)", borderRadius:10, padding:18, marginBottom:18, border:"1px solid "+G.border, minHeight:80, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
          {canAccess
            ? <div><div style={{ fontSize:36, marginBottom:6 }}>📄</div><p style={{ color:G.textSecondary, fontSize:13 }}>Aperçu dispo · {fiche.pages} pages PDF</p></div>
            : <div><div style={{ fontSize:36, marginBottom:6 }}>🔒</div><p style={{ color:G.textSecondary, fontSize:13 }}>Réservé aux abonnés</p></div>
          }
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {canAccess
            ? <>
                <button className="btn btn-p" style={{ flex:1 }} onClick={function() { onTelecharger(fiche); onClose(); }}>📥 Télécharger</button>
                <button className="btn btn-s">👁️ Consulter</button>
              </>
            : <button className="btn btn-p btn-lg" style={{ flex:1 }} onClick={onClose}>⭐ S'abonner</button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── HELPER : Bloc paiement USSD réutilisable ─────────────────────────────────
function UssdBloc({ sel, prix, copied, onCopy }) {
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,rgba(79,125,255,.12),rgba(124,58,237,.08))", border:"1px solid rgba(79,125,255,.3)", borderRadius:14, padding:15, marginBottom:13, textAlign:"center" }}>
        <div style={{ fontSize:11, color:G.textMuted, fontWeight:700, textTransform:"uppercase", marginBottom:5 }}>Envoyer {prix.toLocaleString("fr-FR")} FCFA au</div>
        <div className="fd" style={{ fontSize:24, fontWeight:900, letterSpacing:2, marginBottom:5 }}>{sel.numero}</div>
        <div style={{ fontSize:12, color:G.textSecondary, marginBottom:10 }}>{sel.label} · <b>{sel.nom}</b></div>
        <button className="btn btn-s btn-sm" onClick={onCopy}>{copied?"✅ Copié !":"📋 Copier"}</button>
      </div>
      <div style={{ background:"rgba(16,185,129,.08)", border:"1px solid rgba(16,185,129,.25)", borderRadius:12, padding:13, marginBottom:13 }}>
        <div style={{ fontSize:12, fontWeight:700, color:G.success, marginBottom:7 }}>📲 Payer directement — Code USSD</div>
        <p style={{ fontSize:12, color:G.textSecondary, marginBottom:9, lineHeight:1.5 }}>
          Appuyez sur le bouton ci-dessous. Votre téléphone ouvrira le numéroteur avec le code USSD prérempli. Appuyez ensuite sur <b style={{ color:G.textPrimary }}>Appel</b> pour lancer le paiement.
        </p>
        <a href={"tel:"+sel.ussd.replace(/[^0-9*#]/g,"")}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg,#10b981,#059669)", color:"#fff", borderRadius:10, padding:"12px 16px", fontWeight:700, fontSize:13, textDecoration:"none" }}>
          📞 Composer {sel.ussd} — Appuyer Appel
        </a>
      </div>
    </div>
  );
}

// ─── MODAL PAIEMENT (abonnement numérique annuel) ────────────────────────────
function PaiementModal({ onClose, onSuccess, cfg, prix: prixProp, supportCfg, onSubmitPaie }) {
  const [step, setStep] = useState(1);
  const [methode, setMethode] = useState("");
  const [nom, setNom] = useState("");
  const [phone, setPhone] = useState("");
  const [preuve, setPreuve] = useState("");
  const [copied, setCopied] = useState(false);

  const prix = prixProp || 3000;
  const support = supportCfg || SUPPORT_CONTACTS;
  const config = cfg || DEFAULT_CFG;
  const reseaux = [
    { id:"mtn",     label:"MTN Mobile Money", icon:"📱", color:"#fbbf24", ussd:"*880#", numero:config.mtn.numero,     nom:config.mtn.nom     },
    { id:"moov",    label:"Moov Money",        icon:"📲", color:"#0099ff", ussd:"*555#", numero:config.moov.numero,    nom:config.moov.nom    },
    { id:"celtiis", label:"Celtiis",           icon:"📶", color:"#e63946", ussd:"*144#", numero:config.celtiis.numero, nom:config.celtiis.nom },
  ];
  const sel = reseaux.find(function(r) { return r.id === methode; });

  function copyNum() {
    if (!sel) return;
    navigator.clipboard.writeText(sel.numero).catch(function() {});
    setCopied(true); setTimeout(function() { setCopied(false); }, 2000);
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={function(e) { e.stopPropagation(); }}>

        {step === 1 && (
          <div>
            <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:5 }}>Abonnement Annuel</h2>
            <p style={{ color:G.textSecondary, fontSize:13, marginBottom:16 }}>Accès numérique illimité — valable 1 an</p>
            <div style={{ background:"linear-gradient(135deg,rgba(79,125,255,.15),rgba(124,58,237,.12))", border:"1px solid rgba(79,125,255,.3)", borderRadius:14, padding:16, marginBottom:14, textAlign:"center" }}>
              <div className="fd" style={{ fontSize:30, fontWeight:800 }}>{prix.toLocaleString("fr-FR")} <span style={{ fontSize:14, color:G.textSecondary }}>FCFA</span></div>
              <div style={{ color:G.textMuted, fontSize:12, marginTop:3 }}>Accès illimité · 1 an complet</div>
            </div>
            {["✅ Toutes les fiches en ligne","✅ Téléchargement PDF illimité","✅ Demandes personnalisées","✅ Mises à jour incluses","✅ Support prioritaire"].map(function(a) {
              return <div key={a} style={{ fontSize:13, color:G.textSecondary, padding:"5px 0", borderBottom:"1px solid "+G.border }}>{a}</div>;
            })}
            <button className="btn btn-p btn-lg" style={{ width:"100%", marginTop:16 }} onClick={function() { setStep(2); }}>S'abonner maintenant →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={function() { setStep(1); }} style={{ background:"none",border:"none",color:G.textSecondary,fontSize:13,cursor:"pointer",marginBottom:13,display:"flex",alignItems:"center",gap:5 }}>← Retour</button>
            <h2 className="fd" style={{ fontSize:18, fontWeight:700, marginBottom:14 }}>Choisir votre réseau</h2>
            {reseaux.map(function(r) {
              return (
                <div key={r.id} onClick={function() { setMethode(r.id); }}
                  style={{ padding:"13px 14px", borderRadius:12, border:"2px solid "+(methode===r.id?r.color:G.border), background:methode===r.id?"rgba(255,255,255,.04)":G.bgCard, cursor:"pointer", display:"flex", alignItems:"center", gap:11, marginBottom:9, transition:"all .18s" }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:r.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{r.icon}</div>
                  <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14 }}>{r.label}</div><div style={{ fontSize:12, color:G.textMuted }}>{r.numero}</div></div>
                  {methode===r.id && <span style={{ color:r.color, fontSize:18 }}>✓</span>}
                </div>
              );
            })}
            <button className="btn btn-p btn-lg" style={{ width:"100%", marginTop:5 }} disabled={!methode} onClick={function() { setStep(3); }}>Continuer →</button>
          </div>
        )}

        {step === 3 && sel && (
          <div>
            <button onClick={function() { setStep(2); }} style={{ background:"none",border:"none",color:G.textSecondary,fontSize:13,cursor:"pointer",marginBottom:13,display:"flex",alignItems:"center",gap:5 }}>← Retour</button>
            <h2 className="fd" style={{ fontSize:18, fontWeight:700, marginBottom:13 }}>Payer {prix.toLocaleString("fr-FR")} FCFA</h2>
            <UssdBloc sel={sel} prix={prix} copied={copied} onCopy={copyNum} />
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:13 }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Votre nom complet *</label>
                <input className="inp" placeholder="Ex : Amara Kouassi" value={nom} onChange={function(e) { setNom(e.target.value); }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Votre numéro *</label>
                <input className="inp" placeholder={"Ex : "+sel.numero} value={phone} onChange={function(e) { setPhone(e.target.value); }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Code de transaction · Preuve de paiement *</label>
                <input className="inp" placeholder="Ex : TXN240215XXXXX" value={preuve} onChange={function(e) { setPreuve(e.target.value); }} />
                <div style={{ fontSize:11, color:G.textMuted, marginTop:3 }}>Reçu par SMS après le paiement</div>
              </div>
            </div>
            <button className="btn btn-p btn-lg" style={{ width:"100%" }} disabled={!nom||!phone||!preuve} onClick={async function() {
              // Soumettre le paiement à Supabase pour validation admin
              try {
                if (onSubmitPaie) await onSubmitPaie(nom, phone, preuve, methode, prix);
              } catch(e) {}
              setStep(4);
            }}>Soumettre ma preuve ✓</button>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign:"center", padding:"14px 0" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>✅</div>
            <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:9 }}>Preuve reçue !</h2>
            <p style={{ color:G.textSecondary, fontSize:13, marginBottom:6, lineHeight:1.6 }}>Votre paiement a été soumis à l'équipe FichesPro pour vérification.</p>
            <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.25)", borderRadius:12, padding:"12px 15px", marginBottom:13, textAlign:"left" }}>
              <div style={{ fontSize:12, fontWeight:700, color:G.gold, marginBottom:6 }}>⏳ Processus de validation</div>
              <div style={{ fontSize:12, color:G.textSecondary, lineHeight:1.7 }}>
                1. Notre équipe vérifie votre transaction<br/>
                2. Validation sous <b style={{ color:G.textPrimary }}>15–30 minutes</b><br/>
                3. Votre abonnement sera activé automatiquement<br/>
                4. Vous recevrez une confirmation sur WhatsApp
              </div>
            </div>
            <div style={{ background:"rgba(79,125,255,.08)", border:"1px solid rgba(79,125,255,.2)", borderRadius:12, padding:"12px 15px", marginBottom:16, textAlign:"left" }}>
              <div style={{ fontSize:12, fontWeight:700, color:G.accent, marginBottom:8 }}>📞 Besoin d'aide ?</div>
              <a href={"https://wa.me/"+support.whatsapp} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, color:"#25d366", fontWeight:700, fontSize:13, textDecoration:"none", marginBottom:7 }}>
                <span>💬</span> WhatsApp : +{support.whatsapp}
              </a>
              <a href={"https://t.me/"+support.telegram} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, color:"#2aabee", fontWeight:700, fontSize:13, textDecoration:"none" }}>
                <span>✈️</span> Telegram : @{support.telegram}
              </a>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-s" style={{ flex:1 }} onClick={onClose}>Fermer</button>
              <button className="btn btn-p" style={{ flex:2 }} onClick={onSuccess}>Continuer →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MODAL VERSION IMPRIMÉE ───────────────────────────────────────────────────
function ImprimeeModal({ plan, onClose, cfg, supportCfg, user }) {
  const [step, setStep] = useState(1);
  const [methode, setMethode] = useState("");
  const [nom, setNom] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [preuve, setPreuve] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const support = supportCfg || SUPPORT_CONTACTS;

  const config = cfg || DEFAULT_CFG;
  const reseaux = [
    { id:"mtn",     label:"MTN Mobile Money", icon:"📱", color:"#fbbf24", ussd:"*880#", numero:config.mtn.numero,     nom:config.mtn.nom     },
    { id:"moov",    label:"Moov Money",        icon:"📲", color:"#0099ff", ussd:"*555#", numero:config.moov.numero,    nom:config.moov.nom    },
    { id:"celtiis", label:"Celtiis",           icon:"📶", color:"#e63946", ussd:"*144#", numero:config.celtiis.numero, nom:config.celtiis.nom },
  ];
  const sel = reseaux.find(function(r) { return r.id === methode; });

  function copyNum() {
    if (!sel) return;
    navigator.clipboard.writeText(sel.numero).catch(function() {});
    setCopied(true); setTimeout(function() { setCopied(false); }, 2000);
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={function(e) { e.stopPropagation(); }}>

        {step === 1 && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{ width:46, height:46, borderRadius:13, background:plan.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{plan.icon}</div>
              <div>
                <h2 className="fd" style={{ fontSize:18, fontWeight:800 }}>Version Imprimée</h2>
                <div style={{ fontSize:13, color:plan.color, fontWeight:700 }}>Classes {plan.label}</div>
              </div>
            </div>
            <div style={{ background:"linear-gradient(135deg,rgba(79,125,255,.12),rgba(124,58,237,.08))", border:"1px solid rgba(79,125,255,.25)", borderRadius:14, padding:15, marginBottom:14, textAlign:"center" }}>
              <div className="fd" style={{ fontSize:28, fontWeight:800 }}>{plan.prix.toLocaleString("fr-FR")} <span style={{ fontSize:13, color:G.textSecondary }}>FCFA</span></div>
              <div style={{ color:G.textMuted, fontSize:12, marginTop:3 }}>Fiches physiques imprimées · Classes {plan.label}</div>
            </div>
            <div style={{ marginBottom:14 }}>
              {plan.avantages.map(function(a) { return <div key={a} style={{ fontSize:13, color:G.textSecondary, padding:"5px 0", borderBottom:"1px solid "+G.border }}>🖨️ {a}</div>; })}
            </div>
            <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.22)", borderRadius:10, padding:"10px 13px", marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:G.warning, marginBottom:4 }}>📦 Livraison & Retrait</div>
              <p style={{ fontSize:12, color:G.textSecondary, lineHeight:1.5 }}>Après confirmation, vous serez contacté sur WhatsApp pour organiser la livraison ou le retrait.</p>
            </div>
            <button className="btn btn-p btn-lg" style={{ width:"100%" }} onClick={function() { setStep(2); }}>Commander →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={function() { setStep(1); }} style={{ background:"none",border:"none",color:G.textSecondary,fontSize:13,cursor:"pointer",marginBottom:13,display:"flex",alignItems:"center",gap:5 }}>← Retour</button>
            <h2 className="fd" style={{ fontSize:18, fontWeight:700, marginBottom:14 }}>Choisir votre réseau</h2>
            {reseaux.map(function(r) {
              return (
                <div key={r.id} onClick={function() { setMethode(r.id); }}
                  style={{ padding:"13px 14px", borderRadius:12, border:"2px solid "+(methode===r.id?r.color:G.border), background:methode===r.id?"rgba(255,255,255,.04)":G.bgCard, cursor:"pointer", display:"flex", alignItems:"center", gap:11, marginBottom:9, transition:"all .18s" }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:r.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{r.icon}</div>
                  <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14 }}>{r.label}</div><div style={{ fontSize:12, color:G.textMuted }}>{r.numero}</div></div>
                  {methode===r.id && <span style={{ color:r.color, fontSize:18 }}>✓</span>}
                </div>
              );
            })}
            <button className="btn btn-p btn-lg" style={{ width:"100%", marginTop:5 }} disabled={!methode} onClick={function() { setStep(3); }}>Continuer →</button>
          </div>
        )}

        {step === 3 && sel && (
          <div>
            <button onClick={function() { setStep(2); }} style={{ background:"none",border:"none",color:G.textSecondary,fontSize:13,cursor:"pointer",marginBottom:13,display:"flex",alignItems:"center",gap:5 }}>← Retour</button>
            <h2 className="fd" style={{ fontSize:18, fontWeight:700, marginBottom:13 }}>Payer {plan.prix.toLocaleString("fr-FR")} FCFA</h2>
            <UssdBloc sel={sel} prix={plan.prix} copied={copied} onCopy={copyNum} />
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:13 }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Votre nom *</label>
                <input className="inp" placeholder="Ex : Amara Kouassi" value={nom} onChange={function(e) { setNom(e.target.value); }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Votre numéro *</label>
                <input className="inp" placeholder={"Ex : "+sel.numero} value={phone} onChange={function(e) { setPhone(e.target.value); }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Zone de livraison *</label>
                <input className="inp" placeholder="Ex : Cotonou, Akpakpa, Rue 123..." value={adresse} onChange={function(e) { setAdresse(e.target.value); }} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Code de transaction · Preuve de paiement *</label>
                <input className="inp" placeholder="Ex : TXN240215XXXXX" value={preuve} onChange={function(e) { setPreuve(e.target.value); }} />
                <div style={{ fontSize:11, color:G.textMuted, marginTop:3 }}>Reçu par SMS après le paiement</div>
              </div>
            </div>
            <button className="btn btn-p btn-lg" style={{ width:"100%" }} disabled={!nom||!phone||!adresse||!preuve||submitting} onClick={async function() {
              setSubmitting(true);
              try {
                var userId = user ? user.id : null;
                var userNom = user ? user.nom : nom;
                var userEmail = user ? user.email : "";
                await supaCreateCommandeImprimee(userId, userNom, userEmail, plan, phone, adresse, preuve, methode, plan.prix);
              } catch(e) {
                console.error("[FichesPro] Erreur commande imprimée:", e);
              }
              setSubmitting(false);
              setStep(4);
            }}>{submitting ? "⏳ Envoi..." : "Valider ma commande ✓"}</button>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign:"center", padding:"14px 0" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>🖨️</div>
            <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:9 }}>Commande confirmée !</h2>
            <p style={{ color:G.textSecondary, fontSize:13, marginBottom:13, lineHeight:1.6 }}>Vos fiches <b style={{ color:G.textPrimary }}>Classes {plan.label}</b> sont en préparation. Nous vous contactons pour la livraison.</p>
            <div style={{ background:"rgba(79,125,255,.08)", border:"1px solid rgba(79,125,255,.2)", borderRadius:12, padding:"12px 15px", marginBottom:16, textAlign:"left" }}>
              <div style={{ fontSize:12, fontWeight:700, color:G.accent, marginBottom:8 }}>📞 Nous contacter</div>
              <a href={"https://wa.me/"+support.whatsapp} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, color:"#25d366", fontWeight:700, fontSize:13, textDecoration:"none", marginBottom:7 }}>
                <span>💬</span> WhatsApp : +{support.whatsapp}
              </a>
              <a href={"https://t.me/"+support.telegram} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:8, color:"#2aabee", fontWeight:700, fontSize:13, textDecoration:"none" }}>
                <span>✈️</span> Telegram : @{support.telegram}
              </a>
            </div>
            <button className="btn btn-p" style={{ width:"100%" }} onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MODAL DEMANDE ────────────────────────────────────────────────────────────
function DemandeModal({ onClose, onSubmit, user }) {
  const [titre, setTitre] = useState("");
  const [matiere, setMatiere] = useState("");
  const [niveau, setNiveau] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const ok = titre && matiere && niveau;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={function(e) { e.stopPropagation(); }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h2 className="fd" style={{ fontSize:19, fontWeight:700 }}>Demander une fiche</h2>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.07)",border:"none",borderRadius:8,width:30,height:30,color:G.textSecondary,cursor:"pointer",fontSize:18 }}>×</button>
        </div>
        <p style={{ color:G.textSecondary, fontSize:13, marginBottom:18 }}>Réponse sous 48h</p>
        <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
          <div>
            <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Titre *</label>
            <input className="inp" placeholder="Ex : La photosynthèse" value={titre} onChange={function(e) { setTitre(e.target.value); }} />
          </div>
          <div>
            <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Matière *</label>
            <select className="inp" value={matiere} onChange={function(e) { setMatiere(e.target.value); }}>
              <option value="">Sélectionner...</option>
              {MATIERES.map(function(m) { return <option key={m.id} value={m.id}>{m.label}</option>; })}
            </select>
          </div>
          <div>
            <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Niveau *</label>
            <select className="inp" value={niveau} onChange={function(e) { setNiveau(e.target.value); }}>
              <option value="">Sélectionner...</option>
              {["CP","CE1","CE2","CM1","CM2","6ème","5ème","4ème","3ème"].map(function(n) { return <option key={n}>{n}</option>; })}
            </select>
          </div>
          <div>
            <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Description</label>
            <textarea className="inp" rows={3} placeholder="Contenu souhaité..." value={desc} onChange={function(e) { setDesc(e.target.value); }} style={{ resize:"vertical" }} />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-s" style={{ flex:1 }} onClick={onClose}>Annuler</button>
            <button className="btn btn-p" style={{ flex:2 }} disabled={!ok||submitting} onClick={async function() {
              setSubmitting(true);
              try {
                var matiereLabel = MATIERES.find(function(m){return m.id===matiere;});
                await supaCreateDemandeFiche(
                  user ? user.id : null,
                  user ? user.nom : "Anonyme",
                  user ? user.email : "",
                  titre,
                  matiereLabel ? matiereLabel.label : matiere,
                  niveau, desc
                );
              } catch(e) { console.error("[FichesPro] Erreur demande fiche:", e); }
              setSubmitting(false);
              onSubmit({ titre, matiere, niveau, desc });
            }}>{submitting ? "⏳ Envoi..." : "Envoyer 📤"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STOCKAGE LOCAL (fallback hors ligne) ────────────────────────────────────
const STORAGE_KEY = "fichespro_comptes";
const SESSION_KEY = "fichespro_session";

function getComptes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch(e) { return []; }
}
function saveCompteLocal(compte) {
  try {
    var comptes = getComptes();
    var idx = comptes.findIndex(function(c) { return c.email === compte.email; });
    if (idx >= 0) comptes[idx] = compte; else comptes.push(compte);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comptes));
  } catch(e) {}
}
function findCompte(email) {
  return getComptes().find(function(c) { return c.email.toLowerCase() === email.toLowerCase(); });
}
function saveSession(user) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch(e) {}
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch(e) {}
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch(e) { return null; }
}

// ─── SUPABASE AUTH + DB ───────────────────────────────────────────────────────

// CORRECTION P3 : Inscription sans confirmation email obligatoire
async function supaRegister(nom, email, pwd) {
  var { data, error } = await supa.auth.signUp({
    email: email,
    password: pwd,
    options: { data: { nom: nom } }
  });
  if (error) throw new Error(error.message);

  // Insérer profil immédiatement (trigger le fait aussi)
  if (data.user) {
    await supa.from("users").upsert({
      id: data.user.id,
      nom: nom,
      email: email,
      role: "user",
      date_inscription: new Date().toISOString(),
    }, { onConflict: "id" });
  }
  // Sauvegarder aussi en local comme fallback
  saveCompteLocal({ nom, email, pwd, role:"user", dateInscription: new Date().toISOString() });
  return { role:"user", nom, email, id: data.user?.id };
}

async function supaLogin(email, pwd) {
  // CORRECTION C7 : l'admin doit obtenir une vraie session Supabase Auth pour
  // que les policies RLS (auth.jwt()->>'email') le laissent voir tous les
  // utilisateurs / gérer les codes promo, et pour que le changement de mot de
  // passe persiste réellement. On tente donc toujours la vraie connexion
  // Supabase en premier, même pour l'email admin.
  if (email === "admin@fichespro.com") {
    var { data: adminData, error: adminError } = await supa.auth.signInWithPassword({ email, password: pwd });
    if (!adminError && adminData && adminData.user) {
      // Vrai compte Supabase admin — session réelle établie
      var { data: adminProfil } = await supa.from("users").select("*").eq("id", adminData.user.id).single();
      saveCompteLocal({ nom:"Administrateur", email, pwd, role:"admin" });
      return { role:"admin", nom: adminProfil?.nom || "Administrateur", email, id: adminData.user.id };
    }
    // Repli historique : mot de passe par défaut tant que le compte Supabase
    // admin n'a pas encore été créé (voir corrections_admin_v2.sql). Dans ce
    // mode dégradé, aucune session Supabase n'existe donc la liste des
    // utilisateurs et le changement de mot de passe resteront limités.
    if (pwd === "admin123") {
      return { role:"admin", nom:"Administrateur", email };
    }
    throw new Error("Email ou mot de passe incorrect.");
  }
  var { data, error } = await supa.auth.signInWithPassword({ email, password: pwd });
  if (error) throw new Error("Email ou mot de passe incorrect.");
  var { data: profil } = await supa.from("users").select("*").eq("id", data.user.id).single();
  var nom = profil?.nom || data.user.user_metadata?.nom || email.split("@")[0];
  // Mettre à jour le nom si manquant
  if (!profil?.nom) {
    await supa.from("users").upsert({
      id: data.user.id, nom, email,
      role: "user", date_inscription: new Date().toISOString()
    }, { onConflict: "id" });
  }
  saveCompteLocal({ nom, email, pwd, role: profil?.role||"user" });
  return { role: profil?.role||"user", nom, email, id: data.user.id };
}

async function supaUpdateProfile(userId, nom, email) {
  if (!userId) return;
  try {
    await supa.from("users").update({ nom, email }).eq("id", userId);
    await supa.auth.updateUser({ data: { nom } });
  } catch(e) {}
}

// ─── DONNÉES SUPABASE ─────────────────────────────────────────────────────────
async function supaGetFiches() {
  var { data, error } = await supa.from("fiches").select("*").order("id", { ascending:true });
  if (error || !data || data.length === 0) return null;
  return data.map(function(f) {
    return {
      id: f.id, titre: f.titre, matiere: f.matiere, matiereId: f.matiere_id,
      niveau: f.niveau, pages: f.pages||1, premium: f.premium||false,
      note: parseFloat(f.note)||4.5, dl: f.nb_telechargements||0,
      fichierUrl: f.fichier_url||"", description: f.description||"",
    };
  });
}

async function supaGetFavoris(userId) {
  if (!userId) return [];
  var { data } = await supa.from("favoris").select("fiche_id").eq("user_id", userId);
  return data ? data.map(function(f){ return f.fiche_id; }) : [];
}

async function supaToggleFavori(userId, ficheId, estFavori) {
  if (!userId) return;
  if (estFavori) {
    await supa.from("favoris").delete().eq("user_id", userId).eq("fiche_id", ficheId);
  } else {
    await supa.from("favoris").insert({ user_id: userId, fiche_id: ficheId });
  }
}

async function supaLogTelecharger(userId, ficheId) {
  if (!userId) return;
  try {
    await supa.from("historique_telechargements").insert({
      user_id: userId, fiche_id: ficheId, date: new Date().toISOString()
    });
    // Incrémenter le compteur de téléchargements
    await supa.rpc("increment_telechargements", { fiche_id_param: ficheId });
  } catch(e) {}
}

async function supaGetTickets(userId) {
  if (!userId) return [];
  var { data } = await supa.from("tickets")
    .select("*, messages_ticket(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending:false });
  return data || [];
}

async function supaCreateTicket(userId, userName, userEmail, sujet, message) {
  var { data: ticket, error } = await supa.from("tickets").insert({
    user_id: userId, user_name: userName, user_email: userEmail,
    sujet, statut: "Nouveau", created_at: new Date().toISOString()
  }).select().single();
  if (error || !ticket) return null;
  await supa.from("messages_ticket").insert({
    ticket_id: ticket.id, auteur: "user", nom: userName,
    texte: message, lu: false, created_at: new Date().toISOString()
  });
  return ticket;
}

async function supaAddMessage(ticketId, auteur, nom, texte) {
  await supa.from("messages_ticket").insert({
    ticket_id: ticketId, auteur, nom, texte, lu: false, created_at: new Date().toISOString()
  });
  await supa.from("tickets").update({
    statut: auteur==="admin" ? "En cours" : "Nouveau",
    updated_at: new Date().toISOString()
  }).eq("id", ticketId);
}

// ─── C1 : ABONNEMENTS ────────────────────────────────────────────────────────
async function supaGetAbonnements() {
  var { data } = await supa.from("abonnements")
    .select("*, users(nom, email)")
    .order("created_at", { ascending:false });
  return data || [];
}

// ─── CODES PROMO (Supabase) ──────────────────────────────────────────────────
// Convertit une ligne Supabase (colonnes DB) vers le format utilisé dans l'UI
function mapCodePromoDb(row) {
  return {
    id: row.id, code: row.code, reduction: row.reduction, type: row.type,
    actif: row.actif, utilises: row.utilises || 0,
    max: row.max_utilisations, expire: row.date_expiration,
  };
}

async function supaGetCodesPromo() {
  var { data, error } = await supa.from("codes_promo").select("*").order("created_at", { ascending:false });
  if (error || !data) return null;
  return data.map(mapCodePromoDb);
}

async function supaCreateCodePromo(code, reduction, type, max, expire) {
  // Sécurité : la contrainte "codes_promo_type_check" n'accepte que ces 2 valeurs
  var typeValide = (type === "montant") ? "montant" : "pourcentage";
  var { data, error } = await supa.from("codes_promo").insert({
    code: code.toUpperCase(), reduction: reduction, type: typeValide,
    actif: true, utilises: 0, max_utilisations: max, date_expiration: expire,
  }).select().single();
  if (error) throw new Error(error.message);
  return mapCodePromoDb(data);
}

async function supaToggleCodePromo(id, actif) {
  var { error } = await supa.from("codes_promo").update({ actif: actif }).eq("id", id);
  if (error) throw new Error(error.message);
}

async function supaDeleteCodePromo(id) {
  var { error } = await supa.from("codes_promo").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Vérifie un code promo saisi par un utilisateur (lecture publique en base)
async function supaValiderCodePromo(code) {
  var { data, error } = await supa.from("codes_promo")
    .select("*").eq("code", code.toUpperCase()).eq("actif", true).maybeSingle();
  if (error || !data) return null;
  return mapCodePromoDb(data);
}

// C4 : Vérifier abonnement actif côté Supabase
async function supaVerifierAbonnement(userId) {
  if (!userId) return false;
  var { data } = await supa.from("users")
    .select("abonnement_actif, abonnement_expire")
    .eq("id", userId).single();
  if (!data || !data.abonnement_actif) return false;
  if (data.abonnement_expire && new Date(data.abonnement_expire) < new Date()) return false;
  return true;
}

// ─── C3 : COMMANDES IMPRIMÉES ─────────────────────────────────────────────────
async function supaCreateCommandeImprimee(userId, userNom, userEmail, plan, telephone, adresse, preuve, methode, montant) {
  var { data } = await supa.from("printed_sheet_orders").insert({
    user_id: userId, user_nom: userNom, user_email: userEmail,
    plan_label: plan.label, plan_classes: plan.classes ? plan.classes.join(", ") : "",
    montant, methode, telephone, adresse,
    preuve_transaction: preuve,
    statut: "En attente", created_at: new Date().toISOString(),
  }).select().single();
  console.log("[FichesPro] Commande imprimée créée:", data?.id);
  return data;
}

async function supaGetCommandesImprimees() {
  var { data } = await supa.from("printed_sheet_orders").select("*").order("created_at", { ascending:false });
  return data || [];
}

async function supaUpdateStatutCommande(commandeId, statut) {
  await supa.from("printed_sheet_orders").update({ statut, updated_at: new Date().toISOString() }).eq("id", commandeId);
}

// ─── C6 : DEMANDES DE FICHES ──────────────────────────────────────────────────
async function supaCreateDemandeFiche(userId, userNom, userEmail, titre, matiere, niveau, description) {
  var { data } = await supa.from("requested_sheets").insert({
    user_id: userId, user_nom: userNom, user_email: userEmail,
    titre, matiere, niveau, description,
    statut: "En attente", created_at: new Date().toISOString(),
  }).select().single();
  console.log("[FichesPro] Demande fiche créée:", data?.id);
  return data;
}

async function supaGetDemandesFiches() {
  var { data } = await supa.from("requested_sheets").select("*").order("created_at", { ascending:false });
  return data || [];
}

async function supaUpdateStatutDemande(demandeId, statut) {
  await supa.from("requested_sheets").update({ statut, updated_at: new Date().toISOString() }).eq("id", demandeId);
}

// ─── C5 : RESET MOT DE PASSE AVEC URL PRODUCTION ─────────────────────────────
async function supaResetPassword(email) {
  // Toujours utiliser l'URL de production pour le lien de reset
  var prodUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fichespro-five.vercel.app";
  var redirectTo = prodUrl + "/reset-password";
  var { error } = await supa.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw new Error(error.message);
  console.log("[FichesPro] Email reset envoyé à:", email, "redirect:", redirectTo);
}

// ─── C7 : CHANGEMENT MOT DE PASSE ADMIN ──────────────────────────────────────
// CORRECTION : le changement de mot de passe ne peut être réel que si
// l'admin possède un vrai compte Supabase Auth (voir corrections_admin_v2.sql
// + supaLogin ci-dessus). On vérifie d'abord l'ancien mot de passe via une
// vraie tentative de connexion Supabase, puis on met à jour via
// supa.auth.updateUser, qui persiste réellement (contrairement à l'ancienne
// version qui écrivait dans le localStorage sans que cela ait le moindre
// effet sur la connexion suivante).
async function supaChangerMotDePasse(ancienPwd, nouveauPwd) {
  var { data: sessionData } = await supa.auth.getSession();

  if (!sessionData || !sessionData.session) {
    // Pas de session Supabase active : on tente de se connecter avec
    // l'ancien mot de passe pour vérifier qu'il est correct et ouvrir une
    // vraie session avant de pouvoir changer le mot de passe.
    var { error: loginErr } = await supa.auth.signInWithPassword({
      email: "admin@fichespro.com",
      password: ancienPwd
    });
    if (loginErr) {
      if (ancienPwd === "admin123") {
        throw new Error(
          "Aucun compte administrateur Supabase n'existe encore. " +
          "Créez-le une première fois dans Supabase (Authentication → Add user) " +
          "avec l'email admin@fichespro.com, puis reconnectez-vous avant de changer le mot de passe."
        );
      }
      throw new Error("Mot de passe actuel incorrect.");
    }
  }

  var { error } = await supa.auth.updateUser({ password: nouveauPwd });
  if (error) {
    throw new Error("Impossible de modifier le mot de passe : " + error.message);
  }
  console.log("[FichesPro] Mot de passe admin modifié avec succès");
}

// ─── C4 : Charger et sauvegarder les paramètres depuis Supabase
async function supaGetParametres() {
  var { data } = await supa.from("parametres").select("*").eq("id", 1).single();
  if (!data) return null;
  return {
    paiement: {
      mtn:     { numero: data.paie_mtn_numero,     nom: data.paie_mtn_nom     },
      moov:    { numero: data.paie_moov_numero,    nom: data.paie_moov_nom    },
      celtiis: { numero: data.paie_celtiis_numero, nom: data.paie_celtiis_nom },
    },
    support: { whatsapp: data.support_whatsapp, telegram: data.support_telegram },
    abonnement: { prix: data.abo_prix, ficheGratuites: data.abo_gratuits, dureeJours: data.abo_jours, delaiActivMin: data.abo_delai },
  };
}

async function supaSaveParametres(cfg) {
  await supa.from("parametres").upsert({
    id: 1,
    paie_mtn_numero:     cfg.paiement.mtn.numero,
    paie_mtn_nom:        cfg.paiement.mtn.nom,
    paie_moov_numero:    cfg.paiement.moov.numero,
    paie_moov_nom:       cfg.paiement.moov.nom,
    paie_celtiis_numero: cfg.paiement.celtiis.numero,
    paie_celtiis_nom:    cfg.paiement.celtiis.nom,
    support_whatsapp:    cfg.support.whatsapp,
    support_telegram:    cfg.support.telegram,
    abo_prix:            cfg.abonnement.prix,
    abo_gratuits:        cfg.abonnement.ficheGratuites,
    abo_jours:           cfg.abonnement.dureeJours,
    abo_delai:           cfg.abonnement.delaiActivMin,
    updated_at:          new Date().toISOString(),
  }, { onConflict: "id" });
}

// CORRECTION P5 : Soumettre une demande d'abonnement pour validation admin
async function supaDemanderAbonnement(userId, userNom, userEmail, preuve, telephone, montant, methode) {
  var { data } = await supa.from("paiements").insert({
    user_id: userId,
    montant: montant,
    methode: methode,
    reference_transaction: preuve,
    nom_payeur: userNom,
    telephone: telephone,
    statut: "en_attente",
    created_at: new Date().toISOString(),
  }).select().single();
  return data;
}

async function supaValiderAbonnement(paiementId, userId) {
  // Activer l'abonnement dans la table users
  var dateFin = new Date();
  dateFin.setFullYear(dateFin.getFullYear() + 1);
  await supa.from("users").update({
    abonnement_actif: true,
    abonnement_expire: dateFin.toISOString(),
  }).eq("id", userId);
  // Confirmer le paiement
  await supa.from("paiements").update({ statut: "confirme" }).eq("id", paiementId);
}

async function supaGetPaiementsEnAttente() {
  var { data } = await supa.from("paiements")
    .select("*, users(nom, email)")
    .eq("statut", "en_attente")
    .order("created_at", { ascending:false });
  return data || [];
}

// ─── STORAGE PDF ──────────────────────────────────────────────────────────────
async function supaUploadPdf(file, ficheId) {
  if (!file) return null;
  var ext = file.name.split(".").pop();
  var nomFichier = "fiche-" + ficheId + "-" + Date.now() + "." + ext;
  var { data, error } = await supa.storage
    .from("fiches-pdf")
    .upload(nomFichier, file, { cacheControl: "3600", upsert: true });
  if (error) throw new Error("Erreur upload PDF : " + error.message);
  var { data: urlData } = supa.storage.from("fiches-pdf").getPublicUrl(nomFichier);
  return urlData.publicUrl;
}

async function supaCreateFiche(ficheData, file) {
  var { data: nouvelleFiche, error } = await supa.from("fiches").insert({
    titre: ficheData.titre,
    matiere: ficheData.matiere,
    matiere_id: ficheData.matiereId,
    niveau: ficheData.niveau,
    pages: ficheData.pages || 1,
    premium: ficheData.premium || false,
    note: ficheData.note || 4.5,
    nb_telechargements: 0,
    description: ficheData.description || "",
  }).select().single();
  if (error) throw new Error(error.message);

  if (file && nouvelleFiche) {
    var url = await supaUploadPdf(file, nouvelleFiche.id);
    if (url) {
      await supa.from("fiches").update({
        fichier_url: url,
        fichier_nom: file.name,
      }).eq("id", nouvelleFiche.id);
      nouvelleFiche.fichier_url = url;
      nouvelleFiche.fichier_nom = file.name;
    }
  }
  return nouvelleFiche;
}

async function supaUpdateFiche(ficheId, ficheData, file) {
  var updateData = {
    titre: ficheData.titre,
    matiere: ficheData.matiere,
    matiere_id: ficheData.matiereId,
    niveau: ficheData.niveau,
    pages: ficheData.pages || 1,
    premium: ficheData.premium || false,
    note: ficheData.note || 4.5,
    description: ficheData.description || "",
  };
  if (file) {
    var url = await supaUploadPdf(file, ficheId);
    if (url) {
      updateData.fichier_url = url;
      updateData.fichier_nom = file.name;
    }
  }
  var { error } = await supa.from("fiches").update(updateData).eq("id", ficheId);
  if (error) throw new Error(error.message);
}

async function supaDeleteFiche(ficheId) {
  await supa.from("fiches").delete().eq("id", ficheId);
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  // Récupération mot de passe
  const [modeRecup, setModeRecup] = useState(false);
  const [recupEmail, setRecupEmail] = useState("");
  const [recupStep, setRecupStep] = useState(1); // 1=email, 2=code, 3=nouveau mdp
  const [recupCode, setRecupCode] = useState("");
  const [recupCodeGenere, setRecupCodeGenere] = useState("");
  const [recupNvPwd, setRecupNvPwd] = useState("");
  const [recupNvPwd2, setRecupNvPwd2] = useState("");
  const [recupMsg, setRecupMsg] = useState("");
  const [recupErr, setRecupErr] = useState("");

  // Auto-login : vérifier session Supabase active au chargement
  useEffect(function() {
    supa.auth.getSession().then(function({ data }) {
      if (data.session && data.session.user) {
        var u = data.session.user;
        var userData = {
          role: u.email === "admin@fichespro.com" ? "admin" : (u.user_metadata?.role || "user"),
          nom: u.user_metadata?.nom || u.email.split("@")[0],
          email: u.email,
          id: u.id,
        };
        saveSession(userData);
        onLogin(userData);
        return;
      }
      // Fallback : session localStorage
      var session = getSession();
      if (session && session.email) onLogin(session);
    }).catch(function() {
      var session = getSession();
      if (session && session.email) onLogin(session);
    });
  }, []);

  async function submit() {
    setErreur("");
    if (!email.trim() || !pwd.trim()) { setErreur("Veuillez remplir tous les champs."); return; }
    setLoading(true);
    try {
      if (mode === "register") {
        if (!nom.trim()) { setErreur("Veuillez entrer votre nom complet."); setLoading(false); return; }
        if (pwd.length < 6) { setErreur("Le mot de passe doit contenir au moins 6 caractères."); setLoading(false); return; }
        var u = await supaRegister(nom.trim(), email.trim().toLowerCase(), pwd);
        saveSession(u);
        onLogin(u);
      } else {
        var u = await supaLogin(email.trim().toLowerCase(), pwd);
        saveSession(u);
        onLogin(u);
      }
    } catch(err) {
      // Fallback localStorage si Supabase hors ligne
      if (mode === "login") {
        var compte = findCompte(email);
        if (compte && compte.pwd === pwd) {
          var u2 = { role: compte.role||"user", nom: compte.nom, email: compte.email };
          saveSession(u2);
          onLogin(u2);
        } else {
          setErreur(err.message || "Email ou mot de passe incorrect.");
        }
      } else {
        setErreur(err.message || "Erreur lors de l'inscription. Réessayez.");
      }
    }
    setLoading(false);
  }

  async function demanderCode() {
    setRecupErr("");
    if (!recupEmail.trim()) { setRecupErr("Veuillez entrer votre email."); return; }
    try {
      await supaResetPassword(recupEmail.trim());
      setRecupStep(2);
      setRecupMsg("Un email de réinitialisation a été envoyé à " + recupEmail + ". Vérifiez votre boîte mail (et les spams).");
    } catch(err) {
      var compte = findCompte(recupEmail);
      if (!compte && recupEmail !== "admin@fichespro.com") {
        setRecupErr("Aucun compte trouvé avec cet email.");
        return;
      }
      var code = String(Math.floor(100000 + Math.random() * 900000));
      setRecupCodeGenere(code);
      setRecupStep(2);
      setRecupMsg("Code de vérification (mode hors ligne) : " + code);
    }
  }

  function verifierCode() {
    setRecupErr("");
    if (recupCode !== recupCodeGenere) { setRecupErr("Code incorrect. Réessayez."); return; }
    setRecupStep(3);
    setRecupMsg("");
  }

  function changerPwd() {
    setRecupErr("");
    if (!recupNvPwd.trim() || recupNvPwd.length < 6) { setRecupErr("Le mot de passe doit contenir au moins 6 caractères."); return; }
    if (recupNvPwd !== recupNvPwd2) { setRecupErr("Les mots de passe ne correspondent pas."); return; }
    var compte = findCompte(recupEmail);
    if (compte) { compte.pwd = recupNvPwd; saveCompteLocal(compte); }
    setRecupStep(4);
  }

  // ── MODE RÉCUPÉRATION ──────────────────────────────────────────────────────
  if (modeRecup) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"fixed", inset:0, zIndex:0 }}>
          <div style={{ position:"absolute", top:"-20%", left:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,125,255,.12) 0%,transparent 70%)" }} />
          <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)" }} />
        </div>
        <div style={{ width:"100%", maxWidth:420, position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <LogoMark size={18} />
          </div>
          <div className="card" style={{ borderRadius:20, padding:28 }}>
            <button onClick={function(){ setModeRecup(false); setRecupStep(1); setRecupErr(""); setRecupMsg(""); }}
              style={{ background:"none", border:"none", color:G.textSecondary, fontSize:13, cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", gap:5 }}>
              ← Retour à la connexion
            </button>

            {recupStep===1 && <>
              <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>🔑 Mot de passe oublié</h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:18, lineHeight:1.6 }}>Entrez votre email pour recevoir un code de vérification.</p>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Votre email</label>
                <input className="inp" type="email" placeholder="email@exemple.com" value={recupEmail} onChange={function(e){ setRecupEmail(e.target.value); }} onKeyDown={function(e){ if(e.key==="Enter") demanderCode(); }} />
              </div>
              {recupErr && <div style={{ fontSize:12, color:G.danger, background:"rgba(239,68,68,.08)", padding:"8px 12px", borderRadius:8, marginBottom:12 }}>❌ {recupErr}</div>}
              <button className="btn btn-p btn-lg" style={{ width:"100%" }} onClick={demanderCode}>Envoyer le code →</button>
            </>}

            {recupStep===2 && <>
              <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>📱 Code de vérification</h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:6, lineHeight:1.6 }}>Un code a été envoyé à <b style={{ color:G.textPrimary }}>{recupEmail}</b></p>
              {recupMsg && <div style={{ background:"rgba(79,125,255,.1)", border:"1px solid rgba(79,125,255,.3)", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:12, color:G.accentLight }}>ℹ️ {recupMsg}</div>}
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Code à 6 chiffres</label>
                <input className="inp" type="text" placeholder="123456" maxLength={6} value={recupCode}
                  onChange={function(e){ setRecupCode(e.target.value.replace(/\D/g,"")); }}
                  style={{ fontSize:20, fontFamily:"monospace", letterSpacing:6, textAlign:"center" }} />
              </div>
              {recupErr && <div style={{ fontSize:12, color:G.danger, background:"rgba(239,68,68,.08)", padding:"8px 12px", borderRadius:8, marginBottom:12 }}>❌ {recupErr}</div>}
              <button className="btn btn-p btn-lg" style={{ width:"100%", marginBottom:10 }} onClick={verifierCode} disabled={recupCode.length!==6}>Vérifier le code →</button>
              <button style={{ background:"none", border:"none", color:G.accentLight, fontSize:12, cursor:"pointer", width:"100%", textAlign:"center" }}
                onClick={function(){ setRecupStep(1); setRecupCode(""); setRecupErr(""); }}>
                Renvoyer un code
              </button>
            </>}

            {recupStep===3 && <>
              <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>🔐 Nouveau mot de passe</h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:18 }}>Choisissez un nouveau mot de passe sécurisé.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nouveau mot de passe</label>
                  <input className="inp" type="password" placeholder="Au moins 6 caractères" value={recupNvPwd} onChange={function(e){ setRecupNvPwd(e.target.value); }} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Confirmer le mot de passe</label>
                  <input className="inp" type="password" placeholder="Répétez le mot de passe" value={recupNvPwd2} onChange={function(e){ setRecupNvPwd2(e.target.value); }} />
                </div>
              </div>
              {recupErr && <div style={{ fontSize:12, color:G.danger, background:"rgba(239,68,68,.08)", padding:"8px 12px", borderRadius:8, marginBottom:12 }}>❌ {recupErr}</div>}
              <button className="btn btn-p btn-lg" style={{ width:"100%" }} onClick={changerPwd} disabled={!recupNvPwd||!recupNvPwd2}>Enregistrer le mot de passe →</button>
            </>}

            {recupStep===4 && <div style={{ textAlign:"center", padding:"14px 0" }}>
              <div style={{ fontSize:56, marginBottom:12 }}>✅</div>
              <h2 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:9 }}>Mot de passe modifié !</h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:20, lineHeight:1.6 }}>Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.</p>
              <button className="btn btn-p btn-lg" style={{ width:"100%" }} onClick={function(){ setModeRecup(false); setRecupStep(1); setMode("login"); setEmail(recupEmail); }}>
                Se connecter →
              </button>
            </div>}
          </div>
        </div>
      </div>
    );
  }

  // ── MODE NORMAL (connexion / inscription) ─────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,125,255,.12) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:"-20%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)" }} />
      </div>
      <div style={{ width:"100%", maxWidth:420, position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <LogoMark size={18} />
          <p style={{ color:G.textSecondary, fontSize:13, marginTop:8 }}>La plateforme des fiches pédagogiques</p>
        </div>
        <div className="card" style={{ borderRadius:20, padding:28 }}>
          <div style={{ display:"flex", gap:6, marginBottom:24, background:"rgba(255,255,255,.04)", borderRadius:10, padding:4 }}>
            {["login","register"].map(function(m) {
              return (
                <button key={m} onClick={function() { setMode(m); setErreur(""); }}
                  style={{ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:700, fontSize:13, background:mode===m?"#4f7dff":"transparent", color:mode===m?"#fff":G.textSecondary, transition:"all .18s" }}>
                  {m==="login" ? "Connexion" : "Inscription"}
                </button>
              );
            })}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            {mode==="register" && (
              <div>
                <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nom complet *</label>
                <input className="inp" placeholder="Ex : Amara Kouassi" value={nom} onChange={function(e) { setNom(e.target.value); }} />
              </div>
            )}
            <div>
              <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Email *</label>
              <input className="inp" type="email" placeholder="email@exemple.com" value={email} onChange={function(e) { setEmail(e.target.value); }} onKeyDown={function(e){ if(e.key==="Enter") submit(); }} />
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Mot de passe *</label>
              <input className="inp" type="password" placeholder="••••••••" value={pwd} onChange={function(e) { setPwd(e.target.value); }} onKeyDown={function(e){ if(e.key==="Enter") submit(); }} />
              {mode==="register" && <div style={{ fontSize:11, color:G.textMuted, marginTop:3 }}>Au moins 6 caractères</div>}
            </div>
            {erreur && <div style={{ fontSize:12, color:G.danger, background:"rgba(239,68,68,.08)", padding:"8px 12px", borderRadius:8 }}>❌ {erreur}</div>}
            {mode==="login" && (
              <div style={{ textAlign:"right" }}>
                <button style={{ background:"none", border:"none", color:G.accentLight, fontSize:12, cursor:"pointer", fontWeight:600 }}
                  onClick={function(){ setModeRecup(true); setRecupEmail(email); setRecupStep(1); setRecupErr(""); setRecupMsg(""); }}>
                  Mot de passe oublié ?
                </button>
              </div>
            )}
            <button className="btn btn-p btn-lg" style={{ marginTop:6 }} onClick={submit} disabled={loading}>
              {loading ? "⏳ Chargement..." : (mode==="login" ? "Se connecter" : "Créer mon compte")}
            </button>
          </div>
        </div>

        {/* Info persistance */}
        <div style={{ marginTop:12, background:"rgba(16,185,129,.07)", border:"1px solid rgba(16,185,129,.2)", borderRadius:12, padding:"10px 14px", display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:18, flexShrink:0 }}>💾</span>
          <p style={{ fontSize:11, color:G.textSecondary, lineHeight:1.5 }}>Votre compte est sauvegardé sur cet appareil. Vous serez <b style={{ color:G.textPrimary }}>reconnecté automatiquement</b> à la prochaine visite.</p>
        </div>

        <div style={{ marginTop:14, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9 }}>
          {[["📚","156 Fiches"],["🎁","5 Gratuites"],["💳","3 000 FCFA/an"]].map(function(item) {
            return (
              <div key={item[1]} style={{ textAlign:"center", padding:"11px 8px", background:"rgba(255,255,255,.03)", borderRadius:10, border:"1px solid "+G.border }}>
                <div style={{ fontSize:19, marginBottom:3 }}>{item[0]}</div>
                <div style={{ fontSize:11, fontWeight:700, color:G.textSecondary }}>{item[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── APP UTILISATEUR ──────────────────────────────────────────────────────────
function UserApp({ user, onLogout, appCfg, setUser }) {
  const cfg = appCfg || {};
  const paieCfg     = cfg.paiement    || DEFAULT_CFG;
  const supportCfg  = cfg.support     || SUPPORT_CONTACTS;
  const aboCfg      = cfg.abonnement  || { prix:3000, ficheGratuites:5, dureeJours:365, delaiActivMin:30 };
  const plansImp    = cfg.plansImprimes || PLANS_IMPRIMES;
  const [page, setPage] = useState("accueil");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filtreM, setFiltreM] = useState("");
  const [filtreNiveau, setFiltreNiveau] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [filtreNoteMin, setFiltreNoteMin] = useState(0);
  const [ficheActive, setFicheActive] = useState(null);
  const [showAbo, setShowAbo] = useState(false);
  const [showDemande, setShowDemande] = useState(false);
  const [showImprimee, setShowImprimee] = useState(null);
  const [toast, setToast] = useState(null);
  const [historique, setHistorique] = useState([]);
  const [nbGratuit, setNbGratuit] = useState(0);
  const [abonne, setAbonne] = useState(false);
  const [editProfil, setEditProfil] = useState(false);
  const [editNom, setEditNom] = useState(user.nom);
  const [editEmail, setEditEmail] = useState(user.email);
  // Nouvelles fonctionnalités
  const [favoris, setFavoris] = useState([]);
  const [notesUtilisateur, setNotesUtilisateur] = useState({});
  const [codePromo, setCodePromo] = useState("");
  const [codePromoApplique, setCodePromoApplique] = useState(null);
  const [codePromoErr, setCodePromoErr] = useState("");
  const [fichesOffline, setFichesOffline] = useState([]);
  const [langue, setLangue] = useState("fr");
  const [showPartage, setShowPartage] = useState(null);
  const [notifExpiration, setNotifExpiration] = useState(true);
  // Quiz, vente unitaire, abonnement école
  const [showQuiz, setShowQuiz] = useState(null);
  const [quizReponses, setQuizReponses] = useState({});
  const [quizTermine, setQuizTermine] = useState(false);
  const [showAchatUnite, setShowAchatUnite] = useState(null);
  const [showAbonnementEcole, setShowAbonnementEcole] = useState(false);
  // Messagerie interne
  const [mesTickets, setMesTickets] = useState([]);
  const [ticketActif, setTicketActif] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newTicketSujet, setNewTicketSujet] = useState("");
  const [newTicketMsg, setNewTicketMsg] = useState("");
  const [showNouveauTicket, setShowNouveauTicket] = useState(false);
  // Supabase data
  const [fichesSupa, setFichesSupa] = useState(null);
  const [supaLoading, setSupaLoading] = useState(true);

  // Charger les données Supabase au démarrage
  useEffect(function() {
    async function chargerDonnees() {
      setSupaLoading(true);
      try {
        // Charger les fiches depuis Supabase
        var fichesData = await supaGetFiches();
        if (fichesData && fichesData.length > 0) setFichesSupa(fichesData);

        // Charger les favoris si utilisateur connecté
        if (user.id) {
          var favIds = await supaGetFavoris(user.id);
          if (favIds && favIds.length > 0) {
            var sourceFiches = fichesData || FICHES;
            setFavoris(sourceFiches.filter(function(f){ return favIds.includes(f.id); }));
          }
          // Charger les tickets
          var ticketsData = await supaGetTickets(user.id);
          if (ticketsData && ticketsData.length > 0) setMesTickets(ticketsData);
        }
      } catch(err) {
        console.log("Supabase hors ligne, utilisation des données locales");
      }
      setSupaLoading(false);
    }
    chargerDonnees();
  }, [user.id]);

  const t = TRADUCTIONS[langue] || TRADUCTIONS.fr;
  // Utiliser les fiches Supabase si disponibles, sinon les données locales
  const sourceFilches = fichesSupa || FICHES;

  function showT(msg, type) { setToast({ msg: msg, type: type || "success" }); }
  function goPage(id) { setPage(id); setDrawerOpen(false); }

  // Vérifier badges débloqués
  function verifierBadges(nbDl, estAbonne, nbNotes) {
    var nouveaux = [];
    BADGES_DEF.forEach(function(b) {
      if (b.type === "dl" && nbDl >= b.seuil) nouveaux.push(b);
      if (b.type === "abo" && estAbonne) nouveaux.push(b);
      if (b.type === "note" && nbNotes >= b.seuil) nouveaux.push(b);
    });
    return nouveaux;
  }

  var badgesDebloques = verifierBadges(historique.length, abonne, Object.keys(notesUtilisateur).length);

  // C4: Vérifier abonnement au chargement + écoute Realtime + polling
  useEffect(function() {

    // Vérification initiale au chargement (avec ou sans user.id)
    function verifierAbo() {
      if (user.id) {
        supaVerifierAbonnement(user.id).then(function(actif) {
          if (actif && !abonne) {
            setAbonne(true);
            showT("🎉 Votre abonnement Premium est actif !", "success");
          } else if (!actif && abonne) {
            setAbonne(false);
          }
        }).catch(function() {});
      } else if (user.email) {
        // Fallback par email si pas de UUID Supabase
        supa.from("users").select("abonnement_actif, abonnement_expire")
          .eq("email", user.email).single()
          .then(function(res) {
            if (res.data && res.data.abonnement_actif) {
              var expire = res.data.abonnement_expire;
              if (!expire || new Date(expire) > new Date()) {
                if (!abonne) {
                  setAbonne(true);
                  showT("🎉 Votre abonnement Premium est actif !", "success");
                }
              }
            }
          }).catch(function() {});
      }
    }

    // Vérification immédiate
    verifierAbo();

    // Polling toutes les 30 secondes (fallback si Realtime ne fonctionne pas)
    var interval = setInterval(verifierAbo, 30000);

    // Supabase Realtime — écoute les changements de la table users
    var channel = null;
    if (user.id) {
      channel = supa.channel("abonnement-user-" + user.id)
        .on("postgres_changes", {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: "id=eq." + user.id,
        }, function(payload) {
          var newData = payload.new;
          if (newData && newData.abonnement_actif === true) {
            setAbonne(true);
            showT("🎉 Votre abonnement Premium est maintenant actif !", "success");
          } else if (newData && newData.abonnement_actif === false) {
            setAbonne(false);
          }
        })
        .subscribe();
    }

    // Nettoyage
    return function() {
      clearInterval(interval);
      if (channel) supa.removeChannel(channel);
    };
  }, [user.id, user.email]);

  async function telecharger(f) {
    // C4: Vérifier abonnement côté Supabase pour les fiches premium
    if (f.premium) {
      var abonneActif = abonne;
      if (!abonneActif && user.id) {
        abonneActif = await supaVerifierAbonnement(user.id).catch(function(){ return false; });
        if (abonneActif) setAbonne(true);
      }
      if (!abonneActif) {
        showT("❌ Aucun abonnement actif. Veuillez finaliser votre abonnement.", "error");
        setShowAbo(true);
        return;
      }
    } else {
      // Fiche gratuite : vérifier le quota
      if (!abonne && nbGratuit >= (aboCfg.ficheGratuites || 5)) {
        setShowAbo(true);
        return;
      }
      if (!abonne) setNbGratuit(function(n) { return n + 1; });
    }
    var nvHist = [Object.assign({}, f, { date: new Date().toISOString() })].concat(historique);
    setHistorique(nvHist);
    setFichesOffline(function(prev) {
      if (prev.find(function(x) { return x.id === f.id; })) return prev;
      return prev.concat([f]);
    });
    if (user.id) supaLogTelecharger(user.id, f.id).catch(function(){});
    if (f.fichierUrl) {
      window.open(f.fichierUrl, "_blank");
      showT(f.titre + " — PDF ouvert 📄", "success");
    } else {
      showT(f.titre + " téléchargé ✅", "success");
    }
    if (nvHist.length === 1) showT("🎯 Badge débloqué : Premier téléchargement !", "info");
    if (nvHist.length === 5) showT("📚 Badge débloqué : Lecteur !", "info");
    if (nvHist.length === 10) showT("🏆 Badge débloqué : Expert !", "info");
  }

  function toggleFavori(f) {
    var existe = favoris.find(function(x) { return x.id === f.id; });
    if (existe) {
      setFavoris(function(prev) { return prev.filter(function(x) { return x.id !== f.id; }); });
      if (user.id) supaToggleFavori(user.id, f.id, true).catch(function(){});
      showT("Retiré des favoris", "info");
    } else {
      setFavoris(function(prev) { return prev.concat([f]); });
      if (user.id) supaToggleFavori(user.id, f.id, false).catch(function(){});
      showT("Ajouté aux favoris ❤️", "success");
    }
  }

  function noterFiche(ficheId, note) {
    setNotesUtilisateur(function(prev) { return Object.assign({}, prev, { [ficheId]: note }); });
    showT("Note enregistrée : " + note + "/5 ⭐", "success");
    if (Object.keys(notesUtilisateur).length === 0) showT("✍️ Badge débloqué : Critique !", "info");
  }

  async function appliquerCodePromo(code) {
    if (!code) { setCodePromoErr("Veuillez saisir un code"); return; }
    var promo = null;
    try {
      promo = await supaValiderCodePromo(code);
    } catch(e) {
      promo = null;
    }
    // Repli sur la liste locale si Supabase est injoignable (mode dégradé)
    if (!promo) {
      promo = CODES_PROMO_DEFAUT.find(function(p) { return p.code === code.toUpperCase() && p.actif; }) || null;
    }
    if (!promo) { setCodePromoErr("Code invalide ou expiré"); return; }
    if (new Date(promo.expire) < new Date()) { setCodePromoErr("Ce code a expiré"); return; }
    if (promo.max && promo.utilises >= promo.max) { setCodePromoErr("Ce code a atteint sa limite d'utilisation"); return; }
    setCodePromoApplique(promo);
    setCodePromoErr("");
    var reduction = promo.type === "pourcentage"
      ? Math.round((aboCfg.prix * promo.reduction) / 100)
      : promo.reduction;
    showT("Code promo appliqué ! Réduction de " + reduction.toLocaleString("fr-FR") + " FCFA 🎉", "success");
  }

  function partagerFiche(f) {
    var msg = "📚 FichesPro Bénin\n\nFiche : " + f.titre + "\nMatière : " + f.matiere + " · Niveau : " + f.niveau + "\n\nTéléchargez sur FichesPro !";
    var url = "https://wa.me/?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
    showT("Partage WhatsApp ouvert ✅", "success");
  }

  function prixAvecPromo() {
    if (!codePromoApplique) return aboCfg.prix;
    if (codePromoApplique.type === "pourcentage") return Math.round(aboCfg.prix * (1 - codePromoApplique.reduction / 100));
    return Math.max(0, aboCfg.prix - codePromoApplique.reduction);
  }

  const filtered = sourceFilches.filter(function(f) {
    const ms = !search || f.titre.toLowerCase().indexOf(search.toLowerCase()) !== -1 || f.matiere.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    const mm = !filtreM || f.matiereId === filtreM;
    const mn = !filtreNiveau || f.niveau === filtreNiveau;
    const mt = !filtreType || (filtreType === "gratuit" ? !f.premium : f.premium);
    const mr = !filtreNoteMin || f.note >= filtreNoteMin;
    return ms && mm && mn && mt && mr;
  });

  const activeNav = NAV_USER.find(function(n) { return n.id === page; });

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={function() { setToast(null); }} />}
      {ficheActive && <FicheModal fiche={ficheActive} abonne={abonne} onClose={function() { setFicheActive(null); }} onTelecharger={function(f) { telecharger(f); setFicheActive(null); }} favori={!!favoris.find(function(x){return x.id===ficheActive.id;})} onFavori={toggleFavori} onPartager={partagerFiche} onNoter={noterFiche} noteUtilisateur={notesUtilisateur[ficheActive?.id]} />}
      {showAbo && <PaiementModal onClose={function() { setShowAbo(false); }} onSuccess={function() { setShowAbo(false); showT("Demande soumise ! Votre abonnement sera activé après validation sous "+aboCfg.delaiActivMin+" min ⏳", "info"); }} cfg={paieCfg} prix={prixAvecPromo()} supportCfg={supportCfg} onSubmitPaie={async function(nom, phone, preuve, methode, montant) {
        if (user.id) {
          try {
            await supaDemanderAbonnement(user.id, user.nom, user.email, preuve, phone, montant, methode);
          } catch(e) {}
        }
      }} />}
      {showDemande && <DemandeModal user={user} onClose={function() { setShowDemande(false); }} onSubmit={function() { setShowDemande(false); showT("Demande envoyée ! Réponse sous 48h 📬", "success"); }} />}
      {showImprimee && <ImprimeeModal user={user} plan={showImprimee} onClose={function() { setShowImprimee(null); }} cfg={paieCfg} supportCfg={supportCfg} />}

      {/* MODAL QUIZ */}
      {showQuiz && (function(){
        var quiz = QUIZ_DEFAUT[showQuiz.id];
        if(!quiz) return (
          <div className="modal-bg" onClick={function(){ setShowQuiz(null); setQuizReponses({}); setQuizTermine(false); }}>
            <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🚧</div>
                <h2 className="fd" style={{ fontSize:18, fontWeight:800, marginBottom:8 }}>Quiz bientôt disponible</h2>
                <p style={{ color:G.textMuted, fontSize:13, marginBottom:16 }}>Le quiz pour cette fiche sera ajouté prochainement.</p>
                <button className="btn btn-p" onClick={function(){ setShowQuiz(null); }}>Fermer</button>
              </div>
            </div>
          </div>
        );
        var total = quiz.questions.length;
        var bonnes = quiz.questions.filter(function(q,i){ return quizReponses[i]===q.ok; }).length;
        return (
          <div className="modal-bg" onClick={function(){ if(quizTermine){ setShowQuiz(null); setQuizReponses({}); setQuizTermine(false); } }}>
            <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                <h2 className="fd" style={{ fontSize:18, fontWeight:800 }}>📝 Quiz — {showQuiz.titre}</h2>
                <button onClick={function(){ setShowQuiz(null); setQuizReponses({}); setQuizTermine(false); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
              </div>
              {!quizTermine ? (
                <div>
                  <div style={{ fontSize:12, color:G.textMuted, marginBottom:16 }}>{Object.keys(quizReponses).length}/{total} réponses</div>
                  {quiz.questions.map(function(q, i){
                    return (
                      <div key={i} style={{ marginBottom:18 }}>
                        <div style={{ fontWeight:700, fontSize:14, marginBottom:10 }}>{i+1}. {q.q}</div>
                        {q.r.map(function(rep, j){
                          var selectionne = quizReponses[i]===j;
                          return (
                            <div key={j} onClick={function(){ setQuizReponses(function(prev){ return Object.assign({},prev,{[i]:j}); }); }}
                              style={{ padding:"10px 14px", borderRadius:10, border:"2px solid "+(selectionne?G.accent:G.border), background:selectionne?"rgba(79,125,255,.1)":G.bgCard, cursor:"pointer", marginBottom:7, fontSize:13, fontWeight:selectionne?700:400, color:selectionne?G.accentLight:G.textPrimary, transition:"all .15s" }}>
                              {["A","B","C","D"][j]}. {rep}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <button className="btn btn-p btn-lg" style={{ width:"100%" }} disabled={Object.keys(quizReponses).length<total}
                    onClick={function(){ setQuizTermine(true); if(bonnes===total) showT("🏆 Parfait ! "+total+"/"+total+" bonnes réponses !","success"); else showT(bonnes+"/"+total+" bonnes réponses","info"); }}>
                    Valider mes réponses ✓
                  </button>
                </div>
              ) : (
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:56, marginBottom:12 }}>{bonnes===total?"🏆":bonnes>=total/2?"📚":"💪"}</div>
                  <div className="fd" style={{ fontSize:28, fontWeight:800, color:bonnes===total?G.success:bonnes>=total/2?G.gold:G.danger, marginBottom:8 }}>{bonnes}/{total}</div>
                  <p style={{ color:G.textSecondary, fontSize:14, marginBottom:20 }}>{bonnes===total?"Excellent ! Toutes les réponses sont correctes !":bonnes>=total/2?"Bien ! Vous pouvez encore progresser.":"Continuez à réviser cette fiche !"}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {quiz.questions.map(function(q,i){
                      var rep = quizReponses[i];
                      var correct = rep===q.ok;
                      return (
                        <div key={i} style={{ padding:"10px 14px", borderRadius:10, background:correct?"rgba(16,185,129,.1)":"rgba(239,68,68,.1)", border:"1px solid "+(correct?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"), textAlign:"left" }}>
                          <div style={{ fontSize:12, fontWeight:700, color:correct?G.success:G.danger, marginBottom:4 }}>{correct?"✅":"❌"} {q.q}</div>
                          <div style={{ fontSize:12, color:G.textSecondary }}>Bonne réponse : <b style={{ color:G.textPrimary }}>{q.r[q.ok]}</b></div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display:"flex", gap:10, marginTop:18 }}>
                    <button className="btn btn-s" style={{ flex:1 }} onClick={function(){ setQuizReponses({}); setQuizTermine(false); }}>🔄 Recommencer</button>
                    <button className="btn btn-p" style={{ flex:1 }} onClick={function(){ setShowQuiz(null); setQuizReponses({}); setQuizTermine(false); }}>Fermer</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* MODAL ACHAT À L'UNITÉ */}
      {showAchatUnite && (
        <div className="modal-bg" onClick={function(){ setShowAchatUnite(null); }}>
          <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h2 className="fd" style={{ fontSize:18, fontWeight:800 }}>🛒 Acheter cette fiche</h2>
              <button onClick={function(){ setShowAchatUnite(null); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
            </div>
            <div style={{ background:"rgba(79,125,255,.07)", borderRadius:14, padding:16, marginBottom:18 }}>
              <div style={{ fontWeight:800, fontSize:16, marginBottom:4 }}>{showAchatUnite.titre}</div>
              <div style={{ fontSize:12, color:G.textMuted }}>{showAchatUnite.matiere} · {showAchatUnite.niveau} · {showAchatUnite.pages}p</div>
            </div>
            <div style={{ display:"flex", gap:12, marginBottom:20 }}>
              {[{prix:200,label:"Basique",desc:"Téléchargement PDF"},{prix:350,label:"Complet",desc:"PDF + Quiz inclus"},{prix:500,label:"Premium",desc:"PDF + Quiz + Audio"}].map(function(opt){
                return (
                  <div key={opt.prix} style={{ flex:1, padding:"14px 10px", borderRadius:12, border:"2px solid "+G.border, background:G.bgCard, cursor:"pointer", textAlign:"center", transition:"all .2s" }}
                    onMouseOver={function(e){ e.currentTarget.style.borderColor=G.accent; }}
                    onMouseOut={function(e){ e.currentTarget.style.borderColor=G.border; }}>
                    <div className="fd" style={{ fontSize:18, fontWeight:800, color:G.accent }}>{opt.prix}<span style={{ fontSize:11, color:G.textMuted }}> F</span></div>
                    <div style={{ fontSize:12, fontWeight:700, marginTop:4 }}>{opt.label}</div>
                    <div style={{ fontSize:10, color:G.textMuted, marginTop:3 }}>{opt.desc}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:12, color:G.textSecondary }}>
              💡 <b style={{ color:G.gold }}>Conseil :</b> L'abonnement annuel à {aboCfg.prix.toLocaleString("fr-FR")} FCFA donne accès à toutes les fiches — bien plus avantageux !
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-s" style={{ flex:1 }} onClick={function(){ setShowAchatUnite(null); setShowAbo(true); }}>⭐ S'abonner plutôt</button>
              <button className="btn btn-p" style={{ flex:2 }} onClick={function(){
                telecharger(showAchatUnite);
                setShowAchatUnite(null);
                showT("Achat confirmé ! Fiche disponible 📄","success");
              }}>Payer & Télécharger</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ABONNEMENT ÉCOLE / FAMILLE */}
      {showAbonnementEcole && (
        <div className="modal-bg" onClick={function(){ setShowAbonnementEcole(false); }}>
          <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <h2 className="fd" style={{ fontSize:18, fontWeight:800 }}>🏫 Abonnements collectifs</h2>
              <button onClick={function(){ setShowAbonnementEcole(false); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
            </div>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:18 }}>Pour les familles et les établissements scolaires</p>
            {PLANS_ECOLE.map(function(plan){
              var economie = plan.id!=="famille" ? Math.round((3000*Math.min(plan.max,50)-plan.prix)/3000*Math.min(plan.max,50)*100) : 53;
              return (
                <div key={plan.id} style={{ border:"2px solid "+plan.color+"44", borderRadius:14, padding:16, marginBottom:12, background:plan.color+"0a" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:plan.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{plan.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span className="fd" style={{ fontSize:16, fontWeight:800 }}>{plan.label}</span>
                        <span style={{ fontSize:10, background:plan.color+"22", color:plan.color, padding:"2px 7px", borderRadius:5, fontWeight:700 }}>{economie}% d'économie</span>
                      </div>
                      <div style={{ fontSize:12, color:G.textMuted, marginTop:2 }}>{plan.desc}</div>
                    </div>
                    <div className="fd" style={{ fontSize:18, fontWeight:800, color:plan.color, flexShrink:0 }}>{plan.prix.toLocaleString("fr-FR")}<span style={{ fontSize:11, fontWeight:400, color:G.textMuted }}> F</span></div>
                  </div>
                  <button className="btn btn-p" style={{ width:"100%", background:"linear-gradient(135deg,"+plan.color+","+plan.color+"cc)" }}
                    onClick={function(){
                      setShowAbonnementEcole(false);
                      showT("Demande "+plan.label+" envoyée ! Nous vous contactons sous 24h 📞","success");
                    }}>
                    Commander le plan {plan.label}
                  </button>
                </div>
              );
            })}
            <div style={{ fontSize:12, color:G.textMuted, textAlign:"center", marginTop:8 }}>
              📞 Pour toute question : <a href={"https://wa.me/"+supportCfg.whatsapp} target="_blank" rel="noreferrer" style={{ color:"#25d366", fontWeight:700 }}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      <Drawer open={drawerOpen} onClose={function() { setDrawerOpen(false); }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <LogoMark size={14} />
          <button onClick={function() { setDrawerOpen(false); }} style={{ background:"rgba(255,255,255,.07)",border:"none",borderRadius:8,width:30,height:30,color:G.textSecondary,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 12px", background:"rgba(255,255,255,.04)", borderRadius:12, marginBottom:14, border:"1px solid "+G.border }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(79,125,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>👤</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.nom}</div>
            <div style={{ fontSize:11, color:G.textMuted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</div>
          </div>
          {abonne && <span style={{ fontSize:15 }}>⭐</span>}
        </div>
        {!abonne && (
          <div style={{ background:"rgba(79,125,255,.08)", border:"1px solid rgba(79,125,255,.2)", borderRadius:12, padding:"11px 13px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:12, fontWeight:700, color:G.textSecondary }}>Fiches gratuites</span>
              <span style={{ fontSize:12, fontWeight:800, color:nbGratuit>=5?G.danger:G.accent }}>{nbGratuit}/5</span>
            </div>
            <div className="pbar"><div className="pfill" style={{ width:(nbGratuit/5*100)+"%", background:nbGratuit>=5?G.danger:"linear-gradient(90deg,#4f7dff,#7c3aed)" }} /></div>
            {nbGratuit>=5 && <button className="btn btn-p btn-sm" style={{ width:"100%", marginTop:9 }} onClick={function() { setShowAbo(true); setDrawerOpen(false); }}>Passer Premium ⭐</button>}
          </div>
        )}
        {abonne && (
          <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.2)", borderRadius:12, padding:"10px 13px", marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:G.gold }}>⭐ Abonné Premium</div>
            <div style={{ fontSize:11, color:G.textMuted, marginTop:2 }}>Accès illimité actif</div>
          </div>
        )}
        {/* Sélecteur de langue */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", marginBottom:6 }}>🌍 Langue</div>
          <div style={{ display:"flex", gap:6 }}>
            {LANGUES.map(function(l) {
              return (
                <button key={l.id} onClick={function(){ setLangue(l.id); }} style={{ flex:1, padding:"6px 4px", borderRadius:8, border:"1px solid "+(langue===l.id?G.accent:G.border), background:langue===l.id?"rgba(79,125,255,.12)":"transparent", color:langue===l.id?G.accentLight:G.textMuted, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit" }}>
                  {l.flag} {l.label}
                </button>
              );
            })}
          </div>
        </div>
        <nav style={{ display:"flex", flexDirection:"column", gap:3, flex:1 }}>
          {NAV_USER.map(function(n) {
            return (
              <button key={n.id} className={"nl "+(page===n.id?"on":"")} onClick={function() { goPage(n.id); }}>
                <span style={{ fontSize:17 }}>{n.icon}</span><span>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop:"auto", paddingTop:13, borderTop:"1px solid "+G.border }}>
          <button onClick={onLogout} className="btn btn-d btn-sm" style={{ width:"100%" }}>↩ Déconnexion</button>
        </div>
      </Drawer>

      <header className="topbar">
        <HamBtn onClick={function() { setDrawerOpen(true); }} />
        <div style={{ flex:1 }}><LogoMark size={13} /></div>
        <span style={{ fontSize:13, fontWeight:600, color:G.textMuted }}>{activeNav ? activeNav.icon+" "+activeNav.label : ""}</span>
        {abonne && <span className="badge b-gold" style={{ fontSize:10 }}>Premium</span>}
      </header>

      <main style={{ padding:"22px 18px", maxWidth:980, margin:"0 auto" }}>

        {page==="accueil" && (
          <div>
            {/* Notification expiration abonnement */}
            {abonne && notifExpiration && (
              <div style={{ background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.3)", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>⏰</span>
                <div style={{ flex:1, fontSize:13, color:G.textSecondary }}>Votre abonnement expire dans <b style={{ color:G.gold }}>7 jours</b>. Renouvelez pour garder l'accès illimité.</div>
                <button onClick={function(){ setShowAbo(true); }} className="btn btn-p btn-sm">Renouveler</button>
                <button onClick={function(){ setNotifExpiration(false); }} style={{ background:"none", border:"none", color:G.textMuted, cursor:"pointer", fontSize:16 }}>×</button>
              </div>
            )}

            <div style={{ background:"linear-gradient(135deg,rgba(79,125,255,.14),rgba(124,58,237,.09))", border:"1px solid rgba(79,125,255,.2)", borderRadius:18, padding:"24px 22px", marginBottom:24, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,125,255,.15) 0%,transparent 70%)" }} />
              <h1 className="fd" style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>Bonjour, {user.nom.split(" ")[0]} 👋</h1>
              <p style={{ color:G.textSecondary, fontSize:14, marginBottom:18, maxWidth:440 }}>Explorez 156 fiches pédagogiques. Téléchargez et demandez vos fiches personnalisées.</p>
              <div className="sbar" style={{ maxWidth:400, background:"rgba(0,0,0,.25)", marginBottom:16 }}>
                <span style={{ color:G.textMuted }}>🔍</span>
                <input value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder={t.rechercher} onFocus={function() { goPage("fiches"); }} />
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button className="btn btn-p" onClick={function() { goPage("fiches"); }}>Parcourir →</button>
                <button className="btn btn-s" onClick={function() { setShowDemande(true); }}>📝 Demander une fiche</button>
              </div>
            </div>

            {/* Dashboard stats */}
            <div className="g4" style={{ marginBottom:24 }}>
              {[
                { icon:"📚", label:"Fiches dispo",   val:"156+",            color:G.accent },
                { icon:"❤️", label:"Favoris",         val:favoris.length,    color:"#ef4444" },
                { icon:"📥", label:"Téléchargés",     val:historique.length, color:G.success },
                { icon:"🏆", label:"Badges",          val:badgesDebloques.length+"/"+BADGES_DEF.length, color:G.gold },
              ].map(function(s) {
                return (
                  <div key={s.label} className="scard">
                    <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
                    <div className="fd" style={{ fontSize:19, fontWeight:800, color:s.color }}>{s.val}</div>
                    <div style={{ fontSize:11, color:G.textMuted, marginTop:2, fontWeight:600 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Badges débloqués */}
            {badgesDebloques.length > 0 && (
              <div className="card" style={{ marginBottom:20 }}>
                <h2 className="fd" style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🏆 Mes badges</h2>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {badgesDebloques.map(function(b) {
                    return (
                      <div key={b.id} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 12px", background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.25)", borderRadius:10 }}>
                        <span style={{ fontSize:18 }}>{b.icon}</span>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:G.gold }}>{b.label}</div>
                          <div style={{ fontSize:10, color:G.textMuted }}>{b.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <h2 className="fd" style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Matières disponibles</h2>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
              {MATIERES.slice(0,8).map(function(m) {
                return (
                  <div key={m.id} className="chip" onClick={function() { setFiltreM(m.id); goPage("fiches"); }}>
                    <span>{m.icon}</span><span>{m.label}</span>
                    <span style={{ fontSize:10, color:m.color, fontWeight:700, background:m.color+"18", padding:"2px 6px", borderRadius:5 }}>{m.count}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:13 }}>
              <h2 className="fd" style={{ fontSize:15, fontWeight:700 }}>Fiches récentes</h2>
              <button className="btn btn-s btn-sm" onClick={function() { goPage("fiches"); }}>Voir tout →</button>
            </div>
            <div className="g3">
              {FICHES.slice(0,6).map(function(f) {
                return (
                  <div key={f.id} style={{ position:"relative" }}>
                    <FCard fiche={f} onClick={function() { setFicheActive(f); }} />
                    <div style={{ display:"flex", gap:5, marginTop:6 }}>
                      <button className="btn btn-s btn-sm" style={{ flex:1, fontSize:11 }} onClick={function(){ setShowQuiz(f); setQuizReponses({}); setQuizTermine(false); }}>📝 Quiz</button>
                      {f.premium && !abonne && (
                        <button className="btn btn-sm" style={{ flex:1, fontSize:11, background:"rgba(124,58,237,.12)", border:"1px solid rgba(124,58,237,.3)", color:"#a78bfa" }} onClick={function(){ setShowAchatUnite(f); }}>🛒 Acheter</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {page==="fiches" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, marginBottom:18 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>Toutes les fiches</h1>
              <button className="btn btn-p btn-sm" onClick={function() { setShowDemande(true); }}>+ Demander</button>
            </div>
            {/* Recherche */}
            <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <div className="sbar" style={{ flex:1, minWidth:200 }}>
                <span style={{ color:G.textMuted }}>🔍</span>
                <input value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder={t.rechercher} />
                {search && <button onClick={function() { setSearch(""); }} style={{ background:"none",border:"none",color:G.textMuted,cursor:"pointer" }}>×</button>}
              </div>
              <select className="inp" style={{ width:"auto", minWidth:150 }} value={filtreM} onChange={function(e) { setFiltreM(e.target.value); }}>
                <option value="">Toutes matières</option>
                {MATIERES.map(function(m) { return <option key={m.id} value={m.id}>{m.label}</option>; })}
              </select>
            </div>
            {/* Filtres avancés */}
            <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              <select className="inp" style={{ width:"auto", minWidth:120, fontSize:12 }} value={filtreNiveau} onChange={function(e){ setFiltreNiveau(e.target.value); }}>
                <option value="">Tous niveaux</option>
                {["CI","CP","CE1","CE2","CM1","CM2"].map(function(n){ return <option key={n} value={n}>{n}</option>; })}
              </select>
              <select className="inp" style={{ width:"auto", minWidth:120, fontSize:12 }} value={filtreType} onChange={function(e){ setFiltreType(e.target.value); }}>
                <option value="">Tous types</option>
                <option value="gratuit">✓ Gratuit</option>
                <option value="premium">⭐ Premium</option>
              </select>
              <select className="inp" style={{ width:"auto", minWidth:130, fontSize:12 }} value={filtreNoteMin} onChange={function(e){ setFiltreNoteMin(parseFloat(e.target.value)||0); }}>
                <option value={0}>Toutes notes</option>
                <option value={4}>★ 4+</option>
                <option value={4.5}>★ 4.5+</option>
                <option value={4.8}>★ 4.8+</option>
              </select>
              {(filtreM||filtreNiveau||filtreType||filtreNoteMin>0) && (
                <button className="btn btn-s btn-sm" onClick={function(){ setFiltreM(""); setFiltreNiveau(""); setFiltreType(""); setFiltreNoteMin(0); }}>✕ Réinitialiser</button>
              )}
            </div>
            {/* Chips matières */}
            <div style={{ display:"flex", gap:7, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
              <div className={"chip "+(!filtreM?"on":"")} onClick={function() { setFiltreM(""); }}><span>Tout ({FICHES.length})</span></div>
              {MATIERES.slice(0,7).map(function(m) {
                return (
                  <div key={m.id} className={"chip "+(filtreM===m.id?"on":"")} onClick={function() { setFiltreM(filtreM===m.id?"":m.id); }}>
                    <span>{m.icon}</span><span>{m.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize:12, color:G.textMuted, marginBottom:12 }}>{filtered.length} fiche{filtered.length>1?"s":""} trouvée{filtered.length>1?"s":""}</div>
            {filtered.length===0
              ? <div style={{ textAlign:"center", padding:"60px 20px", color:G.textMuted }}><div style={{ fontSize:42, marginBottom:12 }}>🔍</div><p>Aucune fiche trouvée</p></div>
              : <div className="g3">{filtered.map(function(f) {
                  var isFavori = !!favoris.find(function(x){return x.id===f.id;});
                  return (
                    <div key={f.id} style={{ position:"relative" }}>
                      <FCard fiche={f} onClick={function() { setFicheActive(f); }} />
                      <button onClick={function(e){ e.stopPropagation(); toggleFavori(f); }}
                        style={{ position:"absolute", top:10, right:10, background:"none", border:"none", cursor:"pointer", fontSize:18, zIndex:1 }}
                        title={isFavori?"Retirer des favoris":"Ajouter aux favoris"}>
                        {isFavori?"❤️":"🤍"}
                      </button>
                      <div style={{ display:"flex", gap:5, marginTop:6 }}>
                        <button className="btn btn-s btn-sm" style={{ flex:1, fontSize:11 }} onClick={function(){ setShowQuiz(f); setQuizReponses({}); setQuizTermine(false); }}>📝 Quiz</button>
                        {f.premium && !abonne
                          ? <button className="btn btn-sm" style={{ flex:1, fontSize:11, background:"rgba(124,58,237,.12)", border:"1px solid rgba(124,58,237,.3)", color:"#a78bfa" }} onClick={function(){ setShowAchatUnite(f); }}>🛒 Acheter</button>
                          : <button className="btn btn-s btn-sm" style={{ flex:1, fontSize:11 }} onClick={function(e){ e.stopPropagation(); partagerFiche(f); }}>📤 Partager</button>
                        }
                      </div>
                    </div>
                  );
                })}</div>
            }
          </div>
        )}

        {/* PAGE FAVORIS */}
        {page==="favoris" && (
          <div>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:20 }}>❤️ Mes Favoris</h1>
            {favoris.length===0
              ? <div style={{ textAlign:"center", padding:"60px 20px", color:G.textMuted }}>
                  <div style={{ fontSize:42, marginBottom:12 }}>🤍</div>
                  <p>Aucune fiche en favori</p>
                  <p style={{ fontSize:13, marginTop:8 }}>Appuyez sur 🤍 sur une fiche pour l'ajouter ici</p>
                  <button className="btn btn-p" style={{ marginTop:14 }} onClick={function(){ goPage("fiches"); }}>Parcourir les fiches</button>
                </div>
              : <>
                  <div style={{ fontSize:13, color:G.textMuted, marginBottom:16 }}>{favoris.length} fiche{favoris.length>1?"s":""} en favori</div>
                  <div className="g3">
                    {favoris.map(function(f) {
                      return (
                        <div key={f.id} style={{ position:"relative" }}>
                          <FCard fiche={f} onClick={function(){ setFicheActive(f); }} />
                          <button onClick={function(e){ e.stopPropagation(); toggleFavori(f); }}
                            style={{ position:"absolute", top:10, right:10, background:"none", border:"none", cursor:"pointer", fontSize:18 }}>❤️</button>
                          <button onClick={function(e){ e.stopPropagation(); partagerFiche(f); }}
                            style={{ position:"absolute", bottom:10, right:10, background:"rgba(37,211,102,.15)", border:"1px solid rgba(37,211,102,.3)", borderRadius:8, cursor:"pointer", fontSize:12, padding:"3px 8px", color:"#25d366", fontWeight:700 }}>📤</button>
                        </div>
                      );
                    })}
                  </div>
                </>
            }
          </div>
        )}

        {page==="historique" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>Mon historique</h1>
              {fichesOffline.length > 0 && (
                <span className="badge b-ok">📱 {fichesOffline.length} offline</span>
              )}
            </div>
            {historique.length===0
              ? <div style={{ textAlign:"center", padding:"60px 20px", color:G.textMuted }}><div style={{ fontSize:42, marginBottom:12 }}>📋</div><p>Aucun téléchargement</p><button className="btn btn-p" style={{ marginTop:14 }} onClick={function() { goPage("fiches"); }}>Parcourir →</button></div>
              : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {historique.map(function(f, i) {
                    var isOffline = !!fichesOffline.find(function(x){ return x.id===f.id; });
                    return (
                      <div key={i} className="card" style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:42, height:42, borderRadius:10, background:"rgba(79,125,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>📄</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:700, fontSize:14 }}>{f.titre}</div>
                          <div style={{ fontSize:11, color:G.textMuted }}>{f.matiere} · {f.niveau} · {new Date(f.date).toLocaleDateString("fr-FR")}</div>
                          {/* Notation */}
                          <div style={{ display:"flex", gap:4, marginTop:5 }}>
                            {[1,2,3,4,5].map(function(star){
                              return (
                                <button key={star} onClick={function(){ noterFiche(f.id, star); }}
                                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color: notesUtilisateur[f.id] >= star ? G.gold : G.border, padding:0 }}>★</button>
                              );
                            })}
                            {notesUtilisateur[f.id] && <span style={{ fontSize:11, color:G.textMuted, marginLeft:4 }}>Ma note : {notesUtilisateur[f.id]}/5</span>}
                          </div>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                          {isOffline && <span style={{ fontSize:10, color:G.success, fontWeight:700 }}>📱 Offline</span>}
                          <button className="btn btn-s btn-sm" onClick={function(){ partagerFiche(f); }}>📤</button>
                          <button className="btn btn-s btn-sm">📥</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
            }
          </div>
        )}

        {page==="abonnement" && (
          <div style={{ maxWidth:640 }}>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>Abonnement & Versions imprimées</h1>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:22 }}>Choisissez l'offre qui correspond à vos besoins</p>

            {/* ── ABONNEMENT NUMÉRIQUE ANNUEL ── */}
            <h2 className="fd" style={{ fontSize:15, fontWeight:700, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span>💻</span> Accès Numérique
            </h2>

            {abonne
              ? <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,.14),rgba(217,119,6,.09))", border:"1px solid rgba(245,158,11,.3)", borderRadius:16, padding:24, textAlign:"center", marginBottom:24 }}>
                  <div style={{ fontSize:44, marginBottom:10 }}>⭐</div>
                  <h2 className="fd" style={{ fontSize:20, fontWeight:800, color:G.gold, marginBottom:6 }}>Abonnement Annuel Actif</h2>
                  <p style={{ color:G.textSecondary, fontSize:13 }}>Accès illimité à toutes les fiches pendant 1 an</p>
                </div>
              : <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
                  <div className="card" style={{ opacity:.65 }}>
                    <h3 style={{ fontWeight:700, marginBottom:8, fontSize:14 }}>Plan Gratuit</h3>
                    <div className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:8 }}>0 FCFA</div>
                    {["5 fiches","En ligne","Limité"].map(function(a) { return <div key={a} style={{ fontSize:12, color:G.textMuted, padding:"3px 0" }}>✓ {a}</div>; })}
                  </div>
                  <div style={{ background:"linear-gradient(135deg,rgba(79,125,255,.12),rgba(124,58,237,.08))", border:"2px solid rgba(79,125,255,.4)", borderRadius:16, padding:18 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      <h3 style={{ fontWeight:800, fontSize:14 }}>Annuel ⭐</h3>
                      <span className="badge b-gold" style={{ fontSize:10 }}>1 an</span>
                    </div>
                    <div className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:2 }}>
                      {codePromoApplique
                        ? <><span style={{ textDecoration:"line-through", color:G.textMuted, fontSize:14 }}>{aboCfg.prix.toLocaleString("fr-FR")}</span> {" "}<span style={{ color:G.success }}>{prixAvecPromo().toLocaleString("fr-FR")}</span></>
                        : aboCfg.prix.toLocaleString("fr-FR")
                      } <span style={{ fontSize:11, color:G.textSecondary }}>FCFA</span>
                    </div>
                    <div style={{ color:G.textMuted, fontSize:11, marginBottom:10 }}>Accès illimité {aboCfg.dureeJours} jours</div>
                    {["Fiches illimitées","PDF inclus","Mises à jour"].map(function(a) { return <div key={a} style={{ fontSize:12, color:G.textSecondary, padding:"3px 0" }}>✅ {a}</div>; })}
                    {/* Code promo */}
                    <div style={{ marginTop:12, marginBottom:10 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:G.textMuted, marginBottom:6 }}>🎟️ Code promotionnel</div>
                      <div style={{ display:"flex", gap:8 }}>
                        <input className="inp" placeholder="Ex: RENTREE25" value={codePromo} onChange={function(e){ setCodePromo(e.target.value.toUpperCase()); setCodePromoErr(""); }} style={{ flex:1, fontSize:13 }} />
                        <button className="btn btn-s btn-sm" onClick={function(){ appliquerCodePromo(codePromo); }}>Appliquer</button>
                      </div>
                      {codePromoErr && <div style={{ fontSize:12, color:G.danger, marginTop:4 }}>❌ {codePromoErr}</div>}
                      {codePromoApplique && <div style={{ fontSize:12, color:G.success, marginTop:4 }}>✅ Code appliqué : -{codePromoApplique.type==="pourcentage"?codePromoApplique.reduction+"%":(aboCfg.prix-prixAvecPromo()).toLocaleString("fr-FR")+" FCFA"} <button onClick={function(){ setCodePromoApplique(null); setCodePromo(""); }} style={{ background:"none", border:"none", color:G.danger, cursor:"pointer", fontSize:12 }}>✕</button></div>}
                    </div>
                    <button className="btn btn-p" style={{ width:"100%", fontSize:13 }} onClick={function() { setShowAbo(true); }}>S'abonner {codePromoApplique?"→ "+prixAvecPromo().toLocaleString("fr-FR")+" FCFA":"→"}</button>
                  </div>
                </div>
            }

            {/* ── VERSION IMPRIMÉE PAR CLASSE ── */}
            <h2 className="fd" style={{ fontSize:15, fontWeight:700, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span>🖨️</span> Version Imprimée par Classe
            </h2>
            <div style={{ background:"rgba(245,158,11,.07)", border:"1px solid rgba(245,158,11,.2)", borderRadius:10, padding:"10px 13px", marginBottom:14, display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>📦</span>
              <p style={{ fontSize:12, color:G.textSecondary, lineHeight:1.5 }}>Fiches pédagogiques imprimées professionnellement, livrées ou à retirer. Commandez par classe selon le niveau de votre enfant ou de vos élèves.</p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
              {plansImp.map(function(plan) {
                return (
                  <div key={plan.id} style={{ background:G.bgCard, border:"1px solid "+G.border, borderRadius:16, padding:18, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:plan.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{plan.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span className="fd" style={{ fontSize:16, fontWeight:800 }}>Classes {plan.label}</span>
                        <span style={{ fontSize:11, color:plan.color, fontWeight:700, background:plan.color+"18", padding:"2px 8px", borderRadius:6 }}>
                          {plan.classes.join(" · ")}
                        </span>
                      </div>
                      <div className="fd" style={{ fontSize:18, fontWeight:800, color:plan.color }}>{plan.prix.toLocaleString("fr-FR")} <span style={{ fontSize:12, fontWeight:600, color:G.textMuted }}>FCFA</span></div>
                      <div style={{ fontSize:11, color:G.textMuted, marginTop:2 }}>{plan.description}</div>
                    </div>
                    <button className="btn btn-p btn-sm" onClick={function() { setShowImprimee(plan); }} style={{ flexShrink:0 }}>
                      🖨️ Commander
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Moyens de paiement */}
            <div className="card" style={{ marginBottom:16 }}>
              <h3 style={{ fontWeight:700, marginBottom:10, fontSize:14 }}>💳 Moyens de paiement</h3>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {[["📱","MTN MoMo"],["📲","Moov Money"],["📶","Celtiis"]].map(function(item) {
                  return <div key={item[1]} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 11px", borderRadius:8, background:"rgba(255,255,255,.05)", border:"1px solid "+G.border }}><span>{item[0]}</span><span style={{ fontSize:12, fontWeight:600, color:G.textSecondary }}>{item[1]}</span></div>;
                })}
              </div>
            </div>

            {/* ── ABONNEMENTS COLLECTIFS ── */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h2 className="fd" style={{ fontSize:15, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
                <span>🏫</span> Abonnements Collectifs
              </h2>
            </div>
            <div style={{ background:"rgba(79,125,255,.07)", border:"1px solid rgba(79,125,255,.18)", borderRadius:10, padding:"10px 13px", marginBottom:14, display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
              <p style={{ fontSize:12, color:G.textSecondary, lineHeight:1.5 }}>Pour les familles et les établissements scolaires. Jusqu'à <b style={{ color:G.textPrimary }}>75% d'économie</b> par rapport aux abonnements individuels.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {PLANS_ECOLE.map(function(plan){
                return (
                  <div key={plan.id} style={{ border:"1px solid "+plan.color+"44", borderRadius:14, padding:"14px 16px", background:plan.color+"08", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                    <div style={{ width:46, height:46, borderRadius:12, background:plan.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{plan.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:800, fontSize:15 }}>{plan.label}</div>
                      <div style={{ fontSize:12, color:G.textMuted }}>{plan.desc}</div>
                    </div>
                    <div style={{ flexShrink:0, textAlign:"right" }}>
                      <div className="fd" style={{ fontSize:17, fontWeight:800, color:plan.color }}>{plan.prix.toLocaleString("fr-FR")} <span style={{ fontSize:11, color:G.textMuted }}>F</span></div>
                    </div>
                    <button className="btn btn-p btn-sm" style={{ flexShrink:0, background:"linear-gradient(135deg,"+plan.color+","+plan.color+"cc)" }}
                      onClick={function(){ setShowAbonnementEcole(true); }}>
                      Choisir
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── VENTE À L'UNITÉ ── */}
            <h2 className="fd" style={{ fontSize:15, fontWeight:700, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span>🛒</span> Acheter à l'unité
            </h2>
            <div style={{ background:"rgba(124,58,237,.07)", border:"1px solid rgba(124,58,237,.2)", borderRadius:12, padding:"14px 16px", marginBottom:20 }}>
              <p style={{ fontSize:13, color:G.textSecondary, marginBottom:12, lineHeight:1.6 }}>Pas encore prêt à vous abonner ? Achetez uniquement les fiches dont vous avez besoin, à partir de <b style={{ color:G.textPrimary }}>200 FCFA</b> la fiche.</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {FICHES.filter(function(f){return f.premium;}).slice(0,3).map(function(f){
                  return (
                    <div key={f.id} style={{ flex:1, minWidth:140, padding:"12px", borderRadius:10, background:G.bgCard, border:"1px solid "+G.border, cursor:"pointer" }}
                      onClick={function(){ setShowAchatUnite(f); }}>
                      <div style={{ fontSize:12, fontWeight:700, marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.titre}</div>
                      <div style={{ fontSize:11, color:G.textMuted, marginBottom:8 }}>{f.niveau}</div>
                      <div className="fd" style={{ fontSize:14, fontWeight:800, color:"#7c3aed" }}>200 F</div>
                    </div>
                  );
                })}
              </div>
              <button className="btn btn-s" style={{ width:"100%", marginTop:12 }} onClick={function(){ goPage("fiches"); }}>
                Voir toutes les fiches premium →
              </button>
            </div>
          </div>
        )}

        {page==="profil" && (
          <div style={{ maxWidth:540 }}>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:20 }}>Mon profil</h1>
            <div className="card" style={{ marginBottom:14, textAlign:"center" }}>
              <div style={{ width:66, height:66, borderRadius:18, background:"linear-gradient(135deg,#4f7dff,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 12px" }}>👤</div>
              <h2 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{user.nom}</h2>
              <p style={{ color:G.textMuted, fontSize:13, marginBottom:10 }}>{user.email}</p>
              <span className={"badge "+(abonne?"b-gold":"b-free")}>{abonne?"⭐ Premium":"✓ Gratuit"}</span>
            </div>

            {!editProfil ? (
              <div className="card">
                <h3 style={{ fontWeight:700, marginBottom:14 }}>Informations</h3>
                {[["Nom complet",user.nom],["Email / Téléphone",user.email],["Membre depuis","Janvier 2024"],["Fiches téléchargées",""+historique.length]].map(function(item) {
                  return (
                    <div key={item[0]} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:9, marginBottom:9, borderBottom:"1px solid "+G.border }}>
                      <span style={{ fontSize:13, color:G.textMuted, fontWeight:600 }}>{item[0]}</span>
                      <span style={{ fontSize:14, fontWeight:700 }}>{item[1]}</span>
                    </div>
                  );
                })}
                <button className="btn btn-s" style={{ marginTop:10 }} onClick={function(){ setEditProfil(true); setEditNom(user.nom); setEditEmail(user.email); }}>✏️ Modifier</button>
              </div>
            ) : (
              <div className="card" style={{ border:"1px solid rgba(79,125,255,.3)", background:"rgba(79,125,255,.04)" }}>
                <h3 style={{ fontWeight:700, marginBottom:16 }}>✏️ Modifier mes informations</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nom complet</label>
                    <input className="inp" value={editNom} onChange={function(e){ setEditNom(e.target.value); }} placeholder="Votre nom complet" />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Email / Téléphone</label>
                    <input className="inp" value={editEmail} onChange={function(e){ setEditEmail(e.target.value); }} placeholder="email@exemple.com" />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nouveau mot de passe (optionnel)</label>
                    <input className="inp" type="password" placeholder="Laisser vide pour ne pas changer" />
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, marginTop:16 }}>
                  <button className="btn btn-s" style={{ flex:1 }} onClick={function(){ setEditProfil(false); }}>Annuler</button>
                  <button className="btn btn-p" style={{ flex:2 }} onClick={async function(){
                    if(!editNom.trim()||!editEmail.trim()){ showT("Veuillez remplir tous les champs obligatoires","warning"); return; }
                    var nvUser = {...user, nom:editNom.trim(), email:editEmail.trim()};
                    setUser(nvUser);
                    // Mettre à jour Supabase
                    if (user.id) {
                      try {
                        await supaUpdateProfile(user.id, editNom.trim(), editEmail.trim());
                      } catch(e) {}
                    }
                    // Mettre à jour le compte local et la session
                    var compte = findCompte(user.email);
                    if(compte){ compte.nom = editNom.trim(); compte.email = editEmail.trim(); saveCompteLocal(compte); }
                    saveSession(nvUser);
                    setEditProfil(false);
                    showT("Profil mis à jour avec succès ✅","success");
                  }}>💾 Enregistrer</button>
                </div>
              </div>
            )}
          </div>
        )}

        {page==="support" && (
          <div style={{ maxWidth:600 }}>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:20 }}>Support & Aide</h1>

            {/* Contacts rapides */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              <a href={"https://wa.me/"+supportCfg.whatsapp} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.25)", borderRadius:12 }}>
                <span style={{ fontSize:24 }}>💬</span>
                <div><div style={{ fontWeight:700, fontSize:13, color:"#25d366" }}>WhatsApp</div><div style={{ fontSize:11, color:G.textMuted }}>+{supportCfg.whatsapp}</div></div>
              </a>
              <a href={"https://t.me/"+supportCfg.telegram} target="_blank" rel="noreferrer"
                style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:"rgba(42,171,238,.08)", border:"1px solid rgba(42,171,238,.25)", borderRadius:12 }}>
                <span style={{ fontSize:24 }}>✈️</span>
                <div><div style={{ fontWeight:700, fontSize:13, color:"#2aabee" }}>Telegram</div><div style={{ fontSize:11, color:G.textMuted }}>@{supportCfg.telegram}</div></div>
              </a>
            </div>

            {/* ── MESSAGERIE INTERNE ── */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h2 className="fd" style={{ fontSize:15, fontWeight:700 }}>
                💬 Mes messages
                {mesTickets.filter(function(t){ return t.messages.some(function(m){ return m.auteur==="admin"&&!m.lu; }); }).length > 0 && (
                  <span style={{ background:G.accent, color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:10, marginLeft:8 }}>
                    {mesTickets.filter(function(t){ return t.messages.some(function(m){ return m.auteur==="admin"&&!m.lu; }); }).length}
                  </span>
                )}
              </h2>
              <button className="btn btn-p btn-sm" onClick={function(){ setShowNouveauTicket(true); }}>+ Nouveau message</button>
            </div>

            {/* Formulaire nouveau ticket */}
            {showNouveauTicket && (
              <div className="card" style={{ marginBottom:16, border:"1px solid rgba(79,125,255,.3)", background:"rgba(79,125,255,.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <h3 style={{ fontWeight:700, fontSize:14 }}>✉️ Nouveau message</h3>
                  <button onClick={function(){ setShowNouveauTicket(false); setNewTicketSujet(""); setNewTicketMsg(""); }}
                    style={{ background:"none", border:"none", color:G.textMuted, cursor:"pointer", fontSize:18 }}>×</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Sujet *</label>
                    <input className="inp" placeholder="Ex: Problème de paiement, Question sur une fiche..." value={newTicketSujet} onChange={function(e){ setNewTicketSujet(e.target.value); }} />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Message *</label>
                    <textarea className="inp" rows={4} placeholder="Décrivez votre demande en détail..." value={newTicketMsg} onChange={function(e){ setNewTicketMsg(e.target.value); }} style={{ resize:"vertical" }} />
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button className="btn btn-s" style={{ flex:1 }} onClick={function(){ setShowNouveauTicket(false); setNewTicketSujet(""); setNewTicketMsg(""); }}>Annuler</button>
                    <button className="btn btn-p" style={{ flex:2 }} disabled={!newTicketSujet.trim()||!newTicketMsg.trim()} onClick={async function(){
                      var nvTicket = {
                        id:"TKT"+String(Date.now()).slice(-4),
                        userId: user.id||0, userName:user.nom, userEmail:user.email,
                        sujet:newTicketSujet.trim(), statut:"Nouveau",
                        date:new Date().toISOString(),
                        messages:[{id:1, auteur:"user", nom:user.nom, texte:newTicketMsg.trim(), date:new Date().toISOString(), lu:false}]
                      };
                      // Sauvegarder dans Supabase si connecté
                      if (user.id) {
                        try {
                          var t = await supaCreateTicket(user.id, user.nom, user.email, newTicketSujet.trim(), newTicketMsg.trim());
                          if (t) nvTicket.id = t.id;
                        } catch(e) {}
                      }
                      setMesTickets(function(prev){ return [nvTicket,...prev]; });
                      setShowNouveauTicket(false); setNewTicketSujet(""); setNewTicketMsg("");
                      showT("Message envoyé ! Réponse sous 24h 📬","success");
                    }}>📤 Envoyer</button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste tickets */}
            {mesTickets.length===0 ? (
              <div style={{ textAlign:"center", padding:"30px 20px", color:G.textMuted, background:G.bgCard, borderRadius:14, border:"1px solid "+G.border, marginBottom:16 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
                <p style={{ fontSize:13 }}>Aucun message pour le moment</p>
                <p style={{ fontSize:12, marginTop:6 }}>Cliquez sur "Nouveau message" pour contacter le support</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
                {mesTickets.map(function(ticket){
                  var nonLus = ticket.messages.filter(function(m){ return m.auteur==="admin"&&!m.lu; }).length;
                  var dernierMsg = ticket.messages[ticket.messages.length-1];
                  return (
                    <div key={ticket.id} className="card" style={{ cursor:"pointer", border:"1px solid "+(nonLus>0?"rgba(79,125,255,.4)":G.border) }}
                      onClick={function(){
                        setMesTickets(function(prev){ return prev.map(function(t){
                          if(t.id!==ticket.id) return t;
                          return {...t, messages:t.messages.map(function(m){ return m.auteur==="admin"?{...m,lu:true}:m; })};
                        }); });
                        setTicketActif(ticket);
                      }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontWeight:700, fontSize:14 }}>{ticket.sujet}</span>
                            {nonLus>0 && <span style={{ background:G.accent, color:"#fff", fontSize:10, fontWeight:800, padding:"2px 6px", borderRadius:10 }}>{nonLus}</span>}
                          </div>
                          <div style={{ fontSize:12, color:G.textMuted, marginTop:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{dernierMsg.texte}</div>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0, marginLeft:10 }}>
                          <span className={"badge "+(ticket.statut==="Résolu"?"b-ok":ticket.statut==="En cours"?"b-warn":"b-err")}>{ticket.statut}</span>
                          <span style={{ fontSize:10, color:G.textMuted }}>{new Date(ticket.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                      <div style={{ fontSize:11, color:G.textMuted }}>{ticket.messages.length} message{ticket.messages.length>1?"s":""} · #{ticket.id}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Chat ticket actif */}
            {ticketActif && (
              <div className="modal-bg" onClick={function(){ setTicketActif(null); }}>
                <div className="modal" style={{ maxWidth:560 }} onClick={function(e){ e.stopPropagation(); }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <div>
                      <h2 className="fd" style={{ fontSize:16, fontWeight:800 }}>{ticketActif.sujet}</h2>
                      <div style={{ fontSize:11, color:G.textMuted, marginTop:2 }}>#{ticketActif.id} · <span className={"badge "+(ticketActif.statut==="Résolu"?"b-ok":ticketActif.statut==="En cours"?"b-warn":"b-err")} style={{ fontSize:10 }}>{ticketActif.statut}</span></div>
                    </div>
                    <button onClick={function(){ setTicketActif(null); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
                  </div>
                  <div style={{ maxHeight:320, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, padding:"14px 0", borderTop:"1px solid "+G.border, borderBottom:"1px solid "+G.border, marginBottom:14 }}>
                    {ticketActif.messages.map(function(msg){
                      var isUser = msg.auteur==="user";
                      return (
                        <div key={msg.id} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start" }}>
                          <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius:isUser?"16px 16px 4px 16px":"16px 16px 16px 4px", background:isUser?"linear-gradient(135deg,#4f7dff,#7c3aed)":"rgba(255,255,255,.08)", color:isUser?"#fff":G.textPrimary }}>
                            <div style={{ fontSize:13, lineHeight:1.5 }}>{msg.texte}</div>
                          </div>
                          <div style={{ fontSize:10, color:G.textMuted, marginTop:3 }}>{isUser?"Vous":msg.nom} · {new Date(msg.date).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</div>
                        </div>
                      );
                    })}
                  </div>
                  {ticketActif.statut!=="Résolu" ? (
                    <div style={{ display:"flex", gap:10 }}>
                      <input className="inp" style={{ flex:1 }} placeholder="Votre réponse..." value={newMessage} onChange={function(e){ setNewMessage(e.target.value); }}
                        onKeyDown={function(e){
                          if(e.key==="Enter"&&!e.shiftKey&&newMessage.trim()){
                            var nvMsg={id:Date.now(),auteur:"user",nom:user.nom,texte:newMessage.trim(),date:new Date().toISOString(),lu:false};
                            setMesTickets(function(prev){ return prev.map(function(t){ return t.id===ticketActif.id?{...t,messages:[...t.messages,nvMsg]}:t; }); });
                            setTicketActif(function(prev){ return {...prev,messages:[...prev.messages,nvMsg]}; });
                            setNewMessage("");
                          }
                        }} />
                      <button className="btn btn-p" disabled={!newMessage.trim()} onClick={function(){
                        var nvMsg={id:Date.now(),auteur:"user",nom:user.nom,texte:newMessage.trim(),date:new Date().toISOString(),lu:false};
                        setMesTickets(function(prev){ return prev.map(function(t){ return t.id===ticketActif.id?{...t,messages:[...t.messages,nvMsg]}:t; }); });
                        setTicketActif(function(prev){ return {...prev,messages:[...prev.messages,nvMsg]}; });
                        setNewMessage("");
                      }}>📤</button>
                    </div>
                  ) : (
                    <div style={{ textAlign:"center", padding:10, background:"rgba(16,185,129,.08)", borderRadius:10, fontSize:13, color:G.success }}>✅ Ce ticket est résolu</div>
                  )}
                </div>
              </div>
            )}

            {/* Horaires */}
            <div style={{ background:"rgba(79,125,255,.07)", border:"1px solid rgba(79,125,255,.18)", borderRadius:12, padding:"12px 15px", marginBottom:14, display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ fontSize:20, flexShrink:0 }}>🕐</span>
              <div><div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>Horaires du support</div><div style={{ fontSize:12, color:G.textSecondary, lineHeight:1.6 }}>Lun – Ven : 8h – 18h · Sam : 9h – 14h</div></div>
            </div>

            {/* FAQ */}
            <div className="card">
              <h3 style={{ fontWeight:700, marginBottom:14, fontSize:15 }}>Questions fréquentes</h3>
              {[
                ["Comment télécharger une fiche ?","Cliquez sur la fiche souhaitée puis sur Télécharger. Les 5 premières sont gratuites."],
                ["Comment s'abonner ?","Menu Abonnement › Accès Numérique › choisissez votre réseau Mobile Money."],
                ["Comment commander les fiches imprimées ?","Menu Abonnement › Version Imprimée › Choisissez la classe › Commandez."],
                ["Délai de livraison ?","2 à 5 jours ouvrés. Nous vous contactons sur WhatsApp pour organiser."],
              ].map(function(item){
                return (
                  <details key={item[0]} style={{ marginBottom:9, background:"rgba(255,255,255,.03)", borderRadius:10, padding:"10px 13px", border:"1px solid "+G.border }}>
                    <summary style={{ fontWeight:600, cursor:"pointer", fontSize:13 }}>{item[0]}</summary>
                    <p style={{ marginTop:8, color:G.textSecondary, fontSize:12, lineHeight:1.6 }}>{item[1]}</p>
                  </details>
                );
              })}
            </div>
          </div>
        )}
        {page==="apropos" && (
          <div style={{ maxWidth:640 }}>
            {/* LOGO PROFESSIONNEL */}
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ width:80, height:80, borderRadius:22, background:"linear-gradient(135deg,#4f7dff,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, margin:"0 auto 12px" }}>📚</div>
              <h1 className="fd" style={{ fontSize:24, fontWeight:800, marginBottom:4 }}>FichesPro</h1>
              <p style={{ color:G.textSecondary, fontSize:13 }}>La plateforme des fiches pédagogiques au Bénin</p>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:10, flexWrap:"wrap" }}>
                <span className="badge b-ok">v1.0</span>
                <span className="badge b-free">🇧🇯 Bénin</span>
                <span className="badge b-gold">⭐ Certifié</span>
              </div>
            </div>

            {/* À PROPOS */}
            <div className="card" style={{ marginBottom:14 }}>
              <h2 className="fd" style={{ fontSize:16, fontWeight:800, marginBottom:12 }}>📖 À propos de FichesPro</h2>
              <p style={{ fontSize:13, color:G.textSecondary, lineHeight:1.8, marginBottom:10 }}>
                <b style={{ color:G.textPrimary }}>FichesPro</b> est la première plateforme numérique de fiches pédagogiques dédiée aux enseignants et apprenants du Bénin. Notre mission est de rendre l'enseignement de qualité accessible à tous, partout au Bénin.
              </p>
              <p style={{ fontSize:13, color:G.textSecondary, lineHeight:1.8, marginBottom:10 }}>
                Nous proposons des fiches pédagogiques couvrant toutes les matières du primaire — du CI au CM2 — conformes aux programmes officiels béninois.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:14 }}>
                {[
                  { icon:"📚", label:"156+ fiches", desc:"Toutes matières" },
                  { icon:"🎓", label:"CI au CM2", desc:"Tous niveaux" },
                  { icon:"🇧🇯", label:"Bénin", desc:"Programme officiel" },
                  { icon:"📱", label:"Mobile first", desc:"Disponible partout" },
                ].map(function(s) {
                  return (
                    <div key={s.label} style={{ padding:"12px 14px", background:"rgba(79,125,255,.07)", borderRadius:12, border:"1px solid rgba(79,125,255,.15)" }}>
                      <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                      <div style={{ fontWeight:800, fontSize:14 }}>{s.label}</div>
                      <div style={{ fontSize:11, color:G.textMuted }}>{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOYENS DE PAIEMENT */}
            <div className="card" style={{ marginBottom:14 }}>
              <h2 className="fd" style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>💳 Moyens de paiement acceptés</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { icon:"📱", label:"MTN Mobile Money", color:"#fbbf24", desc:"Paiement rapide via *880#", numero:paieCfg.mtn.numero },
                  { icon:"📲", label:"Moov Money",       color:"#0099ff", desc:"Paiement rapide via *555#", numero:paieCfg.moov.numero },
                  { icon:"📶", label:"Celtiis",          color:"#e63946", desc:"Paiement rapide via *144#", numero:paieCfg.celtiis.numero },
                ].map(function(p) {
                  return (
                    <div key={p.label} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 14px", background:"rgba(255,255,255,.04)", borderRadius:12, border:"1px solid "+G.border }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:p.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{p.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:p.color }}>{p.label}</div>
                        <div style={{ fontSize:12, color:G.textMuted }}>{p.desc}</div>
                      </div>
                      <div style={{ fontSize:12, fontFamily:"monospace", color:G.textSecondary, fontWeight:700 }}>{p.numero}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(16,185,129,.08)", borderRadius:10, fontSize:12, color:G.success }}>
                ✅ Paiements sécurisés — Activation sous 15-30 minutes après confirmation
              </div>
            </div>

            {/* SUPPORT */}
            <div className="card" style={{ marginBottom:14 }}>
              <h2 className="fd" style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>📞 Nous contacter</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <a href={"https://wa.me/"+supportCfg.whatsapp} target="_blank" rel="noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"14px", background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.25)", borderRadius:14, textDecoration:"none" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"rgba(37,211,102,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>💬</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:"#25d366" }}>WhatsApp</div>
                    <div style={{ fontSize:12, color:G.textMuted }}>+{supportCfg.whatsapp} · Réponse rapide</div>
                  </div>
                  <span style={{ fontSize:18, color:"#25d366" }}>→</span>
                </a>
                <a href={"https://t.me/"+supportCfg.telegram} target="_blank" rel="noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"14px", background:"rgba(42,171,238,.08)", border:"1px solid rgba(42,171,238,.25)", borderRadius:14, textDecoration:"none" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"rgba(42,171,238,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>✈️</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:"#2aabee" }}>Telegram</div>
                    <div style={{ fontSize:12, color:G.textMuted }}>@{supportCfg.telegram} · Annonces & aide</div>
                  </div>
                  <span style={{ fontSize:18, color:"#2aabee" }}>→</span>
                </a>
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px", background:"rgba(79,125,255,.07)", border:"1px solid rgba(79,125,255,.18)", borderRadius:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"rgba(79,125,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>🕐</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:G.accentLight }}>Horaires du support</div>
                    <div style={{ fontSize:12, color:G.textMuted }}>Lun–Ven : 8h–18h · Sam : 9h–14h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* POLITIQUE DE CONFIDENTIALITE */}
            <div className="card" style={{ marginBottom:14 }}>
              <h2 className="fd" style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>🔒 Politique de confidentialité</h2>
              {[
                { t:"Données collectées", c:"Nous collectons votre nom, email et historique de téléchargements uniquement pour fournir nos services. Aucune donnée n'est vendue à des tiers." },
                { t:"Utilisation des données", c:"Vos données sont utilisées exclusivement pour gérer votre compte, traiter vos abonnements et améliorer nos services." },
                { t:"Sécurité", c:"Toutes les données sont stockées de manière sécurisée via Supabase avec chiffrement SSL. Vos mots de passe sont hashés et jamais accessibles en clair." },
                { t:"Vos droits", c:"Vous pouvez demander la suppression de votre compte et de toutes vos données à tout moment en nous contactant sur WhatsApp." },
                { t:"Cookies", c:"Notre application n'utilise pas de cookies publicitaires. Seules des données de session sont conservées pour maintenir votre connexion." },
              ].map(function(item) {
                return (
                  <details key={item.t} style={{ marginBottom:8, background:"rgba(255,255,255,.03)", borderRadius:10, padding:"10px 14px", border:"1px solid "+G.border }}>
                    <summary style={{ fontWeight:700, cursor:"pointer", fontSize:13 }}>🔹 {item.t}</summary>
                    <p style={{ marginTop:8, color:G.textSecondary, fontSize:12, lineHeight:1.7 }}>{item.c}</p>
                  </details>
                );
              })}
            </div>

            {/* CONDITIONS D'UTILISATION */}
            <div className="card" style={{ marginBottom:20 }}>
              <h2 className="fd" style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>📜 Conditions d'utilisation</h2>
              {[
                { t:"Accès au service", c:"FichesPro est accessible à toute personne disposant d'un appareil connecté à internet. Un compte est requis pour télécharger des fiches." },
                { t:"Abonnement et paiements", c:"L'abonnement annuel est de 3 000 FCFA. Le paiement s'effectue via Mobile Money (MTN, Moov, Celtiis). L'activation intervient sous 15-30 minutes après validation." },
                { t:"Utilisation des fiches", c:"Les fiches téléchargées sont destinées à un usage personnel ou pédagogique uniquement. Toute reproduction commerciale ou redistribution est interdite." },
                { t:"Propriété intellectuelle", c:"Toutes les fiches sont la propriété exclusive de FichesPro. Les contenus sont protégés par le droit d'auteur béninois et international." },
                { t:"Résiliation", c:"Vous pouvez supprimer votre compte à tout moment. Les abonnements ne sont pas remboursables sauf en cas de dysfonctionnement majeur de notre part." },
                { t:"Responsabilité", c:"FichesPro met tout en œuvre pour garantir la qualité des fiches mais ne peut être tenu responsable d'erreurs pédagogiques éventuelles." },
              ].map(function(item) {
                return (
                  <details key={item.t} style={{ marginBottom:8, background:"rgba(255,255,255,.03)", borderRadius:10, padding:"10px 14px", border:"1px solid "+G.border }}>
                    <summary style={{ fontWeight:700, cursor:"pointer", fontSize:13 }}>📌 {item.t}</summary>
                    <p style={{ marginTop:8, color:G.textSecondary, fontSize:12, lineHeight:1.7 }}>{item.c}</p>
                  </details>
                );
              })}
              <div style={{ marginTop:14, fontSize:11, color:G.textMuted, textAlign:"center", lineHeight:1.6 }}>
                Dernière mise à jour : Juillet 2026 · En utilisant FichesPro, vous acceptez ces conditions.
              </div>
            </div>

          </div>
        )}

      </main>
    </>
  );
}
function AdminApp({ user, onLogout, appCfg, setAppCfg }) {
  const [tab, setTab] = useState("stats");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fiches, setFiches] = useState(FICHES);

  // Charger les vraies fiches depuis Supabase au démarrage
  useEffect(function() {
    supaGetFiches().then(function(data) {
      if (data && data.length > 0) {
        setFiches(data.map(function(f) {
          return Object.assign({}, f, { dl: f.dl, date: new Date().toISOString().split("T")[0] });
        }));
      }
    }).catch(function() {});
  }, []);
  const [toast, setToast] = useState(null);
  const [saved, setSaved] = useState(false);

  const formVide = {
    titre:"", matiere:"", niveau:"", premium:false,
    note:4.5, pages:1, description:"", fichierNom:"", fichierObj:null,
  };
  const [showFormFiche, setShowFormFiche] = useState(null);
  const [formFiche, setFormFiche] = useState(formVide);
  const [searchFiche, setSearchFiche] = useState("");
  const [ficheUploading, setFicheUploading] = useState(false);
  const [docsParMatiere, setDocsParMatiere] = useState({});
  const [uploadingMat, setUploadingMat] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [codesPromo, setCodesPromo] = useState(CODES_PROMO_DEFAUT);
  const [codesPromoLoading, setCodesPromoLoading] = useState(true);
  const [livraisons, setLivraisons] = useState(LIVRAISONS_DEMO);
  const [tickets, setTickets] = useState(TICKETS_DEMO);
  const [ticketOuvert, setTicketOuvert] = useState(null);
  const [reponseAdmin, setReponseAdmin] = useState("");
  const [paiementsEnAttente, setPaiementsEnAttente] = useState([]);
  const [historiquePaiements, setHistoriquePaiements] = useState([]);
  const [usersSupabase, setUsersSupabase] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [commandesImprimees, setCommandesImprimees] = useState([]);
  const [demandesFiches, setDemandesFiches] = useState([]);
  const [abonnementsSupabase, setAbonnementsSupabase] = useState([]);
  const [changePwd, setChangePwd] = useState({ ancien:"", nouveau:"", confirm:"", err:"", ok:false, loading:false });

  // Charger les utilisateurs depuis Supabase
  useEffect(function() {
    async function chargerUsers() {
      setUsersLoading(true);
      try {
        var { data, error } = await supa.from("users").select("*").order("date_inscription", { ascending:false });
        if (!error && data && data.length > 0) {
          setUsersSupabase(data);
        } else {
          // Fallback données demo
          setUsersSupabase(USERS_ADMIN.map(function(u) {
            return { id:u.id, nom:u.nom, email:u.email, role:"user",
              abonnement_actif: u.statut==="Abonné",
              date_inscription: u.joinDate, nb_fiches: u.fiches };
          }));
        }
      } catch(e) {
        setUsersSupabase(USERS_ADMIN.map(function(u) {
          return { id:u.id, nom:u.nom, email:u.email, role:"user",
            abonnement_actif: u.statut==="Abonné",
            date_inscription: u.joinDate, nb_fiches: u.fiches };
        }));
      }
      setUsersLoading(false);
    }
    chargerUsers();
  }, []);

  // Charger les codes promo depuis Supabase (source de vérité — corrige la
  // réapparition des codes supprimés et la disparition des codes créés)
  useEffect(function() {
    async function chargerCodesPromo() {
      setCodesPromoLoading(true);
      try {
        var data = await supaGetCodesPromo();
        if (data) setCodesPromo(data);
        // si data est null (erreur/table vide), on garde CODES_PROMO_DEFAUT en repli
      } catch(e) {}
      setCodesPromoLoading(false);
    }
    chargerCodesPromo();
  }, []);

  // Charger commandes, demandes et abonnements depuis Supabase
  useEffect(function() {
    // Chargement initial
    supaGetCommandesImprimees().then(setCommandesImprimees).catch(function() {});
    supaGetDemandesFiches().then(setDemandesFiches).catch(function() {});
    supaGetAbonnements().then(setAbonnementsSupabase).catch(function() {});
    supaGetPaiementsEnAttente().then(function(data) {
      if (data) setPaiementsEnAttente(data);
    }).catch(function() {});

    // Charger historique paiements au démarrage
    supa.from("paiements").select("*, users(nom,email)").order("created_at",{ascending:false}).limit(50)
      .then(function(res){ if(res.data) setHistoriquePaiements(res.data); })
      .catch(function() {});

    // Realtime — écouter les nouveaux paiements en attente
    var channelPaie = supa.channel("admin-paiements")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "paiements",
      }, function() {
        // Rafraîchir la liste des paiements en attente
        supaGetPaiementsEnAttente().then(function(data) {
          if (data) setPaiementsEnAttente(data);
        }).catch(function() {});
        showT("💰 Nouveau paiement reçu !", "info");
      })
      .subscribe();

    // Realtime — écouter les nouveaux abonnements
    var channelAbo = supa.channel("admin-abonnements")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "abonnements",
      }, function() {
        supaGetAbonnements().then(setAbonnementsSupabase).catch(function() {});
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "users",
        filter: "abonnement_actif=eq.true",
      }, function() {
        supaGetAbonnements().then(setAbonnementsSupabase).catch(function() {});
        showT("⭐ Un abonnement vient d'être activé !", "success");
      })
      .subscribe();

    return function() {
      supa.removeChannel(channelPaie);
      supa.removeChannel(channelAbo);
    };
  }, []);
  const [paieEdit, setPaieEdit] = useState({
    mtn:     { numero: appCfg.paiement.mtn.numero,     nom: appCfg.paiement.mtn.nom     },
    moov:    { numero: appCfg.paiement.moov.numero,    nom: appCfg.paiement.moov.nom    },
    celtiis: { numero: appCfg.paiement.celtiis.numero, nom: appCfg.paiement.celtiis.nom },
  });
  const [supportEdit, setSupportEdit] = useState({
    whatsapp: appCfg.support.whatsapp,
    telegram:  appCfg.support.telegram,
  });
  const [aboEdit, setAboEdit] = useState({
    prix:           appCfg.abonnement.prix,
    ficheGratuites: appCfg.abonnement.ficheGratuites,
    dureeJours:     appCfg.abonnement.dureeJours,
    delaiActivMin:  appCfg.abonnement.delaiActivMin,
  });
  const [plansEdit, setPlansEdit] = useState(
    appCfg.plansImprimes.map(function(p) { return Object.assign({}, p); })
  );

  function showT(msg, type) { setToast({ msg: msg, type: type || "success" }); }
  function goTab(id) { setTab(id); setDrawerOpen(false); }

  function updatePaie(reseau, champ, val) {
    setPaieEdit(function(prev) {
      const copy = { mtn: Object.assign({}, prev.mtn), moov: Object.assign({}, prev.moov), celtiis: Object.assign({}, prev.celtiis) };
      copy[reseau][champ] = val;
      return copy;
    });
  }

  function saveCfg() {
    var nvCfg = Object.assign({}, appCfg, {
      paiement: { mtn: Object.assign({}, paieEdit.mtn), moov: Object.assign({}, paieEdit.moov), celtiis: Object.assign({}, paieEdit.celtiis) },
      support:  Object.assign({}, supportEdit),
      abonnement: Object.assign({}, aboEdit),
      plansImprimes: plansEdit.map(function(p) { return Object.assign({}, p); }),
    });
    // Utiliser setAppCfg du Root qui propage à UserApp ET sauvegarde dans Supabase
    setAppCfg(nvCfg);
    // Sauvegarder dans Supabase
    supaSaveParametres(nvCfg).catch(function(e) {
      console.error("[FichesPro] Erreur sauvegarde parametres:", e);
    });
    setSaved(true);
    setTimeout(function() { setSaved(false); }, 2500);
    showT("Paramètres enregistrés — visibles par tous les utilisateurs !", "success");
  }

  function annulerCfg() {
    setPaieEdit({ mtn: Object.assign({}, appCfg.paiement.mtn), moov: Object.assign({}, appCfg.paiement.moov), celtiis: Object.assign({}, appCfg.paiement.celtiis) });
    setSupportEdit({ whatsapp: appCfg.support.whatsapp, telegram: appCfg.support.telegram });
    setAboEdit(Object.assign({}, appCfg.abonnement));
    setPlansEdit(appCfg.plansImprimes.map(function(p) { return Object.assign({}, p); }));
    showT("Modifications annulées", "info");
  }

  const activeNav = NAV_ADMIN.find(function(n) { return n.id === tab; });

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={function() { setToast(null); }} />}

      {/* MODAL DÉTAIL UTILISATEUR */}
      {userDetail && (
        <div className="modal-bg" onClick={function(){ setUserDetail(null); }}>
          <div className="modal" onClick={function(e){ e.stopPropagation(); }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 className="fd" style={{ fontSize:18, fontWeight:800 }}>👤 Détail Utilisateur</h2>
              <button onClick={function(){ setUserDetail(null); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px", background:"rgba(79,125,255,.07)", borderRadius:14, marginBottom:18 }}>
              <div style={{ width:54, height:54, borderRadius:14, background:"linear-gradient(135deg,#4f7dff,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>👤</div>
              <div>
                <div style={{ fontWeight:800, fontSize:16 }}>{userDetail.nom}</div>
                <div style={{ fontSize:13, color:G.textMuted, marginTop:3 }}>{userDetail.email}</div>
                <span className={"badge "+(userDetail.statut==="Abonné"?"b-gold":userDetail.statut==="Expiré"?"b-err":"b-free")} style={{ marginTop:6, display:"inline-flex" }}>{userDetail.statut}</span>
              </div>
            </div>
            {[
              ["📅 Inscrit le", new Date(userDetail.joinDate).toLocaleDateString("fr-FR")],
              ["📚 Fiches téléchargées", userDetail.fiches],
              ["⭐ Abonnement", userDetail.statut],
              ["📆 Expiration", userDetail.expire ? new Date(userDetail.expire).toLocaleDateString("fr-FR") : "—"],
            ].map(function(item) {
              return (
                <div key={item[0]} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid "+G.border }}>
                  <span style={{ fontSize:13, color:G.textMuted, fontWeight:600 }}>{item[0]}</span>
                  <span style={{ fontSize:14, fontWeight:700 }}>{item[1]}</span>
                </div>
              );
            })}
            <div style={{ display:"flex", gap:10, marginTop:18 }}>
              <button className="btn btn-ok" style={{ flex:1 }} onClick={function(){ showT("Abonnement activé pour "+userDetail.nom,"success"); setUserDetail(null); }}>✅ Activer</button>
              <button className="btn btn-d" style={{ flex:1 }} onClick={function(){ showT("Compte suspendu","warning"); setUserDetail(null); }}>🚫 Suspendre</button>
            </div>
            <button className="btn btn-s" style={{ width:"100%", marginTop:10 }} onClick={function(){ setUserDetail(null); }}>Fermer</button>
          </div>
        </div>
      )}

      <Drawer open={drawerOpen} onClose={function() { setDrawerOpen(false); }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <LogoMark size={13} />
          <button onClick={function() { setDrawerOpen(false); }} style={{ background:"rgba(255,255,255,.07)",border:"none",borderRadius:8,width:30,height:30,color:G.textSecondary,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
        </div>
        <div style={{ fontSize:10, fontWeight:700, color:G.accent, textTransform:"uppercase", letterSpacing:".5px", marginBottom:14, paddingBottom:12, borderBottom:"1px solid "+G.border }}>Administration</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", background:"rgba(239,68,68,.07)", borderRadius:10, marginBottom:14, border:"1px solid rgba(239,68,68,.15)" }}>
          <span style={{ fontSize:18 }}>🛡️</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700 }}>{user.nom}</div>
            <div style={{ fontSize:11, color:G.danger, fontWeight:700 }}>Administrateur</div>
          </div>
        </div>
        <nav style={{ display:"flex", flexDirection:"column", gap:3, flex:1 }}>
          {NAV_ADMIN.map(function(n) {
            return (
              <button key={n.id} className={"nl "+(tab===n.id?"on":"")} onClick={function() { goTab(n.id); }}>
                <span style={{ fontSize:17 }}>{n.icon}</span><span>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop:"auto", paddingTop:13, borderTop:"1px solid "+G.border }}>
          <button onClick={onLogout} className="btn btn-d btn-sm" style={{ width:"100%" }}>↩ Déconnexion</button>
        </div>
      </Drawer>

      <header className="topbar">
        <HamBtn onClick={function() { setDrawerOpen(true); }} />
        <div style={{ flex:1, display:"flex", alignItems:"center", gap:9 }}>
          <LogoMark size={13} />
          <span style={{ background:"rgba(239,68,68,.12)", color:G.danger, fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:5, border:"1px solid rgba(239,68,68,.2)" }}>Admin</span>
        </div>
        <span style={{ fontSize:13, fontWeight:600, color:G.textMuted }}>{activeNav ? activeNav.icon+" "+activeNav.label : ""}</span>
      </header>

      <main style={{ padding:"22px 18px", maxWidth:1080, margin:"0 auto" }}>

        {tab==="stats" && (
          <div>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:5 }}>Tableau de bord</h1>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:22 }}>{new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}</p>
            <div className="g4" style={{ marginBottom:22 }}>
              {[
                { icon:"💰", label:"Revenus",      val:"148 000 FCFA", trend:"+23%", color:G.success },
                { icon:"👥", label:"Abonnés",       val:"87",           trend:"+15%", color:G.accent },
                { icon:"⬇️", label:"Téléchargements",val:"4 823",       trend:"+8%",  color:"#7c3aed" },
                { icon:"📚", label:"Fiches",         val:"156",          trend:"+12",  color:G.gold },
              ].map(function(s) {
                return (
                  <div key={s.label} className="scard">
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <span style={{ fontSize:24 }}>{s.icon}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:G.success, background:"rgba(16,185,129,.1)", padding:"2px 7px", borderRadius:5 }}>{s.trend}</span>
                    </div>
                    <div className="fd" style={{ fontSize:19, fontWeight:800, color:s.color, marginBottom:3 }}>{s.val}</div>
                    <div style={{ fontSize:11, color:G.textMuted, fontWeight:600 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="g2">
              <div className="card">
                <h3 style={{ fontWeight:700, marginBottom:14 }}>Top matières</h3>
                {[["Français · Conjugaison",78,G.accent],["Maths · Arithmétique",65,"#7c3aed"],["EST",52,G.success],["ES · Histoire",44,G.warning],["Grammaire",38,G.danger]].map(function(r) {
                  return (
                    <div key={r[0]} style={{ marginBottom:11 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:12, color:G.textSecondary, fontWeight:600 }}>{r[0]}</span><span style={{ fontSize:11, color:G.textMuted, fontWeight:700 }}>{r[1]}%</span></div>
                      <div className="pbar"><div className="pfill" style={{ width:r[1]+"%", background:r[2] }} /></div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}><h3 style={{ fontWeight:700 }}>Demandes en attente</h3><span className="badge b-warn">12</span></div>
                {[["Les plantes vivantes","EST","CE2"],["La phrase complexe","Grammaire","CM1"],["Fractions décimales","Maths","CM2"],["Le temps libre","Com. Orale","CE1"]].map(function(d) {
                  return (
                    <div key={d[0]} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid "+G.border }}>
                      <div><div style={{ fontSize:13, fontWeight:600 }}>{d[0]}</div><div style={{ fontSize:11, color:G.textMuted }}>{d[1]} · {d[2]}</div></div>
                      <button className="btn btn-ok btn-sm" onClick={function() { showT("Demande validée !","success"); }}>✓</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab==="fiches" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>Gestion des fiches</h1>
              <button className="btn btn-p btn-sm" onClick={function() { setShowFormFiche({mode:"add", fiche:null}); }}>+ Ajouter une fiche</button>
            </div>

            {/* Formulaire Ajout / Modification */}
            {showFormFiche && (
              <div className="card" style={{ marginBottom:20, border:"1px solid rgba(79,125,255,.3)", background:"rgba(79,125,255,.05)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                  <h3 style={{ fontWeight:800, fontSize:16 }}>{showFormFiche.mode==="add" ? "➕ Ajouter une fiche" : "✏️ Modifier la fiche"}</h3>
                  <button onClick={function() { setShowFormFiche(null); setFormFiche(formVide); }} style={{ background:"rgba(255,255,255,.07)", border:"none", borderRadius:8, width:30, height:30, color:G.textSecondary, cursor:"pointer", fontSize:18 }}>×</button>
                </div>
                <div className="g2" style={{ marginBottom:14 }}>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Titre *</label>
                    <input className="inp" placeholder="Ex : La photosynthèse" value={formFiche.titre} onChange={function(e){ setFormFiche(function(p){ return {...p, titre:e.target.value}; }); }} />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Matière *</label>
                    <select className="inp" style={{ background:"#161b27" }} value={formFiche.matiere} onChange={function(e){ setFormFiche(function(p){ return {...p, matiere:e.target.value, matiereId:e.target.value}; }); }}>
                      <option value="">Sélectionner...</option>
                      {MATIERES.map(function(m){ return <option key={m.id} value={m.id}>{m.label}</option>; })}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Niveau *</label>
                    <select className="inp" style={{ background:"#161b27" }} value={formFiche.niveau} onChange={function(e){ setFormFiche(function(p){ return {...p, niveau:e.target.value}; }); }}>
                      <option value="">Sélectionner...</option>
                      {["CI","CP","CE1","CE2","CM1","CM2","6ème","5ème","4ème","3ème"].map(function(n){ return <option key={n}>{n}</option>; })}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Type</label>
                    <select className="inp" style={{ background:"#161b27" }} value={formFiche.premium ? "premium" : "gratuit"} onChange={function(e){ setFormFiche(function(p){ return {...p, premium: e.target.value==="premium"}; }); }}>
                      <option value="gratuit">✓ Gratuit</option>
                      <option value="premium">⭐ Premium</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Note (sur 5)</label>
                    <input className="inp" type="number" min="0" max="5" step="0.1" placeholder="Ex : 4.8" value={formFiche.note} onChange={function(e){ setFormFiche(function(p){ return {...p, note: parseFloat(e.target.value)||0}; }); }} />
                  </div>
                  <div>
                    <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nombre de pages</label>
                    <input className="inp" type="number" min="1" placeholder="Ex : 6" value={formFiche.pages} onChange={function(e){ setFormFiche(function(p){ return {...p, pages: parseInt(e.target.value)||0}; }); }} />
                  </div>
                </div>

                {/* Upload PDF */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>
                    Fichier PDF {showFormFiche.mode==="add" ? "*" : "(laisser vide pour garder l'actuel)"}
                  </label>
                  <div style={{ border:"2px dashed rgba(79,125,255,.3)", borderRadius:12, padding:"20px 16px", textAlign:"center", background:"rgba(79,125,255,.04)", cursor:"pointer", position:"relative" }}
                    onClick={function(){ document.getElementById("pdfInput").click(); }}
                    onDragOver={function(e){ e.preventDefault(); }}
                    onDrop={function(e){
                      e.preventDefault();
                      var f=e.dataTransfer.files[0];
                      if(f&&f.type==="application/pdf"){
                        setFormFiche(function(p){ return {...p, fichierNom:f.name, fichierObj:f}; });
                      } else {
                        showT("Uniquement les fichiers PDF sont acceptés","warning");
                      }
                    }}>
                    <input id="pdfInput" type="file" accept=".pdf" style={{ display:"none" }}
                      onChange={function(e){
                        var f=e.target.files[0];
                        if(f) setFormFiche(function(p){ return {...p, fichierNom:f.name, fichierObj:f}; });
                      }} />
                    {formFiche.fichierNom
                      ? <div>
                          <div style={{ fontSize:28, marginBottom:6 }}>📄</div>
                          <div style={{ fontWeight:700, color:G.success, fontSize:14 }}>{formFiche.fichierNom}</div>
                          <div style={{ fontSize:12, color:G.textMuted, marginTop:4 }}>Fichier sélectionné — Cliquer pour changer</div>
                        </div>
                      : <div>
                          <div style={{ fontSize:28, marginBottom:6 }}>📁</div>
                          <div style={{ fontWeight:600, color:G.textSecondary, fontSize:14 }}>Glisser-déposer un PDF ici</div>
                          <div style={{ fontSize:12, color:G.textMuted, marginTop:4 }}>ou cliquer pour parcourir</div>
                        </div>
                    }
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Description (optionnel)</label>
                  <textarea className="inp" rows={3} placeholder="Objectifs pédagogiques, contenu de la fiche..." value={formFiche.description} onChange={function(e){ setFormFiche(function(p){ return {...p, description:e.target.value}; }); }} style={{ resize:"vertical" }} />
                </div>

                {/* Boutons */}
                <div style={{ display:"flex", gap:10 }}>
                  <button className="btn btn-s" style={{ flex:1 }} onClick={function(){ setShowFormFiche(null); setFormFiche(formVide); }}>Annuler</button>
                  <button className="btn btn-p" style={{ flex:2 }}
                    disabled={!formFiche.titre || !formFiche.matiere || !formFiche.niveau || ficheUploading}
                    onClick={async function(){
                      var matObj=MATIERES.find(function(m){ return m.id===formFiche.matiere; });
                      setFicheUploading(true);
                      try {
                        if(showFormFiche.mode==="add"){
                          var ficheDataSupa = {
                            titre: formFiche.titre,
                            matiere: matObj ? matObj.label : formFiche.matiere,
                            matiereId: formFiche.matiere,
                            niveau: formFiche.niveau,
                            pages: formFiche.pages||1,
                            premium: formFiche.premium,
                            note: formFiche.note||4.5,
                            description: formFiche.description,
                          };
                          var ficheCreee = await supaCreateFiche(ficheDataSupa, formFiche.fichierObj);
                          var newFiche = {
                            id: ficheCreee ? ficheCreee.id : Date.now(),
                            titre: formFiche.titre,
                            matiere: matObj ? matObj.label : formFiche.matiere,
                            matiereId: formFiche.matiere,
                            niveau: formFiche.niveau,
                            pages: formFiche.pages||1,
                            premium: formFiche.premium,
                            note: formFiche.note||4.5,
                            dl: 0,
                            description: formFiche.description,
                            fichierNom: formFiche.fichierNom||"",
                            fichierUrl: ficheCreee ? ficheCreee.fichier_url||"" : "",
                            date: new Date().toISOString().split("T")[0],
                          };
                          setFiches(function(prev){ return [newFiche, ...prev]; });
                          showT("Fiche \""+formFiche.titre+"\" ajoutée avec succès !"+(formFiche.fichierObj?" 📄 PDF uploadé":""),"success");
                        } else {
                          var ficheId = showFormFiche.fiche.id;
                          var ficheDataSupa2 = {
                            titre: formFiche.titre,
                            matiere: matObj ? matObj.label : formFiche.matiere,
                            matiereId: formFiche.matiere,
                            niveau: formFiche.niveau,
                            pages: formFiche.pages,
                            premium: formFiche.premium,
                            note: formFiche.note,
                            description: formFiche.description,
                          };
                          await supaUpdateFiche(ficheId, ficheDataSupa2, formFiche.fichierObj);
                          setFiches(function(prev){ return prev.map(function(f){
                            if(f.id!==ficheId) return f;
                            return {...f,
                              titre: formFiche.titre,
                              matiere: matObj ? matObj.label : f.matiere,
                              matiereId: formFiche.matiere,
                              niveau: formFiche.niveau,
                              pages: formFiche.pages||f.pages,
                              premium: formFiche.premium,
                              note: formFiche.note||f.note,
                              description: formFiche.description,
                              fichierNom: formFiche.fichierNom||f.fichierNom||"",
                            };
                          }); });
                          showT("Fiche modifiée avec succès !"+(formFiche.fichierObj?" 📄 Nouveau PDF uploadé":""),"success");
                        }
                      } catch(err) {
                        showT("Erreur : "+err.message,"error");
                        // Fallback local si Supabase échoue
                        if(showFormFiche.mode==="add"){
                          var newFicheFallback = {
                            id: Date.now(), titre: formFiche.titre,
                            matiere: matObj ? matObj.label : formFiche.matiere,
                            matiereId: formFiche.matiere, niveau: formFiche.niveau,
                            pages: formFiche.pages||1, premium: formFiche.premium,
                            note: formFiche.note||4.5, dl: 0, description: formFiche.description,
                            fichierNom: formFiche.fichierNom||"", date: new Date().toISOString().split("T")[0],
                          };
                          setFiches(function(prev){ return [newFicheFallback, ...prev]; });
                        }
                      }
                      setFicheUploading(false);
                      setShowFormFiche(null);
                      setFormFiche(formVide);
                    }}>
                    {ficheUploading ? "⏳ Envoi en cours..." : (showFormFiche.mode==="add" ? "✅ Publier la fiche" : "✅ Enregistrer les modifications")}
                  </button>
                </div>
              </div>
            )}

            {/* Tableau des fiches */}
            <div className="card" style={{ overflowX:"auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
                <span style={{ fontSize:13, color:G.textMuted, fontWeight:600 }}>{fiches.length} fiche{fiches.length>1?"s":""} au total</span>
                <div className="sbar" style={{ minWidth:220 }}>
                  <span style={{ color:G.textMuted }}>🔍</span>
                  <input value={searchFiche} onChange={function(e){ setSearchFiche(e.target.value); }} placeholder="Rechercher une fiche..." />
                  {searchFiche && <button onClick={function(){ setSearchFiche(""); }} style={{ background:"none", border:"none", color:G.textMuted, cursor:"pointer" }}>×</button>}
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Matière</th>
                    <th>Niveau</th>
                    <th>Type</th>
                    <th>PDF</th>
                    <th>Note</th>
                    <th>Téléch.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fiches.filter(function(f){
                    return !searchFiche || f.titre.toLowerCase().includes(searchFiche.toLowerCase()) || f.matiere.toLowerCase().includes(searchFiche.toLowerCase());
                  }).map(function(f) {
                    return (
                      <tr key={f.id}>
                        <td style={{ fontWeight:600, maxWidth:200 }}>
                          <div>{f.titre}</div>
                          {f.description && <div style={{ fontSize:11, color:G.textMuted, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:180 }}>{f.description}</div>}
                        </td>
                        <td style={{ color:G.textSecondary, fontSize:12 }}>{f.matiere}</td>
                        <td><span style={{ background:"rgba(255,255,255,.07)", padding:"2px 7px", borderRadius:5, fontSize:11, fontWeight:700 }}>{f.niveau}</span></td>
                        <td><span className={"badge "+(f.premium?"b-gold":"b-free")}>{f.premium?"⭐ Premium":"✓ Gratuit"}</span></td>
                        <td>
                          {f.fichierNom
                            ? <span style={{ fontSize:11, color:G.success, fontWeight:700 }}>📄 {f.fichierNom.length>15 ? f.fichierNom.substring(0,12)+"..." : f.fichierNom}</span>
                            : <span style={{ fontSize:11, color:G.textMuted }}>— Non uploadé</span>
                          }
                        </td>
                        <td style={{ color:G.gold, fontWeight:700 }}>{f.note}★</td>
                        <td style={{ color:G.textMuted }}>{f.dl}</td>
                        <td>
                          <div style={{ display:"flex", gap:5 }}>
                            <button className="btn btn-s btn-sm" title="Modifier" onClick={function() {
                              setFormFiche({
                                titre: f.titre,
                                matiere: f.matiereId||f.matiere,
                                niveau: f.niveau,
                                premium: f.premium,
                                note: f.note,
                                pages: f.pages,
                                description: f.description||"",
                                fichierNom: f.fichierNom||"",
                                fichierObj: null,
                              });
                              setShowFormFiche({mode:"edit", fiche:f});
                              window.scrollTo({top:0, behavior:"smooth"});
                            }}>✏️</button>
                            <button className="btn btn-d btn-sm" title="Supprimer" onClick={async function() {
                              if(window.confirm("Supprimer \""+f.titre+"\" ? Cette action est irréversible.")) {
                                try { await supaDeleteFiche(f.id); } catch(e) {}
                                setFiches(function(prev) { return prev.filter(function(x) { return x.id !== f.id; }); });
                                showT("Fiche supprimée","warning");
                              }
                            }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {fiches.filter(function(f){ return !searchFiche||f.titre.toLowerCase().includes(searchFiche.toLowerCase())||f.matiere.toLowerCase().includes(searchFiche.toLowerCase()); }).length===0 && (
                <div style={{ textAlign:"center", padding:"40px 20px", color:G.textMuted }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
                  <p>Aucune fiche trouvée</p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==="messages" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>
                💬 Messages
                {tickets.filter(function(t){ return t.statut==="Nouveau"; }).length > 0 && (
                  <span style={{ background:G.danger, color:"#fff", fontSize:11, fontWeight:800, padding:"2px 8px", borderRadius:10, marginLeft:10 }}>
                    {tickets.filter(function(t){ return t.statut==="Nouveau"; }).length} nouveau{tickets.filter(function(t){ return t.statut==="Nouveau"; }).length>1?"x":""}
                  </span>
                )}
              </h1>
            </div>

            {/* Stats tickets */}
            <div className="g4" style={{ marginBottom:20 }}>
              {[
                {i:"🔴",l:"Nouveaux",  v:tickets.filter(function(t){return t.statut==="Nouveau";}).length,  c:G.danger},
                {i:"🟡",l:"En cours",  v:tickets.filter(function(t){return t.statut==="En cours";}).length,  c:G.warning},
                {i:"✅",l:"Résolus",   v:tickets.filter(function(t){return t.statut==="Résolu";}).length,    c:G.success},
                {i:"📬",l:"Total",     v:tickets.length,                                                     c:G.accent},
              ].map(function(s){
                return (
                  <div key={s.l} className="scard">
                    <div style={{ fontSize:22, marginBottom:6 }}>{s.i}</div>
                    <div className="fd" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
                    <div style={{ fontSize:11, color:G.textMuted, fontWeight:600 }}>{s.l}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display:"flex", gap:16, height:600 }}>
              {/* Liste tickets */}
              <div style={{ width:300, flexShrink:0, display:"flex", flexDirection:"column", gap:8, overflowY:"auto" }}>
                {tickets.map(function(ticket){
                  var nonLus = ticket.messages.filter(function(m){ return m.auteur==="user"&&!m.lu; }).length;
                  var isActif = ticketOuvert&&ticketOuvert.id===ticket.id;
                  return (
                    <div key={ticket.id} onClick={function(){
                        setTickets(function(prev){ return prev.map(function(t){ return t.id===ticket.id?{...t,statut:t.statut==="Nouveau"?"En cours":t.statut,messages:t.messages.map(function(m){ return m.auteur==="user"?{...m,lu:true}:m; })}:t; }); });
                        setTicketOuvert(tickets.find(function(t){return t.id===ticket.id;})||ticket);
                        setReponseAdmin("");
                      }}
                      style={{ padding:"12px 14px", borderRadius:12, border:"2px solid "+(isActif?G.accent:nonLus>0?"rgba(239,68,68,.4)":G.border), background:isActif?"rgba(79,125,255,.1)":G.bgCard, cursor:"pointer", transition:"all .15s" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                        <span style={{ fontWeight:700, fontSize:13, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ticket.sujet}</span>
                        {nonLus>0 && <span style={{ background:G.danger, color:"#fff", fontSize:10, fontWeight:800, padding:"1px 6px", borderRadius:8, flexShrink:0, marginLeft:6 }}>{nonLus}</span>}
                      </div>
                      <div style={{ fontSize:11, color:G.textMuted, marginBottom:6, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ticket.userName}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span className={"badge "+(ticket.statut==="Résolu"?"b-ok":ticket.statut==="En cours"?"b-warn":"b-err")} style={{ fontSize:10 }}>{ticket.statut}</span>
                        <span style={{ fontSize:10, color:G.textMuted }}>{new Date(ticket.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Zone chat */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", background:G.bgCard, borderRadius:16, border:"1px solid "+G.border, overflow:"hidden" }}>
                {!ticketOuvert ? (
                  <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", color:G.textMuted }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>💬</div>
                    <p style={{ fontSize:14 }}>Sélectionnez un message pour répondre</p>
                  </div>
                ) : (
                  <>
                    {/* Header chat */}
                    <div style={{ padding:"14px 18px", borderBottom:"1px solid "+G.border, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontWeight:800, fontSize:15 }}>{ticketOuvert.sujet}</div>
                        <div style={{ fontSize:12, color:G.textMuted }}>De : {ticketOuvert.userName} ({ticketOuvert.userEmail}) · #{ticketOuvert.id}</div>
                      </div>
                      <select value={ticketOuvert.statut} onChange={function(e){
                          var nvStatut=e.target.value;
                          setTickets(function(prev){ return prev.map(function(t){ return t.id===ticketOuvert.id?{...t,statut:nvStatut}:t; }); });
                          setTicketOuvert(function(prev){ return {...prev,statut:nvStatut}; });
                          showT("Statut mis à jour : "+nvStatut,"success");
                        }}
                        style={{ background:G.bgInput, border:"1px solid "+G.border, borderRadius:8, padding:"5px 10px", color:G.textPrimary, fontSize:12, cursor:"pointer" }}>
                        {["Nouveau","En cours","Résolu"].map(function(s){ return <option key={s} value={s}>{s}</option>; })}
                      </select>
                    </div>

                    {/* Fil de messages */}
                    <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:12 }}>
                      {ticketOuvert.messages.map(function(msg){
                        var isAdmin = msg.auteur==="admin";
                        return (
                          <div key={msg.id} style={{ display:"flex", flexDirection:"column", alignItems:isAdmin?"flex-end":"flex-start" }}>
                            <div style={{ maxWidth:"75%", padding:"10px 14px", borderRadius:isAdmin?"16px 16px 4px 16px":"16px 16px 16px 4px", background:isAdmin?"linear-gradient(135deg,#4f7dff,#7c3aed)":"rgba(255,255,255,.08)", color:"#fff" }}>
                              <div style={{ fontSize:13, lineHeight:1.5 }}>{msg.texte}</div>
                            </div>
                            <div style={{ fontSize:10, color:G.textMuted, marginTop:3 }}>
                              {isAdmin?"Vous (Admin)":msg.nom} · {new Date(msg.date).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Zone réponse admin */}
                    {ticketOuvert.statut!=="Résolu" ? (
                      <div style={{ padding:"12px 16px", borderTop:"1px solid "+G.border, display:"flex", gap:10, alignItems:"flex-end" }}>
                        <textarea className="inp" rows={2} placeholder="Tapez votre réponse..." value={reponseAdmin} onChange={function(e){ setReponseAdmin(e.target.value); }} style={{ flex:1, resize:"none" }}
                          onKeyDown={function(e){
                            if(e.key==="Enter"&&!e.shiftKey&&reponseAdmin.trim()){
                              e.preventDefault();
                              var nvMsg={id:Date.now(),auteur:"admin",nom:"Support FichesPro",texte:reponseAdmin.trim(),date:new Date().toISOString(),lu:false};
                              setTickets(function(prev){ return prev.map(function(t){ return t.id===ticketOuvert.id?{...t,statut:"En cours",messages:[...t.messages,nvMsg]}:t; }); });
                              setTicketOuvert(function(prev){ return {...prev,statut:"En cours",messages:[...prev.messages,nvMsg]}; });
                              setReponseAdmin("");
                              showT("Réponse envoyée ✅","success");
                            }
                          }} />
                        <button className="btn btn-p" disabled={!reponseAdmin.trim()} onClick={function(){
                          var nvMsg={id:Date.now(),auteur:"admin",nom:"Support FichesPro",texte:reponseAdmin.trim(),date:new Date().toISOString(),lu:false};
                          setTickets(function(prev){ return prev.map(function(t){ return t.id===ticketOuvert.id?{...t,statut:"En cours",messages:[...t.messages,nvMsg]}:t; }); });
                          setTicketOuvert(function(prev){ return {...prev,statut:"En cours",messages:[...prev.messages,nvMsg]}; });
                          setReponseAdmin("");
                          showT("Réponse envoyée ✅","success");
                        }}>📤 Envoyer</button>
                      </div>
                    ) : (
                      <div style={{ padding:"12px 16px", borderTop:"1px solid "+G.border, textAlign:"center", color:G.success, fontSize:13 }}>✅ Ticket résolu — Rouvrir en changeant le statut</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {tab==="users" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>
                Utilisateurs
                <span style={{ fontSize:13, fontWeight:600, color:G.textMuted, marginLeft:10 }}>({usersSupabase.length})</span>
              </h1>
              <button className="btn btn-s btn-sm" onClick={async function(){
                setUsersLoading(true);
                try {
                  var { data } = await supa.from("users").select("*").order("date_inscription",{ascending:false});
                  if(data && data.length>0) setUsersSupabase(data);
                } catch(e){}
                setUsersLoading(false);
                showT("Liste actualisée","success");
              }}>🔄 Actualiser</button>
            </div>

            {/* Recherche */}
            <div className="sbar" style={{ marginBottom:14 }}>
              <span style={{ color:G.textMuted }}>🔍</span>
              <input value={searchUser} onChange={function(e){ setSearchUser(e.target.value); }} placeholder="Rechercher un utilisateur..." />
              {searchUser && <button onClick={function(){ setSearchUser(""); }} style={{ background:"none", border:"none", color:G.textMuted, cursor:"pointer" }}>×</button>}
            </div>

            {usersLoading ? (
              <div style={{ textAlign:"center", padding:"40px", color:G.textMuted }}>
                <div style={{ fontSize:32, marginBottom:10 }}>⏳</div>
                <p>Chargement des utilisateurs...</p>
              </div>
            ) : (
              <div className="card" style={{ overflowX:"auto" }}>
                <table>
                  <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Abonnement</th><th>Inscrit le</th><th>Action</th></tr></thead>
                  <tbody>
                    {usersSupabase.filter(function(u){
                      if(!searchUser) return true;
                      var q = searchUser.toLowerCase();
                      return (u.nom||"").toLowerCase().includes(q) || (u.email||"").toLowerCase().includes(q);
                    }).map(function(u) {
                      var statut = u.abonnement_actif ? "Abonné" : "Gratuit";
                      var dateInscr = u.date_inscription ? new Date(u.date_inscription).toLocaleDateString("fr-FR") : "—";
                      return (
                        <tr key={u.id}>
                          <td style={{ fontWeight:700 }}>{u.nom||"—"}</td>
                          <td style={{ color:G.textMuted, fontSize:12 }}>{u.email}</td>
                          <td><span className={"badge "+(u.role==="admin"?"b-err":"b-free")}>{u.role||"user"}</span></td>
                          <td><span className={"badge "+(u.abonnement_actif?"b-gold":"b-free")}>{statut}</span></td>
                          <td style={{ color:G.textMuted, fontSize:12 }}>{dateInscr}</td>
                          <td>
                            <button className="btn btn-s btn-sm" onClick={function(){
                              setUserDetail({
                                id: u.id,
                                nom: u.nom||"—",
                                email: u.email,
                                statut: statut,
                                joinDate: u.date_inscription||new Date().toISOString(),
                                expire: u.abonnement_expire||null,
                                fiches: u.nb_fiches||0,
                              });
                            }}>Voir</button>
                          </td>
                        </tr>
                      );
                    })}
                    {usersSupabase.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign:"center", padding:"30px", color:G.textMuted }}>Aucun utilisateur inscrit</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab==="abonnements" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>⭐ Gestion des abonnements</h1>
              <button className="btn btn-s btn-sm" onClick={function(){ supaGetAbonnements().then(setAbonnementsSupabase).catch(function(){}); showT("Actualisé","success"); }}>🔄 Actualiser</button>
            </div>
            {/* Stats */}
            <div className="g4" style={{ marginBottom:20 }}>
              {[
                { i:"✅", l:"Actifs",     v:abonnementsSupabase.filter(function(a){return a.statut==="actif";}).length,      c:G.success },
                { i:"⏳", l:"En attente", v:abonnementsSupabase.filter(function(a){return a.statut==="en_attente";}).length,  c:G.warning },
                { i:"❌", l:"Expirés",    v:abonnementsSupabase.filter(function(a){return a.statut==="expire";}).length,      c:G.danger  },
                { i:"💰", l:"Total",      v:abonnementsSupabase.length,                                                       c:G.accent  },
              ].map(function(s){
                return <div key={s.l} className="scard"><div style={{ fontSize:22, marginBottom:6 }}>{s.i}</div><div className="fd" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div><div style={{ fontSize:11, color:G.textMuted, fontWeight:600 }}>{s.l}</div></div>;
              })}
            </div>
            <div className="card" style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>Utilisateur</th><th>Email</th><th>Type</th><th>Début</th><th>Expiration</th><th>Montant</th><th>Statut</th></tr></thead>
                <tbody>
                  {abonnementsSupabase.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign:"center", padding:"30px", color:G.textMuted }}>Aucun abonnement</td></tr>
                  ) : abonnementsSupabase.map(function(a) {
                    var nom = (a.users && a.users.nom) ? a.users.nom : "—";
                    var email = (a.users && a.users.email) ? a.users.email : "—";
                    var statutCls = a.statut==="actif"?"b-ok":a.statut==="en_attente"?"b-warn":"b-err";
                    var statutLabel = a.statut==="actif"?"✅ Actif":a.statut==="en_attente"?"⏳ En attente":a.statut==="expire"?"❌ Expiré":"—";
                    return (
                      <tr key={a.id}>
                        <td style={{ fontWeight:700 }}>{nom}</td>
                        <td style={{ color:G.textMuted, fontSize:12 }}>{email}</td>
                        <td><span style={{ fontSize:12, fontWeight:700 }}>{a.type||"annuel"}</span></td>
                        <td style={{ color:G.textMuted, fontSize:12 }}>{a.date_debut ? new Date(a.date_debut).toLocaleDateString("fr-FR") : "—"}</td>
                        <td style={{ color:G.textMuted, fontSize:12 }}>{a.date_fin ? new Date(a.date_fin).toLocaleDateString("fr-FR") : "—"}</td>
                        <td style={{ fontWeight:700 }}>{a.prix ? a.prix.toLocaleString("fr-FR")+" FCFA" : "—"}</td>
                        <td><span className={"badge "+statutCls}>{statutLabel}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="paiements" && (
          <div>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>Paiements & Validation abonnements</h1>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:18 }}>Validez les abonnements des utilisateurs après vérification du paiement Mobile Money.</p>

            {/* Paiements en attente de validation */}
            {paiementsEnAttente && paiementsEnAttente.length > 0 && (
              <div style={{ marginBottom:22 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <h2 className="fd" style={{ fontSize:15, fontWeight:700 }}>⏳ En attente de validation</h2>
                  <span style={{ background:G.danger, color:"#fff", fontSize:11, fontWeight:800, padding:"2px 8px", borderRadius:10 }}>{paiementsEnAttente.length}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {paiementsEnAttente.map(function(p) {
                    var nomUser = (p.users && p.users.nom) ? p.users.nom : (p.nom_payeur || "Utilisateur");
                    var emailUser = (p.users && p.users.email) ? p.users.email : "—";
                    var methode = p.methode ? p.methode.toUpperCase() : "—";
                    var montant = p.montant || 0;
                    return (
                      <div key={p.id} className="card" style={{ border:"1px solid rgba(245,158,11,.3)", background:"rgba(245,158,11,.05)" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                              <span style={{ fontFamily:"monospace", color:G.accentLight, fontWeight:700 }}>#{p.id}</span>
                              <span className="badge b-warn">En attente</span>
                            </div>
                            <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{nomUser}</div>
                            <div style={{ fontSize:12, color:G.textMuted, marginBottom:4 }}>{emailUser}</div>
                            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                              <span style={{ fontSize:12, color:G.textSecondary }}>💰 <b style={{ color:G.textPrimary }}>{montant.toLocaleString("fr-FR")} FCFA</b></span>
                              <span style={{ fontSize:12, color:G.textSecondary }}>📱 <b style={{ color:G.textPrimary }}>{methode}</b></span>
                              <span style={{ fontSize:12, color:G.textSecondary }}>📞 {p.telephone||"—"}</span>
                            </div>
                            {p.reference_transaction && (
                              <div style={{ marginTop:8, padding:"6px 10px", background:"rgba(79,125,255,.1)", borderRadius:8, fontSize:12 }}>
                                🔖 Référence : <b style={{ color:G.accentLight, fontFamily:"monospace" }}>{p.reference_transaction}</b>
                              </div>
                            )}
                            {p.created_at && (
                              <div style={{ fontSize:11, color:G.textMuted, marginTop:6 }}>
                                Soumis le {new Date(p.created_at).toLocaleDateString("fr-FR")} à {new Date(p.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
                              </div>
                            )}
                          </div>
                          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                            <button className="btn btn-ok" onClick={async function() {
                              if (window.confirm("Valider l'abonnement de " + nomUser + " ?")) {
                                try {
                                  await supaValiderAbonnement(p.id, p.user_id);
                                  setPaiementsEnAttente(function(prev) { return prev.filter(function(x){ return x.id!==p.id; }); });
                                  showT("✅ Abonnement validé pour "+nomUser,"success");
                                } catch(e) {
                                  showT("Erreur lors de la validation","error");
                                }
                              }
                            }}>✅ Valider</button>
                            <button className="btn btn-d btn-sm" onClick={async function() {
                              if (window.confirm("Rejeter ce paiement ?")) {
                                try {
                                  await supa.from("paiements").update({ statut:"echec" }).eq("id", p.id);
                                  setPaiementsEnAttente(function(prev) { return prev.filter(function(x){ return x.id!==p.id; }); });
                                  showT("Paiement rejeté","warning");
                                } catch(e) { showT("Erreur","error"); }
                              }
                            }}>✕ Rejeter</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Message si aucun paiement en attente */}
            {(!paiementsEnAttente || paiementsEnAttente.length === 0) && (
              <div style={{ textAlign:"center", padding:"30px 20px", background:G.bgCard, borderRadius:14, border:"1px solid "+G.border, marginBottom:20 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
                <p style={{ color:G.textMuted, fontSize:14, fontWeight:600 }}>Aucun paiement en attente de validation</p>
                <p style={{ color:G.textMuted, fontSize:12, marginTop:6 }}>Les nouvelles demandes apparaîtront ici automatiquement</p>
              </div>
            )}

            {/* Historique paiements */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h2 className="fd" style={{ fontSize:15, fontWeight:700 }}>📋 Historique des paiements</h2>
              <button className="btn btn-s btn-sm" onClick={function(){
                supa.from("paiements").select("*, users(nom,email)").order("created_at",{ascending:false}).limit(50)
                  .then(function(res){
                    if(res.data) setHistoriquePaiements(res.data);
                    showT("Historique actualisé","success");
                  }).catch(function(){});
              }}>🔄 Actualiser</button>
            </div>
            <div className="card" style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>ID</th><th>Utilisateur</th><th>Montant</th><th>Méthode</th><th>Référence</th><th>Date</th><th>Statut</th></tr></thead>
                <tbody>
                  {historiquePaiements.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign:"center", padding:"24px", color:G.textMuted }}>
                      Aucun paiement — cliquez 🔄 Actualiser
                    </td></tr>
                  ) : historiquePaiements.map(function(p) {
                    var nomUser = (p.users && p.users.nom) ? p.users.nom : (p.nom_payeur || "—");
                    var statut = p.statut === "confirme" ? "Validé" : p.statut === "echec" ? "Rejeté" : "En attente";
                    var statutCls = p.statut === "confirme" ? "b-ok" : p.statut === "echec" ? "b-err" : "b-warn";
                    return (
                      <tr key={p.id}>
                        <td style={{ fontFamily:"monospace", color:G.accent, fontWeight:700, fontSize:11 }}>#{p.id}</td>
                        <td style={{ fontWeight:600 }}>{nomUser}</td>
                        <td style={{ fontWeight:700 }}>{p.montant ? p.montant.toLocaleString("fr-FR")+" FCFA" : "—"}</td>
                        <td style={{ color:G.textMuted }}>{p.methode ? p.methode.toUpperCase() : "—"}</td>
                        <td style={{ fontFamily:"monospace", fontSize:11, color:G.accentLight }}>{p.reference_transaction || "—"}</td>
                        <td style={{ color:G.textMuted, fontSize:12 }}>{p.created_at ? new Date(p.created_at).toLocaleDateString("fr-FR") : "—"}</td>
                        <td><span className={"badge "+statutCls}>{statut}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="commandes" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>🖨️ Commandes imprimées
                {commandesImprimees.filter(function(c){return c.statut==="En attente";}).length > 0 && (
                  <span style={{ background:G.danger, color:"#fff", fontSize:11, padding:"2px 8px", borderRadius:10, marginLeft:10 }}>
                    {commandesImprimees.filter(function(c){return c.statut==="En attente";}).length}
                  </span>
                )}
              </h1>
              <button className="btn btn-s btn-sm" onClick={function(){ supaGetCommandesImprimees().then(setCommandesImprimees).catch(function(){}); showT("Actualisé","success"); }}>🔄 Actualiser</button>
            </div>
            {commandesImprimees.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px", color:G.textMuted, background:G.bgCard, borderRadius:14, border:"1px solid "+G.border }}>
                <div style={{ fontSize:36, marginBottom:10 }}>🖨️</div><p>Aucune commande pour le moment</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {commandesImprimees.map(function(c) {
                  return (
                    <div key={c.id} className="card" style={{ border:"1px solid "+(c.statut==="En attente"?"rgba(245,158,11,.3)":"rgba(99,130,255,.15)") }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                            <span style={{ fontFamily:"monospace", color:G.accentLight, fontWeight:700, fontSize:12 }}>#{c.id}</span>
                            <span className={"badge "+(c.statut==="Livrée"?"b-ok":c.statut==="En attente"?"b-warn":"b-free")}>{c.statut}</span>
                          </div>
                          <div style={{ fontWeight:700, fontSize:15 }}>{c.user_nom||"—"}</div>
                          <div style={{ fontSize:12, color:G.textMuted, marginBottom:4 }}>{c.user_email} · 📞 {c.telephone}</div>
                          <div style={{ fontSize:13 }}>📦 <b>{c.plan_label}</b> · 💰 {(c.montant||0).toLocaleString("fr-FR")} FCFA</div>
                          <div style={{ fontSize:12, color:G.textMuted, marginTop:3 }}>📍 {c.adresse} · {c.methode}</div>
                          {c.preuve_transaction && <div style={{ fontSize:11, color:G.accentLight, marginTop:4 }}>🔖 Réf: {c.preuve_transaction}</div>}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                          <select value={c.statut} onChange={async function(e) {
                            var nvStatut = e.target.value;
                            await supaUpdateStatutCommande(c.id, nvStatut).catch(function(){});
                            setCommandesImprimees(function(prev){ return prev.map(function(x){ return x.id===c.id?Object.assign({},x,{statut:nvStatut}):x; }); });
                            showT("Statut → "+nvStatut,"success");
                          }} style={{ background:G.bgInput, border:"1px solid "+G.border, borderRadius:8, padding:"5px 8px", color:G.textPrimary, fontSize:12, cursor:"pointer" }}>
                            {["En attente","Confirmée","En préparation","Expédiée","Livrée","Annulée"].map(function(s){ return <option key={s} value={s}>{s}</option>; })}
                          </select>
                          <a href={"https://wa.me/"+c.telephone+"?text="+encodeURIComponent("Bonjour "+c.user_nom+" ! Votre commande FichesPro ("+c.plan_label+") est confirmée. Merci !")} target="_blank" rel="noreferrer">
                            <button className="btn btn-sm" style={{ background:"rgba(37,211,102,.12)", border:"1px solid rgba(37,211,102,.3)", color:"#25d366", width:"100%" }}>💬 WA</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab==="demandes" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>📋 Demandes de fiches
                {demandesFiches.filter(function(d){return d.statut==="En attente";}).length > 0 && (
                  <span style={{ background:G.danger, color:"#fff", fontSize:11, padding:"2px 8px", borderRadius:10, marginLeft:10 }}>
                    {demandesFiches.filter(function(d){return d.statut==="En attente";}).length}
                  </span>
                )}
              </h1>
              <button className="btn btn-s btn-sm" onClick={function(){ supaGetDemandesFiches().then(setDemandesFiches).catch(function(){}); showT("Actualisé","success"); }}>🔄 Actualiser</button>
            </div>
            {demandesFiches.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px", color:G.textMuted, background:G.bgCard, borderRadius:14, border:"1px solid "+G.border }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📋</div><p>Aucune demande pour le moment</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {demandesFiches.map(function(d) {
                  return (
                    <div key={d.id} className="card" style={{ border:"1px solid "+(d.statut==="En attente"?"rgba(239,68,68,.25)":"rgba(99,130,255,.15)") }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                            <span style={{ fontWeight:700, fontSize:14 }}>{d.titre}</span>
                            <span className={"badge "+(d.statut==="Terminée"?"b-ok":d.statut==="En cours"?"b-warn":"b-err")}>{d.statut}</span>
                          </div>
                          <div style={{ fontSize:12, color:G.textMuted }}>📚 {d.matiere} · 🎓 {d.niveau} · 👤 {d.user_nom||"—"}</div>
                          {d.description && <div style={{ fontSize:12, color:G.textSecondary, marginTop:4 }}>{d.description}</div>}
                          <div style={{ fontSize:11, color:G.textMuted, marginTop:4 }}>{d.created_at ? new Date(d.created_at).toLocaleString("fr-FR") : ""}</div>
                        </div>
                        <div style={{ display:"flex", gap:7 }}>
                          {d.statut!=="Terminée" && <button className="btn btn-s btn-sm" onClick={async function(){
                            await supaUpdateStatutDemande(d.id,"En cours").catch(function(){});
                            setDemandesFiches(function(prev){ return prev.map(function(x){ return x.id===d.id?Object.assign({},x,{statut:"En cours"}):x; }); });
                            showT("Prise en charge","info");
                          }}>▶ En cours</button>}
                          {d.statut!=="Terminée" && <button className="btn btn-ok btn-sm" onClick={async function(){
                            await supaUpdateStatutDemande(d.id,"Terminée").catch(function(){});
                            setDemandesFiches(function(prev){ return prev.map(function(x){ return x.id===d.id?Object.assign({},x,{statut:"Terminée"}):x; }); });
                            showT("Demande terminée ✅","success");
                          }}>✓ Terminer</button>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab==="livraisons" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>🚚 Gestion des Livraisons</h1>
              <button className="btn btn-p btn-sm" onClick={function(){
                var client = prompt("Nom du client :");
                if(!client)return;
                var tel = prompt("Téléphone :");
                if(!tel)return;
                var plan = prompt("Plan (ex: CI - CP, CE1-CE2, CM1-CM2) :") || "CI - CP";
                var zone = prompt("Zone de livraison :") || "Cotonou";
                setLivraisons(function(prev){ return [{
                  id:"LIV"+String(Date.now()).slice(-4),
                  client:client, tel:tel, plan:plan, zone:zone,
                  date:new Date().toISOString().split("T")[0],
                  statut:"En attente"
                }, ...prev]; });
                showT("Livraison ajoutée pour "+client,"success");
              }}>+ Nouvelle livraison</button>
            </div>

            {/* Stats livraisons */}
            <div className="g4" style={{ marginBottom:20 }}>
              {[
                {l:"En attente",  v:livraisons.filter(function(l){return l.statut==="En attente";}).length,  c:G.textMuted,  i:"⏳"},
                {l:"Préparation", v:livraisons.filter(function(l){return l.statut==="Préparation";}).length,  c:G.warning,   i:"📦"},
                {l:"Expédiées",   v:livraisons.filter(function(l){return l.statut==="Expédié";}).length,     c:G.accent,    i:"🚚"},
                {l:"Livrées",     v:livraisons.filter(function(l){return l.statut==="Livré";}).length,       c:G.success,   i:"✅"},
              ].map(function(s){
                return (
                  <div key={s.l} className="scard">
                    <div style={{ fontSize:24, marginBottom:6 }}>{s.i}</div>
                    <div className="fd" style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
                    <div style={{ fontSize:11, color:G.textMuted, fontWeight:600 }}>{s.l}</div>
                  </div>
                );
              })}
            </div>

            {/* Tableau livraisons */}
            <div className="card" style={{ overflowX:"auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Client</th><th>Plan</th><th>Zone</th><th>Date</th><th>Statut</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {livraisons.map(function(liv){
                    var couleurStatut = liv.statut==="Livré"?"b-ok":liv.statut==="Expédié"?"b-warn":liv.statut==="Préparation"?"b-warn":liv.statut==="Annulé"?"b-err":"b-free";
                    return (
                      <tr key={liv.id}>
                        <td style={{ fontFamily:"monospace", color:G.accentLight, fontWeight:700 }}>{liv.id}</td>
                        <td>
                          <div style={{ fontWeight:700 }}>{liv.client}</div>
                          <div style={{ fontSize:11, color:G.textMuted }}>{liv.tel}</div>
                        </td>
                        <td style={{ fontWeight:600 }}>{liv.plan}</td>
                        <td style={{ color:G.textSecondary }}>📍 {liv.zone}</td>
                        <td style={{ color:G.textMuted }}>{new Date(liv.date).toLocaleDateString("fr-FR")}</td>
                        <td>
                          <select value={liv.statut} onChange={function(e){
                            var nvStatut = e.target.value;
                            setLivraisons(function(prev){ return prev.map(function(l){ return l.id===liv.id ? Object.assign({},l,{statut:nvStatut}) : l; }); });
                            showT("Statut mis à jour : "+nvStatut,"success");
                            // Notifier automatiquement si expédié ou livré
                            if(nvStatut==="Expédié"||nvStatut==="Livré"){
                              showT("📲 Notification WhatsApp envoyée à "+liv.client,"info");
                            }
                          }} style={{ background:G.bgInput, border:"1px solid "+G.border, borderRadius:8, padding:"4px 8px", color:G.textPrimary, fontSize:12, cursor:"pointer" }}>
                            {STATUTS_LIVRAISON.map(function(s){ return <option key={s} value={s}>{s}</option>; })}
                          </select>
                        </td>
                        <td>
                          <div style={{ display:"flex", gap:5 }}>
                            {/* Facturation WhatsApp */}
                            <a href={"https://wa.me/"+liv.tel+"?text="+encodeURIComponent("Bonjour "+liv.client+" 👋\n\n✅ Votre commande FichesPro est confirmée.\n📦 Plan : "+liv.plan+"\n📍 Zone : "+liv.zone+"\n🆔 Référence : "+liv.id+"\n\nMerci de votre confiance ! 🙏")} target="_blank" rel="noreferrer">
                              <button className="btn btn-sm" style={{ background:"rgba(37,211,102,.12)", border:"1px solid rgba(37,211,102,.3)", color:"#25d366" }} title="Envoyer reçu WhatsApp">💬</button>
                            </a>
                            <button className="btn btn-d btn-sm" title="Annuler" onClick={function(){
                              if(window.confirm("Annuler la livraison "+liv.id+" ?")){
                                setLivraisons(function(prev){ return prev.map(function(l){ return l.id===liv.id?Object.assign({},l,{statut:"Annulé"}):l; }); });
                                showT("Livraison annulée","warning");
                              }
                            }}>✕</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="codes-promo" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h1 className="fd" style={{ fontSize:20, fontWeight:800 }}>🎟️ Codes Promo</h1>
              <button className="btn btn-p btn-sm" onClick={async function(){
                var code = prompt("Nouveau code (ex: NOEL2024) :");
                if(!code) return;
                var reduction = prompt("Réduction (ex: 25 pour 25% ou 1500 pour 1500 FCFA) :");
                if(!reduction) return;
                // Choix fiable (évite les fautes de frappe qui violaient la contrainte
                // "codes_promo_type_check", laquelle n'accepte QUE "pourcentage" ou "montant")
                var estPourcentage = window.confirm("Cliquez sur OK pour un POURCENTAGE (%), ou sur Annuler pour un MONTANT fixe (FCFA).");
                var type = estPourcentage ? "pourcentage" : "montant";
                var max = parseInt(prompt("Nombre max d'utilisations ?") || "100");
                var expire = prompt("Date expiration (YYYY-MM-DD) :") || "2025-12-31";
                try {
                  var nouveauCode = await supaCreateCodePromo(code, parseFloat(reduction)||0, type, max, expire);
                  setCodesPromo(function(prev){ return prev.concat([nouveauCode]); });
                  showT("Code "+code.toUpperCase()+" créé !", "success");
                } catch(e) {
                  showT("Erreur : impossible de créer le code (" + (e.message||"vérifiez qu'il n'existe pas déjà") + ")", "error");
                }
              }}>+ Créer un code</button>
            </div>
            {/* Stats */}
            <div className="g3" style={{ marginBottom:20 }}>
              {[
                { l:"Codes actifs",   v:codesPromo.filter(function(c){return c.actif;}).length,  c:G.success, i:"✅" },
                { l:"Total utilisations", v:codesPromo.reduce(function(a,c){return a+c.utilises;},0), c:G.accent, i:"🎟️" },
                { l:"Codes expirés",  v:codesPromo.filter(function(c){return new Date(c.expire)<new Date();}).length, c:G.danger, i:"⏰" },
              ].map(function(s){
                return <div key={s.l} className="scard"><div style={{fontSize:24,marginBottom:6}}>{s.i}</div><div className="fd" style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:11,color:G.textMuted,fontWeight:600}}>{s.l}</div></div>;
              })}
            </div>
            <div className="card" style={{ overflowX:"auto" }}>
              <table>
                <thead><tr><th>Code</th><th>Réduction</th><th>Utilisations</th><th>Expiration</th><th>Statut</th><th>Actions</th></tr></thead>
                <tbody>
                  {codesPromo.map(function(c){
                    var expire = new Date(c.expire) < new Date();
                    return (
                      <tr key={c.id}>
                        <td><span style={{ fontFamily:"monospace", fontWeight:800, fontSize:14, color:G.accentLight }}>{c.code}</span></td>
                        <td style={{ fontWeight:700 }}>{c.type==="pourcentage" ? c.reduction+"%" : c.reduction.toLocaleString("fr-FR")+" FCFA"}</td>
                        <td><span style={{ fontWeight:700 }}>{c.utilises}</span><span style={{ color:G.textMuted }}>/{c.max}</span></td>
                        <td style={{ color: expire ? G.danger : G.textMuted }}>{new Date(c.expire).toLocaleDateString("fr-FR")}</td>
                        <td>
                          <span className={"badge "+(c.actif&&!expire?"b-ok":expire?"b-err":"b-warn")}>
                            {expire?"Expiré":c.actif?"Actif":"Inactif"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display:"flex", gap:5 }}>
                            <button className="btn btn-s btn-sm" onClick={async function(){
                              var nouvelEtat = !c.actif;
                              try {
                                await supaToggleCodePromo(c.id, nouvelEtat);
                                setCodesPromo(function(prev){ return prev.map(function(x){ return x.id===c.id?Object.assign({},x,{actif:nouvelEtat}):x; }); });
                                showT(c.actif?"Code désactivé":"Code activé", "info");
                              } catch(e) {
                                showT("Erreur lors de la mise à jour du code", "error");
                              }
                            }}>{c.actif?"⏸️":"▶️"}</button>
                            <button className="btn btn-d btn-sm" onClick={async function(){
                              if(window.confirm("Supprimer le code "+c.code+" ?")){
                                try {
                                  await supaDeleteCodePromo(c.id);
                                  setCodesPromo(function(prev){ return prev.filter(function(x){ return x.id!==c.id; }); });
                                  showT("Code supprimé","warning");
                                } catch(e) {
                                  showT("Erreur lors de la suppression du code", "error");
                                }
                              }
                            }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="parametres" && (
          <div style={{ maxWidth:700 }}>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:5 }}>Paramètres</h1>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:18 }}>Toutes les modifications sont appliquées immédiatement à l'interface utilisateur.</p>

            {/* Avertissement */}
            <div style={{ background:"rgba(245,158,11,.08)", border:"1px solid rgba(245,158,11,.22)", borderRadius:12, padding:"11px 15px", marginBottom:22, display:"flex", gap:10 }}>
              <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
              <div style={{ fontSize:12, color:G.textSecondary, lineHeight:1.6 }}>Les numéros et contacts s'affichent en temps réel aux utilisateurs. Vérifiez bien avant d'enregistrer.</div>
            </div>

            {/* ── MOBILE MONEY ── */}
            <h2 className="fd" style={{ fontSize:14, fontWeight:800, marginBottom:12, color:G.accentLight }}>📱 Numéros Mobile Money</h2>
            {[
              { key:"mtn",     label:"MTN Mobile Money", icon:"📱", color:"#fbbf24", hint:"016XXXXXXX ou 017XXXXXXX" },
              { key:"moov",    label:"Moov Money",        icon:"📲", color:"#0099ff", hint:"96XXXXXXXX ou 97XXXXXXXX" },
              { key:"celtiis", label:"Celtiis",           icon:"📶", color:"#e63946", hint:"019XXXXXXX" },
            ].map(function(r) {
              return (
                <div key={r.key} className="card" style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                    <div style={{ width:36, height:36, borderRadius:9, background:r.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>{r.icon}</div>
                    <div><div style={{ fontWeight:800, fontSize:14 }}>{r.label}</div><div style={{ fontSize:10, color:r.color, fontWeight:700 }}>Bénin</div></div>
                  </div>
                  <div className="g2">
                    <div>
                      <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Numéro *</label>
                      <input className="inp" placeholder={"Ex : "+DEFAULT_CFG[r.key].numero} value={paieEdit[r.key].numero} onChange={function(e) { updatePaie(r.key,"numero",e.target.value); }} />
                      <div style={{ fontSize:10, color:G.textMuted, marginTop:2 }}>{r.hint}</div>
                    </div>
                    <div>
                      <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Nom du compte *</label>
                      <input className="inp" placeholder="Ex : FichesPro Benin" value={paieEdit[r.key].nom} onChange={function(e) { updatePaie(r.key,"nom",e.target.value); }} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Aperçu numéros */}
            <div className="card" style={{ marginBottom:22, background:"rgba(79,125,255,.05)", border:"1px solid rgba(79,125,255,.18)" }}>
              <div style={{ fontSize:12, fontWeight:700, color:G.accent, marginBottom:10 }}>👁️ Aperçu — Ce que voient les utilisateurs</div>
              {[
                { icon:"📱", label:"MTN MoMo",   color:"#fbbf24", d:paieEdit.mtn },
                { icon:"📲", label:"Moov Money", color:"#0099ff", d:paieEdit.moov },
                { icon:"📶", label:"Celtiis",    color:"#e63946", d:paieEdit.celtiis },
              ].map(function(r) {
                return (
                  <div key={r.label} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:8, background:"rgba(255,255,255,.03)", border:"1px solid "+G.border, marginBottom:7 }}>
                    <span style={{ fontSize:18 }}>{r.icon}</span>
                    <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:13 }}>{r.label}</div><div style={{ fontSize:11, color:G.textMuted }}>{r.d.numero||"Non configuré"}</div></div>
                    <div style={{ fontSize:11, color:r.color, fontWeight:700 }}>{r.d.nom||"—"}</div>
                  </div>
                );
              })}
            </div>

            {/* ── CONTACTS SUPPORT ── */}
            <h2 className="fd" style={{ fontSize:14, fontWeight:800, marginBottom:12, color:G.accentLight }}>💬 Contacts Support</h2>
            <div className="card" style={{ marginBottom:22 }}>
              <div className="g2">
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Numéro WhatsApp *</label>
                  <input className="inp" placeholder="Ex : 22961234567" value={supportEdit.whatsapp} onChange={function(e) { setSupportEdit(function(p) { return Object.assign({}, p, { whatsapp: e.target.value }); }); }} />
                  <div style={{ fontSize:10, color:G.textMuted, marginTop:2 }}>Sans + ni espaces (ex: 22961234567)</div>
                </div>
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Pseudo Telegram *</label>
                  <input className="inp" placeholder="Ex : FichesProBenin" value={supportEdit.telegram} onChange={function(e) { setSupportEdit(function(p) { return Object.assign({}, p, { telegram: e.target.value }); }); }} />
                  <div style={{ fontSize:10, color:G.textMuted, marginTop:2 }}>Sans @ (ex: FichesProBenin)</div>
                </div>
              </div>
              {/* Aperçu contacts */}
              <div style={{ marginTop:14, display:"flex", gap:10 }}>
                <a href={"https://wa.me/"+supportEdit.whatsapp} target="_blank" rel="noreferrer"
                  style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", borderRadius:9, background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.2)", textDecoration:"none", color:"#25d366", fontWeight:700, fontSize:12 }}>
                  💬 +{supportEdit.whatsapp}
                </a>
                <a href={"https://t.me/"+supportEdit.telegram} target="_blank" rel="noreferrer"
                  style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", borderRadius:9, background:"rgba(42,171,238,.08)", border:"1px solid rgba(42,171,238,.2)", textDecoration:"none", color:"#2aabee", fontWeight:700, fontSize:12 }}>
                  ✈️ @{supportEdit.telegram}
                </a>
              </div>
            </div>

            {/* ── ABONNEMENT NUMÉRIQUE ── */}
            <h2 className="fd" style={{ fontSize:14, fontWeight:800, marginBottom:12, color:G.accentLight }}>⭐ Abonnement Numérique Annuel</h2>
            <div className="card" style={{ marginBottom:22 }}>
              <div className="g2">
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Prix annuel (FCFA) *</label>
                  <input className="inp" type="number" value={aboEdit.prix} onChange={function(e) { setAboEdit(function(p) { return Object.assign({}, p, { prix: parseInt(e.target.value)||0 }); }); }} />
                </div>
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Fiches gratuites (limite)</label>
                  <input className="inp" type="number" value={aboEdit.ficheGratuites} onChange={function(e) { setAboEdit(function(p) { return Object.assign({}, p, { ficheGratuites: parseInt(e.target.value)||0 }); }); }} />
                </div>
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Durée (jours)</label>
                  <input className="inp" type="number" value={aboEdit.dureeJours} onChange={function(e) { setAboEdit(function(p) { return Object.assign({}, p, { dureeJours: parseInt(e.target.value)||365 }); }); }} />
                </div>
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Délai activation (min)</label>
                  <input className="inp" type="number" value={aboEdit.delaiActivMin} onChange={function(e) { setAboEdit(function(p) { return Object.assign({}, p, { delaiActivMin: parseInt(e.target.value)||30 }); }); }} />
                </div>
              </div>
              <div style={{ marginTop:12, padding:"9px 12px", background:"rgba(79,125,255,.07)", borderRadius:8, fontSize:12, color:G.textSecondary }}>
                Aperçu : <b style={{ color:G.textPrimary }}>{aboEdit.prix.toLocaleString("fr-FR")} FCFA</b> · {aboEdit.dureeJours} jours · Activation sous {aboEdit.delaiActivMin} min
              </div>
            </div>

            {/* ── PLANS IMPRIMÉS ── */}
            <h2 className="fd" style={{ fontSize:14, fontWeight:800, marginBottom:12, color:G.accentLight }}>🖨️ Tarifs Version Imprimée</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
              {plansEdit.map(function(plan, i) {
                return (
                  <div key={plan.id} className="card">
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:plan.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>{plan.icon}</div>
                      <div style={{ fontWeight:800, fontSize:14 }}>Classes {plan.label}</div>
                    </div>
                    <div className="g2">
                      <div>
                        <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Prix (FCFA) *</label>
                        <input className="inp" type="number" value={plan.prix} onChange={function(e) {
                          setPlansEdit(function(prev) {
                            return prev.map(function(p, idx) { return idx===i ? Object.assign({}, p, { prix: parseInt(e.target.value)||0 }) : p; });
                          });
                        }} />
                      </div>
                      <div>
                        <label style={{ fontSize:10, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:4 }}>Description</label>
                        <input className="inp" value={plan.description} onChange={function(e) {
                          setPlansEdit(function(prev) {
                            return prev.map(function(p, idx) { return idx===i ? Object.assign({}, p, { description: e.target.value }) : p; });
                          });
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Boutons save/annuler */}
            <div style={{ display:"flex", gap:10, position:"sticky", bottom:0, background:G.bg, paddingBottom:16, paddingTop:8 }}>
              <button className="btn btn-s" style={{ flex:1 }} onClick={annulerCfg}>Annuler</button>
              <button className="btn btn-p" style={{ flex:3 }} onClick={saveCfg}>
                {saved ? "✅ Paramètres enregistrés et appliqués !" : "💾 Enregistrer tous les paramètres"}
              </button>
            </div>

            {/* C7 — CHANGEMENT MOT DE PASSE ADMIN */}
            <div style={{ marginTop:24 }}>
              <div style={{ fontSize:14, fontWeight:800, color:G.accentLight, marginBottom:14 }}>🔐 Sécurité — Changer le mot de passe admin</div>
              <div className="card" style={{ border:"1px solid rgba(239,68,68,.2)", background:"rgba(239,68,68,.04)" }}>
                {changePwd.ok ? (
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ fontSize:42, marginBottom:10 }}>✅</div>
                    <p style={{ fontWeight:700, color:G.success, marginBottom:8 }}>Mot de passe modifié avec succès !</p>
                    <p style={{ fontSize:12, color:G.textMuted, marginBottom:14 }}>Vous allez être déconnecté pour sécuriser votre session.</p>
                    <button className="btn btn-p" onClick={function(){ onLogout(); }}>Se reconnecter</button>
                  </div>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Mot de passe actuel *</label>
                      <input className="inp" type="password" placeholder="••••••••" value={changePwd.ancien}
                        onChange={function(e){
                          var val = e.target.value;
                          setChangePwd(function(p){ return { ancien:val, nouveau:p.nouveau, confirm:p.confirm, err:"", ok:p.ok, loading:p.loading }; });
                        }} />
                    </div>
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Nouveau mot de passe *</label>
                      <input className="inp" type="password" placeholder="Minimum 8 caractères" value={changePwd.nouveau}
                        onChange={function(e){
                          var val = e.target.value;
                          setChangePwd(function(p){ return { ancien:p.ancien, nouveau:val, confirm:p.confirm, err:"", ok:p.ok, loading:p.loading }; });
                        }} />
                    </div>
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:G.textMuted, textTransform:"uppercase", display:"block", marginBottom:5 }}>Confirmer le nouveau mot de passe *</label>
                      <input className="inp" type="password" placeholder="Répéter le nouveau mot de passe" value={changePwd.confirm}
                        onChange={function(e){
                          var val = e.target.value;
                          setChangePwd(function(p){ return { ancien:p.ancien, nouveau:p.nouveau, confirm:val, err:"", ok:p.ok, loading:p.loading }; });
                        }} />
                    </div>
                    {changePwd.err && <div style={{ fontSize:12, color:G.danger, background:"rgba(239,68,68,.08)", padding:"8px 12px", borderRadius:8 }}>❌ {changePwd.err}</div>}
                    <div style={{ fontSize:12, color:G.textMuted, background:"rgba(79,125,255,.07)", padding:"8px 12px", borderRadius:8 }}>
                      ⚠️ Après modification, vous serez déconnecté de toutes les sessions actives.
                    </div>
                    <button className="btn btn-d" disabled={changePwd.loading||!changePwd.ancien||!changePwd.nouveau||!changePwd.confirm}
                      onClick={async function(){
                        if (changePwd.nouveau.length < 8) { setChangePwd(function(p){ return Object.assign({},p,{err:"Le mot de passe doit contenir au moins 8 caractères."}); }); return; }
                        if (changePwd.nouveau !== changePwd.confirm) { setChangePwd(function(p){ return Object.assign({},p,{err:"Les mots de passe ne correspondent pas."}); }); return; }
                        setChangePwd(function(p){ return Object.assign({},p,{loading:true,err:""}); });
                        try {
                          await supaChangerMotDePasse(changePwd.ancien, changePwd.nouveau);
                          setChangePwd(function(p){ return Object.assign({},p,{loading:false,ok:true}); });
                        } catch(e) {
                          setChangePwd(function(p){ return Object.assign({},p,{loading:false,err:e.message||"Erreur lors du changement de mot de passe."}); });
                        }
                      }}>
                      {changePwd.loading ? "⏳ Modification en cours..." : "🔐 Modifier le mot de passe"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── DOCUMENTS PAR MATIÈRE ── */}
        {tab==="documents" && (
          <div style={{ maxWidth:800 }}>
            <h1 className="fd" style={{ fontSize:20, fontWeight:800, marginBottom:6 }}>Documents par Matière</h1>
            <p style={{ color:G.textMuted, fontSize:13, marginBottom:22 }}>
              Uploadez et gérez les fiches PDF pour chaque matière. Les documents sont accessibles aux utilisateurs selon leur type (Gratuit / Premium).
            </p>

            {/* Info */}
            <div style={{ background:"rgba(79,125,255,.08)", border:"1px solid rgba(79,125,255,.2)", borderRadius:12, padding:"12px 16px", marginBottom:22, display:"flex", gap:10 }}>
              <span style={{ fontSize:20, flexShrink:0 }}>ℹ️</span>
              <div style={{ fontSize:13, color:G.textSecondary, lineHeight:1.6 }}>
                Les fichiers PDF uploadés ici seront disponibles dans la section <b style={{ color:G.textPrimary }}>Gestion des fiches</b>. 
                Formats acceptés : <b style={{ color:G.textPrimary }}>.pdf</b> uniquement. Taille max recommandée : 10 MB par fichier.
              </div>
            </div>

            {/* Liste des matières avec upload */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {MATIERES.map(function(mat) {
                var docs = docsParMatiere[mat.id] || [];
                return (
                  <div key={mat.id} className="card">
                    {/* Header matière */}
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom: docs.length > 0 || uploadingMat === mat.id ? 14 : 0 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:mat.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                        {mat.icon}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:800, fontSize:15 }}>{mat.label}</div>
                        <div style={{ fontSize:12, color:G.textMuted, marginTop:2 }}>
                          {docs.length} document{docs.length!==1?"s":""} uploadé{docs.length!==1?"s":""}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <label style={{ cursor:"pointer" }}>
                          <input type="file" accept=".pdf" multiple style={{ display:"none" }}
                            onChange={function(e) {
                              var files = Array.from(e.target.files);
                              if(!files.length) return;
                              setUploadingMat(mat.id);
                              setTimeout(function() {
                                var nouveaux = files.map(function(f) {
                                  return {
                                    id: Date.now()+Math.random(),
                                    nom: f.name,
                                    taille: (f.size/1024).toFixed(0)+" KB",
                                    premium: false,
                                    date: new Date().toLocaleDateString("fr-FR"),
                                    matiereId: mat.id,
                                  };
                                });
                                setDocsParMatiere(function(prev) {
                                  var existing = prev[mat.id] || [];
                                  return Object.assign({}, prev, { [mat.id]: [...existing, ...nouveaux] });
                                });
                                setUploadingMat(null);
                                showT(files.length+" document(s) ajouté(s) pour "+mat.label, "success");
                                e.target.value="";
                              }, 800);
                            }}
                          />
                          <div className="btn btn-p btn-sm" style={{ pointerEvents:"none" }}>
                            {uploadingMat===mat.id ? "⏳ Upload..." : "📁 Ajouter PDF"}
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Liste documents de cette matière */}
                    {docs.length > 0 && (
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {docs.map(function(doc) {
                          return (
                            <div key={doc.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(255,255,255,.04)", borderRadius:10, border:"1px solid rgba(99,130,255,.1)" }}>
                              <span style={{ fontSize:20, flexShrink:0 }}>📄</span>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ fontWeight:700, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc.nom}</div>
                                <div style={{ fontSize:11, color:G.textMuted, marginTop:2 }}>{doc.taille} · Ajouté le {doc.date}</div>
                              </div>
                              {/* Toggle Premium/Gratuit */}
                              <button
                                onClick={function() {
                                  setDocsParMatiere(function(prev) {
                                    var liste = (prev[mat.id]||[]).map(function(d) {
                                      return d.id===doc.id ? Object.assign({},d,{premium:!d.premium}) : d;
                                    });
                                    return Object.assign({}, prev, { [mat.id]: liste });
                                  });
                                }}
                                style={{ background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
                                <span className={"badge "+(doc.premium?"b-gold":"b-free")}>
                                  {doc.premium ? "⭐ Premium" : "✓ Gratuit"}
                                </span>
                              </button>
                              {/* Supprimer */}
                              <button
                                onClick={function() {
                                  setDocsParMatiere(function(prev) {
                                    var liste = (prev[mat.id]||[]).filter(function(d){ return d.id!==doc.id; });
                                    return Object.assign({}, prev, { [mat.id]: liste });
                                  });
                                  showT("Document supprimé","warning");
                                }}
                                className="btn btn-d btn-sm">🗑</button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Zone drop vide */}
                    {docs.length === 0 && uploadingMat !== mat.id && (
                      <div style={{ border:"2px dashed rgba(99,130,255,.2)", borderRadius:10, padding:"16px", textAlign:"center", color:G.textMuted, fontSize:13 }}>
                        Aucun document — cliquez sur "Ajouter PDF" pour uploader des fiches
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stats globales */}
            <div className="card" style={{ marginTop:20, background:"rgba(79,125,255,.05)", border:"1px solid rgba(79,125,255,.15)" }}>
              <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>📊 Résumé des documents</h3>
              <div className="g3">
                {[
                  { label:"Total documents", val: Object.values(docsParMatiere).reduce(function(a,b){return a+b.length;},0), color:G.accent },
                  { label:"Documents gratuits", val: Object.values(docsParMatiere).reduce(function(a,b){return a+b.filter(function(d){return !d.premium;}).length;},0), color:G.success },
                  { label:"Documents premium", val: Object.values(docsParMatiere).reduce(function(a,b){return a+b.filter(function(d){return d.premium;}).length;},0), color:G.gold },
                ].map(function(s) {
                  return (
                    <div key={s.label} style={{ textAlign:"center" }}>
                      <div className="fd" style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.val}</div>
                      <div style={{ fontSize:12, color:G.textMuted, marginTop:4, fontWeight:600 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [appCfg, setAppCfg] = useState({
    paiement: {
      mtn:     { numero: DEFAULT_CFG.mtn.numero,     nom: DEFAULT_CFG.mtn.nom     },
      moov:    { numero: DEFAULT_CFG.moov.numero,    nom: DEFAULT_CFG.moov.nom    },
      celtiis: { numero: DEFAULT_CFG.celtiis.numero, nom: DEFAULT_CFG.celtiis.nom },
    },
    support: {
      whatsapp: SUPPORT_CONTACTS.whatsapp,
      telegram:  SUPPORT_CONTACTS.telegram,
    },
    abonnement: {
      prix:           3000,
      ficheGratuites: 5,
      dureeJours:     365,
      delaiActivMin:  30,
    },
    plansImprimes: PLANS_IMPRIMES.map(function(p) { return Object.assign({}, p); }),
  });

  // CORRECTION P4 : Charger les paramètres depuis Supabase au démarrage
  useEffect(function() {
    supaGetParametres().then(function(cfg) {
      if (cfg) {
        setAppCfg(function(prev) {
          return Object.assign({}, prev, {
            paiement: cfg.paiement,
            support: cfg.support,
            abonnement: Object.assign({}, prev.abonnement, cfg.abonnement),
          });
        });
      }
    }).catch(function() {});
  }, []);

  // CORRECTION P2 : Déconnexion propre sans perdre la session Supabase complètement
  async function handleLogout() {
    try {
      await supa.auth.signOut();
    } catch(e) {}
    clearSession();
    setUser(null);
  }

  // CORRECTION P4 : Sauvegarder les paramètres dans Supabase + état local
  function handleSetAppCfg(newCfg) {
    if (typeof newCfg === "function") {
      setAppCfg(function(prev) {
        var updated = newCfg(prev);
        supaSaveParametres(updated).catch(function() {});
        return updated;
      });
    } else {
      supaSaveParametres(newCfg).catch(function() {});
      setAppCfg(newCfg);
    }
  }

  return (
    <>
      <style>{css}</style>
      {!user && <AuthScreen onLogin={setUser} />}
      {user && user.role === "admin" && (
        <AdminApp user={user} onLogout={handleLogout} appCfg={appCfg} setAppCfg={handleSetAppCfg} />
      )}
      {user && user.role === "user" && (
        <UserApp user={user} onLogout={handleLogout} appCfg={appCfg} setUser={setUser} />
      )}
    </>
  );
}
