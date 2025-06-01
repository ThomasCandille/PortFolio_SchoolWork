# Sitemap Frontend - Portfolio

## Interface Publique

### `/` - Page d'accueil

**Description**: Landing page du portfolio de la filière
**Contenu**:

- Hero section avec présentation de la filière
- Aperçu des projets phares (carousel/grille)
- Statistiques (nombre de projets, d'étudiants, années d'expérience)
- Témoignages d'anciens étudiants
- Call-to-action vers le formulaire de contact

**Features**:

- Design responsive
- Animations au scroll
- Optimisation SEO (meta tags, structured data)
- Accessibilité (alt tags, navigation clavier)

---

### `/projects` - Liste des projets

**Description**: Page listant tous les projets publiés
**Contenu**:

- Grille de projets avec images, titres et courtes descriptions
- Filtres par technologie, année, type de projet
- Barre de recherche
- Pagination
- Nombre total de projets affiché

**Features**:

- Filtrage dynamique (sans rechargement de page)
- Recherche en temps réel
- Lazy loading des images
- URLs avec paramètres pour le SEO (`/projects?tech=react&yearOfStudy=2`)
- Breadcrumbs
- Tri par date, popularité, alphabétique

---

### `/projects/[id]` - Détail d'un projet

**Description**: Page détaillée d'un projet spécifique
**Contenu**:

- Galerie d'images/vidéos du projet
- Description complète du projet
- Technologies utilisées (avec icônes)
- Informations sur les étudiants contributeurs
- Liens vers le projet en ligne et GitHub
- Année de réalisation
- Contexte pédagogique
- Projets similaires/recommandés

**Features**:

- Galerie avec lightbox
- Partage sur réseaux sociaux
- Breadcrumbs
- Navigation projet précédent/suivant
- Schema markup pour les moteurs de recherche
- Boutons d'action (voir le projet, voir le code)

---

### `/students` - Liste des étudiants

**Description**: Annuaire des étudiants ayant contribué aux projets
**Contenu**:

- Cartes d'étudiants avec photos et informations
- Liste des projets par étudiant
- Filtres par promotion/année
- Liens vers leurs profils LinkedIn/GitHub

**Features**:

- Filtrage par promotion
- Recherche par nom
- Responsive grid
- Liens vers les projets associés

---

### `/contact` - Formulaire de contact admissions

**Description**: Page de contact pour les futures admissions
**Contenu**:

- Formulaire de demande d'informations
- Informations de contact de l'école
- FAQ sur les admissions
- Carte avec localisation
- Horaires d'ouverture

**Features**:

- Validation côté client et serveur
- Messages d'erreur/succès
- Consentement RGPD
- reCAPTCHA pour éviter le spam
- Envoi d'email de confirmation

---

## Interface Administrateur

### `/admin` - Redirection vers login

**Description**: Page d'accueil de l'interface admin
**Contenu**:

- Statistiques globales (projets, étudiants, contacts)
- Graphiques d'évolution
- Dernières activités
- Raccourcis vers les actions principales

**Features**:

- Widgets interactifs
- Données en temps réel
- Responsive design
- Notifications d'alertes

---

### `/admin/login` - Connexion administrateur

**Description**: Page de connexion sécurisée
**Contenu**:

- Formulaire de connexion (email/mot de passe)
- Lien "Mot de passe oublié"
- Messages d'erreur

**Features**:

- Validation des champs
- Protection CSRF
- Rate limiting sur les tentatives
- Redirection après connexion réussie

---

### `/admin/projects` - Gestion des projets

**Description**: Liste de tous les projets (publiés, cachés, brouillons)
**Contenu**:

- Tableau avec tous les projets
- Colonnes: titre, statut, étudiants, technologies, date
- Filtres et recherche
- Actions rapides (publier/cacher/supprimer)

**Features**:

- Pagination
- Tri par colonnes
- Filtres multiples
- Actions en lot
- Prévisualisation rapide

---

### `/admin/projects/new` - Créer un projet

**Description**: Formulaire de création d'un nouveau projet
**Contenu**:

- Formulaire complet avec tous les champs
- Upload d'images avec prévisualisation
- Sélection des étudiants et technologies
- Choix du statut (brouillon/publié/caché)

**Features**:

- Sauvegarde automatique en brouillon
- Upload par drag & drop
- Prévisualisation en temps réel
- Validation des champs obligatoires

---

### `/admin/projects/[id]/edit` - Modifier un projet

**Description**: Formulaire d'édition d'un projet existant
**Contenu**:

- Même formulaire que la création, pré-rempli
- Historique des modifications
- Options de publication/dépublication

**Features**:

- Comparaison avec la version précédente
- Sauvegarde des modifications
- Confirmation avant suppression

---

### `/admin/students` - Gestion des étudiants

**Description**: Liste et gestion des étudiants
**Contenu**:

- Tableau des étudiants avec informations
- Nombre de projets par étudiant
- Actions d'édition/suppression

**Features**:

- Ajout rapide d'étudiant
- Import par fichier CSV
- Filtres par promotion/statut

---

### `/admin/students/new` - Ajouter un étudiant

**Description**: Formulaire d'ajout d'un nouvel étudiant
**Contenu**:

- Formulaire avec nom, email, promotion, bio
- Upload de photo de profil

**Features**:

- Validation email unique
- Redimensionnement automatique de la photo

---

### `/admin/students/[id]/edit` - Modifier un étudiant

**Description**: Formulaire d'édition d'un étudiant
**Contenu**:

- Modification des informations
- Liste des projets associés
- Historique des contributions

---

### `/admin/technologies` - Gestion des technologies

**Description**: Liste et gestion des technologies
**Contenu**:

- Liste des technologies avec icônes
- Catégorisation (Frontend, Backend, Database, etc.)
- Usage dans les projets

**Features**:

- Ajout/modification/suppression
- Upload d'icônes
- Statistiques d'utilisation

---

### `/admin/contacts` - Gestion des contacts

**Description**: Liste des demandes de contact reçues
**Contenu**:

- Tableau des demandes avec statuts
- Détails de chaque demande
- Actions de traitement

**Features**:

- Marquage lu/non lu
- Réponse par email
- Export des données
- Filtres par statut/date

---

### `/admin/settings` - Paramètres

**Description**: Configuration générale de l'application
**Contenu**:

- Paramètres de l'école
- Configuration email
- Paramètres SEO globaux
- Gestion des utilisateurs admin

**Features**:

- Sauvegarde des modifications
- Test de configuration email
- Gestion des permissions

---

## Navigation et Layout

### Header Navigation (Public)

- Logo/Nom de la filière
- Menu: Accueil, Projets, Étudiants, À propos, Contact
- Bouton de recherche
- Sélecteur de langue (si multilingue)

### Header Navigation (Admin)

- Logo admin
- Menu: Dashboard, Projets, Étudiants, Technologies, Contacts, Paramètres
- Notifications
- Profil utilisateur avec déconnexion

### Footer (Public)

- Liens rapides
- Réseaux sociaux de l'école
- Informations légales
- Plan du site

### Sidebar (Admin)

- Navigation principale
- Raccourcis rapides
- Indicateurs de statut
