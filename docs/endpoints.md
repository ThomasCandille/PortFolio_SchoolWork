# API Endpoints - Portfolio (Simplified)

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

## Projets

### GET /api/projects

- **Description**: Liste des projets (public: publiés seulement, admin: tous)
- **Access**: Public (filtrés) ou Admin (tous)
- **Query params**:
  - `page` (int, optionnel): Numéro de page
  - `limit` (int, optionnel): Nombre d'éléments par page
- **Response**:

```json
{
  "hydra:member": [
    {
      "id": int,
      "title": string,
      "description": string,
      "shortDescription": string,
      "images": [string],
      "mainImage": string,
      "technologies": [
        {
          "id": int,
          "name": string,
          "icon": string
        }
      ],
      "yearOfStudy": string,
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
      "updatedAt": string,
      "status": string, // admin only
      "views": int      // admin only
    }
  ],
  "hydra:totalItems": int
}
```

- **Status**: 200

### GET /api/projects/{id}

- **Description**: Détail d'un projet (public: si publié, admin: tous)
- **Access**: Public (si publié) ou Admin (tous)
- **Response**: Objet projet complet (même structure que ci-dessus)
- **Status**: 200, 404

### POST /api/projects

- **Description**: Créer un nouveau projet
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "title": string,
  "description": string,
  "shortDescription": string,
  "technologies": ["/api/technologies/{id}"],
  "students": ["/api/students/{id}"],
  "yearOfStudy": string,
  "liveUrl": string,
  "githubUrl": string,
  "status": string,
  "images": [string],
  "mainImage": string
}
```

- **Response**: Objet projet créé
- **Status**: 201, 400, 401, 403

### PUT /api/projects/{id}

- **Description**: Modifier un projet existant
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Même structure que POST (champs optionnels)
- **Response**: Objet projet modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/projects/{id}

- **Description**: Supprimer un projet
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 204, 401, 403, 404

## Étudiants

### GET /api/students

- **Description**: Liste des étudiants
- **Access**: Public
- **Response**:

```json
{
  "hydra:member": [
    {
      "id": int,
      "name": string,
      "email": string,
      "yearOfStudy": string,
      "bio": string,
      "projects": [
        {
          "id": int,
          "title": string,
          "mainImage": string
        }
      ],
      "createdAt": string,
      "updatedAt": string
    }
  ]
}
```

- **Status**: 200

### GET /api/students/{id}

- **Description**: Détail d'un étudiant
- **Access**: Public
- **Response**: Objet étudiant complet
- **Status**: 200, 404

### POST /api/students

- **Description**: Ajouter un nouvel étudiant
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "name": string,
  "email": string,
  "yearOfStudy": string,
  "bio": string
}
```

- **Response**: Objet étudiant créé
- **Status**: 201, 400, 401, 403

### PUT /api/students/{id}

- **Description**: Modifier un étudiant
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Champs modifiables de l'étudiant
- **Response**: Objet étudiant modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/students/{id}

- **Description**: Supprimer un étudiant
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 204, 401, 403, 404

## Technologies

### GET /api/technologies

- **Description**: Liste des technologies disponibles
- **Access**: Public
- **Response**:

```json
{
  "hydra:member": [
    {
      "id": int,
      "name": string,
      "category": string,
      "icon": string,
      "createdAt": string,
      "updatedAt": string
    }
  ]
}
```

- **Status**: 200

### GET /api/technologies/{id}

- **Description**: Détail d'une technologie
- **Access**: Public
- **Response**: Objet technologie complet
- **Status**: 200, 404

### POST /api/technologies

- **Description**: Ajouter une nouvelle technologie
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**:

```json
{
  "name": string,
  "category": string,
  "icon": string
}
```

- **Response**: Objet technologie créé
- **Status**: 201, 400, 401, 403

### PUT /api/technologies/{id}

- **Description**: Modifier une technologie
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Champs modifiables
- **Response**: Objet technologie modifié
- **Status**: 200, 400, 401, 403, 404

### DELETE /api/technologies/{id}

- **Description**: Supprimer une technologie
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 204, 401, 403, 404

## Contact/Admissions

### POST /api/contact/admissions

- **Description**: Formulaire de contact pour admissions
- **Access**: Public
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

### GET /api/contact_requests

- **Description**: Liste des demandes de contact
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Query params**:
  - `page`, `limit`
- **Response**: Liste des demandes avec détails complets
- **Status**: 200, 401, 403

### GET /api/contact_requests/{id}

- **Description**: Détail d'une demande de contact
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Objet demande complet avec champs admin (status, adminNotes, updatedAt)
- **Status**: 200, 401, 403, 404

### PUT /api/contact_requests/{id}

- **Description**: Modifier une demande (statut, notes admin)
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ status: string, adminNotes: string }`
- **Response**: Objet demande modifié
- **Status**: 200, 401, 403, 404

### DELETE /api/contact_requests/{id}

- **Description**: Supprimer une demande de contact
- **Access**: Admin seulement
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`
- **Status**: 204, 401, 403, 404

## Notes Importantes

### Filtrage Automatique

- **Projets**: Les utilisateurs publics ne voient que les projets avec `status: 'published'`
- **Données Admin**: Les champs `status`, `views`, `adminNotes`, etc. ne sont visibles que pour les admins

### Sérialisation

- **Public**: Groupes `entity:read` seulement
- **Admin**: Groupes `entity:read` + `entity:admin` pour les champs sensibles
- **Écriture**: Groupe `entity:write` pour les opérations POST/PUT

### Sécurité

- **Authentification**: Gérée par JWT tokens
- **Autorisation**: Gérée par les attributs `security: "is_granted('ROLE_ADMIN')"` sur les opérations
- **Filtrage**: Implémenté via State Providers pour filtrer automatiquement le contenu
