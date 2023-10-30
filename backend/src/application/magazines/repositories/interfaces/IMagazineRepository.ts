import { Magazine } from '@/application/magazines/domain/magazine'

export interface IMagazineRepository {
  findById(id: string): Promise<Magazine | null>
  create(magazine: Magazine): Promise<void>
  update(magazine: Magazine): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Magazine[]>
  exists(id: string): Promise<boolean>
}
