const AppError = require('../../utils/AppError')

class ProductsCreateService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute({ name, category, price, description, image }) {
    const validateProductExistence =
      await this.productsRepository.findProductByNameAndCategory(name, category)

    if (validateProductExistence) {
      throw new AppError('Produto já existente nessa categoria.')
    }

    const productCreated = await this.productsRepository.create({
      name,
      category,
      price,
      description,
      image
    })

    return productCreated
  }
}

module.exports = ProductsCreateService
