const database = require('../../services/database');
const knex = require('../../database/connection');

describe('List Investments', () => {
  afterAll(() => {
    knex.destroy();
  });

  it('should list all investments', async () => {
    const id = 'dc29d73f';

    const response = await database.listInvestments(id);

    expect(response[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        type: expect.any(String),
        date: expect.any(String),
        value: expect.any(Number),
        userId: expect.any(String),
      }),
    );
  });
});
