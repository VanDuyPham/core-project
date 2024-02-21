import { Injectable, Scope } from '@nestjs/common'
import { LoggerService } from '@nestjs/common'
import { createLogger, format, Logger, transports } from 'winston'
import { v4 as uuidV4 } from 'uuid'
import { LogDto } from './dto/log.dto'

@Injectable({
  scope: Scope.REQUEST,
})
export class LogService implements LoggerService {
  logger: Logger

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        process.env.NODE_ENV === 'development'
          ? format.prettyPrint()
          : format.json()
      ),
      defaultMeta: { requestId: uuidV4() },
      transports: [
        new transports.Console({
          silent: Boolean(
            process.env.DISABLE_LOGGING ? process.env.DISABLE_LOGGING : false
          ),
          format: format.combine(
            process.env.NODE_ENV === 'development'
              ? format.colorize({ all: true })
              : format.colorize({ all: false })
          ),
        }),
      ],
    })
  }

  log(dto: LogDto) {
    this.logger.info(dto)
  }

  error(dto: LogDto) {
    this.logger.error(dto)
  }

  warn(dto: LogDto) {
    this.logger.warn(dto)
  }

  debug(dto: LogDto) {
    this.logger.debug(dto)
  }

  verbose(dto: LogDto) {
    this.logger.verbose(dto)
  }
  static createErrorMessage(statusCode: string, message: string) {
    return `statusCode: ${statusCode}, message: ${message}`
  }
}
