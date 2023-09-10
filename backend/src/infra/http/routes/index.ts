import { Router } from 'express'
import { auth } from './auth.routes'

export const router = Router()

router.use('/auth', auth)
