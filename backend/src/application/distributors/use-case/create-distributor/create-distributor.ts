import { Either, left, right } from '@/core/logic/either'
import { Distributor } from '../../domain/distributor'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'

type CreateDistributorRequest = {
  name: string
  street: string
  number: number
  city: string
  state: string
  zip: string
  complement?: string
  region: number
}

type CreateDistributorResponse = Either<Error, Distributor>

export class CreateDistributor {
  constructor(private distributorsRepository: IDistributorRepository) {}

  async execute(
    request: CreateDistributorRequest,
  ): Promise<CreateDistributorResponse> {
    const distributorOrError = Distributor.create(request)

    if (distributorOrError.isLeft()) {
      return left(distributorOrError.value)
    }

    const user = distributorOrError.value
    await this.distributorsRepository.create(user)

    return right(user)
  }
}
