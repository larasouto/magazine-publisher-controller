import { Middleware } from '@/core/infra/middleware'
import { EnsureAuthenticatedMiddleware } from '@/infra/http/middlewares/ensure-authenticated'

export function makeEnsureAuthenticated(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()
  return ensureAuthenticatedMiddleware
}
