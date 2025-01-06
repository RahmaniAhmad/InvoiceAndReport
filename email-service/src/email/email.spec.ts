import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import Mailgun from 'mailgun.js';

jest.mock('mailgun.js', () => {
  return jest.fn(() => ({
    client: jest.fn(() => ({
      messages: {
        create: jest
          .fn()
          .mockResolvedValue({ id: 'test-id', message: 'Queued' }),
      },
    })),
  }));
});

describe('EmailService', () => {
  let emailService: EmailService;
  let mailgunClient: any;

  beforeEach(async () => {
    mailgunClient = {
      messages: {
        create: jest
          .fn()
          .mockResolvedValue({ id: 'test-id', message: 'Queued' }),
      },
    };

    const MailgunMock = jest.fn(() => ({
      client: jest.fn(() => mailgunClient),
    }));

    (Mailgun as unknown as jest.Mock) = MailgunMock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
  });

  it('should send email successfully', async () => {
    await emailService.sendEmail(
      'test@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(mailgunClient.messages.create).toHaveBeenCalledWith(
      process.env.MAILGUN_DOMAIN,
      {
        from: `Ahmad Rahmani <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Body',
      },
    );
  });

  it('should throw error if sending email fails', async () => {
    mailgunClient.messages.create.mockRejectedValue(new Error('API Error'));

    const result = await emailService.sendEmail(
      'test@example.com',
      'Test Subject',
      'Test Body',
    );

    expect(result).toBe('Failed to send email');
  });
});
