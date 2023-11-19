import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { InMemoryDistributorsRepository } from '../../repositories/in-memory/InMemoryDistributorRepository'
import { DeleteDistributor } from './delete-distributor'

let DistributorRepository: IDistributorRepository
let deleteDistributor: DeleteDistributor

describe('Delete a distributor', () => {
  beforeEach(() => {
    DistributorRepository = new InMemoryDistributorsRepository()
    deleteDistributor = new DeleteDistributor(DistributorRepository)
  })

  test('should be able to delete a distributor', async () => {
    const data: any = {
      id: uuid(),
      name: 'distributor-name-delete',
      address: 'distributor-address-delete',
      region: 'distributor-region-delete',
    }

    await DistributorRepository.create(data)
    expect(await DistributorRepository.findById(data.id)).toBeTruthy()

    const deletedDistributor = await deleteDistributor.execute({
      distributorId: data.id,
    })

    expect(deletedDistributor.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing distributor', async () => {
    const nonExistingDistributorId = 'non-existing-id'

    const nonExistingDistributor = await deleteDistributor.execute({
      distributorId: nonExistingDistributorId,
    })

    expect(nonExistingDistributor).toBeTruthy()
  })
})
