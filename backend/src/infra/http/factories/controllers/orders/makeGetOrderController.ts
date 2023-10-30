import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaOrdersRepository } from '@/application/orders/repositories/prisma/PrismaOrdersRepository'
import { GetOrder } from '@/application/orders/use-cases/get-order/get-order'
import { GetOrderController } from '@/application/orders/use-cases/get-order/get-order.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetOrderController(): Controller {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const useCaseGetOrder = new GetOrder(
    prismaOrdersRepository,
    prismaUsersRepository,
    prismaAddressesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetOrderController(validator, useCaseGetOrder)
}
