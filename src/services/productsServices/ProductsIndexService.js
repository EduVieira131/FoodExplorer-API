const AppError = require("../../utils/AppError");

class ProductsIndexService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(searchTerms) {
    let products;

    if (!searchTerms) {
      const products = await this.productsRepository.indexProducts();

      return products;
    }

    const filteredSearchTerms = searchTerms
      .split(",")
      .map((searchTerm) => searchTerm.trim());

    if (filteredSearchTerms.length > 1) {
      products = await this.productsRepository.indexByIngredients(
        filteredSearchTerms
      );
    } else {
      products = await this.productsRepository.indexByName(searchTerms);
    }

    if (!products) {
      throw new AppError("Não foi possível buscar os produtos.");
    }

    return products;
  }
}

module.exports = ProductsIndexService;
