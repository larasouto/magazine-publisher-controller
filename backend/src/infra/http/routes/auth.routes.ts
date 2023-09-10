import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateUserController } from '../factories/controllers/user/CreateUserControllerFactory'
import { makeAuthenticateUserController } from '../factories/controllers/user/AuthenticateUserControllerFactory'

export const auth = Router()

auth.post('/sign-in', adaptRoute(makeAuthenticateUserController()))
auth.post('/sign-up', adaptRoute(makeCreateUserController()))
