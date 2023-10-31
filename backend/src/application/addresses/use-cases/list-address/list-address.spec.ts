import { beforeEach, describe, expect, test } from 'vitest'
import { Address } from '../../domain/address'
import { InMemoryAddressesRepository } from '../../repositories/in-memory/InMemoryAddressesRepository'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { CreateAddress } from '../create-address/create-address'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { AddressFactory } from '@/tests/factories/AddressFactory'
import { ListAddresses } from './list-address'
import { afterEach } from 'node:test'

let listAddresses: ListAddresses
let createAddress: CreateAddress
let addressesRepository: IAddressesRepository
let usersRepository: IUsersRepository

describe('List addresses', () => {
  const user = UserFactory.create()
  const address = AddressFactory.create({ userId: user.id })

  beforeEach(async () => {
    addressesRepository = new InMemoryAddressesRepository()
    usersRepository = new InMemoryUsersRepository()
    await usersRepository.create(user)
    await addressesRepository.create(address)
    listAddresses = new ListAddresses(addressesRepository)
  })

  test('should list all addresses', async () => {
    const response = await listAddresses.execute()
    expect(response.length).toBe(1)

    expect(response[0].props.street).toBe(address.props.street)
  })

  test('should return an empty list if no addresses exist', async () => {
    await addressesRepository.deleteMany([address.id])
    const response = await listAddresses.execute()
    expect(response.length).toBe(0)
  })
})
