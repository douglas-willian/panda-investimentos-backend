const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../services/database');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;
    const user = await database.getUserByEmail(email);

    if (!user) {
      return response
        .status(400)
        .send({ Mensagem: 'Email não encontrado' });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.encryptedPassword,
    );

    if (!validPassword) {
      return response.status(401).send({ Mensagem: 'Usuário e/ou password inválidos' });
    }

    const expiresIn = process.env.EXPIRES_IN;
    const token = jwt.sign({ _id: user.id }, process.env.JWT_PRIVATE_KEY, {
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
