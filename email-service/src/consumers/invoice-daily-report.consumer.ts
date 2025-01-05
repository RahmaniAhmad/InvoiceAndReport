import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailService } from '../email/email.service';

@Controller()
export class InvoiceDailyReportConsumer {
  private readonly logger = new Logger(InvoiceDailyReportConsumer.name);

  constructor(private readonly emailService: EmailService) {}

  @EventPattern('daily_sales_report')
  async handleInvoiceCreated(
    @Payload() message: any,
    @Ctx() context: RmqContext,
  ) {
    const { totalSales, itemSummary } = message;
    if (!totalSales || !itemSummary) {
      this.logger.error('Invalid message structure. Missing required fields.');
      context.getChannelRef().nack(context.getMessage(), false, false);
      return;
    }

    this.emailService.sendEmail(
      'a_rahmani82@yahoo.com',
      `daily sales report`,
      totalSales + ',' + JSON.stringify(itemSummary),
    );
  }
}
