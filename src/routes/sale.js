"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require("../controllers/sale");
const { isLogin, isAdmin, isStaff } = require("../middlewares/permissions");

// URL: /sales

router.route("/").get(isLogin, list).post(isStaff, create);

router
    .route("/:id")
    .get(isLogin, read)
    .put(isAdmin, update)
    .patch(isAdmin, update)
    .delete(isAdmin, deletee);

/* ------------------------------------------------------- */
module.exports = router;
