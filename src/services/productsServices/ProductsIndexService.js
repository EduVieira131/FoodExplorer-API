const AppError = require('../../utils/AppError')

class ProductsIndexService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }

  async execute(searchTerms) {
    let products

    if (!searchTerms) {
      throw new AppError(
        'Por favor, insira o nome de uma receita ou ingrediente.'
      )
    }

    const filteredSearchTerms = searchTerms
      .split(',')
      .map(searchTerm => searchTerm.trim())

    if (filteredSearchTerms.length > 1) {
      products = await this.productsRepository.indexByIngredients(
        filteredSearchTerms
      )
    } else {
      products = await this.productsRepository.indexByName(searchTerms)
    }

    if (!products) {
      throw new AppError('Não foi possível buscar os produtos.')
    }

    return products
  }
}

module.exports = ProductsIndexService
