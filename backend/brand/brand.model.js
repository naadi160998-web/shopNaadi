const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "brands",
  }
);

module.exports = mongoose.model("Brand", brandSchema);