import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { DeleteAddress } from '@/application/addresses/use-cases/delete-address/delete-address'
import { DeleteAddressController } from '@/application/addresses/use-cases/delete-address/delete-address.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteAddressesController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const useCaseDeleteAddress = new DeleteAddress(prismaAddressesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteAddressController(validator, useCaseDeleteAddress)
}
