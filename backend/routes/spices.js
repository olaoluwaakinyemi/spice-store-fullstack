const express = require("express");
const Spice = require("../models/Spice");
const { upload } = require("../config/cloudinary");
const auth = require("../middleware/auth");
const router = express.Router();

// GET all spices (public)
router.get("/", async (req, res) => {
  try {
    const spices = await Spice.find();
    res.json(spices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET single spice by ID (admin or public)
router.get("/:id", async (req, res) => {
  try {
    const spice = await Spice.findById(req.params.id);
    if (!spice) return res.status(404).json({ error: "Spice not found" });
    res.json(spice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new spice (admin only)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const spice = new Spice({
      name,
      price,
      description,
      imageUrl: req.file?.path || "",
    });
    await spice.save();
    res.json(spice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update spice by ID (admin only)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const updatedData = { name, price, description };

    if (req.file?.path) {
      updatedData.imageUrl = req.file.path;
    }

    const updatedSpice = await Spice.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedSpice)
      return res.status(404).json({ error: "Spice not found" });

    res.json(updatedSpice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE spice by ID (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deletedSpice = await Spice.findByIdAndDelete(req.params.id);
    if (!deletedSpice)
      return res.status(404).json({ error: "Spice not found" });
    res.json({ message: "Spice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
