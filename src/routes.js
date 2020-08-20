const express = require('express');

const InvestmentsController = require('./controllers/InvestmentsController');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const asyncMiddleware = require('./middlewares/async');
const auth = require('./middlewares/auth');
const validator = require('./middlewares/validator');

const routes = express.Router();
routes.post('/register', validator, asyncMiddleware(RegisterController.create));
routes.post('/login', validator, asyncMiddleware(LoginController.login));

routes.get(
  '/investments/:id',
  auth,
  asyncMiddleware(InvestmentsController.list),
);
routes.post(
  '/investments/:id',
  auth,
  asyncMiddleware(InvestmentsController.create),
);
routes.delete(
  '/investments/:id',
  auth,
  asyncMiddleware(InvestmentsController.delete),
);

module.exports = routes;
