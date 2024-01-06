const AppError = require('../../utils/AppError')
const { hash } = require('bcryptjs')

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password, isAdmin }) {
    if(password.lenght < 6 ) {
      throw new AppError('A senha deve conter 6 ou mais caracteres.')
    }

    

    const validateUserExistence = await this.userRepository.findByEmail(email)

    if (validateUserExistence) {
      throw new AppError('Esse e-mail já está cadastrado.')
    }

    const hashedPassword = await hash(password, 10)
    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin
    })

    return userCreated
  }
}

module.exports = UserCreateService
