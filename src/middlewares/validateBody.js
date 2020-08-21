const Joi = require('@hapi/joi');

module.exports = async function validateBody(request, response, next) {
  const schema = Joi.object({
    type: Joi.string().required(),
    value: Joi.number().required(),
    date: Joi.string().required(),
  });

  const { error } = schema.validate(request.body);
  if (error) {
    const errorKey = error.details[0].context.key;

    const invalidType = errorKey === 'type' ? 'Tipo da Renda não informado' : null;
    const invalidValue = errorKey === 'value' ? 'Valor não informado' : null;
    const invalidDate = errorKey === 'date' ? 'Data não informada' : null;
    const responseMessage = invalidType || invalidValue || invalidDate;

    return response.status(400).send({ Mensagem: responseMessage });
  }
  return next();
};
