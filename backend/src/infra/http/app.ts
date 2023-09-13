import './i18n'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { checkLanguage } from './middlewares/check-language'
import { interceptErrors } from './middlewares/intercept-errors'
import { router } from './routes'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(checkLanguage)
app.use('/api', router)
app.use(interceptErrors)
