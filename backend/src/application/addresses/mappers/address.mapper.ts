import { MapperError } from '@/core/errors/MapperErrors'
import { Address as PersistenceAddress } from '@prisma/client'
import { Address } from '../domain/address'

export class AddressMapper {
  static toDomain(raw: PersistenceAddress) {
    const addressOrError = Address.create(
      {
        street: raw.street,
        number: raw.number,
        city: raw.city,
        state: raw.state,
        zip: raw.zip,
        complement: raw.complement,
        userId: raw.user_id,
      },
      raw.id,
    )

    if (addressOrError.isLeft()) {
      throw new MapperError(addressOrError.value.message)
    }

    return addressOrError.value
  }

  static async toPersistence(address: Address) {
    return {
      id: address.id,
      number: address.props.number,
      street: address.props.street,
      city: address.props.city,
      state: address.props.state,
      zip: address.props.zip,
      complement: address.props.complement,
      user_id: address.props.userId,
    }
  }
}
