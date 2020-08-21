/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

module.exports = async function auth(request, response, next) {
  try {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
      throw new Error();
    }
    const splitted = headerToken.split(' ');

    if (!splitted.length === 2) {
      throw new Error();
    }

    const [scheme, token] = splitted;

    if (!/^Bearer$/i.test(scheme)) {
      throw new Error();
    }

    const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    const user = await connection('profiles').where('id', _id).first();

    if (!user) {
      return response.status(404).send({ Mensagem: 'Usuário não encontrado' });
    }

    request.userId = _id;
    return next();
  } catch (err) {
    response.status(401).send({ Mensagem: 'Token Inválido' });
  }
};
