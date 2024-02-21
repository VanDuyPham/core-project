import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MESSAGE_MAX_LENGTH } from './common/constant-setting';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_URL,

      package: ['bike'],
      protoPath: [join(process.cwd(), './proto/bike/bike.proto')],

      maxReceiveMessageLength: MESSAGE_MAX_LENGTH,
      maxSendMessageLength: MESSAGE_MAX_LENGTH,
    },
  });

  await app.listen();
}
bootstrap();
