import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeDeleteNotificationController } from '../factories/controllers/notifications/makeDeleteNotificationsController'
import { makeListNotificationsByUserController } from '../factories/controllers/notifications/makeListNotificationController'

export const notifications = Router()

notifications.use(adaptMiddleware(makeEnsureAuthenticated()))

notifications.delete('/', adaptRoute(makeDeleteNotificationController()))
notifications.get('/', adaptRoute(makeListNotificationsByUserController()))
