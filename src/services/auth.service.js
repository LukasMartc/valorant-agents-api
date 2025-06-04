import User from '../models/user.model.js'
import { hashPassword } from '../utils/auth.js'

export const registerUserService = async (userData) => {
  const { email, password } = userData

  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Usuario ya registrado')
    error.status = 400
    throw error
  }

  const user = new User(userData)
  user.password = await hashPassword(password)
  await user.save()
  return user
}

