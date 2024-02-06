const knex = require("knex");
const DiskStorage = require("../providers/diskStorage");
const AppError = require("../utils/AppError");
const ProductsRepository = require("../repositories/productsRepository/ProductsRepository");

class ProductImageController {
  async update(req, res) {
    const productsRepository = new ProductsRepository();

    const id = req.params.productId;
    const imageFilename = req.file.filename;

    const diskStorage = new DiskStorage();

    const product = await productsRepository.findProductById(id);

    if (!product) {
      throw new AppError("Produto não encontrado ou inexistente.", 401);
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    product.image = filename;

    await productsRepository.updateProductImage(product);

    return res.json(product);
  }
}

module.exports = ProductImageController;
