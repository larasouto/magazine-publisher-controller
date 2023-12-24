import { prismaClient } from '@/infra/prisma/client'
import { Offer } from '../../domain/offer'
import { OfferMapper } from '../../mappers/offer.mapper'
import { IOffersRepository } from '../interfaces/IOffersRepository'

export class PrismaOffersRepository implements IOffersRepository {
  async findById(id: string): Promise<Offer | null> {
    const offer = await prismaClient.offer.findUnique({
      where: { id },
    })

    if (!offer) {
      return null
    }

    return OfferMapper.toDomain(offer)
  }

  async create(offer: Offer): Promise<void> {
    const data = await OfferMapper.toPersistence(offer)

    await prismaClient.offer.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.offer.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(offer: Offer): Promise<void> {
    const data = await OfferMapper.toPersistence(offer)

    await prismaClient.offer.update({
      where: { id: offer.id },
      data,
    })
  }

  async exists(id: string): Promise<boolean> {
    const offerExists = await prismaClient.offer.findUnique({
      where: { id },
    })

    return !!offerExists
  }

  async list(): Promise<Offer[]> {
    const offers = await prismaClient.offer.findMany()
    return offers.map((offer) => OfferMapper.toDomain(offer))
  }
}
