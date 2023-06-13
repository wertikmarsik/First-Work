const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./userRoute'); 

app.use(express.json());
app.use('/api', router);

describe('API Endpoints', () => {
  let token;

  beforeAll(() => {
    // Це може бути використано для створення токена для автентифікованих маршрутів
    // Можливо, вам доведеться змінити його на основі логіки автентифікації
    token = generateToken();
  });

  // Тест для POST/api/register
  describe('POST /api/register', () => {
    test('should register a new user', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          surname: 'test',
          password: 'testpassword'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User registered Successfully');
    });

    // Додати більше тестових випадків для недійсного введення, дублювати користувача і т.д.
  });

  // Тест для POST/api/login
  describe('POST /api/login', () => {
    test('should log in a user and return a token', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    // Додайте більше тестових випадків для недійсних облікових даних, відсутніх полів тощо.
  });

  // Тест на GET/api/профіль
  describe('GET /api/profile', () => {
    test('should get the user profile', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      // Додавання тверджень для даних профілю користувача
    });

    // Додайте більше тестових випадків для несанкціонованого доступу, відсутній токен тощо.
  });

  // Тест для PATCH/api/update
  describe('PATCH /api/update', () => {
    test('should update the user profile', async () => {
      const response = await request(app)
        .patch('/api/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'updatedusername'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User updated successfully');
      // Додавання тверджень для оновлених даних користувача
    });

    // Додайте більше тестових випадків для несанкціонованого доступу, відсутній токен, недійсні дані тощо.
  });

  // Тест для POST/api/покупки
  describe('POST /api/purchase', () => {
    test('should process a purchase transaction', async () => {
      const response = await request(app)
        .post('/api/purchase')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currencyName: 'BTC',
          quantity: 1,
          secondCurrencyName: 'USD'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Successfully Received');
      // Додавання тверджень для оновлених даних гаманця користувача та запису транзакцій
    });

    // Додайте більше тестових випадків для несанкціонованого доступу, відсутній токен, недостатні кошти тощо.
  });

  // Тест для POST/api/sell
  describe('POST /api/sell', () => {
    test('should process a sell transaction', async () => {
      const response = await request(app)
        .post('/api/sell')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currencyName: 'BTC',
          quantity: 1,
          secondCurrencyName: 'USD'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Successfully exchanged');
      // Додавання тверджень для оновлених даних гаманця користувача та запису транзакцій
    });

    // Додайте більше тестових випадків для несанкціонованого доступу, відсутній токен, недостатні кошти тощо.
  });

  // Тест для POST/api/exchange
  describe('POST /api/exchange', () => {
    test('should process an exchange transaction', async () => {
      const response = await request(app)
        .post('/api/exchange')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currencyName: 'BTC',
          quantity: 1,
          referalCode: 'abcd1234'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Successfully sent');
      // Додавання тверджень для оновлених даних гаманця користувача та запису транзакцій
    });

    // Додайте більше тестових випадків для несанкціонованого доступу, відсутній токен, недостатні кошти, недійсний реферальний код тощо.
  });

  // Тест для POST/api/reset-password
  describe('POST /api/reset-password', () => {
    test('should send a password reset link to the user', async () => {
      const response = await request(app)
        .post('/api/reset-password')
        .send({
          email: 'test@example.com'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Password reset link sent to your email account.');
    });

    // Додати більше тестових випадків для недійсної електронної пошти, користувача не знайдено і т.д.
  });

  // Тест для POST/api/: userId/: token
  describe('POST /api/:userId/:token', () => {
    test('should reset the user password', async () => {
      const user = await createUser(); // Створення користувача з дійсним маркером для скидання пароля

      const response = await request(app)
        .post(`/api/${user._id}/${user.token}`)
        .send({
          password: 'newpassword'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Password reset successfully');
    });

    // Додайте більше тестових випадків для недійсного посилання, простроченого токена тощо.
  });
});

// Допоміжна функція для створення фіктивного токена для тестування
function generateToken() {
  return 'dummytoken';
}

// Допоміжна функція для створення користувача з дійсним маркером для скидання пароля
async function createUser() {
  const user = new User({
    email: 'test@example.com',
    username: 'testuser',
    surname: 'test',
    password: 'testpassword',
    token: 'validtoken'
  });
  return await user.save();
}
