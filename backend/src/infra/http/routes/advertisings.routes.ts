import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateAdvertisingsController } from '../factories/controllers/advertisings/makeCreateAdvertisingsController'

export const advertisings = Router()

advertisings.use(adaptMiddleware(makeEnsureAuthenticated()))

advertisings.post('/new', adaptRoute(makeCreateAdvertisingsController()))
