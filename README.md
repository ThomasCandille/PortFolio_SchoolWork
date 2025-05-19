# Portfolio Étudiant - README

## Objectif

Ce projet vise à créer un portfolio professionnel pour mettre en valeur les projets étudiants de notre filière, destiné à être présenté lors des JPO ou salons.

---

## Membres du groupe 

- [Candille Thomas]
- [Garnier Quentin]
- [Letard Pierrick]
- [Moccand-J Michel (BOMBACLAAAT)](https://github.com/Kan-A-Pesh)

---

## Technologies utilisées

- **API** : API Platform (Symfony ou Laravel)
- **Frontend** : Next.JS
- **Base de données** : PostgreSQL

---

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

---

## Contraintes techniques

- Responsive jusqu'au mobile
- Sécurisé (authentification, contrôle d'accès, hash des mots de passe)
- Optimisé SEO & accessibilité (HTML5 sémantique, alt images, etc.)
- Vérification des formulaires et messages de succès/erreur

---

## Installation

1. **Cloner le repository**
    ```
    git clone https://github.com/ThomasCandille/PortFolio_SchoolWork
    cd PortFolio_SchoolWork
    ```

2. **Configurer l'API**
    - Installer les dépendances :
      ```
      cd api
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

---

## Configuration

Exemple de contenu pour `.env.local` (API Symfony) :
