import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateAdPricesController } from '../factories/controllers/ad-prices/makeCreateAdPricesController'
import { makeListAdPricesController } from '../factories/controllers/ad-prices/makeListAdPricesController'
import { makeEditAdPricesController } from '../factories/controllers/ad-prices/makeEditAdPricesController'
import { makeGetAdPriceController } from '../factories/controllers/ad-prices/makeGetAdPriceController'

export const adPrices = Router()

adPrices.use(adaptMiddleware(makeEnsureAuthenticated()))

adPrices.post('/new', adaptRoute(makeCreateAdPricesController()))
adPrices.get('/', adaptRoute(makeListAdPricesController()))
adPrices.get('/:adPriceId', adaptRoute(makeGetAdPriceController()))
adPrices.put('/:adPriceId/edit', adaptRoute(makeEditAdPricesController()))