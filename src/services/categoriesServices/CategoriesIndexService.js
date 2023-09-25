const AppError = require('../../utils/AppError')

class CategoriesIndexService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute() {
    const categories = this.categoriesRepository.index()

    if (!categories) {
      throw new AppError('Não foi possível buscar os ingredientes')
    }

    return categories
  }
}

module.exports = CategoriesIndexService
