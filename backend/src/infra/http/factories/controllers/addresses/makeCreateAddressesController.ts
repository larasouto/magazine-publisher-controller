import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { CreateAddress } from '@/application/addresses/use-cases/create-address/create-address'
import { CreateAddressController } from '@/application/addresses/use-cases/create-address/create-address.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateAddressesController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const useCaseCreateAddress = new CreateAddress(prismaAddressesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateAddressController(validator, useCaseCreateAddress)
}
