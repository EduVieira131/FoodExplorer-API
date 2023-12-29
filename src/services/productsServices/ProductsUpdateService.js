const AppError = require('../../utils/AppError')

class ProductsUpdateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({
    id,
    name,
    ingredients,
    category,
    price,
    description,
    image
  }) {
    const updatedProductData = {
      id,
      name,
      ingredients,
      category,
      price,
      description,
      image
    }

    const product = await this.productsRepository.findProductById(id)

    if (!product) {
      throw new AppError('Produto não encontrado ou inexistente', 401)
    }

    const updatedProduct = await this.productsRepository.update({
      updatedProductData
    })

    return updatedProduct
  }
}

module.exports = ProductsUpdateService
