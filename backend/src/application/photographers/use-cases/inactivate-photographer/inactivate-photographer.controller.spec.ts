import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { PrismaPhotographersRepository } from '../../repositories/prisma/PrismaPhotographersRepository'

let photographersRepository: IPhotographerRepository

describe('Inactivate a photographer (end-to-end)', () => {
  const create = {
    id: uuid(),
    name: 'test-name-photographer',
    email: 'testphotographer@email.com',
    phone: '(54) 93280-4744',
    cpf: '28791581338',
    specialty: 'test-specialty-photographer',
    status: 'ACTIVE',
    entry_date: new Date(),
    departure_date: null,
  }

  beforeAll(async () => {
    photographersRepository = new PrismaPhotographersRepository()
    await prismaClient.photographer.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.photographer.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to inactivate a photographer', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .put(`/api/photographers/${create.id}/inactivate`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)

    const photographer = await photographersRepository.findById(create.id)
    expect(photographer.props.status).toBe('INACTIVE')
  })

  test('should not be able to inactivate a non existing photographer', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .put(`/api/photographers/${create.id}-complement/inactivate`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to inactivate a photographer with invalid photographerId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .put(`/api/photographers/${null}/inactivate`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
