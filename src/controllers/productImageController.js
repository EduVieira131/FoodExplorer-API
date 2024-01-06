const { default: knex } = require('knex')
const DiskStorage = require('../providers/diskStorage')
const AppError = require('../utils/AppError')

class ProductImageController {
  async update(req, res) {
    const { productId } = req.body
    const imageFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const product = await knex('products').where({ id: productId }).first()

    if (!product) {
      throw new AppError('Produto não encontrado ou inexistente.', 401)
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    product.image = filename

    await knex('products').update(product).where({ id: productId })

    return res.json(user)
  }
}

module.exports = ProductImageController
