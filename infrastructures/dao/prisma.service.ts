import { status } from '@grpc/grpc-js'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Prisma, PrismaClient } from '@prisma/client'
import { LogService } from '../log/log.service'
import { SERVICE_NAME_LOGGER } from 'src/common/constant'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  private readonly logger = new LogService()
  constructor() {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
      rejectOnNotFound: (err) => {
        throw new RpcException({
          code: status.NOT_FOUND, //Can be change later
          message: err.message, //Can be change later
        })
      },
      // log: ['query', 'info', 'warn', 'error'],
    })
  }

  async onModuleInit() {
    // error handle in exception filter
    this.$on('warn', (event) => {
      this.logger.warn({
        message: event.message,
        service: SERVICE_NAME_LOGGER.MYSQL,
      })
    })
    this.$on('info', (event) => {
      this.logger.verbose({
        message: event.message,
        service: SERVICE_NAME_LOGGER.MYSQL,
      })
    })
    this.$on('query', (event) => {
      // this.logger.log(`Query: ${event.query}`)
      // this.logger.log(`Params: ${event.params}`)
      // this.logger.log(`Duration: ${event.duration} ms`)
      this.logger.log({
        message: JSON.stringify({ query: event.query, params: event.params }),
        service: SERVICE_NAME_LOGGER.MYSQL,
        duration: event.duration,
      })
    })
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
