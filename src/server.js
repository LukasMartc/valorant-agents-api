import express, { json } from 'express'
import 'dotenv/config'
import agentsRouter from './routes/agents.routes.js'
import authRouter from './routes/auth.routes.js'
import { connectDB } from './config/db.js'

const app = express()

connectDB()

app.use(json())

app.use('/agents', agentsRouter)
app.use('/auth', authRouter)

export default app
