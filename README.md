# Portfolio Étudiant - README

## Objectif

Ce projet vise à créer un portfolio professionnel pour mettre en valeur les projets étudiants de notre filière, destiné à être présenté lors des JPO ou salons.

## Membres du groupe

- [Candille Thomas]
- [Garnier Quentin](https://github.com/F1N3X)
- [Letard Pierric]
- [Moccand-J Michel (BOMBACLAAAT)](https://github.com/Kan-A-Pesh)

## Technologies utilisées

- **API** : API Platform (Symfony ou Laravel)
- **Frontend** : Next.JS
- **Base de données** : PostgreSQL

## Fonctionnalités principales

### Interface publique

- Liste des projets avec visuels
- Page projet détaillée (visuels, description, étudiants, année, technologies, lien en ligne, etc.)
- Formulaire d'inscription pour être recontacté

### Interface administrateur

- Liste des projets
- Publication de nouveaux projets
- Masquage/affichage de projets
- Suppression définitive de projets

## Contraintes techniques

- Responsive jusqu'au mobile
- Sécurisé (authentification, contrôle d'accès, hash des mots de passe)
- Optimisé SEO & accessibilité (HTML5 sémantique, alt images, etc.)
- Vérification des formulaires et messages de succès/erreur

## Installation

1. **Cloner le repository**

   ```
   git clone https://github.com/ThomasCandille/PortFolio_SchoolWork
   cd PortFolio_SchoolWork
   ```

2. **Configurer l'API**

   - Installer les dépendances :
     ```
     cd back
     composer install
     ```
   - Copier le fichier d'environnement :
     ```
     cp .env .env.local
     ```
   - Modifier `.env.local` avec vos paramètres (voir section "Configuration")

   - Lancer le serveur :
     ```
     symfony serve
     ```
     ou
     ```
     php -S localhost:8000 -t public
     ```

3. **Configurer le Frontend**

   - Installer les dépendances :
     ```
     cd front
     npm install
     ```
   - Lancer le serveur de développement :
     ```
     npm start
     ```

4. **Importer la base de données**
   - Importer le fichier `data.sql` fourni :
     ```
     mysql -u [user] -p [database] < data.sql
     ```

## Tests API

Une suite de tests complète est disponible pour valider le bon fonctionnement de l'API.

### Prérequis

- Serveur Symfony lancé (`symfony serve` sur http://127.0.0.1:8000)
- Base de données configurée et migrations appliquées
- Données de test chargées (voir section "Installation")

### Lancer tous les tests

```bash
cd back
./tests/run_all_tests.sh
```

### Lancer des tests spécifiques

```bash
# Tests des projets uniquement
./tests/test_projects.sh

# Tests des étudiants uniquement
./tests/test_students.sh

# Tests des technologies uniquement
./tests/test_technologies.sh

# Tests des demandes de contact uniquement
./tests/test_contact.sh
```

### Couverture des tests

Les tests vérifient automatiquement :

- **Endpoints publics** : Accès en lecture sans authentification
- **Endpoints administrateur** : CRUD complet avec authentification JWT
- **Validation des données** : Contraintes et formats requis
- **Sécurité** : Blocage des accès non autorisés
- **Réponses API** : Codes de statut et structure JSON

#### Tests par entité :

**Projets** (`/api/projects`)

- ✅ Liste publique des projets
- ✅ Création/modification/suppression (admin)
- ✅ Validation des champs requis
- ✅ Contrôle d'accès

**Étudiants** (`/api/students`)

- ✅ Liste publique des étudiants
- ✅ Gestion complète (admin)
- ✅ Validation email et année d'étude

**Technologies** (`/api/technologies`)

- ✅ Liste publique des technologies
- ✅ Gestion des catégories
- ✅ CRUD administrateur

**Demandes de contact** (`/api/contact_requests`)

- ✅ Soumission publique de demandes
- ✅ Gestion administrative des demandes
- ✅ Validation des statuts

### Résultats des tests

Les tests affichent :

- 🟢 **Statut de chaque test** (✅ réussi / ❌ échoué)
- 📊 **Résumé par suite** (nombre de tests passés/échoués)
- 🎯 **Résultat global** (toutes les suites combinées)

## Configuration

Exemple de contenu pour `.env.local` (API Symfony) :
