import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateMagazinesController } from '../factories/controllers/magazines/makeCreateMagazineController'
import { makeEditMagazinesController } from '../factories/controllers/magazines/makeEditMagazineController'
import { makeGetMagazineController } from '../factories/controllers/magazines/makeGetMagazineController'

export const magazines = Router()

magazines.use(adaptMiddleware(makeEnsureAuthenticated()))

magazines.post('/new', adaptRoute(makeCreateMagazinesController()))
magazines.put('/:magazineId/edit', adaptRoute(makeEditMagazinesController()))
magazines.get('/:magazineId', adaptRoute(makeGetMagazineController()))
