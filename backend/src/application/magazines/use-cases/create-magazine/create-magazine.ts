import { Either, left, right } from '@/core/logic/either'
import { Magazine } from '../../domain/magazine'
import { PublicationPeriod } from '../../domain/magazine.schema'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'

type CreateMagazineRequest = {
  name: string
  description?: string
  yearFounded: number
  publicationPeriod: string
  themeId: string
}

type CreateMagazineResponse = Either<Error, Magazine>

export class CreateMagazine {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute(
    request: CreateMagazineRequest,
  ): Promise<CreateMagazineResponse> {
    const magazineOrError = Magazine.create({
      ...request,
      publicationPeriod: request.publicationPeriod as unknown as PublicationPeriod,
    })

    if (magazineOrError.isLeft()) {
      return left(magazineOrError.value)
    }

    const user = magazineOrError.value
    await this.magazinesRepository.create(user)

    return right(user)
  }
}
