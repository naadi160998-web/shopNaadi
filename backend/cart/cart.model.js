const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
            default: null,
        },

        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            default: null,
        },

        quantity: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
        collection: "carts",
    }
);

module.exports = mongoose.model("Cart", cartSchema);