import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { AddressProps, AddressSchema } from './address.schema'

export class Address extends Entity<AddressProps> {
  private constructor(props: AddressProps, id?: string) {
    super(props, id)
  }

  static create(props: AddressProps, id?: string): Either<Error, Address> {
    const result = AddressSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Address(result.data, id))
  }
}
