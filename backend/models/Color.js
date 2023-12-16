const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", ColorSchema);

module.exports = Color;