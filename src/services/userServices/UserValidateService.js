const AppError = require("../../utils/AppError");

class UserValidateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    const checkUserExists = await this.userRepository.get(user.id);

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return checkUserExists;
  }
}

module.exports = UserValidateService;
