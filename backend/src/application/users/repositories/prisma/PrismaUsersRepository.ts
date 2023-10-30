import { prismaClient } from '@/infra/prisma/client'
import { User } from '../../domain/user'
import { UserDetails, UserMapper } from '../../mappers/user.mapper'
import { IUsersRepository } from '../interfaces/IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { id },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async getDetails(id: string): Promise<UserDetails | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
      include: {
        addresses: true,
        cards: true,
        subscriptions: true,
      },
    })

    if (!user) {
      return null
    }

    return UserMapper.toUserDetails(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prismaClient.user.findUnique({
      where: { email },
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
