import fs from "fs";
import path from "path";
import PDF from "@components/PDF";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { EmailOrder } from "@components/EmailOrder";
import { EmailOrderFinal } from "@components/EmailOrderFinal";
import { renderToStream } from "@react-pdf/renderer";
import { buildURL } from "../../lib/urlFunctions";

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
      .readFile(path.join(process.cwd(), "/cms/pages/emailOne.json"), "utf8")
      .then((data) => JSON.parse(data)),
    fs.promises
      .readFile(
        path.join(process.cwd(), "/cms/pages/emailAdminOne.json"),
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
        <EmailOrderFinal
          config={req.body.config}
          data={emailDataFinal}
          name={req.body.name}
          email={req.body.email}
          phone={req.body.phone}
          message={req.body.message}
          link={buildURL(req.body.total, req.body.guests)}
        />
      ),
      render(
        <EmailOrderFinal
          config={req.body.config}
          data={emailDataFinal}
          name={req.body.name}
          email={req.body.email}
          phone={req.body.phone}
          message={req.body.message}
          link={buildURL(req.body.total, req.body.guests)}
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
            config={false}
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
            config={false}
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
