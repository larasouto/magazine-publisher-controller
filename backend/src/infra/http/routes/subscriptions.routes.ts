import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeCreateSubscriptionsController } from '../factories/controllers/subscriptions/admin/makeCreateSubscriptionController'
import { makeDeleteSubscriptionsController } from '../factories/controllers/subscriptions/admin/makeDeleteSubscriptionController'
import { makeListSubscriptionsController } from '../factories/controllers/subscriptions/admin/makeListSubscriptionController'
import { makeListSubscriptionsController as makeListUserSubscriptionsController } from '../factories/controllers/subscriptions/user/makeListSubscriptionController'
import { makeGetSubscriptionController as makeGetUserSubscriptionController } from '../factories/controllers/subscriptions/user/makeGetSubscriptionController'
import { makeGetSubscriptionController } from '../factories/controllers/subscriptions/admin/makeGetSubscriptionController'
import { makeEditSubscriptionsController } from '../factories/controllers/subscriptions/admin/makeEditSubscriptionController'
import { makeCancelSubscriptionsController } from '../factories/controllers/subscriptions/user/makeRenewSubscriptionController'
import { makeRenewSubscriptionsController } from '../factories/controllers/subscriptions/user/makeCancelSubscriptionController'

export const subscriptions = Router()

subscriptions.use(adaptMiddleware(makeEnsureAuthenticated()))

subscriptions.post('/new', adaptRoute(makeCreateSubscriptionsController()))
subscriptions.get('/', adaptRoute(makeListSubscriptionsController()))
subscriptions.delete('/', adaptRoute(makeDeleteSubscriptionsController()))
subscriptions.get(
  '/:subscriptionId',
  adaptRoute(makeGetSubscriptionController()),
)
subscriptions.put(
  '/:subscriptionId/edit',
  adaptRoute(makeEditSubscriptionsController()),
)
subscriptions.put(
  '/:subscriptionId/cancel',
  adaptRoute(makeCancelSubscriptionsController()),
)
subscriptions.put(
  '/:subscriptionId/renew',
  adaptRoute(makeRenewSubscriptionsController()),
)

subscriptions.get(
  '/my-subscriptions',
  adaptRoute(makeListUserSubscriptionsController()),
)

subscriptions.get(
  '/my-subscriptions/:subscriptionId',
  adaptRoute(makeGetUserSubscriptionController()),
)
