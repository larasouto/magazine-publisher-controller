import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateGraphicsOnDistributorController } from '../factories/controllers/graphicsOnDistributor/makeCreateGraphicsOnDistributorController'
import { makeGetGraphicsOnDistributorController } from '../factories/controllers/graphicsOnDistributor/makeGetGraphicsOnDistributorController'
import { makeListGraphicsOnDistributorController } from '../factories/controllers/graphicsOnDistributor/makeListGraphicsOnDistributorController'

export const graphicsOnDistributor = Router()

graphicsOnDistributor.use(adaptMiddleware(makeEnsureAuthenticated()))

graphicsOnDistributor.post('/new', adaptRoute(makeCreateGraphicsOnDistributorController()))
graphicsOnDistributor.get('/:graphicsOnDistributorId', adaptRoute(makeGetGraphicsOnDistributorController()))
graphicsOnDistributor.get('/', adaptRoute(makeListGraphicsOnDistributorController()))
