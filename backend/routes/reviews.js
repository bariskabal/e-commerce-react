const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const Review = require("../models/Review.js");
const { ObjectId } = require('mongodb');

// New Review
router.post("/", validateToken, async (req, res) => {
  try {
    const review = req.body;
    const newReview = new Review(review);
    await newReview.save();
    res.status(200).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get Reviews  by ProductID
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.aggregate([
      {
        $match: { product: new ObjectId(productId) }, // Belirli bir ürünü seç
      },
      {
        $sort: { createdAt: -1 } // 'createdAt' alanına göre azalan sıralama
      }
    ]);

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "Henüz bu ürüne yorum yapılmadı" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Review update
router.put("/:reviewId", validateToken, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updates = req.body;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, {
      new: true,
    });
    if (!updatedReview) {
      return res.status(404).json({ error: "Review bulunamadı" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Review delete
router.delete("/:reviewId", validateToken, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});
module.exports = router;
