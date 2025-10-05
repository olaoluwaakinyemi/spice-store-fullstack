const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Add this
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for OAuth users
  role: { type: String, default: "user" },
  provider: { type: String }, // For OAuth (google, facebook, etc.)
});

module.exports = mongoose.model("User", userSchema);
