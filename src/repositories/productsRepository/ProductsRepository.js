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

  async indexByName(searchTerm) {
    const searchResult = await knex('products').whereLike(
      'products.name',
      `%${searchTerm}%`
    )

    return searchResult
  }

  async indexByIngredients(searchTerm) {
    const searchResult = await knex('ingredients')
      .select([
        'products.id',
        'products.name',
        'products.price',
        'products.description',
        'products.image'
      ])
      .whereIn('ingredients.name', searchTerm)
      .innerJoin('products', 'products.id', 'ingredients.product_id')
      .groupBy('products.id')
      .orderBy('products.name')

    return searchResult
  }

  async delete(id) {
    await knex('products').where({ id }).delete()
  }

  async show(id) {
    const product = await knex('products').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ product_id: id })
      .orderBy('name')
    const categories = await knex('categories').where({ product_id: id })

    return { ...product, ingredients, categories }
  }
}

module.exports = ProductsRepository
