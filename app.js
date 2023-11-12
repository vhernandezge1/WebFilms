// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'movies_db',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Routes

// Get all movies
app.get('/movies', (req, res) => {
  // Implement logic to retrieve all movies from the database
  res.json({ message: 'Get all movies' });
});

// Get a movie by ID
app.get('/movies/:id', (req, res) => {
  // Implement logic to retrieve a movie by ID from the database
  const movieId = req.params.id;
  res.json({ message: `Get movie with ID ${movieId}` });
});

// Create a new movie
app.post('/movies', (req, res) => {
  // Implement logic to create a new movie in the database
  const movieData = req.body;
  res.status(201).json({ message: 'création avec succès' });
});

// Update a movie by ID
app.put('/movies/:id', (req, res) => {
  // Implement logic to update a movie by ID in the database
  const movieId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `Update movie with ID ${movieId}`, updatedData });
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  // Implement logic to delete a movie by ID from the database
  const movieId = req.params.id;
  res.json({ message: `Delete movie with ID ${movieId}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
