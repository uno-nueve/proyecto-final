// Imports de React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Imports de Redux
import { Provider } from 'react-redux';

import App from './components/App';

// Importamos estilos
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

// TODO: Si trabajamos con Redux, crear el store y aplicar el middleware de Redux Saga

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
