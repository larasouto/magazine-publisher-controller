import { PrismaOffersRepository } from '@/application/offers/repositories/prisma/PrismaOffersRepository'
import { CreateOffer } from '@/application/offers/use-cases/create-offer/create-offer'
import { CreateOfferController } from '@/application/offers/use-cases/create-offer/create-offer.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateOffersController(): Controller {
  const prismaOffersRepository = new PrismaOffersRepository()

  const useCaseCreateOffer = new CreateOffer(prismaOffersRepository)

  const validator = new ValidatorCompositor([])

  return new CreateOfferController(validator, useCaseCreateOffer)
}
