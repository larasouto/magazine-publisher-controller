import { PrismaClient } from '@prisma/client'

export abstract class SingletonPrisma {
  private static instance: PrismaClient

  public static getInstance(): PrismaClient {
    if (!SingletonPrisma.instance) {
      SingletonPrisma.instance = new PrismaClient()
    }

    return SingletonPrisma.instance
  }
}

export const prismaClient = SingletonPrisma.getInstance()
