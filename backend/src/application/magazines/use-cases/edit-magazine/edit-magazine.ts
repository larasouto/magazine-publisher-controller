import { Either, left, right } from '@/core/logic/either'
import { Magazine } from '../../domain/magazine'
import { PublicationPeriod } from '../../domain/magazine.schema'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type EditMagazineRequest = {
  magazineId: string
  name: string
  description?: string
  yearFounded: number
  publicationPeriod: string
  themeId: string
}

type EditMagazineResponse = Either<MagazineNotFoundError, Magazine>

export class EditMagazine {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute({
    magazineId,
    ...request
  }: EditMagazineRequest): Promise<EditMagazineResponse> {
    const magazineOrError = Magazine.create(
      {
        ...request,
        publicationPeriod:
          request.publicationPeriod as unknown as PublicationPeriod,
      },
      magazineId,
    )

    if (magazineOrError.isLeft()) {
      return left(magazineOrError.value)
    }

    const magazineExists = await this.magazinesRepository.findById(magazineId)

    if (!magazineExists) {
      return left(new MagazineNotFoundError())
    }

    const magazine = magazineOrError.value
    await this.magazinesRepository.update(magazine)

    return right(magazine)
  }
}
