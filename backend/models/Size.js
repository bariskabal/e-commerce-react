const mongoose = require("mongoose");

const SizeSchema = mongoose.Schema(
  {
    size: { type: String, required: true },
  },
  { timestamps: true }
);

const Size = mongoose.model("Size", SizeSchema);

module.exports = Size;