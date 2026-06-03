-- ═══════════════════════════════════════════════════════════
-- FICHESPRO — Script SQL Supabase
-- Copiez-collez ce code dans l'éditeur SQL de Supabase
-- Dashboard → SQL Editor → New Query → Coller → Run
-- ═══════════════════════════════════════════════════════════

-- ─── TABLE USERS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'teacher')),
  avatar_url TEXT,
  date_inscription TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  abonnement_actif BOOLEAN DEFAULT FALSE,
  abonnement_expire TIMESTAMP WITH TIME ZONE,
  nb_fiches_gratuites_utilisees INTEGER DEFAULT 0
);

-- ─── TABLE FICHES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.fiches (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  matiere TEXT NOT NULL,
  matiere_id TEXT NOT NULL,
  niveau TEXT NOT NULL,
  pages INTEGER DEFAULT 1,
  premium BOOLEAN DEFAULT FALSE,
  note DECIMAL(3,1) DEFAULT 4.5,
  nb_telechargements INTEGER DEFAULT 0,
  description TEXT,
  fichier_url TEXT,
  fichier_nom TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE FAVORIS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.favoris (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  fiche_id BIGINT REFERENCES public.fiches(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fiche_id)
);

-- ─── TABLE HISTORIQUE TELECHARGEMENTS ─────────────────────────
CREATE TABLE IF NOT EXISTS public.historique_telechargements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  fiche_id BIGINT REFERENCES public.fiches(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE ABONNEMENTS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.abonnements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'annuel' CHECK (type IN ('annuel', 'famille', 'ecole-s', 'ecole-m', 'ecole-l')),
  prix INTEGER NOT NULL,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'actif', 'expire', 'annule')),
  date_debut TIMESTAMP WITH TIME ZONE,
  date_fin TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE PAIEMENTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.paiements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  abonnement_id BIGINT REFERENCES public.abonnements(id),
  montant INTEGER NOT NULL,
  methode TEXT CHECK (methode IN ('mtn', 'moov', 'celtiis')),
  reference_transaction TEXT,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirme', 'echec')),
  nom_payeur TEXT,
  telephone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE TICKETS SUPPORT ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tickets (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  sujet TEXT NOT NULL,
  statut TEXT DEFAULT 'Nouveau' CHECK (statut IN ('Nouveau', 'En cours', 'Résolu')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE MESSAGES TICKETS ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages_ticket (
  id BIGSERIAL PRIMARY KEY,
  ticket_id BIGINT REFERENCES public.tickets(id) ON DELETE CASCADE,
  auteur TEXT CHECK (auteur IN ('user', 'admin')),
  nom TEXT NOT NULL,
  texte TEXT NOT NULL,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE DEMANDES FICHES ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.demandes_fiches (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  titre TEXT NOT NULL,
  matiere TEXT NOT NULL,
  niveau TEXT NOT NULL,
  description TEXT,
  statut TEXT DEFAULT 'En attente' CHECK (statut IN ('En attente', 'En cours', 'Terminée')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE LIVRAISONS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.livraisons (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  client TEXT NOT NULL,
  tel TEXT NOT NULL,
  plan TEXT NOT NULL,
  zone TEXT NOT NULL,
  statut TEXT DEFAULT 'En attente' CHECK (statut IN ('En attente', 'Préparation', 'Expédié', 'Livré', 'Annulé')),
  montant INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── TABLE CODES PROMO ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.codes_promo (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  reduction INTEGER NOT NULL,
  type TEXT DEFAULT 'pourcentage' CHECK (type IN ('pourcentage', 'montant')),
  actif BOOLEAN DEFAULT TRUE,
  utilises INTEGER DEFAULT 0,
  max_utilisations INTEGER DEFAULT 100,
  date_expiration DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) — Sécurité par ligne
-- ═══════════════════════════════════════════════════════════

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historique_telechargements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abonnements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages_ticket ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demandes_fiches ENABLE ROW LEVEL SECURITY;

-- Fiches : lecture publique
ALTER TABLE public.fiches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Fiches visibles par tous" ON public.fiches FOR SELECT USING (true);
CREATE POLICY "Admin peut gérer les fiches" ON public.fiches FOR ALL USING (auth.jwt() ->> 'email' = 'admin@fichespro.com');

-- Users : chaque utilisateur voit son propre profil
CREATE POLICY "Utilisateur voit son profil" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Utilisateur modifie son profil" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Inscription crée le profil" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Favoris : chaque utilisateur gère ses favoris
CREATE POLICY "Favoris par utilisateur" ON public.favoris FOR ALL USING (auth.uid() = user_id);

-- Historique : chaque utilisateur voit son historique
CREATE POLICY "Historique par utilisateur" ON public.historique_telechargements FOR ALL USING (auth.uid() = user_id);

-- Tickets : chaque utilisateur voit ses tickets
CREATE POLICY "Tickets par utilisateur" ON public.tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Créer un ticket" ON public.tickets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages tickets : lecture par owner du ticket
CREATE POLICY "Messages visibles" ON public.messages_ticket FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_id AND user_id = auth.uid())
  OR auth.jwt() ->> 'email' = 'admin@fichespro.com'
);
CREATE POLICY "Ajouter un message" ON public.messages_ticket FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_id AND user_id = auth.uid())
  OR auth.jwt() ->> 'email' = 'admin@fichespro.com'
);

-- Demandes : chaque utilisateur voit ses demandes
CREATE POLICY "Demandes par utilisateur" ON public.demandes_fiches FOR ALL USING (auth.uid() = user_id);

-- Codes promo : lecture publique
ALTER TABLE public.codes_promo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Codes promo visibles" ON public.codes_promo FOR SELECT USING (actif = true);

-- Livraisons : visibles par tous (pour l'admin)
CREATE POLICY "Livraisons visibles" ON public.livraisons FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════
-- DONNÉES DE DÉMONSTRATION
-- ═══════════════════════════════════════════════════════════

-- Insérer les fiches de démonstration
INSERT INTO public.fiches (titre, matiere, matiere_id, niveau, pages, premium, note, nb_telechargements, description) VALUES
('La politesse au quotidien', 'ES / Morale', 'es-morale', 'CE1', 4, false, 4.8, 342, 'Fiche sur les règles de politesse dans la vie quotidienne'),
('Les droits et devoirs du citoyen', 'ES / Civisme', 'es-civisme', 'CM2', 6, true, 4.9, 218, 'Les droits fondamentaux et les devoirs civiques'),
('Les grandes civilisations africaines', 'ES / Histoire', 'es-histoire', 'CM1', 8, false, 4.7, 456, 'Histoire des grandes civilisations du continent africain'),
('Le relief du Bénin', 'ES / Géographie', 'es-geo', 'CE2', 5, true, 4.6, 189, 'Étude du relief et des régions géographiques du Bénin'),
('Multiplication et division', 'Maths · Arithmétique', 'maths-arith', 'CM1', 7, false, 5.0, 621, 'Techniques de multiplication et division'),
('Les figures géométriques', 'Maths · Géométrie', 'maths-geo', 'CE2', 6, true, 4.8, 274, 'Les principales figures géométriques et leurs propriétés'),
('Les fractions simples', 'Maths · Arithmétique', 'maths-arith', 'CM2', 5, false, 4.7, 398, 'Introduction aux fractions simples'),
('La photosynthèse expliquée', 'EST', 'est', 'CM1', 9, true, 4.9, 512, 'Le processus de photosynthèse chez les plantes'),
('Poèmes sur la nature', 'EA · Poésie', 'ea-poesie', 'CE1', 3, false, 4.5, 287, 'Recueil de poèmes sur la nature béninoise'),
('Les temps du passé', 'Français · Conjugaison', 'fr-conjug', 'CM2', 8, false, 4.9, 534, 'Conjugaison des verbes aux temps du passé'),
('Vocabulaire thématique : la ville', 'Français · Vocabulaire', 'fr-vocab', 'CE2', 4, true, 4.6, 193, 'Vocabulaire sur la ville et ses éléments'),
('L''accord sujet-verbe', 'Français · Grammaire', 'fr-gram', 'CM1', 6, false, 4.8, 445, 'Règles d''accord entre le sujet et le verbe')
ON CONFLICT DO NOTHING;

-- Insérer les codes promo
INSERT INTO public.codes_promo (code, reduction, type, actif, max_utilisations, date_expiration) VALUES
('RENTREE25', 25, 'pourcentage', true, 100, '2025-10-31'),
('PROF50', 50, 'pourcentage', true, 20, '2025-06-30')
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- FIN DU SCRIPT
-- Après exécution, allez dans Authentication > Settings
-- et désactivez "Confirm email" pour les tests
-- ═══════════════════════════════════════════════════════════
