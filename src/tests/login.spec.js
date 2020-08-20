const request = require('supertest');
const knex = require('../database/connection');
const app = require('../index');

describe('Login Router', () => {
  afterAll(() => {
    knex.destroy();
  });

  test('should return 400 if no credentials are passed', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      password: '',
    });
    expect(response.status).toBe(400);
  });

  test('should return 401 if incorrect credentials are passed', async () => {
    const response = await request(app).post('/login').send({
      email: 'doug.william@hotmail.com',
      password: '12345678',
    });
    expect(response.status).toBe(401);
  });

  test('should return 200 if correct credentials are passed', async () => {
    const response = await request(app).post('/login').send({
      email: 'doug.william@hotmail.com',
      password: '1234567',
    });
    expect(response.status).toBe(200);
  });
});
