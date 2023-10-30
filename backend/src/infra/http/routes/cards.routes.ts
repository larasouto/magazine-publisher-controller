import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCardsController } from '../factories/controllers/cards/makeCreateCardsController'
import { makeGetCardController } from '../factories/controllers/cards/makeGetCardController'
import { makeEditCardsController } from '../factories/controllers/cards/makeEditCardsController'
import { makeDeleteCardsController } from '../factories/controllers/cards/makeDeleteCardsController'
import { makeListCardsController } from '../factories/controllers/cards/makeListCardsController'

export const cards = Router()

cards.use(adaptMiddleware(makeEnsureAuthenticated()))

cards.post('/new', adaptRoute(makeCreateCardsController()))
cards.delete('/', adaptRoute(makeDeleteCardsController()))
cards.put('/:cardId/edit', adaptRoute(makeEditCardsController()))
cards.get('/:cardId', adaptRoute(makeGetCardController()))
cards.get('/', adaptRoute(makeListCardsController()))
