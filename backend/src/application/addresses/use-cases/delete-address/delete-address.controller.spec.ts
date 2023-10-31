import { app } from '@/infra/http/app'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { PrismaAddressesRepository } from '../../repositories/prisma/PrismaAddressesRepository'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'

let addressesRepository: IAddressesRepository
let usersRepository: IUsersRepository

describe('Delete address (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const addresses = [
    AddressFactory.create({ userId: user.id }),
    AddressFactory.create({ userId: user.id }),
    AddressFactory.create({ userId: user.id }),
  ]

  beforeAll(async () => {
    addressesRepository = new PrismaAddressesRepository()
    usersRepository = new PrismaUsersRepository()

    await usersRepository.create(user)
    await addressesRepository.create(addresses[0])
    await addressesRepository.create(addresses[1])
    await addressesRepository.create(addresses[2])
  })

  afterAll(async () => {
    await prismaClient.address.deleteMany({
      where: { street: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to delete an existing address', async () => {
    const response = await request(app)
      .del(`/api/addresses/?ids=${addresses[0].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to delete more than one address', async () => {
    const response = await request(app)
      .del(`/api/addresses/?ids=${addresses[1].id}&ids=${addresses[2].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })
})
