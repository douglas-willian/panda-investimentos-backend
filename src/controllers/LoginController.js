const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;
    const user = await connection('profiles').where('email', email).first();

    if (!user) {
      return response
        .status(404)
        .send({ Mensagem: 'Email não encontrado' });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.encryptedPassword,
    );

    if (!validPassword) {
      return response.status(401).send({ Mensagem: 'Usuário e/ou password inválidos' });
    }
    const expiresIn = '7d'; // process.env.EXPIRES_IN;
    const token = jwt.sign({ _id: user.id }, '1234567', { // process.env.JWT_PRIVATE_KEY
      expiresIn,
    });

    return response.status(200).send({
      id: user.id,
      token,
      type: 'Bearer',
      expiresIn,
    });
  },
};
