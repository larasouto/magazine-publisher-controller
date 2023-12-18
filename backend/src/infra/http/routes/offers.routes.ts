import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateOffersController } from '../factories/controllers/offers/makeCreateOffersController'
import { makeEditOffersController } from '../factories/controllers/offers/makeEditOffersController'

export const offers = Router()

offers.use(adaptMiddleware(makeEnsureAuthenticated()))

offers.post('/new', adaptRoute(makeCreateOffersController()))
offers.put('/:offerId/edit', adaptRoute(makeEditOffersController()))
