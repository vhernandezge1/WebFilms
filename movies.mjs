import express from 'express';
import mysql from 'mysql2';
import inquirer from 'inquirer';
import fs from 'fs';
import bodyParser from 'body-parser';




const app = express();
const PORT = 3000;

app.use(express.json());



// Connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'films',
  port: '3306'
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion à la base de données réussie.');
  }
});

// Récupération des films (listing)
app.get('/movies', (req, res) => {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des films :', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Récupération d'un film par son ID
app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);

  connection.query('SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du film :', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } else if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Ressource absente' });
    }
  });
});

// Modification d'un film par son ID
app.put('/movies/:id', (req, res) => {
  const { id, nom, sortie, description, note } = req.body;

  connection.query(
    'UPDATE movies SET nom = ?, sortie = ?, description = ?, note = ? WHERE id = ?',
    [nom, sortie, description, note, id],
    err => {
      if (err) {
        console.error('Erreur lors de la modification du film :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
      } else {
        res.status(200).json({ message: 'Film modifié avec succès.' });
      }
    }
  );
});

app.post('/movies', (req, res) => {
  const { nom, sortie, description, note } = req.body;
  
  connection.query(
    'INSERT INTO movies (nom, sortie, description, note) VALUES (?,?,?,?)',
    [nom, sortie, description, note],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du film :', err);
        return res.status(500).json({ error: 'Erreur interne du serveur', details: err.message });
      } else {
        const newFilmNom = nom;
        return res.status(201).json({ nom: newFilmNom, sortie, description, note });
      }
    }
  );
});


// Suppression d'un film par son id
app.delete('/movies/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM movies WHERE id = ?', [id], err => {
    if (err) {
      console.error('Erreur lors de la suppression du film :', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } else {
      res.status(200).json({ message: 'Film supprimé avec succès.' });
    }
  });
});

// Écoute du serveur sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

// Recherche de films par description (remplacer description par titre)
const rechercheDescription = 'aventure';
connection.query('SELECT * FROM movies WHERE description = ?', [rechercheDescription], (err, results, fields) => {
  if (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err);
    connection.end();
    return;
  }

  console.log('Résultats de la requête :', results);

  connection.end(err => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion :', err);
      return;
    }
    console.log('Connexion à la base de données fermée.');

    const jsonData = JSON.stringify(results, null, 2);
    fs.writeFile('resultats.json', jsonData, 'utf8', err => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier JSON :', err);
        return;
      }
      console.log('Résultats écrits dans le fichier resultats.json.');
    });
  });
});

// Fonction asynchrone pour paginer les résultats
async function paginerResultats(resultats, pageActuelle, résultatsParPage) {
  const débutIndex = (pageActuelle - 1) * résultatsParPage;
  const finIndex = débutIndex + résultatsParPage;
  const pageCourante = resultats.slice(débutIndex, finIndex);

  console.clear();

  console.log(`Page ${pageActuelle} / ${Math.ceil(resultats.length / résultatsParPage)}\n`);

  pageCourante.forEach((résultat, index) => {
    console.log(`${débutIndex + index + 1}. ${résultat}`);
  });

  console.log('\n');
}

// Fonction principale pour simuler une recherche dans la base de données
async function rechercheDansBDD() {
  const resultats = ['Avatar', 'Avengers', 'The Mask', 'Viking'];
  const résultatsParPage = 3;
  let pageActuelle = 1;

  while (true) {
    paginerResultats(resultats, pageActuelle, résultatsParPage);

    const réponse = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Que souhaitez-vous faire ?',
        choices: ['Film suivant', 'Film précédent', 'Quitter']
      }
    ]);

    if (réponse.action === 'Film suivant' && pageActuelle < Math.ceil(resultats.length / résultatsParPage)) {
      pageActuelle++;
    } else if (réponse.action === 'Film précédent' && pageActuelle > 1) {
      pageActuelle--;
    } else if (réponse.action === 'Quitter') {
      break;
    }
  }

  console.log('Fin');
}

// Exécution de la fonction de recherche
rechercheDansBDD();
