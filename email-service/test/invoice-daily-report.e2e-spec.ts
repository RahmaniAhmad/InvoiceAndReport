import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { InvoiceDailyReportConsumer } from '../src/consumers/invoice-daily-report.consumer';
import { EmailService } from '../src/Email/email.service';
import { RmqContext } from '@nestjs/microservices';

describe('InvoiceDailyReportConsumer (E2E)', () => {
  let app: INestApplication;
  let emailService: EmailService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceDailyReportConsumer],
      providers: [
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    emailService = moduleFixture.get<EmailService>(EmailService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should process valid RabbitMQ message', async () => {
    const message = { totalSales: 500, itemSummary: { item: 'item2', qty: 5 } };
    const sendEmailSpy = jest.spyOn(emailService, 'sendEmail');

    // Mock RmqContext
    const mockRmqContext: Partial<RmqContext> = {
      getArgs: jest
        .fn()
        .mockReturnValue([message, { nack: jest.fn() }, 'invoice.created']),
      getChannelRef: jest.fn().mockReturnValue({
        nack: jest.fn(),
      }),
      getMessage: jest.fn().mockReturnValue(message),
      getPattern: jest.fn().mockReturnValue('invoice.created'),
    };

    const consumer = app.get<InvoiceDailyReportConsumer>(
      InvoiceDailyReportConsumer,
    );
    await consumer.handleInvoiceCreated(message, mockRmqContext as RmqContext);

    expect(sendEmailSpy).toHaveBeenCalledWith(
      'a_rahmani82@yahoo.com',
      'daily sales report',
      '500,{"item":"item2","qty":5}',
    );
  });
});
