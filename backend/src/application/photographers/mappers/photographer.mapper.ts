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

  static async toPersistence(Photographer: Photographer) {
    return {
      id: Photographer.id,
      name: Photographer.props.name,
      email: Photographer.props.email,
      cpf: Photographer.props.cpf,
      specialty: Photographer.props.specialty,
      status: Photographer.props.status,
      entry_date: Photographer.props.entryDate,
    }
  }
}
