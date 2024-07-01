const express = require('express');
const promClient = require('prom-client');
const path = require('path');

const app = express();

// Compteur pour le nombre de requêtes HTTP
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code']
});

// Jauge pour mesurer la taille des réponses HTTP
const httpResponseSize = new promClient.Gauge({
  name: 'http_response_size_bytes',
  help: 'Size of HTTP responses in bytes',
  labelNames: ['method', 'status_code']
});

// Histogramme pour mesurer la durée des requêtes HTTP
const httpRequestDurationHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'status_code']
});

// Exposer les métriques pour Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

// Importer et utiliser les routes d'authentification
const authRoutes = require('./auth');
app.use(authRoutes);

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Renvoyer le fichier index.html pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrez votre serveur Express sur un port spécifique
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
