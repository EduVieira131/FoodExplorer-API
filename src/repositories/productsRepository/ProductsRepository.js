const knex = require('../../database/knex')

class ProductsRepository {
  async findProductByName(name) {
    const product = await knex('products')
      .whereLike('products.name', `%${name}%`)
      .first()

    return product
  }

  async create({
    name,
    ingredients,
    category,
    price,
    description,
    image,
    res
  }) {
    console.log(name)

    const [product_id] = await knex('products').insert({
      name,
      price,
      description,
      image
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        product_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    const categoriesInsert = {
      product_id,
      name: category
    }

    await knex('categories').insert(categoriesInsert)

    return { product_id }
  }

  async getProductsByName(name) {
    console.log(name)
    const products = await knex('products')
      .whereLike('products.name', `%${name}%`)
      .first()

    return products
  }

  async getProductsByIngredients(ingredients) {
    const filteredIngredients = ingredients
      .split(',')
      .map(ingredient => ingredient.trim())

    const products = await knex('ingredients')
      .select(['products.id', 'products.name', 'products.description'])
      .whereIn('ingredients.name', filteredIngredients)
      .innerJoin('products', 'products.id', 'ingredients.product_id')
      .groupBy('products.id')
      .orderBy('products.name')

    return products
  }
}

module.exports = ProductsRepository
