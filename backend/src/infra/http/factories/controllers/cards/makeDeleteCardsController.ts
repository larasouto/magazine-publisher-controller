import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { DeleteCard } from '@/application/cards/use-cases/delete-card/delete-card'
import { DeleteCardController } from '@/application/cards/use-cases/delete-card/delete-card.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteCardsController(): Controller {
  const prismaCardsRepository = new PrismaCardsRepository()
  const useCaseDeleteCard = new DeleteCard(prismaCardsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteCardController(validator, useCaseDeleteCard)
}
