import express from 'express'
import agentsRouter from './routes/agents.routes.js'

const app = express()

app.use('/agents', agentsRouter)

export default app
