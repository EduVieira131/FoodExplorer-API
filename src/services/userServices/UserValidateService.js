const AppError = require("../../utils/AppError");

class UserValidateService {
  constructor(userRepositoy) {
    this.userRepositoy = userRepositoy;
  }

  async execute({ user }) {
    const checkUserExists = await this.userRepositoy.get(user.id);

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return;
  }
}

module.exports = UserValidateService;
