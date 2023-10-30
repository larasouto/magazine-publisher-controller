import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeCreateSubscriptionsController } from '../factories/controllers/subscriptions/makeCreateSubscriptionController'
import { makeDeleteSubscriptionsController } from '../factories/controllers/subscriptions/makeDeleteSubscriptionController'
import { makeListSubscriptionsController } from '../factories/controllers/subscriptions/makeListSubscriptionController'
import { makeGetSubscriptionController } from '../factories/controllers/subscriptions/makeGetSubscriptionController'
import { makeEditSubscriptionsController } from '../factories/controllers/subscriptions/makeEditSubscriptionController'

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
