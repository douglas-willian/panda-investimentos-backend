const database = require('../../services/database');
const knex = require('../../database/connection');

describe('Create Investment', () => {
  afterAll(() => {
    knex.destroy();
  });

  it('should create an investment', async () => {
    const params = {
      userId: 'dc29d73f',
      type: 'variable',
      value: 2,
      date: '20-08-2020',
    };

    const response = await database.createInvestment(params);
    expect(Number(response[0])).not.toBeNaN();
  });
});
