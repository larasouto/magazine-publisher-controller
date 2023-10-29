import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateOrderReturnController } from '../factories/controllers/orderReturn/makeCreateOrderReturnController'
import { makeGetOrderReturnController } from '../factories/controllers/orderReturn/makeGetOrderReturnController'
import { makeListOrderReturnController } from '../factories/controllers/orderReturn/makeListOrderReturnController'

export const orderRetur = Router()

orderRetur.use(adaptMiddleware(makeEnsureAuthenticated()))

orderRetur.post('/new', adaptRoute(makeCreateOrderReturnController()))
orderRetur.get('/:orderReturnId', adaptRoute(makeGetOrderReturnController()))
orderRetur.get('/', adaptRoute(makeListOrderReturnController()))
