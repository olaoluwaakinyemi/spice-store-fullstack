const mongoose = require("mongoose");

const spiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String, // 🔥 add image field
});

module.exports = mongoose.model("Spice", spiceSchema);
