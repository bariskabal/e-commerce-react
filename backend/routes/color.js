const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const Color = require("../models/Color.js");
const {isAdmin, isUser} = require("../middleware/checkUserRole")

// New Color
router.post("/", validateToken,isAdmin ,async (req, res) => {
  try {
    const { code } = req.body; // bilgileri aldık
    const existingColor = await Color.findOne({ code: code });
    if (!existingColor) {
      const newColor = new Color({ code }); // alınan bilgilerle Color nesnesi oluşturduk
      await newColor.save(); // yeni Color kaydettik
      return res.status(200).json(newColor); // eklenen Color json ile response olarak döndürdük
    } else {
      return res
        .status(409)
        .json({ error: "Bu kodda Renk zaten var." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get All Colors
router.get("/", async (req, res) => {
  try {
    const colors = await Color.find(); // tüm verileri getirir
    res.status(200).json(colors);
  } catch (err) {
    res.status(500).json({error: "Server error" });
  }
});

//Get Colors by ID
router.get("/:colorId", async (req, res) => {
  try {
    const colorId = req.params.colorId;
    const color = await Color.findById(colorId); // tüm verileri getirir
    if (!color) {
      return res.status(404).json({ error: "Color bulunamadı" });
    }
    res.status(200).json(color);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Color update
router.put("/:colorId", validateToken,isAdmin ,async (req, res) => {
  try {
    const colorId = req.params.colorId;
    const updates = req.body;

    const updatedColor = await Color.findByIdAndUpdate(
        colorId,
      updates,
      { new: true }
    );
    if (!updatedColor) {
      return res.status(404).json({ error: "Color bulunamadı" });
    }
    res.status(200).json(updatedColor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Color delete
router.delete("/:colorId", validateToken,isAdmin ,async (req, res) => {
    try {
      const colorId = req.params.colorId;
  
      const deletedColor = await Color.findByIdAndDelete(colorId);
  
      if (!deletedColor) {
        return res.status(404).json({ error: "Color not found." });
      }
  
      res.status(200).json(deletedColor);
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
