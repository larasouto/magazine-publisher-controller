import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaBookstoresRepository } from '../../repositories/prisma/PrismaBookstoresRepository'

const boookstoresRepository = new PrismaBookstoresRepository()

let boookstoreId: string[] = []

describe('List boookstores (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.bookstore.deleteMany({
      where: { id: { in: boookstoreId } },
    })
  })

  test('should list all boookstores', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      address: 'test-boookstore-address',
      name: 'bookstore-name',
    }

    await prismaClient.bookstore.create({
      data,
    })
    boookstoreId.push(data.id)

    const response = await request(app)
      .get('/api/bookstores')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const boookstores = await boookstoresRepository.list()
    expect(boookstores.length > 0).toBeTruthy()
  })
})
