import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryAddressesRepository } from '../../repositories/in-memory/InMemoryAddressesRepository'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { EditAddress } from './edit-address'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

let addressesRepository: IAddressesRepository
let editAddress: EditAddress
let usersRepository: IUsersRepository

describe('Edit a address', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })

  beforeAll(async () => {
    addressesRepository = new InMemoryAddressesRepository()
    usersRepository = new InMemoryUsersRepository()
    editAddress = new EditAddress(addressesRepository, usersRepository)
    await usersRepository.create(user)
    await addressesRepository.create(address)
  })

  test('should be able to update a address', async () => {
    const updatedAddress = await editAddress.execute({
      addressId: address.id,
      street: 'test-updated-street',
      number: 123,
      complement: 'test-updated-complement',
      city: 'test-updated-city',
      state: 'test-updated-state',
      zip: '12345-678',
      userId: user.id,
    })

    expect(updatedAddress.isRight()).toBeTruthy()

    const sub = await addressesRepository.findById(address.id)
    expect(sub).toEqual(updatedAddress.value)
  })

  test('should not be able to update a address with invalid data', async () => {
    expect(await addressesRepository.findById(address.id)).toBeTruthy()

    const updatedAddress = await editAddress.execute({
      addressId: address.id,
      street: '',
      number: 123,
      complement: '',
      city: '',
      state: '',
      zip: '',
      userId: '',
    })

    expect(updatedAddress.isLeft()).toBeTruthy()
  })
})
