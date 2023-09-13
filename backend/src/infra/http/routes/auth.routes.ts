import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeAuthenticateUserController } from '../factories/controllers/user/makeAuthenticateUserController'
import { makeCreateUserController } from '../factories/controllers/user/makeCreateUserController'

export const auth = Router()

auth.post('/sign-in', adaptRoute(makeAuthenticateUserController()))
auth.post('/sign-up', adaptRoute(makeCreateUserController()))
