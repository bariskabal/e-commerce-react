const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true}
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;