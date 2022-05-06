import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a348396814ed4e",
    pass: "518ec1b73fbd56"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Widget <teste@teste.com>',
      to: 'Teste <teste@gmail.com>',
      subject,
      html: body,
    });
  };
}