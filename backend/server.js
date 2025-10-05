require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Spice = require("./models/Spice");
const spicesRoutes = require("./routes/spices");
const authRoutes = require("./routes/auth"); // ✅ Import auth.js

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use the routes
app.use("/spices", spicesRoutes);
app.use("/auth", authRoutes); // ✅ Use auth routes

// Connect Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
