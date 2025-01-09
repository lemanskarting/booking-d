import fs from "fs";
import path from "path";
import PDF from "@components/PDF";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { EmailOrder } from "@components/EmailOrder";
import { renderToStream } from "@react-pdf/renderer";

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.yandex.com",
    auth: {
      user: "info@lemanskarting.ru",
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  const [emailData, emailDataFinal] = await Promise.all([
    fs.promises
      .readFile(path.join(process.cwd(), "/cms/pages/emailTwo.json"), "utf8")
      .then((data) => JSON.parse(data)),
    fs.promises
      .readFile(
        path.join(process.cwd(), "/cms/pages/emailAdminTwo.json"),
        "utf8"
      )
      .then((data) => JSON.parse(data)),
  ]).catch((err) => {
    console.log(err);
    res.status(501).send("Error reading data");
  });

  const [emailHtml, emailText, emailHtmlFinal, emailTextFinal] =
    await Promise.all([
      render(
        <EmailOrder
          config={req.body.config}
          data={emailData}
          name={req.body.name}
        />
      ),
      render(
        <EmailOrder
          config={req.body.config}
          data={emailData}
          name={req.body.name}
        />,
        {
          plainText: true,
        }
      ),
      render(
        <EmailOrder
          admin
          config={req.body.config}
          data={emailDataFinal}
          name={req.body.name}
          description={req.body.message}
        />
      ),
      render(
        <EmailOrder
          admin
          config={req.body.config}
          data={emailDataFinal}
          name={req.body.name}
          description={req.body.message}
        />,
        {
          plainText: true,
        }
      ),
    ]).catch((err) => {
      console.log(err);
      res.status(502).send("Error rendering data");
    });

  const mailData = {
    from: '"Lemans Karting" <info@lemanskarting.ru>',
    subject: `Ваш заказ Cart Crafter`,
    to: `${req.body.email}`,
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            total={req.body.total}
            config={true}
            name={req.body.name}
            conf={false}
            guests={req.body.guests}
            discounts={req.body.discounts}
            data={req.body.data}
          />
        ),
      },
    ],
  };
  const mailDataAdmin = {
    from: '"Lemans Karting" <info@lemanskarting.ru>',
    subject: `Новая заявка от ${req.body.name}`,
    to: ["eventcity@lemanskarting.ru", "pr@lemanskarting.ru"],
    text: emailTextFinal,
    html: emailHtmlFinal,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            total={req.body.total}
            config={true}
            name={req.body.name}
            conf={false}
            guests={req.body.guests}
            discounts={req.body.discounts}
            data={req.body.data}
          />
        ),
      },
    ],
  };

  await Promise.all([
    await transporter.sendMail(mailData),
    await transporter.sendMail(mailDataAdmin),
  ])
    .then(() => {
      res.statusCode = 200;
      res.send();
    })
    .catch(() => {
      res.statusCode = 500;
      res.send();
    });
}
