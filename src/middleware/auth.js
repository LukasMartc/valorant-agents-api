import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authenticate = async (req, res, next) => {
   const bearer = req.headers.authorization

  if(!bearer) {
    const error = new Error('No autorizado')
    error.status = 401
    throw error
  }

  // destructuración de array, el bearer.split(' ') convierte el bearer en un array
  const [, token] = bearer.split(' ')
  if(!token) {
    const error = new Error('No autorizado')
    error.status = 401
    throw error
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('name email')
      if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ error: error.message })
      }
      req.user = user
      next()
    }
  } catch (error) {
    res.status(500).json({ error: 'Token no válido' })
  }
}