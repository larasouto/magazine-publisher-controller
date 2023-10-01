import { Subtitle } from '../../domain/subtitle'

export interface ISubtitleRepository {
  findById(id: string): Promise<Subtitle | null>
  create(subtitle: Subtitle): Promise<void>
  update(subtitle: Subtitle): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Subtitle[]>
}
