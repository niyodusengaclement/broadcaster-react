import nodemailer from 'nodemailer';
import Nexmo from 'nexmo';

class SendNotification {
  SendNotification(reciever, message) {
    this.sendEmail(reciever, message);
    this.sendSms(reciever, message);
  }

  async sendEmail(reciever, message) {
    try {
      this.sender = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILERUSER,
          pass: process.env.MAILERPASS,
        },
      });

      this.mailOptions = {
        from: `The Broadcaster ${process.env.MAILERUSER}`,
        to: reciever.email,
        subject: 'Andela Broadcaster challenge',
        text: `hello ${reciever.username}
        ${message}`,
      };
      return await this.sender.sendMail(this.mailOptions);
    } catch (err) {
      return err;
    }
  }

  sendSms(reciever, message) {
    try {
      this.nexmo = new Nexmo({
        apiKey: process.env.SMS_API_KEY,
        apiSecret: process.env.SMS_API_SECRET,
      });

      const from = 'Broadcaster';
      const to = reciever.phone;
      const text = `Hi ${reciever.username}, ${message}`;
      return this.nexmo.message.sendSms(from, to, text);
    } catch (err) {
      return err;
    }
  }
}

export default new SendNotification();
