import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateGraphicsOrderReturnController } from '../factories/controllers/graphicsOrderReturn/makeCreateGraphicsOrderReturnController'
import { makeGetGraphicsOrderReturnController } from '../factories/controllers/graphicsOrderReturn/makeGetGraphicsOrderRetunrController'
import { makeListGraphicsOrderReturnController } from '../factories/controllers/graphicsOrderReturn/makeListGraphicsOrderReturnController'

export const graphicsOrderRetur = Router()

graphicsOrderRetur.use(adaptMiddleware(makeEnsureAuthenticated()))

graphicsOrderRetur.post('/new', adaptRoute(makeCreateGraphicsOrderReturnController()))
graphicsOrderRetur.get('/:graphicsOrderReturnId', adaptRoute(makeGetGraphicsOrderReturnController()))
graphicsOrderRetur.get('/', adaptRoute(makeListGraphicsOrderReturnController()))
