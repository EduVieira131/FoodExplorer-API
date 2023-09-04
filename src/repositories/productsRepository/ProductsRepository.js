const knex = require('../../database/knex')

class ProductsRepository {
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
