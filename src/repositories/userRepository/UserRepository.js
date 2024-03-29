const knex = require("../../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async create(name, email, password) {
    const userId = await knex("users").insert(name, email, password);

    return { id: userId };
  }

  async get(userId) {
    const user = await knex("users").where({ id: userId });

    return user;
  }
}

module.exports = UserRepository;
