const nodemailerMock = require('nodemailer-mock');
const sendEmail = require('./sendEmail');
const nodemailer = require('nodemailer')

// Перед початком тестування переключаємо transporter на nodemailer-mock
beforeEach(() => {
  nodemailerMock.mock.reset();
});

describe('sendEmail function', () => {
  test('should send an email with the correct parameters', async () => {
    const email = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test Email Content';

    // Викликаємо функцію sendEmail
    await sendEmail(email, subject, text);

    // Перевіряємо, чи викликано метод sendMail з правильними параметрами
    expect(nodemailerMock.mock.sentMail()).toHaveLength(1);
    const sentMail = nodemailerMock.mock.sentMail()[0];
    expect(sentMail.from).toBe('sdasdadsa@dasdsad.com');
    expect(sentMail.to).toBe(email);
    expect(sentMail.subject).toBe(subject);
    expect(sentMail.text).toBe(text);
  });

  test('should log an error if there is an error sending the email', async () => {
    // Мокуємо метод sendMail, щоб спричинити помилку
    nodemailerMock.mock.mockOnceError(new Error('Failed to send email'));

    const email = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test Email Content';

    // Викликаємо функцію sendEmail
    await sendEmail(email, subject, text);

    // Перевіряємо, чи виведено повідомлення про помилку
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Failed to send email'));
  });
});
