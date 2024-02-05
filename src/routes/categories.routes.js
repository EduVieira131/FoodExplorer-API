const { Router } = require("express");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const categoriesRouter = Router();
const CategoriesController = require("../controllers/categoriesController");

const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthentication);

categoriesRouter.get("/", categoriesController.index);

module.exports = categoriesRouter;
