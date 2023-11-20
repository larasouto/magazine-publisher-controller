import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateArticlesController } from '../factories/controllers/articles/makeCreateArticlesController'
export const articles = Router()

articles.use(adaptMiddleware(makeEnsureAuthenticated()))

articles.post('/new', adaptRoute(makeCreateArticlesController()))
