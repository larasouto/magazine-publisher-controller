import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { ListAddresses } from '@/application/addresses/use-cases/list-address/list-address'
import { ListAddressController } from '@/application/addresses/use-cases/list-address/list-address.controller'
import { Controller } from '@/core/infra/controller'

export function makeListAddressesController(): Controller {
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const useCaseListAddress = new ListAddresses(prismaAddressesRepository)

  return new ListAddressController(useCaseListAddress)
}
