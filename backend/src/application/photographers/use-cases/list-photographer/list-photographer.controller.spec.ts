import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, describe, expect, test } from 'vitest'
import { PrismaPhotographersRepository } from '../../repositories/prisma/PrismaPhotographersRepository'

const photographersRepository = new PrismaPhotographersRepository()

let photographerId: string[] = []

describe('List photographers (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.photographer.deleteMany({
      where: { id: { in: photographerId } },
    })
  })

  test('should list all photographers', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'name-photographer',
      email: 'photographer@email.com',
      phone: '(54) 93280-4744',
      cpf: '287.915.813-38',
      specialty: 'test-specialty-photographer',
      status: 'ACTIVE',
      entry_date: new Date(),
    }

    await prismaClient.photographer.create({
      data,
    })
    photographerId.push(data.id)

    const response = await request(app)
      .get('/api/photographers')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const photographers = await photographersRepository.list()
    expect(photographers.length > 0).toBeTruthy()
  })
})
