const knex = require('../../database/knex')

class ProductsRepository {
  async findProductByNameAndCategory(name, category) {
    const product = await knex('products')
      .whereLike('products.name', `%${name}%`)
      .where({ category })
      .first()

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

  async index() {
    const products = await knex('products')

    return products
  }
}

module.exports = ProductsRepository
