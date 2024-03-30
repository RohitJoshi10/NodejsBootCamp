const express = require("express");
const router = express.Router(); // Express router founction is saved in router variable

const MenuItem = require("../models/MenuItem");

// POST route to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Create a Menu document using the Mongoose model
    const newMenu = new MenuItem(data);

    // Save the newMenu to the database
    const response = await newMenu.save();
    console.log("Menue Data Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Method to get the Menu Items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menue is Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Method to get the Menu Items acc to taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
