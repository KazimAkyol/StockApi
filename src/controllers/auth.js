"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");

const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
              #swagger.tags = ["Authentication"]
              #swagger.summary = "Login"
              #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
              #swagger.parameters["body"] = {
                  in: "body",
                  required: true,
                  schema: {
                      "username": "test",
                      "password": "aA12345.?",
                  }
              }
    */

    const { username, email, password } = req.body;

    if (!((username || email) && password)) {
      res.errorStatusCode = 401;
      throw new Error("username/email and password are required.");
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
      password,
    }); //* Bu sekilde DB'e bir sorgu atildi.

    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("Incorrect email/username and password.");
    }

    if (!user.isActive) {
      res.errorStatusCode = 401;
      throw new Error("This account is not active.");
    }

    //* Yukaridaki her iki if blogunda da ünlem isareti(!) kullanarak user degilse ve user.isActive degilse anlami vererek throw ile bir hata attirilir. Hata yoksa kod oldugu gibi calisir.

    // Access Token
    const accessData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: "15m",
    });

    // Refresh Token:
    const refreshData = {
      _id: user._id,
      password: user.password,
    };

    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
      expiresIn: "1d",
    });

    res.status(200).send({
      error: false,
      bearer: {
        //* jwt ile beraber kullanilir.
        acces: accessToken,
        refresh: refreshToken,
      },
      token: tokenData.token,
      user,
    });
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Refresh"
            #swagger.description = 'Refresh with refreshToken for get accessToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "bearer": {
                    refresh:"...refreshToken..."
                    },
                }
            }
    */

    const { refresh } = req.body?.bearer;

    if (!refresh) {
      res.errorStatusCode = 401;
      throw new Error("Refresh token not found.");
    }

    const refreshData = jwt.verify(refresh, process.env.REFRESH_KEY);

    if (!refreshData) {
      res.errorStatusCode = 401;
      throw new Error("JWT Refresh data is wrong.");
    }

    const user = await User.findOne({ _id: refreshData._id });

    if (!user && user.password !== refreshData.password) {
      res.errorStatusCode = 401;
      throw new Error("Wrong id or password.");
    }

    if (!user.isActive) {
      res.errorStatusCode = 401;
      throw new Error("This account is not active.");
    }

    const accessData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    res.status(200).send({
      error: false,
      bearer: {
        access: jwt.sign(accessData, process.env.ACCESS_KEY, {
          expiresIn: "1m",
        }),
      },
    });
  },

  logout: async (req, res) => {
    /*
          #swagger.tags = ["Authentication"]
          #swagger.summary = "Logout"
    */

    const result = req.user
      ? await Token.deleteOne({ userId: req.user._id })
      : null;

    res.status(200).send({
      error: false,
      message: result.deletedCount
        ? "User logged out and token deleted."
        : "User Logged out.",
    });
  },
};
