import { Either, left, right } from '@/core/logic/either'
import { Distributor } from '../../domain/distributor'
import { DistributorNotFoundError } from './errors/DistributorNotFoundError'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'

type GetDistributorRequest = {
  distributorId: string
}

type GetDistributorResponse = Either<DistributorNotFoundError, Distributor>

export class GetDistributor {
  constructor(private distributorRepository: IDistributorRepository) {}

  async execute({
    distributorId,
  }: GetDistributorRequest): Promise<GetDistributorResponse> {
    const distributor = await this.distributorRepository.findById(distributorId)

    if (!distributor) {
      return left(new DistributorNotFoundError())
    }

    return right(distributor)
  }
}
