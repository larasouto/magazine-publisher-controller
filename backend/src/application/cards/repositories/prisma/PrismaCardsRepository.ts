import { prismaClient } from '@/infra/prisma/client'
import { Card } from '../../domain/card'
import { CardMapper } from '../../mappers/card.mapper'
import { ICardsRepository } from '../interfaces/ICardsRepository'

export class PrismaCardsRepository implements ICardsRepository {
  async findById(id: string): Promise<Card | null> {
    const card = await prismaClient.card.findUnique({
      where: { id },
    })

    if (!card) {
      return null
    }

    return CardMapper.toDomain(card)
  }

  async create(card: Card): Promise<void> {
    const data = await CardMapper.toPersistence(card)

    await prismaClient.card.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.card.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(card: Card): Promise<void> {
    const data = await CardMapper.toPersistence(card)

    await prismaClient.card.update({
      where: { id: card.id },
      data,
    })
  }

  async list(): Promise<Card[]> {
    const cards = await prismaClient.card.findMany()
    return cards.map(CardMapper.toDomain)
  }
}
