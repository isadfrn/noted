require("express-async-errors");
const database = require("./database/sqlite");
const AppError = require("./utils/App.error");
const express = require("express");
const showBanner = require("node-banner");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

database();

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
    "blue",
    "blue"
  );
});
