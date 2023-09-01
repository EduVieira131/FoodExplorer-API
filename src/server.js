const express = require('express')
const AppError = require("./utils/AppError")

const app = express()

app.use((error, res) => {
  if(error instanceof AppError) {
    return res.statusCode(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return res.statusCode(500).json({
    status:"error",
    message: error.message
  })
})

const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))