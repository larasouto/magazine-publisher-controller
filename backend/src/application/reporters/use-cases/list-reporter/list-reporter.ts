import { Reporter } from '../../domain/reporter'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'

type ListReportersResponse = Reporter[]

export class ListReporters {
  constructor(private reportersRepository: IReporterRepository) {}

  async execute(): Promise<ListReportersResponse> {
    const reporters = await this.reportersRepository.list()
    return reporters
  }
}
