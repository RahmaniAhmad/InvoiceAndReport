import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { Invoice } from './schemas/invoice.schema';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  /**
   * Create a new invoice
   * @param createInvoiceDto
   */
  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<{ message: string }> {
    try {
      return await this.invoicesService.createInvoice(createInvoiceDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to create invoice', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get all invoices
   */
  @Get()
  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  /**
   * Get an invoice by ID
   * @param id
   */
  @Get(':id')
  async getInvoiceById(@Param('id') id: string): Promise<Invoice> {
    const invoice = await this.invoicesService.findById(id);
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    return invoice;
  }
}
