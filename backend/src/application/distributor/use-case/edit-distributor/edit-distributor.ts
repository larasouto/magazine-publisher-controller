import { Either, left, right } from '@/core/logic/either'
import { Distributor } from '../../domain/distributor'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'
import { DistributorNotFoundError } from '../delete-distributor/errors/DistributorNotFoundError'

type EditDistributorRequest = {
  distributorId: string
  name: string
  address: string
  region: string
}

type EditDistributorResponse = Either<DistributorNotFoundError, Distributor>

export class EditDistributor {
  constructor(private distributorRepository: IDistributorRepository) {}

  async execute({
    distributorId,
    ...request
  }: EditDistributorRequest): Promise<EditDistributorResponse> {
    const distributorOrError = Distributor.create(request, distributorId)

    if (distributorOrError.isLeft()) {
      return left(distributorOrError.value)
    }

    const distributorExists =
      await this.distributorRepository.findById(distributorId)

    if (!distributorExists) {
      return left(new DistributorNotFoundError())
    }

    const distributor = distributorOrError.value
    await this.distributorRepository.update(distributor)

    return right(distributor)
  }
}
