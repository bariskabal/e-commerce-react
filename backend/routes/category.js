const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const Category = require("../models/Category.js");
const {isAdmin, isUser} = require("../middleware/checkUserRole")

// New Category
router.post("/", validateToken,isAdmin ,async (req, res) => {
  try {
    const { name, img } = req.body; // bilgileri aldık
    const existingCategory = await Category.findOne({ name: name });
    if (!existingCategory) {
      const newCategory = new Category({ name, img }); // alınan bilgilerle category nesnesi oluşturduk
      await newCategory.save(); // yeni categoryi kaydettik
      return res.status(200).json(newCategory); // eklenen categoryi json ile response olarak döndürdük
    } else {
      return res
        .status(409)
        .json({ error: "Bu isimde bir kategori zaten var." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); // tüm verileri getirir
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({error: "Server error" });
  }
});

//Get Category by ID
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId); // tüm verileri getirir
    if (!category) {
      return res.status(404).json({ error: "Kategori bulunamadı" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Category update
router.put("/:categoryId", validateToken,isAdmin ,async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Kategori bulunamadı" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Category delete
router.delete("/:categoryId", validateToken,isAdmin ,async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found." });
      }
  
      res.status(200).json(deletedCategory);
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
