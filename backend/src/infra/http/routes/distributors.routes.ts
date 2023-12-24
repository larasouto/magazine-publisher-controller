import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateDistributorController } from '../factories/controllers/distributor/makeCreateDistributorController'
import { makeDeleteDistributorController } from '../factories/controllers/distributor/makeDeleteDistributorController'
import { makeEditDistributorController } from '../factories/controllers/distributor/makeEditDistributorController'
import { makeGetDistributorController } from '../factories/controllers/distributor/makeGetDistributorController'
import { makeListDistributorController } from '../factories/controllers/distributor/makeListDistributorController'

export const distributors = Router()

distributors.use(adaptMiddleware(makeEnsureAuthenticated()))

distributors.post('/new', adaptRoute(makeCreateDistributorController()))
distributors.put(
  '/:distributorId/edit',
  adaptRoute(makeEditDistributorController()),
)
distributors.get('/:distributorId', adaptRoute(makeGetDistributorController()))
distributors.delete('/', adaptRoute(makeDeleteDistributorController()))
distributors.get('/', adaptRoute(makeListDistributorController()))
