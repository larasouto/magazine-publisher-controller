import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateSubtitlesController } from '../factories/controllers/subtitles/makeCreateSubtitleController'

export const subtitles = Router()

subtitles.use(adaptMiddleware(makeEnsureAuthenticated()))

subtitles.post('/new', adaptRoute(makeCreateSubtitlesController()))
