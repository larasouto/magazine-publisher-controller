import { Either, left, right } from '@/core/logic/either'
import { Photographer } from '../../domain/photographer'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { PhotographerNotFoundError } from '../edit-photographer/errors/PhotographerNotFoundError'

type GetPhotographerRequest = {
  photographerId: string
}

type GetPhotographerResponse = Either<PhotographerNotFoundError, Photographer>

export class GetPhotographer {
  constructor(private photographersRepository: IPhotographerRepository) {}

  async execute({
    photographerId,
  }: GetPhotographerRequest): Promise<GetPhotographerResponse> {
    const photographer =
      await this.photographersRepository.findById(photographerId)

    if (!photographer) {
      return left(new PhotographerNotFoundError())
    }

    return right(photographer)
  }
}
