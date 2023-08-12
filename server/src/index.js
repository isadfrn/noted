const express = require("express");
const showBanner = require("node-banner");

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, async () => {
  await showBanner(
    "noted-server",
    `Server is running on: http://localhost:${port}`,
    "blue",
    "blue"
  );
});
