const request = require('supertest');
const app = require('../index');
const knex = require('../database/connection');

const register = async (email, password) => request(app)
  .post('/register')
  .send({
    email,
    password,
  });

describe('Register Route', () => {
  afterAll(() => {
    knex.destroy();
  });

  test('should return 400 if no credentials are provided', async () => {
    const response = await register('', '');

    expect(response.status).toBe(400);
  });

  test('should return 400 if registered email is provided', async () => {
    await register('registered_email', 'valid_password');
    const response = await register('registered_email', 'valid_password');

    expect(response.status).toBe(400);
  });

  test('should return 400 if invalid email is provided', async () => {
    const response = await register('invalid_email', 'valid_password');

    expect(response.status).toBe(400);
  });

  test('should return 400 if invalid password is provided', async () => {
    const response = await register('valid_email@email.com', '123');

    expect(response.status).toBe(400);
  });

  test('should return 200 if unregistered valid email and password are provided', async () => {
    const response = await register('valid_email@email.com', 'valid_password');

    expect(response.status).toBe(200);
  });
});
