// api/contact.js
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  // Валидация
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      message: 'Заполните обязательные поля: имя, фамилия, email и сообщение' 
    });
  }

  // Проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Некорректный email' });
  }

  // Настройка SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Отправка письма
  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `🎭 Новая заявка с сайта от ${firstName} ${lastName}`,
      text: `
НОВАЯ ЗАЯВКА С САЙТА МДТ

Имя: ${firstName}
Фамилия: ${lastName}
Email: ${email}
Телефон: ${phone || 'Не указан'}

Сообщение:
${message}

---
Отправлено: ${new Date().toLocaleString('ru-RU')}
      `.trim(),
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px;">
          <h2 style="color: #94062A;">🎭 Новая заявка с сайта МДТ</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Имя:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Фамилия:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Телефон:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Не указан'}
              </td>
            </tr>
          </table>

          <h3 style="color: #94062A; margin-top: 30px;">Сообщение:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #94062A;">
            ${message.replace(/\n/g, '<br>')}
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Отправлено: ${new Date().toLocaleString('ru-RU')}
          </p>
        </div>
      `,
    });

    console.log('✅ Письмо отправлено:', email);
    res.status(200).json({ message: 'Отправлено успешно' });
  } catch (error) {
    console.error('❌ Ошибка отправки:', error);
    res.status(500).json({ message: 'Ошибка отправки письма' });
  }
}