class AppError {
  message
  statusCode

  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
    console.log(this.message, this.statusCode)
  }
}

module.exports = AppError
