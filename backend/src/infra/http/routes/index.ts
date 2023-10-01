import { Router } from 'express'
import { auth } from './auth.routes'
import { categories } from './categories.routes'
import { themes } from './themes.routes'
import { reporters } from './reporters.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/categories', categories)
router.use('/magazines/themes', themes)
router.use('/reporters', reporters)
