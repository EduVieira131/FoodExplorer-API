const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const productsRouter = Router()
const ProductsController = require('../controllers/productsController')
const ProductImageController = require('../controllers/productImageController')

const productsController = new ProductsController()
const productImageController = new ProductImageController()
const uploadFiles = multer(uploadConfig.MULTER)

productsRouter.post('/', productsController.create)
productsRouter.put('/:id', productsController.update)
productsRouter.get('/', productsController.index)
productsRouter.delete('/:id', productsController.delete)
productsRouter.get('/:id', productsController.show)
productsRouter.patch(
  '/image',
  uploadFiles.single('image'),
  productImageController.update
)

module.exports = productsRouter
