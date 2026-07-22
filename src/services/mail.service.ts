import nodemailer, { Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMailActivationCode(toEmail: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: "Akkauntni faollashtiring",
      text: "",
      html: `
      <div>
            <h2>Akkauntni faollashtirish uchun quyidagi linkni bosing</h2>
            <a href="${link}">FAOLLASHTIRISH</a>
      </div>
      `,
    });
  }
}

export default new MailService();