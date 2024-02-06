const ProductsRepository = require("../repositories/productsRepository/ProductsRepository");
const ProductsCreateService = require("../services/productsServices/ProductsCreateService");
const ProductsIndexService = require("../services/productsServices/ProductsIndexService");
const ProductsDeleteService = require("../services/productsServices/ProductsDeleteService");
const ProductsShowService = require("../services/productsServices/ProductShowService");
const ProductsUpdateService = require("../services/productsServices/ProductsUpdateService");

class productsController {
  async create(req, res) {
    const { name, ingredients, category, price, description, image } = req.body;

    const productsRepository = new ProductsRepository();
    const productsCreateServices = new ProductsCreateService(
      productsRepository
    );

    const product = await productsCreateServices.execute({
      name,
      ingredients,
      category,
      price,
      description,
      image,
    });

    return res.status(201).json(product.productCreated);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, ingredients, category, price, description, image } = req.body;

    const productsRepository = new ProductsRepository();
    const productsUpdateService = new ProductsUpdateService(productsRepository);

    const product = await productsUpdateService.execute({
      id,
      name,
      ingredients,
      category,
      price,
      description,
      image,
    });

    return res.status(200).json(product);
  }

  async index(req, res) {
    const { searchTerms } = req.query;

    const productsRepository = new ProductsRepository();
    const productsIndexService = new ProductsIndexService(productsRepository);

    const products = await productsIndexService.execute(searchTerms);

    return res.status(200).json(products);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productsRepository = new ProductsRepository();
    const productsDeleteService = new ProductsDeleteService(productsRepository);

    await productsDeleteService.execute(id);

    return res.status(200).json();
  }

  async show(req, res) {
    const { id } = req.params;

    const productsRepository = new ProductsRepository();
    const productsShowService = new ProductsShowService(productsRepository);

    const product = await productsShowService.execute(id);

    return res.status(200).json(product);
  }
}

module.exports = productsController;
