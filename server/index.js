const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");

// Router
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
});
