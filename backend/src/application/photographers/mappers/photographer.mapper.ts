import { Photographer as PersistencePhotographer } from '@prisma/client'
import { t } from 'i18next'
import { Photographer } from '../domain/photographer'
import { PhotographerStatus } from '../domain/photographer.schema'

export class PhotographerMapper {
  static toDomain(raw: PersistencePhotographer) {
    const photographer: Pick<Photographer, 'props'> = {
      props: {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        phone: raw.phone,
        specialty: raw.specialty,
        status: raw.status as PhotographerStatus,
        entryDate: raw.entry_date,
        departureDate: raw.departure_date,
      },
    }

    const photographerOrError = Photographer.create(photographer.props, raw.id)

    if (photographerOrError.isLeft()) {
      throw new Error(t('errors.invalid_Photographer'))
    }

    return photographerOrError.value
  }

  static async toPersistence(photographer: Photographer) {
    return {
      id: photographer.id,
      name: photographer.props.name,
      phone: photographer.props.phone,
      email: photographer.props.email,
      cpf: photographer.props.cpf,
      specialty: photographer.props.specialty,
      status: photographer.props.status as PhotographerStatus,
      entry_date: photographer.props.entryDate,
      departure_date: photographer.props.departureDate,
    }
  }
}
