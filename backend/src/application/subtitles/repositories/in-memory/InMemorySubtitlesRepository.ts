import { Subtitle } from '../../domain/subtitle'
import { ISubtitleRepository } from '../interfaces/ISubtitleRepository'

export class InMemorySubtitlesRepository implements ISubtitleRepository {
  constructor(public subtitles: Subtitle[] = []) {}

  async findById(id: string): Promise<Subtitle | null> {
    const subtitle = this.subtitles.find((subtitle) => subtitle.id === id)

    if (!subtitle) {
      return null
    }

    return subtitle
  }

  async create(subtitle: Subtitle): Promise<void> {
    this.subtitles.push(subtitle)
  }

  async delete(id: string): Promise<void> {
    const subtitleIndex = this.subtitles.findIndex(
      (subtitle) => subtitle.id === id,
    )

    this.subtitles.splice(subtitleIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const subtitleIndex = this.subtitles.findIndex(
        (subtitle) => subtitle.id === id,
      )

      this.subtitles.splice(subtitleIndex, 1)
    })
  }

  async update(subtitle: Subtitle): Promise<void> {
    const subtitleIndex = this.subtitles.findIndex(
      (subtitle) => subtitle.id === subtitle.id,
    )

    this.subtitles[subtitleIndex] = subtitle
  }

  async list(): Promise<Subtitle[]> {
    return this.subtitles
  }
}
