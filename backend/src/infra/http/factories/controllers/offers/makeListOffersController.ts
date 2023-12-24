import { PrismaOffersRepository } from '@/application/offers/repositories/prisma/PrismaOffersRepository'
import { ListOffers } from '@/application/offers/use-cases/list-offer/list-offer'
import { ListOfferController } from '@/application/offers/use-cases/list-offer/list-offer.controller'
import { Controller } from '@/core/infra/controller'

export function makeListOffersController(): Controller {
  const prismaOffersRepository = new PrismaOffersRepository()
  const useCaseListOffer = new ListOffers(prismaOffersRepository)

  return new ListOfferController(useCaseListOffer)
}
