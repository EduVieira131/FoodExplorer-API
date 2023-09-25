const knex = require('../../database/knex')

class CategoriesRepository {
  async index() {
    const categories = await knex('categories').orderBy('name').groupBy('name')

    return categories
  }
}

module.exports = CategoriesRepository
