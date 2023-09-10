import './i18n'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import { checkLanguage } from './middlewares/check-language'
import { interceptErrors } from './middlewares/intercept-errors'

export const app = express()

app.use(cors())
app.use(checkLanguage)
app.use(express.json())
app.use('/api', router)
app.use(interceptErrors)
