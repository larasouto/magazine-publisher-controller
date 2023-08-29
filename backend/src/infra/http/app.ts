import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import path from 'path'
import { router } from './routes'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api', router)

export { server }
