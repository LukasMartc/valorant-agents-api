import colors from 'colors'
import { registerUserService, loginUserService } from '../services/auth.service.js'

export const registerUser =  async (req, res) => {
  try {
    const newUser = await registerUserService(req.body)
    return res.status(201).json({
      msg: 'Usuario registrado con exito',
      user: newUser
    })
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }   
}

export const loginUser = async (req, res) => { 
  try {
    const token = await loginUserService(req.body)
    res.send(token)
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }
}

export const getUser = async (req, res) => {
  res.json(req.user)
}
