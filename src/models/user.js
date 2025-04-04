"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true, //* RAM'de data tutabilmek icin, sorgularda adi cokca gececek olan data'lara index:true verilir.
    },

    password: {
      type: String,
      trim: true,
      required: true,
      //   set: passwordEncrypt,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
      //   validate: [
      //     (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      //     "Please enter a valid email address.",
      //   ],
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

//* https://mongoosejs.com/docs/middleware.html

UserSchema.pre(['save', 'updateOne'], function(next) {})

module.exports = mongoose.model("User", UserSchema);
