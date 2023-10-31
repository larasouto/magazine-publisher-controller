import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreatePaymentAdvertisingsController } from '../factories/controllers/payment-advertisings/makeCreatePaymentSubscriptions'
import { makeListPaymentAdvertisingsController } from '../factories/controllers/payment-advertisings/makeListPaymentSubscriptions'
import { makeGetPaymentAdvertisingController } from '../factories/controllers/payment-advertisings/makeGetPaymentSubscription'
import { makeUpdateStatusAdvertisingsController } from '../factories/controllers/payment-advertisings/makeUpdateStatusOrdersController'

export const paymentsAd = Router()

paymentsAd.use(adaptMiddleware(makeEnsureAuthenticated()))

paymentsAd.post('/new', adaptRoute(makeCreatePaymentAdvertisingsController()))
paymentsAd.get('/', adaptRoute(makeListPaymentAdvertisingsController()))
paymentsAd.get('/:orderId', adaptRoute(makeGetPaymentAdvertisingController()))
paymentsAd.put(
  '/:orderId',
  adaptRoute(makeUpdateStatusAdvertisingsController()),
)
