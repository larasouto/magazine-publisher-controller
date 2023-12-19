import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { InMemoryDistributorsRepository } from '../../repositories/in-memory/InMemoryDistributorRepository'
import { EditDistributor } from './edit-distributor'

let distributorRepository: IDistributorRepository
let editDistributor: EditDistributor

describe('Create a distributor', () => {
  beforeEach(() => {
    distributorRepository = new InMemoryDistributorsRepository()
    editDistributor = new EditDistributor(distributorRepository)
  })

  test('should be able to update a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'ditributor-region',
    }

    await distributorRepository.create(data)
    expect(await distributorRepository.findById(data.id)).toBeTruthy()

    const updatedDistributor = await editDistributor.execute({
      distributorId: data.id,
      name: 'distributor-name-updated',
      address: 'distributor-address-updated',
      region: 'ditributor-region-updated',
    })
    expect(updatedDistributor.isRight()).toBeTruthy()

    const distributor = await distributorRepository.findById(data.id)
    expect(distributor).toEqual(updatedDistributor.value)
  })

  test('should be able to update only the name in a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'ditributor-region',
    }

    await distributorRepository.create(data)
    expect(await distributorRepository.findById(data.id)).toBeTruthy()

    const updatedDistributor = await editDistributor.execute({
      distributorId: data.id,
      name: 'distributor-name-updated',
      address: 'distributor-address',
      region: 'ditributor-region',
    })
    expect(updatedDistributor.isRight()).toBeTruthy()

    const distributor = await distributorRepository.findById(data.id)
    expect(distributor).toEqual(updatedDistributor.value)
  })

  test('should be able to update only the address in a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'ditributor-region',
    }

    await distributorRepository.create(data)
    expect(await distributorRepository.findById(data.id)).toBeTruthy()

    const updatedDistributor = await editDistributor.execute({
      distributorId: data.id,
      name: 'test-distributor',
      address: 'test-distributor-address-updated',
      region: 'ditributor-region',
    })
    expect(updatedDistributor.isRight()).toBeTruthy()

    const distributor = await distributorRepository.findById(data.id)
    expect(distributor).toEqual(updatedDistributor.value)
  })

  test('should be able to update only the region in a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'ditributor-region',
    }

    await distributorRepository.create(data)
    expect(await distributorRepository.findById(data.id)).toBeTruthy()

    const updatedDistributor = await editDistributor.execute({
      distributorId: data.id,
      name: 'test-distributor',
      address: 'test-distributor',
      region: 'ditributor-region-updated',
    })
    expect(updatedDistributor.isRight()).toBeTruthy()

    const distributor = await distributorRepository.findById(data.id)
    expect(distributor).toEqual(updatedDistributor.value)
  })
})
