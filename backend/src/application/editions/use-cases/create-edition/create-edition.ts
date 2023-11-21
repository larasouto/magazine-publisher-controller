import { Either, left, right } from '@/core/logic/either'
import { Edition } from '../../domain/edition'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'

type CreateEditionRequest = {
  number: number
  title: string
  coverPath: string
  description?: string
  price: number
  year: number
  publicationDate: Date
  numberOfCopies: number
  numberOfPages: number
  magazineId: string
  isTopSeller: boolean
}

type CreateEditionResponse = Either<Error, Edition>

export class CreateEdition {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute(request: CreateEditionRequest): Promise<CreateEditionResponse> {
    const editionOrError = Edition.create(request)

    if (editionOrError.isLeft()) {
      return left(editionOrError.value)
    }

    const user = editionOrError.value
    await this.editionsRepository.create(user)

    return right(user)
  }
}
