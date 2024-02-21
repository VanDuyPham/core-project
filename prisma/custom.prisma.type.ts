import { PrismaClient, Prisma } from '@prisma/client'
export const prisma = new PrismaClient()

// transaction
export type PrismaTransactional = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>

const getPrismaBike = () => prisma.bike
export type PrismaBike = ReturnType<typeof getPrismaBike>
