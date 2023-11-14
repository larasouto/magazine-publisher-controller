import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { PrismaOrdersRepository } from '@/application/orders/repositories/prisma/PrismaOrdersRepository'
import { CreateOrder } from '@/application/orders/use-cases/order-item/order-item'
import { CreateOrderController } from '@/application/orders/use-cases/order-item/order-item.controller'

import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateOrdersController(): Controller {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaCouponsRepository = new PrismaCouponsRepository()
  const prismaCardsRepository = new PrismaCardsRepository()
  const useCaseCreateOrder = new CreateOrder(
    prismaOrdersRepository,
    prismaUsersRepository,
    prismaAddressesRepository,
    prismaCouponsRepository,
    prismaCardsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateOrderController(validator, useCaseCreateOrder)
}
