import { AccessDeniedError } from '@/core/domain/errors/AccessDeniedError'
import {
  HttpResponse,
  fail,
  forbidden,
  ok,
  unauthorized,
} from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'
import { decode } from 'jsonwebtoken'

type EnsureAuthenticationMiddlewareRequest = {
  jwt: string
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticationMiddlewareRequest,
  ): Promise<HttpResponse> {
    try {
      const { jwt } = request

      if (!jwt) {
        return unauthorized(new AccessDeniedError())
      }

      if (jwt) {
        const [_, token] = jwt.split(' ')

        try {
          const decoded = decode(token) as DecodedJwt
          return ok({ userId: decoded.sub })
        } catch (err) {
          return forbidden(new AccessDeniedError())
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error: any) {
      return fail(error)
    }
  }
}
