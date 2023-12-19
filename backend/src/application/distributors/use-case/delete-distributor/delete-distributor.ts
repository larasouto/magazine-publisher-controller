import { Either, left, right } from '@/core/logic/either'
import { DistributorNotFoundError } from './errors/DistributorNotFoundError'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { OneOrMoreDistributorNotFoundError } from './errors/OneOrMoreDistributorNotFoundError'

type DeleteDistributorRequest = {
  ids: string[]
}

type DeleteDistributorResponse = Either<DistributorNotFoundError, null>

export class DeleteDistributor {
  constructor(private distributorsRepository: IDistributorRepository) {}

  async execute({
    ids: distributorId,
  }: DeleteDistributorRequest): Promise<DeleteDistributorResponse> {
    const distributorOrDistributors = Array.isArray(distributorId)
      ? distributorId
      : [distributorId]

    const distributorPromises = distributorOrDistributors
      .filter((distributorId) => distributorId)
      .map((distributorId) =>
        this.distributorsRepository.findById(distributorId),
      )

    const distributors = await Promise.all(distributorPromises)

    if (distributors.some((distributor) => distributor === null)) {
      return left(
        distributors.length > 1
          ? new OneOrMoreDistributorNotFoundError()
          : new DistributorNotFoundError(),
      )
    }

    await this.distributorsRepository.deleteMany(distributorOrDistributors)

    return right(null)
  }
}
