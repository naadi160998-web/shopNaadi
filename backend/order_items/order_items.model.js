const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      default: 0,
    },

    subTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "order_items",
  }
);

module.exports = mongoose.model("OrderItem", orderItemsSchema);