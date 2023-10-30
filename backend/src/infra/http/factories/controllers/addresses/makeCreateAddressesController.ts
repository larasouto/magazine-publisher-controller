import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { CreateAddress } from '@/application/addresses/use-cases/create-address/create-address'
import { CreateAddressController } from '@/application/addresses/use-cases/create-address/create-address.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateAddressesController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseCreateAddress = new CreateAddress(
    prismaAddressesRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateAddressController(validator, useCaseCreateAddress)
}
