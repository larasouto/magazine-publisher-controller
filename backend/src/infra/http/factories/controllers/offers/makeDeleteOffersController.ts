import { PrismaOffersRepository } from '@/application/offers/repositories/prisma/PrismaOffersRepository'
import { DeleteOffer } from '@/application/offers/use-cases/delete-offer/delete-offer'
import { DeleteOfferController } from '@/application/offers/use-cases/delete-offer/delete-offer.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteOffersController(): Controller {
  const prismaOffersRepository = new PrismaOffersRepository()
  const useCaseDeleteOffer = new DeleteOffer(prismaOffersRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteOfferController(validator, useCaseDeleteOffer)
}
