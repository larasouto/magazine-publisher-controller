import { MapperError } from '@/core/errors/MapperErrors'
import { Reporter as PersistenceReporter } from '@prisma/client'
import { Reporter } from '../domain/reporter'
import { ReporterStatus } from '../domain/reporter.schema'

export class ReporterMapper {
  static toDomain(raw: PersistenceReporter) {
    const reporterOrError = Reporter.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        cpf: raw.cpf,
        specialty: raw.specialty,
        status: raw.status as unknown as ReporterStatus,
        entryDate: raw.entry_date,
        departureDate: raw.departure_date,
      },
      raw.id,
    )

    if (reporterOrError.isLeft()) {
      throw new MapperError(reporterOrError.value.message)
    }

    if (reporterOrError.isRight()) {
      return reporterOrError.value
    }

    return null
  }

  static async toPersistence(reporter: Reporter) {
    return {
      id: reporter.id,
      name: reporter.props.name,
      email: reporter.props.email,
      phone: reporter.props.phone,
      cpf: reporter.props.cpf,
      specialty: reporter.props.specialty,
      status: reporter.props.status,
      entry_date: reporter.props.entryDate,
      departure_date: reporter.props.departureDate,
    }
  }
}
