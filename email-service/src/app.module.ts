import { Module } from '@nestjs/common';
import { InvoiceDailyReportConsumer } from './consumers/invoice-daily-report.consumer';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [EmailService],
  controllers: [InvoiceDailyReportConsumer],
})
export class AppModule {}
