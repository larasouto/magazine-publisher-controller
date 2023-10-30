import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { GetAddress } from '@/application/addresses/use-cases/get-address/get-address'
import { GetAddressController } from '@/application/addresses/use-cases/get-address/get-address.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetAddressController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const useCaseGetAddress = new GetAddress(prismaAddressesRepository)

  const validator = new ValidatorCompositor([])

  return new GetAddressController(validator, useCaseGetAddress)
}
