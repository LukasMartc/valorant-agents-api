import express, { json } from 'express'
import agentsRouter from './routes/agents.routes.js'

const app = express()

app.use(json())

app.use('/agents', agentsRouter)

export default app
