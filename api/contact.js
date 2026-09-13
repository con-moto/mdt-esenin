import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone = "",
      message,
    } = req.body || {};

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message:
          "Заполните обязательные поля: имя, фамилия, email и сообщение",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Некорректный email",
      });
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_EMAIL
    ) {
      console.error("Не настроены SMTP-переменные окружения");

      return res.status(500).json({
        message: "На сервере не настроена отправка почты",
      });
    }

    const smtpPort = Number(process.env.SMTP_PORT || 587);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"МДТ — заявка с сайта" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Новая заявка с сайта от ${firstName} ${lastName}`,
      text: [
        "НОВАЯ ЗАЯВКА С САЙТА МДТ",
        "",
        `Имя: ${firstName}`,
        `Фамилия: ${lastName}`,
        `Email: ${email}`,
        `Телефон: ${phone || "Не указан"}`,
        "",
        "Сообщение:",
        message,
        "",
        `Отправлено: ${new Date().toLocaleString("ru-RU")}`,
      ].join("\n"),
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px;">
          <h2 style="color: #94062A;">
            🎭 Новая заявка с сайта МДТ
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <strong>Имя:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                ${escapeHtml(firstName)}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <strong>Фамилия:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                ${escapeHtml(lastName)}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <strong>Email:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <a href="mailto:${escapeHtml(email)}">
                  ${escapeHtml(email)}
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                <strong>Телефон:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                ${
                  phone
                    ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(
                        phone
                      )}</a>`
                    : "Не указан"
                }
              </td>
            </tr>
          </table>

          <h3 style="color: #94062A; margin-top: 30px;">
            Сообщение:
          </h3>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-left: 3px solid #94062A;
            white-space: pre-wrap;
          ">
            ${escapeHtml(message)}
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Отправлено: ${escapeHtml(
              new Date().toLocaleString("ru-RU")
            )}
          </p>
        </div>
      `,
    });

    console.log("Письмо отправлено:", email);

    return res.status(200).json({
      message: "Отправлено успешно",
    });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);

    return res.status(500).json({
      message: "Ошибка отправки письма",
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}