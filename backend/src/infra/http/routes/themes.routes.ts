import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateThemesController } from '../factories/controllers/themes/makeCreateThemeController'
import { makeDeleteThemesController } from '../factories/controllers/themes/makeDeleteThemeController'
import { makeEditThemesController } from '../factories/controllers/themes/makeEditThemeController'
import { makeGetThemeController } from '../factories/controllers/themes/makeGetThemeController'

export const themes = Router()

themes.use(adaptMiddleware(makeEnsureAuthenticated()))

themes.post('/new', adaptRoute(makeCreateThemesController()))
themes.put('/:themeId/edit', adaptRoute(makeEditThemesController()))
themes.get('/:themeId', adaptRoute(makeGetThemeController()))
themes.delete('/:themeId', adaptRoute(makeDeleteThemesController()))
themes.get('/', adaptRoute(makeGetThemeController()))
