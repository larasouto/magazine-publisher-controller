import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeAuthenticateUserController } from '../factories/controllers/user/makeAuthenticateUserController'
import { makeCreateUserController } from '../factories/controllers/user/makeCreateUserController'
import { makeGetUserDetailsController } from '../factories/controllers/user/makeGetUserDetails'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeForgotPasswordController } from '../factories/controllers/user/makeForgotPasswordController'
import { makeResetPasswordController } from '../factories/controllers/user/makeResetPasswordController'

export const auth = Router()

auth.post('/sign-in', adaptRoute(makeAuthenticateUserController()))
auth.post('/sign-up', adaptRoute(makeCreateUserController()))
auth.get(
  '/me',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeGetUserDetailsController()),
)
auth.post('/forgot-password', adaptRoute(makeForgotPasswordController()))
auth.post('/reset-password', adaptRoute(makeResetPasswordController()))
