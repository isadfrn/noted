require("express-async-errors");
require("dotenv").config();

const AppError = require("./utils/AppError");
const express = require("express");
const showBanner = require("node-banner");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const port = process.env.PORT || 3333;

app.listen(port, async () => {
  await showBanner(
    "noted-server",
    `Server is running on: http://localhost:${port}`,
    "green",
    "green"
  );
});
