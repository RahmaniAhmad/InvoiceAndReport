import { Test, TestingModule } from '@nestjs/testing';
import { CreateInvoiceDto } from '../invoices/dtos/create-invoice.dto';
import { InvoicesService } from '../invoices/invoices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Invoice } from '../invoices/schemas/invoice.schema';

const mockInvoice = {
  id: '1',
  customer: 'customer-id',
  amount: 100,
  reference: 'invoice-123',
  items: [
    {
      sku: 'item1',
      qt: 1,
    },
  ],
};

const mockInvoiceModel = {
  new: jest.fn().mockResolvedValue(mockInvoice),
  save: jest.fn().mockResolvedValue(mockInvoice),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockInvoice),
  }),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockInvoice]),
  }),
};

describe('InvoicesService', () => {
  let service: InvoicesService;

  const createInvoiceDto: CreateInvoiceDto = {
    customer: 'customer-id',
    amount: 100,
    reference: 'invoice-123',
    items: [
      {
        sku: 'item1',
        qt: 1,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockInvoiceModel,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const result = await service.createInvoice(createInvoiceDto);

    expect(result).toEqual({ message: 'Invoice Created.' });
    expect(mockInvoiceModel.save).toHaveBeenCalledTimes(1);
    expect(mockInvoiceModel.save).toHaveBeenCalledWith(createInvoiceDto);
  });

  it('should find an invoice by id', async () => {
    const result = await service.findById('1');

    expect(result).toEqual(mockInvoice);
    expect(mockInvoiceModel.findById).toHaveBeenCalledTimes(1);
    expect(mockInvoiceModel.findById).toHaveBeenCalledWith('1');
  });

  it('should find all invoices', async () => {
    const result = await service.findAll();

    expect(result).toEqual([mockInvoice]);
    expect(mockInvoiceModel.find).toHaveBeenCalledTimes(1);
  });
});
