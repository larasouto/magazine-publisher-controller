import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeCreateSubscriptionsController } from '../factories/controllers/subscriptions/makeCreateSubscriptionController'
import { makeListSubscriptionsController } from '../factories/controllers/subscriptions/makeListSubscriptionController'

export const subscriptions = Router()

subscriptions.use(adaptMiddleware(makeEnsureAuthenticated()))

subscriptions.post('/new', adaptRoute(makeCreateSubscriptionsController()))
subscriptions.get('/', adaptRoute(makeListSubscriptionsController()))
