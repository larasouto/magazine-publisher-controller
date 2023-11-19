import { IBookstoreRepository } from '@/application/bookstore/repositories/interfaces/IBookstoresRepository'
import { PrismaBookstoresRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { IDistributorRepository } from '@/application/distributor/repositories/Interfaces/IDistributorRepository'
import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { IGraphicsRepository } from '@/application/graphics/repositories/Interfaces/IGraphicsRepository'
import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { IGraphicsOnDistributorRepository } from '@/application/graphicsOnDistributor/repositories/Interfaces/IGraphicsOnDistributorRepository'
import { PrismaGraphicsOnDistributorRepository } from '@/application/graphicsOnDistributor/repositories/Prisma/PrismaGraphicsOnDistributorRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'
import { BookstoreFactory } from '@/tests/factories/BookstoreFactory'
import { DistributorFactory } from '@/tests/factories/DistributorFactory'
import { EditionFactory } from '@/tests/factories/EditionFactory'
import { GraphicsFactory } from '@/tests/factories/GraphicsFactoy'
import { GraphicsOnDistributorFactory } from '@/tests/factories/GraphicsOnDistributorFactoy'
import { MagazineFactory } from '@/tests/factories/MagazineFactory'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { GraphicsOrderFactory } from '@/tests/factories/GraphicsOrderFactoy'
import { PrismaGraphicsOrdersRepository } from '../../repositories/prisma/PrismaGraphicsOrderRepository'
import { StatusCodes } from 'http-status-codes'
import { app } from '@/infra/http/app'
import { Status } from '../../domain/graphicsOrder.schema'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

let usersRepository: IUsersRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository
let editionRepository: IEditionRepository
let graphicsRepository: IGraphicsRepository
let distributorRepository: IDistributorRepository
let graphicsOnDistributorRepository: IGraphicsOnDistributorRepository
let bookstoreRepository: IBookstoreRepository
let graphicsOrderRepository: IGraphicsOrderRepository

let graphicsOrderId: string[] = []

describe('Get graphicsOrder (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const theme = ThemeFactory.create()
  const magazine = MagazineFactory.create({ themeId: theme.id })
  const editions = EditionFactory.create({ magazineId: magazine.id })
  const graphics = GraphicsFactory.create()
  const distributor = DistributorFactory.create()
  const graphicsOnDistributor = GraphicsOnDistributorFactory.create({
    distributorId: distributor.id,
    graphicsId: graphics.id,
  })
  const bookstore = BookstoreFactory.create()
  const graphicsOrder = GraphicsOrderFactory.create({
    bookstoreId: bookstore.id,
    editionId: editions.id,
    graphicsDistributorId: graphicsOnDistributor.id,
  })

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    themesRepository = new PrismaThemesRepository()
    magazinesRepository = new PrismaMagazinesRepository()
    editionRepository = new PrismaEditionsRepository()
    graphicsRepository = new PrismaGraphicsRepository()
    distributorRepository = new PrismaDistributorRepository()
    graphicsOnDistributorRepository =
      new PrismaGraphicsOnDistributorRepository()
    bookstoreRepository = new PrismaBookstoresRepository()
    graphicsOrderRepository = new PrismaGraphicsOrdersRepository()
    await usersRepository.create(user)
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
    await editionRepository.create(editions)
    await graphicsRepository.create(graphics)
    await distributorRepository.create(distributor)
    await graphicsOnDistributorRepository.create(graphicsOnDistributor)
    await bookstoreRepository.create(bookstore)
    await graphicsOrderRepository.create(graphicsOrder)
  })

  afterAll(async () => {
    await prismaClient.graphicsOrder.deleteMany({
      where: { delivery_address: 'address' },
    })
    await prismaClient.edition.deleteMany({
      where: { title: { contains: 'test-title' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-magazine-name' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-theme-name' } },
    })
    await prismaClient.graphicsOnDistributor.deleteMany({
      where: { distributorId: distributor.id },
    })
    await prismaClient.distributor.deleteMany({
      where: { name: { contains: 'test-distributor-name' } },
    })
    await prismaClient.graphics.deleteMany({
      where: { name: { contains: 'test-graphics-name' } },
    })
    await prismaClient.bookstore.deleteMany({
      where: { address: { contains: 'test-bookstore-address' } },
    })
  })

  test('should list all graphicsOrder', async () => {
    graphicsOrderId.push(graphicsOrder.id)

    const response = await request(app)
      .get('/api/graphicsOrders')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const orders = await graphicsOrderRepository.list()
    expect(orders.length > 0).toBeTruthy()
  })

  test('should not be able to list order without authentication', async () => {
    const response = await request(app).get(`/api/graphicsOrders`).send()
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })
})
