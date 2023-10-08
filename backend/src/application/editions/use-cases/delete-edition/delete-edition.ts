import { Either, left, right } from '@/core/logic/either'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type DeleteEditionRequest = {
  editionId: string
}

type DeleteEditionResponse = Either<EditionNotFoundError, null>

export class DeleteEdition {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute({
    editionId,
  }: DeleteEditionRequest): Promise<DeleteEditionResponse> {
    const editionExists = await this.editionsRepository.findById(editionId)

    if (!editionExists) {
      return left(new EditionNotFoundError())
    }

    await this.editionsRepository.delete(editionId)

    return right(null)
  }
}
