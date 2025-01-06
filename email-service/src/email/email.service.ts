import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import * as formData from 'form-data';

@Injectable()
export class EmailService {
  private mailgunClient: any;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.mailgunClient = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      timeout: 10000,
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<string> {
    try {
      console.log('to: ', to);
      console.log('Subject: ', subject);
      console.log('Text: ', text);
      //we should send email here
      const response = await this.mailgunClient.messages.create(
        process.env.MAILGUN_DOMAIN,
        {
          from: `Ahmad Rahmani <mailgun@${process.env.MAILGUN_DOMAIN}>`,
          to,
          subject,
          text,
        },
      );
    } catch (error) {
      console.error('Error sending email:', error);
      return 'Failed to send email';
    }
  }
}
