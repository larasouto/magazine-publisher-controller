import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { InMemoryDistributorsRepository } from '../../repositories/in-memory/InMemoryDistributorRepository'
import { GetDistributor } from './get-distributor'

let distributorsRepository: IDistributorRepository
let getDistributorGetDistributor: GetDistributor

describe('Get a distributor', () => {
  beforeEach(() => {
    distributorsRepository = new InMemoryDistributorsRepository()
    getDistributorGetDistributor = new GetDistributor(distributorsRepository)
  })

  test('should be able to get a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name',
      address: 'distributor-address',
      region: 'distributor-regio',
    }

    await distributorsRepository.create(data)
    const distributor = await getDistributorGetDistributor.execute({
      distributorId: data.id,
    })

    expect(distributor.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing distributor', async () => {
    const distributor = await getDistributorGetDistributor.execute({
      distributorId: 'random-id',
    })

    expect(distributor.isLeft()).toBeTruthy()
  })
})
