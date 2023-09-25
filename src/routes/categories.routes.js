const { Router } = require('express')

const categoriesRouter = Router()
const CategoriesController = require('../controllers/categoriesController')

const categoriesController = new CategoriesController()

categoriesRouter.get('/', categoriesController.index)

module.exports = categoriesRouter