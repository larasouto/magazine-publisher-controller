import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { CreateCard } from '@/application/cards/use-cases/create-card/create-card'
import { CreateCardController } from '@/application/cards/use-cases/create-card/create-card.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCardsController(): Controller {
  const prismaCardsRepository = new PrismaCardsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseCreateCard = new CreateCard(
    prismaCardsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateCardController(validator, useCaseCreateCard)
}
