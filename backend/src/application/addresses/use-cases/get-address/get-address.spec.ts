import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { GetAddress } from './get-address'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { AddressFactory } from '@/tests/factories/AddressFactory'

let addressesRepository: IAddressesRepository
let getAddress: GetAddress
let usersRepository: IUsersRepository

describe('Get a address', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })

  beforeAll(async () => {
    addressesRepository = new InMemoryAddressesRepository()
    usersRepository = new InMemoryUsersRepository()
    getAddress = new GetAddress(addressesRepository, usersRepository)
    await usersRepository.create(user)
    await addressesRepository.create(address)
  })

  test('should be able to get a address', async () => {
    const _address = await getAddress.execute({
      addressId: address.id,
      userId: user.id,
    })

    expect(_address.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing address', async () => {
    const address = await getAddress.execute({
      addressId: 'random-id',
      userId: user.id,
    })

    expect(address.isLeft()).toBeTruthy()
  })

  test('should not be able to get a address with non existing user', async () => {
    const _address = await getAddress.execute({
      addressId: address.id,
      userId: 'random-id',
    })

    expect(_address.isLeft()).toBeTruthy()
  })
})
