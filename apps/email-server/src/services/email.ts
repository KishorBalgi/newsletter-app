import fs from "fs";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";

// Transporter:
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

class EmailServices {
  static sendMail = async (to: string, subject: string, body: string) => {
    // Populate the email template:
    const emailTemplate = fs.readFileSync(
      "src/assets/emailTemplates/base.html",
      "utf-8"
    );
    const template = Handlebars.compile(emailTemplate);
    const htmlToSend = template({ body });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Newsletter Platform " <apps.kishorbalgi@gmail.com>',
      to: to,
      subject: subject,
      html: htmlToSend,
    });

    console.log("Message sent to %s: %s", to, info.messageId);
  };
}

export default EmailServices;
