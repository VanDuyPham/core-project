import { Module } from '@nestjs/common';
import { BikeRepository } from './bike.repository';
import { DaoModule } from 'infrastructures/dao/dao.module';

@Module({
  imports: [DaoModule],
  providers: [BikeRepository],
  exports: [BikeRepository],
})
export class RepositoryModule {}
