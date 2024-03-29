require("express-async-errors");

const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://foodexplorerfinalproject.netlify.app"],
    credentials: true,
  })
);

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
