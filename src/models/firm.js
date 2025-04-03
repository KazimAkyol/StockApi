"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: {model, Schema} } = require("../configs/dbConnection");
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

module.exports = model("Firms", FirmSchema);
