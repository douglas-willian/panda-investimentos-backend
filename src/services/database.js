const connection = require('../database/connection');

module.exports = {
  async listInvestments(id) {
    return connection('investments').where('userId', id).select('*');
  },

  async createInvestment(params) {
    const {
      type, value, date, userId,
    } = params;

    return connection('investments').insert({
      type,
      value,
      date,
      userId,
    });
  },

  async getInvestmentById(id) {
    return connection('investments').where('id', id).select('userId').first();
  },

  async deleteInvestment(id) {
    return connection('investments').where('id', id).delete();
  },

  async getUserByEmail(email) {
    return connection('profiles').where('email', email).first();
  },
};
