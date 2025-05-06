import { Router } from 'express'
import { AgentsController } from '../controllers/AgentsController.js'

const router = Router()

router.get('/', AgentsController.getAgent)
router.post('/', AgentsController.createAgent)

export default router
