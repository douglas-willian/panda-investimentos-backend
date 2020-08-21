const express = require('express');

const InvestmentsController = require('./controllers/InvestmentsController');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const asyncMiddleware = require('./middlewares/async');
const auth = require('./middlewares/auth');
const validateUser = require('./middlewares/validateUser');
const validateBody = require('./middlewares/validateBody');

const routes = express.Router();
routes.post('/register', validateUser, asyncMiddleware(RegisterController.create));
routes.post('/login', validateUser, asyncMiddleware(LoginController.login));

routes.get(
  '/investments/:id',
  auth,
  asyncMiddleware(InvestmentsController.list),
);
routes.post(
  '/investments/:id',
  auth,
  validateBody,
  asyncMiddleware(InvestmentsController.create),
);
routes.delete(
  '/investments/:id',
  auth,
  asyncMiddleware(InvestmentsController.delete),
);

module.exports = routes;
