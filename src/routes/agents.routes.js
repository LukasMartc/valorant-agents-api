import { Router } from 'express'
import { body } from 'express-validator'
import { AgentsController } from '../controllers/AgentsController.js'
import { createAgent } from '../controllers/AgentsController.js'
import { handleInputErrors } from '../middleware/validation.js'

const router = Router()

router.get('/', AgentsController.getAgents)

router.post('/', 
  createAgent)
  
router.get('/:name', AgentsController.getAgent)

router.patch('/:name',
  body('name')
    .optional()
    .toLowerCase()
    .notEmpty().withMessage('El nombre del agente está vacio'),
  body('role')
    .optional()
    .toLowerCase()
    .notEmpty().withMessage('El rol del agente está vacio')
    .isIn(['duelista', 'controlador', 'iniciador', 'centinela'])
    .withMessage('El rol del agente no es correcto'),
  body('skills')
    .optional()
    .isArray({ min: 4, max: 4 }).withMessage('Debes incluir 4 habilidades'),
  body('skills.*')
    .isString().withMessage('Cada habilidad debe ser un texto')
    .customSanitizer(value => value.toLowerCase())
    .notEmpty().withMessage('La habilidad está vacia'),
  handleInputErrors,
  AgentsController.updateAgent)

router.delete('/:name', AgentsController.deleteAgent)

export default router
