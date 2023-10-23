import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaGraphicsRepository } from '../../repositories/Prisma/PrismaGraphicsRepository'

const graphicsRepository = new PrismaGraphicsRepository()

let graphicsId: string[] = []

describe('List graphics (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.graphics.deleteMany({
      where: { id: { in: graphicsId } },
    })
  })

  test('should list all graphics', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'test-graphics-name',
      address: 'test-graphics-address',
    }

    const graphic = await prismaClient.graphics.create({
      data,
    })
    console.log(graphic)
    graphicsId.push(data.id)

    const response = await request(app)
      .get('/api/magazines/graphics')
      .auth(jwt.token, { type: 'bearer' })
    console.log(response.body)

    expect(response.status).toBe(StatusCodes.OK)

    const graphics = await graphicsRepository.list()
    expect(graphics.length > 0).toBeTruthy()
  })
})
