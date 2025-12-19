# Assistant RH - Prédicteur de Départ d'Employés

Ce projet est une solution intelligente d'assistance aux Ressources Humaines (RH) qui utilise l'Intelligence Artificielle pour prédire l'attrition des employés (le risque de départ) et générer des plans de développement personnalisés.

## Fonctionnalités

- **Prédiction d'Attrition** : Utilise un modèle de Machine Learning (Scikit-learn) pour analyser les données des employés et prédire s'ils risquent de quitter l'entreprise.
- **Plans de Croissance Personnalisés** : Intégration avec l'IA Google Gemini pour générer des stratégies de rétention, des scripts d'entretien et des plans de carrière basés sur le profil de l'employé.
- **Gestion des Employés** : Interface complète pour visualiser, ajouter et supprimer des profils d'employés.
- **Tableau de Bord Analytique** : Visualisation moderne et interactive des données RH.
- **Authentification Sécurisée** : Système de connexion et d'inscription pour protéger les données sensibles.

## Technologies Utilisées

### Backend
- **Framework** : FastAPI (Python)
- **Base de données** : PostgreSQL avec SQLAlchemy (ORM)
- **Machine Learning** : Scikit-learn, Pandas, Joblib
- **IA Générative** : Google Gemini API
- **Sécurité** : JWT (JSON Web Tokens), Passlib (Argon2)

### Frontend
- **Framework** : Next.js 15 (App Router)
- **UI/UX** : React 19, Tailwind CSS
- **Animations** : Framer Motion, Three.js (pour les effets 3D)
- **Icônes** : Lucide React

## Installation

### Prérequis
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Configuration du Backend
1. Accédez au dossier backend :
   ```bash
   cd backend
   ```
2. Créez un environnement virtuel et installez les dépendances :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows: venv\Scripts\activate
   pip install -r ../requirements.txt
   ```
3. Configurez les variables d'environnement dans un fichier `.env` :
   ```env
   user=votre_utilisateur
   password=votre_mot_de_passe
   host=localhost
   port=5432
   database=votre_base_de_données
   SECRET_KEY=votre_cle_secrete
   ALGORITHM=HS256
   GEMINI_API_KEY=votre_cle_gemini
   ```
4. Lancez le serveur :
   ```bash
   uvicorn main:app --reload
   ```

### Configuration du Frontend
1. Accédez au dossier frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```

## Modèle de Machine Learning
Le modèle a été entraîné sur des données historiques d'employés pour identifier les facteurs clés de départ (satisfaction au travail, équilibre vie pro/perso, salaire, etc.). Le fichier du modèle se trouve dans `backend/model/Model.pkl`.

## Licence
Ce projet est sous licence MIT.

