const Joi = require('@hapi/joi');

module.exports = async function validateUser(request, response, next) {
  const schema = Joi.object({
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required()
      .email(),
  });

  const { error } = schema.validate(request.body);
  if (error) {
    const errorKey = error.details[0].context.key;

    const invalidEmail = errorKey === 'email' ? 'Email inválido ou não informado' : null;
    const invalidPassword = errorKey === 'password' ? 'Senha inválida ou não informada' : null;
    const responseMessage = invalidEmail || invalidPassword;

    return response.status(400).send({ Mensagem: responseMessage });
  }
  return next();
};
