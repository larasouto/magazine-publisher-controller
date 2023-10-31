import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { v4 as uuid } from 'uuid'

let usersRepository: IUsersRepository
let addressRepository: IAddressesRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let editionsRepository: IEditionRepository

describe('Create order (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const address = AddressFactory.create({ userId: user.id })
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const edition = EditionFactory.create({ magazineId: magazine.id })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    addressRepository = new PrismaAddressesRepository()
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    editionsRepository = new PrismaEditionsRepository()
    await usersRepository.create(user)
    await addressRepository.create(address)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionsRepository.create(edition)
  })

  afterAll(async () => {
    await prismaClient.order.deleteMany({
      where: { customer_id: user.id },
    })
    await prismaClient.address.deleteMany({
      where: { id: address.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
    await prismaClient.edition.deleteMany({
      where: { id: edition.id },
    })
    await prismaClient.magazine.deleteMany({
      where: { id: magazine.id },
    })
    await prismaClient.theme.deleteMany({
      where: { id: theme.id },
    })
  })

  test('should be able to create a order', async () => {
    const data: any = {
      addressId: address.id,
      items: [
        {
          id: edition.id,
          quantity: 1,
        },
      ],
      cardId: uuid(),
      status: 1,
      totalValue: 100,
    }

    const response = await request(app)
      .post('/api/orders/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    console.log(response.body)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a order with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/orders/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
