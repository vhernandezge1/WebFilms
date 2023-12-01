const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbmovies',
  port: '3306'
});

// Tester la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }

  console.log('Connexion à MySQL réussie !');

  // Exécuter la requête SQL
  const sqlQuery = 'SELECT * FROM movies';
  connection.query(sqlQuery, (err, results, fields) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      return;
    }

    // Traitement des résultats de la requête
    console.log('Résultats de la requête :', results);

    // Fermer la connexion après l'exécution de la requête
    connection.end((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la connexion :', err);
      } else {
        console.log('Connexion à MySQL fermée avec succès.');
      }
    });
  });
});
