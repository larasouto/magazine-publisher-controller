import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateEditionsController } from '../factories/controllers/editions/makeCreateEditionRepository'
import { makeListEditionsController } from '../factories/controllers/editions/makeListEditionsRepository'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'

export const editions = Router()

editions.use(adaptMiddleware(makeEnsureAuthenticated()))

editions.post('/new', adaptRoute(makeCreateEditionsController()))
editions.get('/', adaptRoute(makeListEditionsController()))
