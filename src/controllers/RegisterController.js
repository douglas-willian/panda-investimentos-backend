const bcrypt = require('bcrypt');
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;
    const user = await connection('profiles').where('email', email).first();

    if (user) { return response.status(400).send({ Mensagem: 'Email Já Existente' }); }

    const id = crypto.randomBytes(4).toString('HEX');

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await connection('profiles').insert({
      id,
      encryptedPassword,
      email,
    });

    return response.status(200).send();
  },
};
