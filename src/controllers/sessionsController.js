const SessionsRepository = require("../repositories/sessionsRepository/SessionsRepository");
const SessionsCreateService = require("../services/sessionsServices/SessionsCreateService");

class sessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();
    const sessionsCreateService = new SessionsCreateService(sessionsRepository);

    const { token, user } = await sessionsCreateService.execute({
      email,
      password,
    });

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    return response.status(200).json({ user });
  }
}

module.exports = sessionsController;
