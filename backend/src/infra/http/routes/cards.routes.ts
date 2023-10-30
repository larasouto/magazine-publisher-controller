import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCardsController } from '../factories/controllers/cards/makeCreateCardsController'

export const cards = Router()

cards.use(adaptMiddleware(makeEnsureAuthenticated()))

cards.post('/new', adaptRoute(makeCreateCardsController()))
