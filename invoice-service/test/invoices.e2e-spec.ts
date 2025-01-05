import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { InvoicesController } from '../src/invoices/invoices.coltroller';
import { InvoicesService } from '../src/invoices/invoices.service';
import { CreateInvoiceDto } from '../src/invoices/dtos/create-invoice.dto';

describe('InvoicesController (e2e)', () => {
  let app: INestApplication;
  const invoicesService = {
    createInvoice: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: invoicesService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should create an invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      customer: 'customer-id',
      amount: 100,
      reference: 'invoice-123',
      items: [{ sku: 'item1', qt: 1 }],
    };

    return request(app.getHttpServer())
      .post('/invoices')
      .send(createInvoiceDto)
      .expect(201);
  });

  it('should retrieve an invoice by id', async () => {
    const invoice = { id: '1', amount: 100, items: [{ sku: 'item1', qt: 1 }] };
    invoicesService.findById.mockResolvedValue(invoice);

    return request(app.getHttpServer())
      .get('/invoices/1')
      .expect(200)
      .expect(invoice);
  });

  it('should retrieve all invoices', async () => {
    const invoices = [
      { id: '1', amount: 100, items: [{ sku: 'item1', qt: 1 }] },
      { id: '2', amount: 200, items: [{ sku: 'item2', qt: 2 }] },
    ];
    invoicesService.findAll.mockResolvedValue(invoices);

    return request(app.getHttpServer())
      .get('/invoices')
      .expect(200)
      .expect(invoices);
  });

  afterAll(async () => {
    await app.close();
  });
});
