const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();
require('dotenv').config();

process.on('uncaughtException', () => {
  // Salvar erro num banco de logs
  process.exit(1);
});

process.on('unhandledRejection', () => {
  // Salvar erro num banco de logs
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(error);

module.exports = app;
