import { Either, left, right } from '@/core/logic/either'
import { Reporter } from '../../domain/reporter'
import { ReporterStatus } from '../../domain/reporter.schema'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'
import { ReporterNotFoundError } from './errors/ReporterNotFoundError'

type EditReporterRequest = {
  reporterId: string
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

type EditReporterResponse = Either<ReporterNotFoundError, Reporter>

export class EditReporter {
  constructor(private reportersRepository: IReporterRepository) {}

  async execute({
    reporterId,
    ...request
  }: EditReporterRequest): Promise<EditReporterResponse> {
    const reporterOrError = Reporter.create(
      { ...request, status: request.status as unknown as ReporterStatus },
      reporterId,
    )

    if (reporterOrError.isLeft()) {
      return left(reporterOrError.value)
    }

    const reporterExists = await this.reportersRepository.findById(reporterId)

    if (!reporterExists) {
      return left(new ReporterNotFoundError())
    }

    const reporter = reporterOrError.value
    await this.reportersRepository.update(reporter)

    return right(reporter)
  }
}
