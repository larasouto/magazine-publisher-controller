import { Either, left, right } from '@/core/logic/either'
import { Reporter } from '../../domain/reporter'
import { ReporterStatus } from '../../domain/reporter.schema'
import { IReporterRepository } from '../../repositories/interfaces/IReporterRepository'

type CreateReporterRequest = {
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

type CreateReporterResponse = Either<Error, Reporter>

export class CreateReporter {
  constructor(private reportersRepository: IReporterRepository) {}

  async execute(
    request: CreateReporterRequest,
  ): Promise<CreateReporterResponse> {
    const reporterOrError = Reporter.create({
      ...request,
      status: request.status as unknown as ReporterStatus,
    })

    if (reporterOrError.isLeft()) {
      return left(reporterOrError.value)
    }

    const user = reporterOrError.value
    await this.reportersRepository.create(user)

    return right(user)
  }
}
