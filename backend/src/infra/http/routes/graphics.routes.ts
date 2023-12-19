import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateGraphicsController } from '../factories/controllers/graphics/makeCreateGraphicsController'
import { makeDeleteGraphicsController } from '../factories/controllers/graphics/makeDeleteGraphicsController'
import { makeGetGraphicsController } from '../factories/controllers/graphics/makeGetGraphicsController'
import { makeEditGraphicsController } from '../factories/controllers/graphics/makeEditGraphicsController'
import { makeListGraphicsController } from '../factories/controllers/graphics/makeListGraphicsController'

export const graphics = Router()

graphics.use(adaptMiddleware(makeEnsureAuthenticated()))

graphics.post('/new', adaptRoute(makeCreateGraphicsController()))
graphics.put('/:graphicsId/edit', adaptRoute(makeEditGraphicsController()))
graphics.get('/:graphicsId', adaptRoute(makeGetGraphicsController()))
graphics.delete('/', adaptRoute(makeDeleteGraphicsController()))
graphics.get('/', adaptRoute(makeListGraphicsController()))
