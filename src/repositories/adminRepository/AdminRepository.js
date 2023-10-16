const knex = require('../../database/knex')

class AdminRepository {
  async create(name, email, password) {
    const adminId = await knex('admin').insert(name, email, password)

    return { id: adminId }
  }
}

module.exports = AdminRepository
