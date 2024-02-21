import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { DaoModule } from 'infrastructures/dao/dao.module';
import { RepositoryModule } from 'src/repositories/repository.module';

@Module({
  imports: [DaoModule, RepositoryModule],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
