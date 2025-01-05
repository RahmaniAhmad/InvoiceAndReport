import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getMicroserviceOptions(),
  );

  await app
    .listen()
    .then(() => console.log('Email service is listening...'))
    .catch((err) => console.error('Error starting Email service:', err));
}

function getMicroserviceOptions(): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'invoices-queue',
      queueOptions: {
        durable: true,
      },
    },
  };
}

bootstrap();
