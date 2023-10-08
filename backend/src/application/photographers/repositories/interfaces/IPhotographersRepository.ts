import { Photographer } from '../../domain/photographer'

export interface IPhotographerRepository {
  findById(id: string): Promise<Photographer | null>
  create(photographer: Photographer): Promise<void>
  update(photographer: Photographer): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Photographer[]>
  inactivate(id: string): Promise<void>
}
