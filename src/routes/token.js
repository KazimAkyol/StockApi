"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const { list, create, read, update, deletee } = require("../controllers/token");

//URL: /tokens

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deletee);
/* ------------------------------------------------------- */
module.exports = router;
