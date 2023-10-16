const { Router } = require('express')

const adminRouter = Router()
const AdminController = require('../controllers/adminController')

const adminController = new AdminController()

adminRouter.post('/', adminController.create)

module.exports = adminRouter
