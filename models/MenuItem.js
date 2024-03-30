const mongoose = require("mongoose");

// Define MenuSchema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String], // Ingredients is
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

// Create Menu Model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
