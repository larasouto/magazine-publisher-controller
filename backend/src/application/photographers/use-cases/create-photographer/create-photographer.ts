import { Either, left, right } from '@/core/logic/either'
import { Photographer } from '../../domain/photographer'
import { PhotographerStatus } from '../../domain/photographer.schema'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'

type CreatePhotographerRequest = {
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

type CreatePhotographerResponse = Either<Error, Photographer>

export class CreatePhotographer {
  constructor(private photographersRepository: IPhotographerRepository) {}

  async execute(
    request: CreatePhotographerRequest,
  ): Promise<CreatePhotographerResponse> {
    const photographerOrError = Photographer.create({
      ...request,
      status: request.status as unknown as PhotographerStatus,
    })

    if (photographerOrError.isLeft()) {
      return left(photographerOrError.value)
    }

    const user = photographerOrError.value
    await this.photographersRepository.create(user)

    return right(user)
  }
}
