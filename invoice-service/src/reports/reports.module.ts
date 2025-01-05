import { Module } from '@nestjs/common';
import { InvoiceDailyReportGenerationService } from './invoiceDailyReportGeneration/invoiceDailyReportGeneration.service';
import { InvoicePublishersService } from './invoicePublishers/invoicePublishers.service';
import { InvoicesService } from 'src/invoices/invoices.service';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    InvoicesModule,
    ClientsModule.register([
      {
        name: 'INVOICES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'invoices-queue',
        },
      },
    ]),
  ],
  providers: [InvoiceDailyReportGenerationService, InvoicePublishersService],
})
export class ReportsModule {}
