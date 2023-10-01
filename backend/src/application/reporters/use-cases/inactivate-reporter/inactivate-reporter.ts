import { Either, left, right } from '@/core/logic/either'
import { Reporter } from '../../domain/reporter'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { ReporterNotFoundError } from './errors/ReporterNotFoundError'

type InactivateReporterRequest = {
  reporterId: string
}

type InactivateReporterResponse = Either<ReporterNotFoundError, null>

export class InactivateReporter {
  constructor(private reportersRepository: IReporterRepository) {}

  async execute({
    reporterId,
  }: InactivateReporterRequest): Promise<InactivateReporterResponse> {
    const reporter = await this.reportersRepository.findById(reporterId)

    if (!reporter) {
      return left(new ReporterNotFoundError())
    }

    await this.reportersRepository.inactivate(reporterId)

    return right(null)
  }
}
