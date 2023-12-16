const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: [{ type: String, required: true }],
    description: { type: String, required: true },
    colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color', required: true }],
    sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true }],
    price: {
      current: { type: Number, required: true },
      discount: { type: Number }
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;