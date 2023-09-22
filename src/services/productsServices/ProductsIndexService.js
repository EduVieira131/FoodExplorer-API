const AppError = require('../../utils/AppError')

class ProductsIndexService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute() {
    const products = await this.productsRepository.index()

    if (!products) {
      throw new AppError('Não foi possível buscar os produtos.')
    }

    return products
  }
}

module.exports = ProductsIndexService
