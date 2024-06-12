import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Si vous avez un fichier CSS pour vos styles globaux
import App from './App'; // Le composant principal de votre application

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

