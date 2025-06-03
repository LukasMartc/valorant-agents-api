import User from '../models/user.model.js'

export const registerUserService = async (userData) => {
  const { email } = userData

  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Usuario ya registrado')
    error.status = 400
    throw error
  }

  const user = new User(userData)
  await user.save()
  return user
}

