import { SERVICE_NAME_LOGGER } from "src/common/constant"

export class LogDto {
  message: string
  service: SERVICE_NAME_LOGGER
  trace?: string
  duration?: number
  code?: string
}
