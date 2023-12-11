const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const serviceAccountFirebase = require('../serviceAccountKeyFirebase.js');
const admin = require('firebase-admin');
const path = require('path');

require('./db.js');

const server = express();

server.name = 'API';
// Inicializa Firebase Admin SDK con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountFirebase),
});

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Servir los archivos estáticos de la carpeta 'dist' generada por Vite
server.use('/', express.static(path.join(__dirname, 'dist')));

// Ruta que maneja todas las solicitudes y envía el archivo index.html de Vite
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
server.use((req, res) => {
  // caso en que se ponga una url distinta a la solicitada (residual)
  res.status(404).send('dirección no encontrada');
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
