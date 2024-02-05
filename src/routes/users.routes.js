const { Router } = require("express");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const usersRouter = Router();
const UsersController = require("../controllers/usersController");
const UsersValidatedController = require("../controllers/usersValidatedController");

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRouter.post("/", usersController.create);
usersRouter.get(
  "/validated",
  ensureAuthentication,
  usersValidatedController.index
);

module.exports = usersRouter;
