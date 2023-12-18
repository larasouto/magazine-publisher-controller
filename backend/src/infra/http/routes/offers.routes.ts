import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateOffersController } from '../factories/controllers/offers/makeCreateOffersController'

export const offers = Router()

offers.use(adaptMiddleware(makeEnsureAuthenticated()))

offers.post('/new', adaptRoute(makeCreateOffersController()))