import { prismaClient } from '@/infra/prisma/client'
import { Address } from '../../domain/address'
import { AddressMapper } from '../../mappers/address.mapper'
import { IAddressesRepository } from '../interfaces/IAddressesRepository'

export class PrismaAddressesRepository implements IAddressesRepository {
  async findById(id: string): Promise<Address | null> {
    const address = await prismaClient.address.findUnique({
      where: { id },
    })

    if (!address) {
      return null
    }

    return AddressMapper.toDomain(address)
  }

  async create(address: Address): Promise<void> {
    const data = await AddressMapper.toPersistence(address)

    await prismaClient.address.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.address.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(address: Address): Promise<void> {
    const data = await AddressMapper.toPersistence(address)

    await prismaClient.address.update({
      where: { id: address.id },
      data,
    })
  }

  async list(): Promise<Address[]> {
    const addresses = await prismaClient.address.findMany()
    return addresses.map(AddressMapper.toDomain)
  }
}
