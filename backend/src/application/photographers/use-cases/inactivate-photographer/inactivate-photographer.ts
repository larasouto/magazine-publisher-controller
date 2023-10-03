import { Either, left, right } from '@/core/logic/either'
import { PhotographerNotFoundError } from './errors/PhotographerNotFoundError'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'

type InactivatePhotographerRequest = {
  photographerId: string
}

type InactivatePhotographerResponse = Either<PhotographerNotFoundError, null>

export class InactivatePhotographer {
  constructor(private photographersRepository: IPhotographerRepository) {}

  async execute({
    photographerId,
  }: InactivatePhotographerRequest): Promise<InactivatePhotographerResponse> {
    const reporter = await this.photographersRepository.findById(photographerId)

    if (!reporter) {
      return left(new PhotographerNotFoundError())
    }

    await this.photographersRepository.inactivate(photographerId)

    return right(null)
  }
}
