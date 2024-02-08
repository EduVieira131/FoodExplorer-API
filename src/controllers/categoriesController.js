const CategoriesRepository = require("../repositories/categoriesRepository/CategoriesRepository");
const CategoriesIndexService = require("../services/categoriesServices/CategoriesIndexService");

class categoriesController {
  async index(req, res) {
    const categoriesRepository = new CategoriesRepository();
    const categoriesIndexService = new CategoriesIndexService(
      categoriesRepository
    );

    const categories = await categoriesIndexService.execute();

    return res.status(200).json(categories);
  }
}

module.exports = categoriesController;
