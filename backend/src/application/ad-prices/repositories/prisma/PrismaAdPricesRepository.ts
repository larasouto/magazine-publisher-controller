import { prismaClient } from '@/infra/prisma/client'
import { AdPrice } from '../../domain/ad-price'
import { IAdPricesRepository } from '../interfaces/IAdPricesRepository'
import { AdPriceMapper } from '../../mappers/ad-price.mapper'

export class PrismaAdPricesRepository implements IAdPricesRepository {
  async findById(id: string): Promise<AdPrice | null> {
    const adPrice = await prismaClient.adPrice.findUnique({
      where: { id },
    })

    if (!adPrice) {
      return null
    }

    return AdPriceMapper.toDomain(adPrice)
  }

  async findByMagazineId(id: string): Promise<AdPrice | null> {
    const adPrice = await prismaClient.adPrice.findFirst({
      where: { magazine_id: id },
    })

    if (!adPrice) {
      return null
    }

    return AdPriceMapper.toDomain(adPrice)
  }

  async create(adPrice: AdPrice): Promise<void> {
    const data = await AdPriceMapper.toPersistence(adPrice)

    await prismaClient.adPrice.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.adPrice.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(adPrice: AdPrice): Promise<void> {
    const data = await AdPriceMapper.toPersistence(adPrice)

    await prismaClient.adPrice.update({
      where: { id: adPrice.id },
      data,
    })
  }

  async list(): Promise<AdPrice[]> {
    const adPrices = await prismaClient.adPrice.findMany()
    return adPrices.map(AdPriceMapper.toDomain)
  }
}
