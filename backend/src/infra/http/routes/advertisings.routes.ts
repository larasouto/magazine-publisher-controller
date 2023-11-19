import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateAdvertisingsController } from '../factories/controllers/advertisings/makeCreateAdvertisingsController'
import { makeEditAdvertisingsController } from '../factories/controllers/advertisings/makeEditAdvertisingsController'
import { makeGetAdvertisingController } from '../factories/controllers/advertisings/makeGetAdvertisingController'
import { makeListAdvertisingsController } from '../factories/controllers/advertisings/makeListAdvertisingsController'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeUpdateStatusAdvertisingsController } from '../factories/controllers/advertisings/makeUpdateStatusAdvertisingsController'

export const advertisings = Router()

advertisings.use(adaptMiddleware(makeEnsureAuthenticated()))

advertisings.post('/new', adaptRoute(makeCreateAdvertisingsController()))
advertisings.get('/:advertisingId', adaptRoute(makeGetAdvertisingController()))
advertisings.get('/', adaptRoute(makeListAdvertisingsController()))
advertisings.put(
  '/:advertisingId/edit',
  adaptRoute(makeEditAdvertisingsController()),
)
advertisings.put(
  '/:advertisingId',
  adaptRoute(makeUpdateStatusAdvertisingsController()),
)
