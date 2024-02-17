const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        barangay: {
            type: String,
            required: true,
        },
        purok: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        orders: {
            type: [String],
            required: true,
        },
        payment: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Orders", OrderSchema);
