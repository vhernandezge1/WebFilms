const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const secretKey = 'yourSecretKey'; // Remplacez ceci par une clé secrète sécurisée

app.use(bodyParser.json());

// Servez les fichiers statiques depuis le dossier 'public'
app.use(express.static('public'));

// Gestion de la route GET à la racine pour rediriger vers la page de connexion
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Route pour l'authentification (méthode POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérification des informations d'authentification (exemple simple)
  if (username === 'utilisateur' && password === 'motdepasse') {
    // Création du token avec une expiration de 1 heure (3600 secondes)
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentification échouée' });
  }
});

// Route pour l'inscription (méthode POST)
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Vérification des informations d'inscription (exemple simple)
  if (username && password) {
    // Vous pouvez ajouter une logique pour vérifier si l'utilisateur existe déjà, etc.

    // Création du token avec une expiration de 1 heure (3600 secondes)
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Informations d\'inscription incomplètes' });
  }
});

// Middleware pour protéger les routes nécessitant une authentification
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentification requise' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token non valide' });
    }

    req.user = user;
    next();
  });
};

// Exemple de route protégée (méthode GET)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Route protégée', user: req.user });
});

// Gestion de la route GET /login
app.get('/login', (req, res) => {
  // Chemin relatif pour servir le fichier index.html à partir du dossier /login
  const indexPath = path.join(__dirname, '..', 'Webfilms', 'index.html');
  res.sendFile(indexPath);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
