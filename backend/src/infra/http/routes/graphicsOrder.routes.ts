import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateGraphicsOrderController } from '../factories/controllers/graphicsOrder/makeCreateGraphicsOrderController'
import { makeListGraphicsOrderController } from '../factories/controllers/graphicsOrder/makeListGraphicsOrderController'
import { makeGetGraphicsOrderController } from '../factories/controllers/graphicsOrder/makeGetGraphicsOrderController'

export const graphicsOrder = Router()

graphicsOrder.use(adaptMiddleware(makeEnsureAuthenticated()))

graphicsOrder.post('/new', adaptRoute(makeCreateGraphicsOrderController()))
graphicsOrder.get('/', adaptRoute(makeListGraphicsOrderController()))
graphicsOrder.get('/:graphicsOrderId', adaptRoute(makeGetGraphicsOrderController()))
