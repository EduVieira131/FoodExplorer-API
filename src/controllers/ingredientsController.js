const IngredientsRepository = require('../repositories/ingredientsRepository/IngredientsRepository')
const IngredientsShowService = require('../services/ingredientsServices/IngredientsShowService')

class ingredientsController {
  async show(req, res) {
    const { productId } = req.params

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsShowService = new IngredientsShowService(
      ingredientsRepository
    )

    const ingredients = await ingredientsShowService.execute(productId)

    return res.status(200).json(ingredients)
  }
}

module.exports = ingredientsController
