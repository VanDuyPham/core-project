import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { LogModule } from 'infrastructures/log/log.module'

@Module({
  imports: [LogModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DaoModule {}
