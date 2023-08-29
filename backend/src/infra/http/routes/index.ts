import { Router } from 'express'
import { auth } from './auth.route'

export const router = Router()

router.use('/auth', auth)
