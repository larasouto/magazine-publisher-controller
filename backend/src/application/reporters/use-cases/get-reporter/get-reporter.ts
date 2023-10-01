import { Either, left, right } from '@/core/logic/either'
import { Reporter } from '../../domain/reporter'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { ReporterNotFoundError } from './errors/ReporterNotFoundError'

type GetReporterRequest = {
  reporterId: string
}

type GetReporterResponse = Either<ReporterNotFoundError, Reporter>

export class GetReporter {
  constructor(private reportersRepository: IReporterRepository) {}

  async execute({
    reporterId,
  }: GetReporterRequest): Promise<GetReporterResponse> {
    const reporter = await this.reportersRepository.findById(reporterId)

    if (!reporter) {
      return left(new ReporterNotFoundError())
    }

    return right(reporter)
  }
}
