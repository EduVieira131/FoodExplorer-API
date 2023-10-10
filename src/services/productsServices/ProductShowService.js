const AppError = require('../../utils/AppError')

class ProductsShowService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(id) {
    if (!id) {
      throw new AppError('ID do produto inválido.')
    }

    const product = await this.productsRepository.show(id)

    return product
  }
}

module.exports = ProductsShowService
