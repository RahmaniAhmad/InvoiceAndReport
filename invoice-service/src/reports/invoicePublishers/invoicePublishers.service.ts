import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { InvoiceDailyReportGenerationService } from '../invoiceDailyReportGeneration/invoiceDailyReportGeneration.service';

@Injectable()
export class InvoicePublishersService {
  constructor(
    private readonly invoiceDailyReportGenerationService: InvoiceDailyReportGenerationService,
    @Inject('INVOICES_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  @Cron('0 12 * * *') // Runs at 12:00 PM daily
  async publishDailyReport() {
    const report =
      await this.invoiceDailyReportGenerationService.generateDailyReport();
    console.log('Generated Report:', JSON.stringify(report));

    this.rabbitClient.emit('daily_sales_report', report);
  }
}
