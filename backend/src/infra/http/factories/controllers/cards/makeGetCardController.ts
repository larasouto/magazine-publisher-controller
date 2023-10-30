import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { GetCard } from '@/application/cards/use-cases/get-card/get-card'
import { GetCardController } from '@/application/cards/use-cases/get-card/get-card.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetCardController(): Controller {
  const prismaCardsRepository = new PrismaCardsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetCard = new GetCard(
    prismaCardsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetCardController(validator, useCaseGetCard)
}
