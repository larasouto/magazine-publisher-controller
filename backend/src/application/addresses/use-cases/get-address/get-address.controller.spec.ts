import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaAddressesRepository } from '../../repositories/prisma/PrismaAddressesRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Address } from '../../domain/address'

let addressesRepository: IAddressesRepository
let usersRepository: IUsersRepository
let address: Address

describe('Get a address (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    addressesRepository = new PrismaAddressesRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)

    address = AddressFactory.create({ userId: user.id })
    await addressesRepository.create(address)
  })

  afterAll(async () => {
    await prismaClient.address.deleteMany({
      where: { id: address.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to get a address', async () => {
    const response = await request(app)
      .get(`/api/addresses/${address.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing address', async () => {
    const response = await request(app)
      .get(`/api/addresses/${address.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a address with no authentication', async () => {
    const response = await request(app)
      .get(`/api/addresses/${address.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a address with invalid addressId', async () => {
    const response = await request(app)
      .get(`/api/addresses/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
