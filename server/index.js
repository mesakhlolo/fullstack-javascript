const express = require("express");
const app = express();

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
});
