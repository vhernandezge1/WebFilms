const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Configuration de la base de données
const connection = mysql.createPool({
    host: 'votre_hote',
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'votre_base_de_donnees'
});

// Route pour récupérer des données de la base de données
app.get('/recuperer-donnees', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM votre_table');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
