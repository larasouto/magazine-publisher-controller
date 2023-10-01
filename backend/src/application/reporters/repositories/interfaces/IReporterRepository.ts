import { Reporter } from '../../domain/reporter'

export interface IReporterRepository {
  findById(id: string): Promise<Reporter>
  create(reporter: Reporter): Promise<void>
  update(reporter: Reporter): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Reporter[]>
}
