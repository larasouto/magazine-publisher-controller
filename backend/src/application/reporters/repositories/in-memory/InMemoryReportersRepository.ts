import { Reporter } from '../../domain/reporter'
import { IReporterRepository } from '../interfaces/IReporterRepository'

export class InMemoryReportersRepository implements IReporterRepository {
  constructor(public reporters: Reporter[] = []) {}

  async findById(id: string): Promise<Reporter> {
    const reporter = this.reporters.find((reporter) => reporter.id === id)

    if (!reporter) {
      return null
    }

    return reporter
  }

  async create(reporter: Reporter): Promise<void> {
    this.reporters.push(reporter)
  }

  async delete(id: string): Promise<void> {
    const reporterIndex = this.reporters.findIndex(
      (reporter) => reporter.id === id,
    )

    this.reporters.splice(reporterIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const reporterIndex = this.reporters.findIndex(
        (reporter) => reporter.id === id,
      )

      this.reporters.splice(reporterIndex, 1)
    })
  }

  async update(reporter: Reporter): Promise<void> {
    const reporterIndex = this.reporters.findIndex(
      (reporter) => reporter.id === reporter.id,
    )

    this.reporters[reporterIndex] = reporter
  }

  async list(): Promise<Reporter[]> {
    return this.reporters
  }
}
