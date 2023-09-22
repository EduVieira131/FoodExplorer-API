const { response } = require('express')
const ProductsRepository = require('../repositories/productsRepository/ProductsRepository')
const ProductsCreateService = require('../services/productsServices/ProductsCreateService')
const ProductsIndexService = require('../services/productsServices/ProductsIndexService')

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

    return res.status(201).json()
  }

  async index(req, res) {
    const productsRepository = new ProductsRepository()
    const productsIndexService = new ProductsIndexService(productsRepository)

    const products = await productsIndexService.execute()

    return res.status(201).json(products)
  }
}

module.exports = productsController
