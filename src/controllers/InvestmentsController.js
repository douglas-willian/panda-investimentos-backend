const moment = require('moment');
const connection = require('../database/connection');

module.exports = {
  async list(request, response) {
    const { id } = request.params;
    const investments = await connection('investments')
      .where('userId', id)
      .select('*');

    investments.forEach((i) => {
      i.date = moment(i.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    });
    return response.send(investments);
  },

  async create(request, response) {
    const { type, value, date } = request.body;
    const { userId } = request;
    const investment = await connection('investments').insert({
      type,
      value,
      date,
      userId,
    });

    return response.send(investment);
  },

  async delete(request, response) {
    const { id } = request.params;
    const { userId } = request;

    const investment = await connection('investments')
      .where('id', id)
      .select('userId')
      .first();

    if (investment.userId !== userId) {
      return response.status(403).send({ Mensagem: 'Operação não permitida para seu usuário' });
    }

    await connection('investments').where('id', id).delete();

    return response.status(204).send();
  },
};
