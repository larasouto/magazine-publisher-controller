import { PrismaOffersRepository } from '@/application/offers/repositories/prisma/PrismaOffersRepository'
import { GetOffer } from '@/application/offers/use-cases/get-offer/get-offer'
import { GetOfferController } from '@/application/offers/use-cases/get-offer/get-offer.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetOfferController(): Controller {
  const prismaOffersRepository = new PrismaOffersRepository()
  const useCaseGetOffer = new GetOffer(prismaOffersRepository)

  const validator = new ValidatorCompositor([])

  return new GetOfferController(validator, useCaseGetOffer)
}
