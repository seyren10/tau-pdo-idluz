if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.render("buildings/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local: http://127.0.0.1:${PORT}`);
});
