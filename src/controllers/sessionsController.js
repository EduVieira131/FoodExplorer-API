const SessionsRepository = require('../repositories/sessionsRepository/SessionsRepository')
const SessionsCreateService = require('../services/sessionsServices/SessionsCreateService')

class sessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const sessionsRepository = new SessionsRepository()
    const sessionsCreateService = new SessionsCreateService(sessionsRepository)

    const session = await sessionsCreateService.execute({ email, password })

    return res.status(200).json(session)
  }
}

module.exports = sessionsController
