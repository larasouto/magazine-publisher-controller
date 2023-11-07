import { Either, left, right } from '@/core/logic/either'
import { DistributorNotFoundError } from './errors/DistributorNotFoundError'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'

type DeleteDistributorRequest = {
  distributorId: string
}

type DeleteDistributorResponse = Either<DistributorNotFoundError, null>

export class DeleteDistributor {
  constructor(private graphicssRepository: IDistributorRepository) {}

  async execute({
    distributorId,
  }: DeleteDistributorRequest): Promise<DeleteDistributorResponse> {
    const graphicsExists =
      await this.graphicssRepository.findById(distributorId)

    if (!graphicsExists) {
      return left(new DistributorNotFoundError())
    }

    await this.graphicssRepository.delete(distributorId)

    return right(null)
  }
}
