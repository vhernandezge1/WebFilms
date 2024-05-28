# Utilisez une image de base appropriée
FROM php:latest

# Copiez les fichiers de votre projet dans le conteneur
COPY . /var/www/html

# Exposez le port sur lequel votre application écoute
EXPOSE 80