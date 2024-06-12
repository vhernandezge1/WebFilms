const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Importer les routes d'authentification
const authRoutes = require('./auth');

// Utiliser les routes d'authentification
app.use(authRoutes);

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
