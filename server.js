const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
// const Person = require("./models/Person");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000; // if  process.env.PORT present hai toh wo isko use krega wrna 3000 use krega

// Middleware Functions
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Main Get request
app.get("/", function (req, res) {
  res.send("Welcome to my Hotel...");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const Person = require("./models/Person");

// Use the routers
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// The END
