import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeModule } from './bikes/bike.module';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from 'infrastructures/log/log.module';
import { DaoModule } from 'infrastructures/dao/dao.module';

@Module({
  imports: [ConfigModule.forRoot(), BikeModule, LogModule, DaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
