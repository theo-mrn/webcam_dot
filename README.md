# Webcam DOT

Une application web interactive qui transforme votre flux webcam en temps réel en un effet artistique de pointillisme (halftone). La taille de chaque point varie dynamiquement en fonction de la luminosité de l'image capturée.

## ✨ Fonctionnalités

- **Effet pointillisme en temps réel** : Transforme le flux vidéo de votre webcam en une grille de cercles
- **Contrôle interactif** : Ajustez le nombre de points de 10 à 200 via un slider
- **Performance optimisée** : Utilise `requestAnimationFrame` pour un rendu fluide
- **Responsive** : S'adapte à toutes les tailles d'écran

## 🎨 Comment ça marche ?

L'application capture le flux vidéo de votre webcam et analyse la luminosité de chaque zone de l'image. Plus une zone est lumineuse, plus le cercle correspondant sera grand. Les zones sombres génèrent des petits cercles, créant ainsi un effet de demi-teinte (halftone).

## 🚀 Installation

### Prérequis

- Node.js (version 20 ou supérieure)
- npm, yarn, pnpm ou bun

### Étapes

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/webcam_dot.git
cd webcam_dot
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

**Note** : Votre navigateur vous demandera l'autorisation d'accéder à votre webcam.

## 🛠️ Technologies utilisées

- **[Next.js 15](https://nextjs.org/)** - Framework React avec App Router
- **[React 19](https://react.dev/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[react-webcam](https://www.npmjs.com/package/react-webcam)** - Gestion de la webcam

## 📝 Utilisation

1. Autorisez l'accès à votre webcam lorsque le navigateur vous le demande
2. Utilisez le slider en bas de l'écran pour ajuster le nombre de points
   - **Moins de points** (10-30) : Effet plus abstrait et pixelisé
   - **Plus de points** (100-200) : Plus de détails et de précision

## 🏗️ Structure du projet

```
webcam_dot/
├── src/
│   └── app/
│       ├── page.tsx           # Page principale
│       ├── WebcamCircles.tsx  # Composant principal avec la logique
│       ├── layout.tsx         # Layout de l'application
│       └── globals.css        # Styles globaux
├── public/                    # Assets statiques
├── package.json              # Dépendances et scripts
└── README.md                 # Ce fichier
```

## 🎯 Scripts disponibles

```bash
npm run dev      # Lance le serveur de développement
npm run build    # Compile l'application pour la production
npm run start    # Lance le serveur de production
npm run lint     # Vérifie le code avec ESLint
```

## 🚀 Déploiement

L'application peut être facilement déployée sur [Vercel](https://vercel.com) :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/webcam_dot)

Ou suivez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 🔧 Personnalisation

### Modifier la couleur des points

Dans `WebcamCircles.tsx`, modifiez la ligne :
```typescript
ctx.fillStyle = "white" // Changez "white" par une autre couleur
```

### Modifier la couleur de fond

Dans `WebcamCircles.tsx`, modifiez la ligne :
```typescript
ctx.fillStyle = "black" // Changez "black" par une autre couleur
```

### Ajuster la taille des cercles

Modifiez le coefficient dans la ligne :
```typescript
const circleSize = spacing * 0.8 // Changez 0.8 pour ajuster la taille
```

## 📄 Licence

Ce projet est libre d'utilisation pour vos projets personnels et commerciaux.

## 👨‍💻 Auteur

Créé avec ❤️ par Theo

