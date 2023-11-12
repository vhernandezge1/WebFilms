// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
const app = express();
const port = 3306;
 
app.use(bodyParser.json());
 
const db = mysql.createConnection({
  host: '3306',
  user: 'valentin',
  password: '1234',
  database: 'movies',
});
 
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});
 
 
 
 
// Get a movie by ID
app.get('/movies', async (req, res) => {
  try {
    const movies = await Film.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'ressource absente' });
  }
});
 
 
// Create a new movie
app.post('/films', async (req, res) => {
  const { id, nom, description, dateParution, note } = req.body;
 
  try {
    const newMovie = await Film.create({ nom, description, dateParution, note });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: 'Validation impossible' });
  }
});
 
 
// Update a movie by ID
app.put('/films/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, description, dateParution, note } = req.body;
 
  try {
    const film = await Film.findByPk(id);
 
    if (film) {
      await film.update({ nom, description, dateParution, note });
      res.status(200).json({ message: 'Film modifié avec succès.' });
    } else {
      res.status(404).json({ error: 'ressource absente' });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: 'validation impossible' });
  }
});
 
 
app.delete('/films/:id', async (req, res) => {
  const { id } = req.params;
 
  try {
    const film = await Film.findByPk(id);
 
    if (film) {
      await film.destroy();
      res.status(201).json({ message: 'Film supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'ressource absente' });
    }
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: 'validation impossible' });
  }
});
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 