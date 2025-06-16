import User from '../models/user.model.js'
import { hashPassword, checkPassword } from '../utils/auth.js'
import { generateJWT } from '../utils/jwt.js' 

export const registerUserService = async (userData) => {
  const { email, password } = userData

  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Usuario ya registrado')
    error.status = 409
    throw error
  }

  const user = new User(userData)
  user.password = await hashPassword(password)
  await user.save()
  return user
}

export const loginUserService = async (userData) => {
  const { email, password } = userData

  const user = await User.findOne({ email })
  if(!user) {
    const error = new Error('El usuario no existe')
    error.status = 404
    throw error
  }

  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!isPasswordCorrect) {
    const error = new Error('Password incorrecto')
    error.status = 401
    throw error
  }

  return generateJWT({ id: user._id })
}
