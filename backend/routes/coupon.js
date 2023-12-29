const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const Coupon = require("../models/Coupon.js");
const { isAdmin, isUser } = require("../middleware/checkUserRole");

// New Coupon
router.post("/", validateToken, isAdmin, async (req, res) => {
  try {
    const coupon = req.body; // bilgileri aldık
    const existingCoupon = await Coupon.findOne({ code: coupon.code });
    if (!existingCoupon) {
      const newCoupon = new Coupon(coupon);
      await newCoupon.save();
      return res.status(200).json(newCoupon);
    } else {
      return res.status(409).json({ error: "Bu Kupon zaten var." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get All Coupon
router.get("/", validateToken, isAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.find(); // tüm verileri getirir
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get Coupon by ID
router.post("/:couponId", validateToken, isAdmin, async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId); // tüm verileri getirir
    if (!coupon) {
      return res.status(404).json({ error: "Kupon bulunamadı" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId); // tüm verileri getirir
    if (!coupon) {
      return res.status(404).json({ error: "coupon bulunamadı" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get Coupon by Coupon code
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode }); // tüm verileri getirir
    if (!coupon) {
    return res.status(404).json({ error: "Kupon bulunamadı" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Coupon update
router.put("/:couponId", validateToken, isAdmin, async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Kupon bulunamadı" });
    }
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Coupon delete
router.delete("/:couponId", validateToken, async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }

    res.status(200).json(deletedCoupon);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
