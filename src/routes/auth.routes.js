import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";
import { registerUser, loginUser, getUser } from "../controllers/auth.controller.js";

const router = Router()

router.post('/register',
  body('name')
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  handleInputErrors,
  registerUser)

router.post('/login', 
  body('email')
    .isEmail().withMessage('Email inválido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  loginUser)

router.get('/user', authenticate, getUser)

export default router