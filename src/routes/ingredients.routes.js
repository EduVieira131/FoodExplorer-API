const { Router } = require("express");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const ingredientsRouter = Router();
const IngredientsController = require("../controllers/ingredientsController");

const ingredientsController = new IngredientsController();

ingredientsRouter.use(ensureAuthentication);

ingredientsRouter.get("/:productId", ingredientsController.show);

module.exports = ingredientsRouter;
