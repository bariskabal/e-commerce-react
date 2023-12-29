const express = require("express");
const router = express.Router();

// Diğer route dosyalarını import ediyoruz
const productRoute = require("./products");
const categoryRoute = require("./category");
const authRoute = require("./auth.js");
const userRoute = require("./user.js");
const reviewRoute = require("./reviews.js");
const couponRoute = require("./coupon.js");
const colorRoute = require("./color.js");
const sizeRoute = require("./size.js");
const imageRoute = require("./image.js");
const paymentRoute = require("./payment")

// Her route'ı ilgili yol ile kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/reviews", reviewRoute);
router.use("/coupon", couponRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/colors", colorRoute);
router.use("/sizes", sizeRoute);
router.use("/images", imageRoute);
router.use("/payment", paymentRoute);

module.exports = router;
