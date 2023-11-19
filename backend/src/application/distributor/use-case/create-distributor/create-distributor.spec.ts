import { Distributor } from '@prisma/client'
import { beforeEach, describe, expect, test } from 'vitest'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { InMemoryDistributorsRepository } from '../../repositories/in-memory/InMemoryDistributorRepository'
import { CreateDistributor } from './create-dsitributor'

let distributorRepository: IDistributorRepository
let createDistributor: CreateDistributor

describe('Create a distributor', () => {
  beforeEach(() => {
    distributorRepository = new InMemoryDistributorsRepository()
    createDistributor = new CreateDistributor(distributorRepository)
  })

  test('should be able to create a distributor', async () => {
    const data: any = {
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'region test',
    }

    const response = await createDistributor.execute(data)
    const distributor = response.value as unknown as Distributor

    expect(distributor).toBeTruthy()
    expect(await distributorRepository.findById(distributor.id)).toBeTruthy()
  })

  test('should not be able to create a distributor with empty data', async () => {
    const data: any = {}

    const response = await createDistributor.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a distributor without name', async () => {
    const data: any = {
      address: 'distributor-address',
      region: 'region test',
    }

    const response = await createDistributor.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a distributor without region', async () => {
    const data: any = {
      name: 'distributor-name',
      address: 'distributor-address',
    }

    const response = await createDistributor.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
