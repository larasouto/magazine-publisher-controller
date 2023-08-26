import { Router } from 'express'
import { auth } from './routes/auth'

export const router = Router()

router.use('/auth', auth)
