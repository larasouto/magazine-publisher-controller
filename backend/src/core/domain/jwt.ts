import { Either, left, right } from '@/core/logic/either'
import { sign, verify } from 'jsonwebtoken'
import { User } from '../../application/users/domain/user'
import { auth } from '@/config/auth'
import { InvalidJWTTokenError } from './errors/InvalidJWTTokenError'

interface JWTData {
  userId: string
  token: string
}

export interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string
  public readonly token: string

  private constructor({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  static decodeToken(
    token: string,
  ): Either<InvalidJWTTokenError, JWTTokenPayload> {
    try {
      const decoded = verify(token, auth.JWT_SECRET_KEY) as JWTTokenPayload

      return right(decoded)
    } catch (err) {
      return left(new InvalidJWTTokenError())
    }
  }

  static createFromJWT(token: string): Either<InvalidJWTTokenError, JWT> {
    const jwtPayloadOrError = this.decodeToken(token)

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value)
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.value.sub })

    return right(jwt)
  }

  static signUser(user: User): JWT {
    const token = sign({}, auth.JWT_SECRET_KEY, {
      subject: user.id,
      expiresIn: auth.JWT_EXPIRES_IN,
    })

    const jwt = new JWT({ userId: user.id, token })

    return jwt
  }
}
