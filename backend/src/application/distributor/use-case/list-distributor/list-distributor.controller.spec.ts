import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaDistributorRepository } from '../../repositories/Prisma/PrismaDistributorRepository'

const distributorsRepository = new PrismaDistributorRepository()

let distributorId: string[] = []

describe('List distributors (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.distributor.deleteMany({
      where: { id: { in: distributorId } },
    })
  })

  test('should list all distributors', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'test-distributor-name',
      address: 'test-distributor-address',
      region: 'test-distributor-region',
    }

    await prismaClient.distributor.create({
      data,
    })
    distributorId.push(data.id)

    const response = await request(app)
      .get('/api/magazines/')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const distributors = await distributorsRepository.list()
    expect(distributors.length > 0).toBeTruthy()
  })
})
