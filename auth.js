const express = require('express');
<<<<<<< HEAD
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

=======
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Exemple de stockage d'utilisateurs (en mémoire, pas recommandé pour la production)
const utilisateurs = [];

app.use(bodyParser.json());

// Créer un compte utilisateur
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Requête reçue :', req.body);
    console.log('Contenu de password dans la requête :', password);

    // Vérifie si l'utilisateur existe déjà
    const utilisateurExistant = utilisateurs.some((utilisateur) => utilisateur.username === username);
    if (utilisateurExistant) {
      return res.status(409).json({ error: 'Utilisateur déjà existant' });
    }

    // Générer un sel pour le hachage
    const salt = await bcrypt.genSalt(10);

    // Hashage du mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(password, salt);

    // Stocker les informations d'un nouvel utilisateur
    let nouvelUtilisateur = {
      username,
      password: hashedPassword
    };

    utilisateurs.push(nouvelUtilisateur);

    console.log('hashedPassword :', hashedPassword);

    res.status(201).json({ message: 'Compte créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du compte' });
  }
});

// Se connecter et obtenir un jeton
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Trouve l'utilisateur dans la liste
  const user = utilisateurs.find(user => user.username === username);

  // Vérifie si l'utilisateur existe
  if (!user) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }

  // Vérifie si le mot de passe correspond
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }

  // Crée un jeton JWT
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

  // Retourne le jeton
  res.json({ token });
});

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Aucun jeton fourni' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Échec de l\'authentification du jeton' });
    }

    // Vérifiez si req a un utilisateur défini
    if (!req.hasOwnProperty('utilisateur')) {
      req.utilisateur = {};
    }

    req.utilisateur.username = decoded.username; // Assurez-vous que la propriété 'username' existe dans decoded
    next();
  });
}

// Endpoint protégé
app.get('/profil', verifyToken, (req, res) => {
  res.json({ message: `Profil de l'utilisateur ${req.utilisateur.username}` });
});

// Démarrer le serveur
>>>>>>> 8fcf5af54094184595e6faf1ec16ae0bb142e1d4
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
