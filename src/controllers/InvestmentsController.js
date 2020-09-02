const moment = require('moment');
const database = require('../services/database');

module.exports = {
  async list(request, response) {
    const { id } = request.params;
    const investments = await database.listInvestments(id);

    investments.forEach((investment) => {
      investment.date = moment(investment.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    });
    return response.send(investments);
  },

  async create(request, response) {
    const { type, value, date } = request.body;
    const { userId } = request;
    const params = {
      type,
      value,
      date,
      userId,
    };

    const investment = await database.createInvestment(params);

    return response.send(investment);
  },

  async delete(request, response) {
    const { id } = request.params;
    const { userId } = request;

    const investment = await database.getInvestmentById(id);

    if (investment.userId !== userId) {
      return response
        .status(403)
        .send({ Mensagem: 'Operação não permitida para seu usuário' });
    }

    await database.deleteInvestment(id);

    return response.status(204).send();
  },
};
