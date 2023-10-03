import { Edition } from '../../domain/edition'

export interface IEditionRepository {
  findById(id: string): Promise<Edition | null>
  list(): Promise<Edition[]>
  create(edition: Edition): Promise<void>
  update(edition: Edition): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
