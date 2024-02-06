const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ensureAuthentication = require("../middlewares/ensureAuthentication");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const productsRouter = Router();
const ProductsController = require("../controllers/productsController");
const ProductImageController = require("../controllers/productImageController");

const productsController = new ProductsController();
const productImageController = new ProductImageController();
const uploadFiles = multer(uploadConfig.MULTER);

productsRouter.use(ensureAuthentication);

productsRouter.post(
  "/",
  verifyUserAuthorization("admin"),
  productsController.create
);
productsRouter.put(
  "/:id",
  verifyUserAuthorization("admin"),
  productsController.update
);
productsRouter.get("/", productsController.index);
productsRouter.delete(
  "/:id",
  verifyUserAuthorization("admin"),
  productsController.delete
);
productsRouter.get("/:id", productsController.show);
productsRouter.patch(
  "/image/:productId",
  verifyUserAuthorization("admin"),
  uploadFiles.single("image"),
  productImageController.update
);

module.exports = productsRouter;
