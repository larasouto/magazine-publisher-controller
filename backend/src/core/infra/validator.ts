import { Either } from '../logic/either'

export interface Validator<T = any> {
  validate(data: T): Either<Error, null>
}
