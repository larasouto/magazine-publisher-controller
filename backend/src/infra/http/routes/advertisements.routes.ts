import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeCreateAdvertisementsController } from '../factories/controllers/advertisements/makeCreateAdvertisingRepository'
import { makeListAdvertisementsController } from '../factories/controllers/advertisements/makeListAdvertisementsRepository'

export const advertisements = Router()

advertisements.use(adaptMiddleware(makeEnsureAuthenticated()))

advertisements.post('/new', adaptRoute(makeCreateAdvertisementsController()))
advertisements.get('/', adaptRoute(makeListAdvertisementsController()))
