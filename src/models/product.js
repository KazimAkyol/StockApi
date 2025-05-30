"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const ProductSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            red: "Brand",
            required: true,
        },

        name: {
            type: String,
            trim: true,
            required: true,
        },

        quantity: {
            type: Number,
            default: 0,
        },
    },
    { collection: "products", timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
