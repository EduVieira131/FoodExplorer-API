const { Router } = require('express')

const productsRouter = Router()
const ProductsController = require('../controllers/productsController')

const productsController = new ProductsController()

productsRouter.post('/', productsController.create)
productsRouter.get('/', productsController.index)
productsRouter.delete('/:id', productsController.delete)
productsRouter.get('/:id', productsController.show)

module.exports = productsRouter
