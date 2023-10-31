import { beforeEach, describe, expect, test } from 'vitest'

import { AddressFactory } from '@/tests/factories/AddressFactory'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { DeleteAddress } from '@/application/addresses/use-cases/delete-address/delete-address'
import { InMemoryAddressesRepository } from '@/application/addresses/repositories/in-memory/InMemoryAddressesRepository'

let addressesRepository: IAddressesRepository
let deleteAddress: DeleteAddress

describe('Delete address', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    deleteAddress = new DeleteAddress(addressesRepository)
  })

  test('should delete a address', async () => {
    const address1 = AddressFactory.create()
    const address2 = AddressFactory.create()

    await addressesRepository.create(address1)
    await addressesRepository.create(address2)

    const response = await deleteAddress.execute({
      ids: [address1.id, address2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await addressesRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing address', async () => {
    const address1 = AddressFactory.create()
    await addressesRepository.create(address1)

    const response = await deleteAddress.execute({
      ids: [address1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await addressesRepository.list()).toStrictEqual([address1])
  })
})
