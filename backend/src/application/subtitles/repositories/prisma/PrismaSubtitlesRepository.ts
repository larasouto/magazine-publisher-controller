import { prismaClient } from '@/infra/prisma/client'
import { Subtitle } from '../../domain/subtitle'
import { SubtitleMapper } from '../../mappers/subtitle.mapper'
import { ISubtitleRepository } from '../interfaces/ISubtitleRepository'

export class PrismaSubtitlesRepository implements ISubtitleRepository {
  async findById(id: string): Promise<Subtitle | null> {
    const subtitle = await prismaClient.subtitle.findUnique({
      where: { id },
    })

    if (!subtitle) {
      return null
    }

    return SubtitleMapper.toDomain(subtitle)
  }

  async create(subtitle: Subtitle): Promise<void> {
    const data = await SubtitleMapper.toPersistence(subtitle)

    await prismaClient.subtitle.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.subtitle.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.subtitle.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(subtitle: Subtitle): Promise<void> {
    const data = SubtitleMapper.toPersistence(subtitle)

    await prismaClient.subtitle.update({
      where: { id: subtitle.id },
      data,
    })
  }

  async list(): Promise<Subtitle[]> {
    const subtitles = await prismaClient.subtitle.findMany()
    return subtitles?.map((subtitle) => SubtitleMapper.toDomain(subtitle))
  }
}
