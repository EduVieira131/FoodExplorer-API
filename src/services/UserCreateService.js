const AppError = require("../utils/AppError")
const { hash } = require("bcryptjs")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({name, email, password}) {
    const validateUserExistence = await this.userRepository.findByEmail(email)

    if(validateUserExistence) {
      throw new AppError("Esse e-mail já está cadastrado.")
    }

    const hashedPassword = await hash(password, 10)
    const userCreated = await this.userRepository.create({name, email, password: hashedPassword})

    return userCreated
  }
}

module.exports = UserCreateService