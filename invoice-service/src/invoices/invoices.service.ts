import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { Invoice } from './schemas/invoice.schema';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async createInvoice(
    invoiceDto: CreateInvoiceDto,
  ): Promise<{ message: string }> {
    await this.createInDatabase(invoiceDto);
    return { message: 'Invoice Created.' };
  }

  async createInDatabase(invoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoiceModel.create(invoiceDto);
  }

  async findById(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id).exec();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }
}
