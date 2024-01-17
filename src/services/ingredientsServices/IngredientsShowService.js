const AppError = require('../../utils/AppError')

class IngredientsShowService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute(productId) {
    if (!productId) {
      throw new AppError('O prato não foi informado.')
    }

    const ingredients = await this.ingredientsRepository.getProductsIngredients(
      productId
    )

    if (!ingredients) {
      throw new AppError('Não foi possível buscar os ingredientes.')
    }

    return ingredients
  }
}

module.exports = IngredientsShowService
