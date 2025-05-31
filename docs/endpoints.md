# API Endpoints - Portfolio

## Authentification

### POST /api/auth/login

- **Description**: Connexion administrateur
- **Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, user: object }`
- **Status**: 200 (succès), 401 (échec)

### POST /api/auth/logout

- **Description**: Déconnexion administrateur
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 200

### GET /api/auth/me

- **Description**: Vérification du token et récupération des infos utilisateur
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ user: object }`
- **Status**: 200, 401

## Projets - Interface Publique

### GET /api/projects

- **Description**: Liste des projets publiés (interface publique)
- **Query params**:
  - `page` (int, optionnel): Numéro de page
  - `limit` (int, optionnel): Nombre d'éléments par page
  - `search` (string, optionnel): Recherche par titre/description
  - `technology` (string, optionnel): Filtrer par technologie
  - `year` (string, optionnel): Filtrer par année d'étude
- **Response**:

```json
{
  "data": [
    {
      "id": int,
      "title": string,
      "description": string,
      "shortDescription": string,
      "images": [string],
      "mainImage": string,
      "technologies": [string],
      "year": string,
      "students": [
        {
          "id": int,
          "name": string,
          "email": string
        }
      ],
      "liveUrl": string,
      "githubUrl": string,
      "createdAt": string,
      "updatedAt": string
    }
  ],
  "pagination": {
    "currentPage": int,
    "totalPages": int,
    "totalItems": int,
    "hasNext": boolean,
    "hasPrev": boolean
  }
}
```

- **Status**: 200

### GET /api/projects/{id}

- **Description**: Détail d'un projet publié
- **Response**: Objet projet complet (même structure que ci-dessus)
- **Status**: 200, 404

## Étudiants - Interface Publique

### GET /api/students

- **Description**: Liste des étudiants (pour affichage dans les projets)
- **Response**:

```json
{
  "data": [
    {
      "id": int,
      "name": string,
      "email": string,
      "year": string,
      "projects": [
        {
          "id": int,
          "title": string,
          "mainImage": string
        }
      ]
    }
  ]
}
```

- **Status**: 200

## Contact/Inscriptions

### POST /api/contact/admissions

- **Description**: Formulaire de contact pour admissions
- **Body**:

```json
{
  "firstName": string,
  "lastName": string,
  "email": string,
  "phone": string,
  "message": string,
  "interestedProgram": string,
  "gdprConsent": boolean
}
```

- **Response**: `{ message: string, id: int }`
- **Status**: 201, 400

## Technologies

### GET /api/technologies

- **Description**: Liste des technologies disponibles
- **Response**:

```json
{
  "data": [
    {
      "id": int,
      "name": string,
      "category": string,
      "icon": string
    }
  ]
}
```

- **Status**: 200

## Projets - Interface Admin

### GET /api/admin/projects

- **Description**: Liste de tous les projets (publiés et cachés)
- **Headers**: `Authorization: Bearer {token}`
- **Query params**: Mêmes que l'interface publique + `status` (published|hidden|draft)
- **Response**: Structure similaire à `/api/projects` avec champs supplémentaires:
  - `status`: string (published|hidden|draft)
  - `views`: int
- **Status**: 200, 401, 403

### POST /api/admin/projects

- **Description**: Créer un nouveau projet
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "title": string,
  "description": string,
  "shortDescription": string,
  "technologies": [int],
  "studentIds": [int],
  "year": string,
  "liveUrl": string,
  "githubUrl": string,
  "status": string,
  "images": [File]
}
```

- **Response**: Objet projet créé
- **Status**: 201, 400, 401, 403

### PUT /api/admin/projects/{id}

- **Description**: Modifier un projet existant
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Même structure que POST (champs optionnels)
- **Response**: Objet projet modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/admin/projects/{id}

- **Description**: Supprimer définitivement un projet
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 200, 401, 403, 404

### PATCH /api/admin/projects/{id}/status

- **Description**: Changer le statut d'un projet (publier/cacher)
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ status: string }` (published|hidden|draft)
- **Response**: `{ message: string, project: object }`
- **Status**: 200, 400, 401, 403, 404

## Étudiants - Interface Admin

### GET /api/admin/students

- **Description**: Liste de tous les étudiants
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Liste complète des étudiants
- **Status**: 200, 401, 403

### POST /api/admin/students

- **Description**: Ajouter un nouvel étudiant
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "name": string,
  "email": string,
  "year": string,
  "bio": string
}
```

- **Response**: Objet étudiant créé
- **Status**: 201, 400, 401, 403

### PUT /api/admin/students/{id}

- **Description**: Modifier un étudiant
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Champs modifiables de l'étudiant
- **Response**: Objet étudiant modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/admin/students/{id}

- **Description**: Supprimer un étudiant
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 200, 401, 403, 404

## Technologies - Interface Admin

### POST /api/admin/technologies

- **Description**: Ajouter une nouvelle technologie
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "name": string,
  "category": string,
  "icon": File
}
```

- **Response**: Objet technologie créé
- **Status**: 201, 400, 401, 403

### PUT /api/admin/technologies/{id}

- **Description**: Modifier une technologie
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Champs modifiables
- **Response**: Objet technologie modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/admin/technologies/{id}

- **Description**: Supprimer une technologie
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 200, 401, 403, 404

## Contact/Admissions - Interface Admin

### GET /api/admin/contacts

- **Description**: Liste des demandes de contact
- **Headers**: `Authorization: Bearer {token}`
- **Query params**:
  - `status` (new|read|replied)
  - `page`, `limit`
- **Response**: Liste des demandes avec détails complets
- **Status**: 200, 401, 403

### PATCH /api/admin/contacts/{id}/status

- **Description**: Marquer une demande comme lue/traitée
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ status: string }`
- **Response**: `{ message: string }`
- **Status**: 200, 401, 403, 404

## Upload/Médias

### POST /api/admin/upload

- **Description**: Upload de fichiers (images, documents)
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `multipart/form-data` avec fichier(s)
- **Response**:

```json
{
  "files": [
    {
      "filename": string,
      "url": string,
      "size": int,
      "mimetype": string
    }
  ]
}
```

- **Status**: 201, 400, 401, 403

### DELETE /api/admin/upload/{filename}

- **Description**: Supprimer un fichier uploadé
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 200, 401, 403, 404

## Statistiques - Interface Admin

### GET /api/admin/dashboard/stats

- **Description**: Statistiques pour le dashboard admin
- **Headers**: `Authorization: Bearer {token}`
- **Response**:

```json
{
  "totalProjects": int,
  "publishedProjects": int,
  "totalStudents": int,
  "totalContacts": int,
  "newContacts": int,
  "monthlyViews": object,
  "topProjects": array
}
```

- **Status**: 200, 401, 403
