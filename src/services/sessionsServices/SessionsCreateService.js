const { compare } = require("bcryptjs");
const authConfig = require("../../configs/auth");
const AppError = require("../../utils/AppError");
const { sign } = require("jsonwebtoken");

class sessionsCreateService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async execute({ email, password }) {
    const user = await this.sessionsRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

module.exports = sessionsCreateService;
