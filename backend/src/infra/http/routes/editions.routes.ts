import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateEditionsController } from '../factories/controllers/editions/makeCreateEditionController'
import { makeListEditionsController } from '../factories/controllers/editions/makeListEditionsController'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeDeleteEditionsController } from '../factories/controllers/editions/makeDeleteEditionController'
import { makeEditEditionsController } from '../factories/controllers/editions/makeEditEditionController'
import { makeGetEditionController } from '../factories/controllers/editions/makeGetEditionController'

export const editions = Router()

editions.use(adaptMiddleware(makeEnsureAuthenticated()))

editions.post('/new', adaptRoute(makeCreateEditionsController()))
editions.get('/', adaptRoute(makeListEditionsController()))
editions.delete('/:editionId', adaptRoute(makeDeleteEditionsController()))
editions.put('/:editionId/edit', adaptRoute(makeEditEditionsController()))
editions.get('/:editionId', adaptRoute(makeGetEditionController()))
