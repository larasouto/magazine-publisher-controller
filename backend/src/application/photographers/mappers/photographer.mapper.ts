import { Photographer as PersistencePhotographer } from '@prisma/client'
import { t } from 'i18next'
import { Photographer } from '../domain/photographer'
import { PhotographerStatus } from '../domain/photographer.schema'

export class PhotographerMapper {
  static toDomain(raw: PersistencePhotographer) {
    const PhotographerOrError = Photographer.create(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        specialty: raw.specialty,
        status: raw.status as unknown as PhotographerStatus,
        entryDate: raw.entry_date,
        departureDate: raw.departure_date,
      },
      raw.id,
    )

    if (PhotographerOrError.isLeft()) {
      throw new Error(t('errors.invalid_Photographer'))
    }

    if (PhotographerOrError.isRight()) {
      return PhotographerOrError.value
    }
    return null
  }

  static async toPersistence(photographer: Photographer) {
    return {
      id: photographer.id,
      name: photographer.props.name,
      email: photographer.props.email,
      cpf: photographer.props.cpf,
      specialty: photographer.props.specialty,
      status: photographer.props.status,
      entry_date: photographer.props.entryDate,
      departure_date: photographer.props.departureDate,
    }
  }
}
