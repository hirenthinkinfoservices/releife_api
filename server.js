const express = require("express");
const bodyParser = require("body-parser");
const db = require("./api/models");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to relief application." });
});
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

require("./api/routes/UserRoute.js")(app);

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});