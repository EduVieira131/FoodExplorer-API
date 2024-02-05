const UserRepository = require("../repositories/userRepository/UserRepository");
const UserValidateService = require("../services/userServices/UserValidateService");

class usersValidatedController {
  async index(req, res) {
    const { user } = req;

    const userRepository = new UserRepository();
    const userValidateService = new UserValidateService(userRepository);

    await userValidateService.execute(user);

    return res.status(200).json();
  }
}

module.exports = usersValidatedController;
