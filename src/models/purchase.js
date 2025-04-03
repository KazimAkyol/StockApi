"use strict";
const { mongo } = require("mongoose");
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      red: "Brand",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    priceTotal: {
      type: Number,
      set: function () {
        return this.quantity * this.price;
      }, //* create islemi yaptigimizda set metodu calisir. Eger data gönderilmezse calismaz.
      default: function () {
        return this.quantity * this.price;
      }, //* Data göndermediginde calisir.
      transform: function () {
        return this.quantity * this.price;
      }, //* update'de calisir.
    },
  },
  { collation: "purchases", timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
