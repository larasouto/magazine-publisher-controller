import { Either, left, right } from '@/core/logic/either'
import { Photographer } from '../../domain/photographer'
import { PhotographerStatus } from '../../domain/photographer.schema'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'
import { PhotographerNotFoundError } from './errors/PhotographerNotFoundError'

type EditPhotographerRequest = {
  photographerId: string
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

type EditPhotographerResponse = Either<PhotographerNotFoundError, Photographer>

export class EditPhotographer {
  constructor(private photographersRepository: IPhotographerRepository) {}

  async execute({
    photographerId,
    ...request
  }: EditPhotographerRequest): Promise<EditPhotographerResponse> {
    const photographerOrError = Photographer.create(
      { ...request, status: request.status as unknown as PhotographerStatus },
      photographerId,
    )

    if (photographerOrError.isLeft()) {
      return left(photographerOrError.value)
    }

    const photographerExists =
      await this.photographersRepository.findById(photographerId)

    if (!photographerExists) {
      return left(new PhotographerNotFoundError())
    }

    const photographer = photographerOrError.value
    await this.photographersRepository.update(photographer)

    return right(photographer)
  }
}
