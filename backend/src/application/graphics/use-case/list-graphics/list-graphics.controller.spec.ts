import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaGraphicsRepository } from '../../repositories/Prisma/PrismaGraphicsRepository'

const graphicssRepository = new PrismaGraphicsRepository()

let graphicsId: string[] = []

describe('List graphicss (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.graphics.deleteMany({
      where: { id: { in: graphicsId } },
    })
  })

  test('should list all graphicss', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'test-graphics-name',
      address: 'test-graphics-address',
    }

    await prismaClient.graphics.create({
      data,
    })
    graphicsId.push(data.id)

    const response = await request(app)
      .get('/api/magazines/graphics')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const graphicss = await graphicssRepository.list()
    expect(graphicss.length > 0).toBeTruthy()
  })
})
