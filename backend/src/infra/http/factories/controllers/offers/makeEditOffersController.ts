import { PrismaOffersRepository } from '@/application/offers/repositories/prisma/PrismaOffersRepository'
import { EditOffer } from '@/application/offers/use-cases/edit-offer/edit-offer'
import { EditOfferController } from '@/application/offers/use-cases/edit-offer/edit-offer.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditOffersController(): Controller {
  const prismaOffersRepository = new PrismaOffersRepository()
  const useCaseEditOffer = new EditOffer(prismaOffersRepository)

  const validator = new ValidatorCompositor([])

  return new EditOfferController(validator, useCaseEditOffer)
}
