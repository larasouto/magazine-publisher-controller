import { prismaClient } from '@/infra/prisma/client'
import { ICategoryRepository } from '../interfaces/ICategoryRepository'
import { Category } from '../../domain/category'
import { CategoryMapper } from '../../mappers/category.mapper'

export class PrismaCategoriesRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await prismaClient.category.findUnique({
      where: { id },
    })

    if (!category) {
      return null
    }

    return CategoryMapper.toDomain(category)
  }

  async create(category: Category): Promise<void> {
    const data = await CategoryMapper.toPersistence(category)

    await prismaClient.category.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.category.delete({
      where: { id },
    })
  }

  async update(category: Category): Promise<void> {
    const data = await CategoryMapper.toPersistence(category)

    await prismaClient.category.update({
      where: { id: category.id },
      data,
    })
  }

  async list(): Promise<Category[]> {
    const categories = await prismaClient.category.findMany()
    return categories.map(CategoryMapper.toDomain)
  }
}
