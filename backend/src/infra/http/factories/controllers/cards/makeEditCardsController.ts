import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { EditCard } from '@/application/cards/use-cases/edit-card/edit-card'
import { EditCardController } from '@/application/cards/use-cases/edit-card/edit-card.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditCardsController(): Controller {
  const prismaCardsRepository = new PrismaCardsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseEditCard = new EditCard(
    prismaCardsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditCardController(validator, useCaseEditCard)
}
