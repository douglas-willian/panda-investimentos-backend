const request = require('supertest');
const app = require('../index');
const knex = require('../database/connection');

const getLoginToken = async (email, password) => {
  const response = await request(app).post('/login').send({
    email,
    password,
  });

  const token = `Bearer ${response.body.token}`;
  return token;
};

describe('Investments Routes', () => {
  afterAll(() => {
    knex.destroy();
  });

  test('should return 401 if no authorization token is provided', async () => {
    const response = await request(app).get('/investments/dc29d73f');

    expect(response.status).toBe(401);
  });

  test('should return 404 if no user id is provided', async () => {
    const response = await request(app).get('/investments');

    expect(response.status).toBe(404);
  });

  test('should return 401 if no body is provided', async () => {
    const token = await getLoginToken('', '');

    const response = await request(app)
      .post('/investments/dc29d73f')
      .set('authorization', token);
    expect(response.status).toBe(401);
  });

  test('should return 200 if correct parameters are provided', async () => {
    const token = await getLoginToken('valid_email', 'valid_password');

    const response = await request(app)
      .post('/investments/dc29d73f')
      .send({ type: 'variable', value: 2, date: '20-08-2020' })
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  test('should return 204 if correct parameters are provided', async () => {
    const token = await getLoginToken('valid_email', 'valid_password');

    const response = await request(app)
      .delete('/investments/:id')
      .set('authorization', token);
    expect(response.status).toBe(204);
  });
});
