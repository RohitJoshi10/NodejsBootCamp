const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/Person");
const res = require("express/lib/response");

app.get("/", function (req, res) {
  res.send("Welcome to my Hotel...");
});

// POST route to add a person
app.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model.
    const newPerson = new Person(data);

    // Save the newPerson to the database
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
