const request = require('supertest');
const app = require('../index');
const knex = require('../database/connection');

const login = async (email, password) => request(app)
  .post('/login')
  .send({
    email,
    password,
  });

describe('Login Routes', () => {
  afterAll(() => {
    knex.destroy();
  });

  test('should return 400 if no credentials are provided', async () => {
    const response = await login('', '');

    expect(response.status).toBe(400);
  });

  test('should return 401 if incorrect credentials are provided', async () => {
    const response = await login('invalid_email@email.com', 'invalid_password');

    expect(response.status).toBe(400);
  });

  test('should return 200 if correct credentials are provided', async () => {
    const response = await login('valid_email@email.com', 'valid_password');

    expect(response.status).toBe(200);
  });
});
