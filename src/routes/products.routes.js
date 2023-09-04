const { Router } = require('express')

const productsRouter = Router()
const ProductsController = require('../controllers/productsController')

const productsController = new ProductsController()

productsRouter.post('/', productsController.create)

module.exports = productsRouter
