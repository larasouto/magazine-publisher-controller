import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import path from 'path'

import { errors } from './middlewares/errors'
import { lang } from './middlewares/lang-detect'
import { router } from './routes'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())
server.use(cors())
server.use(lang)
server.use('/api', router)
server.use(errors)

server.listen(port, () => {
  console.log(`\n🚀 Server started at http://localhost:${port}`)
})
