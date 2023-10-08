import { prismaClient } from '@/infra/prisma/client'
import { Theme } from '../../domain/theme'
import { ThemeMapper } from '../../mappers/theme.mapper'
import { IThemeRepository } from '../interfaces/IThemeRepository'

export class PrismaThemesRepository implements IThemeRepository {
  async findById(id: string): Promise<Theme | null> {
    const theme = await prismaClient.theme.findUnique({
      where: { id },
    })

    if (!theme) {
      return null
    }

    return ThemeMapper.toDomain(theme)
  }

  async create(theme: Theme): Promise<void> {
    const data = await ThemeMapper.toPersistence(theme)

    await prismaClient.theme.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.theme.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.theme.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(theme: Theme): Promise<void> {
    const data = await ThemeMapper.toPersistence(theme)

    await prismaClient.theme.update({
      where: { id: theme.id },
      data,
    })
  }

  async list(): Promise<Theme[]> {
    const themes = await prismaClient.theme.findMany()
    return themes.map(ThemeMapper.toDomain)
  }
}
