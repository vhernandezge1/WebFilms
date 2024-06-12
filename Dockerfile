# Étape 1 : Construction
FROM node:14 AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances, y compris celles de développement
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Production
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement les dépendances de production
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier les fichiers de construction de l'étape précédente
COPY --from=builder /app/build /app/build

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
