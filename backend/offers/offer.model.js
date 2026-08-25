const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    offer_name: {
      type: String,
      default: null,
      trim: true,
    },

    offer_description: {
      type: String,
      default: null,
      trim: true,
    },

    discount_type: {
      type: String,
      enum: [
        "percentage",
        "fixed",
      ],
      default: "percentage",
    },

    discount_value: {
      type: Number,
      default: 0,
      min: 0,
    },

    start_date: {
      type: Date,
      default: null,
    },

    end_date: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "expired",
      ],
      default: "active",
    },

    max_usage: {
      type: Number,
      default: 0,
    },

    usage_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Offer",
  offerSchema
);