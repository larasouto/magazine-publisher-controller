import { Either, left, right } from '@/core/logic/either'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { OneOrMoreEditionNotFoundError } from './errors/OneOrMoreEditonNotFoundError'

type DeleteEditionRequest = {
  ids: string[]
}

type DeleteEditionResponse = Either<EditionNotFoundError, null>

export class DeleteEdition {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute({
    ids: editionId,
  }: DeleteEditionRequest): Promise<DeleteEditionResponse> {
    const editionOrEditions = Array.isArray(editionId) ? editionId : [editionId]

    const editionPromises = editionOrEditions
      .filter((editionId) => editionId)
      .map((editionId) => this.editionsRepository.findById(editionId))

    const editions = await Promise.all(editionPromises)

    if (editions.some((edition) => edition === null)) {
      return left(
        editions.length > 1
          ? new OneOrMoreEditionNotFoundError()
          : new EditionNotFoundError(),
      )
    }

    await this.editionsRepository.deleteMany(editionOrEditions)

    return right(null)
  }
}
