import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { EditAddress } from '@/application/addresses/use-cases/edit-address/edit-address'
import { EditAddressController } from '@/application/addresses/use-cases/edit-address/edit-address.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditAddressesController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseEditAddress = new EditAddress(
    prismaAddressesRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditAddressController(validator, useCaseEditAddress)
}
