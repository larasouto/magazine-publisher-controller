import { hash, compare } from 'bcryptjs'
import { Either, left, right } from '../logic/either'
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError'

export class Password {
  private constructor(
    private readonly password: string,
    private readonly hashed?: boolean,
  ) {}

  static validate(password: string): boolean {
    if (
      !password ||
      password.trim().length < 6 ||
      password.trim().length > 255
    ) {
      return false
    }

    return true
  }

  public async getHashedValue(): Promise<string> {
    if (!this.hashed) {
      return this.password
    }
    return await hash(this.password, 8)
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    if (this.hashed) {
      const hashedPassword = await this.getHashedValue()
      return await compare(plainTextPassword, hashedPassword)
    }
    return plainTextPassword === this.password
  }

  static create(
    password: string,
    hashed: boolean = false,
  ): Either<InvalidPasswordLengthError, Password> {
    if (!hashed && !this.validate(password)) {
      return left(new InvalidPasswordLengthError())
    }

    return right(new Password(password, hashed))
  }
}
