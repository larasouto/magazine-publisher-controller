import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { ListCards } from '@/application/cards/use-cases/list-card/list-card'
import { ListCardController } from '@/application/cards/use-cases/list-card/list-card.controller'
import { Controller } from '@/core/infra/controller'

export function makeListCardsController(): Controller {
  const prismaCardsRepository = new PrismaCardsRepository()
  const useCaseListCard = new ListCards(prismaCardsRepository)

  return new ListCardController(useCaseListCard)
}
