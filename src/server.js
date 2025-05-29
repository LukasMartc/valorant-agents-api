import express, { json } from 'express'
import 'dotenv/config'
import agentsRouter from './routes/agents.routes.js'
import { connectDB } from './config/db.js'

const app = express()

app.use(json())

connectDB()

app.use('/agents', agentsRouter)

export default app
