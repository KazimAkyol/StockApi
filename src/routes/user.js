"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- *

const user = require("../controllers/user");

// URL: /users

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require("../controllers/user");

//URL: /users

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deletee);
/* ------------------------------------------------------- */
module.exports = router;
