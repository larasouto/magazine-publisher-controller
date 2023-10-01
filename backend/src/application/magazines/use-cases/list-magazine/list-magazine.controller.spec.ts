import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'
import { PrismaMagazinesRepository } from '../../repositories/prisma/PrismaMagazinesRepository'

const magazinesRepository = new PrismaMagazinesRepository()

let magazineId: string[] = []

describe('List magazines (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.magazine.deleteMany({
      where: { id: { in: magazineId } },
    })
    await prismaClient.theme.deleteMany()
  })

  test('should list all magazines', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await prismaClient.theme.create({ data: themeData })

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      year_founded: 2021,
      publication_period: 'ANNUALLY',
      theme_id: themeData.id,
    }

    await prismaClient.magazine.create({
      data,
    })
    magazineId.push(data.id)

    const response = await request(app)
      .get('/api/magazines')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const magazines = await magazinesRepository.list()
    expect(magazines.length > 0).toBeTruthy()
  })
})
