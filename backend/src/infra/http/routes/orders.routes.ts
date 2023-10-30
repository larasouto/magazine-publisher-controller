import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateOrdersController } from '../factories/controllers/orders/makeCreateOrdersController'

export const orders = Router()

orders.use(adaptMiddleware(makeEnsureAuthenticated()))

orders.post('/new', adaptRoute(makeCreateOrdersController()))
