import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreatePhotographerController } from '../factories/controllers/photographers/makeCreatePhotographerController'
import { makeEditPhotographerController } from '../factories/controllers/photographers/makeEditPhotographerController'
import { makeGetPhotographerController } from '../factories/controllers/photographers/makeGetPhotographerController'
import { makeListPhotographersController } from '../factories/controllers/photographers/makeListPhotographersController'
import { makeInactivatePhotographersController } from '../factories/controllers/photographers/makeInactivateReporterController'

export const photographers = Router()

photographers.use(adaptMiddleware(makeEnsureAuthenticated()))

photographers.post('/new', adaptRoute(makeCreatePhotographerController()))
photographers.put(
  '/:photographerId/edit',
  adaptRoute(makeEditPhotographerController()),
)
photographers.get(
  '/:photographerId',
  adaptRoute(makeGetPhotographerController()),
)
photographers.get('/', adaptRoute(makeListPhotographersController()))
photographers.put(
  '/:photographerId/inactivate',
  adaptRoute(makeInactivatePhotographersController()),
)
