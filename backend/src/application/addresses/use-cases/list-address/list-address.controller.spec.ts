import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaAddressesRepository } from '../../repositories/prisma/PrismaAddressesRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { AddressFactory } from '@/tests/factories/AddressFactory'

let addressesRepository: IAddressesRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let usersRepository: IUsersRepository

let addressId: string[] = []

describe('List addresses (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const address = AddressFactory.create({
    userId: user.id,
  })

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    usersRepository = new PrismaUsersRepository()
    addressesRepository = new PrismaAddressesRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await usersRepository.create(user)
    await addressesRepository.create(address)
  })

  afterAll(async () => {
    await prismaClient.address.deleteMany({
      where: { street: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should list all addresses', async () => {
    addressId.push(address.id)

    const response = await request(app)
      .get('/api/addresses')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const addresses = await addressesRepository.list()
    expect(addresses.length > 0).toBeTruthy()
  })
})
