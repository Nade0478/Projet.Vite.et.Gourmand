# Étape 1 : Build du frontend
FROM node:20-alpine3.20 AS build

# Mise à jour des paquets pour corriger les vulnérabilités
RUN apk update && apk upgrade

WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur web Nginx pour héberger le build
FROM nginx:alpine3.20

# Mise à jour des paquets Nginx
RUN apk update && apk upgrade

# Copier le build dans Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
