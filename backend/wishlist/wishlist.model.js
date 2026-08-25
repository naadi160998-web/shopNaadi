const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);