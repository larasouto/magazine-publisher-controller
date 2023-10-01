import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateReportersController } from '../factories/controllers/reporters/makeCreateReporterController'
import { makeEditReportersController } from '../factories/controllers/reporters/makeEditReporterController'
import { makeGetReporterController } from '../factories/controllers/reporters/makeGetReporterController'
import { makeListReportersController } from '../factories/controllers/reporters/makeListReportersController'

export const reporters = Router()

reporters.use(adaptMiddleware(makeEnsureAuthenticated()))

reporters.post('/new', adaptRoute(makeCreateReportersController()))
reporters.put('/:reporterId/edit', adaptRoute(makeEditReportersController()))
reporters.get('/:reporterId', adaptRoute(makeGetReporterController()))
reporters.get('/', adaptRoute(makeListReportersController()))
