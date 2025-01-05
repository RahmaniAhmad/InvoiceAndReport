import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesModule } from './invoices/invoices.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/invoice-db'),
    ScheduleModule.forRoot(),
    InvoicesModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
