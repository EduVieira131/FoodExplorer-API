const knex = require('../../database/knex')

class ProductsRepository {
  async findProductByNameAndCategory(name, category) {
    const product = await knex('products').where({ name }).where({ category })

    return product
  }

  async create(name, category, price, description, image) {
    const productId = await knex('products').insert(
      name,
      category,
      price,
      description,
      image
    )

    return { id: productId }
  }
}

module.exports = ProductsRepository
