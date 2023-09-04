const ProductsCreateService = require('../services/productsServices/ProductsCreateService')
const ProductsRepository = require('../repositories/productsRepository/ProductsRepository')

class productsController {
  async create(req, res) {
    const { name, category, price, description, image } = req.body

    const productsRepository = new ProductsRepository()
    const productsCreateServices = new ProductsCreateService(productsRepository)

    await productsCreateServices.execute({
      name,
      category,
      price,
      description,
      image
    })

    return res.status(201).json
  }
}
