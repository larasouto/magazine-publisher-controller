import { Router } from 'express'
import { auth } from './auth.routes'
import { categories } from './categories.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/categories', categories)
