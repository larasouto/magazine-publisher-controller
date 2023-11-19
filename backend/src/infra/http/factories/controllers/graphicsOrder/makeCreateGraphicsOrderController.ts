import { PrismaGraphicsOrdersRepository } from "@/application/graphicsOrder/repositories/prisma/PrismaGraphicsOrderRepository"
import { CreateGraphicsOrder } from "@/application/graphicsOrder/use-case/create-order/create-graphicsOrder"
import { CreateGraphicsOrderController } from "@/application/graphicsOrder/use-case/create-order/create-graphicsOrder.controller"
import { Controller } from "@/core/infra/controller"
import { ValidatorCompositor } from "@/infra/validation/ValidatorCompositor"

export function makeCreateGraphicsOrderController(): Controller {
  const prismaGraphicsOrderRepository = new PrismaGraphicsOrdersRepository()
  const useCaseCreateGraphicsOrder = new CreateGraphicsOrder(prismaGraphicsOrderRepository)

  const validator = new ValidatorCompositor([])

  return new CreateGraphicsOrderController(validator, useCaseCreateGraphicsOrder)
}
