# LossNear

Frontend Next.js pour le projet LossNear : bot Discord + backend API + backend worker, concus pour tourner sur Kubernetes avec scalabilite horizontale.

## Vision globale
- Bot Discord et backends en Java/Spring.
- MongoDB comme base de donnees principale.
- Redis Streams pour les files/queues, Redis pour le cache.
- Frontend en Next.js (App Router) pour le site vitrine et les dashboards.
- Deploiement cible sur Kubernetes (un dashboard public bot, un dashboard admin prive pour le cluster).

## Etat actuel du frontend
- Site vitrine en place (home, about, status).
- Navigation globale (Navbar + Footer) et styles generaux dans `app/globals.css`.
- Auth mockee (providers + API mock sous `app/api/mock`) avec un loader global.
- Dashboard (public) structure de base: page `app/dashboard/page.js` et layout `app/dashboard/layout.js`.
- Gestion et affichage du modal de connexion (`LoginModal`) et etat de connexion via `AuthContext`.

## Architecture frontend
- `app/layout.js` : root layout, met en place `AuthProvider`, Navbar, Footer et loader global.
- `app/context/AuthContext.js` : gestion de l'etat utilisateur (mock).
- `app/components/` : UI (Navbar, Footer, modals, dashboard components).
- `app/api/mock/` : endpoints mock pour dev local (session, user, guilds).
- Dashboards
  - Public : gestion du bot (en construction).
  - Admin (a venir) : gestion du cluster Kubernetes (prive).

## Scripts
- `npm run dev` : demarrage en dev sur `http://localhost:3000`.
- `npm run build` : build production.
- `npm start` : run production.

## Auteur
Projet porte par Tanya (24 ans), dev ops Java backend depuis ~12-13 ans, seule dev sur le projet pour le moment.
