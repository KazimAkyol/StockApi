"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */
const {
  mongoose: { model, Schema },
} = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const FirmSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "firms",
    timestamps: true,
  }
);

module.exports = model("Firm", FirmSchema);
