export default function handler(req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.yandex.com",
    auth: {
      user: "info@lemanskarting.ru",
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: '"Lemans Karting" <info@lemanskarting.ru>',
    to: ["eventcity@lemanskarting.ru", "pr@lemanskarting.ru"],
    subject: `Заявка праздника от ${req.body.name}`,
    text: req.body.message + " | Отправлено от: " + req.body.email,
    html: `<p>Имя: ${req.body.name}</p><p>Дата: ${req.body.date.day
      .toString()
      .padStart(2, "0")}.${req.body.date.month.toString().padStart(2, "0")}.${
      req.body.date.year
    }</p><p>Телефон: ${req.body.phone}</p><p>Email: ${req.body.email}</p>`,
  };

  transporter.sendMail(mailData, (err) => {
    if (err) {
      res.statusCode = 500;
      res.send();
    } else {
      res.send();
    }
  });
}
