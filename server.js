const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome to my Hotel...");
});

app.get("/chicken", function (req, res) {
  res.send("Your chicken is going to be prepared soon...");
});

app.get("/idli", (req, res) => {
  var customized_idli = {
    name: "rava idli",
    size: "10 cm diameter",
    is_sambhar: true,
    is_chuteny: false,
  };
  res.send(customized_idli);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
