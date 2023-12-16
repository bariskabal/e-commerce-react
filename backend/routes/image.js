const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const ImageModel = require("../models/Image");
const { isAdmin, isUser } = require("../middleware/checkUserRole");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `product_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  validateToken,
  isAdmin,
  upload.array("img", 5),
  async (req, res) => {
    try {
      const productImages = req.files;
      const imagePaths = productImages.map(
        (file) => `/images/${file.filename}`
      );
      res.status(200).json({ imagePaths });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    console.log(filename);
    const filePath = path.join(__dirname, "..", "public", "images", filename);
    res.sendFile(filePath);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: "File not found" });
  }
});

router.delete("/:filename", validateToken, isAdmin, async (req, res) => {
  try {
    // Gelen ürün bilgisini al (varsayılan olarak bir resimler dizisi olduğunu varsayıyorum)
    const filename = req.params.filename

    if (!filename || filename.length === 0) {
      return res.status(400).json({ error: "Resim bilgisi eksik" });
    }
    // Tüm resimleri dolaş ve her birini sil
      fs.unlink(`public/images/${filename}`, (err) => {
        if (err) {
          console.error("Resim silinirken hata:", err);
          return res.status(500).json({ error: "Resim silinemedi" });
        }
        console.log(`${filename} resmi başarıyla silindi.`);
      });
    // Başarılı yanıt gönder
    res.status(200).json({ message: "Tüm resimler silindi" });
  } catch (err) {
    console.error("Hata:", err.message);
    res.status(500).json({ error: "İşlem sırasında bir hata oluştu" });
  }
});

module.exports = router;
