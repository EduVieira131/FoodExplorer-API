const { Router } = require('express')

const ingredientsRouter = Router()
const IngredientsController = require('../controllers/ingredientsController')

const ingredientsController = new IngredientsController()

ingredientsRouter.get('/:productId', ingredientsController.show)

module.exports = ingredientsRouter
