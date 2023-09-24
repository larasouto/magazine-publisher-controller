import { prismaClient } from '@/infra/prisma/client'
import { User } from '../../domain/user'
import { UserMapper } from '../../mappers/user.mapper'
import { IUsersRepository } from '../interfaces/IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    })

    return !!userExists
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prismaClient.user.create({
      data,
    })
  }
}
