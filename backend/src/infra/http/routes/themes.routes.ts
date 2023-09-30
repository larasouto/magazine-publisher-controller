import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateThemesController } from '../factories/controllers/themes/makeCreateThemeController'
import { makeEditThemesController } from '../factories/controllers/themes/makeEditThemeController'

export const themes = Router()

themes.use(adaptMiddleware(makeEnsureAuthenticated()))

themes.post('/new', adaptRoute(makeCreateThemesController()))
themes.put('/:themeId/edit', adaptRoute(makeEditThemesController()))
