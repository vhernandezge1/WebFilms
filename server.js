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
  } else {
    console.log('Connexion à MySQL réussie !');
    // Vous pouvez exécuter vos requêtes ici
  }
});

