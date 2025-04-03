"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const { validate } = require("./user");
/* ------------------------------------------------------- */

const FirmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    phone: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      trim: true,
      required: true,
      validate: [{}],
    },

    image: {},
  },
  {
    collection: "firms",
    timestamps: true,
  }
);

module.exports = mongoose.model("Firms", FirmSchema);
