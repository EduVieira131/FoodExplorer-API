const knex = require('../../database/knex')

class IngredientsRepository {
  async getProductsIngredients(productId) {
    const ingredients = await knex('ingredients').where({
      product_id: productId
    })

    return ingredients
  }
}

module.exports = IngredientsRepository
