import { Either, left, right } from '@/core/logic/either'
import { Edition } from '../../domain/edition'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type GetEditionRequest = {
  editionId: string
}

type GetEditionResponse = Either<EditionNotFoundError, Edition>

export class GetEdition {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute({ editionId }: GetEditionRequest): Promise<GetEditionResponse> {
    const edition = await this.editionsRepository.findById(editionId)

    if (!edition) {
      return left(new EditionNotFoundError())
    }

    return right(edition)
  }
}
