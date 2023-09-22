const AppError = require('../../utils/AppError')

class ProductsIndexService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(name, ingredients) {
    let products

    if (name) {
      products = await this.productsRepository.getProductsByName(name)
    }

    if (ingredients) {
      products = await this.productsRepository.getProductsByIngredients(ingredients)
    }

    if (!products) {
      throw new AppError('Não foi possível buscar os produtos.')
    }

    return products
  }
}

module.exports = ProductsIndexService
