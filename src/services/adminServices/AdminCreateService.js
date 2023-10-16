const { hash } = require('bcryptjs')

class AdminCreateService {
  constructor(adminRepository) {
    this.adminRepository = adminRepository
  }

  async execute({ name, email, password }) {
    const hashedPassword = await hash(password, 10)
    const adminCreated = await this.adminRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return adminCreated
  }
}

module.exports = AdminCreateService
