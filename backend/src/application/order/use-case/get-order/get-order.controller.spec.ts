import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { Status } from '../../domain/order.schema'
import { response } from 'express'

describe('Get order (end-to-eOnd)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-theme-name-delete',
    description: 'test-theme-description-delete',
  }

  const magazine = {
    id: uuid(),
    name: 'test-magazine-name-delete',
    description: 'test-magazine-description-delete',
    year_founded: 2021,
    theme_id: theme.id,
  }

  const edition: any = {
    id: uuid(),
    number: 1,
    title: 'test-create-title-edition',
    description: 'test-create-description-edition',
    cover_path: 'test-create-cover-path-edition', // Corrigido
    price: 49.9,
    year: 2023,
    publication_date: new Date(),
    number_of_copies: 100,
    number_of_pages: 254,
    magazine_id: magazine.id,
  }

  const graphics: any = {
    id: uuid(),
    name: 'graphics-name',
    address: 'graphics-address',
  }
  const distributor: any = {
    id: uuid(),
    name: 'distributor-name',
    address: 'distributor-address',
    region: 'region test',
  }

  const graphicsOnDistributor: any = {
    id: uuid(),
    distributorId: distributor.id,
    graphicsId: graphics.id,
  }

  const bookstore: any = {
    id: uuid(),
    address: 'address',
  }

  const order: any = {
    id: uuid(),
    receipt_date: new Date(),
    departure_date: new Date(),
    status: Status.inPreparation,
    delivery_address: 'address',
    example_number: 12,
    editon_Id: edition.id,
    graphicsDistributor_id: graphicsOnDistributor.id,
    price: 12,
    bookstore_id: bookstore.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: magazine,
    })
    await prismaClient.edition.create({
      data: edition,
    })
    await prismaClient.graphics.create({
      data: graphics,
    })
    await prismaClient.distributor.create({
      data: distributor,
    })
    await prismaClient.graphicsOnDistributor.create({
      data: graphicsOnDistributor,
    })
    await prismaClient.bookstore.create({
      data: bookstore,
    })
    await prismaClient.order.create({
      data: order,
    })
  })

  afterAll(async () => {
    await prismaClient.order.deleteMany({
      where: { delivery_address: { contains: 'address' } },
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

  test('should not be able to get a non existing order', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/order/${order.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
  test('should not be able to get a order with no authentication', async () => {
    const response = await request(app).get(`/api/order/${order.id}`).send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a magazine with invalid orderId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/order/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
