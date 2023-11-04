import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaAddressesRepository } from '../../repositories/prisma/PrismaAddressesRepository'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { v4 as uuid } from 'uuid'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { EditAddress } from './edit-address'
import { AddressFactory } from '@/tests/factories/AddressFactory'

let addressesRepository: IAddressesRepository
let editAddress: EditAddress
let usersRepository: IUsersRepository

describe('Edit address (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const address = AddressFactory.create({ userId: user.id })

  beforeAll(async () => {
    addressesRepository = new PrismaAddressesRepository()
    usersRepository = new PrismaUsersRepository()
    editAddress = new EditAddress(addressesRepository, usersRepository)
    await usersRepository.create(user)
    await addressesRepository.create(address)
  })

  afterAll(async () => {
    await prismaClient.address.deleteMany({
      where: { street: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to update a address', async () => {
    const updatedAddress: any = {
      addressId: address.id,
      street: 'test-updated-street',
      number: 123,
      complement: 'test-updated-complement',
      city: 'test-updated-city',
      state: 'test-updated-state',
      zip: '12345-678',
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/addresses/${address.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedAddress)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a address with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .put(`/api/addresses/${address.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a address with invalid id', async () => {
    const updatedAddress: any = {
      addressId: address.id,
      number: '0987654321098765',
      holder: 'test-updated-holder',
      expirationDate: '01/2025',
      securityCode: 321,
      billingAddress: 'test-updated-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-updated-flag',
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/addresses/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedAddress)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
