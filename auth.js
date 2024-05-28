const express = require('express');
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
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
