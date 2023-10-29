import { beforeEach, describe, expect, test } from 'vitest'
import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { CreateAddress } from './create-address'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { InMemoryAddressesRepository } from '../../repositories/in-memory/InMemoryAddressesRepository'

let addressesRepository: IAddressesRepository
let createAddress: CreateAddress
let usersRepository: IUsersRepository

describe('Create a address', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    usersRepository = new InMemoryUsersRepository()
    createAddress = new CreateAddress(addressesRepository, usersRepository)
  })

  test('should be able to create a address', async () => {
    const user = UserFactory.create()

    await usersRepository.create(user)

    const data: any = {
      street: 'test-street',
      number: 123,
      complement: 'test-complement',
      city: 'test-city',
      state: 'test-state',
      zip: '12345-678',
      userId: user.id,
    }

    const response = await createAddress.execute(data)
    const address = response.value as Address

    expect(address).toBeTruthy()
    expect(await addressesRepository.findById(address.id)).toBeTruthy()
  })

  test('should not be able to create a address with empty data', async () => {
    const data: any = {}

    const response = await createAddress.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
