const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const Size = require("../models/Size.js");
const {isAdmin, isUser} = require("../middleware/checkUserRole")

// New Size
router.post("/", validateToken,isAdmin ,async (req, res) => {
  try {
    const { size } = req.body; // bilgileri aldık
    const existingSize = await Size.findOne({ size: size });
    if (!existingSize) {
      const newSize = new Size({ size }); // alınan bilgilerle size nesnesi oluşturduk
      await newSize.save(); // yeni size kaydettik
      return res.status(200).json(newSize); // eklenen size json ile response olarak döndürdük
    } else {
      return res
        .status(409)
        .json({ error: "Bu isimde Size zaten var." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get All Sizes
router.get("/", async (req, res) => {
  try {
    const sizes = await Size.find(); // tüm verileri getirir
    res.status(200).json(sizes);
  } catch (err) {
    res.status(500).json({error: "Server error" });
  }
});

//Get sizes by ID
router.get("/:sizeId", async (req, res) => {
  try {
    const sizeId = req.params.sizeId;
    const size = await Size.findById(sizeId); // tüm verileri getirir
    if (!size) {
      return res.status(404).json({ error: "Size bulunamadı" });
    }
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Size update
router.put("/:sizeId", validateToken,isAdmin ,async (req, res) => {
  try {
    const sizeId = req.params.sizeId;
    const updates = req.body;

    const updatedSize = await Size.findByIdAndUpdate(
        sizeId,
      updates,
      { new: true }
    );
    if (!updatedSize) {
      return res.status(404).json({ error: "size bulunamadı" });
    }
    res.status(200).json(updatedSize);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Size delete
router.delete("/:sizeId", validateToken,isAdmin ,async (req, res) => {
    try {
      const sizeId = req.params.sizeId;
  
      const deletedSize = await Size.findByIdAndDelete(sizeId);
  
      if (!deletedSize) {
        return res.status(404).json({ error: "size not found." });
      }
  
      res.status(200).json(deletedSize);
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
