import { prismaClient } from '@/infra/prisma/client'
import { Review } from '../../domain/review'
import { ReviewMapper } from '../../mappers/review.mapper'
import { IReviewsRepository } from '../interfaces/IReviewsRepository'

export class PrismaReviewsRepository implements IReviewsRepository {
  async findById(id: string): Promise<Review | null> {
    const review = await prismaClient.review.findUnique({
      where: { id },
    })

    if (!review) {
      return null
    }

    return ReviewMapper.toDomain(review)
  }

  async create(review: Review): Promise<void> {
    const data = await ReviewMapper.toPersistence(review)

    await prismaClient.review.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.review.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.review.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(review: Review): Promise<void> {
    const data = await ReviewMapper.toPersistence(review)

    await prismaClient.review.update({
      where: { id: review.id },
      data,
    })
  }

  async exists(id: string): Promise<boolean> {
    const reviewExists = await prismaClient.review.findUnique({
      where: { id },
    })

    return !!reviewExists
  }

  async list(): Promise<Review[]> {
    const reviews = await prismaClient.review.findMany()
    return reviews.map(ReviewMapper.toDomain)
  }
}
