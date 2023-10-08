import { Either, left, right } from '@/core/logic/either'
import { Edition } from '../../domain/edition'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type EditEditionRequest = {
  editionId: string
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
}

type EditEditionResponse = Either<EditionNotFoundError, Edition>

export class EditEdition {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute({
    editionId,
    ...request
  }: EditEditionRequest): Promise<EditEditionResponse> {
    const editionOrError = Edition.create(request, editionId)

    if (editionOrError.isLeft()) {
      return left(editionOrError.value)
    }

    const editionExists = await this.editionsRepository.findById(editionId)

    if (!editionExists) {
      return left(new EditionNotFoundError())
    }

    const edition = editionOrError.value
    await this.editionsRepository.update(edition)

    return right(edition)
  }
}
