import { Either, left, right } from '@/core/logic/either'
import { Subtitle } from '../../domain/subtitle'
import { ISubtitleRepository } from '../../repositories/interfaces/ISubtitleRepository'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type EditSubtitleRequest = {
  subtitleId: string
  name: string
  description?: string
  type: string
}

type EditSubtitleResponse = Either<SubtitleNotFoundError, Subtitle>

export class EditSubtitle {
  constructor(private subtitlesRepository: ISubtitleRepository) {}

  async execute({
    subtitleId,
    ...request
  }: EditSubtitleRequest): Promise<EditSubtitleResponse> {
    const subtitleOrError = Subtitle.create(request, subtitleId)

    if (subtitleOrError.isLeft()) {
      return left(subtitleOrError.value)
    }

    const subtitleExists = await this.subtitlesRepository.findById(subtitleId)

    if (!subtitleExists) {
      return left(new SubtitleNotFoundError())
    }

    const subtitle = subtitleOrError.value
    await this.subtitlesRepository.update(subtitle)

    return right(subtitle)
  }
}
