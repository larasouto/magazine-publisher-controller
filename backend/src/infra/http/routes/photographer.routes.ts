import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreatePhotographerController } from '../factories/controllers/photographers/makeCreatePhotographerController'

export const photographers = Router()

photographers.use(adaptMiddleware(makeEnsureAuthenticated()))

photographers.post('/new', adaptRoute(makeCreatePhotographerController()))
photographers.put(
  '/:photographerId/edit',
  adaptRoute(makeCreatePhotographerController()),
)
