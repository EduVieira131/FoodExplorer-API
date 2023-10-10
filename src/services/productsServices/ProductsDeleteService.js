const AppError = require('../../utils/AppError')

class ProductsDeleteService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(id) {
    if (!id) {
      throw new AppError('Não foi possível encontrar o produto a ser deletado.')
    }

    await this.productsRepository.delete(id)
  }
}

module.exports = ProductsDeleteService
