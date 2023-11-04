import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateAdvertisingsController } from '../factories/controllers/advertisings/makeCreateAdvertisingsController'
import { makeGetAdvertisingController } from '../factories/controllers/advertisings/makeGetAdvertisingController'
import { makeListAdvertisingsController } from '../factories/controllers/advertisings/makeListAdvertisingsController'

export const advertisings = Router()

advertisings.use(adaptMiddleware(makeEnsureAuthenticated()))

advertisings.post('/new', adaptRoute(makeCreateAdvertisingsController()))
advertisings.get('/:advertisingId', adaptRoute(makeGetAdvertisingController()))
advertisings.get('/', adaptRoute(makeListAdvertisingsController()))
