import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreatePaymentSubscriptionsController } from '../factories/controllers/payment-subscriptions/makeCreatePaymentSubscriptions'
import { makeListPaymentSubscriptionsController } from '../factories/controllers/payment-subscriptions/makeListPaymentSubscriptions'
import { makeGetPaymentSubscriptionController } from '../factories/controllers/payment-subscriptions/makeGetPaymentSubscription'
import { makeUpdateStatusSubscriptionsController } from '../factories/controllers/payment-subscriptions/makeUpdateStatusOrdersController'

export const payments = Router()

payments.use(adaptMiddleware(makeEnsureAuthenticated()))

payments.post('/new', adaptRoute(makeCreatePaymentSubscriptionsController()))
payments.get('/', adaptRoute(makeListPaymentSubscriptionsController()))
payments.get(
  '/:paymentSubscriptionId',
  adaptRoute(makeGetPaymentSubscriptionController()),
)
payments.put(
  '/:paymentSubscriptionId',
  adaptRoute(makeUpdateStatusSubscriptionsController()),
)
