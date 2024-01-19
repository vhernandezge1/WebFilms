const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Film } = require('./server');
 
app.use(bodyParser.json());
 
// Get a movie by ID
app.get('/server', async (req, res) => {
    try {
      const movies = await Film.findAll();
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Ressource absente' });
    }
  });
   
   
  // Create a new movie
  app.post('/server', async (req, res) => {
    const { id, nom, description, dateParution, note } = req.body;
   
    try {
      const newMovie = await Film.create({ id, nom, description, dateParution, note });
      res.status(201).json(newMovie);
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: 'Validation impossible' });
    }
  });
   
   
  // Update a movie by ID
  app.put('/server/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, description, dateParution, note } = req.body;
   
    try {
      const film = await Film.findByPk(id);
   
      if (film) {
        await film.update({ nom, description, dateParution, note });
        res.status(200).json({ message: 'Film modifié avec succès.' });
      } else {
        res.status(404).json({ error: 'Ressource absente' });
      }
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: 'Validation impossible' });
    }
  });
   
   
  app.delete('/server/:id', async (req, res) => {
    const { id } = req.params;
   
    try {
      const film = await Film.findByPk(id);
   
      if (film) {
        await film.destroy();
        res.status(201).json({ message: 'Film créé avec succès.' });
      } else {
        res.status(404).json({ error: 'Ressource absente' });
      }
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: 'Validation impossible' });
    }
  });
   