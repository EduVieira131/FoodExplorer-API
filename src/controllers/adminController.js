const AdminRepository = require('../repositories/adminRepository/AdminRepository')
const AdminCreateService = require('../services/adminServices/AdminCreateService')

class adminController {
  async create(req, res) {
    const { name, email, password } = req.body

    const adminRepository = new AdminRepository()
    const adminCreateService = new AdminCreateService(adminRepository)

    const admin = await adminCreateService.execute({ name, email, password })

    return res.status(201)
  }
}

module.exports = adminController
