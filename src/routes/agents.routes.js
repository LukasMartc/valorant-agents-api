import { Router } from 'express'
import { body } from 'express-validator'
import { AgentsController } from '../controllers/agents.controller.js'
import { createAgent, getAllAgents } from '../controllers/agents.controller.js' 
import { handleInputErrors } from '../middleware/validation.js'

const router = Router()

router.get('/', getAllAgents)

router.post('/',
  body('name')
    .toLowerCase()
    .notEmpty().withMessage('El nombre del agente está vacio'),
  body('description')
    .toLowerCase()
    .notEmpty().withMessage('La descripción del agente está vacio'),
  body('role')
    .toLowerCase()
    .notEmpty().withMessage('El rol del agente está vacio')
    .isIn(['duelista', 'controlador', 'iniciador', 'centinela'])
    .withMessage('El rol del agente no es correcto'),
  body('skills')
    .isArray({ min: 4, max: 4 }).withMessage('Debes incluir 4 habilidades'),
  body('skills.*.name')
    .toLowerCase()
    .notEmpty().withMessage('El nombre de la habilidad esta vacio'),
  body('skills.*.type')
    .toLowerCase()
    .notEmpty().withMessage('El tipo de habilidad esta vacio')
    .isIn(['básica', 'firma', 'definitiva'])
    .withMessage('El tipo de habilidad no es válida'),
  body('skills.*.description')
    .toLowerCase()
    .notEmpty().withMessage('La descripción de la habilidad está vacía')
    .isLength({ max: 500 }).withMessage('La descripción de la habilidad no puede superar los 500 caracteres'),
  body('skills.*.cost')
    // No se usa notEmpy ya que valida strings y arrays
    .exists().withMessage('El costo de la habilidad es obligatorio')
    .isInt({ min: 0 }).withMessage('El costo debe ser un número mayor o igual a 0'),
  handleInputErrors,
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
