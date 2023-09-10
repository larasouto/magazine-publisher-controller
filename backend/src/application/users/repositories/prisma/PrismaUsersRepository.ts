import { prismaClient } from '@/infra/prisma/client'
import { User } from '../../domain/user'
import { UserMapper } from '../../mappers/user-mapper'
import { IUsersRepository } from '../IUsersRepository'

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

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prismaClient.user.create({
      data,
    })
  }
}
