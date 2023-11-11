import { IBookstoreRepository } from '@/application/bookstore/repositories/interfaces/IBookstoresRepository'
import { IDistributorRepository } from '@/application/distributor/repositories/Interfaces/IDistributorRepository'
import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { IGraphicsRepository } from '@/application/graphics/repositories/Interfaces/IGraphicsRepository'
import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { PrismaGraphicsOrdersRepository } from '@/application/graphicsOrder/repositories/prisma/PrismaGraphicsOrderRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { app } from '@/infra/http/app'
import { graphicsOrder } from '@/infra/http/routes/graphicsOrder.routes'
import { prismaClient } from '@/infra/prisma/client'
import { BookstoreFactory } from '@/tests/factories/BookstoreFactory'
import { DistributorFactory } from '@/tests/factories/DistributorFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { GraphicsFactory } from '@/tests/factories/GraphicsFactoy'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { afterAll, beforeAll, expect } from 'vitest'

let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let editionRepository: IEditionRepository
let graphicsRepository: IGraphicsRepository
let distributorRepository: IDistributorRepository
let bookstoreRepository: IBookstoreRepository
let graphicsOrderRepository: IGraphicsRepository

describe('Create subscription (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const editions = EditionFactory.create({ magazineId: magazine.id })
  const graphics = GraphicsFactory.create()
  const distributor = DistributorFactory.create()
  const graphicsOnDistributor = GraphicsOnDistributorFactory.create()
  const bookstore = BookstoreFactory.create()
  const graphicsOrder = BookstoreFactory.create()

  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    editionRepository = new PrismaEditionsRepository()
    graphicsRepository = new PrismaGraphicsRepository()
    distributorRepository = new PrismaDistributorRepository()
    bookstoreRepository = new PrismaDistributorRepository()
    graphicsOrderRepository = new PrismaGraphicsOrdersRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionRepository.create(editions)
    await graphicsRepository.create(graphics)
    await distributorRepository.create(distributor)
    await bookstoreRepository.create(bookstore)
    await graphicsOrderRepository.create(graphicsOrder)
  })

  afterAll(async () => {
    await prismaClient.graphicsorder.deleteMany({
      where: { delivery_address: 'address' },
    })
    await prismaClient.graphicsOnDistributor.deleteMany({
      where: { id: { contains: graphicsOnDistributor.id } },
    })
    await prismaClient.bookstore.deleteMany({
      where: { id: { contains: bookstore.id } },
    })
    await prismaClient.distributor.deleteMany({
      where: { name: { contains: 'distributor-name' } },
    })
    await prismaClient.graphics.deleteMany({
      where: { name: { contains: 'graphics-name' } },
    })
    await prismaClient.edition.deleteMany({
      where: { title: { contains: 'test-create-title-edition' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-magazine-name-delete' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-theme-name-delete' } },
    })
  })

  test('should be able to create an order', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.inPreparation,
      deliveryAddress: 'address',
      exampleNumber: 12,
      editonId: edition.id,
      graphicsDistributorId: graphicsOnDistributor.id,
      price: 12,
      bookstoreId: bookstore.id,
    }

    const response = await request(app)
      .post('/api/order/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })
})
