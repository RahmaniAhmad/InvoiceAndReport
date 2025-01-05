import { Injectable } from '@nestjs/common';
import { InvoicesService } from 'src/invoices/invoices.service';

@Injectable()
export class InvoiceDailyReportGenerationService {
  constructor(private readonly invoicesService: InvoicesService) {}

  async generateDailyReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const invoices = await this.invoicesService.findAll();

    const totalSales = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const itemSummary = invoices
      .flatMap((inv) => inv.items)
      .reduce((acc, item) => {
        acc[item.sku] = (acc[item.sku] || 0) + item.qt;
        return acc;
      }, {});

    return { totalSales, itemSummary };
  }
}
