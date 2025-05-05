import { Router } from 'express'
import { AgentsController } from '../controllers/AgentsController.js'

const router = Router()

router.get('/', AgentsController.getAgent)

export default router
