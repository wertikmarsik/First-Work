const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./currencyRoute'); 

app.use(express.json());
app.use('/api/currencies', router);

describe('GET /api/currencies', () => {
  test('should return all currencies when no name is provided', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzODQ5NzE5Y2RjNWI3OGRmZGU0YWQiLCJpYXQiOjE2ODQyNDcxNTJ9.N-SGtrL7NUyEU-qplTQ98j_dhb7qUbCyEXYXG2auwiU";
    const response = await request(app).get('http://127.0.0.1:3000/api/currencies').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(expect.any(Array));
  });

  test('should return a specific currency when name is provided', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzODQ5NzE5Y2RjNWI3OGRmZGU0YWQiLCJpYXQiOjE2ODQyNDcxNTJ9.N-SGtrL7NUyEU-qplTQ98j_dhb7qUbCyEXYXG2auwiU";
    const currencyName = 'BTC';
    const response = await request(app).get(`http://127.0.0.1:3000/api/currencies?name=${currencyName}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(expect.any(Object));
    expect(response.body.message.name).toBe(currencyName);
  });

  test('should return 404 error when currency is not found', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzODQ5NzE5Y2RjNWI3OGRmZGU0YWQiLCJpYXQiOjE2ODQyNDcxNTJ9.N-SGtrL7NUyEU-qplTQ98j_dhb7qUbCyEXYXG2auwiU";
    const currencyName = 'INVALID';
    const response = await request(app).get(`http://127.0.0.1:3000/api/currencies?name=${currencyName}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Currencies not found');
  });

  test('should return 401 error when authorization token is not provided', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYzODQ5NzE5Y2RjNWI3OGRmZGU0YWQiLCJpYXQiOjE2ODQyNDcxNTJ9.N-SGtrL7NUyEU-qplTQ98j_dhb7qUbCyEXYXG2auwiU";
    const response = await request(app).get('http://127.0.0.1:3000/api/currencies').port;
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  

});
