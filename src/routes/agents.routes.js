import { Router } from 'express'
import { body } from 'express-validator'
import { AgentsController } from '../controllers/AgentsController.js'
import { handleInputErrors } from '../middleware/validation.js'

const router = Router()

router.get('/', AgentsController.getAgents)
router.post('/', 
  body('name')
    .toLowerCase()
    .notEmpty().withMessage('El nombre del agente está vacio'),
  body('role')
    .notEmpty().withMessage('El rol del agente está vacio')
    .toLowerCase()
    .isIn(['duelista', 'controlador', 'iniciador', 'centinela'])
    .withMessage('El rol del agente no es correcto'),
  body('skills')
    .toLowerCase()
    .isArray({ min: 4, max: 4 }).withMessage('Debes incluir 4 habilidades'),
  body('skills.*')
    .isString()
    .customSanitizer(value => value.toLowerCase())
    .notEmpty().withMessage('La habilidad está vacia'),
  handleInputErrors,
  AgentsController.createAgent)
router.get('/:name', AgentsController.getAgent)
router.patch('/:name', AgentsController.updateAgent)

export default router
